'use client';

import { TerminalIcon } from 'lucide-react';
import { useLogs } from './LogContext';
import { useRef } from 'react';

export default function SystemConsole() {
  const { logs } = useLogs();
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <div className='w-full max-w-4xl mx-auto rounded-lg border bg-background/90 backdrop-blur-md font-mono text-xs shadow-xl mb-20'>
      <div className='flex items-center gap-2 border-b bg-muted/50 px-4 py-2'>
        <TerminalIcon className='w-3 h-3 text-muted-foreground' />
        <span className='font-semibold tracking-wider text-muted-foreground'>
          SYSTEM KERNEL EVENTS
        </span>

        <div className='ml-auto flex gap-1.5'>
          <div className='size-2 rounded-full border bg-destructive border-destructive' />
          <div className='size-2 rounded-full border bg-warning border-warning' />
          <div className='size-2 rounded-full border bg-primary border-primary' />
        </div>
      </div>

      <ul ref={listRef} className='min-h-[120px] space-y-1.5 p-4'>
        {logs.length === 0 && (
          <li className='italic text-muted-foreground'>
            Waiting for system events...
          </li>
        )}

        {logs.map((log) => (
          <li
            key={log.id}
            className='flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300'
          >
            <span className='shrink-0 text-muted-foreground'>
              [{log.timestamp}]
            </span>

            <span
              className={`
                shrink-0 font-bold
                ${
                  log.source === 'SSR'
                    ? 'text-warning'
                    : log.source === 'ISR'
                      ? 'text-chart-3'
                      : log.source === 'CSR'
                        ? 'text-primary'
                        : 'text-chart-2'
                }
              `}
            >
              {log.source}
            </span>

            <span className='text-foreground/80'>{log.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
