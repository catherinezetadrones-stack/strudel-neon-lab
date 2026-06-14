# STRUDEL // NEON GRID

A tiny local setup for playing with [Strudel](https://strudel.cc) — a live-coding
language for making music in the browser (a JavaScript port of TidalCycles). Styled
with a dark cyberpunk/neon theme; the starter pattern is a dark acid-techno loop.

## Run it

```bash
npm install     # one time
npm run dev      # starts a local server, prints a http://localhost:5173 URL
```

Open the URL it prints. You'll get the full Strudel editor with a starter beat.

## Playing

- **Ctrl + Enter** — play / update the pattern
- **Ctrl + .** — stop
- **Ctrl + Space** — autocomplete (or just start typing a function name). Suggestions
  come from Strudel's own function docs, so each entry shows a description and examples.
- Edit the code live; re-run with Ctrl+Enter to hear changes.

## Saving your work

The toolbar (and keyboard shortcuts) give you real file open/save:

- **Ctrl + O** / **Open** — load a pattern file into the editor
- **Ctrl + S** / **Save** — write back to the same file you opened
- **Ctrl + Shift + S** / **Save As** — write to a new file
- **Ctrl + Z** / **Ctrl + Shift + Z** — undo / redo (handled by the editor)
- The **magenta dot** next to the filename means you have unsaved changes; the browser
  also warns you if you try to close the tab with unsaved work.

In Chrome/Edge this uses the File System Access API, so Save writes directly back to the
file on disk — just like a normal editor. (Firefox falls back to upload-to-open and
download-to-save.)

**File type:** use **`.js`**. Strudel code is JavaScript-flavored, so a `.js` file gets
syntax highlighting and works with normal dev tools. There's a starter file at
[`patterns/neon-grid.js`](patterns/neon-grid.js) you can open immediately. (`.txt` and
`.strudel` are also accepted if you prefer.)

## Where to edit

The starter pattern lives inside `index.html` (in the `<strudel-editor>` block), but
the easiest way to experiment is to just type directly in the editor in the browser.

## Learn more

- Workshop / tutorial: https://strudel.cc/workshop/getting-started/
- Function reference: https://strudel.cc/learn/
- Sound/sample list: https://strudel.cc/learn/sounds/

## A few things to try

- Change the notes: `note("c4 eb4 g4 bb4")`
- Swap the drum machine: `.bank("RolandTR808")` instead of `RolandTR909`
- Change tempo: `.cpm(124)` (slower, heavier) or `.cpm(140)`
- Add grit: `.crush(4)` (bitcrush), `.distort(1.5)` (overdrive)
- Add an effect: `.room(0.5)` (reverb), `.delay(0.4)` (echo), `.lpf(800)` (filter)
