/**
 * @description This function extracts the video ID from a YouTube URL.
 * @param url - The YouTube video URL to extract the ID from.
 * @returns  The extracted video ID or null if the URL is invalid.
 *
 * @example https://www.youtube.com/watch?v=abc123 -> abc123
 * @example https://youtu.be/abc123 -> abc123
 */

export const extractVideoId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);

    // Handle normal watch URLs like: https://www.youtube.com/watch?v=abc123
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    // Handle short links like: https://youtu.be/abc123
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.split("/")[1];
    }

    return null;
  } catch (e) {
    console.log("Invalid URL", e);
    return null;
  }
};

/**
 * @param videoId - The YouTube video ID to create the embed URL for.
 * @description This function creates an embed URL for a YouTube video using its video ID.
 * @returns  The embed URL for the YouTube video.
 *
 * @example abc123 -> https://www.youtube.com/embed/abc123
 * @example xyz456 -> https://www.youtube.com/embed/xyz456
 */
export const createEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};
