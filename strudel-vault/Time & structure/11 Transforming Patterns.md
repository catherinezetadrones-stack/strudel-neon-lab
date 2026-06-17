---
tags: [strudel, composition]
---

# Transforming Patterns

The verbs. These functions take a pattern and return a changed one. They're your MIDI
effects, your creative manipulators, your "happy accident" generators. Because everything
is a [[3 Patterns as Functions|pattern]], they all compose.

## Time & order

- `rev` — reverse the cycle. `s("a b c d").rev()`.
- `fast(n)` / `slow(n)` — compress/stretch (also `*`/`/` in [[4 Mini-Notation]]).
- `hurry(n)` — `fast` **and** pitch up (tape speed).
- `iter(n)` — each cycle, rotate the start by 1/n (a moving downbeat over n cycles).
- `rot(n)` — rotate the *values* while keeping the rhythm (shifts which note lands where).
- `palindrome` — play forward then backward on alternating cycles.

## Density & repetition

- `ply(n)` — repeat **each event** n times in place. `s("bd sd").ply(2)` = `bd bd sd sd`.
- `stut(n, fb, t)` / `echo(n, t, fb)` — rhythmic in-pattern echoes (a delay you can sequence).
- `press` / `pressBy(amount)` — push events to the offbeat (syncopation).
- `run(n)` — generates `0 1 2 … n-1` (handy with `n()`/`.arp()`).

## Probability & variation

- `sometimesBy(p, fn)` — apply `fn` to a fraction `p` of events. Aliases by probability:
  `always`, `almostAlways(.9)`, `often(.75)`, `sometimes(.5)`, `rarely(.25)`,
  `almostNever(.1)`, `never`.
- `someCyclesBy(p, fn)` — apply to whole cycles at random (bigger gestures).
- `?` and `|` in [[4 Mini-Notation]] — inline drop / random choice.
- `degradeBy(p)` — randomly remove a fraction of events (thinning).

```js
s("hh*16").sometimesBy(.3, x => x.speed(2).gain(1.2))   // random accents/ratchets
s("bd*4").degradeBy(.1)                                   // occasionally skip a kick
```

## Conditionals (apply on a schedule)

- `every(n, fn)` — apply `fn` once every n cycles (your "every 4 bars, do a fill").
- `firstOf(n, fn)` / `lastOf(n, fn)` — on the first/last of every n cycles.
- `whenmod(a, b, fn)` — apply when cycle number mod a is ≥ b (sectioning).
- `within([a, b], fn)` — apply only to part of the cycle.
- `chunk(n, fn)` — apply `fn` to a different 1/n slice each cycle (a moving effect).

```js
s("bd sd hh sd").every(4, x => x.fast(2))   // double-time fill every 4th bar
n("0 2 4 6").scale("C:minor").chunk(4, x => x.add(note(12)))  // octave ripple
```

## Layering

- `stack(a, b, c)` — play patterns together (see [[12 Structure and Arrangement]]).
- `superimpose(fn)` — stack the pattern **with** a transformed copy of itself.
- `layer(f, g, …)` — stack several transformed copies.
- `jux(fn)` — stereo split: original left, `fn`-transformed right ([[9 Effects#stereo]]).
- `off(t, fn)` — a delayed, transformed copy offset by `t` of a cycle (echo + transform):
  ```js
  note("c e g").off(1/8, x => x.add(note(12)).gain(.5))  // octave-up shadow an 8th later
  ```

## Sample chopping

For breakbeats and granular fun (your Simpler "Slice" mode):

- `chop(n)` — cut each sample event into n equal grains played in order.
- `slice(n, "i j k")` — cut into n slices, then play them in the index order you give.
- `splice(n, "...")` — like `slice` but time-stretches each slice to fit (tempo-locked).
- `striate(n)` — interleave n slices across the whole pattern (smear/granular).
- `.fit()` — stretch the sample to the event length (Warp-style).

```js
s("breaks165").fit().chop(8).jux(rev)                       // chopped, widened break
s("amencutup").slice(8, "0 1 <2 3> 4 5 6 7").sometimesBy(.2, rev)
```

## Groove / feel

- `swingBy(amount, n)` / `swing(n)` — swing an n-grid (Ableton groove).
- `early(t)` / `late(t)` — micro-nudge timing.

## Related

- [[4 Mini-Notation]] — many of these have symbol equivalents.
- [[12 Structure and Arrangement]] — combining transformed parts into a track.
- [[10 Signals and Modulation]] — feeding signals into these (e.g. `every("<2 4>", …)`).
- [[14 Cookbook]]
