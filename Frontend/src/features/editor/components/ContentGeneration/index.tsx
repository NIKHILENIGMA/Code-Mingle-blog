import { ChangeEvent, FC, useState } from "react";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { RxMagicWand } from "react-icons/rx";
import { Clipboard, ClipboardCheck, Plus, Wand } from "@/Utils/Icons";
import { generateAiContentService } from "@/services/openAI";
import { BsBoxArrowDown } from "react-icons/bs";
import { VscDiscard } from "react-icons/vsc";
import { ToneType, PromptType } from "@/Types/types";
import { AnimatePresence, motion } from "framer-motion";
import { convertToHTML } from "@/Utils/markdownToHTML";

interface PromptInterface {
  prompt: string;
  type: PromptType;
  tone: ToneType;
}

const ContentGeneration: FC<NodeViewProps> = ({
  node,
  deleteNode,
  updateAttributes,
  editor,
}) => {
  const [prompt, setPrompt] = useState<PromptInterface>({
    prompt: node?.attrs.prompt || "",
    type: "simple",
    tone: "Formal",
  });
  const [error, setError] = useState<string>("");
  const [copy, setCopy] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>(node?.attrs.response || "");

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setPrompt({ ...prompt, prompt: e.target.value });
    updateAttributes({ prompt: e.target.value });
  };

  const handleResponse = async () => {
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");

    const response = await generateAiContentService({
      prompt: prompt?.prompt,
      type: prompt?.type,
      tone: prompt?.tone,
    });

    const content =
      response?.data?.chatGPTResponse?.choices[0]?.message?.content || "";

    if (!content || content === "") {
      setError("Failed to generate content. Please try again.");
      setLoading(false);
      return;
    }
    updateAttributes({ response: content });
    setResponse(content);
    setLoading(false);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(response);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  const handleInsertText = async (): Promise<void> => {
    if (!response) return;
    const html = await convertToHTML(response);
    editor?.commands.insertContent(html);
  };

  const handleDiscard = () => {
    setResponse("");
    updateAttributes({ response: "" });
  };

  return (
    <NodeViewWrapper className="ai-content w-full min-h-[20vh] p-4 bg-card border border-secondary rounded-md shadow-md">
      <div className="flex flex-col gap-2 relative" contentEditable={false}>
        <NodeViewContent className="content is-editable">
          <div className="flex items-center space-x-3">
            <Wand size={22} />
            <span className="text-xl font-semibold">
              Ask AI to generate content for you
            </span>
          </div>
          <Button
            variant={"link"}
            onClick={() => deleteNode()}
            className="absolute right-4 top-1 cursor-pointer text-muted-foreground"
          >
            <Plus size={20} color="red" className="rotate-45" />
          </Button>

          <div className="flex flex-col gap-2">
            <Label
              className="text-sm font-medium text-muted-foreground/60"
              htmlFor="prompt"
            >
              Type your prompt below and let AI generate content for you.
            </Label>
            <Textarea
              id="prompt"
              value={prompt?.prompt}
              typeof="email"
              rows={4}
              cols={50}
              placeholder="Type your prompt here..."
              autoComplete="off"
              autoFocus
              onChange={handlePromptChange}
              className="w-full h-24 p-2 border border-secondary rounded-md resize-none"
            />

            {error && <span className="text-sm text-red-500">{error}</span>}
            <div className="flex justify-start items-center space-x-2 mb-2">
              <Select
                value={prompt?.type}
                onValueChange={(value) => {
                  setPrompt({ ...prompt, type: value as PromptType });
                }}
              >
                <SelectTrigger className="w-[180px] border-secondary shadow-none">
                  <SelectValue placeholder="Response Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Response Type</SelectLabel>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="condense">Condense</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={prompt?.tone}
                onValueChange={(value) =>
                  setPrompt({ ...prompt, tone: value as ToneType })
                }
              >
                <SelectTrigger className="w-[180px] border-secondary shadow-none">
                  <SelectValue placeholder="Tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Response Tone</SelectLabel>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Confident">Confident</SelectItem>
                    <SelectItem value="Optimistic">Optimistic</SelectItem>
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="Empathetic">Empathetic</SelectItem>
                    <SelectItem value="Assertive">Assertive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant={"default"}
              className={`w-full flex space-x-2 ${
                response !== "" ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              size="sm"
              onClick={handleResponse}
              disabled={response !== ""}
            >
              {loading ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                  <radialGradient
                    id="a12"
                    cx=".66"
                    fx=".66"
                    cy=".3125"
                    fy=".3125"
                    gradientTransform="scale(1.5)"
                  >
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop
                      offset=".3"
                      stopColor="#FFFFFF"
                      stop-opacity=".9"
                    ></stop>
                    <stop
                      offset=".6"
                      stopColor="#FFFFFF"
                      stop-opacity=".6"
                    ></stop>
                    <stop
                      offset=".8"
                      stopColor="#FFFFFF"
                      stop-opacity=".3"
                    ></stop>
                    <stop
                      offset="1"
                      stopColor="#FFFFFF"
                      stop-opacity="0"
                    ></stop>
                  </radialGradient>
                  <circle
                    transform-origin="center"
                    fill="none"
                    stroke="url(#a12)"
                    strokeWidth="13"
                    strokeLinecap="round"
                    stroke-dasharray="200 1000"
                    strokeDasharray="0"
                    cx="100"
                    cy="100"
                    r="70"
                  >
                    <animateTransform
                      type="rotate"
                      attributeName="transform"
                      calcMode="spline"
                      dur="2"
                      values="360;0"
                      keyTimes="0;1"
                      keySplines="0 0 1 1"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </circle>
                  <circle
                    transform-origin="center"
                    fill="none"
                    opacity=".2"
                    stroke="#FFFFFF"
                    strokeWidth="13"
                    strokeLinecap="round"
                    cx="100"
                    cy="100"
                    r="70"
                  ></circle>
                </svg>
              ) : (
                <RxMagicWand size={20} />
              )}
              <span>Generate</span>
            </Button>
          </div>
        </NodeViewContent>

        {response && (
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
                  <TooltipContent side="top" className="z-[9999]">
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
                      {copy ? (
                        <ClipboardCheck size={15} />
                      ) : (
                        <Clipboard size={15} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="z-[9999]">
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
                  <TooltipContent side="top" className="z-[9999]">
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
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ContentGeneration;
