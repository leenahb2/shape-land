# Celebration recordings

No real child voices or downloaded recordings are included. The games currently use original Web Audio melodies and soft synthetic applause; these are not presented as authentic children cheering. SpeechSynthesis provides the separate solo instructional voice only.

To add recordings you own or are licensed to use:

1. Put short, modest-volume .mp3, .ogg, or .wav recordings in this folder.
2. Add their filenames to manifest.json, for example ["yay.mp3", "woohoo.ogg"]. Do not add URLs, subdirectories, empty files, or filenames for recordings that do not exist.
3. Document each recording's creator, source URL, license, attribution, and any modifications here before shipping it.
4. Check the classroom volume. The player starts at volume 0.28 and stops previous playback before another celebration or instruction.

The manifest is intentionally empty. Missing or unsupported recordings fall back to synthetic celebration. No third-party audio URLs are used at runtime. The system respects the existing Vite base path.
