import React from 'react';
import { Link } from 'react-router-dom';
import { chrome } from '../chrome';
import { EXAMPLE_SECTIONS } from '../lib/catalog';
import { useStatus } from '../components/StatusBar';

export const HomePage: React.FC = () => {
  const { setStatus } = useStatus();

  React.useEffect(() => {
    setStatus('Browse use cases below — each page is a focused situation.');
  }, [setStatus]);

  return (
    <div
      style={{
        padding: '24px 28px 48px',
        overflow: 'auto',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 650 }}>Example catalog</h2>
      <p style={{ margin: '0 0 28px', color: chrome.textMuted, fontSize: 14, maxWidth: '60ch' }}>
        Separate routes for React wrapper APIs, advanced LiteGraph features, and built-in node
        categories. Open any card to try that situation.
      </p>

      {EXAMPLE_SECTIONS.map((section) => (
        <section key={section.title} style={{ marginBottom: 28 }}>
          <h3
            style={{
              margin: '0 0 12px',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: chrome.textMuted,
            }}
          >
            {section.title}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 12,
            }}
          >
            {section.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  background: chrome.bgRaised,
                  border: `1px solid ${chrome.border}`,
                  borderRadius: 6,
                  color: chrome.text,
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: chrome.textMuted, lineHeight: 1.4 }}>
                  {item.hint}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
