// Main exports
export { GraphCanvas } from './components/GraphCanvas';
export { GraphProvider, useGraphContext } from './context/GraphContext';
export { useGraph } from './hooks/useGraph';

// Re-export LiteGraph types and classes for convenience
export type {
  LGraph,
  LGraphNode,
  LGraphCanvas,
  SerializedLGraph,
} from 'litegraph.js';

// Export types
export type {
  GraphCanvasProps,
  GraphTheme,
  GraphContextValue,
  UseGraphReturn,
  LGraphCanvasOptions,
} from './types';

// Utility function to create nodes (wraps LiteGraph.createNode)
// Users should use this instead of importing LiteGraph directly
import LiteGraph from 'litegraph.js';
export const createNode = (type: string): import('litegraph.js').LGraphNode | null => {
  return LiteGraph.createNode(type);
};

// Styles
import './styles/graph-canvas.css';
