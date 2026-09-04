# Active Context — where we are right now

> The living file. Future agents: read this after the brief/context files; update it at session end. Date every entry. Facts only.

## Current state (2026-09-03, end of session — first push landed)

- **Phase: Unit 0 well underway.** Branch `master`, three commits, clean tree, in sync with `origin/master`.
  - `a6a4773` — initial commit (`.clinerules` + memory bank + the original `planning/` docs) · `d3ab399` — `planning/` retired · `ddfc91f` — bank sync ("teh fix"); history rewritten 2026-09-03 so every commit now carries the real identity `SSJMarx <SSJMarx@dunaway.io>`
- **Remotes live, first push done (2026-09-03).** `origin` fetches from Gitea and carries **two push URLs**, so one `git push` hits both:
  - Primary: `gitea:ssjmarx/knkn.git` — SSH alias (per-machine, defined in `~/.ssh/config` → server LAN IP, port 2222, user `git`), key `~/.ssh/id_ed25519` (Gitea key name "eMachine"); web UI at `https://git.dunaway.io/ssjmarx/knkn` (behind Cloudflare Access; Tailscale-direct `http://100.81.193.81:3000`)
  - Mirror: `git@github.com:ssjmarx/knkn.git` — same key, registered on the GitHub account (`ssjmarx`)
  - Transport ruling: **SSH everywhere — no tokens, no credential helpers** (an HTTPS-via-Tailscale remote was tried first, hit credential friction, and was superseded the same day)
- **Deploy plan (open decision #5, resolved):** Cloudflare published app **`knkn.dunaway.io`**; Vite `base: '/'`; `dist/` served by an nginx container in Portainer on the personal server (`ssh server`) — same pattern as the human's other Phaser minigames
- **Scaffold hand-built (2026-09-03, reviewed & approved, not yet committed):** `.gitignore` · `package.json` (exact pins phaser 4.2.1 / TS 7.0.2 / Vite 8.2.2; `build` = `tsc && vite build` as the CI gate) · strict `tsconfig.json` · `vite.config.ts` (`base: '/'`, `server.host` for phone testing) · `index.html` (page-is-the-Game-Boy) · `src/config.ts` (the 240×320 / 16px constants, one home) · `src/main.ts` (Phaser 4 boot, BootScene, magenta screen). `npm install` done, typecheck green.
- No CI yet; first deploy pending. The human does **all** implementation themselves; the agent teaches, reviews, and maintains this bank — nothing else.

## What's next (the human's solo work — rest of Unit 0)

1. Confirm the dev server shows the magenta screen (`npm run dev`; also try it from the phone over LAN — `server.host: true` is set for exactly that).
2. **Segment 6 — "Hello Kon Kon":** the human makes a fox sprite (`public/assets/konkon.png`), wires `preload`/`create` in `BootScene`, break-it-on-purpose (bad asset key, missing file, misspelled import), then the first scaffold commit + push (both remotes).
3. Deploy: `npm run build` → copy `dist/` into the server's `~/opt/web/knkn/` (needs `sudo chown ssjmarx: ~/opt/web/knkn` first — dir was created root-owned) → verify at `knkn.dunaway.io`.
4. CI later (Gitea Actions is the natural candidate).

**Done when:** "Hello Kon Kon" is live at knkn.dunaway.io.

## Open decisions (✎ — the human's, never the agent's)

From `design.md` §17:
1. Working title: **KON KON** / *Nine Stones* / *The Long Hum* / *Commonweal*
2. Country name sign-off ("the Commonweal") and isles name ("Halcyon")
3. Epilogue trigger formalized: nine tails (all 8 mastered) → Sun Road base scene; Deep Roots lore found en route
4. Pilgrim's eight phase-lines — "the game's best 80 words," to be written as a set
5. Character customization & renaming — where/when the customization and rename screens live in the game flow (start of game vs. diegetic location) — added with the 2026-09-03 customization ruling (`design.md` §17–18)

Infrastructure (added 2026-09-03):
5. Deploy target — ~~resolved 2026-09-03: Cloudflare published app `knkn.dunaway.io`, static files via nginx/Portainer on the personal server; Vite `base: '/'`~~ (was: GitHub Pages / Netlify / Vercel / Cloudflare Pages)

**Resolved 2026-09-03:** ~~#6 — rename `planning/` files to `.md`~~ — moot; the human deleted `planning/` entirely (preserved in git history), leaving the bank's `.md` mirrors as the sole copies.

## Watch items / reminders

- The **laptop (second dev machine) has its own, differently-named `gitea` SSH alias** in its `~/.ssh/config`; both machines pushed to Gitea historically. Pushing knkn from the laptop should work via that machine's alias — untested for this repo.
- The `gitea` alias on eMachine points at the server's **LAN IP** — fine at home; pushes from off-LAN (over Tailscale) would need a host block using the Tailscale IP.
- A GitHub PAT sits in **plaintext in eMachine's `~/.bash_history` (~line 1640)** — unused now that everything is SSH; mint-and-scrub if ever needed.
- Global gitconfig still carries `squeejee09@gmail.com` (repo-local config overrides it with `SSJMarx@dunaway.io`); other new repos will default to the Gmail identity unless the human changes the global.
- `~/opt/web/knkn` on the server was created **root-owned** — `sudo chown ssjmarx:` it before the first deploy (deploy = copy `dist/` into it).
- Design watch items live in the Prototype Watchlist (`design.md` §16) — relevant once battles exist; anything touching the Wane economy is auto-added.

## Session protocol

At the end of every session: update this file and `progress.md` (dated, factual). Record rulings in the canon mirrors (`design.md`, `syllabus.md`) only when the human issues them. Full rules: `.clinerules`.
