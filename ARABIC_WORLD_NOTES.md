# Arabic learning world expansion

## Delivered locally
The existing hub now contains two matching groups: **English & Learning** (five original categories) and **العالم العربي** (الحروف العربية، الأشكال، الألوان). The eight square category cards retain existing illustrations, shadows, grids, navigation and the single global **Made with love by Ms. Leena** credit.

Arabic Letters retains all four existing games. New Arabic Shapes adds **صائد الأشكال، أطعم وحش الأشكال، طابق الظل**, with twelve shapes including hexagon and crescent. New Arabic Colors adds **مختبر الألوان السحري، مصنع الألوان، لوّن العالم السحري، مغسلة الألوان، جسر قوس قزح**, using the actual existing five game components.

Arabic Colors supports all eighteen requested colors. The seven more advanced colors exist in the Arabic palette only; English Colors still has its original eleven colors and ten default choices. **ألوان البداية** selects the familiar ten-color classroom default without adding grade labels. Only the five existing supported mixing recipes are used; unsupported mixing targets stay available in sorting, painting, washing and bridge practice, with clear teacher guidance.

## Reuse and isolation
- `LearningGroups.jsx` supplies the grouped hub cards.
- `GamePlayArea` retains the measured Shapes smartboard envelope and Reach behavior from the previous layout task. All eight new games use it.
- Arabic Shapes shares the original shape SVGs, `makeDeck`, `makeBoards`, `usePlayLayout`, and existing one-pointer drag handling. Its small Arabic session shell uses the original ten-round detective and four/five-item matching-board progression. Extra shapes have isolated SVG geometry. The original English Shapes Game function remains byte-identical.
- Colors components now read a language context with an identity translator by default. The Arabic provider supplies visible text, accessible labels and dynamic question translations. Selection/scoring, SVG painting coordinates, scrubbing coverage, conveyor motion and bridge construction remain shared.
- `paletteColor` resolves extra Arabic colors for rendering; the exported English `color()` lookup and `COLORS` dataset retain their old contract. Arabic round generation explicitly opts into the expanded palette.
- New Arabic worlds load on demand; the main production JS bundle remains below the previous Vite 500kB warning threshold. Existing Tajawal fonts load through the shared CSS.

## Arabic audio policy
Live Arabic categories use **ArabicRewardAudio**. It never constructs or speaks utterances, never fetches speech/celebration recordings, and never plays voice clips. `say` and recording loading are inert. Instructions only cancel queued work; they do not speak.

Correct answers use short, moderate-volume musical chimes and optional synthesized applause/melodies. Wrong answers use a soft two-note cue. A new cue cancels previous timers and sources; settings, exit and disposal stop playback. Two independent controls select effects and celebrations. There is no narration toggle or replay button.

Arabic Letters stores new `rewardEffects` and `rewardCelebrations` settings, preserving the old forced-off narration fields and its learning selections. New worlds use independent keys `little-learners-arabic-shapes` and `little-learners-arabic-colors`. English audio controllers are unchanged. The legacy silent ArabicAudio controller remains for compatibility tests; live categories explicitly use the reward-only controller.

## Verification
- Automated tests: **131 passed**; existing tests retained, plus Arabic dataset, isolated preferences, all eighteen colors in both difficulties, grammar/localization, no-speech, muting, cancellation and reward-controller tests.
- Production build passes; no Vite, base path, or GitHub Pages configuration changes.
- Original Shapes Game byte comparison passes. Existing Shapes datasets, SVG component, round helpers, and responsive CSS are unchanged by this expansion.
- `arabic-shapes-check.html`: all three complete sessions, ten detective rounds, all twelve shapes through matching/feeding boards, wrong/outside/cancel checks, drag and tap, reward sounds, mute, and no speech.
- `arabic-colors-check.html`: full five-game sessions; actual pouring/mixing, moving sorting, all painting regions, real scrub coverage and tap alternative, ordered bridge construction. Arabic-only visible gameplay text and no replay controls checked.
- Original English Colors full interaction suite passed after localization integration.
- Focused Arabic Colors audio integration passed: wrong and correct mixtures emit musical effects, both switches mute playback, queued effects stop, and neither speech nor clips start.
- Arabic Letters full sessions passed with rewards enabled and separately with rewards muted. Both suites forbid speech and clips. The old silent-mode fixture now explicitly mutes the new reward controls, retaining its zero-playback check.
- Eight-category layout audit passed: all **37 games**, menus and settings at 1920×1080, 1366×768, 1024×768, 820×1180, 844×390, 390×844, and 320×568. It checks squares, nav/dialog bounds, no horizontal overflow/gameplay page scrolling, RTL, credit visibility and saved selections when opening settings.
- Existing English arcade and original three Shapes interaction/reward/navigation checks passed. Numbers, English letter models and Concept World unit tests pass; their gameplay engines are unchanged by this expansion.

Browser reports and screenshots are saved under `previews/arabic-worlds/`.

## Main files changed
New: `src/arabic/ArabicRewardAudio.js`, `src/arabic/worlds/` (world shells, shared settings, twelve-shape vocabulary, SVG extras and tests), `src/hub/LearningGroups.jsx`, `src/colors/ColorLocale.jsx`, `colorTranslation.js`, `arabicPalette.js`, `paletteColor.js`, and focused browser checks.
Existing: `src/hub/Platform.jsx`, `platform.css`, `src/main.jsx` (shared Arabic font/style import), Arabic Letters shell/settings/model, Colors shell/session/art/palette and five game rendering files, `colorData.js`, and the npm test script. Existing browser fixtures now expect eight hub cards; no interaction/geometry assertions were removed. A localized copy of the full Colors suite adds Arabic checks.

## Limits
Tests used browser viewport simulations and instrumented Web Audio for sound assertions. No physical smartboard, iPad or classroom speaker test was performed. Mixing stays the established simplified five-recipe classroom model. The previously documented measured board envelope uses the default Shapes size; it does not track later changes to the English Shapes-only size slider.

No GitHub push or deployment was performed.
