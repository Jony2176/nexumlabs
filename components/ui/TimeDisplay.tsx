import React, { useState, useEffect } from 'react';
import { argentinaTimeService } from '../../utils/argentinaTime';

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => setCurrentTime(argentinaTimeService.now());
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xs text-text-secondary hidden sm:block">
      <span>{currentTime}</span>
      <span className="font-semibold text-text-muted"> (ARG)</span>
    </div>
  );
};

export default TimeDisplay;