//#region prelude:switch-angel - loaded & hidden (custom words ready; write patterns below)
//#endregion

setGainCurve(x => Math.pow(x,2))
samples('github:switchangel/breaks')
samples('github:switchangel/pad')
samples('github:yaxu/clean-breaks')

setcps(150/60/4)

//#region drums
$: s("amen/4").fit().rib(3,4)
    // .scrub(4)
    // .scrub(irand(8).seg(4).rib(5,5))
    // .orbit(2)
  .distort("3:.5").decay(2)
    .coarse(16)
    .gain(.2)
    ._punchcard()

$: s("bd:4").beat("0,7?,10",16)
    ._punchcard()

$: s("sd:2").beat("4,12",16)
    ._punchcard()

$: s("white!8").decay(tri.range(0.03, 0.1).fast(2))
    .gain(0.6).almostNever(ply("2"))

// $: s("rim:1").struct("1 0 0 0 1 0 1")


$: s("~ hh ~ hh").filtval("s", "bd", x => x.duck(2))

$: s("bd").n(5).room(0.1).rlp(1800).up(`<
    ~ ~ ~ 0.7:4
    ~ ~ ~ ~
    ~ ~ ~ [0.4:4 0.6:4]
    1 0.5 1:22:sd:1 ~
  >*8`.as("velocity:n:s:room")).gain(.3).pan(.8)

$: s("rim:1").struct(rand.mul(.65)
    .round()).seq(16)
    .rib(3,2)
    .gain(1)
    ._punchcard()
//#endregion

$: s("bass")
// .scrub("4 12 51 51 3 3 3 8".div(50))
    .scrub(perlin.range(.17, .3)
    .fast(4).seg(8).rib(22,2))
    .sometimesBy(.15, x => x.speed("-1"))
    .phaser(.3).distort("2.5:.45")
    ._scope()



