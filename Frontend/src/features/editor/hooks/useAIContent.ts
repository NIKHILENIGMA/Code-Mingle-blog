import { ChangeEvent, useState } from "react";
import { NodeViewProps } from "@tiptap/core";
import { PromptType, ToneType } from "@/Types/types";
import { generateAiContentService } from "@/services/openAI";
import { convertToHTML } from "@/Utils/markdownToHTML";

interface PromptInterface {
  prompt: string;
  type: PromptType;
  tone: ToneType;
}

interface UseAIContentProps {
    node: NodeViewProps["node"];
    updateAttributes: NodeViewProps["updateAttributes"];
    editor: NodeViewProps["editor"];
}

export const useAIContent = ({
  node,
  updateAttributes,
  editor,
}: UseAIContentProps) => {
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

  const handleGeneratedResponse = async () => {
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

  return {
    prompt,
    setPrompt,
    error,
    copy,
    loading,
    response,
    handlePromptChange,
    handleGeneratedResponse,
    handleCopyText,
    handleInsertText,
    handleDiscard,
  };
};
