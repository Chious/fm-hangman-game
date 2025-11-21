import data from "@/constants/data.json";
import {
  categoryAtom,
  answerAtom,
  gamePhaseAtom,
  chosenLettersAtom,
  resetGameState,
} from "@/atoms/gameAtoms";

type Category = keyof typeof data.categories;

type Answer = {
  name: string;
  selected: boolean;
};

/**
 * Get all available categories
 */
export const getCategories = (): Category[] => {
  return Object.keys(data.categories) as Category[];
};

/**
 * Pick a random answer from a specific category
 * @param category - The category to pick from
 * @returns The answer name, or null if category is invalid
 */
export const pickAnswerByCategory = (category: string): string | null => {
  const validCategories = getCategories();

  // Check if category is valid
  if (!validCategories.includes(category as Category)) {
    console.error(`Invalid category: ${category}`);
    return null;
  }

  // Get all answers from the category
  const answers = data.categories[category as Category];

  if (!answers || answers.length === 0) {
    console.error(`No answers found for category: ${category}`);
    return null;
  }

  // Pick a random answer
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex].name;
};

/**
 * Get all answers from a specific category
 * @param category - The category to get answers from
 * @returns Array of answers, or empty array if category is invalid
 */
export const getAnswersByCategory = (category: string): Answer[] => {
  const validCategories = getCategories();

  if (!validCategories.includes(category as Category)) {
    return [];
  }

  return data.categories[category as Category] || [];
};

/**
 * Initialize a new game with a selected category
 * Resets game state and picks a random answer from the category
 * Reveals 20-30% of unique letters at the start
 * @param category - The category to start the game with
 * @returns true if successful, false if failed
 */
export const initializeGame = (category: string): boolean => {
  // Reset previous game state
  resetGameState();

  // Validate and set category
  const validCategories = getCategories();
  if (!validCategories.includes(category as Category)) {
    console.error(`Invalid category: ${category}`);
    return false;
  }

  // Pick a random answer
  const pickedAnswer = pickAnswerByCategory(category);
  if (!pickedAnswer) {
    console.error(`Failed to pick answer for category: ${category}`);
    return false;
  }

  // Get all unique alphabetic letters from the answer
  const allLetters = pickedAnswer
    .toLowerCase()
    .split("")
    .filter((char) => /[a-z]/.test(char));
  const uniqueLetters = Array.from(new Set(allLetters));

  // Randomly reveal 20-30% of unique letters at the start (minimum 4 letters)
  const revealPercentage = 0.2 + Math.random() * 0.1; // 20-30%
  const revealCount = Math.max(
    3,
    Math.floor(uniqueLetters.length * revealPercentage),
  );

  // Shuffle and take first N letters
  const shuffled = [...uniqueLetters].sort(() => Math.random() - 0.5);
  const initialLetters = new Set(shuffled.slice(0, revealCount));

  // Set game state
  categoryAtom.set(category);
  answerAtom.set(pickedAnswer);
  chosenLettersAtom.set(initialLetters);
  gamePhaseAtom.set("playing");

  console.log(`Game initialized: ${category} - ${pickedAnswer}`);
  console.log(`Initial revealed letters:`, Array.from(initialLetters));
  return true;
};

/**
 * Initialize a new game with a random category
 * @returns true if successful, false if failed
 */
export const initializeRandomGame = (): boolean => {
  // Get all available categories
  const categories = getCategories();

  if (categories.length === 0) {
    console.error("No categories available");
    return false;
  }

  // Pick a random category
  const randomIndex = Math.floor(Math.random() * categories.length);
  const randomCategory = categories[randomIndex];

  // Initialize game with random category
  return initializeGame(randomCategory);
};
