// GET /api/mark?kind=status&value=live&theme=dark
import { renderMark } from '../lib/render.js';
import { PRESETS, parseValue, statusTone } from '../lib/presets.js';
import { isTone } from '../lib/palette.js';
import { isIcon } from '../lib/icons.js';
import { clean } from '../lib/text.js';
import { sendSvg, sendErrorSvg, themeOf, flag } from '../lib/http.js';

export function buildMark(q) {
  const kind = PRESETS[clean(q.kind, 20)] ? clean(q.kind, 20) : 'project';
  const preset = PRESETS[kind];
  const raw = clean(q.value, 60) || '...';
  const { value, progress } = parseValue(kind, raw);
  const label = q.label !== undefined ? clean(q.label, 40) : preset.label;
  const toneQ = clean(q.tone, 12);
  const iconQ = clean(q.icon, 16);
  const tone = isTone(toneQ) ? toneQ : (kind === 'status' && statusTone(raw)) || preset.tone;
  return {
    kind,
    label,
    value,
    progress,
    tone,
    icon: iconQ === 'none' ? undefined : isIcon(iconQ) ? iconQ : preset.icon,
    theme: themeOf(q.theme),
    shape: clean(q.shape, 6) === 'pill' ? 'pill' : 'glass',
    motion: flag(q.motion),
  };
}

export default function handler(req, res) {
  try {
    sendSvg(res, renderMark(buildMark(req.query || {})), 7 * 86400);
  } catch (err) {
    sendErrorSvg(res, err);
  }
}
