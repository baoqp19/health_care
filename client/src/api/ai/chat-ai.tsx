import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"


interface ChatAiRequest {
    question: string;
}

interface ChatAiResponse {
    data: string; // Giả sử API trả về câu trả lời
}

export const chatAi = async ({ question }: ChatAiRequest): Promise<ChatAiResponse> => {
    const response = await axios.post<ChatAiResponse>(`/openai/ask`, { question });
    console.log(question + "châti")
    console.log(response.data)
    return response.data;
}


export const useChatAi = (options: UseMutationOptions<ChatAiResponse, Error, ChatAiRequest> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;

    return useMutation({
        mutationFn: chatAi,
        onSuccess: (data, ...args) => {
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};