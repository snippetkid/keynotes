import { Bird } from "lucide-react";

export const NoNotes = () => {
  return (
    <div>
      <Bird className="w-16 h-16 text-gray-400 mx-auto mt-10" />
      <h2 className="text-center text-gray-500 mt-4">No notes available</h2>
    </div>
  );
};
