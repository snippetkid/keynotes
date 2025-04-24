import { useHotkeys } from "react-hotkeys-hook";
import NoteInput from "./components/NoteInput";
import SelectedNote from "./components/SelectedNote";
import { useAppState } from "./hooks/useAppState";
import { Note, Shortcuts } from "./types";

export default function App() {
  const {
    notes,
    setNotes,
    selectedNoteId,
    setSelectedNoteId,
    currentInput,
    setCurrentInput,
  } = useAppState();

  useHotkeys(Shortcuts.DELETE_LAST_LINE, () =>
    onHotKeyDown(Shortcuts.DELETE_LAST_LINE)
  );
  useHotkeys(Shortcuts.DELETE_NOTE, () => onHotKeyDown(Shortcuts.DELETE_NOTE));

  const createNewNote = (): void => {
    if (currentInput.trim()) {
      const newNote: Note = {
        id: Date.now(),
        lines: [
          {
            id: Date.now(),
            content: currentInput,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      };

      setNotes([newNote, ...notes]);
      setSelectedNoteId(newNote.id);
      setCurrentInput("");
    }
  };

  const deleteNote = (): void => {
    const updatedNotes = notes.filter((note) => note.id !== selectedNoteId);
    setNotes(updatedNotes);
  };

  const deleteLastLine = (): void => {
    const selectedNote = notes.find((note) => note.id === selectedNoteId);
    if (selectedNote) {
      const updatedLines = selectedNote.lines.slice(0, -1);
      const updatedNotes = notes.map((note) =>
        note.id === selectedNoteId ? { ...note, lines: updatedLines } : note
      );
      setNotes(updatedNotes);
    }
  };

  const addLineToCurrentNote = (): void => {
    if (currentInput.trim()) {
      const selectedNote = notes.find((note) => note.id === selectedNoteId);

      if (selectedNote) {
        const updatedNotes = notes.map((note) =>
          note.id === selectedNoteId
            ? {
                ...note,
                content: note.lines.push({
                  id: Date.now(),
                  content: currentInput,
                  timestamp: new Date().toLocaleTimeString(),
                }),
              }
            : note
        );

        setNotes(updatedNotes);
        setCurrentInput("");
      } else {
        createNewNote();
      }
    }
  };

  const selectedNote =
    notes.find((note) => note.id === selectedNoteId) || notes[0];

  const onHotKeyDown = (shortcut: Shortcuts): void => {
    switch (shortcut) {
      case Shortcuts.DELETE_LAST_LINE:
        console.log("DELETE_LAST_LINE");
        deleteLastLine();
        break;
      case Shortcuts.DELETE_NOTE:
        deleteNote();
        break;
    }
  };

  return (
    <div
      className={`flex h-screen ${
        useAppState.getState().darkMode
          ? "bg-slate-950 text-gray-100"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex-1 flex flex-col">
        <SelectedNote
          state={useAppState.getState()}
          selectedNote={selectedNote}
        />
        <NoteInput
          state={useAppState.getState()}
          createNewNote={createNewNote}
          addLineToCurrentNote={addLineToCurrentNote}
          onHotKeyDown={onHotKeyDown}
        />
      </div>

      {/* <Shortcut key={"jmlwl"} action="Delete note" /> */}
    </div>
  );
}
