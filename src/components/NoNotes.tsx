import { Bird } from "lucide-react";

export const NoNotes = () => {
  return (
    <div>
      <Bird className="w-24 h-24 text-gray-600 mx-auto mt-10" />
      <h2 className="text-center text-gray-700 mt-4">
        It's empty here. Let's add some notes.
      </h2>
    </div>
  );
};
