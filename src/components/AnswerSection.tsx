import {
  answerAtom,
  chosenLettersAtom,
  gamePhaseAtom,
} from "@/atoms/gameAtoms";
import { initializeRandomGame } from "@/utils/game";
import { useStore } from "@nanostores/react";

export default function AnswerSection() {
  const answer = useStore(answerAtom);
  const chosenLetters = useStore(chosenLettersAtom);
  const answerWords = answer.toUpperCase().split(" ");

  const gamePhase = useStore(gamePhaseAtom);
  console.log("gamePhase", gamePhase);

  // Check if a letter should be visible
  const isLetterVisible = (letter: string): boolean => {
    const lowerLetter = letter.toLowerCase();

    // Always show non-alphabetic characters (spaces, hyphens, etc.)
    if (!/[a-z]/i.test(letter)) {
      return true;
    }

    // Show if letter has been chosen
    return chosenLetters.has(lowerLetter);
  };

  if (!answer || answer.length === 0) {
    return (
      <div className="answer-section flex w-full flex-1 flex-col items-center justify-center gap-4">
        <h2 className="text-preset-4 text-gradient-2 text-center">
          Loading...
        </h2>
        <button
          className="bg-gradient-3 text-preset-8 w-fit rounded-md p-4 text-white duration-150 hover:scale-[1.05]"
          onClick={initializeRandomGame}
        >
          Get Lost?
        </button>
      </div>
    );
  }

  return (
    <div className="answer-section flex w-full flex-1 flex-col justify-center gap-2 px-4 md:gap-4 md:px-0">
      {answerWords.map((word, wordIndex) => (
        <div
          key={`word-${wordIndex}-${word}`}
          className="flex flex-wrap justify-center gap-1 md:gap-2"
        >
          {Array.from(word).map((letter, letterIndex) => {
            const visible = isLetterVisible(letter);

            return (
              <button
                key={`letter-${wordIndex}-${letterIndex}-${letter}`}
                className="text-preset-8 min-w-10 rounded-2xl bg-blue-600 px-2 py-2 text-white hover:cursor-pointer disabled:bg-blue-600/20 md:min-w-16 md:px-4"
                disabled
              >
                {visible ? letter : "\u00A0"}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
