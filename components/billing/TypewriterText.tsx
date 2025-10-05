import React from 'react';
// FIX: Define motion components as variables to resolve TypeScript type inference errors with framer-motion props.
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
}

// FIX: Define motion components as variables to resolve TypeScript type inference errors with framer-motion props.
const MotionDiv = motion.div;
const MotionSpan = motion.span;

const TypewriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        // FIX: Added 'as const' to the 'type' property to satisfy framer-motion's strict type requirements.
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        // FIX: Added 'as const' to the 'type' property to satisfy framer-motion's strict type requirements.
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <MotionDiv
      style={{ display: 'inline-flex' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <MotionSpan variants={child} key={index}>
          {char === ' ' ? '\u00A0' : char}
        </MotionSpan>
      ))}
      <MotionSpan 
        className="inline-block w-2 h-4 bg-current"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </MotionDiv>
  );
};

export default TypewriterText;