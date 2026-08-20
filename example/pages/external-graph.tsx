import React, { useMemo, useRef } from 'react';
import { GraphCanvas, LGraph, createNode } from 'litegraph-react';
import { buttonBase, chrome } from '../chrome';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { placeNode } from '../lib/seedConstWatch';

export const ExternalGraphPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(196);
  const graph = useMemo(() => {
    const g = new LGraph();
    const a = createNode('basic/const');
    const b = createNode('basic/watch');
    if (a && b) {
      a.pos = [160, 160];
      b.pos = [420, 160];
      g.add(a);
      g.add(b);
      a.connect(0, b, 0);
    }
    return g;
  }, []);
  const ready = useRef(false);

  React.useEffect(() => {
    setStatus('External LGraph owned by React — passed as the graph prop.');
  }, [setStatus]);

  return (
    <ExampleLayout
      toolbar={
        <>
          <button
            type="button"
            onClick={() => {
              const node = createNode('basic/const');
              if (!node) return;
              node.pos = placeNode();
              graph.add(node);
              const count = graph.serialize().nodes?.length ?? 0;
              setStatus(`Added node to external graph. Nodes: ${count}`);
            }}
            style={{ ...buttonBase, background: chrome.primary }}
          >
            Add Const to shared graph
          </button>
          <span style={{ fontSize: 13, color: chrome.textMuted }}>
            Same LGraph instance lives outside GraphCanvas
          </span>
        </>
      }
    >
      <GraphCanvas
        graph={graph}
        width={size.width}
        height={size.height}
        grid={true}
        minimap={true}
        onReady={() => {
          if (ready.current) return;
          ready.current = true;
          setStatus('External graph mounted — mutate it from outside the canvas.');
        }}
      />
    </ExampleLayout>
  );
};
