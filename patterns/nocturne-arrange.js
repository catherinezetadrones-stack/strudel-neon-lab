// NOCTURNE  -  an original *arranged* piece (not a static loop). C-minor, ~140.
// This version is heavily commented so you can learn the arrangement tricks by reading.
// Self-contained: only preloaded sounds, no prelude needed. Just Ctrl+Enter.
// Tip: open a pianoroll view and watch the parts come and go over ~32 bars.


//#region setup
// setcpm = tempo, in CYCLES per minute. One cycle here = one bar (4 beats), so 140/4
// cycles-per-min gives 140 BPM. (Strudel thinks in cycles; dividing by 4 maps to beats.)
setcpm(140 / 4)

// --- THE HARMONY -------------------------------------------------------------
// One chord progression, written as chord NAMES, reused by every voice below.
//   <...>  = pick the next item each cycle, so we get one chord per bar, looping.
// Cm9/Abmaj7/... are real chord symbols; .voicing() (further down) turns each name
// into actual notes, so I never hand-pick pitches.
let prog = "<Cm9 Ab^7 Eb^7 Bb7>"
//#endregion

//#region voices declaration
// --- VOICES (each derived from `prog`) ---------------------------------------

// PAD: chord(prog) reads the names; .voicing() chooses a nice spread of notes for each.
// Soft attack/release = it swells in. lpf = low-pass filter (darker). room = reverb.
let pad = chord(prog)
  .voicing()
  .mask("<1 0 0 1>")
  .s("sawtooth")
  .orbit(2)
  .attack(.4).release("<1.5 0 0 .01>")
  .lpf(slider(3200,2000,10000)).lfo({sync: "4", shape:"sine", depthabs: "50"})
  .room(.6)
  .gain(.4).postgain(.3)
  .color("yellow")
  .spectrum()
  

// KEYS: same chords, but .arp(...) plays their notes one at a time (an arpeggio).
// The numbers index the chord's notes (0 = lowest). [2 3] = play note 2 then 3 inside
// one step, so it ripples. delay = echo.
let keys = chord(prog).voicing()
  .arp("0 [2 3] 1 [3 2]").s("triangle")
  .lpf(200).fanchor(0)
  .ftype("24db")
  .lpenv(slider(4.968,2,10)).lpq(1)
  .release(.3).delay(.3)
  .room(.5)
  .gain(.8)

// BASS: explicit root notes that follow the progression (C, Ab, Eb, Bb), one per bar.
// distort adds grit; the low lpf keeps it sub-heavy.
let bass = note("<c2 ab1 eb2 bb1>").s("sawtooth")
  .lpf(420)
  .distort(1)
  .gain(.5)

//#endregion


//#region drum breaks  
// DRUMS: a stack() layers patterns so they play together.
//   bd*4  = kick 4 times per bar (four-on-the-floor).  "~ cp" = rest, then clap.
//   hh*8  = 8 hats; saw.range(...) sweeps their volume, sine.fast pans them L<->R.
let drums = stack(
  s("bd*4")
    .gain(.95)
    .duckorbit(2)
    .duckdepth(perlin),
  s("~ cp")
    .gain(.8)
    .room(1).roomsize(2)
    .decay(.2)
    .delay(slider(.2,0,.3)).delaytime(.32).delayfeedback(.65)
    .swingBy(1/8,4)
  ,
  s("hh*8").gain(saw.range(.2, .6).fast(2)).pan(sine.fast(3))
)



//#endregion

//#region build  -  layers ENTER over a 32-bar phrase using mask()
// mask("<0!4 1!28>") reads as: value 0 for 4 cycles, then 1 for 28 cycles (32 total).
// Where the mask is 0 the part is SILENT, where it's 1 it plays -> staggered entrances:
//   pad from bar 0, drums from bar 4, bass from bar 8, keys from bar 12.
// .color(...) just tints each part in the pianoroll so you can tell them apart.
$: stack(
  pad.color("magenta"),
  drums.mask("<0!4 1!28>"),
  bass.mask("<0!8 1!24>").color("cyan"),
  keys.mask("<0!12 1!20>").color("yellow"),
)._pianoroll()
//#endregion



