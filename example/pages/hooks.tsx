import React, { useState } from 'react';
import { GraphCanvas, useGraph } from 'litegraph-react';
import type { SerializedLGraph } from 'litegraph-react';
import { buttonBase, chrome, STORAGE_KEY } from '../chrome';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { placeNode } from '../lib/seedConstWatch';

const GraphControls: React.FC = () => {
  const { setStatus } = useStatus();
  const {
    addNode,
    removeNode,
    selectedNode,
    start,
    stop,
    serialize,
    load,
    clear,
    isReady,
  } = useGraph();
  const [menuOpen, setMenuOpen] = useState(false);
  const [running, setRunning] = useState(true);

  const handleAddConst = () => {
    const node = addNode('basic/const', placeNode());
    setStatus(node ? 'Added Const via useGraph.' : 'Failed to add Const.');
  };

  const handleAddWatch = () => {
    const node = addNode('basic/watch', placeNode());
    setStatus(node ? 'Added Watch via useGraph.' : 'Failed to add Watch.');
  };

  const handleToggleRun = () => {
    if (running) {
      stop();
      setRunning(false);
      setStatus('Graph stopped.');
    } else {
      start();
      setRunning(true);
      setStatus('Graph running.');
    }
  };

  const handleSave = () => {
    const data = serialize();
    if (!data) {
      setStatus('Nothing to save yet.');
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setStatus('Saved graph to localStorage.');
    setMenuOpen(false);
  };

  const handleLoad = () => {
    const saved =
      localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem('lightgraph-save');
    if (!saved) {
      setStatus('No saved graph found.');
      setMenuOpen(false);
      return;
    }
    if (!window.confirm('Replace the current graph with the saved one?')) {
      setStatus('Load cancelled.');
      setMenuOpen(false);
      return;
    }
    try {
      const data = JSON.parse(saved) as SerializedLGraph;
      load(data);
      setStatus('Loaded graph from localStorage.');
    } catch (error) {
      setStatus(`Failed to load graph: ${error instanceof Error ? error.message : String(error)}`);
    }
    setMenuOpen(false);
  };

  const handleClear = () => {
    if (!window.confirm('Clear all nodes from this graph?')) {
      setStatus('Clear cancelled.');
      setMenuOpen(false);
      return;
    }
    clear();
    setStatus('Graph cleared.');
    setMenuOpen(false);
  };

  const handleRemoveSelected = () => {
    if (!selectedNode) return;
    removeNode(selectedNode);
    setStatus('Removed selected node.');
  };

  if (!isReady) {
    return <span style={{ fontSize: 13, color: chrome.textMuted }}>Loading graph…</span>;
  }

  return (
    <>
      <button type="button" onClick={handleAddConst} style={{ ...buttonBase, background: chrome.primary }}>
        Add Const
      </button>
      <button type="button" onClick={handleAddWatch} style={{ ...buttonBase, background: chrome.primary }}>
        Add Watch
      </button>
      <button
        type="button"
        onClick={handleToggleRun}
        aria-pressed={running}
        style={{ ...buttonBase, background: running ? chrome.danger : chrome.success }}
      >
        {running ? 'Stop' : 'Start'}
      </button>
      <button type="button" onClick={handleSave} style={{ ...buttonBase, background: chrome.primaryAlt }}>
        Save
      </button>
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          style={{ ...buttonBase, background: '#333' }}
        >
          More
        </button>
        {menuOpen && (
          <div
            role="menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              minWidth: 180,
              background: chrome.bg,
              border: `1px solid ${chrome.border}`,
              borderRadius: 4,
              padding: 6,
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
            }}
          >
            <button
              type="button"
              role="menuitem"
              onClick={handleLoad}
              style={{ ...buttonBase, background: chrome.primaryAlt, width: '100%', textAlign: 'left' }}
            >
              Load saved
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleRemoveSelected}
              disabled={!selectedNode}
              style={{
                ...buttonBase,
                background: selectedNode ? chrome.danger : chrome.muted,
                cursor: selectedNode ? 'pointer' : 'not-allowed',
                width: '100%',
                textAlign: 'left',
              }}
            >
              Remove selected
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleClear}
              style={{ ...buttonBase, background: chrome.muted, width: '100%', textAlign: 'left' }}
            >
              Clear graph
            </button>
          </div>
        )}
      </div>
      {selectedNode && (
        <span style={{ marginLeft: 4, fontSize: 13, color: chrome.textMuted }}>
          Selected: {selectedNode.title || selectedNode.type}
        </span>
      )}
    </>
  );
};

export const HooksPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(196);

  React.useEffect(() => {
    setStatus('Drive the graph with useGraph: add, run, save, load, clear.');
  }, [setStatus]);

  return (
    <ExampleLayout>
      <GraphCanvas width={size.width} height={size.height} grid={true} minimap={true}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: '10px 12px',
            background: chrome.bgRaised,
            borderBottom: `1px solid ${chrome.border}`,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
          role="toolbar"
          aria-label="Hooks graph actions"
        >
          <GraphControls />
        </div>
      </GraphCanvas>
    </ExampleLayout>
  );
};
