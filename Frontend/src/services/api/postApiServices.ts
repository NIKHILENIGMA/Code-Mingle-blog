import { PUBLISH_URL } from "@/constants";
import { api } from "./apiInstance";


export const getAllPostsService = async () => {
    const allPosts = await api.get(`${PUBLISH_URL}/`);

    if (allPosts.status !== 200) {
        throw new Error("Error fetching posts");
    }

    return allPosts.data;
}