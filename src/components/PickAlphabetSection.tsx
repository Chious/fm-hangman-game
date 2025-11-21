import {
  handleLetterPick,
  isLetterChosen,
  lastPickResultAtom,
  lastPickedLetterAtom,
} from "@/atoms/gameAtoms";
import { useStore } from "@nanostores/react";

type PickAlphabetSectionProps = {
  options: string[];
};

export default function PickAlphabetSection({
  options,
}: PickAlphabetSectionProps) {
  const lastPickResult = useStore(lastPickResultAtom);
  const lastPickedLetter = useStore(lastPickedLetterAtom);

  return (
    <div className="pick-up-section grid flex-1 grid-cols-9 items-center gap-2 p-12">
      <style>
        {`
          @keyframes flashButton {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>
      {options.map((v) => {
        const isChoosen = isLetterChosen(v);
        const isLastPicked = lastPickedLetter === v.toLowerCase();
        const shouldFlash = isLastPicked && lastPickResult;

        return (
          <button
            key={v}
            className={`text-preset-8 rounded-2xl border-2 border-solid bg-white p-4 text-indigo-600 transition-all duration-150 hover:scale-[1.05] hover:bg-blue-600 disabled:scale-100 disabled:bg-white/20 ${
              shouldFlash && lastPickResult === "correct"
                ? "border-green-400 shadow-lg ring-4 shadow-green-400/50 ring-green-400"
                : shouldFlash && lastPickResult === "wrong"
                  ? "border-red-500 shadow-lg ring-4 shadow-red-500/50 ring-red-500"
                  : "border-black"
            }`}
            style={{
              animation: shouldFlash ? "flashButton 0.6s ease-in-out" : "none",
            }}
            onClick={() => {
              handleLetterPick(v);
            }}
            disabled={isChoosen}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}
