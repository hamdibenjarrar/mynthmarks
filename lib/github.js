// Public GitHub data for one user. Works with no token at all:
// profile and repositories come from the REST API, the contribution calendar from the public profile page.
// Set GITHUB_TOKEN on the server to raise the REST limit from 60 to 5000 requests an hour.
import { BadgeError } from './errors.js';

const UA = 'mynthmarks (+https://github.com/hamdibenjarrar/mynthmarks)';
const TTL = 30 * 60 * 1000;
const cache = new Map();

async function get(url, accept) {
  const headers = { 'User-Agent': UA, Accept: accept };
  if (process.env.GITHUB_TOKEN && url.startsWith('https://api.github.com')) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 7000);
  try {
    return await fetch(url, { headers, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

// Turns the contribution calendar HTML into [{ date, count }], oldest first.
export function parseCalendar(html) {
  const dates = new Map();
  for (const m of html.matchAll(/<td\b[^>]*>/g)) {
    const d = m[0].match(/data-date="(\d{4}-\d{2}-\d{2})"/);
    const id = m[0].match(/\bid="([^"]+)"/);
    if (d && id) dates.set(id[1], d[1]);
  }
  const days = [];
  for (const m of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const date = dates.get(m[1]);
    if (!date) continue;
    const n = m[2].match(/^\s*(\d[\d,]*)\s+contribution/);
    days.push({ date, count: n ? Number(n[1].replace(/,/g, '')) : 0 });
  }
  return days.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

export async function getStats(login) {
  const hit = cache.get(login);
  if (hit && Date.now() - hit.at < TTL) return hit.data;
  try {
    const [u, r, cal] = await Promise.all([
      get(`https://api.github.com/users/${login}`, 'application/vnd.github+json'),
      get(`https://api.github.com/users/${login}/repos?type=owner&sort=pushed&per_page=100`, 'application/vnd.github+json'),
      get(`https://github.com/users/${login}/contributions`, 'text/html').catch(() => null),
    ]);
    if (u.status === 404) throw new BadgeError('user not found');
    if (u.status === 403 || u.status === 429) throw new BadgeError('rate limited');
    if (!u.ok || !r.ok) throw new BadgeError(`github ${u.ok ? r.status : u.status}`);
    const user = await u.json();
    const repos = (await r.json()).filter((x) => !x.fork && !x.private);
    const days = cal && cal.ok ? parseCalendar(await cal.text()) : [];

    const langs = new Map();
    let stars = 0;
    for (const repo of repos) {
      stars += repo.stargazers_count || 0;
      if (repo.language) langs.set(repo.language, (langs.get(repo.language) || 0) + 1);
    }
    const data = {
      login: user.login,
      repos: user.public_repos,
      followers: user.followers,
      stars,
      languages: [...langs].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      lastPush: repos[0] ? repos[0].pushed_at : null,
      days,
      totalContributions: days.reduce((a, d) => a + d.count, 0),
    };
    cache.set(login, { at: Date.now(), data });
    return data;
  } catch (err) {
    if (hit) return hit.data; // a stale number beats an error badge
    if (err && err.name === 'AbortError') throw new BadgeError('github timeout');
    throw err;
  }
}
