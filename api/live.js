// GET /api/live?user=hamdibenjarrar&metric=evolution
import { renderMark } from '../lib/render.js';
import { getStats } from '../lib/github.js';
import { liveMark, checkUser } from '../lib/live.js';
import { clean } from '../lib/text.js';
import { sendSvg, sendErrorSvg, themeOf, flag } from '../lib/http.js';

export default async function handler(req, res) {
  try {
    const q = req.query || {};
    const user = checkUser(q.user);
    const metric = clean(q.metric, 16) || 'evolution';
    const out = liveMark(metric, await getStats(user));
    if (q.label !== undefined) out.label = clean(q.label, 40);
    const svg = renderMark({ ...out, theme: themeOf(q.theme), shape: clean(q.shape, 6) === 'pill' ? 'pill' : 'glass', motion: flag(q.motion) });
    sendSvg(res, svg, 6 * 3600);
  } catch (err) {
    sendErrorSvg(res, err);
  }
}
