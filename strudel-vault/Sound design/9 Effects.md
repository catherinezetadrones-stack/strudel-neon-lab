---
tags: [strudel, sound, effects]
---

# Effects

The audio-effect rack. You chain effect methods onto a pattern and they apply per event.
**Order is signal flow**, left to right — like device order in a rack.

```js
note("c e g").s("sawtooth").lpf(900).distort(.4).delay(.3).room(.5)
//                           filter -> drive   -> delay  -> reverb
```

Remember: any parameter can take a single number, a [[4 Mini-Notation|pattern]], or a
[[10 Signals and Modulation|signal]].

## Space

- `room` (0–1) — reverb amount (wet level).
- `roomsize` / `size` (0–10) — bigger = longer tail. `roomfade`, `roomlp` (damping),
  `roomdim` further shape it.
- `delay` (0–1) — echo amount. `delaytime` / `dt` (seconds) — echo spacing.
  `delayfeedback` / `dfb` (0–1) — number of repeats. `delayspeed` — pitch the echoes.

```js
s("rim").delay(.5).delaytime(.1875).delayfeedback(.6)   // dotted-8th echoes
note("c4").room(.8).size(6)                              // big hall
```

> [!tip] Tempo-synced delay
> `delaytime` is in seconds. For a dotted-eighth at 120 BPM (1 beat = 0.5s), that's
> `0.5 * 0.75 = 0.375`. Or compute from tempo so it tracks: see [[14 Cookbook]].

## Drive / texture

- `distort` (`dist`) — wave-shaping overdrive. Pattern it for grit that moves.
- `shape` — an alternative wave-shaper (subtle saturation).
- `crush` (1–16) — bit-crusher; lower = more lo-fi/digital. `crush(4)` is gnarly.
- `coarse` — sample-rate reduction (downsampling), another lo-fi flavour.

## Modulation FX

- `phaser` (rate) + `phaserdepth` (0–1) — sweeping comb/phaser.
- `tremolo*` family (`tremolosync`, `tremolodepth`, `tremoloshape`) — amplitude LFO.
- (Pitch vibrato `vib`/`vibmod` lives with the synth — see [[8 Synthesis#vibrato]].)

## Stereo

- `pan` (0–1, L→R). Pattern or signal it: `.pan(sine.fast(2))` auto-pans.
- `jux(fn)` — duplicate the pattern, apply `fn` to the **right channel only** (instant
  width). Classic: `.jux(rev)` plays it forward left, backward right. `juxBy(0.5, fn)`
  controls the width.

```js
s("breaks165").chop(8).jux(rev)   // wide, glitchy break
```

## Dynamics & gain

- `gain` — volume (per event = velocity/accents). See [[13 Mixing and Levels]].
- `velocity` (`vel`) — multiplied with gain.
- `postgain` — gain **after** all effects (use to tame a reverb/distortion that got loud).
- `compressor("threshold:ratio:knee:attack:release")` — bus-style compression.
- `duck` / `duckorbit` — **sidechain**: duck one [[13 Mixing and Levels#orbits|orbit]] from
  another's hits (`duckattack`, `duckdepth`). Your pumping-pad-against-the-kick trick.

## Filters

Covered under [[8 Synthesis#filters]] since they're tied to the synth voice, but they're
"effects" too: `lpf`, `hpf`, `bpf`, `lpq`, `vowel`, plus the `lpenv` filter-envelope.

## Reading a chain like a rack

```js
note("<c2 eb2 g1>*8").s("sawtooth")
  .lpf(sine.range(300,1800).slow(8))   // 1. moving low-pass (auto-filter)
  .distort(.3)                          // 2. overdrive
  .room(.3)                             // 3. a touch of reverb
  .gain(.6)                             // 4. level
```

## Related

- [[8 Synthesis]] · [[5 Sounds and Samples]] — the source you're processing.
- [[10 Signals and Modulation]] — make any of these move.
- [[13 Mixing and Levels]] — gain staging, sidechain, orbits.
