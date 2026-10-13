// Response helpers. Badges always answer 200 so GitHub's proxy and Shields still show the error text.
import { renderMark } from './render.js';
import { BadgeError } from './errors.js';
import { clean } from './text.js';

export const themeOf = (v) => (clean(v, 5) === 'light' ? 'light' : 'dark');
export const flag = (v) => ['1', 'true', 'yes'].includes(clean(v, 5).toLowerCase());

export function sendSvg(res, svg, seconds) {
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', `public, max-age=${Math.min(seconds, 3600)}, s-maxage=${seconds}, stale-while-revalidate=${seconds}`);
  res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(svg);
}

export function sendErrorSvg(res, err) {
  const msg = err instanceof BadgeError ? err.message : 'unavailable';
  if (!(err instanceof BadgeError)) console.error(err);
  const svg = renderMark({ label: 'mynthmarks', value: msg, tone: 'crimson', theme: 'dark', icon: 'status' });
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
  res.status(200).send(svg);
}
