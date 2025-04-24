import axios from "axios";
const CHAT_BASE_URL = 'https://server.smartglobalhub.com/api/chat';

export interface ChatMessage {
    id: string;
    text: string;
    sender: "bot" | "user";
}

export interface ChatHistoryResponse {
    chatHistory: { role: string; content: string; timestamp: number }[];
}

const ChatService = {
    sendChatMessage: async (userId: string, userInput: string): Promise<{ botResponse: string }> => {
        try {
            const response = await axios.post<{ botResponse: string }>(CHAT_BASE_URL, { userId, userInput });
            return response.data;
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    },

    getChatHistory: async (userId: string, limit: number = 10, offset: number = 0): Promise<ChatMessage[]> => {
        try {
            const response = await axios.get<ChatHistoryResponse>(`${CHAT_BASE_URL}/history`, {
                params: { userId, limit, offset },
            });

            return response.data?.chatHistory.map((msg, index) => ({
                id: String(index + 1),
                text: msg.content,
                sender: msg.role === "assistant" ? "bot" : "user",
            }));
        } catch (error) {
            console.error("Error fetching chat history:", error);
            return [];
        }
    },
};

export default ChatService;
