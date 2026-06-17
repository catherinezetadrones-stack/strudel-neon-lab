// example bite from youtube video https://www.youtube.com/watch?v=B3uipUg5zj4

setcpm(160/4)
samples('github:yaxu/clean-breaks')
samples({'reese':'https://cdn.freesound.org/previews/236/236932_4212462-lq.mp3'})
samples({rhodes: {d3:'https://cdn.freesound.org/previews/4/4191_7740-lq.mp3'}})

let seq1 = "< 4@3 4@5 4@3 4@1 3@2 6@2 >*8" // straigh ahead
let seq2 = "< 0@3 <0 3>@5 2@3 2@3 4@2 >*8" //alt slices every2 bars

let break1 = s("amen:0/4")  .fit().scrub(seq1.div(8))
let break2 = s("sesame:0/1").fit().scrub(seq2.div(8))
let break3 = s("riffin:0/2").fit().scrub(seq1.div(8))

let thechords = "<E13sus _  A13sus _ C13sus _ G13sus _ >"

let pads = chord(thechords).voicing()
    .s('supersaw').attack(.5).release(.5)
    .gain(.5).room(3).phaser(1).phaserdepth(0.3).postgain(.2)
    .early(.1)

let bass = note("<e2 _ c#3 _ c3 _ g2 _ >").s("reese").transpose(-12)
    .s("reese").clip(1).vib("3:.4").distort(1).phaser(1).phaserdepth(.1).lpf(300).postgain(.6).scope()

let rhodes = chord(thechords).voicing()
.arp("< [0 [1 2] 3 [2 5]] [~ ~ ~ ~] [[1 2] 0 [3 5] 6] [ ~ ~ ~ ~] >*2").transpose("<0 0 7 7 0 0>")
.s('rhodes').release(.5).room(1).postgain(0.1).jux(rev())

$: stack(
    bass.mask("<0!8 1!36>").color("red"),
    pads.mask("<0!16 1!36>").color("orange"),
    rhodes.mask("<0!24 1!24>").color("yellow"),
)
._pianoroll()

$: arrange(
    [7, break3],
    [1, break1],
    [3, break3],
    [1, break2],
)
    ._pianoroll({labels:1,cycles:2})