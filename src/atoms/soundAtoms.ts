import { atom } from "nanostores";

// Sound control atoms
export const isMutedAtom = atom<boolean>(false);
export const bgMusicAtom = atom<HTMLAudioElement | null>(null);

// Sound effect atoms (preloaded)
export const successSoundAtom = atom<HTMLAudioElement | null>(null);
export const wrongSoundAtom = atom<HTMLAudioElement | null>(null);
export const deadSoundAtom = atom<HTMLAudioElement | null>(null);

// Initialize background music (lazy loaded)
export function initBackgroundMusic() {
  if (typeof window === "undefined") return;

  const bgMusic = new Audio(
    "/sounds/653803__josefpres__8-bit-game-loop-004-only-drums-short-120-bpm.wav",
  );
  bgMusic.loop = true;
  bgMusic.volume = 0.3; // Lower volume for background music
  bgMusicAtom.set(bgMusic);
}

// Play background music
export function playBackgroundMusic() {
  const bgMusic = bgMusicAtom.get();
  const isMuted = isMutedAtom.get();

  if (bgMusic && !isMuted) {
    bgMusic.play().catch((err) => {
      console.log("Background music autoplay prevented:", err);
    });
  }
}

// Pause background music
export function pauseBackgroundMusic() {
  const bgMusic = bgMusicAtom.get();
  if (bgMusic) {
    bgMusic.pause();
  }
}

// Toggle mute
export function toggleMute() {
  const currentMuted = isMutedAtom.get();
  const newMuted = !currentMuted;
  isMutedAtom.set(newMuted);

  const bgMusic = bgMusicAtom.get();
  if (bgMusic) {
    if (newMuted) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch((err) => {
        console.log("Background music play prevented:", err);
      });
    }
  }
}

// Initialize sound effects (preload)
export function initSoundEffects() {
  if (typeof window === "undefined") return;

  // Preload success sound
  const successSound = new Audio("/sounds/404359__kagateni__success2.wav");
  successSound.volume = 0.5;
  successSound.preload = "auto";
  successSoundAtom.set(successSound);

  // Preload wrong sound
  const wrongSound = new Audio("/sounds/476177__unadamlar__wrong-choice.wav");
  wrongSound.volume = 0.6;
  wrongSound.preload = "auto";
  wrongSoundAtom.set(wrongSound);

  // Try to preload dead sound
  // Note: .ogg format is not supported in Safari, needs to be converted to .wav
  const deadSound = new Audio();
  deadSound.volume = 0.6;
  deadSound.preload = "auto";

  // Try .wav first (if converted), fallback to wrong sound
  const tryLoadDeadSound = () => {
    // Try dead.wav if it exists
    const testDead = new Audio("/sounds/dead.wav");
    testDead.addEventListener(
      "canplaythrough",
      () => {
        deadSound.src = "/sounds/dead.wav";
        console.log("Dead sound loaded (wav format)");
      },
      { once: true },
    );

    testDead.addEventListener(
      "error",
      () => {
        // Fallback: Use wrong-choice sound with lower pitch effect
        console.warn(
          "dead.wav not found - please convert 703542__yoshicakes77__dead.ogg to dead.wav",
        );
        console.warn("Temporary fallback: using wrong-choice sound");
        deadSound.src = "/sounds/476177__unadamlar__wrong-choice.wav";
        deadSound.playbackRate = 0.7; // Slower playback for different feel
      },
      { once: true },
    );

    testDead.src = "/sounds/dead.wav";
  };

  tryLoadDeadSound();
  deadSoundAtom.set(deadSound);

  console.log("Sound effects initialized");
}

// Play preloaded sound effect
export function playPreloadedSound(soundType: "success" | "wrong" | "dead") {
  if (typeof window === "undefined") return;

  const isMuted = isMutedAtom.get();
  if (isMuted) return;

  let sound: HTMLAudioElement | null = null;

  switch (soundType) {
    case "success":
      sound = successSoundAtom.get();
      break;
    case "wrong":
      sound = wrongSoundAtom.get();
      break;
    case "dead":
      sound = deadSoundAtom.get();
      break;
  }

  if (sound) {
    sound.currentTime = 0; // Reset to start
    sound.play().catch((err) => {
      console.log(`${soundType} sound play prevented:`, err);
    });
  }
}
