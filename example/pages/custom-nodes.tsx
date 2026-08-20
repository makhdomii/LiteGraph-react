import React from 'react';
import { GraphCanvas, createNode } from 'litegraph-react';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';
import { ensureDemoNodesRegistered } from '../lib/demoNodes';

ensureDemoNodesRegistered();

export const CustomNodesPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus(
      'Custom nodes via LiteGraph.registerNodeType — demo/double and demo/hello with widgets + onExecute.'
    );
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

          const constNode = createNode('basic/const');
          const doubleNode = createNode('demo/double');
          const watchNode = createNode('basic/watch');
          const hello = createNode('demo/hello');
          const consoleNode = createNode('basic/console');

          if (constNode && doubleNode && watchNode) {
            constNode.pos = [120, 140];
            doubleNode.pos = [340, 140];
            watchNode.pos = [560, 140];
            graph.add(constNode);
            graph.add(doubleNode);
            graph.add(watchNode);
            constNode.connect(0, doubleNode, 0);
            doubleNode.connect(0, watchNode, 0);
          }
          if (hello && consoleNode) {
            hello.pos = [120, 300];
            consoleNode.pos = [360, 300];
            graph.add(hello);
            graph.add(consoleNode);
            hello.connect(0, consoleNode, 0);
          }

          setStatus('Seeded demo/double and demo/hello. Right-click → demo category also lists them.');
        }}
      />
    </ExampleLayout>
  );
};
