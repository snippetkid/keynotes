// src/components/NotePreview.tsx
import React, { JSX } from "react";
import { GlobalState, Note } from "../types";

interface NotePreviewProps {
  state: GlobalState;
  selectedNote: Note | undefined;
}

export default function NotePreview({
  state,
  selectedNote,
}: NotePreviewProps): JSX.Element {
  const { darkMode } = state;

  return (
    <div
      className={`w-1/3 flex-shrink-0 flex flex-col ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <header
        className={`p-4 border-b ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-lg font-medium">Current Note</h2>
      </header>

      <div className="flex-1 p-6 overflow-auto">
        {selectedNote ? (
          <div>
            <h3 className="text-xl font-bold mb-4">{selectedNote.title}</h3>
            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              {selectedNote.content.split("\n").map((line, i) => (
                <p key={i} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">No note selected</div>
        )}
      </div>
    </div>
  );
}
