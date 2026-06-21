# RESUME — Strudel sandbox pickup notes

> Single-file web app is `index.html` (no build step for the browser app; Vite serves it on
> port 5180 via `npm run dev`). It also runs as a Tauri desktop app (`src-tauri/`) via
> `npm run app:dev`. Strudel loads from CDN. Read `CLAUDE.md` first — it documents the
> autocomplete palette, the blocks/overlay system, the desktop shell, and conventions
> (ASCII-safe CSS/markup, no emoji, cyberpunk theme). Git author must be `czd`; never add
> Claude to commits.

---

## 1. Current state

No known open bugs. Everything is syntax-clean. Recent work: Tauri desktop shell;
collapsed-block state now persists across save/open (symmetric with mute); sheet headers show
the body line count in both collapsed and expanded states; and the "Position N out of range
for changeset" crash is fixed (see §3 for the real cause).

## 2. Open / pending

1. **Visual tuning of sheet headers (pending user's eyes).** Header strip height = one code
   line; confirm the toggle/MUTE buttons fit without clipping and the header sits exactly over
   the `//#region` line. If cramped, prefer shrinking button `line-height`/`font-size` over
   growing `.sheet-head` height in `layoutSheets` (growing it overlaps the first body line).
2. **(Deferred, low priority)** `patterns/switchangel-nightdrive.js` plays nothing even after
   removing orbits — unresolved.

## 3. Decisions / constraints (keep these in mind)

- **Palette list is curated, not dynamic.** Strudel's real function list lives in `doc.json`,
  which is inlined into the built CDN bundle (not a fetchable file) and strudel.cc would be
  CORS-blocked anyway. `FN_CATS` is hand-maintained but grounded in the official reference
  pages. When Strudel adds functions, extend `FN_CATS` (a function may appear in multiple
  categories; flat search dedupes by name).
- **Native autocomplete fully disabled** (not layered) — the user wanted ONE menu.
- **Blocks are an OVERLAY, never `.cm-line` styling.** Vertical margins/padding/borders on
  `.cm-line` desync CodeMirror's cursor geometry from the painted text. The overlay touches
  nothing CM measures — keep it that way.
- **Collapsed-block eval / decorations.** Collapsing stashes a block's body out of the buffer
  (`collapsedBodies`); eval/save use `reconstructFullCode()`, which is longer than the visible
  doc. Strudel stores that eval's `editor.widgets` / `editor.miniLocations` at full-code
  offsets, which overflow the shorter doc and throw "Position N out of range" — on eval and on
  every later view update. Fixed by intercepting those assignments and dropping out-of-range
  entries while collapsed (plus a scoped `view.dispatch` guard as backup). A separate, earlier
  fix parks the `setCode` caret at 0 and clamps on restore.
- **`renderRail` kept as a guarded no-op** instead of deleting its call sites — it
  short-circuits because `els.rail` is undefined.

## 4. Reference

- Strudel embed API: `host.editor` = StrudelMirror; `host.editor.editor` = CM EditorView
  (`state`, `dispatch`, `lineBlockAt`, `documentTop`, `scrollDOM`, `contentDOM`,
  `coordsAtPos`); `host.editor.repl.evaluate(code, autostart, shouldHush)`;
  `host.editor.repl.scheduler.started`. Decoration data: `host.editor.widgets`
  (`{from,to,type,...}`) and `host.editor.miniLocations` (`[from,to]` pairs).

- Inline-script syntax check (expect `inline scripts: 1 errors: 0`):

  ```bash
  node -e 'const fs=require("fs");const h=fs.readFileSync("index.html","utf8");const re=/<script>([\s\S]*?)<\/script>/g;let m,n=0,e=0;while((m=re.exec(h))){n++;try{new Function(m[1])}catch(x){e++;console.log("ERR",x.message)}}console.log("inline scripts:",n,"errors:",e)'
  ```

- Run: `npm run dev` (browser, http://localhost:5180) or `npm run app:dev` (Tauri desktop).
  Then: click to arm audio -> Ctrl+Enter to play -> Ctrl+Space opens the Functions palette ->
  `+ Block` wraps a selection -> open a multi-region pattern (e.g. `patterns/dmb-yt-bite.js`)
  and exercise collapse/mute/rename in the sheet headers.
