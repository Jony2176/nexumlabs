import { create } from 'zustand';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  toggleChat: () => void;
  addMessage: (message: Message) => void;
  setInitialMessage: (userName: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  isOpen: false,
  messages: [],
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setInitialMessage: (userName) => {
    if (get().messages.length === 0) {
        set({
            messages: [
                { id: 1, role: 'bot', text: `¡Hola ${userName}! Soy tu asistente de IA. Pregúntame lo que necesites saber sobre los datos de tu estudio.` }
            ]
        });
    }
  },
}));
