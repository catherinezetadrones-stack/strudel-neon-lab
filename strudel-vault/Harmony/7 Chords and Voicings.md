---
tags: [strudel, music, harmony]
---

# Chords and Voicings

Strudel speaks chord symbols. Instead of placing every note, you name the chord and let it
voice — exactly like a MIDI Chord device, but smarter (it knows jazz extensions).

## Three ways to make a chord

1. **Stack notes by hand** (full control) — comma inside [[4 Mini-Notation]]:
   ```js
   note("[c3,eb3,g3]")                 // a C minor triad
   note("<[c3,eb3,g3] [ab2,c3,eb3]>")  // changing each cycle
   ```

2. **Chord symbols + `.voicing()`** (let Strudel choose the notes):
   ```js
   chord("<Cm9 Abmaj7 Ebmaj7 Bb7>").voicing()
       .s("sawtooth").room(.5)
   ```
   `.voicing()` turns each symbol into a sensible, close voicing — and **voice-leads**
   between chords (keeps common tones, minimal movement), which sounds musical
   automatically.

3. **Root notes only** (for a bass that follows the harmony):
   ```js
   chord("<Cm9 Abmaj7 Ebmaj7 Bb7>").rootNotes(2)   // roots in octave 2
       .s("sawtooth").lpf(500)
   ```

## Chord symbol syntax

Standard names work: `C`, `Cm`, `C7`, `Cmaj7`, `Cm9`, `C13`, `Csus4`, `Cadd9`, `Cdim`,
`Caug`, slash chords like `C/E`, and extended/altered tensions. Put them in `<>` to step
one per cycle (a progression), or `@`-weight them for different lengths:

```js
chord("<Dm7@2 G7 Cmaj7@2 A7>")   // ii–V–I–VI with varied durations
```

## Voicing controls

`.voicing()` accepts options to shape the harmony:

- `anchor` — the reference pitch the voicing centers around (controls register).
- `mode` — how it picks the voicing relative to the anchor: `below`, `above`, or `duck`.
- `n` — choose among possible voicings (variation).
- `dict` — a different voicing dictionary (e.g. `lefthand` jazz voicings).

If you don't pass options, the defaults are good. Start simple, tweak register with
`anchor` later.

## Arpeggios: `.arp()`

Turn a chord (stacked notes) into a sequence by indexing its notes (0 = lowest):

```js
chord("<Cm9 Abmaj7>").voicing().arp("0 1 2 3")        // straight up
chord("<Cm9 Abmaj7>").voicing().arp("0 2 1 3")        // broken
chord("<Cm9 Abmaj7>").voicing().arp("<0 1 2 3> [2 1]")// patterned, with subdivisions
```

`.arp()` takes a full [[4 Mini-Notation]] pattern of indices, so you get rhythm + order in
one place — far beyond a fixed up/down arpeggiator. There's also `arpWith()` for custom
selection logic.

## A full harmonic engine in a few lines

```js
let prog = "<Cm9 Abmaj7 Ebmaj7 Bb7>"
$: chord(prog).voicing().s("sawtooth").attack(.3).room(.6).gain(.4)   // pad
$: chord(prog).voicing().arp("0 [1 2] 3 2").s("triangle").gain(.4)    // keys
$: chord(prog).rootNotes(2).s("sawtooth").lpf(500).gain(.5)           // bass
```

One progression, three voices, all locked together. This is the technique behind
`patterns/nocturne-arrange.js` — see [[15 This Sandbox#example-songs]].

## Related

- [[6 Notes, Scales and Harmony]] — degrees, scales, transposition.
- [[12 Structure and Arrangement]] — turning this into a song with builds/sections.
- [[14 Cookbook#chord-progression]]
