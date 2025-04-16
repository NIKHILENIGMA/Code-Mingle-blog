import { OPEN_AI_URL } from "@/constants/constants";
import { apiInstance } from "../api/apiInstance";
import { PromptType, ToneType } from "@/Types/types";

export const simplifyTextContent = async (prompt: string) => {
  try {
    const response = await apiInstance.post(`${OPEN_AI_URL}/simplify-text`, {
      text: prompt,
    });

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
    const response = await apiInstance.post(`${OPEN_AI_URL}/tone-change`, {
      text: prompt,
      type: tone,
    });

    if (response.status !== 200) {
      throw new Error("Failed to tone text");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const translateTextContent = async (
  prompt: string,
  language: string
) => {
  try {
    const response = await apiInstance.post(`${OPEN_AI_URL}/translate-text`, {
      text: prompt,
      type: language,
    });

    if (response.status !== 200) {
      throw new Error("Failed to translate text");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const makeTextLong = async (prompt: string) => {
  try {
    const response = await apiInstance.post(`${OPEN_AI_URL}/make-text-long`, {
      text: prompt,
    });

    if (response.status !== 200) {
      throw new Error("Failed to make text long");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const makeTextShort = async (prompt: string) => {
  try {
    const response = await apiInstance.post(`${OPEN_AI_URL}/make-text-short`, {
      text: prompt,
    });

    if (response.status !== 200) {
      throw new Error("Failed to make text short");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const generateAiContentService = async ({
  prompt,
  tone,
  type,
}: {
  prompt: string;
  tone: ToneType;
  type: PromptType;
}) => {
  try {
    const response = await apiInstance.post(`${OPEN_AI_URL}/generate-ai-content`, {
      text: prompt,
      tone,
      type,
    });

    if (response.status !== 200) {
      throw new Error("Failed to generate AI content");
    }
    
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}
