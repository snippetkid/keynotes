import React, { useRef, useEffect, JSX } from "react";
import { PenLine } from "lucide-react";
import { GlobalState } from "../types";
import InputBar from "./InputBar";

interface NoteInputProps {
  state: GlobalState;
  createNewNote: () => void;
  addLineToCurrentNote: () => void;
}

export default function NoteInput({
  state,
  createNewNote,
  addLineToCurrentNote,
}: NoteInputProps): JSX.Element {
  const {
    greeting,
    currentInput,
    setCurrentInput,
    darkMode,
    setShowShortcuts,
  } = state;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setCurrentInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    // Show shortcuts overlay when pressing '?'
    if (e.key === "?" && e.shiftKey) {
      e.preventDefault();
      setShowShortcuts((prev) => !prev);
    }

    // Create new note with Ctrl+Enter
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      createNewNote();
    }

    // Add line to current note when pressing Enter
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      addLineToCurrentNote();
    }

    // Toggle sidebar with Ctrl+B
    if (e.key === "b" && e.ctrlKey) {
      e.preventDefault();
      state.toggleSidebar();
    }
  };

  return (
    <main className="flex flex-1 p-6 overflow-auto">
      <div className="flex flex-1 flex-col max-w-3xl mx-auto justify-between">
        <div className="flex items-center mb-6"></div>

        {/* <div>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your note here..."
            className={`w-full p-4 h-12 rounded-lg border focus:ring-1 focus:outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-700 focus:ring-gray-600"
                : "bg-white border-gray-300 focus:ring-gray-600"
            }`}
          />

          <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Enter: Add line
            </span>
            <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Ctrl+Enter: New Note
            </span>
            <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Ctrl+B: Toggle Sidebar
            </span>
            <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Shift+?: Help
            </span>
          </div>
        </div> */}

        <InputBar
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={currentInput}
        />
      </div>
    </main>
  );
}
