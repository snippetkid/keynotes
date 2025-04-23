import { JSX } from "react";
import { AppState } from "../types";

interface ShortcutsModalProps {
  state: AppState;
}

interface Shortcut {
  key: string;
  action: string;
}

export default function ShortcutsModal({
  state,
}: ShortcutsModalProps): JSX.Element {
  const { darkMode, setShowShortcuts } = state;

  const shortcuts: Shortcut[] = [
    { key: "Enter", action: "Add line to note" },
    { key: "Ctrl + Enter", action: "Create new note" },
    { key: "Ctrl + B", action: "Toggle sidebar" },
    { key: "⌘ + F", action: "Search" },
    { key: "⌘ + 1-4", action: "Navigate sections" },
    { key: "⌘ + /", action: "Toggle format menu" },
    { key: "⌘ + B", action: "Bold text" },
    { key: "⌘ + I", action: "Italic text" },
    { key: "Shift + ?", action: "Show this dialog" },
    { key: "Esc", action: "Close dialog/menu" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-lg max-w-md w-full ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
          <button onClick={() => setShowShortcuts(false)} className="text-xl">
            &times;
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {shortcuts.map((shortcut, idx) => (
            <div key={idx} className="flex justify-between p-2">
              <span
                className={`px-2 py-1 rounded font-mono text-sm ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                {shortcut.key}
              </span>
              <span>{shortcut.action}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowShortcuts(false)}
          className={`mt-6 w-full p-2 rounded ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
