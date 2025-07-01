import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50">
      <Clock className="w-4 h-4 text-blue-400" />
      <span className="text-sm text-gray-300">
        Time on site: {formatTime(seconds)}
      </span>
    </div>
  );
};

export default Timer;
