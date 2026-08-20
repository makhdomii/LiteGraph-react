import React from 'react';
import { GraphCanvas, useGraph, createNode } from 'litegraph-react';
import type { LGraphNode } from 'litegraph-react';
import { buttonBase, chrome } from '../chrome';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';

const ConnectControls: React.FC = () => {
  const { setStatus } = useStatus();
  const { connect, disconnect, graph, isReady } = useGraph();

  React.useEffect(() => {
    if (!isReady || !graph || !isGraphEmpty(graph)) return;
    const a = createNode('basic/const');
    const b = createNode('basic/watch');
    if (!a || !b) return;
    a.pos = [160, 180];
    b.pos = [440, 180];
    graph.add(a);
    graph.add(b);
  }, [isReady, graph]);

  const getPair = (): { a: LGraphNode; b: LGraphNode } | null => {
    if (!graph) return null;
    const a = graph.findNodesByType('basic/const')[0];
    const b = graph.findNodesByType('basic/watch')[0];
    if (!a || !b) return null;
    return { a, b };
  };

  if (!isReady) {
    return <span style={{ fontSize: 13, color: chrome.textMuted }}>Loading…</span>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          const p = getPair();
          if (!p) return;
          connect(p.a, 0, p.b, 0);
          setStatus('Connected Const output → Watch input.');
        }}
        style={{ ...buttonBase, background: chrome.success }}
      >
        Connect
      </button>
      <button
        type="button"
        onClick={() => {
          const p = getPair();
          if (!p) return;
          disconnect(p.a, 0, p.b, 0);
          setStatus('Disconnected Const output.');
        }}
        style={{ ...buttonBase, background: chrome.danger }}
      >
        Disconnect
      </button>
      <span style={{ fontSize: 13, color: chrome.textMuted }}>
        useGraph().connect / disconnect
      </span>
    </>
  );
};

export const ConnectPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(196);

  React.useEffect(() => {
    setStatus('Programmatic connect and disconnect via useGraph.');
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
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
          role="toolbar"
        >
          <ConnectControls />
        </div>
      </GraphCanvas>
    </ExampleLayout>
  );
};
