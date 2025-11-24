import React from 'react';
import Card from './Card';

const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </Card>
  );
};

export default CardSkeleton;
