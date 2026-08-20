import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import { ExampleLayout } from '../../components/ExampleLayout';
import { useStatus } from '../../components/StatusBar';
import { useCanvasSize } from '../../lib/useCanvasSize';
import { isGraphEmpty } from '../../lib/isGraphEmpty';
import { seedNodeTypes } from '../../lib/seedNodes';

export const BasicNodesPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('Built-in basic nodes: const, watch, string, boolean, console.');
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
            { type: 'basic/const', pos: [120, 120] },
            { type: 'basic/watch', pos: [360, 120] },
            { type: 'basic/string', pos: [120, 260] },
            { type: 'basic/boolean', pos: [360, 260] },
            { type: 'basic/console', pos: [600, 180] },
          ]);
          const consts = graph.findNodesByType('basic/const');
          const watches = graph.findNodesByType('basic/watch');
          if (consts[0] && watches[0]) consts[0].connect(0, watches[0], 0);
          setStatus(`Placed: ${placed.join(', ')}`);
        }}
      />
    </ExampleLayout>
  );
};
