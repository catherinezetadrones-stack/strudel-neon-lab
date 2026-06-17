---
tags: [strudel, concept, time]
---

# Cycles and Tempo

Strudel's clock counts in **cycles**, not bars or beats. A cycle is one loop of the
pattern. Understanding this removes 90% of early confusion.

## What a cycle is

A pattern like `"a b c d"` spreads its events evenly across **one cycle**. Four items →
each takes 1/4 of the cycle. `"a b"` → each takes half. The cycle is a *unit of time the
pattern fills*, and it repeats forever.

> [!important] Cycle ≈ Bar
> The most useful convention: treat **1 cycle = 1 bar (4 beats)**. Then `"bd*4"` is a kick
> on each beat (four-on-the-floor), and `"hh*8"` is eighth notes. This is the mental model
> the rest of the vault uses.

## Setting tempo

Tempo is **cycles per minute** or **cycles per second**:

- `setcpm(120)` — 120 cycles per minute. If a cycle = a bar, that's *very* slow (120 bars/min).
- `setcpm(120/4)` — **this is how you get 120 BPM** when a cycle is a 4-beat bar. Divide
  your BPM by the beats-per-bar.
- `setcps(0.5)` — cycles per *second*. `setcps(120/60/4)` is another way to write 120 BPM
  (120 beats/min ÷ 60 sec ÷ 4 beats/cycle).

> [!tip] Just remember
> `setcpm(BPM/4)`. Want 140 BPM? `setcpm(140/4)`.

You can also set it per-pattern with `.cpm()` / `.cps()`, but a single global `setcpm` at
the top of the file is cleanest (like the master tempo in Ableton).

## Why "cycles" instead of bars?

Because a cycle is **relative**, patterns at different densities line up automatically.
`"a b c"` (3 events) and `"x y"` (2 events) both fill one cycle, giving you instant
**polymeter/polyrhythm** with no math. In Ableton you'd fight the grid to play 3-against-2;
here it's the default. See [[4 Mini-Notation#polymeter]].

## Speeding up / slowing down

These don't change the master tempo — they change how a *pattern* relates to the cycle:

- `.fast(2)` — pack the pattern into half a cycle (plays twice per cycle). Same as `*2` in
  [[4 Mini-Notation]].
- `.slow(2)` — stretch over two cycles. Same as `/2`.
- `.hurry(2)` — like `.fast(2)` but also pitches the sample up (tape-style).

```js
s("bd sd hh sd").fast("<1 2>")   // alternates normal / double-time each cycle
```

## Nudging (groove / timing feel)

- `.early(t)` / `.late(t)` — shift events earlier/later by a fraction of a cycle (e.g.
  `.late(0.02)` for a laid-back feel). This is your "nudge" / micro-timing.
- `.swingBy(amount, n)` / `.swing(n)` — add swing to an n-subdivision grid (like Ableton's
  groove pool). See [[11 Transforming Patterns]].

## Related

- [[3 Patterns as Functions]] — *why* a cycle is queryable, not just a loop.
- [[4 Mini-Notation]] — `*`, `/`, `<>` all manipulate how events fill the cycle.
- [[12 Structure and Arrangement]] — stitching many cycles into a song.
