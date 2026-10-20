# Numbers arcade

## Games

- **Feed the Hungry Dino**: five rounds. Real pointer-captured fruit dragging to the mouth, proximity opening, chew feedback, spoken per-fruit counts, duplicate/overcount protection, sufficient supply, rotating apples/strawberries/bananas, and tap-fruit/tap-mouth alternative. Zero requires delivering an empty plate; ordinary fruit does not score in a zero task.
- **Build the Number Tower**: three ordered construction rounds. Easy sequences contain up to five selected consecutive numbers; Medium supports up to ten and has a missing-number round with prefilled places. Correct blocks populate a growing tower; the active drop slot remains at a fixed lower position. Internal tower history can move above the viewport, while the active slot remains visible. Wrong/outside/cancelled drops never progress. Tap-select/tap-slot works, including block 0. Completion reveals a builder and star flag.
- **Magic Number Garden**: five rounds. Drag individual seeds to a generous bed, or tap seed then bed. Every accepted seed grows exactly one flower; counts cannot exceed the selected target. Zero requires placing an empty garden marker. The finale displays all five beds with the actual flower quantities, including empty zero beds.
- **Number Fishing Adventure**: six rounds. Three/four genuinely moving fish swim inside disjoint safe lanes. A pointer-captured hook follows the child; releasing its catch circle near the target fish catches it. Wrong fish escape, outside/cancelled gestures do not score, and movement freezes during manipulation/catch. Tap a fish only moves the hook; a separate Lift hook action is required. Keyboard arrows move the hook and Enter lifts it. Motion can be paused from the game or teacher panel, and the device reduced-motion preference is honored. Hook geometry is clamped and remeasured on resize to keep the entire control visible.

All Numbers UI and narration use English with standard digits. No 11–20 extension is enabled.

## Files and integration

New implementation is isolated under `src/numbers/`:

- `NumbersHome.jsx`: shared-style three-column game menu, session frame, navigation and illustrated finales.
- `NumbersSettings.jsx`: independent teacher panel, focus trap and keyboard close.
- `numberData.js`: 0–10 data, round generators, selected-number validation, consecutive groups, quantity acceptance, coordinate helpers and bounded fish motion.
- `useNumbersSession.js`: round lifecycle, pause/replay, count feedback, history and completion lock.
- `NumbersAudio.js`: safe subclass of the existing audio controller with Numbers-only settings, short synthetic chew/snap/grow/splash effects and spoken count words.
- `NumberArt.jsx`: local original SVG Dino, fruit, seeds/flowers, fish, builder and bucket illustrations.
- `games/HungryDino.jsx`, `NumberTower.jsx`, `MagicGarden.jsx`, `NumberFishing.jsx`, `useQuantity.js`.
- `numbers.css`: Numbers-scoped scene sizing, motion, pointer feedback and responsive rules.
- `numbers.test.js`: 14 new tests.

Existing production changes are limited to `src/hub/Platform.jsx`: import/route NumbersHome and enable the existing Numbers card. Colors remains Coming Soon. Existing Shapes, English and Arabic game source, audio, layout and shared style files were not edited for this task. Numbers reuses AppBar, the shared menu classes, Celebration and the existing generic drag hook without changing them. `package.json` adds the Numbers test to the existing test command; dependencies, lockfile, Vite base and deployment workflow remain unchanged. The Arabic integration test now expects one Coming Soon card and explicitly checks that Numbers is enabled, reflecting the new product requirement.

## Teacher settings

Preferences use `little-learners-numbers`, independent of other categories. Supported presets: 1–5, 1–10, 0–10; individual selection/clear; Easy/Medium; independent Speech, Effects and Celebrations; Reach Mode; Reduce/Pause Motion; replay/restart. Selection changes apply at start/restart; audio, motion and reach controls update immediately.

Selected numbers determine all learning targets. Fishing may show other valid digits as distractors. Tower only uses consecutive selected groups: a single selected number supports a one-block activity; multiple isolated numbers disable Tower with a clear explanation. Mixed selections explain that isolated numbers are omitted. No unselected number is inserted to fill a sequence.

## Responsive implementation

Numbers uses the existing menu theme and AppBar. Game roots are viewport-height flex layouts; scenes flex into remaining space. SVGs preserve aspect ratio. Grid supplies, generous targets, and short-landscape side-by-side layouts fit phones, tablets and smartboards. Reach Mode keeps the scene in the lower part of a large display. No global transform scaling is used in the app. Drop/hook coordinates use measured DOM rectangles; the pond uses ResizeObserver and resizes its bounded fish lanes. Safe-area bottom padding is respected.

## Audio

The existing controller is reused through a subclass, leaving other sections unchanged. Spoken counts use English words at the established slow narration rate. Short effects precede counts; each new cue cancels stale sounds/speech; a final count precedes cheering and short praise. Speech/effects/celebrations are independently muted. The existing local celebration manifest remains empty: no real children's recordings are included or claimed. Appropriately licensed local clips can use the existing manifest workflow; otherwise soft synthesized music/applause is used. Missing speech or audio support never blocks gameplay. Speech voice availability/quality depends on the device.

## Verification

- `npm test`: **88 passing** (74 existing + 14 Numbers).
- `npm run build`: passes, no new dependencies.
- `tests/numbers-check.html`: all five Dino rounds and five Garden rounds with selected 0/2/3, plus a full ten-object round in each; all three Tower sequences including missing places; all six Fishing rounds. It checks drag and tap alternatives, duplicate/overcount protection, explicit zero actions, wrong/outside/cancelled and secondary pointer gestures, fixed reachable tower slot, selected-number subsets, one-number Tower, real fish movement, pause/resume, controlled hook catches, restart, empty selection and Home/Games navigation.
- Seven game viewports pass bounds/touch checks: 1920×1080, 1366×768, 1024×768, 820×1180, 844×390, 390×844, 320×568. Worst-case quantities and ten-block Tower are included. No gameplay scrolling or off-screen controls.
- `tests/numbers-layout-check.html`: all seven menu and teacher-dialog sizes, three desktop columns, art/content within cards, KG1/KG2/zero presets, speech control and independent local persistence.
- `tests/site-responsive-check.html`: existing Shapes/English/Arabic menu/game entry sizing remains valid after integration. Existing unit tests are retained; no assertions were removed.
- Native browser dragging independently verified feeding an apple into Dino's mouth and dragging the fishing hook to catch the requested number two. The browser test harness also exercises scaled-iframe pointer coordinates for all four games.

Physical iPad Safari and the classroom smartboard still need an on-device check; responsive browser emulation is not hardware validation. No automatic push or deployment was performed.
