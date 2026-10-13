// Live marks: turn a user's public GitHub numbers into a mark.
import { streaks, evolution } from './evolution.js';
import { BadgeError } from './errors.js';
import { clean, compact } from './text.js';

export const METRICS = ['evolution', 'contributions', 'pulse', 'streak', 'longest', 'stars', 'repos', 'followers', 'languages'];

export function checkUser(raw) {
  const user = clean(raw, 39).toLowerCase();
  if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/.test(user)) throw new BadgeError('bad user');
  const allow = (process.env.ALLOWED_USERS || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (allow.length && !allow.includes(user)) throw new BadgeError('user not allowed');
  return user;
}

export function liveMark(metric, s) {
  const st = streaks(s.days);
  const day = (n) => `${n} ${n === 1 ? 'day' : 'days'}`;
  switch (metric) {
    case 'evolution': {
      const e = evolution(s);
      return { label: 'evolution', value: `${e.score} ${e.level}`, tone: 'violet', icon: 'evolution', progress: e.score / 1000 };
    }
    case 'contributions':
      return { label: 'contributions', value: `${compact(s.totalContributions)} this year`, tone: 'mint', icon: 'grid' };
    case 'pulse': {
      const last30 = s.days.slice(-30).reduce((a, d) => a + d.count, 0);
      return { label: 'last 30 days', value: `${compact(last30)} contributions`, tone: last30 > 0 ? 'gold' : 'slate', icon: 'status' };
    }
    case 'streak':
      return { label: 'streak', value: day(st.current), tone: st.current > 0 ? 'gold' : 'slate', icon: 'status' };
    case 'longest':
      return { label: 'longest streak', value: day(st.longest), tone: 'gold', icon: 'star' };
    case 'stars':
      return { label: 'stars', value: compact(s.stars), tone: 'gold', icon: 'star' };
    case 'repos':
      return { label: 'public repos', value: compact(s.repos), tone: 'ice', icon: 'folder' };
    case 'followers':
      return { label: 'community', value: `${compact(s.followers)} followers`, tone: 'gold', icon: 'community' };
    case 'languages':
      return { label: 'languages', value: s.languages.slice(0, 3).map((l) => l.name).join(' / ') || 'none yet', tone: 'ice', icon: 'code' };
    default:
      throw new BadgeError('unknown metric');
  }
}
