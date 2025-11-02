import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';

const FloatingChatButton: React.FC = () => {
    const { isOpen, toggleChat } = useChatStore();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 w-16 h-16 btn-primary-premium rounded-full flex items-center justify-center z-50"
            aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
            <AnimatePresence initial={false}>
                <motion.div
                    key={isOpen ? 'x' : 'bot'}
                    initial={{ y: -20, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute' }}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

export default FloatingChatButton;
