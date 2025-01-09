import React, { useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, Plus, Rss } from "@/Utils/Icons";
import { Button, Input, Label } from "@/components";

const tags = ["AWS", "Azure", "Git", "Frontend", "Backend"];

const PublishButton: React.FC = () => {
  const postImageRef = useRef<HTMLInputElement>(null);
  const [showSheet, setShowSheet] = React.useState({
    article: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSheet({
      ...showSheet,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleRemove = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedTag = e.target as HTMLDivElement;
    const tag = selectedTag.textContent;
    const newTags = tags.filter((t) => t !== tag);
    console.log(newTags);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <span className="flex justify-around px-4 py-2 text-white bg-black rounded-md hover:bg-slate-800">
          <Rss /> Publish
        </span>
      </SheetTrigger>
      <SheetContent className="w-full min-h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Draft Publish</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col justify-end w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full h-full py-2 space-y-2"
          >
            {/* Article Slug */}
            <div className="flex flex-col p-2 space-y-2">
              <Label htmlFor="article-slug">Article Slug</Label>
              <Input
                type="text"
                id="article-slug"
                name="article-slug"
                onChange={handleChange}
                placeholder="enter article slug"
              />
            </div>

            {/* Add Tags */}
            <div className="flex flex-col p-2 space-y-2">
              <Label htmlFor="article-slug">Select Tags</Label>
              <Input type="text" id="article-slug" placeholder="search tags" />
              <div className="flex flex-wrap items-end justify-start w-10 min-w-full px-2 space-x-2 space-y-2 rounded-lg min-h-10 text-wrap">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex justify-evenly items-start px-2 py-1 text-sm font-normal border-[1px] border-slate-300 rounded-2xl bg-slate-200/40"
                    onClick={handleRemove}
                  >
                    <span className="flex items-center">
                      {tag}
                      <Plus size={15} className="rotate-45 cursor-pointer" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Image Upload */}
            <div className="flex flex-col p-2 space-y-2">
              <Label htmlFor="article-slug">Custom Image</Label>
              <p className="text-xs text-left text-white leading-2 text-black/60 text-wrap">
                Add an image to your post for better engagement! If you don't
                have one, we'll use the blog cover image. Please make sure the
                image is high-resolution and related to your post."
              </p>
              <Input
                type="file"
                id="article-slug"
                placeholder="search tags"
                className="hidden"
                ref={postImageRef}
              />

              <div
                onClick={() => postImageRef.current?.click()}
                className="w-full h-32 p-2 rounded-lg bg-slate-100 outline-dashed focus:outline-2 outline-offset-2 focus:ring outline-slate-500/50"
              >
                <div className="flex items-center justify-center w-full h-full space-x-2">
                  <p className="font-normal text-center text-md text-black/40">
                    Drag and drop <br /> or <br />
                    click to upload
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule your article */}
            <div className="relative flex flex-col p-2 space-y-2">
              <Label htmlFor="article-slug font-normal">
                Schedule Your Article
              </Label>
              <Input
                type="text"
                id="article-slug"
                placeholder="enter article slug"
              />
              <span className="absolute top-8 right-5">
                <Calendar size={15} />
              </span>
            </div>
          </form>
          <Button variant="default" type="submit">
            Publish
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PublishButton;
