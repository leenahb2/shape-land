# Shape Land! — A Magical Shape Adventure
A single-player, touch-friendly kindergarten game built with React, Vite, JavaScript, CSS, and SVG. No server or accounts.

## Run
Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

## Classroom use
Open Teacher Settings with one click in the header. Select the shapes taught this week (at least one), choose Easy or Medium, adjust target sizing, and enable Reach Mode to lower the play zone. Preferences are saved on this device. Shape selection and difficulty apply on the next game; Apply & restart applies them immediately. Reach, sizing, and audio update immediately.

- Shape Detective: ten rounds, every selected shape appears as a target before repetition. Easy displays up to four answers, Medium up to eight. Labels remain visible in Detective.
- Hungry Monsters: four shape-bodied monsters per board, or fewer if fewer shapes are selected. Drag food into a monster, or tap food and then the monster. Wrong food produces a brief grumpy eyebrow wiggle with encouraging feedback. All selected shapes appear across boards.
- Shape Shadows: five silhouettes per board, or fewer if fewer shapes are selected. Match every shape by dragging or tapping a shape then its silhouette. Correct matches speak the shape name. All selected shapes appear across boards.
- Correct responses celebrate and advance only after completion; wrong answers always allow another attempt. No timer, scoring penalties, or multitouch requirement.
- Teacher Settings is outside the central child play zone and clearly marked for adults. It is intentionally a single-click panel, not password protected or a security boundary.
- Voice uses available browser English SpeechSynthesis voices. Availability and quality depend on the device. Replay Voice replays instructions. Narration and synthesized musical sounds can be muted separately. Visual gameplay works without speech support.
- Designed for landscape 16:9 smartboards; use browser full screen for maximum space. Gameplay does not require scrolling at standard classroom sizes (1280×720, 1920×1080). Settings can scroll on smaller displays. Phone portrait also supports wrapping controls; extremely small/short windows may need a larger display.
- Google Fonts are optional enhancements; local fallback fonts keep the game functional offline.

## GitHub Pages
Push these files to a GitHub repository on the `main` branch. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The included workflow tests, builds, and publishes `dist`. Vite uses `base: './'` so assets resolve under both repository Pages paths and custom domains. No client routing configuration is needed. Publishing requires a repository and GitHub Pages enabled; this project has not been published automatically.

## Code
`src/shapes.js` is the shared curriculum, `Shape.jsx` draws reusable SVG shapes and monsters, `rounds.js` builds coverage-preserving rounds, and `audio.js` handles browser narration and music. `main.jsx` contains the menu, teacher panel, and shared single-player game flow. No crescent or extra games are included.

## Welcome screen and responsive layouts
The animated opening screen credits **Ms. Leena** in English, with a tap-to-enter button and reduced-motion support. The menu keeps the creator credit visible in its footer, and larger screens also show it in the header.

Game grids measure the available viewport with ResizeObserver, choosing a cell size and column count that fit all answers and destinations. Short landscape phones use adjacent matching panels. Touch targets scale to the device (smaller on compact phones, larger on classroom boards). The menu may scroll on phones; gameplay keeps the board visible without scrolling at tested sizes.

For manual layout QA, run the dev server and open `/tests/responsive-check.html`. Its iframe simulates seven viewports from 320×568 to 1920×1080. Enter a game, choose a viewport, and press Check layout to inspect overflow, shape overlap, and controls outside the viewport. This helper is not included in the production build.
