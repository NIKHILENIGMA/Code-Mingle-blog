import {
  // ChangeEvent,
  FC,
  // MouseEvent,
  // useState,
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
import {
  BsEmojiGrin,
  BsEmojiLaughing,
  BsEmojiSmile,
  BsEmojiSmileUpsideDown,
  BsEmojiSunglasses,
  BsEmojiSurprise,
  BsEmojiWink,
} from "react-icons/bs";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components";

interface AISuggestionProps {
  editor: Editor;
}

// const aiOptions = [
//   {
//     icon: <SwatchBook className="w-5 h-5 mr-3" />,
//     label: "Simplify",
//   },
//   {
//     icon: <Mic className="w-5 h-5 mr-3" />,
//     label: "Tone",
//     subOptions: [
//       {
//         icon: <BsEmojiSmile className="w-5 h-5 mr-3" />,
//         label: "Formal",
//       },
//       {
//         icon: <BsEmojiSmileUpsideDown className="w-5 h-5 mr-3" />,
//         label: "Informal",
//       },
//       {
//         icon: <BsEmojiGrin className="w-5 h-5 mr-3" />,
//         label: "Optimistic",
//       },
//       {
//         icon: <BsEmojiSunglasses className="w-5 h-5 mr-3" />,
//         label: "Friendly",
//       },
//       {
//         icon: <BsEmojiLaughing className="w-5 h-5 mr-3" />,
//         label: "Assertive",
//       },
//       {
//         icon: <BsEmojiSurprise className="w-5 h-5 mr-3" />,
//         label: "Curious",
//       },
//       {
//         icon: <BsEmojiWink className="w-5 h-5 mr-3" />,
//         label: "Persuasive",
//       },
//     ],
//   },
//   {
//     icon: <Languages className="w-5 h-5 mr-3" />,
//     label: "Translation",
//     subOptions: [
//       {
//         icon: <Languages className="w-5 h-5 mr-3" />,
//         label: "Chinese",
//       },
//       {
//         icon: <Languages className="w-5 h-5 mr-3" />,
//         label: "English",
//       },
//       {
//         icon: <Languages className="w-5 h-5 mr-3" />,
//         label: "French",
//       },
//       {
//         icon: <Languages className="w-5 h-5 mr-3" />,
//         label: "German",
//       },
//       {
//         icon: <Languages className="w-5 h-5 mr-3" />,
//         label: "Greek",
//       },
//       {
//         icon: <Languages className="w-5 h-5 mr-3" />,
//         label: "Japanese",
//       },
//       {
//         icon: <Languages className="w-5 h-5 mr-3" />,
//         label: "Russian",
//       },
//       {
//         icon: <Languages className="w-5 h-5 mr-3" />,
//         label: "Spanish",
//       },
//     ],
//   },
//   {
//     icon: <ArrowRightToLine className="w-5 h-5 mr-3" />,
//     label: "Make Long",
//   },
//   {
//     icon: <ArrowLeftToLine className="w-5 h-5 mr-3" />,
//     label: "Make Short",
//   },
// ];

const AISuggestion: FC<AISuggestionProps> = ({ editor }) => {
  // const [menu, setMenu] = useState<boolean>(false);
  // const [selectedOption, setSelectedOption] = useState<string>("");

  // const handleShowMenu = () => {
  //   setMenu((prev) => !prev);
  // };

  const aiOptions = [
    {
      name: "Simplify",
      icon: <SwatchBook className="w-5 h-5 mr-3" />,
      label: "Simplify",
      value: "simplify",
    },
    {
      name: "Tone",
      icon: <Mic className="w-5 h-5 mr-3" />,
      label: "Tone",
      value: "tone",
      subOptions: [
        {
          icon: <BsEmojiSmile className="w-5 h-5 mr-3" />,
          label: "Formal",
        },
        {
          icon: <BsEmojiSmileUpsideDown className="w-5 h-5 mr-3" />,
          label: "Informal",
        },
        {
          icon: <BsEmojiGrin className="w-5 h-5 mr-3" />,
          label: "Optimistic",
        },
        {
          icon: <BsEmojiSunglasses className="w-5 h-5 mr-3" />,
          label: "Friendly",
        },
        {
          icon: <BsEmojiLaughing className="w-5 h-5 mr-3" />,
          label: "Assertive",
        },
        {
          icon: <BsEmojiSurprise className="w-5 h-5 mr-3" />,
          label: "Curious",
        },
        {
          icon: <BsEmojiWink className="w-5 h-5 mr-3" />,
          label: "Persuasive",
        },
      ],
    },
    {
      name: "Translation",
      icon: <Languages className="w-5 h-5 mr-3" />,
      label: "Translation",
      value: "translation",
      subOptions: [
        {
          icon: <Languages className="w-5 h-5 mr-3" />,
          label: "Chinese",
        },
        {
          icon: <Languages className="w-5 h-5 mr-3" />,
          label: "English",
        },
        {
          icon: <Languages className="w-5 h-5 mr-3" />,
          label: "French",
        },
        {
          icon: <Languages className="w-5 h-5 mr-3" />,
          label: "German",
        },
        {
          icon: <Languages className="w-5 h-5 mr-3" />,
          label: "Greek",
        },
        {
          icon: <Languages className="w-5 h-5 mr-3" />,
          label: "Japanese",
        },
      ],
    },
    {
      name: "Make Long",
      icon: <ArrowRightToLine className="w-5 h-5 mr-3" />,
      label: "Make Long",
      value: "makeLong",
    },
    {
      name: "Make Short",
      icon: <ArrowLeftToLine className="w-5 h-5 mr-3" />,
      label: "Make Short",
      value: "makeShort",
    },
  ];

  const handleOptionSelect = (option: { label: string; type?: string }) => {
    if (option?.label === "Make Long") {
      editor.chain().focus().makeLongText().run();
    }

    if (option?.label === "Make Short") {
      editor.chain().focus().makeShortText().run();
    }

    if (option?.label === "Simplify") {
      editor.chain().focus().simplify().run();
    }

    if (option?.type === "Translation") {
      editor.chain().focus().translateText(option?.label).run();
    }

    if (option?.type === "Tone") {
      editor.chain().focus().setTone(option?.label).run();
    }

    // setMenu(false); // Close the menu after selecting an option
  };

  // const handleValueChange = (value: string) => {
  //   console.log(value);
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onPointerDown={(e) => {
            e.stopPropagation(); // ✅ prevent editor blur
          }}
          variant="outline"
        >
          <Wand /> Ask AI
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onPointerDown={(e) => {
          e.stopPropagation(); // ✅ again, stop blur trigger
        }}
        className="w-56"
      >
        <DropdownMenuLabel>AI Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {aiOptions.map((option) =>
            option.subOptions ? (
              <DropdownMenuSub key={option.value}>
                <DropdownMenuSubTrigger
                  onPointerDown={(e) => {
                    e.stopPropagation(); // ✅ again, stop blur trigger
                  }}
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    onPointerDown={(e) => {
                      e.stopPropagation(); // ✅ again, stop blur trigger
                    }}
                  >
                    {option.subOptions.map((subOption) => (
                      <DropdownMenuItem
                        key={subOption.label}
                        onClick={() =>
                          handleOptionSelect({
                            type: option.label,
                            label: subOption.label,
                          })
                        }
                      >
                        {subOption.icon}
                        {subOption.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleOptionSelect(option)}
              >
                {option.icon}
                {option.label}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AISuggestion;
// <Select onValueChange={handleValueChange}>
//   <SelectTrigger
//     className="w-[120px] space-x-2"
//     onPointerDown={(e) => {
//       e.stopPropagation();
//       e.preventDefault();
//     }}
//   >
//     <Wand /> <span>Ask AI</span>
//   </SelectTrigger>
//   <SelectContent
//     onPointerDown={(e) => {
//       e.stopPropagation();
//       e.preventDefault();
//     }}
//     className=""
//   >
//     {aiOptions.map((option) => (
//       option.subOptions ? (
//         <Select key={option.value}>
//           <SelectTrigger
//             className="w-full flex hover:bg-primary/70 hover:text-primary transition-colors"
//             onPointerDown={(e) => {
//               e.stopPropagation();
//               e.preventDefault();
//             }}
//           >
//             <span>{option.icon}</span>
//             <span>{option.label}</span>
//           </SelectTrigger>
//           <SelectContent>
//             {option.subOptions.map((subOption) => (
//               <SelectItem
//                 key={subOption.label}
//                 value={subOption.label}
//                 onPointerDown={(e) => {
//                   e.stopPropagation();
//                   e.preventDefault();
//                 }}
//                 className="hover:bg-primary/70 hover:text-primary transition-colors"
//                 onClick={() =>
//                   handleOptionSelect({
//                     type: option.label,
//                     label: subOption.label,
//                   })
//                 }
//               >
//                 <div className="w-full flex">
//                   <span>{subOption.icon}</span>
//                   <span>{subOption.label}</span>
//                 </div>
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       ) : (
//         <SelectItem
//           key={option.value}
//           value={option.value}
//           onPointerDown={(e) => {
//             e.stopPropagation();
//             e.preventDefault();
//           }}
//           className="hover:bg-primary/70 hover:text-primary transition-colors"
//           onClick={() => handleOptionSelect(option)}
//         >
//           <div className="w-full flex">
//             <span>{option.icon}</span>
//             <span>{option.label}</span>
//           </div>
//         </SelectItem>
//       )
//     ))}
//   </SelectContent>
// </Select>

// <div>
//   <button
//     onClick={handleShowMenu}
//     className="flex items-center justify-center w-full p-2 space-x-2"
//   >
//
//   </button>

//   {menu ? (
//     <div className="absolute w-58 top-full mt-1 left-0 rounded-lg shadow-lg border border-primary/70 bg-background">
//       <ul className="py-2">
//         {aiOptions.map((option, index) => (
//           <li
//             key={index + option.label}
//             className="relative group cursor-pointer"
//           >
//             <div
//               className="flex items-center px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors"
//               onClick={() => handleOptionSelect(option)}
//             >
//               {option.icon}
//               <span className="text-sm font-medium">{option.label}</span>
//             </div>

//             {option?.subOptions && option.subOptions?.length > 0 && (
//               <ul className="absolute left-full top-0 w-64 rounded-lg shadow-lg border bg-background hidden group-hover:block z-10">
//                 {option.subOptions.map((subOption, subIndex) => (
//                   <li
//                     key={subIndex + subOption.label}
//                     className="flex items-center px-4 py-2 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
//                     onClick={() =>
//                       handleOptionSelect({
//                         type: option.label,
//                         label: subOption.label,
//                       })
//                     }
//                   >
//                     {subOption.icon}
//                     <span className="text-sm font-medium">
//                       {subOption.label}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   ) : null}
// </div>
