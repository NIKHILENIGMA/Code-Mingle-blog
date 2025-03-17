import { Input, Label } from "@/components";
import { useDebounce } from "@/hooks/useDebounce";
import { uploadUnslashImageService } from "@/services/api/draftApiServices";
import unsplashService from "@/services/unsplashApi/unsplashService";
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSelectedDraft } from "../../slices/draftSlice";

interface UnsplashImageProps {
  id: string;
}

const UnsplashImage: FC<UnsplashImageProps> = ({ id }) => {
  const [unslashURL, setUnslashURL] = useState<string>("");
  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 1000);
  const dispatch = useDispatch();

  // Upload Unsplash URL to the server
  const handleUploadUnsplashURL = async (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setUnslashURL(e.currentTarget.src);
    console.log("Unsplash URL: ", unslashURL);
    
    if (!id) throw new Error("Draft ID is required to upload unsplash image");

    // Upload Unsplash image to the server
    const imageURL = await uploadUnslashImageService(id, {
      unsplashUrl: unslashURL,
    });

    // Update the selected draft with the image URL
    dispatch(updateSelectedDraft({ image: imageURL?.image }));

    // Close the modal
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  const handleSearchUnsplashImage = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const getUnsplashImages = async () => {
      try {
        const response = await unsplashService.searchPhotos(debouncedSearch);
        const urls = response.results.map(
          (image: { urls: { full: string } }) => image.urls.full
        );
        setUnsplashImages(urls);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (debouncedSearch) {
      getUnsplashImages();
    }

    return () => {
      setUnsplashImages([]);
    };
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="unsplash-image">Search for images on Unsplash</Label>
      <Input
        type="text"
        id="unsplash-image"
        placeholder="Search for images on Unsplash"
        className="text-lg focus:ring-2 focus:ring-blue-500"
        onChange={handleSearchUnsplashImage}
      />
      <div className="w-full h-[20vw] my-2 overflow-y-auto overflow-x-hidden border border-gray-300 rounded-lg hide-scrollbar">
        {/* Unsplash Image Grid */}
        <div className="grid grid-cols-3 gap-2 p-2 ">
          {unsplashImages ? (
            unsplashImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="unsplash"
                className="w-full h-20 object-cover cursor-pointer rounded-md hover:opacity-80"
                onClick={handleUploadUnsplashURL}
              />
            ))
          ) : (
            <p>No images found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnsplashImage;
