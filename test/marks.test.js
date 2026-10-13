import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMark } from '../lib/render.js';
import { parseValue, statusTone } from '../lib/presets.js';
import { evolution, streaks, momentum } from '../lib/evolution.js';
import { parseCalendar } from '../lib/github.js';
import { liveMark, checkUser } from '../lib/live.js';
import { buildMark } from '../api/mark.js';

const days = (counts, start = '2026-01-01') => counts.map((count, i) => {
  const d = new Date(start + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + i);
  return { date: d.toISOString().slice(0, 10), count };
});

test('a mark is valid, labelled svg', () => {
  const svg = renderMark({ label: 'status', value: 'live', tone: 'mint', icon: 'status' });
  assert.match(svg, /^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="\d+" height="30"/);
  assert.match(svg, /aria-label="status: live"/);
  assert.match(svg, /<title>status: live<\/title>/);
  assert.ok(!/<script/i.test(svg));
});

test('text is escaped', () => {
  const svg = renderMark({ label: '<x>', value: '"><script>alert(1)</script>' });
  assert.ok(!svg.includes('<script>'));
  assert.ok(svg.includes('&lt;script&gt;'));
});

test('progress and tasks draw a bar', () => {
  assert.deepEqual(parseValue('progress', '72'), { value: '72%', progress: 0.72 });
  assert.deepEqual(parseValue('progress', '140'), { value: '100%', progress: 1 });
  assert.deepEqual(parseValue('tasks', '12/20'), { value: '12/20', progress: 0.6 });
  assert.deepEqual(parseValue('tasks', 'many'), { value: 'many' });
  assert.match(renderMark({ value: '72%', progress: 0.72 }), /url\(#bar\)/);
});

test('status words choose their colour', () => {
  assert.equal(statusTone('live'), 'mint');
  assert.equal(statusTone('building v2'), 'gold');
  assert.equal(statusTone('planning'), 'ice');
  assert.equal(statusTone('prototype'), 'slate');
  assert.equal(buildMark({ kind: 'status', value: 'building' }).tone, 'gold');
  assert.equal(buildMark({ kind: 'status', value: 'building', tone: 'rose' }).tone, 'rose');
});

test('unknown kind falls back to project, icon can be hidden', () => {
  const m = buildMark({ kind: 'nope', value: 'x', icon: 'none' });
  assert.equal(m.kind, 'project');
  assert.equal(m.icon, undefined);
});

test('streaks count back from yesterday when today is empty', () => {
  assert.deepEqual(streaks(days([1, 1, 0, 1, 1, 1, 0])), { current: 3, longest: 3 });
  assert.deepEqual(streaks(days([0, 0, 0])), { current: 0, longest: 0 });
});

test('momentum is bounded', () => {
  assert.equal(momentum([]), 0);
  const growing = days([...Array(200).fill(1), ...Array(90).fill(4)]);
  assert.equal(momentum(growing), 1);
  const flat = days(Array(290).fill(2));
  assert.equal(momentum(flat), 0.5);
});

test('evolution score is between 0 and 1000 and documented', () => {
  const quiet = evolution({ days: days(Array(365).fill(0)), totalContributions: 0, stars: 0, followers: 0, languages: [] });
  assert.equal(quiet.score, 0);
  assert.equal(quiet.level, 'Seed');
  const busy = evolution({ days: days(Array(365).fill(9)), totalContributions: 3285, stars: 900, followers: 900, languages: Array(12).fill({}) });
  assert.ok(busy.score > 850 && busy.score <= 1000, String(busy.score)); // flat momentum stays at 0.5 by design
  assert.equal(busy.level, 'Myth');
  assert.equal(busy.version, 'evolution v1');
});

test('calendar html is parsed into days', () => {
  const html = `
<td data-date="2026-10-11" id="contribution-day-component-0-1" data-level="0"></td>
<td data-date="2026-10-12" id="contribution-day-component-1-1" data-level="2"></td>
<tool-tip for="contribution-day-component-1-1" popover="manual">1,204 contributions on October 12th.</tool-tip>
<tool-tip for="contribution-day-component-0-1" popover="manual">No contributions on October 11th.</tool-tip>`;
  assert.deepEqual(parseCalendar(html), [{ date: '2026-10-11', count: 0 }, { date: '2026-10-12', count: 1204 }]);
});

test('live marks and user checks', () => {
  const s = { days: days([1, 2, 3]), totalContributions: 6, stars: 1500, followers: 10, repos: 14, languages: [{ name: 'TypeScript' }, { name: 'JavaScript' }] };
  assert.equal(liveMark('stars', s).value, '1.5k');
  assert.equal(liveMark('streak', s).value, '3 days');
  assert.equal(liveMark('languages', s).value, 'TypeScript / JavaScript');
  assert.equal(checkUser('HamdiBenJarrar'), 'hamdibenjarrar');
  assert.throws(() => checkUser('bad name!'));
  assert.throws(() => liveMark('nope', s));
});
