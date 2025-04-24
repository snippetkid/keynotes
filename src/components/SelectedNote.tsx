import { AppState, Note } from "../types";
import { NoNotes } from "./NoNotes";
import { useState } from "react";

interface Props {
  state: AppState;
  selectedNote: Note | undefined;
}

export default function SelectedNote({ state, selectedNote }: Props) {
  const { darkMode, notes, setNotes } = state;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingLineId, setEditingId] = useState<number>(0);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, title: e.target.value } : note
      );
      setNotes(updatedNotes);
    }
  };

  console.log("Selected Note:", selectedNote);

  const handleLineChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lineId: number
  ) => {
    if (selectedNote) {
      const updatedLines = selectedNote.lines.map((line) =>
        line.id === lineId ? { ...line, content: e.target.value } : line
      );

      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, lines: updatedLines } : note
      );
      setNotes(updatedNotes);
    }
  };

  if (!selectedNote) {
    return <NoNotes />;
  }

  return (
    <div className="self-center w-full flex-shrink-0 flex flex-col">
      <div className="flex-1 p-6 overflow-auto">
        <div
          className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          {/* Editable Title */}

          {isEditingTitle ? (
            <input
              type="text"
              value={selectedNote.lines[0].content}
              onChange={handleTitleChange}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditingTitle(false);
                }
              }}
              autoFocus
              className="w-full text-xl mb-2 font-medium text-gray-200 bg-transparent border-b border-gray-500 focus:outline-none"
            />
          ) : (
            <h3
              className="text-xl mb-2 font-medium text-gray-200 cursor-pointer"
              onClick={() => setIsEditingTitle(true)}
            >
              {selectedNote.lines[0].content}
            </h3>
          )}

          {/* Editable Lines */}
          {selectedNote.lines.slice(1).map((line, i) => (
            <div key={i} className="my-0.5 text-gray-300 flex items-baseline">
              <span
                className="mr-2 text-sm font-mono text-gray-500"
                style={{
                  lineHeight: "1.5",
                }}
              >
                {line.timestamp}
              </span>
              {editingLineId === line.id ? (
                <input
                  type="text"
                  value={line.content}
                  onChange={(e) => handleLineChange(e, line.id)}
                  onBlur={() => setEditingId(0)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditingId(0);
                    }
                  }}
                  autoFocus
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none text-gray-300"
                  style={{
                    display: "inline-block",
                    lineHeight: "1.5",
                    padding: "0",
                    margin: "0",
                  }}
                />
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => setEditingId(line.id)}
                  style={{
                    display: "inline-block",
                    lineHeight: "1.5",
                  }}
                >
                  {line.content || (
                    <span className="text-gray-400">Empty line</span>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
