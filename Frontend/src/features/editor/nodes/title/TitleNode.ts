import { Node } from "@tiptap/core";
// import { ReactNodeViewRenderer } from "@tiptap/react";
// import Title from "../../components/Title";

// declare module "@tiptap/core" {
//   interface Commands<ReturnType> {
//     title: {
//       setTitle: (title: string) => ReturnType;
//     };
//   }
// }

export const TitleNode = Node.create({
  name: 'title',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'h1',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['h1', HTMLAttributes, 0];
  },

  // addNodeView() {
  //   return ReactNodeViewRenderer(Title)
  // },

  // addCommands() {
  //   return {
  //     setTitle:
  //       (title: string) =>
  //       ({ commands }: CommandProps) => {
  //         return commands.setNode("title", { title });
  //       },
  //   };
  // },
});
