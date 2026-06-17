---
tags: [strudel, reference]
---

# Glossary

Quick definitions, with links to the deeper notes.

- **Cycle** — the basic unit of time; one loop of a pattern. Treat it as one bar. See
  [[2 Cycles and Tempo]].
- **Hap** — a single event produced by a pattern (a value + when it happens). See
  [[3 Patterns as Functions]].
- **Pattern** — a function from a time span to the haps in it. Everything (notes, gains,
  sounds, signals) is a pattern. See [[3 Patterns as Functions]].
- **Mini-notation** — the mini-language inside `"..."` strings for sequences/rhythm. See
  [[4 Mini-Notation]].
- **Control** — a function that attaches a parameter to events (`note`, `s`, `gain`,
  `lpf`, …). Chaining controls merges them. See [[3 Patterns as Functions]].
- **Signal** — a *continuous* pattern (`sine`, `perlin`, `rand`) used as an LFO/automation
  source. See [[10 Signals and Modulation]].
- **Scale degree** — a number in `n()` mapped through `.scale()` to a note in a key. See
  [[6 Notes, Scales and Harmony]].
- **Voicing** — the specific notes chosen for a chord symbol by `.voicing()`. See
  [[7 Chords and Voicings]].
- **Stack** — playing patterns simultaneously (`stack()` / `$:`). See
  [[12 Structure and Arrangement]].
- **`$:`** — REPL shorthand for one stacked "track" per line. See
  [[12 Structure and Arrangement]].
- **Mask** — gating a pattern on/off with a 0/1 pattern (for builds/entrances). See
  [[12 Structure and Arrangement]].
- **arrange** — a fixed timeline of `[cycles, pattern]` sections. See
  [[12 Structure and Arrangement]].
- **Euclidean rhythm** — `(pulses, steps, rotation)`; evenly spreads hits. See
  [[4 Mini-Notation#euclidean-rhythms-your-secret-weapon]].
- **Orbit** — a shared effects bus / send group (`orbit(n)`). Silent on non-zero orbits in
  this embed. See [[13 Mixing and Levels#orbits]].
- **Prebake** — the embed's startup step that preloads sample packs + synths. See
  [[15 This Sandbox#preloaded-sounds]].
- **Prelude** — a loaded library of extra custom words (e.g. switch-angel's). See
  [[15 This Sandbox#prelude]].
- **ADSR** — attack/decay/sustain/release amplitude envelope. See [[8 Synthesis#envelopes]].
- **`lpenv`** — filter-envelope amount; the "acid"/pluck filter movement. See
  [[8 Synthesis#filter-envelope]].
- **`fit` / `chop` / `slice` / `striate`** — sample warping/slicing. See
  [[11 Transforming Patterns#sample-chopping]].
- **`jux`** — stereo split (transform the right channel). See [[9 Effects#stereo]].
- **`off`** — a delayed, transformed copy (echo + transform). See
  [[11 Transforming Patterns#layering]].
