import React from 'react';
import { GraphCanvas, useGraph } from 'litegraph-react';
import { buttonBase, chrome } from '../chrome';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';
import { seedConstWatchGraph } from '../lib/seedConstWatch';

const ViewportControls: React.FC = () => {
  const { setStatus } = useStatus();
  const { zoom, center, fit, isReady } = useGraph();

  if (!isReady) {
    return <span style={{ fontSize: 13, color: chrome.textMuted }}>Loading…</span>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          zoom(1.4);
          setStatus('Zoomed in (+40% relative).');
        }}
        style={{ ...buttonBase, background: chrome.primary }}
      >
        Zoom in
      </button>
      <button
        type="button"
        onClick={() => {
          zoom(0.7);
          setStatus('Zoomed out (−30% relative).');
        }}
        style={{ ...buttonBase, background: chrome.primary }}
      >
        Zoom out
      </button>
      <button
        type="button"
        onClick={() => {
          center();
          setStatus('Centered on the first graph node.');
        }}
        style={{ ...buttonBase, background: chrome.primaryAlt }}
      >
        Center
      </button>
      <button
        type="button"
        onClick={() => {
          fit();
          setStatus('Fit / reset zoom.');
        }}
        style={{ ...buttonBase, background: chrome.primaryAlt }}
      >
        Fit
      </button>
    </>
  );
};

export const ViewportPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(196);

  React.useEffect(() => {
    setStatus('useGraph viewport helpers: zoom, center, fit.');
  }, [setStatus]);

  return (
    <ExampleLayout>
      <GraphCanvas
        width={size.width}
        height={size.height}
        grid={true}
        minimap={true}
        onReady={(_canvas, graph) => {
          if (!isGraphEmpty(graph)) return;
          seedConstWatchGraph(graph);
        }}
      >
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
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
          role="toolbar"
        >
          <ViewportControls />
        </div>
      </GraphCanvas>
    </ExampleLayout>
  );
};
