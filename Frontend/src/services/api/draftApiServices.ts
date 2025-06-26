import { DRAFT_URL } from '@/constants'
import { api } from './apiInstance'
import { AxiosError } from 'axios'

interface PostContent {
  title: string
  content: string
}

/**
 * @name createDraftService
 *
 * @description Service to create a new draft.
 * @returns {Promise<ApiResponse<{ draft: Draft }>>} A promise that resolves to an ApiResponse containing the created draft.
 * @throws {Error} if draft generation fails.
 */

export const createDraftService = async () => {
  try {
    // The response is an ApiResponse containing the created draft
    const response = await api.post(`${DRAFT_URL}/new`)
    if (response.status !== 200) {
      throw new Error(`Draft generation failed: ${response.data}`)
    }

    return response.data?.data
  } catch (error) {
    console.error(error)
    throw new Error('Draft generation failed')
  }
}

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
  data: PostContent,
): Promise<void> => {
  try {
    await api.patch(`${DRAFT_URL}/${id}`, data)
  } catch (error) {
    throw new Error(`${(error as AxiosError)?.message}`)
  }
}

/**
 * @name getDraftService
 *
 * @description Service to retrieve a draft by its ID.
 * @param {string} id - The ID of the draft to retrieve.
 * @returns {Promise<ApiResponse<{ draft: Draft }>>} A promise that resolves to an ApiResponse containing the requested draft.
 * @throws {Error} if draft retrieval fails.
 */

export const getDraftService = async (id: string) => {
  try {
    const response = await api.get(`${DRAFT_URL}/${id}`)

    if (!response.data) {
      throw new Error(`Draft generation failed: ${response.data}`)
    }

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Draft generation failed')
  }
}

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
    await api.delete(`${DRAFT_URL}/${id}`)
  } catch (error) {
    throw new Error(`${(error as AxiosError)?.message}`)
  }
}

/**
 * @name allDraftsService
 *
 * @description Service to retrieve all drafts.
 * @returns {Promise<ApiResponse<{ draft: Draft[] }>>} A promise that resolves to an ApiResponse containing an array of all drafts.
 * @throws {Error} if retrieval of all drafts fails.
 */

export const allDraftsService = async () => {
  try {
    const response = await api.get(`${DRAFT_URL}/`)
    return response.data
  } catch (error) {
    console.error(
      `"Error fetching drafts:", ${(error as Error).message} || ${error}`,
    )
    throw new Error('Failed to fetch drafts.')
  }
}

export const checkIsSlugAvailableService = async (
  id: string,
  slug: string,
): Promise<boolean | void> => {
  try {
    const response = await api.post(`v1/published/${id}`, { slug })

    if (!response.data) {
      throw new Error(`Failed to check if slug is available: ${response.data}`)
    }

    return response.data.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to check if slug is available.')
  }
}

export const uploadDraftCoverImageService = async (
  id: string,
  data: FormData,
) => {
  try {
    const response = await api.post(
      `${DRAFT_URL}/${id}/cover-image/upload/`,
      data,
    )

    if (!response.data) {
      throw new Error(`Failed to upload draft cover image: ${response.data}`)
    }

    return response.data?.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to upload draft cover image.')
  }
}

export const uploadUnslashImageService = async (
  id: string,
  data: { unsplashUrl: string },
) => {
  try {
    const response = await api.post(
      `${DRAFT_URL}/${id}/cover-image/upload`,
      data,
    )

    if (!response.data) {
      throw new Error(`Failed to upload unsplash response: ${response.data}`)
    }

    return response.data.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to upload unsplash image.')
  }
}

export const removeDraftCoverImageService = async (
  id: string,
): Promise<void> => {
  try {
    await api.delete(`${DRAFT_URL}/${id}/cover-image/remove/`)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to remove draft cover image.')
  }
}

// {{BASE_URL}}/drafts/b8ccdc53-a416-483d-8eaf-990d2f465de2/thumbnail/upload/
export const uploadDraftThumbnailService = async (
  id: string,
  file: FormData,
) => {
  try {
    const response = await api.post(`${DRAFT_URL}/${id}/thumbnail/upload`, file)

    if (!response.data) {
      throw new Error(`Failed to upload draft thumbnail: ${response.data}`)
    }

    return response.data.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to upload draft thumbnail.')
  }
}

export const removeDraftThumbnailService = async (
  id: string,
): Promise<void> => {
  try {
    await api.delete(`${DRAFT_URL}/${id}/thumbnail/remove`)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to remove draft thumbnail.')
  }
}

export const previewDraftService = async (id: string) => {
  try {
    const response = await api.get(`${DRAFT_URL}/${id}/preview`)

    if (!response.data) {
      throw new Error(`Failed to preview draft: ${response.data}`)
    }

    return response.data.data
  } catch (error) {
    throw new Error(`${(error as AxiosError)?.message}`)
  }
}
