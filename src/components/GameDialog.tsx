import { useStore } from "@nanostores/react";
import { gamePhaseAtom, categoryAtom, resetGameState } from "@/atoms/gameAtoms";
import { initializeGame } from "@/utils/game";
import { navigate } from "astro:transitions/client";
import { useEffect, useRef, useState } from "react";
import "./GameDialog.css";

interface GameDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameDialog({ isOpen, onClose }: GameDialogProps) {
  const gamePhase = useStore(gamePhaseAtom);
  const category = useStore(categoryAtom);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showCredits, setShowCredits] = useState(false);

  // Sync dialog open/close with isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Handle backdrop click to close
  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInDialog) {
      onClose();
    }
  };

  const handleContinue = () => {
    onClose();
  };

  const handlePlayAgain = () => {
    // Reinitialize game with same category
    if (category) {
      const success = initializeGame(category);
      if (success) {
        onClose();
      }
    }
  };

  const handleNewCategory = () => {
    resetGameState();
    navigate("/pick");
  };

  const handleQuitGame = () => {
    resetGameState();
    navigate("/");
  };

  // Determine dialog title based on game phase
  const getDialogTitle = () => {
    if (showCredits) return "Credits";
    switch (gamePhase) {
      case "win":
        return "You Win!";
      case "lose":
        return "You Lose!";
      default:
        return "Paused";
    }
  };

  const handleShowCredits = () => {
    setShowCredits(true);
  };

  const handleBackFromCredits = () => {
    setShowCredits(false);
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      className="fixed top-1/2 left-1/2 m-0 h-fit max-h-[80vh] w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border-none bg-indigo-600 px-8 py-20 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <h2 className="text-preset-3 text-gradient-2 text-stroke text-stroke-4 text-stroke-color-243041 absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
        {getDialogTitle()}
      </h2>

      {showCredits ? (
        <div className="flex w-full flex-col gap-4">
          <div className="max-h-96 space-y-4 overflow-y-auto rounded-xl bg-blue-900/30 p-4 text-left text-sm text-white">
            <h3 className="mb-2 text-lg font-bold">Sound Effects</h3>

            <div className="space-y-2">
              <p className="font-semibold">1. Dead Sound</p>
              <p className="text-xs opacity-90">
                by Yoshicakes77
                <br />
                License: Attribution 4.0
                <br />
                <a
                  href="https://freesound.org/s/703542/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-300"
                >
                  https://freesound.org/s/703542/
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">2. Success Sound</p>
              <p className="text-xs opacity-90">
                by Kagateni
                <br />
                License: Creative Commons 0<br />
                <a
                  href="https://freesound.org/s/404359/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-300"
                >
                  https://freesound.org/s/404359/
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">3. Background Music</p>
              <p className="text-xs opacity-90">
                8 bit game loop 004 only drums short 120 bpm
                <br />
                by josefpres
                <br />
                License: Creative Commons 0<br />
                <a
                  href="https://freesound.org/s/653803/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-300"
                >
                  https://freesound.org/s/653803/
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">4. Wrong Choice Sound</p>
              <p className="text-xs opacity-90">
                by unadamlar
                <br />
                License: Creative Commons 0<br />
                <a
                  href="https://freesound.org/s/476177/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-300"
                >
                  https://freesound.org/s/476177/
                </a>
              </p>
            </div>
          </div>

          <button
            onClick={handleBackFromCredits}
            className="text-preset-9 shadow-inner-btn2 rounded-2xl bg-blue-600 py-3 text-white uppercase hover:bg-blue-600/90"
          >
            Back
          </button>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4">
          {gamePhase === "playing" && (
            <button
              onClick={handleContinue}
              className="text-preset-9 shadow-inner-btn2 rounded-2xl bg-blue-600 py-3 text-white uppercase hover:bg-blue-600/90"
            >
              Continue
            </button>
          )}
          <button
            onClick={handlePlayAgain}
            className="text-preset-9 shadow-inner-btn2 rounded-2xl bg-blue-600 py-3 text-white uppercase hover:bg-blue-600/90"
          >
            Play Again
          </button>
          <button
            onClick={handleNewCategory}
            className="text-preset-9 shadow-inner-btn2 rounded-2xl bg-blue-600 py-3 text-white uppercase hover:bg-blue-600/90"
          >
            New Category
          </button>
          <button
            onClick={handleShowCredits}
            className="text-preset-9 shadow-inner-btn2 rounded-2xl bg-blue-600 py-3 text-white uppercase hover:bg-blue-600/90"
          >
            Credits
          </button>
          <button
            onClick={handleQuitGame}
            className="bg-gradient-3 text-preset-9 rounded-2xl py-3 text-white uppercase duration-150 hover:scale-[1.02]"
          >
            Quit Game
          </button>
        </div>
      )}
    </dialog>
  );
}
