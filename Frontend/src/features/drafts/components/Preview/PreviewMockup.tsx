import { FC } from "react";
import Loader from "@/components/Loader/Loader";
// import RenderDraftPreview from "./RenderDraftPreview";

// interface PreviewDraft {
//   preview: {
//     id: string;
//     title: string;
//     slug: string | null;
//     content: string;
//     image: string;
//     readTime: null;
//     category: null;
//     author: {
//       id: string;
//       username: string;
//       avatarImg: string;
//     };
//     createdAt: string;
//     updatedAt: string;
//   };
// }

interface PreviewMockupProps {
  mockupImage?: string;
  altName?: string;
  mockPlacement?: string;
  placement?: string;
  isLoading?: boolean;
  isError?: boolean;
  id: string;
}

const PreviewMockup: FC<PreviewMockupProps> = ({
  id,
  mockupImage,
  altName,
  mockPlacement,
  placement,
  isLoading,
}) => {
  return (
    <div className={"relative flex items-center w-full h-full overflow-hidden py-10 "}>
      <img
        src={mockupImage}
        alt={altName}
        className={`${mockPlacement}`}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <iframe
          src={`http://localhost:5173/posts/preview/${id}`}
          width="100%"
          height="600px"
          className={`${placement}`}
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      )}
    </div>
  );
};

export default PreviewMockup;
