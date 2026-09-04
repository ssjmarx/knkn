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
- Repo still contains only `.clinerules` + `memory-bank/` — no code, no dependencies, no CI yet. The human does **all** implementation themselves; the agent teaches, reviews, and maintains this bank — nothing else.

## What's next (the human's solo work — rest of Unit 0)

1. *(Optional)* Node is non-LTS v25.5.0; the syllabus prefers the LTS line (Node 24 via nvm/fnm) — preference, not blocker.
2. VS Code + the three extensions that matter.
3. **Scaffold Vite + Phaser + TypeScript by hand** (line-by-line lab): `package.json`, strict `tsconfig.json`, `vite.config.ts` (single 240×320 config constant; `base: '/'`), `index.html`, `src/main.ts`, `.gitignore`.
4. A fox sprite on a magenta screen ("Hello Kon Kon") → commit → push (both remotes).
5. `npm run build` → copy `dist/` to the nginx volume on the personal server → live at `knkn.dunaway.io`. Learn the nginx volume path — it becomes the deploy script's one variable.
6. Later: wrap deploy in a script; CI after that (repo is Gitea-primary, so Gitea Actions is the natural candidate).

**Done when:** "Hello Kon Kon" is live at knkn.dunaway.io.

## Open decisions (✎ — the human's, never the agent's)

From `design.md` §17:
1. Working title: **KON KON** / *Nine Stones* / *The Long Hum* / *Commonweal*
2. Country name sign-off ("the Commonweal") and isles name ("Halcyon")
3. Epilogue trigger formalized: nine tails (all 8 mastered) → Sun Road base scene; Deep Roots lore found en route
4. Pilgrim's eight phase-lines — "the game's best 80 words," to be written as a set

Infrastructure (added 2026-09-03):
5. Deploy target — ~~resolved 2026-09-03: Cloudflare published app `knkn.dunaway.io`, static files via nginx/Portainer on the personal server; Vite `base: '/'`~~ (was: GitHub Pages / Netlify / Vercel / Cloudflare Pages)

**Resolved 2026-09-03:** ~~#6 — rename `planning/` files to `.md`~~ — moot; the human deleted `planning/` entirely (preserved in git history), leaving the bank's `.md` mirrors as the sole copies.

## Watch items / reminders

- The **laptop (second dev machine) has its own, differently-named `gitea` SSH alias** in its `~/.ssh/config`; both machines pushed to Gitea historically. Pushing knkn from the laptop should work via that machine's alias — untested for this repo.
- The `gitea` alias on eMachine points at the server's **LAN IP** — fine at home; pushes from off-LAN (over Tailscale) would need a host block using the Tailscale IP.
- A GitHub PAT sits in **plaintext in eMachine's `~/.bash_history` (~line 1640)** — unused now that everything is SSH; mint-and-scrub if ever needed.
- Global gitconfig still carries `squeejee09@gmail.com` (repo-local config overrides it with `SSJMarx@dunaway.io`); other new repos will default to the Gmail identity unless the human changes the global.
- Node non-LTS vs the syllabus's LTS preference (optional switch).
- Design watch items live in the Prototype Watchlist (`design.md` §16) — relevant once battles exist; anything touching the Wane economy is auto-added.

## Session protocol

At the end of every session: update this file and `progress.md` (dated, factual). Record rulings in the canon mirrors (`design.md`, `syllabus.md`) only when the human issues them. Full rules: `.clinerules`.
