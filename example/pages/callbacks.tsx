import React, { useRef, useState } from 'react';
import { GraphCanvas, createNode } from 'litegraph-react';
import { buttonBase, chrome } from '../chrome';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';
import { placeNode, seedConstWatchGraph } from '../lib/seedConstWatch';
import type { LGraph } from 'litegraph-react';

export const CallbacksPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(196);
  const graphRef = useRef<LGraph | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const push = (line: string) => {
    setLog((prev) => [line, ...prev].slice(0, 8));
    setStatus(line);
  };

  React.useEffect(() => {
    setStatus(
      'Callbacks: onReady, onChange, onNodeSelected, onNodeAdded. onNodeRemoved / onConnectionChange are declared but not wired in GraphCanvas yet.'
    );
  }, [setStatus]);

  return (
    <ExampleLayout
      toolbar={
        <>
          <button
            type="button"
            onClick={() => {
              const graph = graphRef.current;
              if (!graph) return;
              const node = createNode('basic/const');
              if (!node) return;
              node.pos = placeNode();
              graph.add(node);
            }}
            style={{ ...buttonBase, background: chrome.primary }}
          >
            Add node (fires onNodeAdded / onChange)
          </button>
          <span style={{ fontSize: 13, color: chrome.textMuted, maxWidth: 420 }}>
            Recent: {log[0] ?? '—'}
          </span>
        </>
      }
    >
      <GraphCanvas
        width={size.width}
        height={size.height}
        grid={true}
        minimap={true}
        onReady={(_canvas, graph) => {
          graphRef.current = graph;
          if (isGraphEmpty(graph)) {
            seedConstWatchGraph(graph);
          }
          push('onReady: canvas and graph are ready');
        }}
        onChange={() => {
          push('onChange: graph mutated');
        }}
        onNodeSelected={(node) => {
          push(node ? `onNodeSelected: ${node.title || node.type}` : 'onNodeSelected: null');
        }}
        onNodeAdded={(node) => {
          push(`onNodeAdded: ${node.title || node.type}`);
        }}
      />
    </ExampleLayout>
  );
};
