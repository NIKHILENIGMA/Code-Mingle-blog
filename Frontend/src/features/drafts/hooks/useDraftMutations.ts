import {
  createDraftService,
  deleteDraftService,
  updateDraftService,
  uploadDraftCoverImageService,
} from "@/services/api/draftApiServices";
import queryClient from "@/Utils/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useDraftMutations = () => {
    // Mutation for creating a new draft
    const createDraftMutation = useMutation({
        // Unique key for the mutation
        mutationKey: ["createDraft"],
        // Function to call the service for creating a draft
        mutationFn: async () => {
            const response = await createDraftService();
            return response;
        },
        // Callback to invalidate the "drafts" query cache after a successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drafts"] });
        },
    });

    // Mutation for updating an existing draft
    const updateDraftMutation = useMutation({
        // Unique key for the mutation
        mutationKey: ["updateDraft"],
        // Function to call the service for updating a draft
        mutationFn: async ({
            id,
            draft,
        }: {
            id: string;
            draft: { title: string; content: string };
        }) => {
            const response = await updateDraftService(id, draft);
            return response;
        },
        // Callback to invalidate the "drafts" query cache after a successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drafts"] });
        },
    });

    // Mutation for deleting a draft
    const deleteDraftMutation = useMutation({
        // Unique key for the mutation
        mutationKey: ["deleteDraft"],
        // Function to call the service for deleting a draft by its ID
        mutationFn: async (id: string) => {
            const response = await deleteDraftService(id);
            return response;
        },
        // Callback to invalidate the "drafts" query cache after a successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drafts"] });
        },
    });

    // Mutation for uploading a cover image for a draft
    const uploadCoverImageMutation = useMutation({
        // Unique key for the mutation
        mutationKey: ["addDraftCoverImage"],
        // Function to call the service for uploading a cover image
        mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
            const response = await uploadDraftCoverImageService(id, data);
            return response;
        },
        // Callback to invalidate the "drafts" query cache after a successful mutation
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drafts"] });
        },
    });

    // Return all mutations for use in components
    return {
        createDraftMutation,
        updateDraftMutation,
        deleteDraftMutation,
        uploadCoverImageMutation,
    };
};
