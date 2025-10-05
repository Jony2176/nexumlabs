import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    const getBarColor = () => {
        if (percentage > 90) return 'bg-red-500';
        if (percentage > 70) return 'bg-yellow-500';
        return 'bg-purple-500';
    };

    return (
        <div>
            <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-400">{label}</span>
                <span className="font-mono text-gray-300">{value} / {max}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                    className={`h-1.5 rounded-full ${getBarColor()}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;