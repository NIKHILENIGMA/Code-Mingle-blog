// import DOMPurify from "dompurify";
import { marked } from "marked";

/**
 * Converts a markdown string to HTML using the marked library.
 * 
 * @param markdown - The markdown string to be converted to HTML.
 * @returns The converted HTML string. 
 */
export async function convertToHTML(markdown: string) {
  marked.setOptions({ gfm: true });
  return await marked(markdown); }

