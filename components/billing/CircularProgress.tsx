import React from 'react';
// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number; // 0 to 100
}

// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
const MotionCircle = motion.circle;

const CircularProgress: React.FC<CircularProgressProps> = ({ value }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 70 70">
        <circle
          className="text-border-color dark:text-nexum-border"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
        <MotionCircle
          className="text-primary"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="url(#gradient)"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          transform="rotate(-90 35 35)"
        />
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-gradient-start)" />
                <stop offset="100%" stopColor="var(--accent-gradient-end)" />
            </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-text-primary">{value}%</span>
      </div>
    </div>
  );
};

export default CircularProgress;