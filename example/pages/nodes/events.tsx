import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import { ExampleLayout } from '../../components/ExampleLayout';
import { useStatus } from '../../components/StatusBar';
import { useCanvasSize } from '../../lib/useCanvasSize';
import { isGraphEmpty } from '../../lib/isGraphEmpty';
import { seedNodeTypes } from '../../lib/seedNodes';

export const EventsNodesPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('Events nodes: trigger, delay, timer, sequence, branch.');
  }, [setStatus]);

  return (
    <ExampleLayout>
      <GraphCanvas
        width={size.width}
        height={size.height}
        grid={true}
        minimap={true}
        liveMode={true}
        onReady={(_canvas, graph) => {
          if (!isGraphEmpty(graph)) return;
          const placed = seedNodeTypes(graph, [
            { type: 'events/trigger', pos: [80, 120] },
            { type: 'events/delay', pos: [280, 120] },
            { type: 'events/timer', pos: [480, 120] },
            { type: 'events/sequence', pos: [280, 280] },
            { type: 'events/branch', pos: [480, 280] },
          ]);
          setStatus(`Placed: ${placed.join(', ')}. Start/live mode runs event nodes.`);
        }}
      />
    </ExampleLayout>
  );
};
