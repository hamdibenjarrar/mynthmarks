// One Mynthmark: a two part glass pill. Label on dark glass, value on a tinted pane.
// Everything is inline (gradients, icon paths, styles), so it survives GitHub's image proxy.
import { TONES, THEMES } from './palette.js';
import { ICONS } from './icons.js';
import { textWidth, esc } from './text.js';

const SANS = "'Segoe UI','SF Pro Text','Helvetica Neue',Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,'SF Mono','Cascadia Code',Consolas,Menlo,monospace";

export function renderMark(o) {
  const theme = THEMES[o.theme] ? o.theme : 'dark';
  const t = THEMES[theme];
  const c = TONES[o.tone] || TONES.gold;
  const dark = theme === 'dark';
  const H = 30, PAD = 11, LFS = 10, LLS = 1.4, VFS = 12.5, BAR = 46, ICON = 16;
  const R = o.shape === 'pill' ? 15 : 9;

  const label = String(o.label || '').toUpperCase();
  const value = String(o.value ?? '');
  const icon = o.icon && ICONS[o.icon] ? ICONS[o.icon] : null;
  const ink = dark ? c.text : c.deep;
  const hasBar = typeof o.progress === 'number' && Number.isFinite(o.progress);

  let lw = 0;
  if (icon || label) {
    lw = PAD + (icon ? ICON : 0) + (icon && label ? 7 : 0) + (label ? textWidth(label, LFS, LLS, true) - LLS : 0) + PAD;
  }
  lw = Math.ceil(lw);
  const vtw = textWidth(value, VFS);
  const vw = Math.ceil(PAD + vtw + (hasBar ? 9 + BAR : 0) + PAD);
  const W = lw + vw;
  const aria = esc(o.title || (o.label ? `${o.label}: ${value}` : value));

  const iconSvg = icon ? `<g transform="translate(${PAD} 7)">${icon(ink)}</g>` : '';
  const labelSvg = label
    ? `<text x="${PAD + (icon ? ICON + 7 : 0)}" y="19.2" font-family="${MONO}" font-size="${LFS}" letter-spacing="${LLS}" fill="${t.label}" fill-opacity="${t.labelOpacity}">${esc(label)}</text>`
    : '';
  const vx = lw + PAD;
  const valueSvg = `<text x="${vx}" y="19.6" font-family="${SANS}" font-size="${VFS}" font-weight="700" fill="${ink}">${esc(value)}</text>`;

  let bar = '';
  if (hasBar) {
    const p = Math.max(0, Math.min(1, o.progress));
    const x = (vx + vtw + 9).toFixed(1);
    bar = `<rect x="${x}" y="12.5" width="${BAR}" height="5" rx="2.5" fill="${c.base}" fill-opacity=".22"/>` +
      `<rect x="${x}" y="12.5" width="${Math.max(p > 0 ? 5 : 0, BAR * p).toFixed(1)}" height="5" rx="2.5" fill="url(#bar)"/>`;
  }

  const divider = lw > 0 ? `<line x1="${lw}" y1="0" x2="${lw}" y2="${H}" stroke="${c.base}" stroke-opacity=".45"/>` : '';
  const motion = o.motion
    ? `<style>.sh{animation:sh 6s cubic-bezier(.16,1,.3,1) infinite}@keyframes sh{0%,40%{transform:translateX(-80px) skewX(-18deg)}85%,100%{transform:translateX(${W + 80}px) skewX(-18deg)}}@media (prefers-reduced-motion:reduce){.sh{animation:none;opacity:0}}</style>`
    : '';
  const sheen = o.motion ? `<rect class="sh" x="0" y="0" width="46" height="${H}" fill="url(#sheen)"/>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}">` +
    `<title>${aria}</title>${motion}` +
    `<defs>` +
    `<linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.edge}" stop-opacity="${t.edgeA}"/><stop offset=".5" stop-color="${t.edge}" stop-opacity="${t.edgeB}"/><stop offset="1" stop-color="${t.edge}" stop-opacity="${t.edgeC}"/></linearGradient>` +
    `<linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${t.hl}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `<radialGradient id="glow" cx=".18" cy="1.1" r=".95"><stop offset="0" stop-color="${c.base}" stop-opacity="${t.glow}"/><stop offset="1" stop-color="${c.base}" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.base}"/><stop offset="1" stop-color="${ink}"/></linearGradient>` +
    `<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `<clipPath id="r"><rect width="${W}" height="${H}" rx="${R}"/></clipPath>` +
    `</defs>` +
    `<g clip-path="url(#r)">` +
    `<rect width="${W}" height="${H}" fill="${t.base}"/>` +
    `<rect x="${lw}" width="${vw}" height="${H}" fill="${c.base}" fill-opacity="${t.tint}"/>` +
    `<rect x="${lw}" width="${vw}" height="${H}" fill="url(#glow)"/>` +
    `<rect width="${W}" height="${H / 2}" fill="url(#hl)"/>` +
    divider + sheen +
    `</g>` +
    `<rect x=".6" y=".6" width="${W - 1.2}" height="${H - 1.2}" rx="${R - 0.6}" fill="none" stroke="url(#edge)" stroke-width="1.2"/>` +
    iconSvg + labelSvg + valueSvg + bar +
    `</svg>`;
}
