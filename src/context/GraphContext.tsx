import React, { createContext, useContext, useMemo } from 'react';
import type { LGraph, LGraphCanvas, LGraphNode } from '../lib/litegraph-wrapper';
import type { GraphContextValue } from '../types';

const GraphContext = createContext<GraphContextValue | null>(null);

export interface GraphProviderProps {
  graph: LGraph | null;
  canvas: LGraphCanvas | null;
  selectedNode: LGraphNode | null;
  isReady: boolean;
  children: React.ReactNode;
}

export const GraphProvider: React.FC<GraphProviderProps> = ({
  graph,
  canvas,
  selectedNode,
  isReady,
  children,
}) => {
  const value = useMemo<GraphContextValue>(
    () => ({
      graph,
      canvas,
      selectedNode,
      isReady,
    }),
    [graph, canvas, selectedNode, isReady]
  );

  return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>;
};

export const useGraphContext = (): GraphContextValue => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraphContext must be used within a GraphProvider');
  }
  return context;
};
