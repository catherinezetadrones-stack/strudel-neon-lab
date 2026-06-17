---
tags: [strudel, sound, synthesis]
---

# Synthesis

Strudel has a capable built-in synth engine. Your subtractive-synth instincts from Ableton
(Operator, Analog, Wavetable) transfer directly — only the controls are typed parameters
instead of knobs.

## Oscillators (the waveform)

Choose with `s()` / `sound()`:

- `sine`, `triangle` — soft, hollow. (`triangle` is the **default** if you set a note but no sound.)
- `sawtooth` — bright, buzzy (the bread-and-butter of bass/leads).
- `square` — hollow, reedy (also `pulse` width via `pw`).
- `supersaw` — stacked detuned saws (your "huge trance/Serum saw"). Shape it with
  `unison` (voice count), `detune` (spread amount), `spread` (stereo width).
- Noise: `white`, `pink`, `brown` (hard→soft). The `noise` param (0–1) adds noise to any
  oscillator; `crackle` (with `density`) makes vinyl-style texture.

```js
note("c2 eb2 g1").s("supersaw").unison(7).detune(.4).spread(.6)
```

## Envelopes

### Amplitude (ADSR)

Exactly like an Ableton amp envelope:

- `attack` (`att`) — time to full volume (s)
- `decay` (`dec`) — time to sustain (s)
- `sustain` (`sus`) — held level (0–1)
- `release` (`rel`) — fade after note-off (s)
- or all at once: `.adsr("0.01:0.2:0.5:0.3")`

```js
note("c e g").s("sawtooth").attack(.01).decay(.2).sustain(.3).release(.4)
```

### Filter envelope

The classic "filter that opens on each note." `lpenv` is the **envelope amount** (like the
filter env depth in Operator); `lpattack/lpdecay/lpsustain/lprelease` shape it:

- `lpf` (`cutoff`) — base cutoff (Hz)
- `lpenv` (`lpe`) — how far the envelope moves the cutoff
- `lpa` `lpd` `lps` `lpr` — attack/decay/sustain/release of the filter env
- `lpq` — resonance

```js
// a plucky acid bass: filter snaps open then closes
note("c2*8").s("sawtooth").lpf(300).lpenv(4).lpa(.01).lpd(.12).lps(.2).lpq(10)
```

There are `hp*` and `bp*` equivalents for high-pass and band-pass envelopes.

### Pitch envelope

`penv` (amount in semitones), `pattack/pdecay/prelease` — for kick-drum "pew" thumps and
zaps: `.penv(12).pdecay(.1)` drops the pitch a fifth/octave at the start.

## Filters

- `lpf` / `cutoff` — low-pass (most common). `hpf` — high-pass. `bpf` — band-pass.
- `lpq` / `hpq` / `bpq` — resonance / Q.
- `ftype` — filter model: `12db`, `24db`, or `ladder` (Moog-style — warmer, self-oscillating).
- `vowel("a e i o u")` — a formant filter (talking/"vowel" sweeps).

> [!tip] Automate any of these
> A filter sweep is just a [[10 Signals and Modulation|signal]] in the cutoff:
> `.lpf(sine.range(300, 3000).slow(8))`. No automation lane needed.

## FM synthesis

Operator-style frequency modulation:

- `fm` — modulation amount (brightness/edge).
- `fmh` — harmonicity ratio. Whole numbers/simple ratios = musical; decimals = metallic/bell.
- `fmattack/fmdecay/fmsustain` (`fmatt/fmdec/fmsus`) — envelope on the modulation.
- `fmenv` — envelope ramp type (`lin`/`exp`).

```js
note("c3").s("sine").fm(4).fmh(2).fmdecay(.2)   // a punchy FM tone
```

## Additive & wavetable (advanced)

- Additive: `partials` (harmonic magnitudes) and `phases`.
- Wavetable: load custom tables with the `wt_` prefix; scrub with `loopBegin`/`loopEnd`.
- ZZFX engine: the `z_` prefix (e.g. `z_sawtooth`) exposes a chiptune-y synth with ~20
  params (`zcrush`, `slide`, `curve`…).

## Vibrato

`vib` (rate in Hz) + `vibmod` (depth in semitones) — an LFO on pitch:

```js
note("a4").s("sawtooth").vib(6).vibmod(.3)
```

## Related

- [[5 Sounds and Samples]] — the other half (recorded audio).
- [[9 Effects]] — what to do *after* the synth (reverb, delay, drive).
- [[10 Signals and Modulation]] — turning params into moving automation.
- [[14 Cookbook#acid-bass]]
