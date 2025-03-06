import { OPEN_AI_URL } from "@/constants/constants";
import { apiInstance } from "../api/apiInstance";

export const simplifyTextContent = async (prompt: string) => {
    try {
        const response = await apiInstance.post(
            `${OPEN_AI_URL}/simplify-text`,
            { prompt }
        );

        if (response.status !== 200) {
            throw new Error("Failed to simplify text");
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }

  
};

export const changeTone = async (prompt: string, tone: string) => {
    try {
        const response = await apiInstance.post(
            `${OPEN_AI_URL}/tone-text`,
            { prompt, tone }
        );

        if (response.status !== 200) {
            throw new Error("Failed to tone text");
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const translateTextContent = async (prompt: string, language: string) => {
    try {
        const response = await apiInstance.post(
            `${OPEN_AI_URL}/translate-text`,
            { prompt, language }
        );

        if (response.status !== 200) {
            throw new Error("Failed to translate text");
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }
};