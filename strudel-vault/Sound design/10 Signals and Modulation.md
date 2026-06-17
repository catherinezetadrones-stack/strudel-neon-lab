---
tags: [strudel, concept, modulation]
---

# Signals and Modulation

This note is your **automation lanes and LFOs**. A *signal* is a continuous pattern — it has
a value at every instant rather than discrete events — and you drop it anywhere a number
goes. No breakpoints, no drawing.

## The signals

Unipolar (0→1) by default; add `2` for bipolar (−1→1):

- `sine` / `sine2` — smooth LFO. (`cosine` is the same, phase-shifted.)
- `saw` / `isaw` — ramp up / ramp down.
- `tri` — triangle.
- `square` — hard on/off (gate-like).
- `perlin` — smooth *random* drift (organic, like an LFO set to "random/smooth"). Great for
  humanizing.
- `rand` — continuous random (0–1). `irand(n)` — random integers 0..n−1. `brand` — random 0/1.

## Shaping them

A raw signal is 0→1, which is rarely the range you want. Shape it:

- `.range(min, max)` — map to a useful range. `sine.range(300, 2000)`.
- `.rangex(min, max)` — **exponential** range; use for anything pitched/frequency
  (filters, Hz) so it sounds linear to the ear.
- `.slow(n)` / `.fast(n)` — set the LFO period. `.slow(8)` = one sweep every 8 cycles.
- `.segment(n)` / `.seg(n)` — **sample-and-hold**: turn the smooth signal into n discrete
  steps per cycle (so it becomes a stepped/random sequence instead of a glide).

```js
.lpf(sine.range(300, 2500).slow(4))       // filter sweep, 4-cycle period
.pan(sine.fast(2))                         // auto-pan, twice per cycle
.gain(perlin.range(.4, .8))                // gently humanized levels
.speed(irand(4).seg(8))                    // 8 random speeds per cycle
.crush(saw.range(16, 2).slow(16))          // slowly lo-fi-ing over 16 bars
```

## Signals vs patterns of numbers

Both modulate, but differently:

- A **mini-notation pattern** like `"400 800 1600"` is *stepped* — discrete values.
- A **signal** like `sine.range(...)` is *continuous* — a glide — unless you `.seg()` it.

Use patterns for rhythmic, quantized changes; use signals for smooth sweeps and organic
drift. (`sine.seg(4)` bridges them: a smooth source, sampled into 4 steps.)

## Where this replaces Ableton

- **Automation lane** → `param(sine.range(a,b).slow(n))`.
- **LFO device** → the signal itself, mapped with `.range()`.
- **Sample & Hold LFO** → `rand.seg(n)` or `irand(n).seg(n)`.
- **Macro that drifts** → `perlin` on whatever you'd assign the macro to.
- **Random / Velocity humanization** → `.gain(rand.range(.6,1))` or `perlin`.

## Tip: modulate the *structure*, not just the sound

Signals can drive musical choices too, because everything's a [[3 Patterns as Functions|pattern]]:

```js
s("bd*4").fast("<1 2>")             // pattern-controlled density
n(irand(8).seg(8)).scale("C:minor") // random melodic line in key
```

## Related

- [[9 Effects]] · [[8 Synthesis]] — the params you'll modulate most.
- [[4 Mini-Notation]] — the stepped alternative to signals.
- [[14 Cookbook#moving-filter]]
