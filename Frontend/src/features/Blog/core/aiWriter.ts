// import React from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import AIWriterNodeView from "../components/Editor/AIWriterNodeView";

export const aiWriter = Node.create({
  name: "aiWriterNode",
  group: "block",
  atom: true,

  addKeyboardShortcuts() {
    return {
      "alt+i": () =>
        this.editor.commands.insertContent({
          type: this.name,
          attrs: {
            content: "",
          },
        }),
    };
  },

  addAttributes() {
    return {
      content: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-type='ai-writer']",
      },
    ];
  },

  renderHTML() {
    return ["div", mergeAttributes({ "data-type": "ai-writer" }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AIWriterNodeView);
  },
});
