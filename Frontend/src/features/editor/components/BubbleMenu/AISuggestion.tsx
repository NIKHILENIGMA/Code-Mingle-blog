import { createElement, FC, useState } from "react";
import { Editor } from "@tiptap/core";
import { Wand } from "@/Utils/Icons";
import { Button } from "@/components";
import { aiOptions } from "@/constants/constants";

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
        className="border-none shadow-none bg-transparent hover:bg-primary/10 hover:text-primary transition-colors"
      >
        <Wand />
        Ask AI
      </Button>

      {menu ? (
        <div className="absolute w-58 top-full mt-1 left-0 rounded-lg shadow-lg border border-primary/70 bg-background">
          <ul className="py-2">
            {aiOptions.map((option, index) => (
              <li
                key={index + option.label}
                className="relative group cursor-pointer"
              >
                <div
                  className="flex items-center px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => handleOptionSelect(option)}
                >
                  {createElement(option.icon, {
                    className: "w-4 h-4 mr-2",
                  })}
                  <span className="text-sm font-medium">{option.label}</span>
                </div>

                {option?.subOptions && option.subOptions?.length > 0 && (
                  <ul className="absolute left-full top-0 w-64 rounded-lg shadow-lg border bg-background hidden group-hover:block z-10">
                    {option.subOptions.map((subOption, subIndex) => (
                      <li
                        key={subIndex + subOption.label}
                        className="flex items-center px-4 py-2 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
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
