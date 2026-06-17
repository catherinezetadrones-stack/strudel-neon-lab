# RESUME — Strudel sandbox pickup notes

> Single-file app is `index.html` (no build step for app code; Vite is just a static dev
> server on port 5180). Strudel loads from CDN. Read `CLAUDE.md` first — it documents the
> autocomplete palette, the blocks/overlay system, and conventions (ASCII-safe CSS/markup,
> no emoji, cyberpunk theme). Git author must be `czd`; never add Claude to commits.

---

## 1. Completed this session

- **`strudel-vault/` reorganized** — notes renamed to `<reading-order#> <title>.md` and sorted
  into Map-of-Content folders: `Doing it here/`, `Time & structure/`, `Harmony/`,
  `Sound design/`, `Reference/` (Glossary+Resources); `Start Here.md` stays at root. All
  `[[wikilinks]]` rewritten with the numeric prefixes (Obsidian resolves by basename, so they
  stay folder-agnostic). `Start Here.md` reading list split Glossary/Resources into 16/17.
- **`README.md`** — "Playing" section updated: Ctrl+Space now describes the categorized
  function browser (not native typing-completion).
- **`index.html` — categorized autocomplete palette (single autocomplete):**
  - Native Strudel popup **disabled**: in `whenReady`, `editor.setAutocompletionEnabled(false)`.
  - New palette: CSS `.fnpal*`; toolbar **Functions** button (`btn-fns`); data `FN_CATS`
    (14 categories, ~170 functions, tuple `[name, isMethod, hasParens, takesArgs, desc, example]`);
    JS `buildPalette/curRows/renderPalette/paintSel/preview/activatePal/onPalKey/insertFn/
    positionPalette/openPalette/closePalette/currentWord/setupFnPalette`. Ctrl+Space (intercepted
    on `contentDOM` capture phase + `stopImmediatePropagation`) or the button opens it; empty
    search = categories, type = flat cross-category search (deduped), prefilled with word under
    cursor; selecting inserts via `host.editor.editor.dispatch`.
- **`index.html` — blocks redesigned to overlay "sheets" + cursor bug fixed:**
  - Removed all geometry-breaking `.cm-line` box CSS (vertical `margin` was desyncing CM's
    cursor layer — that was the earlier "selection no longer lines up" bug).
  - Overlay cards: CSS `.sheets-overlay/.sheet/.sheet-head/.sheet-foot`; JS
    `scheduleLayout/ensureOverlay/layoutSheets`. Positioned from CM height map
    (`view.lineBlockAt(pos)` anchored to `view.documentTop`), appended in `view.scrollDOM`,
    re-laid-out on scroll + region MutationObserver + window resize + 400ms poll. Header strip
    covers the `//#region` line (shows block name + controls); footer covers `//#endregion`.
    `pointer-events:none` on cards so editing passes through.
  - **Block controls moved into each sheet header** (collapse toggle, name w/ dbl-click rename,
    `NN L` line count, MUTE) — header is `pointer-events:none` but its buttons/`.sh-label` are
    `pointer-events:auto`. Top `blocks-rail` row **removed** from HTML; `+ Block` added to the
    main toolbar (`btn-add-block` → `addBlockFromSelection`); `els.addBlk` added, `els.rail`
    removed. `renderRail` left as an inert guarded no-op (commented).
- **`CLAUDE.md`** — documented: palette is the single autocomplete (native off); blocks =
  overlay sheets with the "don't margin `.cm-line`" gotcha; block controls now in sheet headers.

## 2. Current state of in-progress work

**One known bug, diagnosed but NOT fixed** (stopped here due to context budget):
- File: `index.html`, function `setCode(text)` (around line ~556).
- Symptom: `open failed: Position 3283 is out of range for changeset of length 2876` shown in
  the file-status area; also reproducible when collapsing a block while the cursor sits below it.
- Everything else is complete and syntax-clean (0 errors).

## 3. Next steps — ordered and specific

1. **Fix `setCode` selection-out-of-range crash** (`index.html`, `function setCode`). Replace:
   ```js
   function setCode(text) {
     if (!host.editor) throw new Error("editor not ready yet — wait a moment and retry");
     host.editor.setCode(text);
   }
   ```
   with:
   ```js
   function setCode(text) {
     if (!host.editor) throw new Error("editor not ready yet — wait a moment and retry");
     // Strudel's setCode preserves the current selection; if the new text is shorter than the
     // old cursor position, CodeMirror throws "Position N is out of range for changeset of
     // length M" (seen on open-a-shorter-file and on collapse). Park the caret at 0 first —
     // valid in any document.
     var view = host.editor.editor;
     if (view) { try { view.dispatch({ selection: { anchor: 0 } }); } catch (e) {} }
     host.editor.setCode(text);
   }
   ```
   Expected: opening files of any length and collapsing/muting blocks no longer throws.
2. **Reset `collapsedBodies` before `setCode`** in `openFile` and `newFile` (currently reset
   after). Minor ordering cleanup so a stale collapse map can't affect the
   observer→`checkSyntax`→`reconstructFullCode` pass right after load. Expected: no behavior
   change, just safer.
3. **Verify the syntax check passes** (command in §6), then **`npm run dev`** and manually test:
   open `patterns/nocturne-arrange.js`, collapse/expand/mute several blocks with the cursor
   placed low in the document, then Open a shorter file. No "open failed" / no console range error.
4. **Visual tuning of sheet headers (pending user's eyes).** The header strip height = one code
   line; confirm the toggle/MUTE buttons fit without clipping and the header sits exactly over
   the `//#region` line. If cramped, give `.sheet-head` a touch more height in `layoutSheets`
   (currently `headH = topB.height` for expanded blocks) — but adding height makes it overlap
   the first body line, so prefer shrinking button `line-height`/`font-size` over growing the strip.
5. **(Deferred, user said "that's ok")** `patterns/switchangel-nightdrive.js` plays nothing even
   after removing orbits — unresolved, low priority.

## 4. Decisions made this session

- **Palette list is curated, not dynamic.** Strudel's real function list lives in `doc.json`,
  which is **inlined into the built CDN bundle** (not a fetchable file) and strudel.cc would be
  CORS-blocked anyway — so it can't be pulled at runtime. `FN_CATS` is hand-maintained but
  grounded in the official reference pages (effects/synths/tonal/signals/time/conditional/
  random/samples/factories). When Strudel adds functions, extend `FN_CATS`. A function may
  appear in multiple categories (cross-listing aids discovery; flat search dedupes by name).
- **Native autocomplete fully disabled** (not layered) — the user explicitly wanted ONE menu.
- **Blocks are an OVERLAY, never `.cm-line` styling.** Vertical margins/padding/borders on
  `.cm-line` desync CodeMirror's cursor geometry from the painted text. The overlay touches
  nothing CM measures, which is the whole point — keep it that way.
- **`renderRail` kept as a guarded no-op** instead of deleting its ~6 call sites — lower risk;
  it short-circuits because `els.rail` is now undefined.

## 5. Discoveries

- **[BLOCKS NEXT STEP] The setCode selection bug** (see §2/§3.1). Confidence high: the numbers
  (3283 = prior length/cursor, 2876 = new doc length) and the "out of range for changeset"
  wording are CM's transaction validation rejecting a selection beyond the new doc. If parking
  the caret at 0 does NOT fix it, fall back to bypassing Strudel's setCode and dispatching the
  full replace ourselves with a clamped selection
  (`view.dispatch({ changes:{from:0,to:doc.length,insert:text}, selection:{anchor:Math.min(old,text.length)} })`),
  then confirm `host.editor.code` still stays in sync afterward.
- **Overlay positioning is untested in a real browser** (this environment can't run the page).
  The math uses `view.documentTop + lineBlock.top - scrollRect.top`; if cards are vertically
  offset, suspect `documentTop` vs content-padding handling. Non-blocking — `layoutSheets` is
  wrapped in try/catch, so worst case is "no cards drawn," editor still works.
- Strudel embed API confirmed: `host.editor` = StrudelMirror; `host.editor.editor` = CM
  EditorView (`state`, `dispatch`, `lineBlockAt`, `documentTop`, `scrollDOM`, `contentDOM`,
  `coordsAtPos`); `host.editor.repl.evaluate(code, autostart, shouldHush)`;
  `host.editor.repl.scheduler.started`.

## 6. Verification steps

Run first, before continuing:

```bash
# 1) Inline-script syntax check (expect: "inline scripts: 1 errors: 0")
node -e 'const fs=require("fs");const h=fs.readFileSync("index.html","utf8");const re=/<script>([\s\S]*?)<\/script>/g;let m,n=0,e=0;while((m=re.exec(h))){n++;try{new Function(m[1])}catch(x){e++;console.log("ERR",x.message)}}console.log("inline scripts:",n,"errors:",e)'

# 2) Run the app (Chrome/Edge — File System Access API + audio)
npm run dev      # http://localhost:5180
```

Then in the browser: click to arm audio → Ctrl+Enter to play the starter pattern → Ctrl+Space
opens the Functions palette → `+ Block` wraps a selection → open `patterns/nocturne-arrange.js`
and exercise collapse/mute/rename in the sheet headers (this is where the §3.1 bug reproduces
until fixed).
