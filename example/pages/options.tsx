import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';
import { seedConstWatchGraph } from '../lib/seedConstWatch';
import { chrome } from '../chrome';

export const OptionsPage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus(
      'Restricted editor: no context menu, no searchbox, zoom disabled. Drag nodes still works.'
    );
  }, [setStatus]);

  return (
    <ExampleLayout
      toolbar={
        <span style={{ fontSize: 13, color: chrome.textMuted }}>
          options: allow_contextmenu=false, allow_searchbox=false, allow_zoom=false
        </span>
      }
    >
      <GraphCanvas
        width={size.width}
        height={size.height}
        grid={true}
        minimap={false}
        options={{
          allow_contextmenu: false,
          allow_searchbox: false,
          allow_zoom: false,
          allow_minimap: false,
        }}
        onReady={(_canvas, graph) => {
          if (!isGraphEmpty(graph)) return;
          seedConstWatchGraph(graph);
          setStatus('Restricted canvas ready — right-click / zoom / search disabled.');
        }}
      />
    </ExampleLayout>
  );
};
