import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import { ExampleLayout } from '../../components/ExampleLayout';
import { useStatus } from '../../components/StatusBar';
import { useCanvasSize } from '../../lib/useCanvasSize';
import { isGraphEmpty } from '../../lib/isGraphEmpty';
import { seedNodeTypes } from '../../lib/seedNodes';

export const LogicNodesPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('Logic nodes: AND, OR, NOT, selector, IF.');
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
            { type: 'basic/boolean', pos: [80, 100] },
            { type: 'logic/AND', pos: [300, 100] },
            { type: 'logic/OR', pos: [300, 240] },
            { type: 'logic/NOT', pos: [520, 100] },
            { type: 'logic/selector', pos: [520, 240] },
            { type: 'logic/IF', pos: [740, 160] },
          ]);
          setStatus(`Placed: ${placed.join(', ')}`);
        }}
      />
    </ExampleLayout>
  );
};
