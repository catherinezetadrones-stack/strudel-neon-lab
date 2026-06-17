// SAMPLES & LAYERING - loading sounds and stacking them up.
//
// Preloaded packs (work with no setup):
//   Dirt-Samples  -> bd sd hh cp ... (classic TidalCycles set)
//   drum machines -> .bank("RolandTR909"), .bank("RolandTR808"), ...
//   plus piano, vcsl, mridangam, uzu-drumkit
//
// KEY IDEA - why adding a row silenced the other:
// a bare pattern REPLACES the previous one. Strudel plays only the LAST pattern in
// the buffer. To play things AT THE SAME TIME, layer them one of three ways:
//
//   1) comma inside one string:   s("bd*4, hh*8")
//   2) stack():                   stack(s("bd*4"), s("hh*8"))
//   3) $: tracks (one per line):  $: s("bd*4")
//                                 $: s("hh*8")
//
// With $: you just add another `$:` line to add a row - nothing gets silenced.
// (Run one section at a time: comment this groove if you uncomment another below.)

// === LAYERED GROOVE (active) - add / remove $: lines to add / remove rows =====
// $: s("bd*4").bank("RolandTR909")
// $: s("~ cp").bank("RolandTR909").room(.3)
// $: s("hh*8").bank("RolandTR909").gain(.5)

// === Extra pack from GitHub (uncomment) ======================================
// samples() downloads ASYNC - first run may be silent; press Ctrl+Enter again.
// Errors show in the toolbar status next to the filename.
//
// samples('github:tidalcycles/dirt-samples')
// s("bd sd, ~ cp, hh*8")

// === Chop a breakbeat with splice (uncomment) ================================
// `breaks165` is one long sample; splice(8, ...) cuts it into 8 slices and plays
// them in the given order, fitted to the pattern.
//
// samples('github:tidalcycles/dirt-samples')
// s("breaks165")
//   .splice(8, "0 1 [2 3 0]@2 3 0@2 7")

// === Pitched instrument from .wav files (uncomment) ==========================
// samples(map, baseUrl): map = { name: { note: 'relativePath' } }. Strudel shifts
// the nearest recorded pitch, so a few samples cover a whole range.
//
// samples({
//   moog: {
//     g2: 'moog/004_Mighty%20Moog%20G2.wav',
//     g3: 'moog/005_Mighty%20Moog%20G3.wav',
//     g4: 'moog/006_Mighty%20Moog%20G4.wav',
//   },
// }, 'github:tidalcycles/dirt-samples')

// note("g2!2 <bb2 c3>!2, <c4@3 [<eb4 bb3> g4 f4]>")
//   .s('moog').clip(1).gain(.5)

// === ALL TOGETHER - every example layered into one arrangement ===============
// A single buffer plays ONE arrangement at a time, so to hear everything at once:
// comment the two active examples above (breaks165 + moog), then uncomment this
// whole block. Each $: is a track and they all play together. The sample loads are
// repeated here so the block is self-contained (cached, so it costs nothing).
//
samples('github:tidalcycles/dirt-samples')
samples({
  moog: {
    g2: 'moog/004_Mighty%20Moog%20G2.wav',
    g3: 'moog/005_Mighty%20Moog%20G3.wav',
    g4: 'moog/006_Mighty%20Moog%20G4.wav',
  },
}, 'github:tidalcycles/dirt-samples')

$: s("bd*4").bank("RolandTR909")
$: s("~ cp").bank("RolandTR909").room(.3)
$: s("hh*8").bank("RolandTR909").gain(.5)
$: s("breaks165").splice(8, "0 1 [2 3 0]@2 3 0@2 7").gain(.8)
$: note("g2!2 <bb2 c3>!2, <c4@3 [<eb4 bb3> g4 f4]>").s('moog').clip(1).gain(.5)
