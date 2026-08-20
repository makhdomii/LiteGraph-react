import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';
import { seedConstWatchGraph } from '../lib/seedConstWatch';

export const BasicPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus(
      'Mounted GraphCanvas with a seeded Const → Watch graph. Right-click the canvas to add more nodes.'
    );
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
          const ok = seedConstWatchGraph(graph);
          setStatus(
            ok
              ? 'Seeded Const → Watch. Right-click the canvas to add nodes.'
              : 'Graph ready. Could not seed demo nodes — right-click to add nodes.'
          );
        }}
        onNodeSelected={(node) => {
          if (node) {
            setStatus(`Selected: ${node.title || node.type}`);
          }
        }}
      />
    </ExampleLayout>
  );
};
