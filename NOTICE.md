# Notices

## Marble Roulette

This project is based on [Marble Roulette](https://github.com/lazygyu/roulette).

- Original source copyright: Copyright (c) 2022 LazyGyu
- License: MIT License
- Project names and trademarks: `Marble Roulette` and `마블 룰렛` belong to LazyGyu and are mentioned here only to identify the upstream project.
- Modifications: Copyright (c) 2026 Gyeon-ai, provided under the MIT License unless otherwise noted below.

## Third-party components

- [box2d-wasm](https://github.com/Birch-san/box2d-wasm) — Zlib License. The package also contains `wasm-feature-detect` components under Apache License 2.0.
- [Font Awesome Free](https://fontawesome.com/license/free) — SVG icons under CC BY 4.0. The attribution comments embedded in the SVG files are preserved.

## Images

Marbles use Hinqoc's SOOP subscription personacons (12 months), stored in `assets/personacons/` (`src/hinqocBall.ts`). They are used with permission for this pinball site only, are not covered by the MIT license, and must not be redistributed. The repository keeps them only as encrypted `.png.enc` files; the site build decrypts them. If a personacon cannot be loaded, a pixel-art elephant drawn by code (`src/hinqocElephant11.ts`, copied from the design prototype) is used instead. `assets/hinqoc-pinball-icon-*.png` were rendered from `src/hinqocElephant.ts`.
The elephant drawings were made for this project; reference pictures supplied by the user were used only for features and are not included.
