import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import { ExampleLayout } from '../../components/ExampleLayout';
import { useStatus } from '../../components/StatusBar';
import { useCanvasSize } from '../../lib/useCanvasSize';
import { isGraphEmpty } from '../../lib/isGraphEmpty';
import { seedNodeTypes } from '../../lib/seedNodes';

export const MathNodesPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('Math nodes: operation, compare, formula, clamp.');
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
            { type: 'basic/const', pos: [80, 100] },
            { type: 'math/operation', pos: [300, 100] },
            { type: 'math/compare', pos: [300, 260] },
            { type: 'math/formula', pos: [540, 100] },
            { type: 'math/clamp', pos: [540, 260] },
            { type: 'basic/watch', pos: [780, 160] },
          ]);
          setStatus(`Placed: ${placed.join(', ')}`);
        }}
      />
    </ExampleLayout>
  );
};
