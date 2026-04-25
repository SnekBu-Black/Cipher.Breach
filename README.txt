CIPHER.BREACH - Unified PC + Mobile Build

This is ONE codebase for both desktop and phones.
It keeps the original Three.js 3D game and adapts the view/UI based on screen size and touch support.

Desktop behavior:
- Keyboard movement: W/A/S/D or arrow keys.
- Action: E, Enter, or Space.
- Pause: Tab.
- Mobile D-pad is hidden on normal desktop screens.
- Desktop renderer uses a higher pixel ratio cap for sharper visuals.

Mobile behavior:
- Touch D-pad and ACTION / PAUSE buttons appear automatically.
- Left/right mapping is fixed: left = dx -1, right = dx +1.
- The D-pad is forced to LTR so Arabic RTL layout does not flip controls visually.
- Camera/FOV changes for portrait and landscape phones.
- Renderer pixel ratio is capped to reduce phone GPU load.
- HUD and puzzle modals compress to fit phones.
- iOS safe-area support is included.

PWA/GitHub Pages files:
- manifest.webmanifest
- sw.js
- icons/icon-192.png
- icons/icon-512.png

For GitHub Pages:
Upload the CONTENTS of this folder so index.html is directly at the repository root.
Do not upload the ZIP itself.
