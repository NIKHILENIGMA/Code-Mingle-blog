import { DRAFT_URL } from "@/constants/constants";
import { apiInstance } from "./apiInstance";
import { Draft } from "@/Types/draft";
import { AxiosError } from "axios";
import { ApiResponse } from "@/Types/app-response";

interface PostContent {
  title: string;
  content: string;
}

/**
 * @name createDraftService
 *
 * @description Service to create a new draft.
 * @returns {Promise<ApiResponse<{ draft: Draft }>>} A promise that resolves to an ApiResponse containing the created draft.
 * @throws {Error} if draft generation fails.
 */

export const createDraftService = async (): Promise<
  ApiResponse<{ draft: Draft }>
> => {
  try {
    // The response is an ApiResponse containing the created draft    
    const response = await apiInstance.post(`${DRAFT_URL}/newDraft`);
    if (response.status !== 200) {
      throw new Error(`Draft generation failed: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Draft generation failed");
  }
};

/**
 * @name autoSaveService
 *
 * @description Service to automatically save a draft.
 * @param {string} id - The ID of the draft to save.
 * @param {PostContent} data - The content to save in the draft.
 * @returns {Promise<void>} A promise that resolves when the draft is successfully saved.
 * @throws {Error} if auto-saving the draft fails.
 */

export const updateDraftService = async (
  id: string,
  data: PostContent
): Promise<void> => {
  try {
    await apiInstance.patch(`${DRAFT_URL}/${id}/save`, data);
  } catch (error) {
    throw new Error(`${(error as AxiosError)?.message}`);
  }
};

/**
 * @name getDraftService
 *
 * @description Service to retrieve a draft by its ID.
 * @param {string} id - The ID of the draft to retrieve.
 * @returns {Promise<ApiResponse<{ draft: Draft }>>} A promise that resolves to an ApiResponse containing the requested draft.
 * @throws {Error} if draft retrieval fails.
 */

export const getDraftService = async (
  id: string
): Promise<ApiResponse<{ draft: Draft }>> => {
  try {
    const response = await apiInstance.get(`${DRAFT_URL}/${id}`);

    if (!response.data) {
      throw new Error(`Draft generation failed: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Draft generation failed");
  }
};

/**
 * @name deleteDraftService
 *
 * @description Service to delete a draft by its ID.
 * @param {string} id - The ID of the draft to delete.
 * @returns {Promise<void>} A promise that resolves when the draft is successfully deleted.
 * @throws {Error} if draft deletion fails.
 */

export const deleteDraftService = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`${DRAFT_URL}/remove/${id}`);
  } catch (error) {
    throw new Error(`${(error as AxiosError)?.message}`);
  }
};

/**
 * @name allDraftsService
 *
 * @description Service to retrieve all drafts.
 * @returns {Promise<ApiResponse<{ draft: Draft[] }>>} A promise that resolves to an ApiResponse containing an array of all drafts.
 * @throws {Error} if retrieval of all drafts fails.
 */

export const allDraftsService = async (): Promise<
  ApiResponse<{ drafts: Draft[] }>
> => {
  try {
    const response = await apiInstance.get<ApiResponse<{ drafts: Draft[] }>>(
      `${DRAFT_URL}/users-drafts`
    );
    return response.data; // The Axios response data already matches the expected type
  } catch (error) {
    console.error(
      `"Error fetching drafts:", ${(error as Error).message} || ${error}`
    );
    throw new Error("Failed to fetch drafts.");
  }
};
