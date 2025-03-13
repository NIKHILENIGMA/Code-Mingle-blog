import {
  // ChangeEvent,
  FC,
  useState,
} from "react";
import { Editor } from "@tiptap/core";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Languages,
  Mic,
  SwatchBook,
  Wand,
} from "@/Utils/Icons";

interface AISuggestionProps {
  editor: Editor;
}
const AISuggestion: FC<AISuggestionProps> = () => {
  const [menu, setMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    console.log("Button clicked");
    setMenu((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={handleShowMenu}
        className="flex items-center justify-center w-full p-2 space-x-2"
      >
        <Wand />
        Ask AI
      </button>

      {menu ? (
        <div className="absolute w-58 top-full mt-1 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <ol className="py-2">
            <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              <SwatchBook className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Simplify</span>
            </li>
            <li className="relative flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors group">
              <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Tone</span>

              <ol className="absolute left-full top-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Formal</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Informal</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Optimistic</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Friendly</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Assertive</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Curious</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Persuasive</span>
                </li>
              </ol>
            </li>
            <li className="relative flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              <Languages className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Traslation</span>

              <ol className="absolute left-full top-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Chinese</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">English</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">French</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">German</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Greek</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Japanese</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Russian</span>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <Mic className="w-5 h-5 mr-3 text-gray-500 `dark:text-gray-400" />
                  <span className="text-sm font-medium">Spanish</span>
                </li>
              </ol>
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              <ArrowRightToLine className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Make Long</span>
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
              <ArrowLeftToLine className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Make Short</span>
            </li>
          </ol>
        </div>
      ) : null}
    </div>
  );
};

export default AISuggestion;
