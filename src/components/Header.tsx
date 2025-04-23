import React, { JSX } from "react";
import { Menu, Search, Settings } from "lucide-react";
import { GlobalState } from "../types";

interface HeaderProps {
  state: GlobalState;
}

export default function Header({ state }: HeaderProps): JSX.Element {
  const { toggleSidebar, darkMode, toggleDarkMode, setShowShortcuts } = state;

  return (
    <header
      className={`p-4 flex items-center justify-between ${
        darkMode ? "bg-gray-900" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center">
        <Menu onClick={toggleSidebar} className="w-5 h-5 mr-4 cursor-pointer" />
        {/* <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search notes..."
            className={`pl-10 pr-4 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-100 border-gray-200"
            } border`}
          />
        </div> */}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button
          onClick={() => setShowShortcuts(true)}
          className={`p-2 rounded ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          ?
        </button>
        <Settings className="w-5 h-5 cursor-pointer" />
      </div>
    </header>
  );
}
