import React, { useState, useEffect } from 'react';
import TypewriterText from './TypewriterText';

type Status = 'pending_payment' | 'processing' | 'active' | 'failed';

interface SystemConsoleProps {
    status: Status;
}

const SystemConsole: React.FC<SystemConsoleProps> = ({ status }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const baseLogs = [
      'sys:green:● System Online',
      'sys:gray:[timestamp] Initializing NEXUM Core...',
      'sys:blue:[timestamp] WhatsApp Module: Queued',
      'sys:purple:[timestamp] JurisPredict AI: Loading model...',
    ];

    if (status === 'pending_payment') {
      setLogs([
          ...baseLogs,
          'sys:yellow:[timestamp] Awaiting payment confirmation from gateway...'
      ]);
    } else if (status === 'processing') {
      setLogs([
          ...baseLogs.slice(0, 1),
          'sys:green:[timestamp] Payment confirmed. Signature: a4b1c2d3...',
          'sys:blue:[timestamp] Activating modules...',
          'sys:purple:[timestamp] Configuring user dashboard...'
      ]);
    } else if (status === 'active') {
       setLogs([
          ...baseLogs.slice(0, 1),
          'sys:green:[timestamp] Payment confirmed. Signature: a4b1c2d3...',
          'sys:green:[timestamp] All modules activated successfully.',
          'sys:green:[timestamp] Dashboard access granted.',
          'sys:green:[timestamp] Welcome to NEXUM Platform!',
      ]);
    }
  }, [status]);
  
  const renderLog = (log: string, index: number) => {
      const [type, color, ...textParts] = log.split(':');
      let text = textParts.join(':').replace('[timestamp]', `[${new Date().toLocaleTimeString('en-GB')}]`);
      const colorClass = {
          green: 'text-green-400',
          gray: 'text-gray-500',
          blue: 'text-blue-400',
          purple: 'text-purple-400',
          yellow: 'text-yellow-400',
          red: 'text-red-400'
      }[color] || 'text-gray-400';

      const isLastLog = index === logs.length - 1;

      return (
          <div key={index} className={colorClass}>
              {isLastLog ? <TypewriterText text={text} /> : text}
          </div>
      )
  };

  return (
    <div className="bg-black/80 dark:bg-black/90 backdrop-blur-sm border border-border-color dark:border-nexum-border rounded-lg p-4 font-mono text-sm overflow-hidden h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-gray-500 text-xs ml-2">system.log</span>
      </div>
      
      <div className="space-y-1 h-48 overflow-y-auto">
        {logs.map(renderLog)}
      </div>
    </div>
  );
};

export default SystemConsole;
