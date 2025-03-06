import { createElement, FC, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import { BASIC_COMMANDS } from "@/constants/commands";
import { Separator } from "@/components/ui/separator";

interface SlashMenuProps {
  editor: Editor;
  onClose: () => void;
  query: string;
}

const SlashMenu: FC<SlashMenuProps> = ({ editor, onClose, query }) => {
  const commandRefs = useRef<HTMLDivElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredCommands = BASIC_COMMANDS.filter((command) => {
    return command.title.toLowerCase().includes(query?.toLowerCase());
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev: number | null) =>
        prev === null || prev === 0 ? filteredCommands.length - 1 : prev - 1
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev: number | null) =>
        prev === null || prev === filteredCommands.length - 1 ? 0 : prev + 1
      );
    } else if (event.key === "Enter" && selectedIndex !== null) {
      event.preventDefault();
      filteredCommands[selectedIndex]?.action({ editor });
      onClose();
    }
  };

  useEffect(() => {
    if (selectedIndex !== null && commandRefs.current[selectedIndex]) {
      commandRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div
      className="absolute z-50 p-4 md:p-5 w-[90vw] md:w-[27vw] max-h-[350px] md:max-h-[400px] overflow-y-auto rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg transition-all duration-200 ease-in-out"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {filteredCommands.map((command, index) => (
        <div
          key={index}
          onMouseEnter={() => setSelectedIndex(index)}
          onClick={() => {
            command.action({ editor });
            onClose();
          }}
          ref={(el) => (commandRefs.current[index] = el as HTMLDivElement)}
          className={`${
            selectedIndex === index ? "bg-gray-100 text-orange-200" : ""
          } group relative flex flex-col space-y-2 px-3 md:px-4 py-2 md:py-3 rounded-md md:rounded-lg transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <div className="flex-shrink-0 text-gray-600 dark:text-gray-400 text-base md:text-lg group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
              {createElement(command.icon)}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base md:text-lg mb-0.5 md:mb-1 group-hover:text-black dark:group-hover:text-white">
              {command.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300">
              {command.description}
            </p>
            <div className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 font-medium mt-1 md:mt-0">
              {command.shortcut}
            </div>
          </div>
          <Separator className="mt-2 md:mt-3 opacity-60" />
        </div>
      ))}
    </div>
  );
};

export default SlashMenu;
