// NIGHTDRIVE  -  breakbeat techno using switch-angel's custom words (D minor, ~140).
//
// SETUP: click "+ switch-angel" in the toolbar first (loads acid / nsc / trancegate / pg).
// Then Ctrl+Enter. Preloaded sounds only, so no sample download to wait on.
//
// NOTE: orbit routing (.o(n)) is removed - it's silent in this embed. Use block mute
// from the rail to solo/mute parts instead.

if (typeof setScale !== 'function') {
  if (window.loadPrelude) window.loadPrelude('switch-angel')
  throw new Error('Loading switch-angel - press Ctrl+Enter again in a moment.')
}
setScale('d:minor')
setcpm(140 / 4)

//#region drums  -  euclidean kick + backbeat clap + perlin-shaped hats
$: s("bd").struct("t(<3 5>,8,<0 2>)").gain(1)
$: s("cp").struct("~ t").room(.3)
$: s("hh*16").gain(perlin.range(.1, .5)).pan(sine.fast(3))
  .sometimesBy(.2, x => x.speed(2).gain(.6))
//#endregion

//#region break  -  chopped breakbeat, occasionally reversed, widened with jux
$: s("breaks165").fit().chop(8)
  .sometimesBy(.25, x => x.speed("-1"))
  .jux(rev).coarse(8).gain(.5)
//#endregion

//#region bass  -  acid() turns this into a filtered supersaw bass
$: note("<d2 d2 f2 a1 d2 c2 a1 f1>").acid()
  .lpf(perlin.range(220, 950)).lpenv(4)
  .gain(.5).pg(.9)._scope()
//#endregion

//#region lead  -  nsc() arp: scale-degrees on the global d:minor scale, octave 5
$: s("supersaw").nsc("0 2 3 5 7 <9 10> 7 5", 5)
  .off(1/8, x => x.add(note(12)).gain(.4))
  .lpf(2800).lpq(6).delay(.35).room(.4).gain(.3)._scope()
//#endregion

//#region pad  -  trancegated minor chords under a slow filter sweep
$: note("<[d3,f3,a3] [c3,f3,a3] [d3,g3,bb3] [a2,d3,f3]>").s("sawtooth")
  .trancegate(.45, 5, 2)
  .lpf(sine.range(500, 2000).slow(8)).room(.7).gain(.3)
//#endregion
