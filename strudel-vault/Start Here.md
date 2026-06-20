---
tags: [strudel, moc]
---

# Start Here — Strudel for Ableton people

This vault is a learning companion for [Strudel](https://strudel.cc), written for someone
who already knows music and **Ableton Live** but is new to live-coding. It goes a bit
deeper than the official docs and—importantly—**translates concepts you already know**
into Strudel terms.

Open this folder as an **Obsidian vault** (Open folder as vault). Notes are cross-linked
with `[[wikilinks]]` — follow the connections.

> [!tip] The one-sentence mental model
> In Ableton you *arrange objects in time* (clips, notes, automation). In Strudel you
> *describe patterns as code*, and the code is re-evaluated into sound on every change.
> A "track" is a line of code; a "clip" is a pattern; "automation" is a signal; an
> "effect rack" is a method chain.

## Read in this order

1. [[1 From Ableton to Strudel]] — the translation cheat-sheet. **Start here if nothing else.**
2. [[2 Cycles and Tempo]] — the heartbeat. Why everything is "cycles," not bars/BPM.
3. [[3 Patterns as Functions]] — what a pattern actually *is*.
4. [[4 Mini-Notation]] — the little language inside the `"..."` strings.
5. [[5 Sounds and Samples]] — making noise: synths vs samples.
6. [[6 Notes, Scales and Harmony]] — pitch, scales, `n()` vs `note()`.
7. [[7 Chords and Voicings]] — chord symbols → real voicings, arpeggios.
8. [[8 Synthesis]] — oscillators, FM, envelopes, filters (your subtractive-synth knowledge).
9. [[9 Effects]] — reverb/delay/distortion/etc. (the audio-effect rack).
10. [[10 Signals and Modulation]] — LFOs and automation via `sine`, `perlin`, `.range()`.
11. [[11 Transforming Patterns]] — the creative manipulators (`rev`, `jux`, `chop`, `every`…).
12. [[12 Structure and Arrangement]] — `stack`, `$:`, `mask`, `arrange` — building a song.
13. [[13 Mixing and Levels]] — gain, sidechain, orbits (and a local caveat).
14. [[14 Cookbook]] — copy-paste recipes for common tasks.
15. [[15 This Sandbox]] — how *this* project's editor + example songs work.
16. [[16 Glossary]] — quick definitions.
17. [[17 Resources]] — external links.
18. [[18 Rhythm, Drums and Breakbeats]] — deep dive: grooves, Euclidean, chopping breaks, variation, one-shots.

## Maps of content

- **Time & structure:** [[2 Cycles and Tempo]] · [[4 Mini-Notation]] · [[11 Transforming Patterns]] · [[12 Structure and Arrangement]] · [[18 Rhythm, Drums and Breakbeats]]
- **Sound design:** [[5 Sounds and Samples]] · [[8 Synthesis]] · [[9 Effects]] · [[10 Signals and Modulation]] · [[13 Mixing and Levels]]
- **Harmony:** [[6 Notes, Scales and Harmony]] · [[7 Chords and Voicings]]
- **Doing it here:** [[15 This Sandbox]] · [[14 Cookbook]] · [[1 From Ableton to Strudel]]

> [!info] How to practice
> Keep the sandbox open in one window and this vault in another. Read a note, then
> immediately try the snippet in the editor (Ctrl+Enter to play, Ctrl+. to stop).
> Change one number, re-run, listen. That loop *is* the learning.
