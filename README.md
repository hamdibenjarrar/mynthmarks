<a name="top"></a>

<div align="center">

# Mynthmarks

**Glass badges for GitHub profiles and READMEs.**

They show where work stands, not only how many stars it has: status, progress, tasks, tools, evolution, community, agents and support. Live marks read public GitHub numbers. Free, no sign up, MIT licensed.

<a href="#every-kind"><img alt="status: live" src="https://mynthmarks.vercel.app/api/mark?kind=status&value=live"></a>
<a href="#the-evolution-score"><img alt="evolution score of the author" src="https://mynthmarks.vercel.app/api/live?user=hamdibenjarrar&metric=evolution"></a>
<a href="LICENSE"><img alt="license: MIT" src="https://mynthmarks.vercel.app/api/mark?kind=code&label=license&value=MIT"></a>
<a href="https://mynthmarks.vercel.app"><img alt="open the builder" src="https://mynthmarks.vercel.app/api/mark?kind=site&value=open%20the%20builder"></a>

[Every kind](#every-kind) | [Use it](#use-it) | [Live marks](#live-marks) | [Evolution Score](#the-evolution-score) | [Shields](#shields-endpoint) | [Rules](#rules-that-keep-links-working) | [Run your own](#run-your-own)

</div>

## Every kind

| Kind | Example | Markdown value |
| :-- | :-- | :-- |
| status | <img alt="status: live" src="https://mynthmarks.vercel.app/api/mark?kind=status&value=live"> <img alt="status: building" src="https://mynthmarks.vercel.app/api/mark?kind=status&value=building"> <img alt="status: planning" src="https://mynthmarks.vercel.app/api/mark?kind=status&value=planning"> | `kind=status&value=live` |
| progress | <img alt="progress 72" src="https://mynthmarks.vercel.app/api/mark?kind=progress&value=72"> | `kind=progress&value=72` |
| tasks | <img alt="tasks 12 of 20" src="https://mynthmarks.vercel.app/api/mark?kind=tasks&value=12/20"> | `kind=tasks&value=12/20` |
| tools | <img alt="tools: Next.js" src="https://mynthmarks.vercel.app/api/mark?kind=tools&value=Next.js"> | `kind=tools&value=Next.js` |
| evolution | <img alt="evolution: v3" src="https://mynthmarks.vercel.app/api/mark?kind=evolution&value=v3"> | `kind=evolution&value=v3` |
| functions | <img alt="functions: 24 endpoints" src="https://mynthmarks.vercel.app/api/mark?kind=functions&value=24%20endpoints"> | `kind=functions&value=24%20endpoints` |
| community | <img alt="community: open to all" src="https://mynthmarks.vercel.app/api/mark?kind=community&value=open%20to%20all"> | `kind=community&value=open%20to%20all` |
| contributions | <img alt="contributions: welcome" src="https://mynthmarks.vercel.app/api/mark?kind=contributions&value=welcome"> | `kind=contributions&value=welcome` |
| achievement | <img alt="achievement: first release" src="https://mynthmarks.vercel.app/api/mark?kind=achievement&value=first%20release"> | `kind=achievement&value=first%20release` |
| agent | <img alt="agent: Nomen" src="https://mynthmarks.vercel.app/api/mark?kind=agent&value=Nomen"> | `kind=agent&value=Nomen` |
| ai | <img alt="ai: Prevent" src="https://mynthmarks.vercel.app/api/mark?kind=ai&value=Prevent"> | `kind=ai&value=Prevent` |
| project | <img alt="project: MYNTHISM" src="https://mynthmarks.vercel.app/api/mark?kind=project&value=MYNTHISM"> | `kind=project&value=MYNTHISM` |
| code | <img alt="code: TypeScript" src="https://mynthmarks.vercel.app/api/mark?kind=code&value=TypeScript"> | `kind=code&value=TypeScript` |
| site | <img alt="site: example.com" src="https://mynthmarks.vercel.app/api/mark?kind=site&value=example.com"> | `kind=site&value=example.com` |
| contact | <img alt="contact: say hello" src="https://mynthmarks.vercel.app/api/mark?kind=contact&value=say%20hello"> | `kind=contact&value=say%20hello` |
| nav | <img alt="go to Projects" src="https://mynthmarks.vercel.app/api/mark?kind=nav&value=Projects"> | `kind=nav&value=Projects` |
| donate | <img alt="support my work" src="https://mynthmarks.vercel.app/api/mark?kind=donate&value=support%20my%20work"> | `kind=donate&value=support%20my%20work` |

Options on every mark:

| Parameter | Values | Default |
| :-- | :-- | :-- |
| `label` | any text, empty to hide | the kind name |
| `tone` | `gold` `crimson` `ice` `mint` `violet` `rose` `ivory` `slate` | set by the kind, and by the word for `status` |
| `icon` | any icon name above, or `none` | set by the kind |
| `theme` | `dark` `light` | `dark` |
| `shape` | `glass` `pill` | `glass` |
| `motion` | `1` for a slow light sweep, switched off for people who ask for reduced motion | off |

<sub><a href="#top">Back to top</a></sub>

## Use it

Always wrap a mark in a link. On GitHub, an image without a link opens the image file when someone clicks it.

```markdown
[![status: live](https://mynthmarks.vercel.app/api/mark?kind=status&value=live)](#your-section)
```

Dark and light versions that follow the reader's theme:

```html
<a href="#your-section">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://mynthmarks.vercel.app/api/mark?kind=progress&value=72">
    <img alt="progress 72 percent" src="https://mynthmarks.vercel.app/api/mark?kind=progress&value=72&theme=light">
  </picture>
</a>
```

Or build one by clicking at [mynthmarks.vercel.app](https://mynthmarks.vercel.app).

<sub><a href="#top">Back to top</a></sub>

## Live marks

`/api/live?user=NAME&metric=METRIC` reads public numbers only. No token, no sign in.

| Metric | Shows |
| :-- | :-- |
| `evolution` | the Evolution Score with its level and a bar |
| `contributions` | contributions in the last year |
| `pulse` | contributions in the last 30 days |
| `streak` | current streak of days with a contribution |
| `longest` | longest streak in the last year |
| `stars` | stars across public repositories you own |
| `repos` | public repositories |
| `followers` | followers |
| `languages` | your three most used languages |

```markdown
[![evolution](https://mynthmarks.vercel.app/api/live?user=YOUR-NAME&metric=evolution)](https://github.com/YOUR-NAME)
```

<sub><a href="#top">Back to top</a></sub>

## The Evolution Score

A number from 0 to 1000 built from the last year of public activity. Every part runs from 0 to 1 and flattens out, so one huge week cannot max it. Steady work wins.

$$E = 1000 \times (0.30\,V + 0.20\,C + 0.15\,S + 0.15\,M + 0.10\,R + 0.10\,L)$$

| Part | Meaning | Formula |
| :-- | :-- | :-- |
| V volume | how much | `1 - e^(-contributions / 1000)` |
| C consistency | how often | `active days / days` |
| S streak | right now | `1 - e^(-current streak / 30)` |
| M momentum | speeding up or not | `min(1, (rate in the last 90 days / rate before) / 2)` |
| R reach | who cares | `1 - e^(-(stars + followers) / 200)` |
| L range | how wide | `1 - e^(-languages / 6)` |

Levels: **Seed** from 0, **Sprout** from 200, **Grove** from 400, **Canopy** from 600, **Myth** from 800.

The whole algorithm is [`lib/evolution.js`](lib/evolution.js). To see every part for any user:

```
https://mynthmarks.vercel.app/api/json?source=live&metric=evolution&detail=1&user=YOUR-NAME
```

The score is versioned (`evolution v1`). If the formula ever changes, the version changes with it.

<sub><a href="#top">Back to top</a></sub>

## Shields endpoint

Prefer the Shields look? Every mark is also served in the Shields endpoint format.

```markdown
![status](https://img.shields.io/endpoint?url=https%3A%2F%2Fmynthmarks.vercel.app%2Fapi%2Fjson%3Fkind%3Dstatus%26value%3Dlive)
```

<sub><a href="#top">Back to top</a></sub>

## Rules that keep links working

1. Wrap every image in a link, to a section (`#projects`) or a page.
2. Put `<a name="projects"></a>` above a heading if you want an anchor that never changes.
3. Write real `alt` text. Screen readers and broken networks both need it.
4. If GitHub shows an old version of a mark, add `&v=2` to its address.

<sub><a href="#top">Back to top</a></sub>

## Run your own

```bash
git clone https://github.com/hamdibenjarrar/mynthmarks
cd mynthmarks
npm test                      # 10 tests, no dependencies
node scripts/preview.js NAME  # writes preview/index.html with every mark
```

Deploy the folder on Vercel as it is. Optional settings:

| Variable | Use |
| :-- | :-- |
| `GITHUB_TOKEN` | a read only token raises the REST limit from 60 to 5000 calls an hour |
| `ALLOWED_USERS` | a comma separated list to limit live marks to some users |

```
api/mark.js       static marks
api/live.js       live marks from public GitHub data
api/json.js       Shields endpoint format, and the score in detail
lib/render.js     the glass drawing
lib/evolution.js  the Evolution Score
lib/github.js     public data, cached for 30 minutes
```

Responses are cached at the edge: static marks for 7 days, live marks for 6 hours.

<div align="center">

Made by [Hamdi Ben Jarrar](https://github.com/hamdibenjarrar) at [MYNTHISM](https://mynthism.vercel.app). The first profile to wear these marks is [his own](https://github.com/hamdibenjarrar).

<sub><a href="#top">Back to top</a></sub>

</div>
