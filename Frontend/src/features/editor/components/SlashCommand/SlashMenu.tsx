import { createElement, FC, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import { BASIC_COMMANDS } from "@/constants/commands";

interface SlashMenuProps {
  editor: Editor;
  onClose: () => void;
  query: string;
}

const SlashMenu: FC<SlashMenuProps> = ({ editor, onClose, query }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const commandRefs = useRef<HTMLDivElement[]>([]);

  const filteredCommands = BASIC_COMMANDS.filter((command) => {
    return command.title.toLowerCase().includes(query?.toLowerCase());
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    setIsKeyboardNavigation(true);
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
    if (
      isKeyboardNavigation &&
      selectedIndex !== null &&
      commandRefs.current[selectedIndex]
    ) {
      commandRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex, isKeyboardNavigation]);

  return (
    <div
      className="absolute z-50 p-4 md:p-5 w-[90vw] md:w-[27vw] max-h-[400px] overflow-y-auto rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg transition-all duration-200 ease-in-out hide-scrollbar"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {Object.entries(
        filteredCommands.reduce((acc, command) => {
          if (!acc[command.group]) acc[command.group] = [];
          acc[command.group].push(command);
          return acc;
        }, {} as Record<string, typeof filteredCommands>)
      ).map(([group, commands]) => (
        <div key={group} className="mb-4">
          {/* Group Title */}
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            {group}
          </h4>

          {/* Command List */}
          <div className="space-y-2">
            {commands.map((command, index) => (
              <div
                key={index}
                data-id={command.title}
                onMouseEnter={() => {
                  setIsKeyboardNavigation(false); // Mark as mouse-driven
                  setSelectedIndex(index);
                }}
                onClick={() => {
                  command.action({ editor });
                  onClose();
                }}
                ref={(el) =>
                  (commandRefs.current[index] = el as HTMLDivElement)
                }
                className={`${
                  selectedIndex === index ? "bg-gray-100 dark:bg-gray-800" : ""
                } flex items-center space-x-4 p-3 rounded-lg transition-all duration-150 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60`}
              >
                {/* Icon Box */}
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700">
                  <div className="text-gray-600 dark:text-gray-300">
                    {createElement(command.icon)}
                  </div>
                </div>

                {/* Command Details */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {command.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {command.description}
                  </p>
                </div>

                {/* Shortcut Key */}
                {command.shortcut && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {command.shortcut}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlashMenu;
