# Arabic Find & Tap — 21 October 2026

## Games

- Added **أوجد الحرف** alongside the four existing Arabic letter games. The hunt remains a multi-match collection game; its rules were preserved.
- Improved the existing Arabic Shapes recognition entry as **أوجد الشكل**, retaining its `detective` navigation identity. Monster feeding and shadow matching remain.
- Added **أوجد اللون** alongside the five existing Arabic color games. English menus, datasets, and audio were not changed by this feature.

The platform now has 39 games across its existing eight categories.

## Targets and distractors

`src/shared/recognitionRounds.js` builds ten-question sessions. Correct targets come only from valid, deduplicated teacher selections. Distractors come from the full catalogue and exclude the correct ID; every question contains four distinct IDs and exactly one correct answer.

Targets rotate in shuffled cycles, avoiding an identical target at cycle boundaries when multiple targets exist. Correct-answer positions use shuffled position bags. Selecting only White, Square, or ب still produces three different distractors. Empty/invalid selections never silently fall back to a different curriculum; menus disable play and the component also has an empty-state guard.

All 18 existing Arabic colors, 12 implemented Arabic shapes, and 28 letters can be selected as targets. Easy letters favor visually different glyphs; Medium supports similar glyphs. Color distractors prioritize distinct base colors. Existing swatches are reused; White has a border, metallic colors have a restrained highlight, and color tiles have no visible answer labels. The requested Arabic name remains in the instruction. Arabic letters also show the requested glyph above the answer area.

The existing Arabic doors game already takes distractors from all letters. Multi-match letter hunt/box, matching, shape feeding, and sorting mechanics intentionally continue to use their established rules.

## Settings, sound, and layout

Existing category settings and storage keys are reused. A short explanation clarifies that selections are learning targets and comparison choices are automatic. No new settings screen or schema was added. Choices apply on starting/restarting, while closing the modal preserves progress. All three categories remain independent of English preferences.

The shared recognition component reuses AppBar, the original Shapes layout hook, GamePlayArea, SVG shapes, celebrations, and ArabicRewardAudio. There is no speech synthesis, recorded narration, or Replay Voice control. Correct/incorrect musical effects, celebrations, and existing mute controls work. Timers pause behind settings and clean up on exit.

At 1920 × 1080, the answer tray measures **596 × 158px**, with **132px** cells and its normal top at **643.46875px**, matching the original English Shape Detective. Reach Mode uses the established lower board placement. No global scale transform or original Shapes sizing changes were introduced. Browser-test iframes are scaled only to display the simulated viewport in the test runner.

## Verification

- **143 Node tests passed**, including single White/Square/ب, every target alone, multiple targets/fair cycles, empty selections, duplicate/invalid IDs, exactly one correct answer, position variation, three/six choice utility support, Arabic instruction spelling, and a unique five-entry Arabic letters menu.
- `npm run build` passed; `git diff --check` passed. No dependency or deployment configuration changes.
- `tests/arabic-find-check.html` passed full ten-round sessions for all three games, wrong/correct/rapid taps, stationary bounds, completion/replay, modal pause, Clear All guards, four additional mixed-target rounds per game, mute/no speech, independent preferences, and reload persistence.
- New games and completions passed **1920×1080, 1366×768, 1024×768, 820×1180, 390×844**, plus **844×390 and 320×568**. Tests check RTL, the exact single credit, four visible options, target sizes, page overflow, and original Detective geometry.
- Existing Arabic Letters, Shapes, and Colors browser suites passed all their full gameplay sessions and existing resize/drop/cancellation/audio checks. The Arabic Colors menu count assertion now expects its five existing entries plus Find Color.
- Full-site responsive/menu/settings/navigation audit passed. Curriculum-specific unavailable games remain guarded; the color gameplay suite separately exercised the Lab at seven sizes.
- Stress suite opened all **39 games twice: 78 mounts** with settings and Back/Home. Tracked RAF, timeout, observer, resize, keydown, and media listeners returned to baseline after each category. Median mounted-DOM-plus-two-frame timing was **48.3ms**, p95 **53.4ms** in the development browser. No long tasks or captured warning/error logs occurred in that run. These are browser/test measurements, not physical touch latency or FPS claims.

No physical smartboard or iPad test was performed. Actual child reach, iPad Safari chrome/safe area, and classroom speaker volume still require hardware testing.

## Files for this feature

- New: `src/shared/recognitionRounds.js`.
- New: `src/arabic/recognition/ArabicFindGame.jsx`, `data.js`, `recognition.css`, `recognition.test.js`.
- Integration: `src/arabic/ArabicWorld.jsx`, `model.js`, `ArabicSettings.jsx`, `src/arabic/worlds/ArabicShapes.jsx`, `ArabicColors.jsx`, `PracticeSettings.jsx`.
- Tests/scripts: `package.json`, `tests/arabic-find-check.html`, `tests/arabic-colors-check.html`.
- Documentation/evidence: this report and `previews/arabic-find/`.

Earlier local Arabic-world expansion, Reach/layout, and final-QA work is also included in the requested publication; its reports remain separate. The user explicitly authorized GitHub upload and publication on 21 October 2026. Publication status is verified after the push, separately from these local test results.
