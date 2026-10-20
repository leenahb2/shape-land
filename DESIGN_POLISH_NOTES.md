# Final design audit and UI refinement

This is a finishing pass on the established palette, local fonts, SVG art and shared menu design. No educational datasets, answer validation, scoring, tracing paths, game progression, pointer hooks, Reach Mode behavior or audio implementations were changed. No dependencies, deployment settings or Vite base changes.

## Audit findings

The six menus already shared a strong pastel identity, but measured card heights varied at a 372px width: Shapes 409px; English 405–443px; Numbers 441–460px; Colors 460px; Concepts 404–405px; Arabic 418px. Long descriptions and teacher guidance stretched cards and made rows inconsistent. Only the bottom button was a clear click target. Some pastel buttons used low-contrast white text.

The creator credit was repeated in the Splash composition/footer and translated in Arabic, while settings overlays covered the page credit. Category settings used different header/action spacing, native difficulty dropdowns, and inconsistent chip/toggle presentation. Shapes kept a category title in the top bar while other games showed their game titles. Navigating from a lower hub card could retain the hub's scroll position.

Before snapshots and a DOM/accessible-screen audit cover Splash, the hub, six menus, six teacher dialogs and every game, including temporarily enabling A for tracing and restoring the original letter selection.

## Refinements

- One `UniversalCredit` is mounted once beside Platform in the app shell. Exact text: **Made with love by Ms. Leena**. A small decorative SVG heart has no text. The fixed, safe-area-aware credit sits above settings overlays, with reserved header space to avoid covering controls. Existing `Credit` call sites are spacing placeholders only. Repeated footer author lines are replaced by the platform name; the duplicate Splash signature is removed.
- Shared AppBar keeps all existing callbacks, with stable left/right action groups and a centered title. Small portrait screens put the title above actions; short landscape remains compact. Shapes' shared header now names the current game. Route changes return to the top without resetting a game or teacher choices.
- Menu cards use `aspect-ratio:1/1`, equal grid rows, balanced SVG space, aligned titles and a 44px minimum action. Three desktop columns, two below 1000px, and one below 500px. The hub remains three desktop/two tablet columns, with one on very narrow phones. Menus scroll normally. A stretched button pseudo-element makes the entire active game card clickable while preserving one semantic keyboard button and its existing handler. Disabled cards stay disabled and retain necessary availability guidance.
- Card paragraphs/tags and redundant decorations are removed from the visible menu card layout; their instructional content remains in settings or gameplay. Illustrations and game-specific animations are preserved. Button text has stronger contrast. Hover/pressed/focus feedback is restrained and respects reduced motion.
- Settings share `What to Practice`, segmented `Easy / Medium`, and `Classroom Options`. Arabic uses natural Arabic headings and Tajawal. All existing controls/keys/update handlers remain. A synchronized hidden native difficulty select preserves existing integration callers while the visible control is two semantic pressed-state buttons. English's distinct Detective and interactive-game audio channels are kept and explained.
- Modal headers and actions are sticky inside a safely bounded scrollable panel. Close/Done remain reachable on short screens. Supporting color/number guidance uses one shallow details section, without deleting content. Color-default replacement now asks for confirmation; Cancel preserves selection. Shapes gains Select All while retaining its at-least-one-shape guard. No other preset silently resets choices.

## Files

New: `src/shared/UniversalCredit.jsx`, `src/shared/SettingsUI.jsx`, `src/shared/polish.css`, `tests/design-polish-check.html`, and this report.

Existing UI files edited: `src/shared/AppBar.jsx`, `src/Splash.jsx`, `src/main.jsx` (shell, Shapes menu/settings only), `src/hub/Platform.jsx`, `src/settings/LetterSettings.jsx`, `src/letters/arcade/ArcadeCards.jsx`, `src/numbers/NumbersHome.jsx`, `src/numbers/NumbersSettings.jsx`, `src/colors/ColorsHome.jsx`, `src/colors/ColorsSettings.jsx`, `src/concepts/ConceptsHome.jsx`, `src/concepts/ConceptSettings.jsx`, `src/arabic/ArabicWorld.jsx` (menu button label only), `src/arabic/ArabicSettings.jsx`. README links the report. Original tests are not weakened or removed.

The Shapes gameplay function is verified byte-for-byte against its pre-audit snapshot. 86 preexisting source files remain byte-identical, including gameplay modules, model/data files, audio, dragging, matching and tracing implementations. Changes in the Home/shell files are limited to presentation and shared navigation.

## Verification

`npm test`: 123 existing tests. `npm run build`: production build. New browser audit checks six menus/settings and all 29 game starts at 1920x1080, 1366x768, 1024x768, 820x1180, 390x844, plus 844x390 and 320x568. It checks square dimensions, title/action separation, horizontal overflow, gameplay page bounds, top-bar overlaps, modal Close/Done visibility, one exact credit, preserved selections, guarded games, tracing availability restoration and cancelling the color-default preset.

Existing browser gameplay suites are also run for meaningful pointer interactions and Arabic silence. The recorded browser reports and before/after screenshots are delivered in `previews/polish/`.

All testing is local in the Chromium-based in-app browser. Actual iPad Safari and smartboard hardware have not been tested. Existing game completion art, wording and animations retain their personality; the global header supplies Home throughout. Compact landscape uses smaller navigation text than a smartboard. No push or deployment was performed.

Final results: all 123 tests and production build pass. The six-category audit passes all 29 game starts, six menus and six teacher dialogs across seven viewports, including tracing with its original letter selection restored. Existing English physical interactions, Numbers, Colors, Concepts, Arabic silence and whole-site target/layout suites all pass. Card buttons have calculated text contrast of at least 4.56:1; the shared credit and settings Done button exceed 5:1. A native mouse test confirms that the card illustration itself activates its start button. Card-button transforms are suppressed so hover cannot collapse the stretched hit area.

[Before/after gallery](previews/polish/index.html) · [Passing browser report](previews/polish/browser-checks.txt) · [Card measurements](previews/polish/measurements.json).
