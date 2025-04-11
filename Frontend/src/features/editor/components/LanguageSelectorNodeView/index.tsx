import { FC } from "react";
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import { SelectLanguage } from "../SelectLanguage";

const LanguageSelectorNodeView: FC<NodeViewProps> = ({
  node,
  updateAttributes,
}) => {
  return (
    <NodeViewWrapper className="relative w-full">
      <div className="absolute top-1 right-1 z-20">
        <SelectLanguage
          currentLanguage={node.attrs.language}
          updateAttributes={updateAttributes}
        />
      </div>
      <pre className="whitespace-pre-wrap overflow-auto p-2 bg-background rounded-md">
        <NodeViewContent
          as="code"
          className={`language-${node.attrs.language}`}
        />
      </pre>
    </NodeViewWrapper>
  );
};

export default LanguageSelectorNodeView;
