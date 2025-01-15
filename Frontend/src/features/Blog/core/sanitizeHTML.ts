import DOMpurify from "dompurify";

export const sanitizeHTML = (content: string): string => {
  const sanitizeConfig = {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "img",
      "figure",
      "figcaption",
      "div",
      "span",
      "br",
      "hr",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "rel"],
  };

  const cleanContent = DOMpurify.sanitize(content, sanitizeConfig);

  return cleanContent;
};


