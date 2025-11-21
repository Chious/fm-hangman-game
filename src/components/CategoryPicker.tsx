import { initializeGame } from "@/utils/game";
import { navigate } from "astro:transitions/client";

interface CategoryPickerProps {
  options: string[];
}

export default function CategoryPicker({ options }: CategoryPickerProps) {
  const handleCategoryClick = (category: string) => {
    // Initialize game with selected category
    const success = initializeGame(category);

    // Only navigate if initialization succeeded
    if (!success) {
      console.error(`Failed to initialize game for category: ${category}`);
      return;
    }

    // Navigate to main game page using View Transitions
    // Nanostores state is preserved in memory during client-side navigation
    navigate("/main");
  };

  return (
    <div className="grid w-screen flex-1 grid-cols-1 gap-4 p-12 md:grid-cols-2 lg:grid-cols-3">
      {options.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className="text-preset-6 shadow-inner-btn2 h-full w-full rounded-2xl bg-blue-600 text-white duration-150 hover:scale-[1.05] hover:cursor-pointer hover:bg-blue-600/95"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
