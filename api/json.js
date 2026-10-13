// GET /api/json?kind=status&value=live           Shields endpoint format for a static mark
// GET /api/json?source=live&user=NAME&metric=...  Shields endpoint format for a live mark
// Add &detail=1 to a live evolution request to see every part of the score.
import { TONES } from '../lib/palette.js';
import { getStats } from '../lib/github.js';
import { liveMark, checkUser } from '../lib/live.js';
import { evolution } from '../lib/evolution.js';
import { BadgeError } from '../lib/errors.js';
import { clean } from '../lib/text.js';
import { flag } from '../lib/http.js';
import { buildMark } from './mark.js';

export default async function handler(req, res) {
  const q = req.query || {};
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    let out, cache, detail;
    if (clean(q.source, 6) === 'live') {
      const metric = clean(q.metric, 16) || 'evolution';
      const stats = await getStats(checkUser(q.user));
      out = liveMark(metric, stats);
      if (metric === 'evolution' && flag(q.detail)) detail = evolution(stats);
      cache = 6 * 3600;
    } else {
      out = buildMark(q);
      cache = 7 * 86400;
    }
    res.setHeader('Cache-Control', `public, s-maxage=${cache}, stale-while-revalidate=${cache}`);
    const body = { schemaVersion: 1, label: out.label, message: out.value, color: TONES[out.tone].base.slice(1), labelColor: '07070a', cacheSeconds: cache };
    if (detail) body.detail = detail;
    res.status(200).json(body);
  } catch (err) {
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    res.status(200).json({ schemaVersion: 1, label: 'mynthmarks', message: err instanceof BadgeError ? err.message : 'unavailable', isError: true });
  }
}
