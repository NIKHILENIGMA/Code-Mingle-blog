import { all, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
// import css from "highlight.js/lib/languages/css";
// import html from "highlight.js/lib/languages/xml";
// import python from "highlight.js/lib/languages/python";
// import java from "highlight.js/lib/languages/java";
// import bash from "highlight.js/lib/languages/bash";
// import json from "highlight.js/lib/languages/json";
// import ts from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github.css"

const lowlight = createLowlight( all );

// lowlight.register("html", html);
// lowlight.register("css", css);
// lowlight.register("ts", ts);
// lowlight.register("python", python);
// lowlight.register("java", java);
// lowlight.register("bash", bash);
// lowlight.register("json", json);
lowlight.register("js", js);
// Register languages

export const lowLightConfig = lowlight;