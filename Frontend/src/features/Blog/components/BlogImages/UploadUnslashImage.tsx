import { Img, Input } from "@/components";
import { useDebounce } from "@/hooks/useDebounce";
import unsplashService from "@/services/unsplashApi/unsplashService";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCoverImage } from "../../slices/blogSlice";

const UploadUnslashImage: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");
  const [images, setImages] = React.useState<string[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string>("");

  const dispatch = useDispatch();
  const handleSearchImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebounce(search, 1000);

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
    dispatch(setCoverImage({ coverImageUrl: selectedImage }));
  };

  useEffect(() => {
    if (debouncedSearch) {
      const fetchImages = async () => {
        try {
          const response = await unsplashService.searchPhotos(debouncedSearch);
          console.log("Response: ", response);
          const urls = response.results.map(
            (image: { urls: { full: string } }) => image.urls.full
          );
          setImages(urls);
        } catch (error) {
          console.log("Error: ", error);
        }
      };

      fetchImages();
    } else {
      setImages([]);
    }

    return () => {
      setImages([]);
    };
  }, [debouncedSearch]);

  return (
    <div className="w-full min-h-full">
      <div className="w-full h-full p-2">
        <Input
          id="search-img"
          type="search"
          placeholder="Search Image"
          onChange={(e) => handleSearchImage(e)}
          className="w-full p-4 border border-gray-300 rounded focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full p-2 overflow-auto h-96">
        <div className="flex flex-wrap justify-start min-h-full border-2 border-black rounded-md">
          <div className="relative w-full p-2">
            {images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {images.map((image: string, index: number) => (
                  <div key={index} className="relative p-2">
                    <Img
                      src={image}
                      alt={`unsplash-image-${index}`}
                      cn="object-cover w-full h-48 rounded-md"
                      onClick={() => handleSelectImage(image)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-center">
                  Search suitable Image for your post
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadUnslashImage;
