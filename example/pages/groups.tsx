import React from 'react';
import { GraphCanvas, LGraphGroup, createNode } from 'litegraph-react';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';

export const GroupsPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('Visual LGraphGroup wrapping Const → Watch nodes.');
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

          const constNode = createNode('basic/const');
          const watchNode = createNode('basic/watch');
          if (constNode && watchNode) {
            constNode.pos = [200, 200];
            watchNode.pos = [460, 200];
            graph.add(constNode);
            graph.add(watchNode);
            constNode.connect(0, watchNode, 0);
          }

          const group = new LGraphGroup('Demo group');
          group.pos = [160, 140];
          group.size = [420, 160];
          graph.add(group);

          setStatus('Group added around Const → Watch. Drag the group title to move it.');
        }}
      />
    </ExampleLayout>
  );
};
