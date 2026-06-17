---
tags: [strudel, sound, mixing]
---

# Mixing and Levels

Balancing parts, dynamics, and the routing model. Lighter than a full DAW mixer, but the
essentials are here.

## Gain and velocity

- `gain` — the main level control. It's **exponential** (perceptual), so `.gain(.5)` is a
  clear step down, not −6 dB exactly. As a per-step pattern it becomes **accents/velocity**:
  ```js
  s("hh*8").gain("1 .5 .7 .5")     // accent the downbeats
  ```
- `velocity` (`vel`) — multiplied with gain; handy to keep an "accent" layer separate from
  an overall level.
- `postgain` — applied **after** effects. Use it to rein in something that got loud through
  reverb/distortion without changing how it drives those effects.

> [!tip] Gentle gain staging
> Start parts low (`.gain(.3–.6)`) and bring the kick up rather than everything else down.
> Stacked layers add up fast and clip. If it sounds crunchy/distorted, lower gains or add
> a `compressor`.

## Dynamics

- `compressor("threshold:ratio:knee:attack:release")` — glue/tame a bus or a busy layer.
- **Sidechain** (the pumping pad-under-kick): `duck` / `duckorbit` ducks one
  [[#orbits|orbit]] whenever another triggers, shaped by `duckattack` and `duckdepth`. If
  orbits aren't available (see caveat), fake it with a gain LFO synced to the kick:
  ```js
  .gain(saw.range(.3, 1))   // crude pump each cycle
  ```

## Orbits (sends / shared effect buses)

`orbit(n)` (alias `o` in some setups) groups patterns into a shared effects context — like
routing tracks to the same return/bus so they share one reverb, or so `duck` can target
them. Orbit 0 is the default (master).

> [!warning] Local caveat in this sandbox
> In *this* embed, audio on non-zero orbits (`.orbit(2)`, `.o(3)`, …) tends to be **silent**
> — the extra buses don't seem wired to the output here. If a part goes quiet for no reason,
> check for an `orbit`/`o` call and remove it. Use per-pattern effects and the block
> mute/solo instead. (This is why `switchangel-nightdrive.js` had its `.o()` calls removed —
> see [[15 This Sandbox]].)

## Panning & width

- `pan(0..1)` — place in the stereo field; pattern or signal it for movement.
- `jux(fn)` / `juxBy(w, fn)` — width via a transformed right channel ([[9 Effects#stereo]]).

## A practical mix order

1. Get the **kick** at a confident level (`.gain(.9–1)`).
2. Bring in drums/percussion under it, hats quieter (`.gain(.3–.6)`).
3. Bass sits with the kick — carve space with `hpf` on pads or `lpf` on the bass.
4. Pads/keys lower still, with `room` to push them back.
5. Lead on top, present but not loud; a little `delay`/`room` for depth.
6. `postgain` on anything that swells past the others.

## Related

- [[9 Effects]] — reverb/delay/compression details.
- [[10 Signals and Modulation]] — gain LFOs, humanized levels.
- [[12 Structure and Arrangement]] — `mask` to bring levels in over time.
