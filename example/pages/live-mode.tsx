import React, { useRef } from 'react';
import { GraphCanvas, createNode } from 'litegraph-react';
import type { LGraph } from 'litegraph-react';
import { buttonBase, chrome } from '../chrome';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';
import { seedConstWatchGraph } from '../lib/seedConstWatch';

export const LiveModePage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(196);
  const graphRef = useRef<LGraph | null>(null);
  const [running, setRunning] = React.useState(true);

  React.useEffect(() => {
    setStatus('liveMode starts the graph on mount. Use Start/Stop to control execution.');
  }, [setStatus]);

  return (
    <ExampleLayout
      toolbar={
        <>
          <button
            type="button"
            onClick={() => {
              const graph = graphRef.current;
              if (!graph) return;
              if (running) {
                graph.stop();
                setRunning(false);
                setStatus('Graph stopped.');
              } else {
                graph.start();
                setRunning(true);
                setStatus('Graph running (liveMode).');
              }
            }}
            style={{ ...buttonBase, background: running ? chrome.danger : chrome.success }}
          >
            {running ? 'Stop' : 'Start'}
          </button>
          <span style={{ fontSize: 13, color: chrome.textMuted }}>
            liveMode={String(true)} — Watch updates while running
          </span>
        </>
      }
    >
      <GraphCanvas
        width={size.width}
        height={size.height}
        grid={true}
        minimap={true}
        liveMode={true}
        onReady={(_canvas, graph) => {
          graphRef.current = graph;
          if (isGraphEmpty(graph)) {
            seedConstWatchGraph(graph);
            const time = createNode('basic/time');
            if (time) {
              time.pos = [180, 320];
              graph.add(time);
            }
          }
          setStatus('Live mode ready — graph is executing. Stop to pause.');
        }}
      />
    </ExampleLayout>
  );
};
