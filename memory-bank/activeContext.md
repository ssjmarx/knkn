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
- **Scaffold hand-built, committed, deployed (2026-09-03):** `.gitignore` · `package.json` (exact pins phaser 4.2.1 / TS 7.0.2 / Vite 8.2.2; `build` = `tsc && vite build` gate) · strict `tsconfig.json` · `vite.config.ts` (`base: '/'`, `server.host`) · `index.html` · `src/config.ts` (240×320/16px constants, one home) · `src/main.ts` (BootScene: Elthen placeholder fox on magenta). Commits: `e896e4c` (bank) + `3d36eef` (scaffold), both pushed to both remotes.
- **UNIT 0 COMPLETE (2026-09-03):** first gated build, first deploy — "Hello Kon Kon" live at `knkn.dunaway.io` on the human's own infra (nginx/Portainer + Cloudflare tunnel).
- **UNIT 1 COMPLETE (2026-09-03):** the fox walks — scenes split into `src/scenes/`, Elthen sheet anims (walk row 2, idle row 0), cursor-velocity movement, world-bounds collision, FIT scaling, facing flip; commits `6c58da1` → `6477d00`, pushed.
- **UNIT 2 COMPLETE (2026-09-04):** a real place — 30×30 Tiled map (`test_area.json`, embedded `town` tileset from Grumpy Function 8×8×2 placeholder art), tile-property collision, hard-locked camera (lerp 1, ruled), canopy layer (`branches.setDepth(1)`), boot-time tile-size validation via the `Tilemap` object. Virtual resolution now **240×240 (1:1)** per human ruling. Commits `77a243f` + `2c5e779`, pushed and deployed. `src/types.ts` currently unused (kept for Unit 7's data-validation work, or delete — human's call). CI not yet built. The human does **all** implementation themselves; the agent teaches, reviews, and maintains this bank — nothing else.

## What's next (the human's solo work — rest of Unit 0)

1. **Unit 3 — the follower:** Kon Kon trails the player with GBC-style step-and-delay — the fox stops being the player and becomes the partner, per canon. Prerequisite: a *player-character* sprite (human child placeholder, 16×16-ish; license filed if third-party). TS payload: classes, `this`, modules, imports/exports.
2. CI when convenient: typecheck + build + deploy on push (Gitea Actions is the natural candidate).
3. Optional: `docker rm pihole` (the dead container); decide the fate of `src/types.ts`.

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
- ~~`~/opt/web/knkn` root-owned~~ — chowned 2026-09-03. The dead `pihole` container still sits on the server (Exited) — optional `docker rm` tidy.
- Design watch items live in the Prototype Watchlist (`design.md` §16) — relevant once battles exist; anything touching the Wane economy is auto-added.

## Session protocol

At the end of every session: update this file and `progress.md` (dated, factual). Record rulings in the canon mirrors (`design.md`, `syllabus.md`) only when the human issues them. Full rules: `.clinerules`.
