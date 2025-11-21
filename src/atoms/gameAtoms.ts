import { atom } from "nanostores";
import { playPreloadedSound } from "./soundAtoms";

export type GamePhase = "idle" | "playing" | "win" | "lose" | "revealing";

// Initialize atoms with default values
export const categoryAtom = atom<string>("");
export const answerAtom = atom<string>("");
export const chosenLettersAtom = atom<Set<string>>(new Set());
export const hpAtom = atom<number>(6);
export const gamePhaseAtom = atom<GamePhase>("idle");
export const lastPickResultAtom = atom<"correct" | "wrong" | null>(null);
export const lastPickedLetterAtom = atom<string | null>(null);

export function resetGameState() {
  categoryAtom.set("");
  answerAtom.set("");
  chosenLettersAtom.set(new Set());
  hpAtom.set(6);
  gamePhaseAtom.set("idle");
  lastPickResultAtom.set(null);
  lastPickedLetterAtom.set(null);
}

/**
 * Handle letter click - main game logic
 * 1. Check if letter is already chosen
 * 2. Add letter to chosen set
 * 3. Check if letter is in answer
 * 4. If not in answer, decrease HP
 * 5. Check win/lose conditions
 */
export function handleLetterPick(letter: string) {
  const normalizedLetter = letter.toLowerCase().trim();

  // Ignore if game is not in playing state
  if (gamePhaseAtom.get() !== "playing") {
    return;
  }

  // Ignore if letter already chosen
  const currentChosen = chosenLettersAtom.get();
  if (currentChosen.has(normalizedLetter)) {
    return;
  }

  // Add letter to chosen set
  const newChosen = new Set(currentChosen);
  newChosen.add(normalizedLetter);
  chosenLettersAtom.set(newChosen);

  // Track the last picked letter for animation
  lastPickedLetterAtom.set(normalizedLetter);

  // Check if letter is in answer
  const answer = answerAtom.get().toLowerCase();
  const isCorrect = answer.includes(normalizedLetter);

  if (!isCorrect) {
    // Wrong guess - decrease HP
    lastPickResultAtom.set("wrong");
    playPreloadedSound("wrong");

    const currentHp = hpAtom.get();
    const newHp = Math.max(0, currentHp - 1);
    hpAtom.set(newHp);

    // Check lose condition
    if (newHp === 0) {
      // Reveal answer before showing lose dialog
      revealAnswerThenSetPhase("lose");
      return;
    }

    // Reset the last pick result after animation
    setTimeout(() => {
      lastPickResultAtom.set(null);
      lastPickedLetterAtom.set(null);
    }, 600);
  } else {
    // Correct guess
    lastPickResultAtom.set("correct");
    playPreloadedSound("success");

    // Reset the last pick result after animation
    setTimeout(() => {
      lastPickResultAtom.set(null);
      lastPickedLetterAtom.set(null);
    }, 600);
  }

  // Check win condition - all letters in answer are found
  checkWinCondition();
}

/**
 * Reveal the answer briefly before transitioning to win/lose phase
 */
function revealAnswerThenSetPhase(phase: "win" | "lose") {
  // Set to revealing phase
  gamePhaseAtom.set("revealing");

  // Play appropriate sound
  if (phase === "lose") {
    playPreloadedSound("dead");
  } else {
    playPreloadedSound("success");
  }

  // Show all letters by adding them to chosen letters
  const answer = answerAtom.get().toLowerCase();
  const allLetters = new Set(
    answer.split("").filter((char) => /[a-z]/.test(char)),
  );
  chosenLettersAtom.set(allLetters);

  // After 2 seconds, show the dialog
  setTimeout(() => {
    gamePhaseAtom.set(phase);
  }, 2000);
}

/**
 * Check if player has won by finding all letters in the answer
 */
function checkWinCondition() {
  const answer = answerAtom.get().toLowerCase();
  const chosenLetters = chosenLettersAtom.get();

  // Get all unique letters in the answer (only alphabetic characters)
  const answerLetters = new Set(
    answer.split("").filter((char) => /[a-z]/.test(char)),
  );

  // Check if all answer letters have been chosen
  const allFound = Array.from(answerLetters).every((letter) =>
    chosenLetters.has(letter),
  );

  if (allFound) {
    revealAnswerThenSetPhase("win");
  }
}

/**
 * Check if a letter has been chosen
 */
export function isLetterChosen(letter: string): boolean {
  return chosenLettersAtom.get().has(letter.toLowerCase());
}

/**
 * Check if a letter is in the answer (for revealing correct letters)
 */
export function isLetterInAnswer(letter: string): boolean {
  return answerAtom.get().toLowerCase().includes(letter.toLowerCase());
}
