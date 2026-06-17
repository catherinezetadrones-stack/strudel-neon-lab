setcpm(140/4)


//#regiondrums
$: s("hh*4")
$: s("bd").struct("t(<3 5>,8,<0 2>)").gain(1)
$: s("cp").struct("~ t").room(.3)
$: s("hh*16").gain(perlin.range(.1, .5)).pan(sine.fast(3))
  .sometimesBy(.2, x => x.speed(2).gain(.8))
//#endregion


