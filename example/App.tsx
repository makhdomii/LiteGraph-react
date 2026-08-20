import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { buttonBase, chrome } from './chrome';
import { StatusBar, StatusProvider, useStatus } from './components/StatusBar';
import { EXAMPLE_SECTIONS, findExample } from './lib/catalog';

const AppShell: React.FC = () => {
  const location = useLocation();
  const { setStatus } = useStatus();
  const current = findExample(location.pathname);

  useEffect(() => {
    if (current) {
      setStatus(current.hint);
    } else if (location.pathname === '/') {
      setStatus('Browse use cases below — each page is a focused situation.');
    }
  }, [current, location.pathname, setStatus]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: chrome.bg,
        color: chrome.text,
      }}
    >
      <header
        style={{
          background: chrome.bg,
          padding: '12px 20px 10px',
          borderBottom: `1px solid ${chrome.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/" style={{ textDecoration: 'none', color: chrome.text }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 650,
                letterSpacing: '-0.02em',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              LiteGraph React Examples
            </h1>
          </Link>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: chrome.textMuted,
              maxWidth: '52ch',
            }}
          >
            {current ? current.label : 'Multi-page gallery for every use case.'}
          </p>
        </div>

        <nav
          aria-label="Example sections"
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}
        >
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              ...buttonBase,
              background: isActive ? chrome.primary : '#333',
              boxShadow: isActive ? `inset 0 -2px 0 ${chrome.focus}` : undefined,
              textDecoration: 'none',
              display: 'inline-block',
            })}
          >
            Home
          </NavLink>
          {EXAMPLE_SECTIONS.flatMap((section) =>
            section.items.slice(0, section.title === 'Getting started' ? 3 : 0).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  ...buttonBase,
                  background: isActive ? chrome.primary : '#333',
                  boxShadow: isActive ? `inset 0 -2px 0 ${chrome.focus}` : undefined,
                  textDecoration: 'none',
                  display: 'inline-block',
                })}
              >
                {item.label}
              </NavLink>
            ))
          )}
          <span style={{ fontSize: 12, color: chrome.textMuted, marginLeft: 4 }}>
            More examples on Home
          </span>
        </nav>
      </header>

      <StatusBar />

      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <Outlet />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <StatusProvider>
    <AppShell />
  </StatusProvider>
);

export default App;
