import { GlobalState } from "../types";

type GlobalStateInput = Omit<
  GlobalState,
  "toggleSidebar" | "toggleDarkMode" | "selectNote"
>;

export const createGlobalState = (state: GlobalStateInput): GlobalState => {
  return {
    ...state,
    toggleSidebar: () => state.setSidebarCollapsed(!state.sidebarCollapsed),
    toggleDarkMode: () => state.setDarkMode(!state.darkMode),
    selectNote: (id: number) => state.setSelectedNoteId(id),
  };
};
