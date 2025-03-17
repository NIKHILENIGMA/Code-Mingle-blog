import React from "react";
import { Clipboard, Share2 } from "@/Utils/Icons";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Input,
} from "@/components";
import { DialogTitle } from "@/components/ui/dialog";

export interface SharePostIconProps {
  name: string;
  src: string;
}

const SharePostIcons: SharePostIconProps[] = [
  {
    name: "twitter",
    src: "/twitter.svg",
  },
  {
    name: "whatsapp",
    src: "/whatsapp.svg",
  },
  {
    name: "linkedin",
    src: "/linkedin.svg",
  },
]

const SharePostLink: React.FC = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Share2 className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Post Link</DialogTitle>
            <div className="w-full min-h-[10vw] p-2 mx-auto space-y-2 scrollbar-thin overflow-y-auto">
              <div className="relative w-full py-4">
                <Input
                  type="text"
                  className="w-full p-2 border rounded resize-none"
                  placeholder="https://www.example.com/post/1"
                />
                <Button className="absolute top-4 right-1" variant={"link"}>
                  <Clipboard />
                </Button>
              </div>
              <div className="w-full h-[50%] p-2 py-4 border-t">
                <div className="flex items-center justify-center w-full h-full p-2 space-x-10 text-white">
                  {
                    SharePostIcons.map((icon, index) => (
                      <img key={index} src={icon.src} alt={`${icon.name}-logo`} className="object-cover w-16 h-16 p-1 overflow-hidden rounded-full cursor-pointer bg-slate-100" />
                    ))
                  }
                    
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SharePostLink;
