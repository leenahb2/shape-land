# Arabic arcade and shared responsive navigation

Four playable activities live in `src/arabic/ArabicWorld.jsx`:

- **صائد الحروف**: five rounds, tap all 3/4 repeated target tokens among 6/10 choices. Wrong answers wobble and do not score.
- **وصّل الحرف بالصورة**: four sets of up to 3/4 selected letters and shuffled SVG pictures. Pointer capture/live SVG lines, persistent correct lines, retracting wrong lines, and tap-letter/tap-picture alternative. One selected letter creates one valid pair. ResizeObserver measures actual scaled card centers.
- **صندوق الحروف السحري**: five rounds, 8/12 draggable tokens, 3/4 targets. Real pointer/drop rectangle checks, cancellation, duplicate protection, tap alternative, opening lid and SVG surprise.
- **أبواب المفاجآت**: eight rounds of 3/4 picture doors, wrong-door wobble, hinged CSS opening, eight rotating illustrated surprises, confetti and Arabic word feedback.

`model.js` contains all 28 letters, Arabic names, words, availability, normalization, difficulty-based similar/distinct distractors and pure round generators. Alef variants normalize to أ; haa displays as ه. Every letter has a complete illustrated example; no letters are excluded. `ArabicPicture.jsx` contains 15 new SVG illustrations and reuses existing English artwork as graphics only, with Arabic accessible names. Existing illustration files are unchanged.

`ArabicSettings.jsx` stores independent preferences under `little-learners-arabic`, including empty selection, level, narration/effects/celebrations, and Reach Mode. Letter selection applies at start/restart; sound and reach changes apply immediately. Focus trapping, Escape, inert background, disabled empty starts, replay, restart and Home are supported.

`ArabicAudio.js` is an intentionally silent category adapter. It never creates speech utterances, audio contexts or clips, fetches recordings, or schedules playback. It retains the shared cleanup path to cancel queued speech and stop its own existing sources, timers and recordings. Legacy narration/effects/celebration preferences normalize to false. All replay/audio settings controls and the old missing-voice notice are removed; questions, feedback, pictures and visual celebrations remain. The adapter is the future integration point for reviewed recorded Arabic audio, currently disabled. Shared English, Shapes, Numbers and Colors audio implementations are unchanged.

`arabic.css` scopes RTL, responsive layout and game animation to the Arabic section. Tajawal Regular/Bold are bundled locally under `public/fonts/tajawal/`, with their SIL OFL license; downloaded from the official Google Fonts repository. No runtime font network request is required. Copyright is localized to «صُنع بكل حب بواسطة مس لينا» in Arabic.

The user's shared-site request is implemented through `src/shared/AppBar.jsx` / `appbar.css` (plus `HubSettings.jsx` for choosing a section’s settings from the hub): top creator credit on every section and splash, Home, Games inside games, Teacher Settings, consistent sizing, small-screen controls. ShapeApp receives a hub callback and its header now uses AppBar; a ResizeObserver writes the measured header height so existing game geometry adapts. Original Shapes Settings/Game function bodies remain unchanged. English game changes are limited to replacing their navigation markup with AppBar. Hub adds Arabic as the fifth card; Numbers and Colors remain disabled Coming Soon. Vite base, dependencies and deployment workflow are unchanged.

## Verification

- `npm test`: 73 tests pass (59 existing + 14 Arabic). Arabic cases cover all 28 single-letter curricula in both levels across all four activities, normalization, SVG availability/word initials, unique token scoring, empty preferences, multi-pair matching, scaled coordinates, Arabic-only voice selection and missing audio fallback.
- `tests/arabic-check.html`: completed all 5 hunt, 5 box, 4 matching and 8 door rounds through the real React UI; wrong/outside/cancelled gestures, drag/tap alternatives, visible/permanent SVG lines, line remeasurement, box/door reveals, teacher empty selection, single ه pair, restart and Home. Six viewport checks: 1920×1080, 1024×768, 768×1024, 844×390, 390×844, 320×568. No gameplay scrolling, clipping or off-screen controls; all measured Arabic controls at least 39px in the shortest landscape.
- Native browser drags independently verified Arabic م into the box and أ → أسد connection.
- `tests/site-responsive-check.html`: all menus and all Shapes/English game entry screens pass seven viewport bounds/top-credit checks (the six above plus laptop 1366×768). Menus may scroll vertically; gameplay fits the viewport.
- `tests/interactive-check.html`: retained English Collector/Matching/Picture Sorting/Tracing complete-session, cancellation, resize and balloon-motion checks pass with the shared header.
- Existing `tests/arcade-check.html` passed complete balloons/rocket/eggs sessions plus Letter Detective and original Shapes navigation/feedback; its former floating-hub-button selector now targets the unified Home button.
- `tests/hub-settings-check.html` checks all three section settings routes, modal bounds at phone/landscape/smartboard sizes, closing and Home.

Run `npm run dev` and open the test harnesses under `/shape-land/tests/` to repeat browser integration checks. Harnesses are development files, not production entry points. No automatic push or deployment was performed.


## Menu refinement

The category directory now has no app bar: copyright remains above the two-tone welcome. Its five uniquely colored square cards use three desktop columns, with Numbers and Colors before Arabic. All three section game menus use `src/shared/menus.css`, the same illustrated pastel card rhythm as Shapes, and three desktop columns; columns reduce on narrow displays to preserve readable controls. Internal app bars retain each page title, with two-tone lettering and matching buttons. The unused hub settings chooser is no longer routed; Teacher Settings remains inside each section. `tests/hub-settings-check.html` now checks those section settings routes.

`src/shared/mixPartners.js` generates a derangement for both English and Arabic matching. Every partner starts on a different row whenever two or more pairs are present; the one-pair case remains valid. The added regression test verifies both real round generators and deterministic shuffle fallback. `npm test` now passes 74 tests.

`tests/menu-refresh-check.html` checks directory order, absence of directory app bar, five different colors, square cards, three desktop columns, seven viewport sizes, content bounds/no text overlap, and four complete matching sets in each language using drag and tap. The whole-site responsive suite also passed after the menu/header refresh. Production build passes.


Current maintenance verification: 108 automated tests pass, including forced legacy audio preferences, no playback API calls, and cleanup of queued sources/recordings. `tests/arabic-check.html` instruments speech, Audio and AudioContext during complete sessions in every Arabic game.

Maintenance file inventory: `ArabicAudio.js` disables all playback while retaining cleanup; `model.js` forces old audio preferences off; `ArabicWorld.jsx` removes the replay button and voice detection notice; `ArabicSettings.jsx` removes all audio controls. Arabic tests and the recording README were updated for the silent contract. Outside Arabic, `src/colors/colorData.js`, `ColorsSettings.jsx` and `ColorsHome.jsx` remove the seven retired learning colors and use a general default preset. `src/numbers/NumbersSettings.jsx` removes age-group text from number range presets. Color tests/browser checks and project documentation reflect these changes. No CSS, shared audio, navigation or deployment files were changed in this maintenance task.
