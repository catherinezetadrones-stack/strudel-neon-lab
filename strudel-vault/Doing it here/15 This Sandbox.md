---
tags: [strudel, project]
---

# This Sandbox

How *this* project works — the custom editor we built and the example songs. (Project-level
docs also live in the repo's `README.md` and `CLAUDE.md`.)

## Running it

- `npm run dev` starts the local server at **http://localhost:5180**. Open that in
  **Chrome or Edge** (not the VS Code preview — the File System Access API for saving is
  blocked in embedded webviews).
- Audio needs a **click/keypress first** (browser autoplay policy). Click into the editor,
  then play.

## Editor controls

- **Ctrl+Enter** — play / update the pattern (re-evaluates).
- **Ctrl+.** — stop.
- **Ctrl+Space** — autocomplete (docs-driven; each entry shows description + examples).
  Or just start typing.
- **Ctrl+Z / Ctrl+Shift+Z** — undo / redo.

## Files (open / save to disk) {#files}

A real file workflow via the toolbar (and shortcuts):

- **New**, **Open** (Ctrl+O), **Save** (Ctrl+S), **Save As** (Ctrl+Shift+S).
- Save writes back to the **same file on disk** (Chrome/Edge). The magenta dot = unsaved
  changes; the tab warns before closing with unsaved work.
- **Saving a running pattern hot-reloads it** — your edit takes effect immediately without
  stopping. (If a sound goes wrong, the toolbar status shows the eval error instead of
  failing silently.)
- Use the **`.js`** extension (Strudel code is JavaScript-flavored). Patterns live in
  `patterns/`.

## Blocks (sections) {#blocks}

Mark sections with `//#region <label>` … `//#endregion`. They become:

- A **chip** in the rail above the editor (label, collapse, mute, jump).
- A **visual card** in the editor (the section is boxed off).
- **Collapse** hides a section's body (folded code still plays and still saves fully).
- **Mute** comments the section out (skipped on play, persists in the file). Unmute restores.

This mirrors the [[12 Structure and Arrangement|arrangement]] concepts: each block ≈ a part you
can isolate while writing.

## Loading switch-angel's prelude {#prelude}

The **+ switch-angel** toolbar button loads a third-party library of custom words
(`acid`, `nsc`, `trancegate`, `o`, …) from `patterns/apx/switch-angel/`. It runs through
Strudel's own evaluator (so the words register correctly) without disturbing playback. It
drops a collapsed `prelude:switch-angel` block marker so you can see it's loaded.

> [!warning] Two gotchas with the prelude
> - The custom words are **session-only** — a page refresh clears them; click the button
>   again. They're not needed for the self-contained songs.
> - Many of switch-angel's patterns route through **orbits** (`.o(n)`), which are silent in
>   this embed (see [[13 Mixing and Levels#orbits]]). Strip `.o()` if a part is silent.

## Preloaded sounds {#preloaded-sounds}

No setup needed for: **Dirt-Samples** (`bd sd hh cp …`, plus breaks like `breaks165`),
**drum machines** (`.bank("RolandTR909/808/…")`), **piano**, **vcsl**, **mridangam**,
**uzu-drumkit**, and all the [[8 Synthesis|synths]] (`sawtooth`, `supersaw`, `white`, …).
Extra packs load via `samples('github:user/repo')` — see [[5 Sounds and Samples]].

## Example songs {#example-songs}

In `patterns/`:

| File | What it teaches | Needs |
|---|---|---|
| `cyberpunk-drift.js` | a layered dark-techno **loop** with `$:` tracks | nothing |
| `nocturne-arrange.js` | **arrangement**: chord voicings, `.arp()`, `mask` build, `arrange()` timeline — **heavily commented** | nothing |
| `switchangel-nightdrive.js` | switch-angel's custom words (`acid`, `nsc`, `trancegate`) | click **+ switch-angel** first |
| `samples-demo.js` | sample loading, layering, breakbeat chop | github packs (async) |
| `nocturne-arrange.js` | read this one first for learning — every line is explained | — |

Start by opening **`nocturne-arrange.js`** and reading top-to-bottom; it's annotated to teach
the arrangement tricks in [[12 Structure and Arrangement]] and [[7 Chords and Voicings]].

## Related

- [[Start Here]] · [[1 From Ableton to Strudel]] · [[14 Cookbook]]
