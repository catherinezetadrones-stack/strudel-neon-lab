// NEON GRID — dark acid techno. Open me with Ctrl+O, then Ctrl+Enter to run.
stack(
  // four-on-the-floor kick
  sound("bd*4").bank("RolandTR909").gain(0.9),
  sound("<~ bd ~ ~ ~>*5").bank("RolandTR909").gain(0.3),

  // off-beat clap, drenched in reverb
  sound("~ cp ~ cp").bank("RolandTR909").room(0.50),

  sound("<~*16 ht*16>").bank("RolandTR909").room(0.50).gain(0.05)
  .lpf(sine.range(220, 300).slow(5)).delay(1)
    .distort(0.2).pan("<0 1>".fast(1))._scope(),

  // skittering 16th hats, panned and breathing
  sound("hh*16").bank("RolandTR909")
    .gain(saw.range(0.2, 0.6).fast(2))
    .pan(sine.fast(4)),

  // acid bassline — sweeping resonant filter + grit
  // note("<c2 c2 eb2 g1>*4").sound("sawtooth")
  //   .lpf(sine.range(220, 300).slow(8)).lpq(10)
  //   .distort(0.2).lfo(8/4).gain(0.7),
  
  note("c1 <c2 <eb2 <g2 g1>>>".fast(2))
.sound("[square, triangle, sine]").gain(0.5)
._scope(),

  // cold arpeggio, bit-crushed with delay
  // note("c3 eb3 g3 bb3 c4 g3 eb3 bb3".fast(2)).sound("square")
  // note(" ~ eb4 g4 bb4 ~ g4 eb4 bb4 ~ eb4 g4 bb4 ~ g4 ~ bb4".fast(1)).sound("square")
  //   .crush(6).room(0.5).delay(0.4).gain(0.35),

  
  n("0 2 4 <[6,8] [7,9]>").scale("C:minor").sound("square")
     .crush(50).room(0.8).gain(0.40),

  n("~ ~ ~ <[6,8] [7,9]>").scale("C:minor").sound("square").lpq(8)
.lpf(400).lpa(.1).lpd(.1).lpenv(4)
.crush(100).room(4).gain(0.15)._scope(),
  
  // n("13 13 ~ ~").scale("C:minor").sound("sine").room(1)
  //    .gain(0.3).pan(0.3)

// samples('https://github.com/tidalcycles/Dirt-Samples/blob/master/breaks165/000_RAWCLN.WAV')
// s("breaks165").slice(8, "0 1 <2 2*2> 3 [4 0] 5 6 7".every(3, rev)).slow(0.75)
  
).cpm(90/4)
