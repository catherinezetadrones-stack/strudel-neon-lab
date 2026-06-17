---
tags: [strudel, recipes]
---

# Cookbook

Copy-paste starting points. Each is a few lines you can drop in the editor and tweak.
Play with Ctrl+Enter, stop with Ctrl+.

## Four-on-the-floor + groove

```js
setcpm(125/4)
$: s("bd*4").bank("RolandTR909").gain(.95)
$: s("~ cp").bank("RolandTR909").room(.3)
$: s("hh*8").bank("RolandTR909").gain("1 .5").pan(sine.fast(4))
```

## Euclidean drums

```js
$: s("bd(3,8)")
$: s("~ sd")            // backbeat
$: s("hh(7,16)").gain(.5)
```

## Acid bass

```js
note("<c2 c2 eb2 g1>*8").s("sawtooth")
  .lpf(300).lpenv(4).lpa(.01).lpd(.12).lps(.2).lpq(10)
  .distort(1).gain(.6)
```
*(the `lpenv`/`lpa`/`lpd` filter envelope is what makes it "acid" — see [[8 Synthesis#filter-envelope]].)*

## Moving filter (auto-filter sweep)

```js
note("<c3 eb3 g3 bb3>*8").s("supersaw")
  .lpf(sine.range(400, 3000).slow(8))   // one sweep every 8 bars
  .room(.4).gain(.4)
```

## Chord progression with voicing

```js
let prog = "<Cm9 Abmaj7 Ebmaj7 Bb7>"
$: chord(prog).voicing().s("sawtooth").attack(.3).room(.6).gain(.4)
$: chord(prog).rootNotes(2).s("sawtooth").lpf(450).gain(.5)   // bass follows
```

## Arpeggio from chords

```js
chord("<Cm9 Abmaj7>").voicing()
  .arp("0 [1 2] 3 2").s("triangle")
  .delay(.3).room(.4).gain(.4)
```

## A 32-bar build

```js
setcpm(140/4)
let pad   = chord("<Cm9 Abmaj7 Ebmaj7 Bb7>").voicing().s("sawtooth").attack(.4).room(.6).gain(.4)
let drums = stack(s("bd*4"), s("~ cp"), s("hh*8").gain(.5))
let bass  = note("<c2 ab1 eb2 bb1>").s("sawtooth").lpf(420).gain(.5)
$: stack(
  pad,
  drums.mask("<0!4 1!28>"),
  bass.mask("<0!8 1!24>"),
)
```

## Chop a breakbeat

```js
samples('github:tidalcycles/dirt-samples')   // run twice (async load)
s("breaks165").fit().chop(8)
  .sometimesBy(.25, x => x.speed("-1"))
  .jux(rev).gain(.5)
```

## Load a sample pack

```js
samples('github:tidalcycles/dirt-samples')    // first run: silent (downloading)
s("bd sd, ~ cp, hh*8")                         // second run: plays
```

## Custom multisampled instrument

```js
samples({
  moog: { g2:'moog/004_Mighty%20Moog%20G2.wav', g3:'moog/005_Mighty%20Moog%20G3.wav' }
}, 'github:tidalcycles/dirt-samples')
note("g2 <bb2 c3> g2 eb3").s('moog').gain(.5)
```

## Tempo-synced delay

```js
let beat = 1/ (140/60)          // seconds per beat at 140 BPM
s("rim:1").struct("t(3,8)")
  .delay(.5).delaytime(beat * 0.75).delayfeedback(.55)   // dotted-eighth
```

## Generative melody in key

```js
n(irand(8).seg(8))              // 8 random scale degrees per cycle
  .scale("C:minor")
  .s("triangle").lpf(2000).delay(.3).gain(.4)
  .sometimesBy(.2, x => x.add(note(12)))   // occasional octave jump
```

## Random-but-musical variation

```js
s("bd*4").degradeBy(.05)                          // rarely skip a kick
  .sometimesBy(.15, x => x.ply(2))                // occasional double-hit
```

## Related

- [[4 Mini-Notation]] · [[11 Transforming Patterns]] · [[12 Structure and Arrangement]]
- [[15 This Sandbox]] — the example songs are fuller versions of these.
