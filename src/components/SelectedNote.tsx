import { AppState, Note } from "../types";
import { NoNotes } from "./NoNotes";

interface Props {
  state: AppState;
  selectedNote: Note | undefined;
}

export default function SelectedNote({ state, selectedNote }: Props) {
  const { darkMode } = state;

  return (
    <div className="self-center w-full flex-shrink-0 flex flex-col">
      <div className="flex-1 p-6 overflow-auto">
        {selectedNote ? (
          <div>
            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-xl mb-2 font-medium text-gray-200">
                {selectedNote.title}
              </h3>
              {selectedNote.content
                .split("\n")
                .slice(1)
                .map((line, i) => (
                  <p key={i} className="my-0.5 text-gray-300">
                    {line}
                  </p>
                ))}
            </div>
          </div>
        ) : (
          <NoNotes />
        )}
      </div>
    </div>
  );
}
