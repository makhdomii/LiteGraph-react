import React from 'react';
import { GraphCanvas, createNode } from 'litegraph-react';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';

export const SubgraphsPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('graph/subgraph with nested graph/input and graph/output. Double-click subgraph to enter.');
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

          const subgraph = createNode('graph/subgraph');
          const outerConst = createNode('basic/const');
          const outerWatch = createNode('basic/watch');

          if (subgraph) {
            subgraph.pos = [320, 180];
            graph.add(subgraph);

            const inner = (subgraph as { subgraph?: { add: (n: unknown) => void } }).subgraph;
            if (inner) {
              const input = createNode('graph/input');
              const output = createNode('graph/output');
              const innerWatch = createNode('basic/watch');
              if (input && output && innerWatch) {
                input.pos = [40, 80];
                innerWatch.pos = [220, 80];
                output.pos = [420, 80];
                inner.add(input);
                inner.add(innerWatch);
                inner.add(output);
                input.connect(0, innerWatch, 0);
                innerWatch.connect(0, output, 0);
              }
            }
          }

          if (outerConst && outerWatch) {
            outerConst.pos = [80, 180];
            outerWatch.pos = [560, 180];
            graph.add(outerConst);
            graph.add(outerWatch);
          }

          setStatus(
            'Subgraph seeded. Double-click the Subgraph node to open the nested graph (input → watch → output).'
          );
        }}
      />
    </ExampleLayout>
  );
};
