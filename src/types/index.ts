export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface GlobalState {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  selectedNoteId: number;
  setSelectedNoteId: React.Dispatch<React.SetStateAction<number>>;
  currentInput: string;
  setCurrentInput: React.Dispatch<React.SetStateAction<string>>;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showShortcuts: boolean;
  setShowShortcuts: React.Dispatch<React.SetStateAction<boolean>>;
  greeting: string;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  selectNote: (id: number) => void;
}
