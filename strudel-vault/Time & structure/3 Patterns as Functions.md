---
tags: [strudel, concept]
---

# Patterns as Functions

This is the idea that makes Strudel (and its parent, TidalCycles) tick. You don't strictly
need it to make music, but it explains *why* everything composes so cleanly.

## A pattern is a function of time

A Strudel **pattern** is, literally, a function: give it a span of time (a [[2 Cycles and Tempo|cycle]]
or part of one) and it returns the **events** happening in that span. Each event is called a
**hap** — it has a value (a note, a sound name, a number) and a time fraction (when it
starts/ends within the cycle).

Because patterns are pure functions, they can be **queried** for any cycle, sliced,
shifted, stretched, and combined — all without "rendering" anything. That's why
`.fast()`, `.rev()`, `.every()` etc. just work on *anything*.

## Everything is a pattern

The crucial part: **notes, sounds, gains, filter cutoffs, pan positions — all patterns.**

```js
note("c e g")        // a pattern of notes
s("bd sd")           // a pattern of sound names
gain("1 0.5")        // a pattern of gains
"0.2 0.8"            // even a bare string is a pattern of numbers
```

When you write `s("bd sd").gain("1 0.5")`, you're **combining two patterns**: the sound
pattern and the gain pattern. They align by time. This is why a single value and a whole
sequence are interchangeable — `lpf(800)` and `lpf("400 800 1600")` are both just patterns
fed to the same control.

> [!tip] The mental unlock
> Anywhere you can put a number, you can put a *pattern* of numbers — or a
> [[10 Signals and Modulation|signal]]. `lpf(800)`, `lpf("400 800")`, and
> `lpf(sine.range(400,800))` are all valid. There's no special "automation mode."

## Controls combine, they don't overwrite

Chaining controls **merges** them onto the same events:

```js
note("c e g").s("sawtooth").lpf(800).room(.3)
// one stream of events, each carrying: note + sound + cutoff + reverb
```

Think of it as building up a "message" per event (note 60, sound sawtooth, cutoff 800,
room 0.3) that the audio engine then renders. This is different from Ableton, where a note
and a device setting live in different places. Here they travel together.

## Functions vs methods (two ways to write the same thing)

Most Strudel words work **both** as a standalone function and as a chained method:

```js
fast(2, s("bd sd"))     // function form
s("bd sd").fast(2)      // method form (usually nicer to read)
rev(s("a b c"))         // function form
s("a b c").rev()        // method form
```

Use whichever reads better. Long chains usually read best as methods, left to right, like
a signal-flow through a device chain.

## Related

- [[4 Mini-Notation]] — how the `"..."` strings become patterns of events.
- [[10 Signals and Modulation]] — continuous patterns (no discrete events) used as automation.
- [[11 Transforming Patterns]] — the functions that reshape patterns.
