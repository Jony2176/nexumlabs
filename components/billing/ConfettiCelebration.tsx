import React from 'react';
// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
import { motion } from 'framer-motion';

// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
const MotionDiv = motion.div;

const ConfettiCelebration: React.FC = () => {
    const confettiColors = ['#0EA5E9', '#6366F1', '#10B981', '#F59E0B'];

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => {
                const randomXStart = window.innerWidth * Math.random();
                return (
                    <MotionDiv
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        initial={{
                            x: randomXStart,
                            y: -20,
                            rotate: 0,
                            opacity: 1
                        }}
                        animate={{
                            x: randomXStart + (Math.random() - 0.5) * 400,
                            y: window.innerHeight + 20,
                            rotate: Math.random() * 720,
                            opacity: 0
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            ease: 'easeOut',
                            delay: i * 0.05
                        }}
                        style={{
                            background: confettiColors[Math.floor(Math.random() * confettiColors.length)]
                        }}
                    />
                )
            })}
        </div>
    );
};

export default ConfettiCelebration;