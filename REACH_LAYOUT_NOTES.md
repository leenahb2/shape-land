# Shapes-reference gameplay layout

## Measured original reference
The original Shapes Game function, `src/style.css`, `src/responsive.css`, and `src/usePlayLayout.js` are unchanged. At 1920×1080 with the existing 110px teacher size, `usePlayLayout` produces 132px targets, 14px horizontal gaps, and content sized to its selected objects rather than the full background.

The original play-zone is x=96, y=371.34375, width=1728, height=696.65625. The actual interactive targets are much more compact:

| Original game | Interactive content | Standard vertical bounds |
| --- | --- | --- |
| Shape Detective | 596×158 | 643.46875–801.46875 |
| Hungry Monsters | 596×306 | 569.46875–875.46875 |
| Shape Shadows | 742×306 | 569.46875–875.46875 |

With Reach enabled the original two-row content moves to y=715.6015625–1021.6015625. Shapes' play-zone itself remains flexible and spans the wider screen. These measurements distinguish usable target bounds from the decorative/full-width parent.

## Shared implementation
`src/shared/GamePlayArea.jsx` wraps the interactive content in all 26 non-Shape games. Its CSS uses the largest original Shapes target arrangement, **742×306**, on large landscape screens (at least 1100px wide and 850px tall). At 1920×1080 standard placement is y=569.46875; Reach placement is y=715.6015625, with the same width and height. Standard positioning is viewport center plus the measured original offset; Reach uses the original bottom gap of 58.3984375px. No global scaling, zoom, transforms on the layout container, or overflow hiding is used.

Below that breakpoint the wrapper participates in normal flex layout, allowing existing phone/tablet/short-landscape responsive rules to work. The earlier local mobile sizing work remains in `device-sizing.css`: compact two-column cards from 375px where practical, single-column narrow phones, and safe navigation/settings spacing. Menus, theme, navigation, curriculum, scoring, and audio were not redesigned in this task.

## Internal arrangements
- Collector: six columns and two rows on the board, with a broad shallow treasure box; large letter targets retained.
- English matching: two horizontal endpoint rows; existing ResizeObserver and rendered-rectangle mapping keep SVG lines aligned.
- Picture sorting: objects and destination side by side.
- Tracing, Arabic games, garden, fishing, lab, wash, bridge, family, and comparison scenes fit the shared bounds through their existing flex layouts and actual rendered coordinates.
- Number Tower: compact plan, two rows of number blocks, fixed building slot as the decorative tower grows.
- Color Factory: shorter decorative machine area, conveyor, and reachable bins.
- Concept sorting and Bears: side-by-side objects/destinations, keeping full interaction height.
- Painting: drawing canvas beside palette/tools so required paint regions stay usable.
- Balloons: compact wide fields use one moving row, retaining at least 100px hitboxes at the measured board width. Motion stays within real observed field bounds. The decorative cloud sits above the interaction area; pause remains inside it.
- Rocket choices retain 100px height; eggs keep existing animations and mechanics.

## Modified existing sources
Seven game-shell files add only the shared wrapper/import: `src/letters/LetterGame.jsx`, `src/letters/arcade/Shared.jsx`, `src/letters/interactive/ActivityFrame.jsx`, `src/numbers/NumbersHome.jsx`, `src/colors/ColorsHome.jsx`, `src/concepts/ConceptsHome.jsx`, `src/arabic/ArabicWorld.jsx`.
`src/main.jsx` imports the final layout CSS. `src/letters/interactive/balloonMotion.js` adjusts compact field geometry only. Its existing test file gains one collision/bounds/target-size regression test. The original tests are retained.

## Verification
- Browser reference measurement of all three original Shapes games, Reach off/on.
- New `tests/play-area-check.html`: all 29 games, six menus/settings, seven viewport sizes: 1920×1080, 1366×768, 1024×768, 820×1180, 844×390, 390×844, 320×568. Checks no horizontal overflow, no gameplay page scroll, nav/modal bounds, square menu cards, interaction containment, shared dimensions and both Reach positions. Passed.
- Existing English physical, arcade integration, Numbers, Colors, Concepts, and Arabic browser suites passed. They exercise real pointer drags/cancellation, ordered tracing strokes, matching-line alignment after resize, balloon/fish motion, tower stability, painting, scrubbing, watering, and complete sessions. Arcade checks also verify the original three Shapes games still answer/reward/navigate correctly.
- Arabic suite passed with zero audio attempts, including legacy enabled audio preferences.
- `npm test`: 124 passed. `npm run build`: passed. `git diff --check`: passed.
- The original Shapes Game function remains byte-identical to the pre-polish snapshot.

[Browser reports](previews/reach/browser-checks.txt) · [Screenshots](previews/reach/index.html)

## Limits
All device sizes were browser viewports. No physical smartboard, iPad, or child reach study was performed. The fixed board envelope matches the measured default 110px Shapes configuration; it does not follow future changes to the Shapes-only teacher size slider. Different game mechanics keep their own internal arrangements. Screenshots show the actual saved Reach mode per category; the numeric audit separately verifies both modes for every non-Shape game.

No push or deployment was performed.
