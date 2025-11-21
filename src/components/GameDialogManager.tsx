import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { gamePhaseAtom } from "@/atoms/gameAtoms";
import GameDialog from "./GameDialog";
import menu from "@/assets/images/icon-menu.svg";

export default function GameDialogManager() {
  const [isOpen, setIsOpen] = useState(false);
  const gamePhase = useStore(gamePhaseAtom);

  // Automatically open dialog when game ends (win or lose)
  useEffect(() => {
    if (gamePhase === "win" || gamePhase === "lose") {
      setIsOpen(true);
    }
  }, [gamePhase]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-3 text-preset-8 aspect-square h-full rounded-full p-4 text-white duration-150 hover:scale-[1.05]"
      >
        <img src={menu.src} loading="eager" alt="menu" className="h-8 w-8" />
      </button>
      <GameDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
