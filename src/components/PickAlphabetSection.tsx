import { handleLetterPick, isLetterChosen } from "@/atoms/gameAtoms";

type PickAlphabetSectionProps = {
  options: string[];
};

export default function PickAlphabetSection({
  options,
}: PickAlphabetSectionProps) {
  return (
    <div className="pick-up-section grid flex-1 grid-cols-9 items-center gap-2 p-12">
      {options.map((v) => {
        const isChoosen = isLetterChosen(v);

        return (
          <button
            key={v}
            className="text-preset-8 rounded-2xl border border-solid border-black bg-white p-4 text-indigo-600 duration-150 hover:scale-[1.05] hover:bg-blue-600 disabled:scale-100 disabled:bg-white/20"
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
