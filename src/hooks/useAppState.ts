import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppState } from "../types";

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "app-state", // Key for localStorage
      partialize: (state) => ({
        notes: state.notes,
        selectedNoteId: state.selectedNoteId,
        darkMode: state.darkMode,
      }), // Persist only specific parts of the state
    }
  )
);
