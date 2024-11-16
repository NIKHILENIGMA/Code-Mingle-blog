import React from "react";
import EditorTools from "@/features/blog/components/EditorTools";
import PreviewListing from "@/features/blog/components/PreviewListing";

const WriteBlogPage: React.FC = () => {
  return (
    <div className="flex items-start justify-center w-full min-h-screen p-4 space-x-5 bg-violet-200/40">
      <div className="w-2/3 bg-white min-h-[90vh] overflow-y-auto p-3 shadow-md mt-4">
        <EditorTools />
      </div>
      <div className="hidden w-1/6 lg:inline-block bg-white min-h-[10vw] p-3 mt-4">
        <PreviewListing />
      </div>
    </div>
  );
};

export default WriteBlogPage;
