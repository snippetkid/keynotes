export interface Note {
  id: number;
  title: string;
  content: string;
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
