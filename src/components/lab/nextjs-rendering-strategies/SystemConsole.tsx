'use client';

import { TerminalIcon } from 'lucide-react';
import { useLogs } from './LogContext';
import { useRef } from 'react';

export default function SystemConsole() {
  const { logs } = useLogs();
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <div className='w-full max-w-4xl mx-auto bg-white/90 dark:bg-black/80 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden font-mono text-xs shadow-xl dark:shadow-2xl backdrop-blur-md mb-20'>
      <div className='bg-gray-50 dark:bg-gray-900/50 px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2'>
        <TerminalIcon className='w-3 h-3 text-gray-500' />
        <span className='text-gray-500 font-semibold tracking-wider'>
          SYSTEM KERNEL EVENTS
        </span>
        <div className='flex gap-1.5 ml-auto'>
          <div className='w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50' />
          <div className='w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50' />
          <div className='w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50' />
        </div>
      </div>

      <ul ref={listRef} className='p-4 space-y-1.5 min-h-[120px]'>
        {logs.length === 0 && (
          <li className='text-gray-400 dark:text-gray-600 italic'>
            Waiting for system events...
          </li>
        )}
        {logs.map((log) => (
          <li
            key={log.id}
            className='flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300'
          >
            <span className='text-gray-400 dark:text-gray-600 shrink-0'>
              [{log.timestamp}]
            </span>
            <span
              className={`font-bold shrink-0 ${
                log.source === 'SSR'
                  ? 'text-green-600 dark:text-green-400'
                  : log.source === 'ISR'
                    ? 'text-purple-600 dark:text-purple-400'
                    : log.source === 'CSR'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-yellow-600 dark:text-yellow-400'
              }`}
            >
              {log.source}
            </span>
            <span className='text-gray-700 dark:text-gray-300'>
              {log.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
