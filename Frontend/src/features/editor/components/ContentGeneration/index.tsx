import { FC } from "react";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Button, Label, Textarea } from "@/components";
import { RxMagicWand } from "react-icons/rx";
import { Plus, Wand } from "@/Utils/Icons";
import { ToneType, PromptType } from "@/Types/types";
import { useAIContent } from "../../hooks/useAIContent";
import SelectResponseType from "./SelectResponseType";
import RenderAIContent from "./RenderAIContent";
import { TONE_OPTIONS, TYPE_OPTIONS } from "@/constants";

const ContentGeneration: FC<NodeViewProps> = ({
  node,
  deleteNode,
  updateAttributes,
  editor,
}) => {
  const {
    prompt,
    error,
    copy,
    loading,
    response,
    handlePromptChange,
    handleGeneratedResponse,
    handleCopyText,
    handleInsertText,
    handleDiscard,
    setPrompt,
  } = useAIContent({ node, updateAttributes, editor });

  return (
    <NodeViewWrapper className="ai-content w-full min-h-[20vh] p-4 bg-card border border-secondary rounded-md shadow-md">
      <div className="relative flex flex-col gap-2" contentEditable={false}>
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
            className="absolute cursor-pointer right-4 top-1 text-muted-foreground"
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
              className="w-full h-24 p-2 border rounded-md resize-none border-secondary"
            />

            {error && <span className="text-sm text-red-500">{error}</span>}
            <div className="flex items-center justify-start mb-2 space-x-2">
              <SelectResponseType
                value={prompt?.type}
                onChange={(value) => {
                  setPrompt({ ...prompt, type: value as PromptType });
                }}
                placeholder="Response Type"
                label="Response Type"
                options={TYPE_OPTIONS}
              />
              <SelectResponseType
                value={prompt?.tone}
                onChange={(value) => {
                  setPrompt({ ...prompt, tone: value as ToneType });
                }}
                placeholder="Response Tone"
                label="Response Tone"
                options={TONE_OPTIONS}
              />
            </div>
            <Button
              type="button"
              variant={"default"}
              className={`w-full flex space-x-2 ${
                response !== "" ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              size="sm"
              onClick={handleGeneratedResponse}
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
                      stopOpacity=".9"
                    ></stop>
                    <stop
                      offset=".6"
                      stopColor="#FFFFFF"
                      stopOpacity=".6"
                    ></stop>
                    <stop
                      offset=".8"
                      stopColor="#FFFFFF"
                      stopOpacity=".3"
                    ></stop>
                    <stop
                      offset="1"
                      stopColor="#FFFFFF"
                      stopOpacity="0"
                    ></stop>
                  </radialGradient>
                  <circle
                    transform-origin="center"
                    fill="none"
                    stroke="url(#a12)"
                    strokeWidth="13"
                    strokeLinecap="round"
                    strokeDasharray="200 1000"
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
          <RenderAIContent
            response={response}
            handleInsertText={handleInsertText}
            handleCopyText={handleCopyText}
            handleDiscard={handleDiscard}
            copy={copy}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ContentGeneration;
