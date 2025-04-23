import { create } from "zustand";
import { GlobalState } from "../types";

export const useGlobalState = create<GlobalState>((set, get) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  selectedNoteId: 1,
  setSelectedNoteId: (id) => set({ selectedNoteId: id }),
  currentInput: "",
  setCurrentInput: (input) => set({ currentInput: input }),
  sidebarCollapsed: true,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  darkMode: true,
  setDarkMode: (mode) => set({ darkMode: mode }),
  showShortcuts: false,
  setShowShortcuts: (show) => set({ showShortcuts: show }),
  greeting: "",
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  selectNote: (id) => set({ selectedNoteId: id }),
}));
