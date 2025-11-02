import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import { useChatStore } from '../../store/chatStore';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

const TypingIndicator = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
    >
        <div className="w-8 h-8 bg-gradient-to-br from-nexum-primary to-nexum-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="p-3 bg-bg-surface rounded-lg flex items-center gap-1.5">
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-text-muted rounded-full"/>
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} className="w-2 h-2 bg-text-muted rounded-full"/>
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-2 h-2 bg-text-muted rounded-full"/>
        </div>
    </motion.div>
);

const FloatingChatWindow: React.FC = () => {
    const { user } = useAuthStore();
    const { isOpen, toggleChat, messages, addMessage, setInitialMessage } = useChatStore();
    
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setInitialMessage(user.firstName);
        }
    }, [user, setInitialMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);
    
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e: React.FormEvent, question?: string) => {
        e.preventDefault();
        const query = question || input;
        if (!query.trim() || isTyping) return;

        const newUserMessage: Message = { id: Date.now(), role: 'user', text: query };
        addMessage(newUserMessage);
        setInput('');
        setIsTyping(true);

        try {
            const response = await api.chatWithData(query);
            const botResponseText = response.response || "No he podido procesar tu solicitud. Intenta de nuevo.";
            const newBotMessage: Message = { id: Date.now() + 1, role: 'bot', text: botResponseText };
            addMessage(newBotMessage);
        } catch (error) {
            toast.error("Error al conectar con el asistente de IA.");
            const errorMessage: Message = { id: Date.now() + 1, role: 'bot', text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta más tarde." };
            addMessage(errorMessage);
        } finally {
            setIsTyping(false);
        }
    };

    const quickQuestions = [
        "¿Cuál es el MRR actual?",
        "¿Cuántos clientes activos tenemos?",
        "Resume el rendimiento del mejor afiliado este mes."
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[600px] z-40"
                >
                    <div className="glass-card shadow-2xl shadow-black/30 h-full flex flex-col">
                        {/* Header */}
                        <header className="flex items-center justify-between p-4 border-b border-border-color flex-shrink-0">
                             <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                <h2 className="font-bold text-text-primary">Asistente IA</h2>
                            </div>
                            <button onClick={toggleChat} className="p-1 rounded-full text-text-muted hover:bg-black/10 hover:text-text-primary">
                                <X className="w-5 h-5" />
                            </button>
                        </header>

                        {/* Messages */}
                        <div ref={messagesEndRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                            <AnimatePresence>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                                    >
                                        {msg.role === 'bot' && (
                                            <div className="w-8 h-8 bg-gradient-to-br from-nexum-primary to-nexum-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                        <div className={cn(
                                            'max-w-xs p-3 rounded-2xl text-sm leading-relaxed',
                                            msg.role === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' : 'bg-bg-surface text-text-primary rounded-bl-none'
                                        )}>
                                            {msg.text}
                                        </div>
                                        {msg.role === 'user' && (
                                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                {isTyping && <TypingIndicator />}
                            </AnimatePresence>
                        </div>
                        
                        {/* Input */}
                        <div className="p-4 border-t border-border-color flex-shrink-0">
                            <div className="flex gap-2 mb-2 flex-wrap">
                                {messages.length <= 1 && quickQuestions.map(q => (
                                    <button key={q} onClick={(e) => handleSendMessage(e, q)} className="px-3 py-1 bg-bg-surface border border-border-color rounded-full text-xs text-text-secondary hover:bg-bg-secondary">
                                        {q}
                                    </button>
                                ))}
                            </div>
                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Pregúntame algo..."
                                    className="input-premium w-full !pr-12 !min-h-0 !h-11"
                                    disabled={isTyping}
                                />
                                <button type="submit" disabled={isTyping || !input.trim()} className="absolute inset-y-0 right-1.5 flex items-center justify-center w-8 h-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 transition-colors">
                                    {isTyping ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingChatWindow;