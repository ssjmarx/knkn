# Tech Context — stack, tooling, environment

## Locked stack (per `syllabus.md` §I — do not relitigate)

- **TypeScript**, strict mode — the course's subject matter
- **Phaser 4** (4.2.1, release "Giedi") — rendering and input only; never imported by the logic core. *Human ruling 2026-09-03: Phaser 4 supersedes the syllabus's Phaser 3 line — stable release, the human's existing Phaser 4 experience, TS-native with shipped types (`node_modules/phaser/types/phaser.d.ts`; single runtime dependency: `eventemitter3`). Standing course rule: when Phaser 3-era tutorials/examples misbehave, suspect the version first, then read the shipped types.*
- **Vite** — dev server and builds
- **Vitest** — unit tests for the pure core (introduced Unit 6; the Rule of 500 is the first test target)
- **JSON data tables + TS interfaces** — typechart, moves, rites, stones, ladders, schedules, flags
- **CI from day one** — typecheck + tests + build + deploy on every milestone
- **Web-first deployment** — `knkn.dunaway.io` on the human's personal server (resolved 2026-09-03; see Infrastructure decisions); desktop/store packaging (Tauri/Electron/Capacitor/Tauri 2) deferred to Semester 4

## Presentation constraints

- Virtual resolution **240×240 (1:1)**, **16px** tiles — one config constant is its single home. *(Human ruling 2026-09-04, superseding 240×320/3:4: the square screen leaves portrait room for the pseudo-GBC shell art/buttons, and landscape side bars for an alternate touch layout.)*
- Crisp pixel-art rendering; integer scaling preferred (240×3 = 720); GBC shell is DOM/CSS around the canvas, not game code
- Phone-perfect by the vertical slice (Milestone 3): iOS Safari quirks, memory, texture atlases are Unit 21 topics

## Tooling plans by semester (from the syllabus)

Tiled **1.11.90 (installed 2026-09-04)** for tilemaps (Unit 2) · spreadsheet→JSON content pipeline for 67 moves / 92 instances / 15+ wilds (Unit 18) · chiptune / Web Audio pipeline, the Chase sting, the Hum motif (Unit 19) · UI scenes, menus, Codex, pouch, shell polish (Unit 20) · profiling & mobile QA (Unit 21) · packaging & platform certs (Unit 22) · playtest telemetry for the Watchlist (Unit 23)

## Environment snapshot (updated 2026-09-03, post first push)

- Node **v24.20.0 LTS** (switched 2026-09-03 from non-LTS v25.5.0: NodeSource repo file repaired `node_22.x` → `node_24.x`, apt downgrade with `--allow-downgrades` — the repo had drifted while 25.5.0 sat installed "locally"); npm **11.19.0** (bundled with Node 24); no pnpm/yarn/bun (the course is npm-first anyway)
- git 2.47.3 — branch `master`, three commits (`a6a4773`, `d3ab399`, `ddfc91f`); history rewritten 2026-09-03 with the real identity `SSJMarx <SSJMarx@dunaway.io>` (**repo-local** config — the global config still says `squeejee09@gmail.com`)
- **Remotes (first push 2026-09-03):** `origin` = Gitea `git.dunaway.io/ssjmarx/knkn` (web UI behind Cloudflare Access; Tailscale-direct `http://100.81.193.81:3000`), fetch + primary push over **SSH** via the per-machine `gitea` alias (→ server LAN IP, port 2222, user `git`), key `~/.ssh/id_ed25519` (Gitea key name "eMachine"); second push URL = GitHub mirror `git@github.com:ssjmarx/knkn` (same key, registered on account `ssjmarx`). **No credential helpers, no tokens in use.** An HTTPS-via-Tailscale remote was tried first and superseded the same day after credential friction (VS Code askpass, no helper configured).
- **Deploy:** Cloudflare published app `knkn.dunaway.io` (route registered); Vite `base: '/'`; served by Portainer container **`knkn-web`** (nginx:alpine, volume `/home/ssjmarx/opt/web/knkn` → `/usr/share/nginx/html`, on the `web` bridge network alongside the cloudflared tunnel container). The human's established pattern: each deployed game is its own Portainer nginx:alpine container volume-mounted from `~/opt/web/<game>` — **pointdefense** (Missile Command variant, cellular-automata-inspired VFX) and **phix** (Qix variant), both plain JavaScript. Deploy = `npm run build` → `rsync -rv --delete dist/ server:opt/web/knkn/`. **First deploy completed 2026-09-03 — "Hello Kon Kon" is live.**
- **Asset licensing convention (2026-09-03, user ruling):** `licenses/` at the repo root holds the license text of every asset the human didn't make; third-party asset filenames are source-tagged (e.g. `fox_single_elthens.png`). First entry: Elthen's 2D pixel art fox sprites (itch.io), "Elthen's Common Sense License 1.0" — **placeholder only** (32×32, not GBC aesthetic, not two-tone-customization-ready; Kon Kon is a significant character and demands bespoke art).
- **Server ops (2026-09-03 incident, resolved):** after the human removed Pi-hole (~2 weeks prior), `/etc/resolv.conf` carried two leftovers — a stale `nameserver 127.0.0.1` and a `chattr +i` immutability lock protecting it. Host-level DNS was dead but unnoticed (containers carry their own resolvers; the tunnel is outbound) until the first host-level `apt` fetch. Fixed: unlock → repoint to `1.1.1.1`/`8.8.8.8` → re-locked. `rsync` installed on the server; `~/opt/web/knkn` chowned to ssjmarx. Dead `pihole` container still present (Exited) — optional `docker rm` tidy. Other server containers: `gitea` (port 3000, SSH 2222→22 — the origin of the `gitea` ssh alias), `portainer`, `site`, `blob-web`, `pointdefense-web`, `phix-web`, `roundcube`, `dovecot`, `box`, `cloudflared`.
- Second dev machine (laptop) with its own `gitea` SSH alias — both machines pushed historically; untested for this repo
- VS Code is the IDE
- **Project tooling pinned (2026-09-03):** `phaser` 4.2.1 / `typescript` 7.0.2 / `vite` 8.2.2 — exact pins (upgrades are deliberate acts); `npm install` clean, 19 packages, 0 vulnerabilities
- **Code style (user ruling 2026-09-03):** semicolon-free (relying on ASI), commas only where required; filenames lowercase everywhere; no linter/formatter yet — a Prettier elective can enforce the style mechanically later
- **Elthen fox sheet map (measured):** 448×224 = 14 columns × 7 rows of 32×32 frames; walk = row 2 (frames 28–35), idle = row 0 (frames 0–4); fox body inside the frame = 20×15 at +6,+17 (also the arcade collision body)
- Desk monitor is a **CRT** — adaptive FIT + autoRound scaling chosen accordingly; CRTs are forgiving for pixel-art scaling

## Phaser engine notes (learned from shipped source/types — the standing rule paying off)

- **Typed caches:** loaded files land in per-type caches (`cache.json`, `cache.tilemap`, `cache.image`, …). `tilemapTiledJSON` stores a **wrapper `{ format, data }`** in `cache.tilemap` (TilemapJSONFile.js line 54) — the raw Tiled JSON lives under `.data`. Prefer reading from the `Tilemap` object (`make.tilemap({ key })` → `map.tileWidth` etc.) over peering into caches.
- **Tiled authoring contract:** export maps with tilesets **embedded** (external `.tsx` references don't survive to the browser — the JSON must be self-contained). `addTilesetImage(name-in-map-data, image-key)` — the *name field*, never the `.tsx` filename.
- **Display order:** equal `depth` (default 0) renders by insertion order; higher depth renders on top. `branches.setDepth(1)` is the above-player canopy layer — the general "walks behind" recipe for signs, railings, house fronts.
- **Camera:** `startFollow(target, roundPixels, lerpX, lerpY)`. Lerp 1 = hard-locked — **ruled the accurate GBC feel (2026-09-04)**. Low lerp exposes sub-pixel rounding jitter (two independently rounded floats: `world − scroll`); real GB hardware scrolled whole pixels only, making the artifact impossible on-target — a standing argument for grid-locked movement.
- **`Phaser.Scale.FIT` + `autoRound`** is the adaptive scaling mode (replaces fixed zoom; CRT-friendly).

## Infrastructure decisions (resolved 2026-09-03)

- **Deploy target:** personal infrastructure — Cloudflare published app `knkn.dunaway.io`, static files via nginx/Portainer on the personal server (not GitHub Pages/Netlify/Vercel/Cloudflare Pages). Vite `base: '/'` (root domain).
- **Repo topology:** Gitea primary (`git.dunaway.io`) + GitHub mirror via dual push URLs on `origin`; fetches from Gitea only.
- **CI:** not yet built; the repo is Gitea-primary, so Gitea Actions is the natural candidate when CI arrives.
