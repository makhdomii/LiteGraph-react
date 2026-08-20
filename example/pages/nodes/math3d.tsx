import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import { ExampleLayout } from '../../components/ExampleLayout';
import { useStatus } from '../../components/StatusBar';
import { useCanvasSize } from '../../lib/useCanvasSize';
import { isGraphEmpty } from '../../lib/isGraphEmpty';
import { seedNodeTypes } from '../../lib/seedNodes';

export const Math3dNodesPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('Math3D nodes: vec2 / vec3 converters.');
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
            { type: 'math3d/xy-to-vec2', pos: [100, 120] },
            { type: 'math3d/vec2-to-xy', pos: [360, 120] },
            { type: 'math3d/xyz-to-vec3', pos: [100, 280] },
            { type: 'math3d/vec3-to-xyz', pos: [360, 280] },
            { type: 'basic/watch', pos: [620, 180] },
          ]);
          setStatus(`Placed: ${placed.join(', ')}`);
        }}
      />
    </ExampleLayout>
  );
};
