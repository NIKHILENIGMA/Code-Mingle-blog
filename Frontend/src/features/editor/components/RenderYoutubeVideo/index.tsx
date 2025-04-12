import { ChangeEvent, FC, useState } from "react";
import { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper } from "@tiptap/react";
import { extractVideoId, createEmbedUrl } from "@/Utils/youtubeExtractId";
import {} from "@/Utils/Icons";
import {
  Button,
  Input,
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { FaYoutube } from "react-icons/fa";
import { Plus, ClipboardCheck, Pencil, Trash2 } from "@/Utils/Icons";

const RenderYoutubeVideo: FC<NodeViewProps> = ({
  node,
  deleteNode,
  updateAttributes,
}) => {
  const [src, setSrc] = useState<string>("");
  const [bubbleMenu, setBubbleMenu] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Function to extract video ID from the URL
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSrc(event.target.value);
  };

  // Function to create the embed URL and set it in the state
  const uploadUrl = () => {
    if (!src){
      setError("Please enter a YouTube URL.");
      return;
    }

    const videoId = extractVideoId(src);
    if (videoId) {
      const finalEmbedUrl = createEmbedUrl(videoId);

      updateAttributes({
        src: finalEmbedUrl,
        alt: "YouTube Video",
      });
      setSrc("");
      setError(null); // Clear any previous error message
    } else {
      console.warn("Invalid YouTube URL");
      setError("Invalid YouTube URL. Please enter a valid URL.");
    }
  };

  return (
    <NodeViewWrapper
      className="w-full h-56 md:min-h-[30vw] relative my-2"
      onMouseEnter={() => {
        setBubbleMenu(true);
      }}
      onMouseLeave={() => {
        setBubbleMenu(false);
      }}
    >
      <div
        className="w-full h-full relative overflow-hidden border border-card bg-card text-foreground"
        contentEditable={false}
      >
        {node?.attrs?.src !== "" ? (
          <div className="relative w-full h-full overflow-hidden rounded-lg shadow-sm">
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src={node?.attrs?.src}
              title="YouTube video player"
              allowFullScreen
            />
            {bubbleMenu && (
              <div className="absolute z-[9999] flex flex-col top-[20%] left-0 bg-background/40 rounded-sm border-secondary/50 p-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="p-2 hover:text-primary/80"
                        onClick={() =>
                          handleUrlChange({} as ChangeEvent<HTMLInputElement>)
                        }
                      >
                        <Pencil size={10} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-[9999]">
                      <p>Change Video</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="p-2 hover:text-primary/80"
                        // onClick={onCopyImageUrl}
                      >
                        <ClipboardCheck size={10} />
                        {/* {isCopy ?  : <Clipboard />} */}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-[9999]">
                      <p>Copy Video URL</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="p-2 hover:text-primary/80"
                        onClick={() => deleteNode()}
                      >
                        <Trash2 size={10} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="z-[9999]">
                      <p>Remove Video</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full lg:h-[55%] bg-card border-2 border-secondary rounded-lg shadow-sm px-6 transition-colors duration-200">
            <div className="flex flex-col items-start justify-center w-full mb-4 space-y-0 leading-tight relative">
              <h4 className="text-xl md:text-2xl flex items-center font-bold text-muted-foreground tracking-tight space-x-2 w-full">
                <FaYoutube size={27} color="red" />
                <span>YouTube Video Embed</span>
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground/70 leading-tight ">
                Enter a valid YouTube video URL to embed the video.
              </p>
              <Button
                variant={"link"}
                onClick={() => deleteNode()}
                className="absolute left-[80%] sm:left-[90%] md:end-0 top-0 border-none shadow-none"
              >
                <Plus className="rotate-45" color="red" />
              </Button>
            </div>
            <div className="flex flex-col items-start justify-center w-full space-y-3">
              <Label htmlFor="youtube-url" className="text-muted-foreground">
                Enter youtube url here:{" "}
              </Label>
              <Input
                type="text"
                id="youtube-url"
                value={src}
                placeholder="Enter youtube url here"
                onChange={handleUrlChange}
                autoComplete="off"
                className={`w-full px-4 py-2 border border-primary/70 bg-card text-muted-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${error ? "border-red-500" : ""}`}
              />
              {error && <p className="text-red-500 text-xs md:text-sm w-full">{error}</p>}
              <Button
                variant={"outline"}
                onClick={uploadUrl}
                className="w-full "
              >
                Upload
              </Button>
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default RenderYoutubeVideo;
