import {
  Plus,
  Search,
  HelpCircle,
  ChevronUp,
  SendHorizonal,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  ref: React.RefObject<HTMLTextAreaElement | null>;
}

const ChatInputBar = ({ value, onChange, onKeyDown, ref }: Props) => {
  return (
    <div className="flex flex-col border rounded-xl px-2 py-2 gap-2 bg-gray-800 border-gray-700 shadow-sm w-full max-w-3xl">
      <div className="flex items-center">
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="flex-1 text-gray-300 resize-none rounded-lg p-2 text-sm focus:outline-none focus:ring-0 focus:ring-blue-500 min-h-[40px] max-h-[150px] overflow-auto placeholder-gray-500"
          rows={1}
          placeholder="Add a note..."
        />
        <SendHorizonal className="w-5 h-5 text-gray-600 mb-2 mr-3" />
      </div>

      <div>
        <button className="p-2 rounded-lg">
          <Plus className="w-5 h-5 text-gray-400" />
        </button>

        <button className="p-2  rounded-lg">
          <Search className="w-5 h-5 text-gray-400" />
        </button>

        <button className="p-2  rounded-lg">
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </button>

        <button className="p-2 rounded-lg">
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatInputBar;
