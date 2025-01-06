import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React, { useCallback } from "react";
import { Editor } from "@tiptap/core";

interface CommandProps {
  title: string;
  command: ({ editor }: { editor: Editor }) => void;
  description?: string;
  icon?: React.ComponentType;
}

interface SlashCommandsMenuProps {
  editor: Editor;
  commands: CommandProps[];
  onCloseMenu: () => void;
}

const SlashCommandsMenu = ({
  editor,
  commands,
  onCloseMenu,
}: SlashCommandsMenuProps) => {
  
  const [search, setSearch] = React.useState<string>("");

  const filteredCommands = commands.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const selectItem = useCallback(
    (command: CommandProps) => {
      command.command({ editor });
      onCloseMenu();
      setSearch("");
    },
    [editor, onCloseMenu]
  );
  return (
    <div className="relative">
      <Command className="bg-white border rounded-lg shadow-md">
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={setSearch}
          className="w-full px-3 py-2 border-b"
        />
        <CommandList className="overflow-y-auto max-h-60">
          <CommandEmpty className="p-3 text-center text-gray-500">
            No results found.
          </CommandEmpty>
          <CommandGroup heading="Suggestions" className="p-2">
            {filteredCommands.map((item, index) => (
                <CommandItem
                key={index}
                onSelect={() => selectItem(item)}
                className="p-2 rounded-md cursor-pointer hover:bg-gray-100"
                >
                <div className="flex items-center justify-between w-full px-2 py-3 space-x-3">
                  <div className="flex items-center space-x-2">
                  {item.icon && (
                    <span className="text-[13px]">
                    {React.createElement(item.icon)}
                    </span>
                  )}
                  <span className="text-[13px] font-medium">{item.title}</span>
                  </div>
                  {item.description && (
                  <span className="ml-2 text-[12px] text-justify text-gray-500">
                    {item.description}
                  </span>
                  )}
                </div>
                </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default SlashCommandsMenu;
