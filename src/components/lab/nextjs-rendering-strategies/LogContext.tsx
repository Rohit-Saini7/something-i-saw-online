'use client';
import { createContext, useContext, useState, useCallback } from 'react';

type LogType = 'info' | 'success' | 'warning' | 'error';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  source: string;
  type: LogType;
}

interface LogContextType {
  logs: LogEntry[];
  addLog: (source: string, message: string, type?: LogType) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export default function LogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback(
    (source: string, message: string, type: LogType = 'info') => {
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString().split(' ')[0],
        source,
        message,
        type,
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 18));
    },
    []
  );

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
}

export const useLogs = () => {
  const context = useContext(LogContext);
  if (!context) throw new Error('useLogs must be used within LogProvider');
  return context;
};
