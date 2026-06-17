---
tags: [strudel, music, harmony]
---

# Notes, Scales and Harmony

Your theory knowledge is a huge advantage here. Strudel gives you two ways to specify
pitch — **absolute** and **relative-to-a-scale** — and the second one is where it gets
powerful.

## Absolute pitch: `note()`

```js
note("c e g")          // note names
note("c4 e4 g4")       // with octave (c3 is a common default if omitted)
note("60 64 67")       // MIDI numbers (60 = middle C)
note("c eb g bb")      // flats with b, sharps with #: "f# a c#"
```

Use `note()` when you want exact pitches (a known bassline, a specific chord voicing).

## Relative pitch: `n()` + `.scale()`

`n()` gives **scale degrees** (0-indexed), and `.scale()` says which scale to map them into:

```js
n("0 2 4 6 4 2").scale("C:major")    // 1st 3rd 5th 7th 5th 3rd of C major
n("0 1 2 3 4 5 6 7").scale("C:minor")// walk up C minor
```

- Scale name format: **`root:type`**, no spaces — `"C:minor"`, `"D:dorian"`,
  `"F#:lydian"`. Root **defaults to octave 3** if you don't write one (`"C4:minor"` forces it).
- Degrees are zero-indexed: `0` = root, `2` = third, `4` = fifth, `7` = octave.
- **Negative** degrees wrap below the root: `-1`, `-3` reach down into the previous octave.
- You can still bend outside the scale with `#`/`b` on a degree.

> [!important] Why this is the killer feature
> Because the notes are *relative to the scale*, you can change the key/mode in one place
> and the whole line follows — like an Ableton Scale device, but baked into the notes. And
> you can **pattern the scale itself**:
> ```js
> n("0 2 4 6").scale("<C:minor F:minor Ab:major Eb:major>")
> ```
> Now the same degree pattern outlines a chord progression. This is the heart of melodic
> writing in Strudel.

## Common scale types

`major`, `minor` (natural), `harmonicMinor`, `melodicMinor`, the modes (`dorian`,
`phrygian`, `lydian`, `mixolydian`, `locrian`), `majPent`, `minPent` (pentatonics),
`whole`, `chromatic`, plus many exotic ones (`ritusen`, `iwato`, …). Pentatonics are your
"can't hit a wrong note" friend for quick leads.

## Transposition

- `.transpose(7)` — shift by **semitones** (chromatic): up a fifth. Pattern it:
  `.transpose("<0 0 7 5>")` for key changes.
- `.scaleTranspose(2)` — shift by **scale steps**, staying in the scale (a "diatonic"
  transpose — a third up *within* the key).
- `.add(note(12))` — another way to go up an octave (adds to the note value).

```js
n("0 2 4").scale("C:minor").scaleTranspose("<0 2 4 -1>")  // diatonic sequence
```

## Octaves

- Write them: `note("c2 c3 c4")`, `n("0 7 14")` (7 = octave in a 7-note scale).
- Shift them: `.add(note(12))` (up 1), `.add(note(-12))` (down 1). Some libraries also add
  an `.octave()` control.

## Velocity / dynamics

Per-note dynamics come from `.gain()` / `.velocity()` patterns — see
[[13 Mixing and Levels]]: `note("c e g").gain("1 .6 .8")`.

## Related

- [[7 Chords and Voicings]] — stacking these into chords and arpeggios.
- [[4 Mini-Notation]] — `<>` for chord changes, `,` for stacked notes.
- [[10 Signals and Modulation]] — `irand`/`perlin` into `n()` for generative melodies.
- [[14 Cookbook#chord-progression]]
