import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { chrome } from '../chrome';

type StatusContextValue = {
  status: string;
  setStatus: (message: string) => void;
};

const StatusContext = createContext<StatusContextValue | null>(null);

export function StatusProvider({
  children,
  initial = 'Pick an example from Home or the nav.',
}: {
  children: React.ReactNode;
  initial?: string;
}) {
  const [status, setStatusState] = useState(initial);
  const setStatus = useCallback((message: string) => {
    setStatusState(message);
  }, []);
  const value = useMemo(() => ({ status, setStatus }), [status, setStatus]);
  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
}

export function useStatus(): StatusContextValue {
  const ctx = useContext(StatusContext);
  if (!ctx) {
    throw new Error('useStatus must be used within StatusProvider');
  }
  return ctx;
}

export const StatusBar: React.FC = () => {
  const { status } = useStatus();
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        padding: '8px 20px',
        background: chrome.bgRaised,
        borderBottom: `1px solid ${chrome.border}`,
        fontSize: 13,
        color: chrome.textMuted,
        lineHeight: 1.4,
      }}
    >
      {status}
    </div>
  );
};
