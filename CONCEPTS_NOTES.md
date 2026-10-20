# Concept World

Concept World is the sixth learning category. Its existing-platform integration adds one card and one route in `src/hub/Platform.jsx`, keeping Arabic last. The hub's existing three-column grid, Splash, shared AppBar, top creator credit, menu card system and typography are reused. No existing game source, settings, audio or CSS was edited; 85 preexisting source files are checked against SHA-256 snapshots from the start of this task. Arabic audio remains intentionally silent. No dependencies or deployment settings changed.

## Five complete adventures

1. **The Three Bears' House:** two bear friends have visibly different sizes, with a common floor. Children match big and small versions of the same bed, chair, bowl, shoes, toy or bag. Correct objects remain with their bear; wrong objects return. Easy has three pairs and Medium six. A separate bonus uses a large vertical one-finger range slider to resize a toy against a visual target. The bonus requires an actual change and a value within eight units of its target, followed by confirmation.
2. **Grow the Magic Garden:** flower, tree and block-tower gardens share side-by-side baselines and in-SVG target guides. Drag the watering can over a plant and hold; valid watering ticks every 180 ms. Tap alternatives add seven growth units per action, with no one-tap completion. Children first grow the requested tall plant from 10 to 80, then the other plant to 30, then identify which is taller. Cancellation, settings and round completion stop watering timers. Growth changes vertical stems or adds tower blocks rather than resizing the entire object.
3. **Super Sorting Factory:** separate color, shape, size and object-category rounds, only using enabled rules. Easy has two groups; Medium up to four (size always has two). Every group has two unique objects, represented by local SVG pictures. Conveyors and objects actually move within fixed lanes and pause while dragging, selecting, settings or rewards. Objects never time out. Correct sorting gradually reveals a surprise toy and a completed batch celebrates.
4. **My Family House:** mystery shutters animate open and reveal one of Mom, Dad, Brother, Sister, Grandpa or Grandma. A wrong window gives a labeled/spoken introduction and closes after a short clue; the correct member waves. After meeting all enabled members, children drag or tap character cards into labeled portrait frames. A completed family gathers together. This is explicitly one fictional storybook family; it does not prescribe a real household structure. Characters use varied skin tones and neutral designs, with learning labels and narration rather than clothing-based guessing.
5. **Same or Different?:** exactly one picture differs in the stated attribute: shape/color in Easy, with size/detail also in Medium. Wrong taps retry; correct discovery transforms the picture. The second phase draws actual SVG lines between identical pictures. Drag and two-tap alternatives preserve correct connections. Line endpoints are measured with ResizeObserver and viewport coordinates, and update when the board resizes. Wrong connections retract; cancelled pointer gestures do not match. The optional pattern bonus is not included.

## Settings and audio

`little-learners-concepts` stores enabled concepts, Easy/Medium, sorting rules, enabled family roles, voice, effects, cheering, reach and reduced motion. Age labels remain general, following the user's earlier instruction to remove KG1/KG2 labels from settings. Empty concept/rule/family selections disable the corresponding game with guidance. Target changes apply on start/restart; presentation settings apply immediately. Teacher dialogs trap focus, support Escape and pause active games.

English narration and synthetic effects extend the existing `ArcadeAudio` utility without editing it. Cues cancel previous cues and separate effects, cheering and narration. Family vocabulary has spoken introductions and replay. Voice quality depends on installed English voices/browser permissions. No new audio recordings are bundled or claimed; celebration uses the existing manifest and synthesized fallback. Written questions remain available. Arabic playback is not touched or restored.

## Architecture and changed files

New `src/concepts/` files:
- `model.js`, `ConceptArt.jsx`, `ConceptAudio.js`, `useConceptSession.js`, `useConceptDrag.js`.
- `ConceptsHome.jsx`, `ConceptSettings.jsx`, `concepts.css`.
- `games/ThreeBearsHouse.jsx`, `MagicGarden.jsx`, `SortingFactory.jsx`, `FamilyHouse.jsx`, `SameDifferent.jsx`.
- `concepts.test.js`.

The new pointer hook is a category-local adaptation of the proven Colors hook; existing hooks are untouched. The existing read-only reduced-motion hook is reused. CSS is scoped to `cw-` classes under the new section. Pointer capture, one active primary pointer, cancellation, return ghosts, forgiving drop zones and tap alternatives are supported.

Existing edits: `src/hub/Platform.jsx` adds the route/card/illustration; `package.json` adds the Concept test suite. `tests/arabic-check.html` and `tests/colors-check.html` now assert six hub categories rather than five; their gameplay tests remain intact. README adds documentation. New browser suites: `tests/concepts-check.html` and `tests/concepts-layout-check.html`.

## Verification and limits

`npm test`: 123 tests (108 existing plus 15 Concept tests). `npm run build` produces the production bundle with the unchanged `/shape-land/` base. Browser suites cover complete Medium sessions in all five games, wrong/cancelled actions, meaningful growth and slider interaction, all four sorting rules, all six family roles, permanent matching lines, curriculum toggles, restart and Home.

Viewports: 1920x1080, 1366x768, 1024x768, 820x1180, 390x844, plus 844x390 and 320x568. Games use viewport flex/grid layouts and safe-area padding; menus scroll normally. Reach Mode limits scene height and places controls in the middle/lower area. Reduced motion stops ambient animations; essential growing and drawing remain interactive. The separate resize suite checks 35 activity interactions over the seven sizes. Existing whole-site responsive checks also pass.

Tests use the Chromium-based in-app browser. Physical iPad Safari, stylus hardware and classroom smartboard reach still need device testing; no physical hardware testing is claimed. Very short landscape screens use compact controls. No code was pushed or deployed.

Verification reports and a native-tap flower-growth screenshot are saved under `previews/concepts-checks.txt` and `previews/concepts-garden.png`. The connection regression additionally verifies that a wrong line retracts from the actual wrong destination. Native mouse dragging was verified in the bear house; sustained watering was exercised by the browser harness.
