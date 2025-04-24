import React, { useRef, useEffect } from "react";
import { AppState, Shortcuts } from "../types";
import InputBar from "./InputBar";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
  state: AppState;
  createNewNote: () => void;
  addLineToCurrentNote: () => void;
  onHotKeyDown: (shortcut: Shortcuts) => void;
}

export default function NoteInput({
  state,
  createNewNote,
  addLineToCurrentNote,
  onHotKeyDown,
}: Props) {
  const { currentInput, setCurrentInput, setShowShortcuts, showShortcuts } =
    state;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useHotkeys(
    Shortcuts.DELETE_LAST_LINE,
    () => {
      console.log("DELETE_LAST_LINE");
      onHotKeyDown(Shortcuts.DELETE_LAST_LINE);
    },
    { enableOnFormTags: true },
    [inputRef]
  );

  useHotkeys(
    Shortcuts.DELETE_NOTE,
    () => onHotKeyDown(Shortcuts.DELETE_NOTE),
    { enableOnFormTags: true },
    [inputRef]
  );

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
      setShowShortcuts(!showShortcuts);
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
  };

  return (
    <main className="flex flex-1 p-6 overflow-auto">
      <div className="flex flex-1 flex-col max-w-3xl mx-auto justify-between">
        <div className="flex items-center mb-6"></div>

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
