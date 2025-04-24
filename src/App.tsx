import NoteInput from "./components/NoteInput";
import SelectedNote from "./components/SelectedNote";
import { useAppState } from "./hooks/useAppState";
import { Note } from "./types";

export default function App() {
  const {
    notes,
    setNotes,
    selectedNoteId,
    setSelectedNoteId,
    currentInput,
    setCurrentInput,
  } = useAppState();

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

  return (
    <div
      className={`flex h-screen ${
        useAppState.getState().darkMode
          ? "bg-gray-900 text-gray-100"
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
        />
      </div>

      {/* <NotePreview
        state={useGlobalState.getState()}
        selectedNote={selectedNote}
      /> */}

      {/* {showShortcuts && <ShortcutsModal state={useGlobalState.getState()} />} */}
    </div>
  );
}
