import { all, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css"

const lowlight = createLowlight( all );


lowlight.register("js", js);
// Register languages

export const lowLightConfig = lowlight;