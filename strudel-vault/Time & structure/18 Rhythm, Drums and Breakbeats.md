---
tags: [strudel, rhythm, drums, breakbeats, mini-notation]
---

# Rhythm, Drums and Breakbeats

A drummer's deep dive. This builds on the operators in [[4 Mini-Notation]] and the
transformers in [[11 Transforming Patterns]] — here the focus is purely on *rhythm as
craft*: building grooves, chopping breaks, and making long sequences breathe.

---

## 1. Building patterns from scratch

### The grid

One cycle = one bar (at `setcpm(BPM/4)`). Items in a string share the bar equally:

```js
s("bd sd hh sd")    // 4 equal beats: kick snare hat snare
s("bd sd hh")       // 3 equal beats — instant triplet feel
```

`~` is a rest:

```js
s("bd ~ ~ ~")       // kick on 1 only
s("bd ~ bd ~")      // kicks on 1 and 3
s("~ cp ~ cp")      // clap on 2 and 4 (your backbeat)
```

### Kick patterns

```js
s("bd*4")                     // four-on-the-floor
s("bd ~ bd ~")                // half-time
s("bd*4, bd ~ ~ bd*2 ~")      // layer a syncopated low kick under the floor
s("bd ~ ~ ~ ~ ~ bd ~")        // 1 and 7 (8-step grid)
```

Build a kick pattern the same way you'd count it out. Each item in `"..."` is one step of equal length.

### Snare variations

```js
s("~ sd ~ sd")                    // straight backbeat
s("~ sd ~ [sd sd]")               // 16th-note double on beat 4
s("~ sd ~ <sd [sd ~]>")           // alternates: bar 1 normal, bar 2 truncated fill
s("~ [~ sd] ~ sd")                // snare slightly late on beat 2 (pushed feel)
```

### Hi-hat density and accent

```js
s("hh*8")                                    // straight 8ths
s("hh*16")                                   // straight 16ths
s("[oh ~]*4")                                // open hat on every beat
s("hh*16").gain("1 0.4")                     // accent every other: 8th-note feel inside 16ths
s("hh*16").gain("1 0.5 0.8 0.5")            // 4-step accent pattern on 16 steps
s("hh*16").gain(perlin.range(0.2, 1))        // organic, breathing velocity
```

> [!tip] Gain as velocity
> `.gain("1 0.6 0.8 0.6")` is your velocity lane. The pattern repeats over the events,
> so 4 values on 16 hats repeats 4 times — a 4-step accent cycle on a 16-step grid.

### Sample variation with `:`

Every named sample (`bd`, `sd`, `hh`, etc.) is a folder. `:n` picks the nth file:

```js
s("bd:0 bd:2 bd:5")          // three different kick samples in sequence
s("sd:0 sd:1 sd:0 sd:3")     // 4-beat snare with variation
s("[bd:0|bd:2|bd:4]*4")      // random pick from three kicks on every hit
```

Use `|` to randomize per event, `< >` to rotate deterministically:

```js
s("bd:<0 2 4>*4")            // cycles through bd:0, bd:2, bd:4 each bar
```

### Drum machines with `.bank()`

Swaps the entire sound set for a specific drum machine character:

```js
$: s("bd*4").bank("RolandTR909")
$: s("~ cp").bank("RolandTR909")
$: s("hh*8").bank("RolandTR909").gain(.5)

// mix banks for hybrid kits:
$: s("bd*4").bank("RolandTR909")
$: s("~ cp").bank("RolandTR808")
```

Other banks: `"RolandTR808"`, `"SequentialCircuitsDrums"`, `"RhythmAce"`, `"LinnDrum"`.

### A complete beat in one block

Use `,` to stack inside a single string, or `$:` for separate tracks (easier to mute):

```js
// single string — all in one pattern
s("bd*4, ~ cp ~ cp, hh*8, [~ ~ oh ~]*2")

// separate tracks — each line is independently looping
$: s("bd*4").bank("RolandTR909").gain(.9)
$: s("~ cp ~ cp").bank("RolandTR909").room(.3)
$: s("hh*8").bank("RolandTR909").gain("1 .5")
$: s("[~ ~ oh ~]*2").bank("RolandTR909").room(.5)
```

---

## 2. Nested rhythm and sub-grouping

`[ ]` is your tuplet/bracket. It packs sub-events into one step's time:

```js
s("bd sd hh sd")             // 4 equal beats
s("bd [sd ~] hh [sd sd]")    // last step is a 16th-note double
s("bd [sd sd sd] hh sd")     // triplet snare on beat 2
s("bd [hh hh hh hh] sd hh") // 4 hats crammed into beat 2 — a fill
```

Nest brackets freely:

```js
s("bd [[sd ~] sd] hh ~")     // beat 2: two-level nesting: (sd rest) then sd
```

> [!tip] Bracket = tuplet
> `[sd sd sd]` in one beat slot is a 16th-note triplet. `[hh hh hh hh]` is 64th notes.
> The number of items in `[]` determines the subdivision automatically.

### Rolls and stutters

```js
s("bd").ply(4)                        // hit bd 4x in place — a 4-stroke roll
s("sd*4, [sd sd sd sd]*4")           // snare with roll underneath
s("sd").stut(4, 0.7, 1/8)            // 4-hit decay roll, each 1/8 of a cycle apart
```

`.stut(repeats, feedback, time)` — `feedback` is the volume multiplier each repeat (0.7 = 70%),
`time` is the gap in fractions of a cycle.

---

## 3. Euclidean rhythms

`(pulses, steps, rotation)` places `pulses` hits as evenly as possible across `steps`. This
generates most real-world rhythmic patterns automatically:

```js
s("bd(3,8)")         // tresillo — 3 in 8: the African/Latin backbone of house and techno
s("bd(5,8)")         // clave-ish
s("bd(4,8)")         // four-on-the-floor written as Euclidean (same as bd*4 here)
s("hh(7,16)")        // dense, uneven 16th hats
s("sd(2,8,2)")       // 2 hits in 8 steps, rotated 2 steps right (shifts where they land)
s("cp(2,8,4)")       // 2 hits in 8, rotated 4 (clap on beats 3 and 7)
```

> [!important] Rotation is your groove adjustment
> `(3,8)` vs `(3,8,2)` shifts the whole rhythm right by 2 steps without changing its
> internal feel. Use it to align Euclidean patterns to where you want the downbeat.

### Pattern the arguments

Any argument can itself be a mini-notation pattern:

```js
s("bd(<3 5>,8)")          // alternates: bar 1 is (3,8) tresillo, bar 2 is (5,8)
s("hh(<7 9 11>,16)")      // shifts hat density across 3-bar phrase
s("sd(2,<8 16>)")         // in 8 steps one bar, 16 the next — rushes/relaxes
```

---

## 4. Polymeter with `{ }%n`

Steps through each comma-separated lane independently, sampling `n` steps per cycle. Lanes
of different lengths phase against each other:

```js
"{bd sd, hh hh hh}%4"       // kick/snare lane (2 items) vs 3-hat lane, 4 steps/cycle
                              // every 6 cycles the phase relationship resets
```

More complex:

```js
$: s("{bd ~ ~, cp cp, hh hh hh hh hh}%8")   // 3, 2, and 5 item lanes in an 8-step grid
```

> [!tip] This is free polyrhythm
> You get 3-against-2, 5-against-4, etc. without any arithmetic. The `%n` is the
> "grid clock" — everything is stepped at that rate.

---

## 5. Alternation and bar-to-bar variation

`< >` picks one item per cycle (loops through them):

```js
s("bd ~ <bd ~> ~")               // beat 3: kick on odd bars, rest on even
s("hh*<8 16>")                   // 8ths one bar, 16ths the next
s("~ cp ~ <cp [cp cp]>")         // bar 4 has a 16th double
s("<bd(3,8) bd(5,8)>")           // alternates two Euclidean kick patterns
```

Nest `< >` for longer phrase cycles:

```js
s("bd ~ ~ <bd ~ <~ bd>>")        // a 3-level alternation: every 2nd bar of every 2nd bar
```

### Using `.struct()` to separate rhythm from sound

Define the rhythm once, apply it to any sound:

```js
let groove = "<t [t ~] t [t t]>"   // boolean rhythm (t = hit, ~ = rest)

$: s("bd").struct(groove)           // kick plays the groove
$: s("sd").struct(groove.late(.5))  // snare plays the same groove, half a cycle offset
```

This is also how you do the numeric-sidechain technique — see [[13 Mixing and Levels#pattern-sidechain]]:

```js
let kick = "1 0 0 0"
$: s("bd").struct(kick)
$: pads.lpf(kick.range(400, 2000))   // filter pumps on the same rhythm
```

---

## 6. Breakbeat chopping

All of these work on any sample, but breakbeats are where they shine. Load a break first:

```js
samples('github:tidalcycles/dirt-samples')   // async — press Ctrl+Enter twice
```

### `.fit()` — stretch to cycle length

Makes the sample exactly one cycle long. Foundation for all chopping:

```js
s("breaks165").fit()                // whole break stretched to the bar
s("amen").fit()                     // amen break, tempo-locked
```

### `.chop(n)` — equal slices, played in order

Cuts the sample into `n` equal pieces and plays them sequentially. Sounds like the original
break but gives you handles on each slice:

```js
s("amen").fit().chop(8)                                      // 8 slices in order
s("amen").fit().chop(8).jux(rev)                             // original left, reversed right
s("amen").fit().chop(8).sometimesBy(.25, x => x.speed("-1")) // random reverse on 25% of slices
s("amen").fit().chop(16).gain("1 0.8")                       // alternate slice volumes
```

`.chop()` keeps the slices in order — use `.slice()` if you want to rearrange them.

### `.slice(n, "indices")` — custom playback order

Cuts into `n` slices, then plays them in the index order you specify. The index string is
full mini-notation:

```js
s("amen").fit().slice(8, "0 1 2 3 4 5 6 7")         // original order (same as chop)
s("amen").fit().slice(8, "0 7 2 3 4 5 6 1")         // swap 2nd and last slice
s("amen").fit().slice(8, "0 0 2 3")                  // only use 4 of the 8 slices, looping
s("amen").fit().slice(8, "0 1 [2 3] 4 5 6 7")       // slices 2 and 3 squeezed into one step
s("amen").fit().slice(8, "0 1 2 3 <4 7> 5 6 7")     // slice 5 alternates between 4 and 7 each bar
s("amen").fit().slice(8, "0 1 2 3 4 5 6 [7 ~]")     // last slice stutters on odd bars
```

> [!important] The index string is mini-notation
> Everything you know — `< >`, `[ ]`, `?`, `|`, `@` — works inside the index pattern. This
> is where breakbeat programming gets deep.

### `.splice(n, "indices")` — like slice but time-stretched

Each slice is stretched to fill its time slot, so reordering doesn't change pitch:

```js
s("amen").splice(8, "0 1 2 3 4 5 6 7")              // original, pitch-stable
s("amen").splice(8, "0 7 2 3 4 5 6 1")              // reordered, no pitch shift
```

Use `.slice()` when you want the pitched artifacts of speed differences (gives that
pitched-chop sound). Use `.splice()` when you want clean reordering.

### `.striate(n)` — granular interleave

Cuts into `n` slices and interleaves them across the pattern — a smear/granular effect
rather than clean chops:

```js
s("amen").fit().striate(8)                           // granular smear
s("amen").fit().striate(16).slow(2)                  // slower, more textural
```

### `.scrub(position)` — freeform sample position

Takes a 0–1 position pattern and plays from that point in the sample. Combined with `.fit()`
you get total control of the playhead:

```js
s("amen").fit().scrub("0 0.25 0.5 0.75")    // 4 quarter-positions, evenly spaced
s("amen").fit().scrub(perlin)                // organic, drifting position — granular feel
s("amen").fit().scrub(sine.range(0, 1).slow(4))  // smooth sweep through the break over 4 bars
```

To use a custom step sequence as a scrub map (divide step indices by the number of slices):

```js
let positions = "0 3 2 5 4 7 1 6"
s("amen").fit().scrub(positions.div(8))      // 8-step index -> 0-1 position
```

### Combining chopping techniques

```js
// Classic chopped break with width and randomness
s("amen").fit().chop(8)
  .sometimesBy(.25, x => x.speed("-1"))     // quarter of slices reversed
  .jux(rev)                                  // stereo width
  .gain(.7)

// Resequenced with fills that vary each bar
s("amen").fit().slice(8, "0 1 <2 [2 3]> 4 5 6 <7 [7 ~]>")
  .every(4, x => x.rev())                   // whole break reverses every 4th bar
  .room(.2)

// Granular at low speed
s("amen").fit().striate(16)
  .slow(2).gain(.4).room(.5)
```

---

## 7. Internal variation during long sequences

These are your "arrangement without a timeline" tools — they make loops evolve without
writing a fixed structure.

### `every(n, fn)` — apply on a schedule

Applies `fn` once every `n` cycles:

```js
s("bd*4").every(4, x => x.fast(2))                 // double-time fill every 4 bars
s("hh*8").every(8, rev)                             // reverse hats every 8 bars
s("amen").fit().chop(8).every(3, x => x.rev())     // break reverses every 3rd cycle
s("sd*4").every(2, x => x.room(2).gain(1.2))       // wet snare every other bar
```

Pattern the n-argument to vary the schedule:

```js
s("bd*4").every("<4 8 4 2>", x => x.fast(2))       // fill schedule changes over 4 bars
```

### `firstOf(n, fn)` / `lastOf(n, fn)` — fills on a specific beat

```js
s("bd sd hh sd").firstOf(8, x => x.room(2).gain(1.1))   // intro hit on bar 1 of every 8
s("bd sd hh sd").lastOf(4, x => x.fast(2))               // double-time fill on bar 4
s("hh*16").lastOf(8, x => x.degradeBy(.6))               // thinning hats on bar 8
```

> [!tip] `lastOf(4, fn)` is your "every 4th bar fill" button
> This is the most common use: every 4 cycles, the last one does something different.
> Stack them for compound fills: `lastOf(4, x => x.fast(2)).lastOf(8, x => x.rev())`

### `sometimesBy(p, fn)` — random per event

Each individual event gets `fn` applied with probability `p`:

```js
s("hh*16").sometimesBy(.2, x => x.gain(1.5).speed(2))   // random accents and 32nd flams
s("bd*4").sometimesBy(.08, x => x.ply(2))                // rare double kick
s("cp ~ cp ~").sometimesBy(.15, x => x.room(3).gain(.8)) // occasional wash
```

Probability shorthands (use these directly):
- `.always(fn)` — every event
- `.often(fn)` — 75% of events
- `.sometimes(fn)` — 50%
- `.rarely(fn)` — 25%
- `.almostNever(fn)` — 10%

### `someCyclesBy(p, fn)` — random per whole cycle

The entire bar gets `fn` applied for that cycle:

```js
s("bd*4").someCyclesBy(.25, x => x.fast(2))        // whole bar goes double-time, 25% of bars
s("amen").fit().chop(8).someCyclesBy(.1, rev)       // whole break reverses, 10% chance per bar
s("hh*16").someCyclesBy(.15, x => x.degradeBy(.5)) // a whole bar of sparse hats, rarely
```

### `degradeBy(p)` — random event removal

Thins a pattern by randomly removing events:

```js
s("bd*4").degradeBy(.1)        // ~10% of kicks skipped — humanizes the grid
s("hh*16").degradeBy(.3)       // sparse, breathing hats
s("cp ~ cp ~").degradeBy(.2)   // occasional missed clap
```

`"hh*16?"` is the mini-notation shorthand for `degradeBy(0.5)`.

### `chunk(n, fn)` — a moving spotlight

Applies `fn` to a different 1/n slice of the pattern each cycle. The effect rotates through
the bar over `n` cycles:

```js
s("bd sd hh sd").chunk(4, x => x.gain(1.5))   // each bar, a different beat is accented
s("amen").fit().chop(8).chunk(4, x => x.room(2))  // reverb moves through the break slices
```

Over 4 cycles: beat 1 louder, then beat 2, then beat 3, then beat 4 — a natural accent cycle.

### `iter(n)` — rotating downbeat

Each cycle, the start point shifts by 1/n — the pattern is the same but the downbeat moves:

```js
s("bd sd hh cp").iter(4)    // cycle 1: bd sd hh cp | cycle 2: sd hh cp bd | cycle 3: hh cp bd sd ...
```

Creates a continuous sense of motion without changing the pattern. Good for long-form builds
where you want drift without writing new content.

### `rot(n)` — shift values, keep rhythm

Like `iter` but shifts the *values* (which note/sample plays) while the *rhythm* stays fixed:

```js
n("0 2 4 6").scale("C:minor").rot(1)   // values rotate each cycle, rhythm stays put
```

### `palindrome` — forward then backward

```js
s("bd sd hh cp").palindrome()    // cycle 1: bd sd hh cp | cycle 2: cp hh sd bd | repeat
```

---

## 8. Playing a pattern exactly once

### `mask` for one-shot events

`mask` gates a pattern on/off with a 0/1 (or `t/~`) pattern:

```js
$: fill.mask("<1 0!7>")        // plays on cycle 1, silent for cycles 2-8, then repeats
$: fill.mask("<1 0!31>")       // plays once in a 32-bar phrase
```

`"<1 0!7>"` reads: 1 for the first alternate step, 0 for 7 more — so active on cycle 1 of
every 8. The `< >` alternation is your phrase length.

For a one-shot at the very start (plays once, then effectively never again):

```js
$: intro.mask("<1 0!999>")     // plays cycle 1 of a 1000-cycle phrase
```

### `arrange` for timed single plays

`arrange([cycles, pattern], ...)` gives you a fixed timeline — each element plays for its
cycle count then hands off:

```js
arrange(
  [1, fill],       // fill plays exactly once
  [3, silence],    // 3 cycles of silence
  [4, groove],     // then the groove runs for 4 cycles
)                  // loops: fill → silence → groove → fill → ...
```

To make something play once per phrase boundary:

```js
arrange(
  [1, crash],
  [7, groove],    // crash on bar 1, groove for bars 2-8, repeats every 8
)
```

### `firstOf` / `lastOf` for fills

Not literally "play once," but "play only on this cycle of n" — the drummer's fill:

```js
$: s("bd sd hh sd")
  .lastOf(4, x => x.fast(2))         // fill on every 4th bar
  .lastOf(16, x => x.fast(4).room(2))  // bigger fill every 16th bar
```

Stack both: bar 4 gets the small fill, bar 16 overrides it with the big one.

---

## 9. Bringing it together

### A full groove with variations

```js
setcpm(140/4)

let kick  = "1 0 0 <0 1>"                     // kick has a ghost on beat 4 every other bar

$: s("bd").struct(kick).bank("RolandTR909").gain(1)
$: s("cp ~ cp ~").bank("RolandTR909").room(.3)
  .lastOf(4, x => x.fast(2))                  // 16th fill every 4 bars
$: s("hh*16").bank("RolandTR909")
  .gain("1 0.4")                               // 8th-note accent feel on 16ths
  .sometimesBy(.1, x => x.gain(1.5).speed(2)) // random ratchets
  .degradeBy(.15)                              // some hats missing
$: s("oh").struct("<~ t ~ ~, ~ ~ ~ t?>")       // open hat: beat 2, maybe beat 4
  .bank("RolandTR909").room(.5)
  .every(4, x => x.fast(2))                   // double-time open hat fill every 4th bar

// Pattern sidechain: pads duck when kick hits
$: pads.lpf(kick.range(400, 2000))
```

### A chopped break with a live feel

```js
samples('github:tidalcycles/dirt-samples')

$: s("amen").fit()
  .slice(8, "0 1 <2 [2 3]> 4 5 6 <7 [7 ~]>")   // bar-to-bar variations
  .sometimesBy(.2, x => x.speed("-1"))            // random reverses
  .jux(rev)                                        // stereo width
  .gain(.65)
  .every(4, x => x.rev())                         // whole break flips every 4th bar
  .lastOf(8, x => x.fast(2))                      // double-time on bar 8 of every 8
```

---

## Related

- [[4 Mini-Notation]] — operator reference
- [[11 Transforming Patterns]] — `rev`, `jux`, `off`, `superimpose`
- [[12 Structure and Arrangement]] — `stack`, `mask`, `arrange`
- [[13 Mixing and Levels]] — pattern sidechain, orbit routing
- [[14 Cookbook]] — copy-paste starting points
