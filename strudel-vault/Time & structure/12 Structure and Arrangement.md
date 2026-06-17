---
tags: [strudel, composition, arrangement]
---

# Structure and Arrangement

Going from a loop to a **song**. This is where Strudel splits into "Session view" (looping
layers) and "Arrangement view" (a fixed timeline) — and you can mix both.

## Layering parts: `stack` and `$:`

- `stack(a, b, c)` — play patterns simultaneously (one combined pattern).
- `$:` — REPL sugar for the same thing, one part per line. Each `$:` is a "track":

  ```js
  $: s("bd*4")
  $: s("~ cp")
  $: note("<c2 eb2>").s("sawtooth").lpf(600)
  ```

  > [!important] Why your parts kept "silencing each other"
  > A **bare** pattern at the top level *replaces* the previous one — Strudel plays only the
  > last. To play things together, you must layer them: use `$:` on each line, or wrap them
  > in `stack(...)`. This is the single most common beginner trip-up.

  You can name tracks: `$drums: s("bd*4")` — the label is just for your own clarity (and
  shows in some visualizers).

## Sequencing in time: `cat`, `seq`, `arrange`

These put patterns **one after another** instead of on top:

- `seq(a, b, c)` / `fastcat(...)` — squeeze all into **one cycle** (a fast sequence).
- `cat(a, b, c)` / `slowcat(...)` — play one **per cycle**, then loop (`<>` in mini-notation
  is the same idea).
- `arrange([cycles, pat], [cycles, pat], …)` — a real **timeline**: play each pattern for a
  given number of cycles, in order, looping. This is your Arrangement view.

  ```js
  arrange(
    [8,  intro],
    [16, verse],
    [8,  drop],
  )
  ```

## Building over time: `mask`

`mask` gates a pattern on/off using a 0/1 (or `~`/`t`) pattern — perfect for **staggered
entrances** (the classic build):

```js
$: stack(
  pad,                                  // in from the start
  drums.mask("<0!4 1!28>"),             // enters at bar 4
  bass.mask("<0!8 1!24>"),              // enters at bar 8
  keys.mask("<0!12 1!20>"),             // enters at bar 12
)
```

`"<0!4 1!28>"` reads as "0 for 4 cycles, then 1 for 28" — a 32-bar phrase. Where the mask
is 0 the part is silent. (`struct` is the cousin that *imposes* a rhythm; `mask` only
*gates* the existing one.)

> [!tip] Keep section lengths aligned
> If your `arrange` totals 32 cycles and your `mask` phrases are 32 cycles, they stay in
> sync. Mismatched lengths drift (sometimes nice, often confusing).

## A complete arrangement shape

```js
setcpm(140/4)
let prog  = "<Cm9 Abmaj7 Ebmaj7 Bb7>"
let pad   = chord(prog).voicing().s("sawtooth").attack(.4).room(.6).gain(.4)
let bass  = note("<c2 ab1 eb2 bb1>").s("sawtooth").lpf(420).gain(.5)
let drums = stack(s("bd*4"), s("~ cp"), s("hh*8").gain(.5))
let brk   = s("breaks165").fit().chop(8).gain(.45)

$: stack(
  pad,
  drums.mask("<0!4 1!28>"),
  bass.mask("<0!8 1!24>"),
)                                  // the looping "session" build
$: arrange([16, silence], [8, brk], [8, brk.jux(rev)])   // the timed break section
```

This is exactly `patterns/nocturne-arrange.js` — read it alongside [[15 This Sandbox]].

## Sectioning with conditionals

For variations *within* a loop rather than a hard timeline, reach for the schedulers in
[[11 Transforming Patterns#conditionals-apply-on-a-schedule]] (`every`, `whenmod`, `firstOf`).

## Related

- [[11 Transforming Patterns]] — `every`, `mask`, `jux`, fills.
- [[7 Chords and Voicings]] — the harmonic layer.
- [[15 This Sandbox#blocks]] — the editor's block/collapse system mirrors these sections.
- [[14 Cookbook#a-32-bar-build]]
