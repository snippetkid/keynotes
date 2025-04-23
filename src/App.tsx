import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";

import NoteInput from "./components/NoteInput";
import NotePreview from "./components/NotePreview";
import ShortcutsModal from "./components/ShortcutsModal";
import { createGlobalState } from "./state/globalState";
import { Note } from "./types";
import Header from "./components/Header";

export default function App(): JSX.Element {
  // Global state
  const [greeting, setGreeting] = useState<string>("");
  const [currentInput, setCurrentInput] = useState<string>("");
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Welcome Note",
      content:
        "Welcome to your new note-taking app!\n\nUse Ctrl+Enter to create new notes.\nPress Shift+? for keyboard shortcuts.",
    },
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState<number>(1);

  // Generate greeting based on time of day
  useEffect(() => {
    const getCurrentGreeting = (): string => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good morning";
      if (hour < 18) return "Good afternoon";
      return "Good evening";
    };

    setGreeting(getCurrentGreeting());
  }, []);

  // Create state and handlers to pass to components
  const state = createGlobalState({
    notes,
    setNotes,
    selectedNoteId,
    setSelectedNoteId,
    currentInput,
    setCurrentInput,
    sidebarCollapsed,
    setSidebarCollapsed,
    darkMode,
    setDarkMode,
    showShortcuts,
    setShowShortcuts,
    greeting,
  });

  const createNewNote = (): void => {
    if (currentInput.trim()) {
      const newNote: Note = {
        id: Date.now(),
        title: currentInput || "Untitled Note",
        content: currentInput,
      };

      setNotes([newNote, ...notes]);
      setSelectedNoteId(newNote.id);
      setCurrentInput("");
    }
  };

  const addLineToCurrentNote = (): void => {
    if (currentInput.trim()) {
      const selectedNote = notes.find((note) => note.id === selectedNoteId);

      if (selectedNote) {
        const updatedNotes = notes.map((note) => {
          if (note.id === selectedNoteId) {
            return {
              ...note,
              content: note.content + "\n" + currentInput,
            };
          }
          return note;
        });

        setNotes(updatedNotes);
        setCurrentInput("");
      } else {
        // If no note is selected, create a new one
        createNewNote();
      }
    }
  };

  const selectedNote =
    notes.find((note) => note.id === selectedNoteId) || notes[0];

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* <Sidebar state={state} selectedNote={selectedNote} /> */}

      <div className="flex-1 flex flex-col border-r">
        {/* <Header state={state} /> */}
        <NoteInput
          state={state}
          createNewNote={createNewNote}
          addLineToCurrentNote={addLineToCurrentNote}
        />
      </div>

      {/* <NotePreview state={state} selectedNote={selectedNote} /> */}

      {showShortcuts && <ShortcutsModal state={state} />}
    </div>
  );
}
