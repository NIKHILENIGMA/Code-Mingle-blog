import { ChangeEvent, FC, useState } from "react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Button, Label, Textarea } from "@/components";
import { RxMagicWand } from "react-icons/rx";
import { Plus } from "@/Utils/Icons";
import { generateAiContentService } from "@/services/openAI";
import { BsBoxArrowDown } from "react-icons/bs";
import { IoClipboardOutline } from "react-icons/io5";
import { VscDiscard } from "react-icons/vsc";

const ContentGeneration: FC<NodeViewProps> = ({
  node,
  deleteNode,
  updateAttributes,
}) => {
  const [prompt, setPrompt] = useState<string>(node?.attrs.prompt || "");
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>(node?.attrs.response || "");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setPrompt(e.target.value);
    updateAttributes({ prompt: e.target.value });
  };

  const handleResponse = async () => {
    if (!prompt) return;
    setError("Please enter a prompt.");

    setLoading(true);
    setError("");

    const response = await generateAiContentService(prompt);

    const content = response?.data?.choices[0]?.message?.content || "";
    setResponse(content);
    setLoading(false);
  };

  return (
    <NodeViewWrapper className="generate-content w-full min-h-[20vh] p-4 bg-card border border-secondary rounded-md shadow-md">
      <div className="flex flex-col gap-2 relative">
        <div className=" flex items-center gap-2">
          <span className="text-lg font-semibold">
            Ask AI to generate content for you
          </span>
        </div>
        <Button
          variant={"link"}
          onClick={() => deleteNode()}
          className="absolute right-4 cursor-pointer text-muted-foreground"
        >
          <Plus size={20} className="rotate-45" />
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
            value={prompt}
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
          <Button
            variant={"outline"}
            className="w-full flex space-x-2"
            size="sm"
            onClick={handleResponse}
          >
            {loading ? (
              <span className="animate-spin">Loading...</span>
            ) : (
              <RxMagicWand size={20} />
            )}
            <span>Generate</span>
          </Button>
        </div>

        <div className="w-full h-44 bg-card border border-secondary my-4 overflow-y-auto">
          <div className="p-2 text-sm text-muted-foreground whitespace-pre-wrap break-words">
            {response}
          </div>
          <div className="absolute flex bottom-0 right-0 p-2">
            <Button
              variant={"link"}
              size="icon"
              className="mr-2 hover:bg-primary/20 hover:text-primary"
            >
              <BsBoxArrowDown size={15} />
            </Button>
            <Button
              variant={"link"}
              size="icon"
              className="mr-2 hover:bg-primary/20 hover:text-primary"
            >
              <IoClipboardOutline size={15} />
            </Button>
            <Button
              variant={"link"}
              size="icon"
              className="mr-2 hover:bg-primary/20 hover:text-primary"
              onClick={() => deleteNode()}
            >
              <VscDiscard size={15} />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Powered by{" "}
              <span className="font-semibold text-blue-500">OpenAI</span>
            </span>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default ContentGeneration;
