// Kinds of mark. Each kind has a default label, icon and tone, and can be overridden by query.
export const PRESETS = {
  status: { label: 'status', icon: 'status', tone: 'mint' },
  progress: { label: 'progress', icon: 'progress', tone: 'gold' },
  tasks: { label: 'tasks', icon: 'tasks', tone: 'ice' },
  tools: { label: 'tools', icon: 'tools', tone: 'slate' },
  evolution: { label: 'evolution', icon: 'evolution', tone: 'violet' },
  functions: { label: 'functions', icon: 'functions', tone: 'ice' },
  community: { label: 'community', icon: 'community', tone: 'gold' },
  contributions: { label: 'contributions', icon: 'grid', tone: 'mint' },
  achievement: { label: 'achievement', icon: 'star', tone: 'gold' },
  agent: { label: 'agent', icon: 'agent', tone: 'violet' },
  ai: { label: 'ai', icon: 'spark', tone: 'violet' },
  project: { label: 'project', icon: 'folder', tone: 'ice' },
  code: { label: 'code', icon: 'code', tone: 'slate' },
  site: { label: 'site', icon: 'globe', tone: 'ice' },
  contact: { label: 'contact', icon: 'mail', tone: 'ivory' },
  nav: { label: '', icon: 'arrow', tone: 'ivory' },
  donate: { label: 'support', icon: 'heart', tone: 'crimson' },
};

export const KINDS = Object.keys(PRESETS);

// Status words pick their own colour, so "live" is always green and "building" always gold.
const STATUS_TONES = [
  [/^(live|active|shipped|online|done|open|awake|published|delivered|merged)\b/i, 'mint'],
  [/^(build|building|in progress|wip|shipping|beta|alpha|testing)\b/i, 'gold'],
  [/^(plan|planning|research|design|idea|draft|concept|next)\b/i, 'ice'],
  [/^(paused|resting|archived|idle|closed|prototype|private)\b/i, 'slate'],
  [/^(down|blocked|broken|error|failing)\b/i, 'crimson'],
];

export function statusTone(value) {
  for (const [re, tone] of STATUS_TONES) if (re.test(value)) return tone;
  return null;
}

// progress takes 0 to 100 and draws a bar. tasks takes done/total and draws a bar.
export function parseValue(kind, raw) {
  if (kind === 'progress') {
    const n = Number.parseFloat(raw);
    if (Number.isFinite(n)) {
      const p = Math.max(0, Math.min(100, n));
      return { value: `${Math.round(p)}%`, progress: p / 100 };
    }
  }
  if (kind === 'tasks') {
    const m = String(raw).match(/^(\d+)\s*\/\s*(\d+)$/);
    if (m) {
      const done = Number(m[1]), all = Number(m[2]);
      if (all > 0) return { value: `${done}/${all}`, progress: Math.min(1, done / all) };
    }
  }
  return { value: raw };
}
