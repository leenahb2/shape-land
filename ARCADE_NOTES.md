# English Arcade

The current English implementation and delivery notes are in [INTERACTIVE_NOTES.md](INTERACTIVE_NOTES.md).

The preceding arcade expansion introduced balloon, rocket, egg, and train activities with a reusable audio system. The latest English-only interaction update removes Alphabet Train, makes the balloons genuinely move, and adds collecting, connection drawing, tracing, and picture sorting. Rocket to the Moon, Mystery Letter Eggs, and Letter Detective remain available. No Shape game changes are part of either English expansion.

`src/letters/arcade/audio/ArcadeAudio.js` retains independent speech/effects/cheering controls, safe cancellation, modest volumes, missing-file fallback, and support for locally licensed recordings. There are no bundled real child-cheer recordings; the fallback remains synthetic music/applause, clearly described as such. See `public/audio/celebrations/README.md` for asset registration and attribution requirements.
