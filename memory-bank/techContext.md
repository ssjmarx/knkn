# Tech Context — stack, tooling, environment

## Locked stack (per `syllabus.md` §I — do not relitigate)

- **TypeScript**, strict mode — the course's subject matter
- **Phaser 3** — rendering and input only; never imported by the logic core
- **Vite** — dev server and builds
- **Vitest** — unit tests for the pure core (introduced Unit 6; the Rule of 500 is the first test target)
- **JSON data tables + TS interfaces** — typechart, moves, rites, stones, ladders, schedules, flags
- **CI from day one** — typecheck + tests + build + deploy on every milestone
- **Web-first deployment** — host still undecided (see Open items); desktop/store packaging (Tauri/Electron/Capacitor/Tauri 2) deferred to Semester 4

## Presentation constraints

- Virtual resolution **240×320** (3:4), **16px** tiles — one config constant is its single home
- Crisp pixel-art rendering; integer scaling preferred (240×3 = 720); GBC shell is DOM/CSS around the canvas, not game code
- Phone-perfect by the vertical slice (Milestone 3): iOS Safari quirks, memory, texture atlases are Unit 21 topics

## Tooling plans by semester (from the syllabus)

Tiled for tilemaps (Unit 2) · spreadsheet→JSON content pipeline for 67 moves / 92 instances / 15+ wilds (Unit 18) · chiptune / Web Audio pipeline, the Chase sting, the Hum motif (Unit 19) · UI scenes, menus, Codex, pouch, shell polish (Unit 20) · profiling & mobile QA (Unit 21) · packaging & platform certs (Unit 22) · playtest telemetry for the Watchlist (Unit 23)

## Environment snapshot (observed 2026-09-03, pre-Unit 0)

- Node **v25.5.0** — works, but it is the *non-LTS* line; the syllabus calls for Node **LTS** (the human may switch to the Node 24 LTS via nvm/fnm before starting Unit 0)
- npm 11.8.0; no pnpm/yarn/bun installed (the course is npm-first anyway)
- git 2.47.3 — **repo initialized 2026-09-03**: branch `master`, two commits, no remote yet; the original `planning/` docs are preserved in history (`61285c6`) and were retired in `c84cc39`
- **git identity is still the placeholder** (`Your Name` / `your.email@example.com`) — and both existing commits carry it; set real values and rewrite the two commits before any push
- VS Code is the IDE

## Open infrastructure decisions

- **Deploy target** ("your website"): GitHub Pages vs Netlify vs Vercel vs Cloudflare Pages — undecided; it determines the Vite `base` path (e.g. `/knkn/` for a GitHub Pages project site) and the shape of the CI deploy job
- CI provider details follow from the repo host once the human adds a remote and pushes (no remote configured yet)
