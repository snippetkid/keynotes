import { Bird } from "lucide-react";

export const NoNotes = () => {
  return (
    <div>
      <Bird className="w-24 h-24 text-gray-500 mx-auto mt-10" />
      <h2 className="text-center text-gray-700 mt-4">No notes available</h2>
    </div>
  );
};
