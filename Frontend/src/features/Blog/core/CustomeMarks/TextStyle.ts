import { Mark, mergeAttributes } from '@tiptap/core';

export const TextStyle = Mark.create({
  name: 'textStyle',

  // Marks don't need any specific inline content by default
  addOptions() {
    return {
      HTMLAttributes: {}, // Base HTML attributes for the mark
    };
  },

  // Define how the mark should render in HTML
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  // Define how the mark should be parsed from HTML
  parseHTML() {
    return [
      {
        tag: 'span[style]', // Look for span elements with inline styles
      },
    ];
  },

  // Make the mark applicable everywhere (all nodes that allow marks)
  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.color || null,
        renderHTML: (attributes) => {
          if (!attributes.color) return {};
          return { style: `color: ${attributes.color}` };
        },
      },
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor || null,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) return {};
          return { style: `background-color: ${attributes.backgroundColor}` };
        },
      },

      fontSize: {
        default: null,
        parseHTML: (element) => {
          const fontSize = element.style.fontSize;
          if (!fontSize) return null;
          return fontSize === 'bold' ? 'bold' : 'normal';
        },
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      }
    };
  },
});
