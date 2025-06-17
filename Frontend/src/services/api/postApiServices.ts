import { PUBLISH_URL } from "@/constants";
import { apiInstance } from "./apiInstance";


export const getAllPostsService = async () => {
    const allPosts = await apiInstance.get(`${PUBLISH_URL}/`);

    if (allPosts.status !== 200) {
        throw new Error("Error fetching posts");
    }

    return allPosts.data;
}