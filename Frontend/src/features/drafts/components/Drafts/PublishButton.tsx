import React, { ChangeEvent } from "react";
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
import {
  removeDraftThumbnailService,
  uploadDraftThumbnailService,
} from "@/services/api/draftApiServices";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateSelectedDraft } from "../../slices/draftSlice";
import { toast } from "sonner";
import Loader from "@/components/Loader/Loader";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useDraftPublish } from "../../hooks/useDraftPublish";

const PublishButton: React.FC = () => {
  const dispatch = useDispatch();
  const { draftId: id } = useParams<{ draftId: string }>() || {};
  const draftState = useSelector(
    (state: RootState) => state.draft.selectedDraft
  );
  const { loading, selectFile, handleFileChange, handleFileRemove } =
    useFileUpload({
      fileName: "thumnailImage",
      onUploadService: uploadDraftThumbnailService,
      onUploadSuccess: (response) => {
        dispatch(updateSelectedDraft({ thumbnailImage: response?.thumbnail }));
        toast.success("Thumbnail uploaded successfully!");
      },
      onRemoveService: removeDraftThumbnailService,
      onRemoveSuccess: () => {
        dispatch(updateSelectedDraft({ thumbnailImage: "" }));
        toast.success("Thumbnail removed successfully!");
      },
    });

  const {
    published,
    setPublished,
    isSlugValid,
    handlePublishedDraft,
    handleCheckValidSlug,
  } = useDraftPublish(id);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"default"}>
            <Rss />
            Publish
          </Button>
        </DialogTrigger>
        <DialogContent className="p-10 ">
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
                <p className="pb-2 text-xs text-left leading-2 text-muted-foreground text-wrap">
                  Add an image to your post for better engagement! If you don't
                  have one, we'll use the blog cover image. Please make sure the
                  image is high-resolution and related to your post.
                </p>
                <Input
                  id="thumbnail-image"
                  type="file"
                  className="hidden"
                  ref={selectFile}
                  onChange={(e) => handleFileChange(e, draftState?.id || "")}
                  disabled={loading}
                />
                <div
                  onClick={() => {
                    if (selectFile.current && !loading) {
                      selectFile.current.click();
                    } else if (loading) {
                      // If loading is true, do not open the file input dialog
                      toast.error("Please wait for the upload to finish.");
                    }
                  }}
                  className="flex items-center justify-center w-full h-64 p-2 space-x-3 rounded-lg outline-dashed focus:outline-2 outline-offset-2"
                >
                  {draftState && draftState?.thumbnailImage ? (
                    <div className="relative w-full h-64 p-2">
                      {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                          <Loader size={15} />
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={draftState?.thumbnailImage}
                            alt="thumbnail"
                            className="object-cover w-full h-full rounded-lg"
                          />
                          <button
                            className="absolute top-2 right-2"
                            type="button"
                            onClick={(e) =>
                              handleFileRemove(e, draftState?.id || "")
                            }
                            disabled={loading}
                          >
                            <Trash2 color="red" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload />
                      <p>Upload Thumbnail</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Slug */}
              <div className="flex items-center space-x-2">
                <div className="flex flex-col space-y-2 grow">
                  <Label
                    htmlFor="slug"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Add custom slug:
                  </Label>
                  <Input
                    id="slug"
                    type="text"
                    placeholder="Enter your custom slug"
                    className={`"w-full bg-background text-muted-foreground border p-2 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500" ${
                      isSlugValid === true
                        ? "border-green-500"
                        : isSlugValid === false
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPublished({ ...published, slug: e.target.value })
                    }
                  />
                  <div className="h-6">
                    {isSlugValid === true && (
                      <p className="text-green-500">Your slug is unique!</p>
                    )}
                    {isSlugValid === false && (
                      <p className="text-red-500">
                        Please try again with a different slug
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleCheckValidSlug}
                  variant={"outline"}
                  className="h-10"
                  disabled={!published.slug}
                >
                  Add Slug
                </Button>
              </div>

              {/* Add Category */}
              <div className="flex items-end space-x-2">
                <div className="flex flex-col space-y-2 grow">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Which category does your post belong to?
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setPublished({ ...published, category: value })
                    }
                  >
                    <SelectTrigger className="w-full">
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

// Handle file change event
// This function is triggered when a file is selected in the file input
// const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
//   const file = e.target?.files?.[0];
//   // If no file is selected
//   if (!file) return;

//   // Check if the file type is valid
//   const valid = fileValidations(file);
//   if (typeof valid === "object" && valid?.error === true) {
//     toast.error(valid?.message || "Invalid file type");
//     return;
//   }

//   // Upload the thumbnail
//   const data = new FormData();
//   // Append the image to the form data
//   data.append("thumnailImage", file);
//   setLoading(true); // Set loading state to true while uploading
//   const response = await uploadDraftThumbnailService(id || "", data);
//   dispatch(updateSelectedDraft({ thumbnailImage: response?.thumbnail }));
//   toast.success("Thumbnail uploaded successfully!");
//   setLoading(false); // Reset loading state after upload

//   // Reset the thumbnail state after upload
//   if (thumbnailRef.current) {
//     thumbnailRef.current.value = ""; // Reset the file input
//   }
// };
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