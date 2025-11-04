import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, CornerDownLeft, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';
// FIX: Imported the Button component to resolve 'Cannot find name' errors.
import Button from '../components/ui/Button';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

const TypingIndicator = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
    >
        <div className="w-10 h-10 bg-gradient-to-br from-nexum-primary to-nexum-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="p-3 bg-bg-surface rounded-lg flex items-center gap-1">
            <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-text-muted rounded-full"/>
            <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} className="w-2 h-2 bg-text-muted rounded-full"/>
            <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-2 h-2 bg-text-muted rounded-full"/>
        </div>
    </motion.div>
);

const ChatDataPage: React.FC = () => {
    const { user } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMessages([
            { id: 1, role: 'bot', text: `¡Hola ${user?.firstName}! Soy tu asistente de IA. Pregúntame lo que necesites saber sobre los datos de tu estudio.` }
        ]);
        inputRef.current?.focus();
    }, [user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const newUserMessage: Message = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await api.chatWithData(input);
            const botResponseText = response.response || response.text || response.answer || "No he podido procesar tu solicitud. Intenta de nuevo.";
            const newBotMessage: Message = { id: Date.now() + 1, role: 'bot', text: botResponseText };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (error) {
            toast.error("Error al conectar con el asistente de IA.");
            const errorMessage: Message = { id: Date.now() + 1, role: 'bot', text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta más tarde." };
            setMessages(prev => [...prev, errorMessage]);
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
        <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
            <header className="text-center mb-6">
                 <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Chat con tus Datos
                </h1>
                <p className="text-text-secondary mt-1">Consulta métricas y obtén insights en lenguaje natural.</p>
            </header>

            <div ref={messagesEndRef} className="flex-grow overflow-y-auto pr-4 space-y-6">
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
                                <div className="w-10 h-10 bg-gradient-to-br from-nexum-primary to-nexum-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                            )}
                            <div className={cn(
                                'max-w-md p-3 rounded-2xl text-sm leading-relaxed',
                                msg.role === 'user' ? 'bg-gradient-to-r from-nexum-gradient-start to-nexum-gradient-end text-white rounded-br-none' : 'bg-bg-surface rounded-bl-none'
                            )}>
                                {msg.text}
                            </div>
                             {msg.role === 'user' && (
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-gray-300" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {isTyping && <TypingIndicator />}
                </AnimatePresence>
            </div>

            <div className="pt-6">
                <div className="flex gap-2 mb-2">
                    {quickQuestions.map(q => (
                        <button key={q} onClick={() => setInput(q)} className="px-3 py-1 bg-bg-surface border border-border-color rounded-full text-xs text-text-secondary hover:bg-bg-secondary">
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
                        placeholder="Ej: ¿Cuál fue el ingreso total del último trimestre?"
                        className="input-premium w-full !pr-24"
                        disabled={isTyping}
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                         <kbd className="hidden sm:inline-flex items-center gap-1 rounded border bg-bg-surface px-2 font-mono text-xs text-text-muted">
                            <CornerDownLeft size={12} /> Enter
                        </kbd>
                        <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
                            <Send className="w-5 h-5"/>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatDataPage;