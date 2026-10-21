# Little Learners Land — final QA

Local QA on 20 October 2026. Eight categories, 37 existing games. No redesign, new games, dependency additions, publishing, deployment, or GitHub Pages configuration changes.

## Verified problems and targeted fixes

| Problem reproduced | Fix | Verification |
| --- | --- | --- |
| The shared simple drag hook discarded `onGrab` from its latest callback reference, so English picture words were not pronounced on drag. | Preserve the callback and invoke it once after crossing the existing drag threshold. Taps keep their existing narration path. | Hook regression probe: callback fires exactly once. English picture-sorting full session passed. |
| Both shared drag hooks cancelled and requested a frame for every pointer movement. A burst of 20 moves requested 20 frames and cancelled 19. | Store the latest position and queue one pending frame. | The same 20-event probe requests one frame, cancels none, and renders the final coordinates. This measures scheduling, not FPS. |
| A drag remained active after viewport resize and could score on release using a gesture started in a different layout. | Cancel active gestures on resize; clean pending frames and explicitly release capture during cleanup. | Both hooks clear the ghost, reject the stale release, and accept a fresh drag. Pointercancel, outside drops, secondary pointers, and unmount cleanup also pass. |
| A genuinely new tap immediately after a drag was suppressed by the previous gesture's compatibility-click window. | Reset that window on an accepted fresh primary pointerdown. | Both hooks accept a fresh tap immediately after a drag and still score the preceding drag once. |
| Original Shapes advanced to the next round behind Teacher Settings after a correct answer. | Pass the modal pause state into Game; suspend the transition timer while settings is open and resume the reward delay on close. Pause cancels a pending drag and narration. | Correct answer → settings open for 1900 ms → same round; close → normal progression. All three full sessions pass. |
| Original Shapes completion actions were clipped at 844 × 390. | Add a scoped short-height finale rule: compact medal and spacing, one-line heading, and reachable 44px actions. | All three original completion screens pass seven viewports, with no page scrolling or out-of-bounds actions. |

The original Shapes play geometry, SVGs, educational datasets, scoring, matching rules, and layout hook were not changed. `Game` has a minimal pause-flow fix, so its function is no longer byte-identical to the earlier version. The responsive CSS change affects its **completion screen only**.

## Measured performance and stability

- Stress fixture opened all 37 games twice: **74 game mounts**. Every mount also opened/closed settings and used Back/Home.
- After each category exit, monitored pending animation frames, timeouts, live ResizeObservers, window resize listeners, document keydown listeners, and media-query listeners returned to the hub baseline: **zero in each monitored group**.
- Click to mounted game DOM plus two animation frames: **median 48.9 ms, p95 54.0 ms** in the local development browser. This includes test overhead; it is not a physical input-latency or production-device benchmark.
- Long-task observer recorded **one 50.0 ms task**, including browser/test workload. No FPS measurement or React-render profiler result is claimed.
- Stress and preferences runs reported no captured console warnings/errors.
- Production entry JS: **486.30 kB / 154.13 kB gzip**; entry CSS **234.62 kB / 46.20 kB gzip**. Arabic world chunks remain lazy loaded. Build passed without a chunk-size warning. This QA adds about 0.98 kB of entry JS over its starting snapshot; no bundle-reduction claim.
- Resource instrumentation is not a heap snapshot or proof against every possible memory leak. No hour-long classroom session or physical-device benchmark was performed.

## Responsive and visual audit

`arabic-worlds-layout-check.html` passed all eight menus/settings panels and all 37 game screens at:

- 1920 × 1080
- 1366 × 768
- 1024 × 768
- 820 × 1180
- 390 × 844
- 844 × 390
- 320 × 568

Checks include square menu cards, three desktop/two portrait columns where appropriate, readable navigation without title overlap, modal bounds and reachable actions after scrolling, no horizontal overflow, and no unintended gameplay page scrolling. Menus/settings retain intentional scrolling. Splash credit was checked. Completion coverage includes all three original Shapes games, Letter Detective, and completion states in the category gameplay suites.

The existing shared top credit remains one mounted copy of the exact text **Made with love by Ms. Leena**, above modal layers. No duplicate credits or replacement theme were added. Existing Arabic RTL and font choices remain intact.

Reference measurements at 1920 × 1080 remain unchanged:

| Original Shapes interaction | Bounds |
| --- | --- |
| Detective tray | 596 × 158 |
| Monsters interactive rows | 596 × 306 |
| Shadows interactive rows | 742 × 306 |
| Matching-row top, Reach off | 569.46875 |
| Matching-row top, Reach on | 715.6015625 |

A native browser pointer drag also completed both Hungry Monsters boards, eight matches, and reached the original completion screen. This was mouse/pointer automation, not a real smartboard touch test.

## Teacher preferences and audio

The new preferences fixture exercised visible practice/classroom pressed-state controls in each category, switched difficulty, reloaded the whole page, and verified the complete selection/toggle signature in all eight settings panels. Test snapshots are restored in `finally`. Existing guards for empty/small selections, invalid number towers, unavailable tracing curriculum, and unsupported mixing targets remain. Existing reset confirmation/Cancel behavior passed the layout suite. No storage schema, defaults, or preference-reset behavior was changed in this QA.

Closing settings preserved game progress in the 74-mount test. Shapes' confirmed behind-modal progression is fixed. Intentional Apply & Restart behavior remains.

Arabic Letters, Shapes, and Colors retain **nonverbal** correct/incorrect/celebration effects and mute switches. Their audio probes passed without speech synthesis or recorded spoken clips. Narration/replay controls remain absent. Arabic Letters also passed a fully muted session of each game despite enabled legacy narration preferences. English narration/effects paths remain; the English arcade suite tested independent speech toggles and replay. This QA restores the missing English drag-word callback only.

No new sound assets, speculative gain changes, or audio-system rewrite were introduced. Actual speaker loudness and the quality/availability of English system voices still need checking on classroom hardware.

## Automated verification

| Check | Result |
| --- | --- |
| `npm test` | **131 passed, 0 failed** |
| `npm run build` | Passed; 134 modules transformed |
| `git diff --check` | Passed |
| New browser-suite JavaScript syntax | All four valid |
| Shared drag lifecycle regression fixture | Passed |
| Original Shapes full sessions + Letter Detective full session | Passed, including settings pause and seven completion sizes |
| Full-site layout/credit/navigation/settings audit | Passed, all eight categories / 37 games / seven sizes |
| English physical interactions | Passed: collector, matching lines, picture sorting, ordered tracing A/B/C/S/T, moving balloons, small datasets |
| Existing English arcade integration | Passed: balloons, rocket, eggs, replay/restart/Back; original Shapes navigation retained |
| Numbers | Passed: all four sessions, zero and ten quantities, duplicate prevention, tower subsets, moving fishing hook, restart/empty guards |
| English Colors | Passed: all five sessions, recipes, conveyor sorting, SVG painting, scrub/paint car wash, bridges |
| Concept World | Passed: all five sessions, sliders, hold watering, all sorting rules, family construction, resized permanent lines |
| Arabic Letters muted/reward suites | Both passed: all four sessions, matching/drop cancellation, wrong answers, small datasets, mute and musical rewards without speech |
| Arabic Shapes | Passed: all three sessions, seven sizes, wrong/cancel/outside drops, mute/rewards, no speech |
| Arabic Colors interaction/audio | Both passed: all five sessions, seven sizes, Arabic visible instructions, no narration, effects/mute |
| Repeated navigation/resource stress | Passed, 74 mounts, baseline restored after every category exit |
| Teacher controls/persistence | Passed in all eight categories after full reload |

There is no lint script configured in the repository; no linter/dependency was added. Existing tests were not deleted or weakened. One stale Concept World test assertion was updated from a flat six-category hub to the actual eight-category grouped hub and checks the exact trailing Arabic category order.

An initial highly concurrent Numbers run had a timing-sensitive first-object failure; a subsequent isolated full run passed all four games and the quantity checks. An initial layout run timed out waiting for the first lazy Arabic menu while other suites were active; the complete isolated follow-up passed. Neither was treated as a confirmed production bug or bypassed by weakening assertions.

## Files changed by this QA pass

Production:

- `src/letters/interactive/useDragBoard.js` — scheduling, current callback, resize/capture cleanup, fresh-tap handling.
- `src/colors/useColorDrag.js` — scheduling, resize/capture cleanup, fresh-tap handling.
- `src/main.jsx` — minimal original Shapes settings-pause integration.
- `src/shared/device-sizing.css` — scoped short-height original Shapes completion layout.

Tests/documentation:

- `tests/concepts-check.html` — current grouped-hub assertion.
- `tests/drag-lifecycle-check.html` — new targeted regression probe.
- `tests/legacy-completion-check.html` — new full original-game completion and pause checks.
- `tests/site-stress-check.html` — new resource/navigation/performance fixture.
- `tests/teacher-preferences-check.html` — new controls/full-reload persistence fixture.
- `FINAL_QA_REPORT.md` and `previews/final-qa/` — findings and saved evidence.

Other files already modified/untracked at the start belong to the earlier Reach/layout and Arabic-world expansion work. They were preserved; they should not be mistaken for new changes from this QA.

## Remaining physical-device checks

No confirmed application failure remains from the completed suites. Still required before a classroom-wide release: test real single-touch capture/cancellation and palm rejection, physical child reach, iPad Safari orientation/safe-area/browser chrome, school-board sustained animation/thermal performance, and speaker volume/system English voices. Desktop browser viewport simulation does not establish those hardware results.

No automatic push, merge, or deployment was performed.
