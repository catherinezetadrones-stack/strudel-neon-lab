// CYBERPUNK DRIFT  -  a dark techno sketch put together by Claude.
// Every part is a $: track (they all play together). Each //#region is a block you
// can collapse / mute from the rail. Click into the editor, then Ctrl+Enter.
// Uses only preloaded sounds, so it should play on the first run.

setcpm(125/4)

//#region drums
$: s("bd*4").bank("RolandTR909").gain(0.95)
$: s("~ cp").bank("RolandTR909").room(0.35)
$: s("hh*8").bank("RolandTR909").gain(saw.range(0.25, 0.7).fast(2)).pan(sine.fast(4))
$: s("~ ~ ~ oh").bank("RolandTR909").gain(0.35)
//#endregion

//#region bass  -  acid sawtooth with a sweeping filter
$: note("<c2 c2 eb2 g1>*8").s("sawtooth")
  .lpf(sine.range(320, 1900).slow(8)).lpq(9)
  .distort(1.1).gain(0.6)
//#endregion

//#region chords  -  cold minor stabs every bar
$: note("<[c3,eb3,g3] [c3,f3,ab3] [bb2,d3,f3] [g2,bb2,d3]>")
  .s("sawtooth").lpf(1100).room(0.7).gain(0.26)
  .attack(0.04).release(0.5)
//#endregion

//#region lead  -  bit-crushed arp with delay, doubles up every 4 bars
$: note("c5 eb5 g5 c6 <g5 bb5> eb5 c5 g4")
  .s("square").lpf(2600).lpq(4).crush(8)
  .delay(0.4).room(0.35).gain(0.3)
  .every(4, x => x.fast(2))
//#endregion
