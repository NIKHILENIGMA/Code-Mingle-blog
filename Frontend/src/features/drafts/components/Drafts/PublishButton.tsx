import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Input,
  Label,
} from "@/components";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { BookCheck, Rss, Trash2, Upload } from "@/Utils/Icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkIsSlugAvailableService } from "@/services/api/draftApiServices";
import { useParams } from "react-router-dom";

interface PublishedState {
  slug: string;
  category: string;
}

// const tags = [
//   "Programming",
//   "Software Development",
//   "Web Development",
//   "Mobile Apps",
//   "Artificial Intelligence (AI)",
//   "Machine Learning",
//   "Cybersecurity",
//   "Cloud Computing",
//   "Data Science",
//   "Gadgets",
//   "Tech News",
//   "Startups",
//   "Innovation",
//   "Travel",
//   "Food",
//   "Recipes",
//   "Fashion",
//   "Beauty",
//   "Health",
//   "Fitness",
//   "Wellness",
//   "Home Decor",
//   "DIY",
//   "Gardening",
//   "Personal Finance",
//   "Minimalism",
//   "Marketing",
//   "Digital Marketing",
//   "Social Media Marketing",
//   "Finance",
//   "Investing",
//   "Entrepreneurship",
//   "Startups",
//   "Leadership",
//   "Productivity",
//   "Remote Work",
//   "E-commerce",
//   "Business Strategy",
//   "Movies",
//   "TV Shows",
//   "Music",
//   "Books",
//   "Gaming",
//   "Podcasts",
//   "Streaming",
//   "Reviews",
//   "Celebrity News",
//   "Art",
//   "Theatre",
//   "Reflections",
//   "Thoughts",
//   "Experiences",
//   "Motivation",
//   "Self-Improvement",
//   "Personal Growth",
//   "Journaling",
//   "Mindfulness",
//   "Relationships",
//   "Inspiration",
//   "Daily Life",
// ];

const PublishButton: React.FC = () => {
  const id = useParams<{ draftId: string }>()?.draftId;
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [published, setPublished] = useState<PublishedState>({
    slug: "",
    category: "",
  });
  const [isSlugValid, setIsSlugValid] = useState<boolean | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    // If no file is selected
    if (!file) return;

    // If the file is not an image
    if (!file.type.startsWith("image")) return alert("Please select an image");
    setThumbnail(file);
  };

  const handlePublishedDraft = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Published Draft: ", published);
    console.log("Thumbnail: ", thumbnail);
    // Add your logic here to publish the draft
    const formData = new FormData();

    formData.append("thumbnail", thumbnail as Blob);
    formData.append("slug", published.slug);
    // formData.append("tags", published.tags.join(","));
    formData.append("category", published.category);

    setPublished({ slug: "", category: "" });
    setThumbnail(null);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  const handleCheckValidSlug = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!published.slug && !id) return;

    const isValid = await checkIsSlugAvailableService(id || "", published.slug);

    if (isValid) {
      console.log("Slug is valid");
      setIsSlugValid(true);
    } else {
      console.log("Slug is not valid");
      setIsSlugValid(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center gap-1 border border-purple-600 bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-400 transition">
          <Rss />
          Publish
        </DialogTrigger>
        <DialogContent className="text-black p-10">
          <DialogHeader>
            <DialogTitle>Published your Post</DialogTitle>
            <DialogDescription>
              Fill in the form below to publish your article
            </DialogDescription>
            <form className="space-y-2" onSubmit={handlePublishedDraft}>
              {/* Thumbnail Upload */}
              <div>
                <Label htmlFor="thumbnail-image">
                  Thumbnail for the post:{" "}
                </Label>
                <p className="text-xs pb-2 text-left text-black leading-2 text-black/60 text-wrap">
                  Add an image to your post for better engagement! If you don't
                  have one, we'll use the blog cover image. Please make sure the
                  image is high-resolution and related to your post.
                </p>
                <Input
                  id="thumbnail-image"
                  type="file"
                  className="hidden"
                  ref={thumbnailRef}
                  onChange={handleFileChange}
                />
                <div
                  onClick={() => thumbnailRef.current?.click()}
                  className="flex items-center justify-center w-full h-64 p-2 rounded-lg bg-slate-100 outline-dashed focus:outline-2 outline-offset-2 focus:ring outline-slate-500/50 space-x-3"
                >
                  {thumbnail ? (
                    <div className="relative w-full h-64">
                      <img
                        src={URL.createObjectURL(thumbnail)}
                        alt="thumbnail"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        className="absolute top-2 right-2"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          setThumbnail(null);
                          if (thumbnailRef.current) {
                            thumbnailRef.current.value = ""; // Reset the file input
                          }
                        }}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload />
                      <p>Upload Thumbnail</p>
                    </>
                  )}
                </div>
              </div>

              {/* Custom Slug */}
              <div className="flex items-end space-x-2">
                <div className="flex flex-col space-y-2 flex-grow">
                  <Label
                    htmlFor="slug"
                    className="text-sm font-medium text-gray-700"
                  >
                    Add custom slug:
                  </Label>
                  <Input
                    id="slug"
                    type="text"
                    placeholder="Enter your custom slug"
                    className={`"w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" ${
                      isSlugValid ? "border-green-500" : "border-red-500"
                    }`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPublished({ ...published, slug: e.target.value })
                    }
                  />
                  <p>
                    {isSlugValid
                      ? "Your slug is unique!"
                      : "Please try again with different slug"}
                  </p>
                </div>
                <Button
                  onClick={handleCheckValidSlug}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Add Slug
                </Button>
              </div>

              {/* Add Tag */}
              {/* <div className="flex items-end space-x-2">
                <div className="flex flex-col space-y-2 flex-grow">
                  <Label
                    htmlFor="custom-slug"
                    className="text-sm font-medium text-gray-700"
                  >
                    Add Tag to your post:
                  </Label>
                  <Input
                    id="custom-slug"
                    type="text"
                    placeholder="Enter related tags"
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Add Tag
                </Button>

                {<span></span>}
              </div> */}

              {/* Add Category */}
              <div className="flex items-end space-x-2">
                <div className="flex flex-col space-y-2 flex-grow">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700"
                  >
                    Which category does your post belong to?
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setPublished({ ...published, category: value })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose a Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Add Category
                </Button>
              </div>
              <Button type="submit" className="w-full">
                <BookCheck />
                Published
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublishButton;
