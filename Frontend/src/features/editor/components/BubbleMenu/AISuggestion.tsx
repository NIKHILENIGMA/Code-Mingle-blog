import { createElement, FC, useState } from "react";
import { Editor } from "@tiptap/core";
import { Wand } from "@/Utils/Icons";
import { Button } from "@/components";
import { AI_OPTIONS } from "@/constants";

interface AISuggestionProps {
  editor: Editor;
}

const AISuggestion: FC<AISuggestionProps> = ({ editor }) => {
  const [menu, setMenu] = useState<boolean>(false);
  const handleShowMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMenu((prev) => !prev);
  };

  const handleOptionSelect = (option: { label: string; type?: string }) => {
    const { label, type } = option;

    switch (label) {
      case "Make Long":
        editor.chain().focus().makeLongText().run();
        break;

      case "Make Short":
        editor.chain().focus().makeShortText().run();
        break;

      case "Simplify":
        editor.chain().focus().simplify().run();
        break;

      default:
        if (type === "Translation") {
          editor.chain().focus().translateText(label).run();
        } else if (type === "Tone") {
          editor.chain().focus().setTone(label).run();
        }
        break;
    }
  };

  return (
    <>
      <Button
        variant={"outline"}
        onClick={handleShowMenu}
        className="transition-colors bg-transparent border-none shadow-none hover:bg-primary/10 hover:text-primary"
      >
        <Wand />
        Ask AI
      </Button>

      {menu ? (
        <div className="absolute left-0 mt-1 border rounded-lg shadow-lg w-58 top-full border-primary/70 bg-background">
          <ul className="py-2">
            {AI_OPTIONS.map((option, index) => (
              <li
                key={index + option.label}
                className="relative cursor-pointer group"
              >
                <div
                  className="flex items-center px-4 py-2 transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleOptionSelect(option)}
                >
                  {createElement(option.icon, {
                    className: "w-4 h-4 mr-2",
                  })}
                  <span className="text-sm font-medium">{option.label}</span>
                </div>

                {option?.subOptions && option.subOptions?.length > 0 && (
                  <ul className="absolute top-0 z-10 hidden w-64 border rounded-lg shadow-lg left-full bg-background group-hover:block">
                    {option.subOptions.map((subOption, subIndex) => (
                      <li
                        key={subIndex + subOption.label}
                        className="flex items-center px-4 py-2 transition-colors cursor-pointer hover:bg-primary/10 hover:text-primary"
                        onClick={() =>
                          handleOptionSelect({
                            type: option.label,
                            label: subOption.label,
                          })
                        }
                      >
                        {createElement(subOption.icon, {
                          className: "w-4 h-4 mr-2",
                        })}
                        <span className="text-sm font-medium">
                          {subOption.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default AISuggestion;
