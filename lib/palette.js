// Mynthmarks palette. Same colours as the MYNTHISM glass kit.
export const TONES = {
  gold: { base: '#c9a84c', text: '#e8cd7e', deep: '#7d6118' },
  crimson: { base: '#c23a3a', text: '#f08a7c', deep: '#9a2222' },
  ice: { base: '#8fb8ff', text: '#b9d2ff', deep: '#2c5aa8' },
  mint: { base: '#57d38c', text: '#8ce8b4', deep: '#1b7343' },
  violet: { base: '#a79bff', text: '#c9c1ff', deep: '#5541cc' },
  rose: { base: '#ff7aa8', text: '#ffa3c3', deep: '#ad2858' },
  ivory: { base: '#f5f0e8', text: '#f5f0e8', deep: '#4f4a41' },
  slate: { base: '#a8a39a', text: '#d2cdc3', deep: '#57524a' },
};

export const THEMES = {
  dark: { base: '#07070a', label: '#f5f0e8', labelOpacity: 0.74, edge: '#ffffff', edgeA: 0.5, edgeB: 0.08, edgeC: 0.3, hl: 0.12, tint: 0.16, glow: 0.45 },
  light: { base: '#faf7f1', label: '#2a2620', labelOpacity: 0.8, edge: '#000000', edgeA: 0.2, edgeB: 0.06, edgeC: 0.14, hl: 0.75, tint: 0.14, glow: 0.3 },
};

export const isTone = (v) => Object.prototype.hasOwnProperty.call(TONES, v);
export const isTheme = (v) => Object.prototype.hasOwnProperty.call(THEMES, v);
