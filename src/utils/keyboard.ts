import { handleLetterPick, gamePhaseAtom } from "@/atoms/gameAtoms";

/**
 * Initialize keyboard listener for the game
 * Listens for A-Z key presses and triggers letter pick
 *
 * Features:
 * - A-Z keys: Pick letters during gameplay
 * - Escape: Open/close menu (coming soon)
 * - Visual feedback: Highlights the corresponding button
 */
export function initKeyboardListener() {
  // Check if we're in the browser
  if (typeof window === "undefined") {
    return;
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    // Get the current game phase
    const gamePhase = gamePhaseAtom.get();

    // Get the pressed key
    const key = event.key.toLowerCase();

    // Handle letter keys (A-Z) only when game is playing
    if (key.length === 1 && /^[a-z]$/.test(key)) {
      // Only handle when game is playing
      if (gamePhase !== "playing") {
        return;
      }

      // Prevent default behavior (like page search)
      event.preventDefault();

      // Add visual feedback by simulating button click
      highlightButton(key);

      // Trigger the letter pick
      handleLetterPick(key);
    }

    // Handle Escape key to open menu (works in any game phase)
    if (event.key === "Escape") {
      event.preventDefault();
      // Dispatch a custom event that GameDialogManager can listen to
      const menuEvent = new CustomEvent("toggleGameMenu");
      window.dispatchEvent(menuEvent);
    }
  };

  // Add event listener
  window.addEventListener("keydown", handleKeyDown);

  // Show keyboard hint on first load
  showKeyboardHint();

  // Return cleanup function
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}

/**
 * Add visual feedback to the corresponding button when a key is pressed
 */
function highlightButton(letter: string) {
  // Find the button with the matching letter
  const buttons = document.querySelectorAll(".pick-up-section button");

  buttons.forEach((button) => {
    const buttonText = button.textContent?.toLowerCase().trim();

    if (buttonText === letter) {
      // Add a temporary highlight class
      button.classList.add("keyboard-pressed");

      // Remove after animation
      setTimeout(() => {
        button.classList.remove("keyboard-pressed");
      }, 200);
    }
  });
}

/**
 * Show a brief hint about keyboard controls on first load
 */
function showKeyboardHint() {
  // Check if hint has been shown before
  const hasShownHint = sessionStorage.getItem("keyboardHintShown");

  if (!hasShownHint) {
    console.log(
      "💡 Tip: You can use your keyboard (A-Z) to play! Press ESC to open menu.",
    );
    sessionStorage.setItem("keyboardHintShown", "true");
  }
}

/**
 * Check if a key is a valid game key (A-Z)
 */
export function isValidGameKey(key: string): boolean {
  return key.length === 1 && /^[a-z]$/i.test(key);
}
