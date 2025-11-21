import { useStore } from "@nanostores/react";
import { categoryAtom, hpAtom } from "@/atoms/gameAtoms";
import { isMutedAtom, toggleMute } from "@/atoms/soundAtoms";
import GameDialogManager from "./GameDialogManager";
import heart from "@/assets/images/icon-heart.svg";

interface GameNavbarProps {
  isHPVisible?: boolean;
}

export default function GameNavbar({ isHPVisible = false }: GameNavbarProps) {
  const category = useStore(categoryAtom);
  const hp = useStore(hpAtom);
  const isMuted = useStore(isMutedAtom);
  const maxHp = 6;
  const hpPercentage = (hp / maxHp) * 100;

  return (
    <nav className="flex w-full items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-2">
        <GameDialogManager />
        <button
          onClick={toggleMute}
          className="rounded-xl bg-transparent p-3 text-white transition-all duration-150 hover:scale-[1.05] hover:bg-white/30"
          aria-label={isMuted ? "Unmute" : "Mute"}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>
      </div>
      <h1 className="text-preset-7 md:text-preset-4 lg:text-preset-1 text-gradient-2 flex-1 stroke-slate-600 text-center">
        {category || "Pick a Category"}
      </h1>
      {isHPVisible && (
        <div className="flex w-60 items-center gap-4">
          <div className="flex-1 rounded-2xl bg-white p-2">
            <div
              className="h-3 rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
          <img src={heart.src} alt="hp" loading="eager"></img>
        </div>
      )}
    </nav>
  );
}
