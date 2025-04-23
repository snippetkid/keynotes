import { JSX } from "react";

export default function Header(): JSX.Element {
  // const { toggleSidebar, darkMode, toggleDarkMode, setShowShortcuts } =
  //   useGlobalState();

  return (
    <header
      className={`p-4 flex items-center justify-between ${
        true ? "bg-gray-900" : "bg-white border-gray-200"
      }`}
    >
      {/* Header content */}
    </header>
  );
}
