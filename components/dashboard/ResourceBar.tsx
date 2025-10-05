
import React from 'react';

const ResourceBar: React.FC<{
  name: string;
  used: string | number;
  limit: string | number;
  percentage: number;
}> = ({ name, used, limit, percentage }) => {
  const getBarColor = () => {
    if (percentage > 80) return 'bg-red-500';
    if (percentage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const isUnlimited = typeof limit === 'string' && limit.toLowerCase() === 'ilimitado';
  const displayPercentage = isUnlimited ? 100 : percentage;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="theme-text-secondary font-medium">{name}</span>
        <span className="theme-text-muted">{used} {isUnlimited ? '' : `/ ${limit}`}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getBarColor()}`}
          style={{ width: `${displayPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ResourceBar;