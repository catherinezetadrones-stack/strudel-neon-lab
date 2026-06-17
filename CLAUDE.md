# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

A minimal sandbox for experimenting with [Strudel](https://strudel.cc) — a browser-based
live-coding language for music (the JavaScript port of TidalCycles). The goal is learning
and play, not shipping a product.

**Visual direction: dark cyberpunk / neon.** Near-black background, neon cyan + magenta
accents, monospace type, scanline overlay, corner-bracket framing. The starter pattern is
a dark acid-techno loop that matches the aesthetic.

## Architecture

Intentionally tiny — there is no build step for the app code:

- `index.html` — the entire app. It loads the `@strudel/repl` web component from a CDN
  (`<script src="https://unpkg.com/@strudel/repl@latest">`) and embeds a `<strudel-editor>`.
  The starter Strudel pattern lives inside the HTML comment within that element.
- **Autocomplete = one custom palette.** Strudel ships a native docs-driven popup
  (`setAutocompletionEnabled`), but we **turn it OFF** (`setAutocompletionEnabled(false)`)
  so there's a single, consistent autocomplete: our categorized function browser. Without
  this, two menus appeared on Ctrl+Space.
- **Categorized function browser (`setupFnPalette`):** the only autocomplete. Ctrl+Space
  (intercepted on `contentDOM` in capture phase with `stopImmediatePropagation`) and the
  **Functions** toolbar button open a two-step palette: empty search shows categories, pick
  one to see its functions, or type to flat-search across all categories (deduped). It
  prefills with the word under the cursor, so Ctrl+Space mid-word jumps straight to a filtered
  search. Selecting inserts the call at the cursor via a CodeMirror transaction
  (`host.editor.editor.dispatch`), adding a leading `.` for methods and dropping the caret
  inside the parens. The data is `FN_CATS` (14 categories, ~170 functions); each item is a
  tuple `[name, isMethod, hasParens, takesArgs, desc, example]`. It is **hand-maintained but
  grounded in the Strudel function reference** (effects/synths/tonal/signals/time/conditional/
  random/samples/factories pages) — necessary because the live `doc.json` list isn't reachable
  at runtime from the embed (it's inlined into the built bundle, not a fetchable file, and
  strudel.cc would be CORS-blocked). When Strudel adds functions, extend `FN_CATS`; a function
  may appear in multiple categories (cross-listing aids discovery; flat search dedupes by name).
- **Blocks = overlay "sheets":** `//#region <label> ... //#endregion` markers in the single
  buffer define blocks. Each is drawn as a discrete **card overlaid on top of the editor**
  (`layoutSheets` / `.sheets-overlay`), positioned from CodeMirror's height map
  (`view.lineBlockAt(pos)`, anchored to `view.documentTop`) and appended inside
  `view.scrollDOM`; it re-lays-out on scroll, on edits (via the region MutationObserver), on
  resize, and on a 400ms poll. The card's header strip covers the `//#region` line (showing the
  block name) and a footer covers `//#endregion`. **Critical gotcha:** do NOT style `.cm-line`
  with vertical `margin`/`padding`/`border` to "card" the blocks — CodeMirror measures line
  geometry itself, so that desyncs the cursor/selection layer from the painted text (it drifts,
  worsening as blocks/the prelude add lines). The overlay exists precisely so the cards touch
  nothing CM measures; cards are `pointer-events:none` so editing happens on the code beneath.
  Collapse stashes a block's body out of the visible buffer (`collapsedBodies`), mute comments
  it out; both are re-expanded by `reconstructFullCode()` for eval/save. Each block's controls
  (collapse toggle, name + double-click rename, line count, mute) live in **its own sheet
  header** — the header strip is `pointer-events:none` but its buttons/label are
  `pointer-events:auto`, so they're clickable while clicks elsewhere fall through to the code.
  Creating a block is the **+ Block** toolbar button (`addBlockFromSelection`). (The old top
  `blocks-rail` row is gone; `renderRail` is an inert guarded no-op.)
- **File open/save:** an inline script adds a toolbar (Open / Save / Save As) plus shortcuts
  (Ctrl+O / Ctrl+S / Ctrl+Shift+S) backed by the **File System Access API** so Save writes
  back to the same on-disk file. Reads/writes editor text via `editor.code` /
  `editor.setCode()`. Firefox lacks the API → falls back to `<input type=file>` (open) and
  a Blob download (save). Dirty state is tracked by polling `editor.code` against the last
  saved text (magenta dot + `beforeunload` warning). Undo/redo is CodeMirror's own
  (Ctrl+Z / Ctrl+Shift+Z) — don't reimplement it.
- **Save hot-reloads playback:** after a successful save the script calls
  `reevaluateIfPlaying()`, which runs `editor.evaluate()` only when
  `editor.repl.scheduler.started` is true. So saving a running pattern updates the sound
  live (Strudel re-evals in place); saving while stopped stays silent.
- `patterns/` — saved Strudel patterns as `.js` files. `.js` is the preferred extension
  (JS-flavored syntax → highlighting + tooling); the pickers also accept `.txt`/`.strudel`.
- `package.json` — only dev dependency is **Vite**, used purely as a static dev server
  with hot reload.
- Strudel itself is **not** an npm dependency here; it comes from the CDN at runtime.

## Commands

- `npm install` — one-time setup.
- `npm run dev` — start the Vite dev server (http://localhost:5173).
- `npm run build` / `npm run preview` — production build and preview (rarely needed for a sandbox).

## Working with Strudel patterns

- Strudel code is a JavaScript-like mini-language. Patterns are built from functions like
  `sound()`, `note()`, `stack()`, and chained methods (`.bank()`, `.lpf()`, `.room()`,
  `.gain()`, `.cpm()`, `.slow()`, `.fast()`).
- In-page controls: **Ctrl+Enter** plays/updates, **Ctrl+.** stops. Audio needs a user
  click/keypress to start (browser autoplay policy).
- The canonical pattern lives in `index.html`. Editing it in the browser is ephemeral; to
  persist a pattern, update the comment block in `index.html`.
- **Samples:** the embed's prebake (from `@strudel/repl`) preloads Dirt-Samples
  (`bd sd hh ...`), tidal-drum-machines (drum-machine banks), piano, vcsl, mridangam,
  uzu-drumkit — so named sounds work with no setup. Extra packs load via
  `samples('github:user/repo')` (repo needs a `strudel.json`); loading is **async**, so the
  first run is often silent and a second run plays. We don't hand-roll sample loading — it's
  built into the embed. An `evaluate()` wrapper surfaces runtime/eval errors (failed loads,
  unknown sounds) in the toolbar status, since Strudel keeps the last good pattern on error.

## Conventions / gotchas

- Keep all files ASCII-safe — `index.html` CSS/markup and `.js` pattern files alike. Strudel's
  mini-notation transpiler scans the whole source before execution; non-ASCII characters (em
  dashes, `≥`, emoji) in comments or strings will cause parse errors.
- **In pattern `.js` files, use single quotes for JS string literals** — Strudel treats
  double-quoted strings as mini-notation patterns and will try to parse their contents.
- **No emoji / bubbly icons.** The aesthetic is cyberpunk; use neon/glow CSS, ASCII glyphs
  (e.g. `>`, `//`, corner brackets) for accents instead of emoji.
- Don't pin Strudel to a specific npm version or convert it to a bundled import unless asked;
  the CDN web-component approach is the officially documented embed path and keeps this simple.
- The dev server is internet-dependent because Strudel and its samples load from CDNs.

## Reference

- Workshop: https://strudel.cc/workshop/getting-started/
- Function reference: https://strudel.cc/learn/
- Sounds list: https://strudel.cc/learn/sounds/
