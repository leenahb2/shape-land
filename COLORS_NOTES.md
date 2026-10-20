# Colors arcade

Colors activates the existing category card and shares the established AppBar, menu cards, typography, creator credit, settings overlay and celebration component. Everything new is under `src/colors/`; its CSS is scoped with `co-` classes. No dependencies, deployment configuration or Vite base changes.

## Games and teaching model

- **Magic Color Lab:** drag a bottle into the beaker or select it and tap the beaker. Two distinct ingredient bottles produce deterministic classroom mixtures: red + yellow = orange; blue + yellow = green; red + blue = purple; red + white = pink; black + white = gray. Order does not matter. These are simplified recipes, not a prediction of actual pigments. Unsupported selected colors never become Lab targets. Ingredient bottles are explicitly provided separately from teacher-selected learning targets. Wrong mixtures remain visible until reset. Pour locks and used-bottle checks prevent duplicate touch events.
- **Rainbow Factory:** real, bounded conveyor motion with stable lanes and no disappearing objects. Easy uses up to three enabled colors; Medium up to five. Drag or tap a toy and matching bin. Motion pauses during interaction, settings and rewards. Wrong drops animate back. Three complete sets produce prizes.
- **Paint the Magic World:** house, butterfly and castle SVGs each contain four differentiated regions. The chosen color and requested region must both match. Pointer coordinates use the SVG screen matrix, so brush gestures remain accurate after resize. A brush gesture commits on release; cancellation discards it. Tap-fill and keyboard activation are available. Reset Scene clears that scene. Finished scenes animate.
- **Color Rescue Car Wash:** car, van and truck use an SVG dirt mask. Pointer strokes reveal mud along the sponge path; cancelled strokes are discarded. Coverage samples are distributed across six zones (54 samples). Completion requires at least 86% coverage, at least six samples per zone and 280 SVG units of valid movement. Stationary points and jumps over 90 SVG units do not count. The accessibility mode requires two taps in each of six large highlighted zones. Painting unlocks only after washing, then validates the requested color before the vehicle drives away.
- **Rainbow Bridge:** six-band Red, Orange, Yellow, Green, Blue, Purple rainbow, without mixing seven-band terminology. Drag or tap pieces into a large lower construction place. A character crosses the finished bridge. If the teacher has disabled any canonical rainbow color, the game explicitly becomes enabled-colors-only bridge practice. It never silently enables missing colors. A one-color selection still gives three distinct pieces.

## Color preferences

11 basic named colors are available. Light Blue, Dark Blue, Light Green, Dark Green, Gold, Silver and Beige have been removed from every game and teacher selection. Old saved selections filter these colors; a retired-only selection recovers the general default, while an intentional empty selection remains empty. The default ten-color preset is Red, Blue, Yellow, Green, Orange, Pink, Purple, White, Black, Brown. Colors has its own `little-learners-colors` storage key, selection controls, difficulty, voice, effects, cheering, reach and pause-motion settings. Empty selections remain intentional and disable starting games with guidance. Restart creates a new round deck using current preferences. Other categories' settings are untouched.

## Files and integration

New: `src/colors/colorData.js`, `ColorArt.jsx`, `ColorsAudio.js`, `useColorsSession.js`, `useColorDrag.js`, `useColorMotion.js`, `ColorPalette.jsx`, `ColorsSettings.jsx`, `ColorsHome.jsx`, `colors.css`, five `games/*.jsx`, and `colors.test.js`. Browser checks: `tests/colors-check.html` and `tests/colors-layout-check.html`.

Existing changes: `src/hub/Platform.jsx` imports/routes Colors and enables its existing card; `package.json` includes the new unit suite. The existing Arabic/Numbers browser activation assertions now expect all five categories enabled; their gameplay checks remain intact. README documents the addition.

## Interaction, responsiveness and audio

Pointer capture supports one active pointer, cancellation, forgiving drop geometry, tap alternatives and a drag ghost. All gameplay scenes use viewport-sized flex layouts, safe-area padding, preserved SVG aspect ratios, middle/lower construction controls and portrait/short-landscape arrangements. Menus scroll normally. Reach Mode limits scene height; device reduced-motion and teacher pause settings stop ambient movement. No global stylesheet changes.

Audio extends the existing platform audio utility with independently controlled English speech, synthetic pouring/water/machine/sparkle effects and separated reward cues. Speech synthesis depends on installed English voices and browser permissions. No recorded children cheering is bundled or claimed; the existing celebration manifest/fallback is used. Replay Instruction remains available when speech is enabled. No automatic playback before a user gesture.

## Verification and practical limits

`npm test` includes 108 tests; `npm run build` verifies the production bundle. The development browser harness passed full sessions in all five games and checks wrong actions, cancellation, subsets, restart and geometry at 1920x1080, 1366x768, 1024x768, 820x1180, 390x844, 844x390 and 320x568. The separate resize suite passed 35 mapped pointer interactions (one in every game at each of the seven sizes), plus three-column desktop menu checks. The existing whole-site responsive suite also passed. Native mouse drags were additionally verified for pouring, bridge construction, SVG brush painting and two-zone-row scrubbing. Source preservation is verified against SHA-256 hashes captured before Colors implementation.

Browser testing uses the local Chromium-based in-app browser. Actual classroom smartboard touch hardware and Safari/iPad audio policies still need device checks. Extremely short screens necessarily use smaller controls than a smartboard. Mixing deliberately supports five defined two-ingredient targets, not every color. Passing browser reports are saved in `previews/colors-browser-checks.txt`; a live painting screenshot is in `previews/colors-paint-world.png`. This task is local only; nothing was pushed or deployed.
