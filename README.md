# Little Learners Land — Play • Learn • Explore
A single-player, touch-friendly kindergarten platform built by extending Shape Land with a learning hub and English letter adventures. React, Vite, JavaScript, CSS, and local SVG illustrations; no new dependencies, server, or accounts.

## Run
Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

## Classroom use
Open Teacher Settings with one click in the header. Select the shapes taught this week (at least one), choose Easy or Medium, adjust target sizing, and enable Reach Mode to lower the play zone. Preferences are saved on this device. Shape selection and difficulty apply on the next game; Apply & restart applies them immediately. Reach, sizing, and audio update immediately.

- Shape Detective: ten rounds, every selected shape appears as a target before repetition. Easy displays up to four answers, Medium up to eight. Labels remain visible in Detective.
- Hungry Monsters: four shape-bodied monsters per board, or fewer if fewer shapes are selected. Drag food into a monster, or tap food and then the monster. Wrong food produces a brief grumpy eyebrow wiggle with encouraging feedback. All selected shapes appear across boards.
- Shape Shadows: five silhouettes per board, or fewer if fewer shapes are selected. Match every shape by dragging or tapping a shape then its silhouette. Correct matches speak the shape name. All selected shapes appear across boards.
- Correct responses celebrate and advance only after completion; wrong answers always allow another attempt. No timer, scoring penalties, or multitouch requirement.
- Teacher Settings is outside the central child play zone and clearly marked for adults. It is intentionally a single-click panel, not password protected or a security boundary.
- Voice uses available browser English SpeechSynthesis voices. Availability and quality depend on the device. Replay Voice replays instructions. Narration and synthesized musical sounds can be muted separately. Visual gameplay works without speech support.
- Designed for landscape 16:9 smartboards; use browser full screen for maximum space. Gameplay does not require scrolling at standard classroom sizes (1280×720, 1920×1080). Settings can scroll on smaller displays. Phone portrait also supports wrapping controls; extremely small/short windows may need a larger display.
- Google Fonts are optional enhancements; local fallback fonts keep the game functional offline.

## GitHub Pages
Push these files to a GitHub repository on the `main` branch. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The included workflow tests, builds, and publishes `dist`. Vite retains the existing `base: '/shape-land/'` for this repository’s Pages path. No client routing configuration is needed. Publishing requires a repository and GitHub Pages enabled; this project has not been published automatically.

## Code
`src/shapes.js` is the shared curriculum, `Shape.jsx` draws reusable SVG shapes and monsters, `rounds.js` builds coverage-preserving rounds, and `audio.js` handles browser narration and music. `main.jsx` contains the menu, teacher panel, and shared single-player game flow. The original shape games retain their original components, styles, rounds, audio, and settings.

## Welcome screen and responsive layouts
The animated opening screen credits **Ms. Leena** in English, with a tap-to-enter button and reduced-motion support. The menu keeps the creator credit visible in its footer, and larger screens also show it in the header.

Game grids measure the available viewport with ResizeObserver, choosing a cell size and column count that fit all answers and destinations. Short landscape phones use adjacent matching panels. Touch targets scale to the device (smaller on compact phones, larger on classroom boards). The menu may scroll on phones; gameplay keeps the board visible without scrolling at tested sizes.

For manual layout QA, run the dev server and open `/shape-land/tests/responsive-check.html`. Its iframe simulates seven viewports from 320×568 to 1920×1080. Enter a game, choose a viewport, and press Check layout to inspect overflow, shape overlap, and controls outside the viewport. This helper is not included in the production build.


## English letter adventures
The splash now opens the main Learning Hub. Shapes opens the existing shape menu; English Letters opens eight adventures. Numbers opens four interactive counting adventures; Colors remains a disabled Coming Soon card. Arabic Letters opens a separate RTL world with four Arabic activities; see [ARABIC_NOTES.md](ARABIC_NOTES.md).

- **Letter Detective:** 10 rounds; Both modes use uppercase letters: four answers on Easy, six on Medium. Instructions simply say “Find the letter A!” without case terminology.
- **Big & Small Matching:** connect 3–4 capital/small pairs with live SVG lines, or tap both endpoints. Fewer selected letters produce fewer valid pairs.
- **Letter & Picture Sorting:** drag matching objects into a letter house, or tap an object then the house. Six local SVG objects appear in each round. Familiar hard consonants and short vowels avoid silent-letter words. X is an explicit **ends with X** question using fox, rather than presenting a misleading initial sound. The other 25 letters use initial sounds. Narration speaks letter names and object words; it does not synthesize isolated phonemes.

Teacher Settings selects A–Z targets (Select All / Clear All), difficulty, sound, and Reach Mode. An empty selection disables starting/restarting. Selected letters control targets; distractors can come from the full alphabet. Targets come from the selected curriculum. Session lengths vary by game; see INTERACTIVE_NOTES.md for current rounds and tracing availability. Letter selection and difficulty apply on start/restart. Sound and Reach Mode apply immediately. Replay and Restart are available during games.

English preferences use `little-learners-letters`; existing shape preferences remain in `shape-land-settings`. Preferences are saved locally when storage is available. Speech gracefully falls back to written instructions; English voices and audible pronunciation depend on the browser/device. Physical touch calibration and actual smartboard audio should be checked in the classroom. Collector, Matching, and Sorting support real pointer dragging plus tap/keyboard alternatives. Tracing requires following real stroke paths. All activities use one pointer, with no multitouch.

### New code
- `src/hub/Platform.jsx`: platform navigation, learning hub, English selection, and the return-to-hub wrapper for Shapes.
- `src/hub/platform.css`: scoped new layouts, reach mode, responsive cards, rewards, and reduced-motion support.
- `src/letters/LetterGame.jsx`: preserved Detective flow and legacy recognition helpers; redesigned pair/picture routes use `src/letters/interactive/`.
- `src/letters/Illustration.jsx`: consistent local vector illustrations for every picture word.
- `src/letters/data/letters.js`: curriculum, preference validation, and randomized ten-round sessions.
- `src/letters/narration.js`: guarded English SpeechSynthesis narration and replay.
- `src/settings/LetterSettings.jsx`: independent English settings dialog.
- `src/letters/data/letters.test.js`, `src/letters/narration.test.js`: round, curriculum, settings, and audio-fallback checks.
- `tests/platform-check.html`: interactive viewport and overflow QA helper; open `http://localhost:5173/shape-land/tests/platform-check.html` while Vite runs.

### Existing files changed
`src/main.jsx` mounts the platform shell around the original app and moves splash ownership into that shell. Its shape game and settings functions are unchanged. `src/Splash.jsx` changes branding text only; animation and layout CSS are unchanged. `index.html` updates browser title/description. `package.json` runs the new tests alongside all existing tests. This README documents the extension. Vite, the deployment workflow, dependencies, and original shape source/style/test files are unchanged.

### Validation
`npm test` passes 88 tests, including every original Shape test and added pointer geometry, curriculum, motion, and tracing validation tests. `npm run build` passes. Browser suites complete Collector, Matching, Picture Sorting, all five supported tracing letters, Balloons, Rocket, and Eggs; they also check Detective and all Shape games. Wrong/outside/cancelled pointer gestures, restart, replay, single-letter selection, Home, and five responsive viewports are covered. Native pointer drags also verified collection, matching, and all three A strokes in a scaled preview. Physical smartboard/iPad hardware checks remain necessary. Nothing was pushed or deployed.

## English arcade expansion
English Letters now offers **Flying Alphabet Balloons**, **Rocket to the Moon**, **Mystery Letter Eggs**, **Letter Collector**, **Magic Letter Tracing**, the redesigned **Big & Small Matching** and **Letter & Picture Sorting**, and preserved **Letter Detective**. Alphabet Train has been removed. They use independent arcade audio controls, original SVG scenes, and separate game components. See [INTERACTIVE_NOTES.md](INTERACTIVE_NOTES.md) for current interactions, files, curriculum restrictions, audio status, validation, and device-testing limitations.

Tracing currently implements A, B, C, S, and T with real ordered stroke coverage; unsupported letters are visibly unavailable only in Tracing. Collector supports a locally saved capital/small/mixed-case preference. Existing shape settings remain untouched.


## Arabic Letters and responsive navigation

Arabic Letters supports all 28 Arabic letters with complete SVG word examples: صائد الحروف، وصّل الحرف بالصورة، صندوق الحروف السحري، وأبواب المفاجآت. Independent Arabic teacher preferences, Reach Mode, real pointer dragging/connection lines and tap alternatives are included. Arabic is temporarily fully silent: no speech, effects or cheering, and no audio controls. Written questions and visual celebrations remain. The category adapter is ready for a future reviewed recording integration. Tajawal fonts and their OFL license are local.

The category directory keeps only its top creator credit and a three-column grid of square cards (Shapes, English, Numbers, Colors, Arabic). Inside each section, the shared navigation bar provides its two-tone title, top creator credit, Home, Games inside a game, and Teacher Settings. Section game menus share the pastel Shapes card design and three desktop columns, with readable mobile layouts. The original Shapes game bodies remain unchanged. Menus scroll normally while gameplay fits responsive viewports. New development checks: `/shape-land/tests/arabic-check.html` and `/shape-land/tests/site-responsive-check.html`.

Matching in Arabic and English now guarantees that no partner starts in its source row (except a valid single-pair activity). `tests/menu-refresh-check.html` verifies the updated menus and full matching sessions.


## Numbers arcade

Numbers is active with Feed the Hungry Dino, Build the Number Tower, Magic Number Garden and Number Fishing Adventure. It shares the existing menu/header design and has independent teacher settings for 1–5, 1–10, optional zero, difficulty, speech/effects/celebrations, reach and motion. All four activities support meaningful pointer interactions and tap alternatives. See [NUMBERS_NOTES.md](NUMBERS_NOTES.md) for implementation, exact zero/sequence behavior, audio limits, file inventory and verification. Development browser checks: `/shape-land/tests/numbers-check.html` and `/shape-land/tests/numbers-layout-check.html`.

## Colors arcade

Colors is active with Magic Color Lab, Rainbow Factory, Paint the Magic World, Color Rescue Car Wash and Rainbow Bridge. It supports 11 basic colors, independent teacher preferences, real pointer interactions and tap alternatives. See [COLORS_NOTES.md](COLORS_NOTES.md) for recipes, scrub coverage, integration, audio and device limits. Run `/shape-land/tests/colors-check.html` for full browser play-throughs, and `/shape-land/tests/colors-layout-check.html` for mapped gestures at seven viewports. `npm test` now includes 123 tests.

## Concept World

The sixth category contains The Three Bears' House, Grow the Magic Garden, Super Sorting Factory, My Family House and Same or Different? It shares the existing menus/navigation and adds independent general Easy/Medium teacher preferences. Real interactions include matching belongings, a size slider, sustained/tap watering, four classification rules, opening windows, portrait placement and drawing matching lines. Arabic remains silent. See [CONCEPTS_NOTES.md](CONCEPTS_NOTES.md) for mechanics, file inventory, audio, responsive checks and device limits. Browser suites: `/shape-land/tests/concepts-check.html` and `/shape-land/tests/concepts-layout-check.html`. `npm test` includes 123 tests.

## Final UI refinement

Shared square menu cards, a single universal top creator credit, consistent navigation, and organized teacher dialogs are documented in [DESIGN_POLISH_NOTES.md](DESIGN_POLISH_NOTES.md). Gameplay and audio behavior remain intact, including silent Arabic. The cross-category browser audit is available at `/shape-land/tests/design-polish-check.html`.

## Arabic learning expansion

The hub now groups five English/general categories and three Arabic categories. Arabic Shapes adds three games and twelve shapes; Arabic Colors reuses all five Colors games with eighteen Arabic-only color choices. All Arabic categories use optional non-linguistic reward effects, with instructional narration disabled. See [Arabic world notes](ARABIC_WORLD_NOTES.md) and [browser proof](previews/arabic-worlds/index.html).
