import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import { ExampleLayout } from '../../components/ExampleLayout';
import { useStatus } from '../../components/StatusBar';
import { useCanvasSize } from '../../lib/useCanvasSize';
import { isGraphEmpty } from '../../lib/isGraphEmpty';
import { seedNodeTypes } from '../../lib/seedNodes';

export const WidgetsNodesPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('Widget nodes: button, toggle, number, combo, knob.');
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
          const placed = seedNodeTypes(graph, [
            { type: 'widget/button', pos: [100, 100] },
            { type: 'widget/toggle', pos: [320, 100] },
            { type: 'widget/number', pos: [540, 100] },
            { type: 'widget/combo', pos: [100, 280] },
            { type: 'widget/knob', pos: [360, 280] },
          ]);
          setStatus(`Placed: ${placed.join(', ')}`);
        }}
      />
    </ExampleLayout>
  );
};
