import { useState, useEffect } from "react";

export default function KeyboardHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if hint has been shown before
    const hasShownHint = localStorage.getItem("keyboardHintShown");

    if (!hasShownHint) {
      // Show hint after a short delay
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("keyboardHintShown", "true");
  };

  if (!show) return null;

  return (
    <div
      className="animate-fade-in fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      style={{
        animation: "slideUp 0.5s ease-out",
      }}
    >
      <div className="flex items-center gap-3 rounded-2xl border-2 border-blue-600 bg-white px-6 py-4 shadow-lg">
        <div className="flex items-center gap-2">
          <kbd className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 font-mono text-sm font-semibold text-slate-700 shadow-sm">
            A-Z
          </kbd>
          <span className="text-preset-9 text-slate-600">
            使用鍵盤來選擇字母
          </span>
        </div>

        <div className="mx-2 h-6 w-px bg-slate-300"></div>

        <div className="flex items-center gap-2">
          <kbd className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 font-mono text-sm font-semibold text-slate-700 shadow-sm">
            ESC
          </kbd>
          <span className="text-preset-9 text-slate-600">打開選單</span>
        </div>

        <button
          onClick={handleDismiss}
          className="ml-2 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="關閉提示"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
