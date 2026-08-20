import React, { useRef, useState } from 'react';
import { GraphCanvas, createNode } from 'litegraph-react';
import type { LGraph, LGraphNode } from 'litegraph-react';
import { buttonBase, chrome } from '../chrome';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { placeNode } from '../lib/seedConstWatch';

export const ProgrammaticPage: React.FC = () => {
  const { setStatus } = useStatus();
  const graphRef = useRef<LGraph | null>(null);
  const [nodeCount, setNodeCount] = useState(0);
  const size = useCanvasSize(196);

  React.useEffect(() => {
    setStatus('Add nodes through createNode + the graph ref.');
  }, [setStatus]);

  const handleAddConstNode = () => {
    const graph = graphRef.current;
    if (!graph) {
      setStatus('Graph is still loading.');
      return;
    }
    const node = createNode('basic/const');
    if (!node) {
      setStatus('Could not create basic/const — check registered node types.');
      return;
    }
    node.pos = placeNode();
    if (typeof (node as LGraphNode & { setValue?: (v: number) => void }).setValue === 'function') {
      (node as LGraphNode & { setValue: (v: number) => void }).setValue(
        Math.floor(Math.random() * 100)
      );
    }
    graph.add(node);
    setNodeCount((prev) => prev + 1);
    setStatus('Added Constant node via createNode.');
  };

  const handleAddWatchNode = () => {
    const graph = graphRef.current;
    if (!graph) {
      setStatus('Graph is still loading.');
      return;
    }
    const node = createNode('basic/watch');
    if (!node) {
      setStatus('Could not create basic/watch — check registered node types.');
      return;
    }
    node.pos = placeNode();
    graph.add(node);
    setNodeCount((prev) => prev + 1);
    setStatus('Added Watch node via createNode.');
  };

  return (
    <ExampleLayout
      toolbar={
        <>
          <button
            type="button"
            onClick={handleAddConstNode}
            style={{ ...buttonBase, background: chrome.primary }}
          >
            Add Const
          </button>
          <button
            type="button"
            onClick={handleAddWatchNode}
            style={{ ...buttonBase, background: chrome.primary }}
          >
            Add Watch
          </button>
          <span style={{ marginLeft: 8, fontSize: 13, color: chrome.textMuted }}>
            Nodes: {nodeCount}
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
          setStatus('Programmatic graph ready — use Add Const / Add Watch.');
        }}
      />
    </ExampleLayout>
  );
};
