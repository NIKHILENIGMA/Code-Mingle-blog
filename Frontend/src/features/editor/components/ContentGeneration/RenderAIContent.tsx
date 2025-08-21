import { FC } from "react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { Clipboard, ClipboardCheck } from "@/Utils/Icons";
import { BsBoxArrowDown } from "react-icons/bs";
import { VscDiscard } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";

interface RenderAIContentProps {
  response: string;
  handleInsertText: () => void;
  handleCopyText: () => void;
  handleDiscard: () => void;
  copy: boolean;
}

const RenderAIContent: FC<RenderAIContentProps> = ({
  response,
  handleInsertText,
  handleCopyText,
  handleDiscard,
  copy,
}) => {
  return (
    <div className="w-full min-h-44 bg-card border border-secondary my-4 overflow-y-auto relative">
      <div className="sticky top-4 right-2 bg-card p-2 border-b border-secondary z-10 flex justify-end gap-2 mt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"link"}
                size="icon"
                className="mr-2 hover:bg-primary/20 hover:text-primary"
                onClick={handleInsertText}
              >
                <BsBoxArrowDown size={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-9999">
              <p>Insert</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"link"}
                size="icon"
                onClick={handleCopyText}
                className="mr-2 hover:bg-primary/20 hover:text-primary"
              >
                {copy ? <ClipboardCheck size={15} /> : <Clipboard size={15} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-9999">
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"link"}
                size="icon"
                className="mr-2 hover:bg-primary/20 hover:text-primary"
                onClick={handleDiscard}
              >
                <VscDiscard size={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-9999">
              <p>Discard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="border border-muted p-3 rounded-md bg-muted/30"
        >
          <div
            dangerouslySetInnerHTML={{ __html: response }}
            className="whitespace-pre-wrap"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RenderAIContent;
