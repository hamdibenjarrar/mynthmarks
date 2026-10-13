// node scripts/preview.js [github-user]
// Writes preview/index.html with every kind of mark, both themes, and live marks for one user.
import { writeFileSync, mkdirSync } from 'node:fs';
import { renderMark } from '../lib/render.js';
import { buildMark } from '../api/mark.js';
import { getStats } from '../lib/github.js';
import { liveMark, METRICS } from '../lib/live.js';
import { evolution } from '../lib/evolution.js';

const user = process.argv[2] || 'hamdibenjarrar';
const samples = [
  { kind: 'status', value: 'live' }, { kind: 'status', value: 'building' }, { kind: 'status', value: 'planning' },
  { kind: 'progress', value: '72' }, { kind: 'tasks', value: '12/20' }, { kind: 'tools', value: 'Next.js' },
  { kind: 'evolution', value: 'v3' }, { kind: 'functions', value: '24 endpoints' }, { kind: 'community', value: 'Al-Marsam' },
  { kind: 'contributions', value: 'open source' }, { kind: 'achievement', value: 'Issue 01 published' },
  { kind: 'agent', value: 'Nomen' }, { kind: 'ai', value: 'Prevent' }, { kind: 'project', value: 'MYNTHISM' },
  { kind: 'code', value: 'TypeScript' }, { kind: 'site', value: 'mynthism.vercel.app' }, { kind: 'contact', value: 'say hello' },
  { kind: 'nav', value: 'Projects' }, { kind: 'donate', value: 'support my work' },
];

// Each mark is shown as an image, exactly like GitHub shows it.
const img = (svg) => `<img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`;
const rows = [];
for (const theme of ['dark', 'light']) {
  rows.push(`<div class="row ${theme}">${samples.map((q) => img(renderMark(buildMark({ ...q, theme, motion: '1' })))).join('')}</div>`);
}
let liveRow = '';
try {
  const s = await getStats(user);
  liveRow = `<div class="row dark">${METRICS.map((m) => img(renderMark({ ...liveMark(m, s), theme: 'dark' }))).join('')}</div>`;
  console.log(user, JSON.stringify({ days: s.days.length, total: s.totalContributions, stars: s.stars, repos: s.repos, ...evolution(s) }, null, 1));
} catch (e) {
  console.log('live marks skipped:', e.message);
}
mkdirSync('preview', { recursive: true });
writeFileSync('preview/index.html', `<!doctype html><meta charset="utf-8"><title>Mynthmarks preview</title>
<style>body{margin:0;font-family:system-ui;background:#111}.row{display:flex;flex-wrap:wrap;gap:10px;padding:28px}.dark{background:#0d1117}.light{background:#fff}</style>
${rows.join('')}${liveRow}`);
console.log('preview/index.html written');
