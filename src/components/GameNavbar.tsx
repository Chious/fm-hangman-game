import { useStore } from "@nanostores/react";
import { categoryAtom, hpAtom } from "@/atoms/gameAtoms";
import GameDialogManager from "./GameDialogManager";
import heart from "@/assets/images/icon-heart.svg";

interface GameNavbarProps {
  isHPVisible?: boolean;
}

export default function GameNavbar({ isHPVisible = false }: GameNavbarProps) {
  const category = useStore(categoryAtom);
  const hp = useStore(hpAtom);
  const maxHp = 6;
  const hpPercentage = (hp / maxHp) * 100;

  return (
    <nav className="flex w-full items-center justify-between gap-4 p-4">
      <GameDialogManager />
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
