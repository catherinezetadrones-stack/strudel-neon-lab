---
tags: [strudel, concept, rhythm]
---

# Mini-Notation

The little language inside the `"..."` strings. This is where rhythm and sequence live —
it's the "piano roll" and "drum grid," but typed. Master this and you can write most
patterns from your head.

## The core: a space = a step

Items separated by spaces share the [[2 Cycles and Tempo|cycle]] equally.

```js
s("bd sd hh sd")   // 4 events, each 1/4 cycle (a basic beat)
note("c e g b")    // 4 notes across the bar
```

## Operator reference

| Symbol | Meaning | Example |
|---|---|---|
| (space) | sequence — split the cycle | `"bd sd hh sd"` |
| `~` (or `-`) | rest / silence | `"bd ~ sd ~"` |
| `*` | speed up / repeat a step | `"bd*4"` = 4 kicks; `"[hh hh]*2"` |
| `/` | slow down (play over more cycles) | `"bd/2"` = a kick every 2 cycles |
| `[ ]` | group → a sub-sequence in one step | `"bd [sd sd] hh"` |
| `< >` | alternate — **one item per cycle** | `"<c e g>"` cycles c, e, g, … |
| `,` | stack / play together (chord or layers) | `"[bd, hh*8]"`, `"[c,e,g]"` |
| `!` | replicate as separate events | `"bd!3 sd"` = bd bd bd sd |
| `@` | weight / elongate a step | `"c@3 e"` = c holds 3×, e holds 1× |
| `?` | random drop (~50% chance) | `"hh*8?"` thins the hats |
| `\|` | random choice between options | `"[c,e,g] \| [a,c,e]"` |
| `( , , )` | Euclidean rhythm | `"bd(3,8)"` = 3 hits spread over 8 |
| `{ } %n` | polymeter with step length n | `"{bd sd, hh hh hh}%4"` |
| `.` | group separator (shorthand for `[]`) | `"bd sd . hh hh hh"` |
| `:` | sample index in a folder | `"bd:3 sd:1"` |

## The four you'll use constantly

- **`*` (speed)** — density. `"hh*16"` = sixteenth hats. `"bd*<2 4>"` even modulates it.
- **`< >` (alternation)** — variation over time. `"<c e g>"` plays a different note each bar;
  perfect for chord changes: `"<Cm Fm Ab Bb>"`. This is your bar-to-bar arrangement glue.
- **`[ ]` (grouping)** — nest rhythm. `"bd [~ sd] bd [sd sd]"` puts two snares in the last
  slot. Brackets nest infinitely: `"bd [sd [hh hh]]"`.
- **`,` (stack)** — vertical layering inside one string. `"bd*4, hh*8, ~ cp"` is a whole
  beat in one line. For chords: `"[c3,eb3,g3]"`.

## Euclidean rhythms (your secret weapon)

`(pulses, steps, rotation)` spreads `pulses` hits as evenly as possible across `steps`.
This generates classic world/techno rhythms instantly:

```js
s("bd(3,8)")        // 3-over-8: the "tresillo" / classic house feel
s("hh(7,16)")       // busy, uneven hats
s("cp(2,8,2)")      // 2 claps, rotated 2 steps over
```

You can pattern the arguments: `"bd(<3 5>,8)"` alternates the density each cycle.

## Polymeter

`{ }%n` plays each comma-separated lane in parallel, **stepping** through n steps per cycle
regardless of how many items the lane has — so lanes of different lengths phase against
each other (3-against-4 etc.) cleanly:

```js
"{bd sd, hh hh hh}%4"   // kick/snare lane and a 3-hat lane, sampled 4 steps/cycle
```

This is the typed version of running clips of different lengths in Session view and letting
them drift. See [[2 Cycles and Tempo#why-cycles-instead-of-bars]].

## Weighting and holds (`@`)

`@` gives a step more time — great for syncopation and held chords:

```js
note("c@3 e")                 // dotted feel: c is 3× as long as e
note("<[c,eb,g]@3 [bb,d,f]>") // first chord held 3×, then a quick change
```

## Where mini-notation can go

Almost anywhere a value goes, because it's just a [[3 Patterns as Functions|pattern]]:

```js
s("bd*4").lpf("400 800 1600 800")   // cutoff sequence
s("bd*4").gain("1 0.6 0.8 0.6")     // accent pattern (velocity)
n("0 2 4 <6 7>").scale("C:minor")   // melodic line, last note alternates
```

## Related

- [[2 Cycles and Tempo]] — `*` and `/` change how steps fill the cycle.
- [[11 Transforming Patterns]] — function equivalents (`fast`, `ply`, `euclid`, `rev`).
- [[6 Notes, Scales and Harmony]] — putting pitches in these strings.
