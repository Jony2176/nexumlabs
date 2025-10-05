import React from 'react';

interface HealthIndicatorProps {
  score: number;
}

const HealthIndicator: React.FC<HealthIndicatorProps> = ({ score }) => {
    const getScoreColor = () => {
        if (score > 70) return 'text-green-400';
        if (score > 40) return 'text-yellow-400';
        return 'text-red-400';
    };

    const circumference = 2 * Math.PI * 16;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 40 40">
                <circle
                    className="text-gray-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="16"
                    cx="20"
                    cy="20"
                />
                <circle
                    className={getScoreColor()}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="16"
                    cx="20"
                    cy="20"
                    transform="rotate(-90 20 20)"
                />
            </svg>
            <span className={`absolute text-xs font-bold ${getScoreColor()}`}>
                {score}
            </span>
        </div>
    );
};

export default HealthIndicator;