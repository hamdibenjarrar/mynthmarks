// Inline icons on a 16 by 16 grid. Drawn as paths so nothing loads from outside the badge.
const S = (f, w = 1.8) => `fill="none" stroke="${f}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

export const ICONS = {
  status: (f) => `<circle cx="8" cy="8" r="3.6" fill="${f}"/><circle cx="8" cy="8" r="6.6" fill="none" stroke="${f}" stroke-opacity=".38" stroke-width="1.4"/>`,
  progress: (f) => `<rect x="1.5" y="6" width="13" height="4" rx="2" fill="${f}" fill-opacity=".3"/><rect x="1.5" y="6" width="8.5" height="4" rx="2" fill="${f}"/>`,
  tasks: (f) => `<rect x="1.5" y="1.5" width="13" height="13" rx="3.5" ${S(f, 1.4)} stroke-opacity=".45"/><path d="M4.6 8.3l2.3 2.3 4.6-4.9" ${S(f, 1.9)}/>`,
  tools: (f) => `<path d="M3 13l6-6" ${S(f, 2.1)}/><circle cx="10.8" cy="5.2" r="3" ${S(f, 1.7)}/>`,
  evolution: (f) => `<path d="M1.8 12.4l3.9-3.9 2.9 2.9 5.6-5.8" ${S(f)}/><path d="M10.4 5.6h3.8v3.8" ${S(f)}/>`,
  functions: (f) => `<path d="M6 2.5C4.2 2.5 4.6 5 4.6 6.4S3.6 8 2.2 8c1.4 0 2.4.4 2.4 1.6s-.4 3.9 1.4 3.9M10 2.5c1.8 0 1.4 2.5 1.4 3.9S12.4 8 13.8 8c-1.4 0-2.4.4-2.4 1.6s.4 3.9-1.4 3.9" ${S(f, 1.5)}/>`,
  community: (f) => `<circle cx="8" cy="5" r="2.5" fill="${f}"/><circle cx="3.4" cy="7.2" r="1.9" fill="${f}" fill-opacity=".65"/><circle cx="12.6" cy="7.2" r="1.9" fill="${f}" fill-opacity=".65"/><path d="M3.6 14.2c.6-2.7 2.3-4.2 4.4-4.2s3.8 1.5 4.4 4.2z" fill="${f}"/>`,
  grid: (f) => {
    const o = [0.3, 0.6, 1, 0.6, 1, 0.3, 1, 0.3, 0.6];
    return o.map((op, i) => `<rect x="${1 + (i % 3) * 5}" y="${1 + Math.floor(i / 3) * 5}" width="4" height="4" rx="1" fill="${f}" fill-opacity="${op}"/>`).join('');
  },
  star: (f) => `<path d="M8 1.3l2 4.3 4.7.6-3.4 3.2.8 4.7L8 11.9l-4.1 2.2.8-4.7-3.4-3.2 4.7-.6z" fill="${f}"/>`,
  agent: (f) => `<rect x="2.4" y="4.4" width="11.2" height="9.4" rx="3.2" fill="none" stroke="${f}" stroke-width="1.6"/><circle cx="6" cy="9" r="1.3" fill="${f}"/><circle cx="10" cy="9" r="1.3" fill="${f}"/><path d="M8 1.6v2.8" ${S(f, 1.6)}/>`,
  spark: (f) => `<path d="M8 1l1.6 5.4L15 8l-5.4 1.6L8 15l-1.6-5.4L1 8l5.4-1.6z" fill="${f}"/>`,
  folder: (f) => `<path d="M1.6 4.6A1.5 1.5 0 0 1 3.1 3.1h3.1l1.6 1.7h5.1a1.5 1.5 0 0 1 1.5 1.5v6.1a1.5 1.5 0 0 1-1.5 1.5H3.1a1.5 1.5 0 0 1-1.5-1.5z" fill="none" stroke="${f}" stroke-width="1.6"/>`,
  heart: (f) => `<path d="M8 14s-6-3.6-6-8a3.1 3.1 0 0 1 6-1.5A3.1 3.1 0 0 1 14 6c0 4.4-6 8-6 8z" fill="${f}"/>`,
  arrow: (f) => `<path d="M3 8h10M9 4l4 4-4 4" ${S(f, 1.9)}/>`,
  code: (f) => `<path d="M5.5 4L1.8 8l3.7 4M10.5 4l3.7 4-3.7 4" ${S(f, 1.8)}/>`,
  globe: (f) => `<circle cx="8" cy="8" r="6.3" ${S(f, 1.5)}/><path d="M1.9 8h12.2M8 1.7c2 2.1 2 10.5 0 12.6M8 1.7c-2 2.1-2 10.5 0 12.6" ${S(f, 1.3)}/>`,
  mail: (f) => `<rect x="1.6" y="3.2" width="12.8" height="9.6" rx="2" ${S(f, 1.5)}/><path d="M2.4 4.4L8 8.6l5.6-4.2" ${S(f, 1.5)}/>`,
  eye: (f) => `<path d="M1.5 8s2.4-4.6 6.5-4.6S14.5 8 14.5 8 12.1 12.6 8 12.6 1.5 8 1.5 8z" ${S(f, 1.5)}/><circle cx="8" cy="8" r="2" fill="${f}"/>`,
};

export const isIcon = (v) => Object.prototype.hasOwnProperty.call(ICONS, v);
