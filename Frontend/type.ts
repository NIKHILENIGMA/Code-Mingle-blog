export type BlockType =
  | "text"
  | "paragraph"
  | "image"
  | "video"
  | "audio"
  | "heading"
  | "code"
  | "list"
  | "quote"
  | "divider";

export type ColorType =
  | "default"
  | "gray"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export type BackgroundType =
  | "default"
  | "gray"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export type AlignmentType = "left" | "center" | "right" | "justify";

export type LanguageType =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "c"
  | "cpp"
  | "csharp"
  | "php"
  | "ruby"
  | "go"
  | "swift"
  | "kotlin"
  | "rust"
  | "scala"
  | "perl"
  | "shell"
  | "html"
  | "css"
  | "scss"
  | "less"
  | "json"
  | "yaml"
  | "xml"
  | "markdown"
  | "graphql"
  | "sql";

export type LevelType = 1 | 2 | 3 | 4 | 5 | 6;

export type Stylpes = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  backgroundColor?: BackgroundType;
  textColor?: ColorType;
};

export type ContentSchema = {
  type: "text" | "link";
  text: string;
  href?: string;
  styles: Stylpes;
};

export type BlockSchema = {
  id: string;
  type: BlockType;
  props: {
    textColor: ColorType;
    backgroundColor: BackgroundType;
    textAlignment: AlignmentType;
    level: LevelType;
    language: LanguageType;
    name: string;
    url: string;
    caption: string;
    showPreview: boolean;
    previewWidth: number;
  };
  content: ContentSchema[];
  children: BlockSchema[];
};
