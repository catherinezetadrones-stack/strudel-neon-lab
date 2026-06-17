---
tags: [strudel, bridge]
---

# From Ableton to Strudel

You already have the concepts. This note maps them onto Strudel so you can move fast.

## The big reframe

Ableton is **object-oriented in time**: you place clips on tracks, draw notes in a piano
roll, draw automation breakpoints, and insert devices in a chain. Strudel is
**functional in time**: you write an expression that *describes* a repeating pattern, and
Strudel evaluates it into events ("haps") for each [[2 Cycles and Tempo|cycle]]. There is no
timeline you scrub — there's a loop you re-describe. (You *can* build a fixed timeline; see
[[12 Structure and Arrangement#arrange|arrange]].)

## Translation table

| Ableton | Strudel | Notes |
|---|---|---|
| Track (audio/MIDI) | one pattern, usually a `$:` line | [[12 Structure and Arrangement]] |
| Clip (loop) | a pattern — one cycle that repeats | [[3 Patterns as Functions]] |
| Session view (looping ideas) | the live REPL — every `$:` loops | default behaviour |
| Arrangement view (fixed timeline) | `arrange([bars, p], …)` / `cat` | [[12 Structure and Arrangement]] |
| Tempo (BPM) | `setcpm(bpm/4)` — **1 cycle ≈ 1 bar** | [[2 Cycles and Tempo]] |
| Piano-roll notes | `note("c e g")` / `n("0 2 4").scale(...)` | [[6 Notes, Scales and Harmony]] |
| Drum rack lane | a sequence like `s("bd ~ sd ~")` | [[5 Sounds and Samples]] |
| Velocity per note | `.gain()` / `.velocity()` per step | [[13 Mixing and Levels]] |
| Automation lane | a **signal**: `sine.range(a,b).slow(n)` | [[10 Signals and Modulation]] |
| LFO device | same — `sine`, `tri`, `perlin`, `saw` | [[10 Signals and Modulation]] |
| Audio-effect rack (a chain) | a method chain `.lpf().room().delay()` | [[9 Effects]] |
| Send/return + global reverb | `orbit` (shared effect bus) | [[13 Mixing and Levels]] — *caveat in this embed* |
| Sidechain compression | `duck` / `duckorbit` (or a gain LFO) | [[13 Mixing and Levels]] |
| MIDI Arpeggiator | `.arp("0 1 2 3")` | [[7 Chords and Voicings]] |
| MIDI Chord device | `chord("Cm9").voicing()` | [[7 Chords and Voicings]] |
| Scale device | `.scale("C:minor")` | [[6 Notes, Scales and Harmony]] |
| Operator (FM) | `fm`, `fmh`, `fmenv`… params | [[8 Synthesis#fm-synthesis]] |
| Wavetable / Serum-ish | `wt_` wavetables, `supersaw` | [[8 Synthesis]] |
| Simpler/Sampler warp + slice | `.fit()`, `.chop()`, `.slice()`, `speed` | [[11 Transforming Patterns#sample-chopping]] |
| Filter + filter envelope | `lpf` + `lpenv/lpa/lpd/lps` | [[8 Synthesis#filters]] |
| ADSR amp envelope | `attack/decay/sustain/release` | [[8 Synthesis#envelopes]] |
| Quantize / groove pool | `.swingBy()`, `.early()/.late()` | [[11 Transforming Patterns]] |
| Follow Actions / randomness | `sometimesBy`, `?`, `|`, `rand` | [[11 Transforming Patterns]] |
| Freeze/render a part | copy the pattern's text to a `.js` file | [[15 This Sandbox]] |

## Things that feel different (and why)

- **No fixed grid you click.** Rhythm is *typed*. `"bd*4"` is four kicks; `"bd(3,8)"` is a
  Euclidean rhythm. See [[4 Mini-Notation]]. Once it clicks, this is *faster* than drawing.
- **Pitch is often relative.** `n("0 2 4").scale("C:minor")` is "1st, 3rd, 5th of C minor."
  Change the scale, the whole line follows — like moving a Scale device. See
  [[6 Notes, Scales and Harmony]].
- **Effects are per-pattern, in a chain, evaluated left-to-right.** `.lpf(800).room(.4)`
  is signal → filter → reverb. Order matters, like device order in a rack. See [[9 Effects]].
- **Automation is a value, not a lane.** Anywhere a number goes, a *signal* can go:
  `.lpf(sine.range(300,2000).slow(8))`. That's a moving filter with no breakpoints. See
  [[10 Signals and Modulation]].
- **Everything is the same kind of thing (a pattern).** Notes, gains, filter cutoffs,
  sample names — all patterns that combine. That's the superpower; see
  [[3 Patterns as Functions]].

## A worked translation

Ableton: *"A 124 BPM track. Drum rack: four-on-the-floor kick + offbeat hat. A bass MIDI
clip in C minor with a lowpass automated to open over 4 bars. Reverb on the bass send."*

Strudel:

```js
setcpm(124/4)                                  // tempo: 1 cycle = 1 bar
$: s("bd*4")                                    // drum lane 1
$: s("~ hh ~ hh")                               // drum lane 2 (offbeat)
$: note("<c2 c2 eb2 g1>")                       // bass MIDI clip, C minor roots
   .s("sawtooth")
   .lpf(sine.range(300, 1800).slow(4))          // filter automation over 4 cycles
   .room(.4)                                     // "send" reverb (per-pattern here)
```

See [[14 Cookbook]] for more of these. Next: [[2 Cycles and Tempo]].
