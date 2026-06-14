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
- **Autocomplete:** the embedded editor has docs-driven autocompletion (completion source
  generated from Strudel's function docs — descriptions + examples). It's off by default,
  so a small inline script polls for the component's `.editor` (a `StrudelMirror` instance,
  created lazily in `connectedCallback`) and calls `setAutocompletionEnabled(true)`
  (fallback: `updateSettings({ isAutoCompletionEnabled: true })`). Trigger with Ctrl+Space
  or by typing. Don't hand-roll a completion list — the built-in one is the source of truth.
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

## Conventions / gotchas

- Keep `index.html` ASCII-safe in the CSS/markup — a stray non-ASCII character previously
  slipped into a CSS hex color.
- **No emoji / bubbly icons.** The aesthetic is cyberpunk; use neon/glow CSS, ASCII glyphs
  (e.g. `>`, `//`, corner brackets) for accents instead of emoji.
- Don't pin Strudel to a specific npm version or convert it to a bundled import unless asked;
  the CDN web-component approach is the officially documented embed path and keeps this simple.
- The dev server is internet-dependent because Strudel and its samples load from CDNs.

## Reference

- Workshop: https://strudel.cc/workshop/getting-started/
- Function reference: https://strudel.cc/learn/
- Sounds list: https://strudel.cc/learn/sounds/
