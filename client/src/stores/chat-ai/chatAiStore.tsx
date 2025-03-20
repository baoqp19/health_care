
import { create } from 'zustand';

// Định nghĩa kiểu dữ liệu cho tin nhắn
interface Message {
    sender: 'ai' | 'user';
    text: string;
}

// Định nghĩa kiểu dữ liệu cho store Zustand
interface ChatAiStore {
    messages: Message[];
    addMessage: (message: Message) => void;
}

export const useChatAiStore = create<ChatAiStore>((set) => ({
    messages: [
        { sender: 'ai', text: 'Xin chào, tôi có thể giúp gì cho bạn?' },
    ],
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
    })),
}));