// Text helpers. Badges are drawn without web fonts, so widths are estimated.
const NARROW = new Set("ijlI.,:;|!'()[] ".split(''));
const SLIM = new Set('frt/-'.split(''));
const WIDE = new Set('mwMW@%'.split(''));

export function textWidth(s, size, letterSpacing = 0, mono = false) {
  const chars = [...String(s)];
  let w = 0;
  for (const ch of chars) {
    if (mono) w += 0.62;
    else if (NARROW.has(ch)) w += 0.3;
    else if (SLIM.has(ch)) w += 0.4;
    else if (WIDE.has(ch)) w += 0.88;
    else if (/[A-Z0-9]/.test(ch)) w += 0.66;
    else if (/[\u0600-\u06FF]/.test(ch)) w += 0.52;
    else w += 0.56;
  }
  return w * size + letterSpacing * chars.length;
}

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Read one query value safely: first item if repeated, no control characters, trimmed, capped.
export function clean(v, max = 48) {
  const s = Array.isArray(v) ? v[0] : v;
  if (typeof s !== 'string') return '';
  return s.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max);
}

export function compact(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'm';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}
