---
tags: [strudel, sound, samples]
---

# Sounds and Samples

How Strudel actually makes noise. Two families: **samples** (recorded audio) and
**synths** (generated — see [[8 Synthesis]]). Both are chosen with the same function.

## `sound()` / `s()` — pick a source

```js
s("bd sd hh")          // drum samples
s("piano")             // a sampled piano
s("sawtooth")          // a synth waveform (no sample — see [[8 Synthesis]])
```

`s` is just the short alias for `sound`. If you set a `note()` but no sound, the default is
a `triangle` synth.

## `note()` and `n()` — pitch

- `note("c e g")` — actual pitches (note names or MIDI numbers). `note(60)` = middle C.
- `n("0 2 4")` — **indices**, meaning depends on context: with `.scale()` they're scale
  degrees ([[6 Notes, Scales and Harmony]]); with a multi-sample folder they pick the sample
  number. `s("piano").n("0 4 7")` plays sample indices; `n("0 2 4").scale("C:major")` plays
  notes.

> [!tip] note vs n
> Use `note()` when you mean a literal pitch. Use `n()` + `.scale()` when you want
> "degrees in a key" (so transposing the key moves everything). See
> [[6 Notes, Scales and Harmony]].

## Sample banks and indices

Many sample names are **folders** of variations, indexed with `:`.

```js
s("bd:0 bd:3 bd:5")    // three different kick samples from the bd folder
s("hh*8").n("0 1 2 3") // cycle through hat variations
```

`.bank("RolandTR909")` picks a whole drum-machine kit, so `bd/sd/hh/cp/oh…` map to that
machine's sounds:

```js
s("bd sd, hh*8").bank("RolandTR909")   // a 909 kit
s("bd sd").bank("RolandTR808")         // an 808 kit
```

## Where samples come from

- **Preloaded in this sandbox** (no setup): the classic **Dirt-Samples** (`bd sd hh cp …`),
  **drum machines** (via `.bank()`), **piano**, **vcsl**, **mridangam**, **uzu-drumkit**.
  See [[15 This Sandbox#preloaded-sounds]].
- **Loaded from GitHub** with `samples('github:user/repo')` (the repo needs a `strudel.json`
  manifest):

  ```js
  samples('github:tidalcycles/dirt-samples')
  s("bd sd, hh*8")
  ```

- **A custom map** (turn arbitrary `.wav` files into a playable instrument):

  ```js
  samples({
    moog: { g2: 'moog/004_Moog_G2.wav', g3: 'moog/005_Moog_G3.wav' }
  }, 'github:tidalcycles/dirt-samples')
  note("g2 g3").s('moog')
  ```

  Strudel pitch-shifts the *nearest* recorded sample, so a few samples cover a range — like
  multisampling in Ableton's Sampler.

> [!warning] Sample loads are async
> `samples(...)` downloads in the background. The **first run is often silent** while it
> fetches — just hit Ctrl+Enter again. In this sandbox, load errors show in the toolbar
> status. See [[15 This Sandbox]].

## Manipulating a sample's playback

- `.speed(2)` — play twice as fast (and an octave up). `.speed("-1")` plays it **reversed**.
- `.begin(0.25).end(0.75)` — play only a slice of the sample.
- `.chop(8)` / `.slice(8, "...")` / `.striate(8)` — cut a sample into pieces (great for
  breakbeats). See [[11 Transforming Patterns#sample-chopping]].
- `.fit()` — stretch the sample to the event length (tempo-match a loop, like Warp).
- `.loopAt(2)` — stretch a sample to loop over n cycles.

## Drums quick-reference

Common Dirt-Samples names: `bd` (kick), `sd` (snare), `hh` (closed hat), `oh` (open hat),
`cp` (clap), `rim`, `lt/mt/ht` (low/mid/high tom), `cr` (crash), `rd` (ride), `misc breaks`
like `breaks165`, `amencutup`, etc.

## Related

- [[8 Synthesis]] — when the "sound" is a synth, not a sample.
- [[9 Effects]] — shaping the sound after it's chosen.
- [[13 Mixing and Levels]] — `gain`, `velocity`, balancing parts.
- [[14 Cookbook#load-a-sample-pack]] · [[15 This Sandbox]]
