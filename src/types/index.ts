export interface Note {
  id: number;
  lines: Line[];
}

export interface Line {
  id: number;
  content: string;
  timestamp: string;
}

export interface AppState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  selectedNoteId: number;
  setSelectedNoteId: (id: number) => void;
  currentInput: string;
  setCurrentInput: (input: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  showShortcuts: boolean;
  setShowShortcuts: (show: boolean) => void;
  greeting: string;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  selectNote: (id: number) => void;
}

export enum Shortcuts {
  NEW_NOTE = "ctrl+n",
  DELETE_NOTE = "ctrl+d",
  DELETE_LAST_LINE = "ctrl+backspace",
  TOGGLE_SIDEBAR = "ctrl+b",
  TOGGLE_DARK_MODE = "ctrl+m",
  SHOW_SHORTCUTS = "ctrl+shift+h",
  ADD_LINE = "enter",
  EDIT_LINE = "f2",
  DELETE_LINE = "backspace",
}
