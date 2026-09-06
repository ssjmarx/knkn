> **CANON — the sole authoritative copy.** This file carries the KON KON game design (lock v1.0), seeded verbatim from `planning/outline` on 2026-09-03. The `planning/` folder was retired into git history that same day (commit `c84cc39`), making this the only authoritative copy. Per `.clinerules`, the memory bank is the AI's source of truth. Update this file only to record human-issued design rulings, faithfully.

# KON KON — Game Design Reference v1.0

**Status:** Design lock. Two new rulings integrated throughout: **tails = mastered stones** (not stones carried), and **the ascent is sequel-only** — this game ends at the road's base, never on the stairs. Legend: unmarked = locked · ⚠ = pending prototype data · 🅿 = parked (sequel/NG+) · ✎ = open decision.

---

## 1. Vision

**Pitch:** *A monster-taming JRPG with a single shape-shifting partner. Roam a post-scarcity Americana countryside, earn the eight planetary stones in any order, and master every form of the fox who chose you.*

**Pillars:**
1. **One bond, nine forms** — the collection instinct retargeted from bodies to forms, moves, and mastery
2. **Freedom with a pulse** — stones in any order, wilds never scale, and the world runs on its own calendar whether you participate or not
3. **The test, not the war** — full HP between every fight; no attrition; battles are mediation; nothing is caught, nothing is harmed
4. **Two actors, one body** — the Channeler (untargetable support) + the creature (attacks and setup) as a two-character JRPG
5. **Mastery is the journey** — frequent level-ups, visible tails, and a completion track that *is* the fox's body
6. **Country & cosmos** — planetary myth rooted in rural Americana

**Tone rules:** utopian conflict is always *imbalance*, never money or cruelty on screen. Comedy rationed: exactly three magical-girl homage beats. The Matriarch's answer is the thesis: *the mortal world is worth staying for.*

---

## 2. Setting Canon

- **The Accord:** battles are tests. Defeated wilds bow, scatter into motes, and leave a "gift" (XP). Defeat screen: **"The test is over."** No KO animations, no whiting out — defeat means a passerby (often the town dog) escorts you home, free retry, full HP.
- **Non-interference:** running from wilds always succeeds; fights happen by invitation.
- **The Table:** fully plant-based; meat-adjacent dishes survive as cultural TVP renderings. One signature dish per settlement, always in dialogue.
- **The Commons:** cities keep cats, towns keep dogs, the isles keep chickens. **Greeter dogs** walk you to what you're looking for (the diegetic quest compass — prototype early).
- **Channelers:** traveling semi-religious functionaries — dispute mediation, odd jobs, emergencies. Casual chosen one; society has a counter at the Registry for them.
- **Ecology:** stone-tradition channelers bond **foxes**. Other lineages bond other spirits (powered-up wild species, some with transformations) — visible via Redball grunts, 🅿 playable in sequel.
- **Fox ascension lore:** a nine-tailed fox who mastered all eight stones may climb the Sun Road; the road runs one way; what remains is a one-tailed kit. (Deep Roots Codex entry: *"What the Old Foxes Leave."*)

---

## 3. Geography

**The Commonweal** (✎ name) — an ellipse with the Mirrorwater bite in the southeast. **The Halcyon Isles** offshore: a second nation, free movement, no stones, own older spirit tradition.

```
...o.....O      Sabbathday Mills (Saturn)      ALDEBARAN (24-hr city)
O....o....      ANTARES (dream city)           Thunder Hollow (Jupiter)
...O...o..      REGULUS (evergreen capital)    Foundry (Mars)
o...o.....      Wayfare (Mercury)              MOTHERLODE (Terra — exact center, the Crossroads)
.....o...o      Vesper Bayou (Luna)            Heliotrope (Sol — the Dawn Cape)
...O....o.      FOMALHAUT (Grand Terminal)     Farallon (isles gateway quay)
```

- **The Axis:** the World-Tree at the center, visible on the horizon from every road. The Heartwood (90–140), the hollow lip (140–180), the Axis interior, the **Deep Roots** below (180–255).
- **Roads:** **the Long Road** (N–S: Sound landing → Sabbathday → Regulus → Crossroads → Fomalhaut → Gulf head; historic **Sunset Loop** branch → Wayfare → Antares) and **the Turnpike** (E–W: Antares → Crossroads → Foundry → Aldebaran). They cross beneath the Tree. State roads connect all minors. **Road rule:** roads are Accord corridors — wilds L5–25 everywhere on roads; the zones between hold the real tables.
- **Transit:** the **Magnet Line** (six stations: four cities + Wayfare + Foundry) starts dead, revives via the Redball arc. Ferries free at Reputation 2. Hitch-a-ride truckers on the Long Road. Burrow (Terra) opens the mound network late. Moon-Path (Luna) trivializes the Farallon crossing late.
- **Wild bands:** Evergreen Sea 15–45 · Storm Plateau 35–70 · Plains 20–50 · Copper Desert 25–60 · Soundside Cliffs 30–65 · Gulf Prairies/Bayou 30–70 · Isles 40–80 · Deep Roots 180–255. **Wilds never scale.**
- **Underground:** four city wells → the root-roads → the Confluence (beneath the Crossroads). Wells quest branches by which city you descend.

---

## 4. Clock & Calendar

- **7 weekdays**, each planet's day: spawns weight toward that type, its shrine surges, schedules shift. **Terra surges on festival days** (⚠ reconciliation — the Wheel-of-the-Year festivals are Terra's "weekday").
- **Festival calendar:** the eight pagan festivals + market days; the Almanac Guild publishes the bulletin; the Forecaster (a mynah bird, late reveal) reads it on the radio.
- **NPC schedules, tiered:** 3–5 featured NPCs per town get full schedules; cities run *shifts* (different NPCs per slot — the sleepless feel without doubled scripts). **Aldebaran is 24-hour** — budget as its own content line.
- **Hour-Turn (Saturn verb):** rolls the clock forward, desyncing from real time. Everything reads in-game time; real time only seeds at file creation. No time-travel flags — events are events.

---

## 5. The Fox — Forms, Mastery, Tails

**Kon Kon:** nonverbal, animation-first personality (opinions expressed in overworld barks, ear-flattens, tail-flicks; idle richness scales with tails). Name means the sound a fox makes. Base sprite: small fox, nature-spirit, Ōkami-adjacent.

### 5.1 Stats & levels
- **Stats:** Actual = floor(Base × (0.5 + L/255)) + 5. **HP = 5 + 4L** (level-derived only, identical across forms). Range 5–255; you start at L5.
- **Channeler Speed = 200 − Σ(move weights) − Σ(item weights)** — flat forever. Creature Speed = actual Spe − Σ(its move weights).
- **XP:** cost = 25 + 10L (linear), yield scales → constant level cadence (~1 level/10 min mid-game). Quest chunks pay 8–12 levels.
- **Rule of 500:** same-level neutral mirror hits-to-KO ≈ 500 ÷ Power. Design strikes at Power 60–125 and bulk self-tunes. Boss fights target 10–20 turns; trash 2–4.

### 5.2 The nine forms (BST 750 each)

| Form | Atk | Def | SpA | SpD | Spe | Identity |
|---|---|---|---|---|---|---|
| Base (Spirit) | 150 | 140 | 150 | 140 | 170 | The closer — no extremes, no holes |
| Sol | 125 | 130 | 175 | 165 | 155 | Sustaining special duelist |
| Luna | 100 | 135 | 160 | 165 | 190 | The phantom — Moon-Double, no AoE |
| Mercury | 180 | 120 | 110 | 140 | 200 | The assassin — priority identity |
| Venus | 115 | 145 | 170 | 165 | 155 | Attrition enchantress |
| Mars | 200 | 110 | 130 | 135 | 175 | Glass cannon; War-Fever ramp |
| Jupiter | 125 | 120 | 200 | 140 | 165 | The delete button |
| Saturn | 145 | 175 | 145 | 175 | 110 | Inevitability; acts-last tech |
| Terra | 170 | 200 | 105 | 160 | 115 | The bulwark |

**200 Club:** Mars/Atk, Jupiter/SpA, Terra/Def, Mercury/Spe — each extreme answers another's excess.

### 5.3 Tails
**One tail per stone mastered (Mastery 255). Base = 1 tail; nine tails = all eight mastered.** Tail count is a world-facing variable: rural featured NPCs, guardians, and job postings react ("Applicants should show five tails"); cities don't notice. Save icon, trainer card, Codex spine display it. Chase's *"Kyuu — as in nine"* now means he intends to master everything.

### 5.4 Base form kit (4 slots; each slot = baseline ability or taxed stone move)
Stone moves cast from base form take **Dwindle-80** (the coverage tax); setup/support stone moves are the intended grab.

| Line | Base | Milestone (story) | Purist top (one per city) |
|---|---|---|---|
| Attack | **Strike** 50/0/3 | Fang-Barrage 75/15/5 *(the Hum)* | **True-Strike** 95/0/8 — Antares, the stunt double |
| Tempo | **Quickstep** 40/0/2, enemy Acc −1 | Fade-Step 50/0/3, Acc −1 + self Eva +1 *(the Wells)* | **Ghost-Step** — Regulus, the ferry captain |
| Offense setup | **Attune** +1 Off | Deep-Attune +1 Off/+1 Def | **Soul-Attune** sharp +2s — Aldebaran, the night cabbie |
| Defense setup | **Curl** +1 Def | Iron-Curl +1 Def/+1 SpD | **Steel-Curl** — Fomalhaut, the stationmaster |

### 5.5 Mastery
- 0–255 per stone. **+1 per creature action in that form** (Channeler actions don't count; split bodies train their own tracks; base-form use of a stone move trains that stone).
- ~25–35 battles per stone ≈ 30 levels. **5–6 mastered by credits; all 8 by end of optional content** → nine tails → epilogue eligible.
- Mastery grants **moves only**, never stats. Unlock fires end-of-turn with jingle; if slots full, replace prompt queues to battle end.
- **The Antiquarian** (move tutor, diner counters): relearns, handles base-form slot swaps. Dojo **Sparring Partners** in cities: mastery-only battles (no XP/money) — the short-session loop.

---

## 6. Moves — 67 effects, 92 instances

**Base form:** 12 (4 uniques × 3 tiers). **Stone originals:** 16 (2 per stone). **Semi-originals:** 40 instances from 15 templates. **Shared:** 24. Animations: ~67 core + template palette swaps ≈ 90 with SFX.

### 6.1 The 15 templates
T1 Elemental Strike 75/0/5 · T2 Piercing 60/30%/5 · T3 Heavy 105/85%/8 · T4 Quick 45/+1pri/3 · T5 Hunter's 65/+50% vs Dwindled/5 · T6 Draining 60/heal 50%/6 · T7 Hexing 70/30% status/6 · T8 Withering 40/Dwindle-75 ×3t/6 · T9 Rebuke counter 50%/5 · T10 Charge 130 two-turn/8 · T11 Echo 40×2/5 · T12 Snare 30 + 1/8 seed/5 · T13 Agile-Step +1 Spe/3 · T14 Veil-Step +1 Eva/4 · T15 Frenzy 85/self +1 Off/7.
*(Ecosystem: T8 feeds T5; T15 feeds itself; T12 is Saturn's philosophy at creature scale.)*

### 6.2 The 24 shared
Elemental strikes ×8 (70/0/5): Sun-Spark, Dew-Lance, Gust-Cut, Bloom-Whip, Ember-Bite, Spark-Snap, Hour-Blade, Root-Whip. Status ×4 (60/30%/6): Daze-Snap, Sleep-Pollen, Cinder-Bite, Glare-Gaze. Utility: Renew (heal 50%, wt10), Ward-Stance (protect, no consecutive), Endure, Center, Nip (35/+1pri/2), Twin-Bite 35×2, Leech-Bite (50/heal 33%), Scatter-Gust (AoE 45). Setup: War-Cry +1 Atk, Focus-Mind +1 SpA, Stone-Stance +1Def/+1SpD (wt4 each), Rally +1/+1 (wt6, Spirit).

### 6.3 Originals & capstones (M255)

| Stone | Free (M0) | Originals | Capstone |
|---|---|---|---|
| Sol | Dawn-Bolt + Focus-Mind | Sun-Lance, Sun-Flare | Sun-Lance 90/15/8 — Sun-Dawn: Pen 30 |
| Luna | **Moon-Double** + Dew-Lance | Dream-Bite, Moon-Double | Dream-Bite 80/0/6, 20% Sleep — Moon-Veil: 35% |
| Mercury | **Foxfire Split** + Gust-Cut | Foxfire Split, Ricochet-Dart | **Split → Multitude** (1→3, wt8) |
| Venus | Bloom-Whip + Stone-Stance | Sweet-Drain, Spore-Cloud | Sweet-Drain 75/heal 50% — Bloom-Hush: 75% |
| Mars | Ember-Bite + War-Cry | Reckless Cleave, Cleave-Storm | Reckless Cleave 110/25% recoil — Ember-Wake: 30% Aflame |
| Jupiter | Spark-Snap + Focus-Mind | Sky-Fall, Sky-Rend | Sky-Fall 120/0/12 — Storm-Sky: never misses |
| Saturn | Hour-Blade + Stone-Stance | Reaper's Toll, Reap | Reaper's Toll 70/Doom-3 — Grey-Hush: Doom-2 |
| Terra | Root-Whip + Stone-Stance | Quake-Step, Fissure-Wave | Quake-Step 95/0/9 — Deep-Soil: −1 Spe on hit |

Full unlock ladders as specced (M15→M235 events per stone; AoE by ~M95–115 except Luna by design and Mercury M175 ⚠).

---

## 7. Battle System

**Format:** 1v1 creature + untargetable Channeler. Wilds = **packs of 1–6, one segmented HP bar** (breaking a segment pops a body). Trainers/bosses run enemy Channelers; wild fights hide the Channeler panel entirely.

### 7.1 Turn structure
Both sides secretly select **creature move + Channeler action** (rite, item, transform, Breathe). All four resolve in one queue: **priority tier → speed.** Consequences: kill-pressure reads vs. both enemy actors; transformations resolve at the Channeler's initiative slot (old form is hittable until then). **Transforming costs the Channeler action + that creature's attack** (Quickchange excepts it).

### 7.2 Damage & stats
`Damage = ((2L/5+2) × Power × A / (D × (1−Pen))) / 50 + 2` — Pen tiers 0/15/30/50%, applies to final defended stat incl. stages. Stat stages ±6, standard Pokémon multipliers; Acc/Eva ±6; crits ×1.5, ignore stages; **stages persist through transformation, both sides.**

### 7.3 Statuses
Daze (skip chance, Spe↓) · Sleep · Aflame (DoT, Atk↓) · Blind (Acc↓) · **Bound** (no transform, 3t) · **Doom** (deferred damage counter) · **Dwindle-NN** (attacks deal NN% — the general output-reduction status: clones 50, base-form stone moves 80, hexes variable).

### 7.4 Wane (Channeler soft resource)
Per-battle per-move pips: 0/1/2/3/4+ → 100/75/55/40/30%. +1 per use; **+2 total on consecutive reuse.** Profiles: Steady / Fragile (heals, Peal) / Enduring (hexes). **Breathe** = remove 1 pip from all equipped rites, nothing else. Fields exempt (exclusive, replaced). **Anything touching the Wane economy goes on the danger list** (see §19).

### 7.5 Channeler kit — 29 rites
Weights reduce Channeler Speed; stones are weightless Band equipment, not items. Starting kit: **Mend + Encourage**.

- **Mending:** Mend 25% (5) · Deep Mend 50%, −1 pri (15) · Dew-Rest regen 1/12×5t (10) · Clear-Water cure (8) · Last Breath survive-lethal once (12)
- **Blessing:** Encourage +1 Off (5) · Barkward +1 Def (5) · Keen-Eye +1 Acc (5) · Wind-Song +1 Spe (5) · War-Drum +2 Off/10% recoil (12) · Focus-Charm next attack crits (10)
- **Hexing:** Smoke Acc−1 (5) · Rattle Off−1 (5) · Mire Spe−1 (5) · Fog Blind (8) · Twitch Daze (10) · Ember-Pinch Aflame (10)
- **Duel:** **Peal +2 pri, cancel enemy Channeler action** (10, Fragile; Peal-vs-Peal: faster wins, loser fizzles and wanes) · Lead-Hex +15 enemy weight (8) · Knot Bound (10) · Anchor cure/prevent Bound (6) · Quickchange (8) · Pocket-Sleight steal item (6)
- **Field-Rite** (12): sets the field of any carried stone — Sun-Dawn / Moon-Veil / Gale-Run / Bloom-Hush / Ember-Wake / Storm-Sky / Grey-Hush / Deep-Soil, each ±30/−20% type damage + secondary per prior spec
- **Sealed rites** (specialization tax, kept): Storm-Call (Jup), Toll (Sat, Doom-40/3t), Dawn-Word (Sol) — function only while that stone is carried
- **Still Hour** (15): 5 turns, **initiative inverts** — learned by beating the Still Hour hermit

### 7.6 Foxfire Split (Mercury, wt6, slot-occupied)
1→2 bodies (Multitude: 1→3). Cap 3. Each body acts independently from its current form's pool. Segments split the HP pool; popped segment HP is lost. Bodies take Dwindle-50. Stat stages copy at split, then track independently. **Transform while split: legal, single-target (pick the clone)** — dual-type boards are endgame tech. Merge: Foxfire Lantern (Channeler item, wt6, infinite) or last-body-standing. Enemy AI: random clone → focus fire, **AoE if available**.

### 7.7 Packs
AoE chips every segment; pack leaders grant Alphahowl aura while alive; **Harriers** pressure the Channeler without targeting it (Web-Spit +10 weight, Snatch, Shriek +1 wane — telegraphed). **Gloop** (Mitosis) splits when hit, cap 6.

### 7.8 Scaling
Wilds: never. Guardians: L ≈ 15 + 20 × stones attuned. Story set-pieces: scale at trigger time. Champion ~L175; postgame kings 200+; one secret superboss at L255 with perfect stats (the Matriarch ⚠ Nine).

---

## 8. Powers

One per body, set by current form (player) or species (others). Split boards run multiple Powers simultaneously ⚠.

| Form | Power |
|---|---|
| Base | **Keen End** — +25% vs targets under ⅓ HP |
| Sol | **Radiance** — healing received +30% |
| Luna | **Mooncloak** — +10% evasion |
| Mercury | **Quicksilver** — priority attacks +25% |
| Venus | **Deep Roots** — drain heals +25% |
| Mars | **War-Fever** — consecutive Mars attacks +10%/each, max +30% |
| Jupiter | **Thunderhead** — +20% damage while any field is up |
| Saturn | **Reaper's Patience** — +25% when acting last |
| Terra | **Bark-Shell** — physical attackers take ⅛ max HP back |

**Hidden Powers** (postgame Deep Roots, toggleable): Sol Zenith · Mercury Many-as-One · Saturn Grave-Hour · Terra Anchor-Root (+4 to spec). **Named:** Heavyhand (hermit), Eager Start (prodigy, first action +2 pri), Perfected Form (rival's ace, stages can't drop), Matriarch's Nine (split cap 9, Dwindle-35 ⚠⚠). **Wild pool:** Alphahowl, Revenge, Guardian, Leech, Stone-Skin, Nightshade, Wind-Rider, Stalwart, Mimic-Fox, Grave-Toll, Barbs ⚠, Martyr, Mitosis. Codex logs "Power observed" from wilds.

---

## 9. Type Chart

Rows attack. **2** SE · **½** resisted · **0** immune · **·** neutral.

| ↓ / → | Sol | Luna | Merc | Ven | Mars | Jup | Sat | Terra |
|---|---|---|---|---|---|---|---|---|
| **Sol** | ½ | ½ | 2 | 2 | 2 | · | ½ | ½ |
| **Luna** | 2 | ½ | ½ | ½ | 2 | · | · | ½ |
| **Mercury** | ½ | ½ | · | · | ½ | 2 | 2 | ½ |
| **Venus** | · | ½ | · | ½ | · | 2 | ½ | 2 |
| **Mars** | · | ½ | · | 2 | 2 | · | ½ | 2 |
| **Jupiter** | 2 | 2 | ½ | ½ | · | ½ | 2 | 0 |
| **Saturn** | ½ | 2 | · | 2 | ½ | · | ½ | 2 |
| **Terra** | · | · | 2 | ½ | 2 | · | ½ | ½ |

**Wheel (teaching layer):** eclipse(Luna→Sol) · dawn(Sol→Mars) · iron(Mars→Venus) · roots(Venus→Terra) · mountain(Terra→Mercury) · trickster(Mercury→Jupiter) · storm(Jupiter→Saturn) · time(Saturn→Luna).
**Cross-edges:** Sol→Merc, Sol→Ven, Jup→Sol, Jup→Luna, Ven→Jup, Luna→Mars, Mars→Terra, Mars→Mars, Terra→Mars, Sat→Terra, Sat→Ven, Merc→Sat.
**Load-bearing cells:** Terra immune to Jupiter · Sol resists Saturn · Saturn resists Mars · Luna resists Mars · Mars/Terra mutual SE · two true stalemates (Sol/Saturn, Luna/Venus). Identities per §5.2. First softening levers if playtest demands: Jupiter½→Venus, Luna/Venus mutual resist.

---

## 10. Progression & Reputation

| Tier | Stones | Unlocks |
|---|---|---|
| Stranger 0 | — | Job board only |
| Registered 1 | 1 | Ledger entry |
| Local 2 | 2 | Ferries free; tail-greetings |
| Regional 3 | 3 | Almanac mention; free hitch-a-rides |
| **Sought Out 4** | 4 | **Jobs arrive by mail** — Redball Act I |
| Renowned 5 | 5 | Redball raid; Line opens; Chase AI adaptive |
| International 6 | 6 | Compact letter; stamp ceremony; isles open |
| Elder-Requested 7 | 7 | Deep Guild formal request; Heartwood deepens |
| The Eight 8 | 8 | Root Gate: *"Eight. It wakes."* |

**Rule: systems count stones; no single stone is ever a key.** The Line project runs on a fixed background schedule from minute one (survey → clearing → bed → rails → power → inaugural), visible in featured-NPC dialogue tiers. Storm-Call keeps general machine powers; the festival master-switch beat is dynamic (whoever holds Jupiter throws it; if both, Kon Kon wins the race).

---

## 11. Overworld Verbs (one per stone)

Click the object → Kon Kon transforms (1-sec flash) → **stays transformed** → repeat uses are instant. Pet to revert. Different stone auto-switches.

| Stone | Verb | Trigger | Effect |
|---|---|---|---|
| Terra | Burrow | molehills | tunnels; late: the mound network |
| Mercury | Gale-Dash | — | permanent ×1.5 speed; gust-gap crossings |
| Mars | Cinder-Cut | brush, braziers | burn barriers; brazier chains |
| Venus | Bloom-Weave | vines, buds | vine bridges; flower platforms |
| Sol | Dawn-Lantern | dark, shimmer-walls | light; reveals Veil-Doors |
| Luna | Moon-Path | calm water | water-walking |
| Jupiter | Storm-Call | lifts, bells, the Line | machines; vertical gates |
| Saturn | Hour-Turn | hourglasses, time-locks | clock roll; hour doors |

**Gating law:** no stone quest ever requires an overworld ability; abilities gate optional depth and the Deep Roots; combos are spice, never requirements. **Attunement visibility:** rural featured NPCs comment; cities don't. ⚠ **Open flag:** entering battle while attuned starts the battle in that form — prototype both ways.

---

## 12. Story Spine

**Cosmology:** the World-Tree's eight knots beat one per day — the calendar is transcription. Crown = the Sun Road. Foxes dream the world's dreams; the **Hum** is the tree talking in its sleep — a lullaby. **The Covenant:** *"The road is climbed by two: the fox who gathered, and the one the fox chose."* **The Pilgrim:** the fox who gathered all eight alone, was refused, and planted the stones at eight quiet places — the towns grew like rings around them. **The Matriarch** is its kit: reached the summit of wisdom, decided the mortal world was better, and is *on vacation* on the Deep Isle.

| Beat | Stones | Event |
|---|---|---|
| The Hum | ~2 | Kon Kon hums in its sleep; elders notice |
| The Wells | ~4 | Almanac job: shrine timings are drifting *(Redball Run sits here)* |
| The Briefing | ~6 | Old Sable: three ascensions, one narrowing bloom; elder foxes sit in the Tree's shadow |
| The Covenant | 7–8 | Confluence carvings; the full text |
| The Vigil | 8 | Country festival-vigil; the fear: *"if the road opens, our foxes will leave"*; Root Gate opens |

**The Redball Run** (Rep 4–5): Superintendent Crane's **Console** — industrialized permanent Bound — versus the one taboo. Acts: Strays → the Train raid (the walk: you → Kon Kon → Chase → Kyuu conga line, Kyuu's lane war, the crate squeeze, the Dawn-Lantern stealth dial, Caboose-as-radar, stealth has no fail-state) → the Festival (passenger inaugural, Bond Charter, Crane sentenced to bison stewardship). Beats: the fox manifest, the cradle shatter + *"You tried to crate my rival's fox,"* the doubles synergy, the notebook, the 60/40 gag, the window-mirror foreshadow. Rewards: Satchel, Brass Whistle, Caboose.

**The Heart:** the Mirror (your Kon Kon's copy, two forms, no Channeler — *"Alone, it is only clever. With you, it is finished."*) · the Sword (Chase, losable either way) · the Jewel (stones sink home; montage of eight burials). **The Pilgrim** — final boss, nine phases up the wheel, one story-fragment line per phase ✎, Elderlight (stages persist, transforms cost nothing), returns to base for the finish. The flowering; the Pilgrim climbs — *that's* what it waited for. Chase: *"…And miss my own headlining tour?"* Kon Kon curls up at your feet. **Not yet.** Credits.

**Epilogue** (unmarked): after nine tails and the Matriarch's blessing — *"Tell the sky the sea sends its regards"* — the farewell at the road's base. **The ascent itself is never depicted. 🅿 Sequel-only.** The kit stirs. NG+ = raising the kit 🅿.

**Chase outcome matrix:** win only the last → *"Everybody gets lucky sometimes."* Win all but the last → *"I TOLD you I'm the best!"* Mixed → *"Fighting with you is always a rush!"*

---

## 13. Cast & Organizations

**Chase & Kyuu** — sassy entrance theme (sting over any BGM; Ma Tutt hates it), the trail of receipts and notes, voice-message taunts that double as hint walkthroughs, the Ledger obsession vs. your indifference, post-raid **adaptive AI**: three stat lines (featherweight→his heavyweight/Still Hour; heavyweight→middleweight; middleweight→lightweight) + mastered stones chosen to counter your highest-XP tracks. His strength is decisions, not levels. Arc: summit with nine tails, doesn't climb, guest-stars postgame. **The Caboose** — bag stowaway (daily cap), alphabetizes your pouch, radar during the raid, retires to the departures board.

Organizations: Registry (licenses, job boards, the Ledger — visible, slightly annoying to access; checking it often shifts Chase's demeanor) · Road Wardens (Reyes, the defeat-mural gag) · the Post (Ridge) · Almanac Guild (the Sisters) · Guardians Troupe (Daichi; the flubbing Mercury actor; Kon Kon doubles as Luna late) · Friendly Society (Miss Buffie) · Deep Guild · Skyward Society (Old Sable) · Forge Union (Bram) · Halcyon Compact (the Harbormaster). Mom: radio actress, sweater cosmetics, dresser-drawer bank.

---

## 14. Scope Ledger (solo-dev accounting)

- **Sprites:** 9 battle forms + 9 overworld (base + 8 attuned) + ~15 wilds for launch zones + ~25 named humans (feature-tier) + Commons animals. Generative rule: forms share a fox base with per-stone palette + one signature feature.
- **Effects/animations:** 67 combat effects ≈ 67 animations + swap variants + ~90 SFX.
- **Text:** 12+ settlements (4 cities, 8 towns, 3 isles), 8 stone quests (8 distinct verbs: clock race, mirror dungeon, chase, dance, escort, weather-timing, time-loop puzzle, root descent), 4 Purist gates, 1 raid (6 set-pieces), Heart sequence, ~14 NPC arcs, Pilgrim phase-lines.
- **Music:** ~35–40 tracks (Chase's sting, 4 city themes, 8 town themes, field/set-piece themes, the Hum motif in 3 arrangements).
- **Systems (build order):** battle loop → Channeler/Wane → transformation → mastery → packs → split → clock/calendar → schedules → Greeter dogs → reputation/flags → Ledger.

---

## 15. Parked / Sequel / NG+

Bond-any-species (foreshadowed via Redball grunts) · the ascent depicted · the tenth celestial form · kit-raising NG+ (mastery carryover = the entire balance question) · surplus bench (Pyropolis, Gemini Falls, Harrowsight, Ivory Corners, Spurline, Leviathan's Rest, Union Fair) · Crane's three postgame Friendly Society scenes.

## 16. Prototype Watchlist (the danger list)

Wane-interference of any kind · 3-body split output (1.5×) · clone×Doom/Leech/stages · Barbs (weight interference) · Matriarch's Nine · the Mirror fight · attuned battle entry · Mercury's pre-M175 pack game · Renew spam · Ward+Endure turtling · Daze ubiquity (5 carriers) · Rally cut candidate · road-corridor guardian rush at L15 (keep — it's the knowledge-is-the-unlock promise) · Greeter-dog follow loop.

## 17. Open Decisions (✎)

1. Working title: **KON KON** / *Nine Stones* / *The Long Hum* / *Commonweal*
2. Country name sign-off ("the Commonweal") and isles name ("Halcyon")
3. Epilogue trigger formalized: nine tails (all 8 mastered) → Sun Road base scene; Deep Roots lore found en route
4. Pilgrim's eight phase-lines — the game's best 80 words, to be written as a set
5. Character customization & renaming — where/when the customization and rename screens live in the game flow (start of game vs. diegetic location) — added 2026-09-03 (see §18)

---

## 18. Post-lock rulings (addenda — human rulings, recorded faithfully)

- **Character customization (ruled 2026-09-03):** the player has **two to six sprite variants with color variations** (emulating GBC palette limitations). **Kon Kon has a single sprite set with two color variations** — fur color, and tail tips/underbelly — *slightly breaking* the GBC limitations: a diegetic indication of Kon Kon's otherworldly nature. **Both the player and Kon Kon are renamable** (classic JRPG-style rename screen). Scope impact: adds 2–6 player sprite sets + palettes to the §14 sprite ledger; rename/customization UI touches save data (Unit 15) and the game-open flow. Placement is open decision ✎ #5 (§17).
- **GBC shell aesthetic (ruled 2026-09-03; Unit 20):** a purple shell with visible-circuitry vibe — "nothing legally identifying, just a cool vibe." The human will mock up a couple of shell options and choose a default.
- **Control map (ruled 2026-09-05; immutable):** the game is played with exactly eight inputs — D-pad (up/down/left/right), A, B, Start, Select — nothing else, ever. A = confirm/advance, B = cancel/back; **Start/Select are reserved for the pause menu** (unimplemented; HTML buttons added when relevant). Bindings are **placeholders pending future rebindable controls**: keyboard arrows = D-pad, Z = A, X = B, ENTER = Start, ESC = Select (Start/Select wired when the pause menu lands); gamepad A = `buttons[0]`, B = `buttons[1]`, Select = `buttons[8]`, Start = `buttons[9]`. Ruled to be encoded in the type system immediately: `Action = "a" | "b" | "start" | "select"`.
- **Dialogue B semantics (ruled 2026-09-06, with the typewriter):** within a conversation, B completes the typewriter instantly and advances complete lines — the earlier B-exits-dialogue behavior is deleted; conversations end only by running out of lines. A remains confirm/advance throughout. The dialogue-context refinement of the control map's B role.

---

**This is the lock.** When you're ready, implementation conversation, suggested agenda: (1) engine choice — I'd argue Godot with strict GBC presentation constraints over GB Studio, given schedules, the follower parade, and data volume; (2) architecture — everything above is tables, so the build should be data-driven from day one (types, moves, rites, ladders, schedules, dialogue flags as flat files, not code); (3) the vertical slice: one town, one quest, one guardian, full battle loop with Wane and transformation — the smallest thing that proves the *feel*. Which thread do you want to pull first?