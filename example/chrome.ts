import type React from 'react';

/** Incumbent demo chrome — utilitarian dark IDE palette (no rebrand). */
export const chrome = {
  bg: '#1e1e1e',
  bgRaised: '#2d2d2d',
  border: '#333',
  text: '#fff',
  textMuted: '#b0b0b0',
  primary: '#007acc',
  primaryAlt: '#1976d2',
  danger: '#d32f2f',
  success: '#2e7d32',
  muted: '#666',
  focus: '#4fc3f7',
} as const;

export const focusableControl: React.CSSProperties = {
  outlineOffset: 2,
};

export const buttonBase: React.CSSProperties = {
  padding: '8px 14px',
  color: chrome.text,
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 14,
  lineHeight: 1.3,
  ...focusableControl,
};

export const toolbarStyle: React.CSSProperties = {
  padding: '10px 12px',
  background: chrome.bgRaised,
  color: chrome.text,
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  flexWrap: 'wrap',
  borderBottom: `1px solid ${chrome.border}`,
};

export const STORAGE_KEY = 'litegraph-react-save';

export type StatusProps = { onStatus: (message: string) => void };
