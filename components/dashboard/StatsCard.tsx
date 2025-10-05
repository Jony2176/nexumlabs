
import React from 'react';

interface StatsCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  change?: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change }) => {
  const renderChange = () => {
    if (change === undefined || change === null) {
      return null;
    }

    let numericChange: number;
    if (typeof change === 'string') {
      // Attempt to parse a number from the string, removing symbols like %, +, etc.
      numericChange = parseFloat(change.replace(/[^0-9.-]+/g, ''));
      if (isNaN(numericChange)) return null; // Not a valid number string
    } else {
      numericChange = change;
    }

    const isPositive = numericChange > 0;
    
    return (
      <p className={`text-sm mt-2 flex items-center gap-1 font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(numericChange)}%
        <span className="font-normal theme-text-secondary ml-1">vs mes anterior</span>
      </p>
    );
  };
  
  return (
    <div className="theme-bg-card rounded-xl p-6 shadow-sm border theme-border hover:shadow-lg transition-shadow hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium theme-text-secondary">{title}</p>
          <div className="text-3xl font-bold theme-text-primary mt-2">{value}</div>
          {renderChange()}
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;