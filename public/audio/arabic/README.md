# Arabic recordings — future integration only

Arabic playback is temporarily disabled in `src/arabic/ArabicAudio.js`. No speech synthesis, effects, cheering, clips, audio-context creation or manifest fetching occurs. Adding files here does not enable playback. All instructions and feedback stay visible as written Arabic text.

The empty manifest is retained as a future integration point for reviewed, correctly pronounced, licensed Arabic recordings. A future implementation must explicitly replace the silent category adapter and add tests before enabling playback. It should use only locally owned/licensed `.mp3`, `.ogg`, or `.wav` assets, preserve license documentation, and never fall back to speech synthesis without a separate product decision.

Reserved manifest keys: `<game>-<target Unicode code point in decimal>` or `complete`, e.g. `hunt-1576` for ب. No recordings are bundled or claimed.
