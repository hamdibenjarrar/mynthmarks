// The Evolution Score. A public, documented number from 0 to 1000 that rewards steady growth.
//
//   E = 1000 * (0.30 V + 0.20 C + 0.15 S + 0.15 M + 0.10 R + 0.10 L)
//
//   V  volume       1 - e^(-contributions / 1000)
//   C  consistency  active days / days in the window
//   S  streak       1 - e^(-current streak / 30)
//   M  momentum     min(1, (rate in the last 90 days / rate before that) / 2)
//   R  reach        1 - e^(-(stars + followers) / 200)
//   L  range        1 - e^(-languages / 6)
//
// Every part is bounded between 0 and 1 and saturates, so one huge week cannot max the score.

export const VERSION = 'evolution v1';
export const WEIGHTS = { volume: 0.3, consistency: 0.2, streak: 0.15, momentum: 0.15, reach: 0.1, range: 0.1 };
export const LEVELS = [
  { min: 800, name: 'Myth' },
  { min: 600, name: 'Canopy' },
  { min: 400, name: 'Grove' },
  { min: 200, name: 'Sprout' },
  { min: 0, name: 'Seed' },
];

const sat = (x, k) => 1 - Math.exp(-Math.max(0, x) / k);
const clamp = (x) => Math.min(1, Math.max(0, x));
const sum = (days) => days.reduce((a, d) => a + d.count, 0);

export function streaks(days) {
  let longest = 0, run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--; // today may simply not have started yet
  for (; i >= 0 && days[i].count > 0; i--) current++;
  return { current, longest };
}

export function momentum(days) {
  const n = days.length;
  if (n === 0) return 0;
  const recentDays = Math.min(90, n);
  const recent = sum(days.slice(n - recentDays)) / recentDays;
  const earlierDays = n - recentDays;
  if (earlierDays === 0) return recent > 0 ? 1 : 0;
  const earlier = sum(days.slice(0, earlierDays)) / earlierDays;
  if (earlier === 0) return recent > 0 ? 1 : 0;
  return clamp(recent / earlier / 2);
}

export function evolution(s) {
  const days = s.days || [];
  const parts = {
    volume: sat(s.totalContributions || 0, 1000),
    consistency: days.length ? clamp(days.filter((d) => d.count > 0).length / days.length) : 0,
    streak: sat(streaks(days).current, 30),
    momentum: momentum(days),
    reach: sat((s.stars || 0) + (s.followers || 0), 200),
    range: sat((s.languages || []).length, 6),
  };
  const score = Math.round(1000 * Object.keys(WEIGHTS).reduce((a, k) => a + WEIGHTS[k] * parts[k], 0));
  const level = LEVELS.find((l) => score >= l.min).name;
  return { score, level, parts, version: VERSION };
}
