//sample bite from youtube video https://www.youtube.com/watch?v=B3uipUg5zj4

setcpm(160/4)
samples('github:yaxu/clean-breaks')
samples('github:bubobubobubobubo/dough-fox')
samples({'reese':'https://cdn.freesound.org/previews/236/236932_4212462-lq.mp3'})
samples({rhodes: {d3:'https://cdn.freesound.org/previews/4/4191_7740-lq.mp3'}})

//#regionbasis
let thechords = "<E13sus _  A13sus _ C13sus _ G13sus _ >"

let pads = chord(thechords).voicing()
  .s('supersaw')
  .room(3)

let kick = "[1@1 0@3] [<1@1<1@1 1@1?>> 0@3] [1@4 1?] [0@4 1 0@3]"

let seq1 = "< 4@3 4@5 4@3 4@1 3@2 6@2 >*8" // straigh ahead
let seq2 = "< 0@3 <0 3>@5 2@3 2@3 4@2 >*8" //alt slices every2 bars

let break1 = s("amen:0/4").fit().scrub("{0@3 0@2 4@3}%8".div(16)).hpf(600).room(.1).postgain(1.1)
let break2 = s("sesame:0/1").fit().scrub(seq2.div(8))
let break3 = s("riffin:0/2").fit().scrub(seq1.div(8))
//#endregion


//#regiondrums and breaks
$: s("bd").struct(kick).duckorbit(4).duckattack(.001).duckdepth(2).postgain(0)
let bottom = s("bd:14").struct(kick).duckorbit(3).duckattack("<.2 .1 .3 .1>").duckdepth("<.9 .9 .9 .6>").postgain(1.3)

let broke = arrange(
    [7, break3],
    [1, break1],
    [3, break3],
    [1, break2],
  )
  .duckorbit(2).duckdepth(5).duckattack(.25)
  ._pianoroll({labels:1,cycles:2})

let tamb = s("[ftamborine:0]*16").struct("<1>*16")
  .gain(saw.range(perlin.range(.3,.5),perlin.range(.7,.8)).fast(3))
  .pan(sine.range(perlin.range(.3,.8),perlin.range(.4,.7)))
  .orbit("<<4 1> [4 1] [1 4] <1 4>>/2")
  .postgain(.6)
//#endregion


//#regionjbsmooth bass
let jb = note("<[1*1 _ 1*1 _ _ ] [4*2] [3*1 _ 3*1_ _ _ ] 6 [3*1 _ 3*1_ _ _ ] 4 [-4*1 _ -4*1_ _ _] -1>/1")
    .layer(
      /*mute squareBass [true]*//*
      x=>x.s("square").decay(slider(0.7645,.5,1)),
      *//*end*/
      /*mute sineBass [true]*//*
      x=>x.s("sine").adsr(0,.3,.1,.1).postgain(.8).orbit(4),
      *//*end*/
    )
    .lpf(saw.range(70,110)).lprelease(.001).lpattack(.09).lpsustain(.01).lpdecay(.4)
    .lpenv(5)
    .coarse(4)
    .transpose(5)
    .scale("<E:major _ A:minor _ C:minor _ G:minor _>")
    .scaleTranspose(-12)
    .transpose(-12)
    .fm(.5)
    .fmh(-1)
    .fmenv('lin')
    .fmsustain(.01)
    .fmdecay(.01)
    .postgain(1.3)
    .color("red")
//#endregion


//#regionkeys and pads
let stab = pads
    .lfo({c: 'lpf', shape: "<sine triangle sine saw>/2"})
    .lpf(900).lpenv(15).lpa(1.1).lpd(-10)
    .decay(.3).duck(3)
    .delay(.6,.1,.8).delaytime(.125).delayfeedback(.8)
    .color("pink")
    .postgain(.65)

let wall = chord(thechords).voicing()
    /*mute bpfWall [true]*//* 
    .bpf("<800 800 850 900>/2").bpenv("<4 4 4 3>/2").bpq("<9 9 7 8>/2").bpattack("<.2 .3 .2 .4>/2")
    *//*end*/
    /*mute lpfWall [true]*//*
    .lfo({c: 'lpf', shape: "<triange triangle sine saw>/2", sync: "<1.6 8>/2"})
    .lpf("<800 800 850 900>/2").lpenv("<4 4 4 3>/2").lpq("<9 9 7 8>/2").lpattack("<.2 .3 .2 .4>/2")
    *//*end*/
    .decay("<3.8 3.8 3.8 3.5>/2")
    .attack("<.1 .4 .2 .15>/2")
    .layer(
      /*mute sawtoothWall [true]*//*
      x=>x.s("sawtooth").vib(1),
      *//*end*/
      /*mute squareWall [true]*//*
      x=>x.s("square"),
      *//*end*/
      x=>x.s("triangle").vowel("<i o u e>/2").room(3)
    )
    .orbit("<3 3 3 2>/2")
    .crush(5)
    .phaser("<3 3 4 3.5>/2").chorus(1).hpf(500).lfo({sync: 4})
    .delay("<.4 .4 .4 .6>/2",0,.8).delaytime("<.2 .2 .3 .5>/2").delayfeedback("<.7 .7 .7 .5>/2")
    .postgain(.4)
    .color("blue")
//#endregion

//#regionArrangement below
//#endregion

//#regionintro
//sawtoothWall || squareWall || lpfWall => [OFF]
//squareBass || sineBass => [OFF]
$: arrange(
    [1, wall],
    [1, stab],
)
.gain(1)
.room(.3).roomsize(14).dry(0)
.spectrum({speed:1})

_$: stack(
  wall.color("<blue purple cyan yellow>/2"),
  bottom.mask("<1!4 0!4>").hpf(120).undegradeBy(.5),
).spectrum({speed:2})
//#endregion

//#regionBuild
_$: stack(
  wall.color("<blue purple cyan yellow>/2"),
  stab.postgain(slider(0.32385,.25,.6)),
  bottom.mask("<1!4 0!4>").hpf(120).undegradeBy(.4),
).spectrum({speed:3})

//lpfWall [ON]
_$: stack(
  wall.color("<blue purple cyan yellow>/2"),
  stab,
  jb.mask("<1!2 0!5 1!1>"),
  bottom.mask("<1!4 0!4>").hpf(120).undegradeBy(.3),
).spectrum({speed:4})

//wait sineBass [ON]
_$: stack(
  wall.color("<blue purple cyan yellow>/2"),
  stab.degradeBy(.7),
  jb.mask("<1!2 0!5 1!1>"),
  bottom.mask("<1!4 0!4>").hpf(120).undegradeBy(.3),
  break2.hpf("<400 400 500 500>/2").postgain(.6)
).spectrum({speed:5})

//sineBass [ON]
//wait squareWall [ON]
_$: stack(
  wall.color("<blue purple cyan yellow>/2"),
  stab,
  jb.mask("<1!2 0!5 1!1>"),
  bottom.mask("<1!4 0!4>").hpf(120).undegradeBy(.3),
  break2.hpf(450).postgain(.7),
  tamb,
).spectrum({speed:6})
//#endregion

//#region build to full
//sineBass [OFF]
_$: stack(
  wall.color("<blue purple cyan yellow>/2"),
  stab,
  jb.mask("<1!2 0!5 1!1>"),
  bottom.mask("<1!4 0!4>").hpf(120).undegradeBy(.3),
  broke.hpf("<350 350 450 450>/2").postgain(.7),
  tamb,
).spectrum({speed:7})

//sawtoothWall [ON]
//wait sineBass [ON]
_$: stack(
  wall.color("<blue purple cyan yellow>/2"),
  stab,
  jb.mask("<1!2 0!5 1!1>"),
  bottom.mask("<1!4 0!4>").undegradeBy(.3),
  broke.hpf(slider,175,175,450)),
  tamb,
).spectrum({speed:7})
//#endregion

//#region full
//squareBass [ON]
_$: stack(
  wall.color("<blue purple cyan yellow>/2"),
  stab,
  jb,
  bottom,
  broke,
  tamb,
).spectrum({speed:8})
//#endregion

//#regionbreakdown
//sineBass [OFF]
_$: stack(
  wall.mask("<1!4 0!4>").color("<purple cyan>/2"),
  stab.color("<blue purple cyan yellow>/2"),
  jb,
  bottom.mask("<1!3 0!3 2!2>").hpf(60).undegradeBy(.2),
  broke,
  tamb,
).spectrum({speed:6})


$: stack(
  stab.color("<blue purple cyan yellow>/2"),
  jb,
  broke.hpf(slider(440.4,250,450)),
  tamb,
).spectrum({speed:4})

//#endregion
