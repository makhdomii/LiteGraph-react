import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import type { GraphTheme } from 'litegraph-react';
import { ExampleLayout } from '../components/ExampleLayout';
import { useStatus } from '../components/StatusBar';
import { useCanvasSize } from '../lib/useCanvasSize';
import { isGraphEmpty } from '../lib/isGraphEmpty';
import { seedConstWatchGraph } from '../lib/seedConstWatch';

const theme: GraphTheme = {
  background: '#0f1419',
  gridColor: '#1a3a4a',
  nodeBackground: '#1e3a4c',
  nodeSelected: '#2d6a8a',
  connectionColor: '#4fc3f7',
  textColor: '#e0f0ff',
};

export const ThemePage: React.FC = () => {
  const { setStatus } = useStatus();
  const size = useCanvasSize(148);

  React.useEffect(() => {
    setStatus('Custom GraphTheme on GraphCanvas (background applied; node colors may need canvas overrides).');
  }, [setStatus]);

  return (
    <ExampleLayout>
      <GraphCanvas
        width={size.width}
        height={size.height}
        grid={true}
        minimap={true}
        theme={theme}
        onReady={(_canvas, graph) => {
          if (!isGraphEmpty(graph)) return;
          seedConstWatchGraph(graph);
          setStatus('Theme applied — canvas background uses GraphTheme.background.');
        }}
      />
    </ExampleLayout>
  );
};
