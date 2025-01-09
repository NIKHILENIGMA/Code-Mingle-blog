import { DRAFTURL } from "@/constants/constants";
import { apiInstance } from "./apiInstance";
import { Draft } from "@/Types/draft";
import { AxiosError, AxiosResponse } from "axios";
import { PostContent } from "@/features/Blog/components/Drafts/DraftForm";

/**
 * Description: Service to register a user.
 *
 * @param {RegisterUser} data The user data to be registered.
 *
 * @returns {Promise<AxiosResponse>} The response from the server.
 *
 * @throws Will throw an error if the registration fails.
 */

export const createDraftService = async (): Promise<{ data: Draft }> => {
  try {
    const response = await apiInstance.post(`${DRAFTURL}/newDraft`);

    if (!response.data) {
      throw new Error(`Draft generation failed: ${response.data}`);
    }

    console.log("Draft generated successfully: ", response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Draft generation failed");
  }
};

export const updateDraftService = async (
  id: string,
  data: { title: string; content: string }
): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.patch(`${DRAFTURL}/${id}`, data);

    if (!response.data) {
      throw new Error(`Draft generation failed: ${response.data}`);
    }

    console.log("Draft updated successfully: ", response.data);

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Draft generation failed");
  }
};

export const getDraftService = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.get(`${DRAFTURL}/${id}`);

    if (!response.data) {
      throw new Error(`Draft generation failed: ${response.data}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Draft generation failed");
  }
};

export const deleteDraftService = async (id: string): Promise<void> => {
  try {
    await apiInstance.delete(`${DRAFTURL}/${id}`);
  } catch (error) {
    throw new Error(`${(error as AxiosError)?.message}`);
  }
};

export const allDraftsService = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiInstance.get(`${DRAFTURL}`);

    if (!response.data) {
      throw new Error(`Draft generation failed: ${response.data}`);
    }

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Draft generation failed");
  }
};

export const autoSaveService = async (id: string, data: PostContent): Promise<void> => {
  try {
    await apiInstance.patch(`${DRAFTURL}/${id}/save`, data);
  } catch (error) {
    throw new Error(`${(error as AxiosError)?.message}`);
  }
};
