import { ReactNodeViewRenderer } from "@tiptap/react";
import LanguageSelectorNodeView from "../components/LanguageSelectorNodeView";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import javascript from 'highlight.js/lib/languages/javascript';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import java from 'highlight.js/lib/languages/java';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import "highlight.js/styles/github.css"

const lowlight = createLowlight( all );


lowlight.register("javascript", javascript);
lowlight.register("cpp", cpp);  
lowlight.register("csharp", csharp);
lowlight.register("java", java);
lowlight.register("html", html);
lowlight.register("css", css);



export const ExtendedCodeBlock = CodeBlockLowlight.extend({
  name: "extendedCodeBlock",

  addNodeView() {
    return ReactNodeViewRenderer(LanguageSelectorNodeView);
  }
});
