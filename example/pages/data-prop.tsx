import React, { useMemo, useRef } from 'react';
import { GraphCanvas, LGraph, createNode } from 'litegraph-react';
import type { SerializedLGraph } from 'litegraph-react';
import { buttonBase, chrome } from '../chrome';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';

function buildSampleData(): SerializedLGraph {
  const g = new LGraph();
  const a = createNode('basic/const');
  const b = createNode('basic/watch');
  const s = createNode('basic/string');
  if (a && b) {
    a.pos = [140, 140];
    b.pos = [400, 140];
    g.add(a);
    g.add(b);
    a.connect(0, b, 0);
  }
  if (s) {
    s.pos = [140, 280];
    g.add(s);
  }
  return g.serialize() as SerializedLGraph;
}

export const DataPropPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(196);
  const data = useMemo(() => buildSampleData(), []);
  const [reloadKey, setReloadKey] = React.useState(0);
  const ready = useRef(false);

  React.useEffect(() => {
    setStatus('Initial graph loaded from SerializedLGraph via the data prop.');
  }, [setStatus]);

  return (
    <ExampleLayout
      toolbar={
        <>
          <button
            type="button"
            onClick={() => {
              ready.current = false;
              setReloadKey((k) => k + 1);
              setStatus('Remounted GraphCanvas with the same data prop.');
            }}
            style={{ ...buttonBase, background: chrome.primary }}
          >
            Reload from data
          </button>
          <span style={{ fontSize: 13, color: chrome.textMuted }}>
            data: SerializedLGraph (Const → Watch + String)
          </span>
        </>
      }
    >
      <GraphCanvas
        key={reloadKey}
        data={data}
        width={size.width}
        height={size.height}
        grid={true}
        minimap={true}
        onReady={() => {
          if (ready.current) return;
          ready.current = true;
          setStatus('Graph configured from data prop.');
        }}
      />
    </ExampleLayout>
  );
};
