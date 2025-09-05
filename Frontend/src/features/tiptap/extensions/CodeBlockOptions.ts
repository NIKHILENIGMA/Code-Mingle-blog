import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlockOptions from "../components/CodeBlockOptions";

export const CodeBlockExtension = CodeBlockLowlight.extend({
  name: "codeBlock",

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockOptions);
  },
});
