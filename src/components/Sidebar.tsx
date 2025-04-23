import {
  PenLine,
  Bookmark,
  Calendar,
  Archive,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useAppState } from "../hooks/useAppState";
import { Note } from "../types";
import { JSX } from "react";

interface SidebarProps {
  selectedNote: Note | undefined;
}

export default function Sidebar({}: SidebarProps): JSX.Element {
  const {
    sidebarCollapsed,
    toggleSidebar,
    darkMode,
    notes,
    selectedNoteId,
    selectNote,
  } = useAppState();

  return (
    <>
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } flex-shrink-0 border-r transition-all duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="p-4 flex items-center">
          <PenLine className="w-6 h-6 text-blue-500" />
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold ml-2">NoteFlow</h1>
          )}
        </div>

        <nav className="mt-4">
          <ul>
            {[
              {
                icon: <PenLine className="w-5 h-5" />,
                label: "All Notes",
                shortcut: "⌘1",
              },
              {
                icon: <Bookmark className="w-5 h-5" />,
                label: "Favorites",
                shortcut: "⌘2",
              },
              {
                icon: <Calendar className="w-5 h-5" />,
                label: "Recent",
                shortcut: "⌘3",
              },
              {
                icon: <Archive className="w-5 h-5" />,
                label: "Archive",
                shortcut: "⌘4",
              },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  className={`flex items-center ${
                    sidebarCollapsed ? "justify-center" : "justify-between"
                  } px-4 py-3 hover:bg-opacity-10 ${
                    darkMode ? "hover:bg-white" : "hover:bg-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {!sidebarCollapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      {item.shortcut}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-1/2 -right-3 p-1 rounded-full shadow-md ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-700"
          }`}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Note List Overlay when sidebar is expanded */}
      {!sidebarCollapsed && (
        <div
          className={`absolute left-64 top-16 bottom-0 w-64 shadow-lg z-10 overflow-auto ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border-r`}
        >
          <div className="p-4 border-b">
            <h2 className="font-medium">Your Notes</h2>
          </div>
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <button
                  onClick={() => selectNote(note.id)}
                  className={`w-full text-left p-3 border-b ${
                    note.id === selectedNoteId
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-blue-50"
                      : ""
                  } ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                >
                  <h3 className="font-medium truncate">{note.title}</h3>
                  <p
                    className={`text-sm truncate ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {note.content.substring(0, 50)}...
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
