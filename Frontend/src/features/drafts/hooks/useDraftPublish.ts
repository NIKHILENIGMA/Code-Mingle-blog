import { FormEvent, MouseEvent, useState } from "react";
import { checkIsSlugAvailableService } from "@/services/api/draftApiServices";

interface PublishedState {
    slug: string;
    category: string;
  }

export const useDraftPublish = (id?: string) => {
  const [published, setPublished] = useState<PublishedState>({
    slug: "",
    category: "",
  });
  const [isSlugValid, setIsSlugValid] = useState<boolean | null>(null);
  // Handle form submission for publishing the draft
  const handlePublishedDraft = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the slug is valid before proceeding
    const formData = new FormData();
    formData.append("slug", published.slug);
    formData.append("category", published.category);
    setPublished({ slug: "", category: "" });
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  // Handle slug validation
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

  return {
    published,
    setPublished,
    isSlugValid,
    handlePublishedDraft,
    handleCheckValidSlug,
  }
};
