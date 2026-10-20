# English Letters: collecting, connecting, tracing, and sorting

This update changes English Letters only. Shape games, shape settings/audio/styles, splash artwork/animation, learning hub artwork, Numbers/Colors, Vite `/shape-land/`, deployment workflow, dependencies, and lockfile are preserved. No commit, push, or deployment is automatic.

## Current games

| Game | Status and interaction |
| --- | --- |
| Letter Detective | Preserved, including the requested “Find the letter A!” instruction and capitals in both levels. |
| Letter Collector | New. Five rounds. Drag every matching letter into a treasure box; tap a token then the box is also supported. Easy: 8 tokens / 3 targets. Medium: 12 tokens / 4 targets, with similar distractors. |
| Big & Small Matching | Redesigned. Four sets of 3/4 teacher-selected pairs, or fewer when fewer letters are selected. Draw live SVG connections or tap both endpoints. A one-letter selection makes a valid one-pair activity. |
| Magic Letter Tracing | New. Genuine ordered finger tracing for **A, B, C, S, T only**. One round per supported selected letter. Reset, Show Me, Say Letter, Replay, and Next Letter work. Unsupported tracing letters are visibly unavailable in this game only. |
| Flying Alphabet Balloons | Redesigned existing balloon game. Eight rounds. Real moving button hitboxes follow slow, bounded trajectories in separate flight lanes; hold freezes motion. Pause/resume persists across rounds. Reduced motion disables flight. |
| Letter & Picture Sorting | Redesigned. Five rounds with six illustrated objects. Drag matching pictures into a letter house, or tap a picture then the house. Object names are spoken on pickup/selection and successful sorting. |
| Rocket to the Moon | Preserved five-stage game. |
| Mystery Letter Eggs | Preserved six-round game. |
| Alphabet Train | Removed: card, route, import, component file, engine artwork, exclusive CSS, and sequence generation. Shared audio/celebration utilities remain. |

## Interaction implementation

`useDragBoard.js` captures one primary pointer, follows movement with a requestAnimationFrame-updated fixed ghost, and checks the release pointer against the destination's measured DOM rectangle with a small forgiving margin. Unaccepted/cancelled/outside releases leave the original item in its slot. Duplicate correct drops cannot count twice because accepted IDs are checked synchronously. Draggables use `touch-action: none` and prevent text selection. Native buttons provide tap/keyboard alternatives. Active drags and scheduled animation frames are cleared on pause or unmount.

Matching uses a full-board SVG overlay behind the cards. Pointer positions and measured endpoint centers are mapped from client rectangles into its 1000×1000 viewBox, accounting for browser resizing and CSS scaling. ResizeObserver remeasures the board and cards. Correct lines persist and glow; incorrect lines retract. Matched endpoints cannot be reused. Cancellation does not create a match.

Tracing uses explicit SVG-to-pointer transformation with `getScreenCTM().inverse()`. `strokePaths.js` defines real directed line/Bézier strokes, start/end points, and centerlines resampled approximately every two SVG units. A stroke must begin at its start (or its saved continuation dot), follow a bounded forward window, cover at least 94% of the centerline, and reach the endpoint tolerance before it completes. Easy tolerance is 25 SVG units; Medium is 17. The final small end cap snaps into place for young fingers. Clicking an endpoint, jumping across a stroke, watching the demonstration, or waiting cannot complete it. Separate strokes require lifting and starting again in order. Progress survives a mid-stroke pen lift/cancellation, and can be resumed from the glowing dot. Reset removes it. Show Me animates a separate guide, never the scoring state.

Supported print formations: A has two downward diagonal strokes and a left-to-right crossbar; B has a downward stem and directed double bowl; C and S follow their curves from upper right to lower end; T has a left-to-right bar and downward stem. Other 21 letters deliberately have no invented tracing paths. Teachers should verify the chosen print forms against their own handwriting curriculum.

The balloon controller updates actual button transforms, not only SVG decoration. Each lane bounds the full touch region, preventing excessive overlap or inaccessible flight. Per-balloon speeds and sideways/vertical drift differ, and new balloons ease in from the lower edge of their lanes. Pointer hold, user pause, teacher settings, reward phases, hidden documents, and reduced motion stop the animation clock. RAFs, media listeners, and resize observers are cleaned up.

## Curriculum, settings, and audio

Selected letters determine the target content; outside letters can be distractors. A–Z single-letter target sets are valid in Collector, Matching, and Sorting. The additional Collector case selector supports capital, small, or mixed cases and is saved as `collectorCase`. Tracing intersects selection with A/B/C/S/T, shows which supported letters are ready, and disables starting/restarting if that intersection is empty. Shape preferences are never read or written by these games.

Sorting uses a local structured phonics dataset and consistent SVGs. A/B/C/D/S/T each have the three requested familiar objects. Hard C/G and short vowel examples avoid silent-letter traps. X is explicitly an **ending /ks/** exercise using fox, box, ox; it is not falsely presented as an initial sound. U currently uses two umbrella tokens rather than inventing an ambiguous U object. Labels and narration help identify each illustration.

The shared English `ArcadeAudio` controller is reused. Speech, effects, and cheering are independently controlled in Teacher Settings; original Letter Detective sound behavior is preserved. New instructions cancel previous cues, pickup narration and rewards do not overlap, missing audio never blocks interaction, and volume remains modest. **No genuine child-cheering recordings are bundled.** The active fallback is original synthesized effects/music and soft synthetic applause, with separate browser speech narration. Local licensed recordings can be registered in `public/audio/celebrations/manifest.json`; that manifest is intentionally empty. Existing license/attribution instructions remain in that folder's README.

## Files added

- `src/letters/interactive/Collector.jsx`, `Matching.jsx`, `PictureSorting.jsx`, `Tracing.jsx`: playable activities.
- `src/letters/interactive/ActivityFrame.jsx`, `interactive.css`: English-only layout and environments.
- `src/letters/interactive/useDragBoard.js`, `useSession.js`: pointer, session, reward, and cleanup lifecycle.
- `src/letters/interactive/model.js`: target decks, pair generation, case modes, geometry, duplicate guards.
- `src/letters/interactive/phonics.js`, `PictureArt.jsx`: sorting vocabulary and additional local illustrations.
- `src/letters/interactive/strokePaths.js`: supported stroke geometry and continuous validation.
- `src/letters/interactive/balloonMotion.js`: bounded flight trajectories.
- `src/letters/interactive/interactive.test.js`: geometry, curriculum, motion, and tracing regression tests.
- `tests/interactive-check.html`: end-to-end pointer, completion, layout, and settings QA helper.
- `INTERACTIVE_NOTES.md`: this guide.

## Files modified or removed

- `src/hub/Platform.jsx`: route the redesigned pair/picture games and new activities; guard unsupported tracing starts. Main hub markup is preserved.
- `src/letters/LetterGame.jsx`: update only the two redesigned menu titles; Detective gameplay remains unchanged.
- `src/settings/LetterSettings.jsx`, `src/letters/data/letters.js`: English case preference, tracing availability, audio labels, and safe preference persistence.
- `src/letters/arcade/Arcade.jsx`, `ArcadeCards.jsx`, `rounds.js`: remove Train integration and register the new cards/components.
- `src/letters/arcade/games/BalloonPop.jsx`: real flight, freezing, pause/resume, and cleanup.
- `src/letters/arcade/arcade.css`, `Characters.jsx`: remove Train-only rules/artwork; add isolated flight styling. Rocket and Eggs retain their scene components and responsive rules.
- `src/letters/arcade/audio/ArcadeAudio.js`: use a magical sparkle effect for the new physical activities.
- `tests/arcade-check.html`: retain regression coverage for the three remaining original arcade games, Detective, and Shapes; redesigned activity coverage is in the new physical helper.
- `package.json`: add the new test file, with all existing test files retained.
- `README.md`, `ARCADE_NOTES.md`: current English documentation.
- Removed `src/letters/arcade/games/AlphabetTrain.jsx` (exclusive game component).

## Running and testing

```sh
npm run dev
npm test
npm run build
```

Open `http://localhost:5173/shape-land/`. QA helpers, not included in the production bundle:

- `http://127.0.0.1:5173/shape-land/tests/interactive-check.html`: all physical activity sessions; directed tracing for all five letters; wrong/outside/cancelled drops; matching/retraction; genuine progress versus endpoint/demo shortcuts; pause/freeze flight; single-letter targets; tracing restrictions; five viewport measurements; restart and Home.
- `http://127.0.0.1:5173/shape-land/tests/arcade-check.html`: full retained balloon/rocket/egg sessions, Detective, and original Shape interactions.

Use the 127.0.0.1 origin for QA so it is separate from normal localhost preferences. Helpers restore their saved preferences. Browser PointerEvent simulation is complemented by native pointer drag checks in the scaled preview. Automated geometry/coverage checks do not replace physical iPad Safari, smartboard reach, real classroom speaker volume, or teacher handwriting review.

## Final verification

- Automated tests: **59 passed**, including original Shape tests and retained English test files. Retired Train cases are replaced by an explicit removal assertion and new physical-interaction coverage.
- Production build: **passed**; no new dependencies and no base-path/deployment change.
- Physical browser suite: full five Collector rounds, four Matching sets, five Sorting rounds, every stroke of A/B/C/S/T, teacher restart, outside/wrong/cancelled gestures, tap alternatives, live/permanent lines and resized endpoints, tracing demo/endpoint rejection, single-letter support, unsupported tracing, explicit X phonics, moving/pause/freeze balloons, and Home all passed.
- Responsive measurements: **1920×1080, 1024×768, 768×1024, 844×390, 390×844** for new/redesigned activities. No measured gameplay scrolling or controls outside the viewport; large smartboard answer targets were verified.
- Retained-game suite: complete Balloon/Rocket/Egg sessions, audio toggle/replay, Play Again/restart, Detective correct/incorrect response, and the original three Shape games' answer/reward/navigation checks passed.
- Native input: dragging into the Collector box, drawing a matching connection, and all three ordered A strokes worked through real pointer gestures in the CSS-scaled preview. A only completed after the third stroke.
- Source preservation: original Shape `Game` and `Settings` functions and original shape source/style/audio/test/layout files, Vite base config, and dependency lockfile remain unchanged.

Remaining limits: tracing intentionally supports **A, B, C, S, T** rather than unvalidated full-alphabet paths; U has repeated umbrella tokens; X uses final /ks/. No authentic child-cheer recordings are included. Real iPad Safari, actual classroom smartboard reach, and speaker/voice quality still need device checks.
