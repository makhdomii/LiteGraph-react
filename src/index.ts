// Main exports
export { GraphCanvas } from './components/GraphCanvas';
export { GraphProvider, useGraphContext } from './context/GraphContext';
export { useGraph } from './hooks/useGraph';

// Runtime LiteGraph classes (custom nodes, external graphs, groups)
export {
  LiteGraph,
  LGraph,
  LGraphNode,
  LGraphGroup,
} from './lib/litegraph-wrapper';

// Types that are type-only (classes above also act as types)
export type {
  LGraphCanvas,
  SerializedLGraph,
} from './lib/litegraph-wrapper';

// Export types
export type {
  GraphCanvasProps,
  GraphTheme,
  GraphContextValue,
  UseGraphReturn,
  LGraphCanvasOptions,
} from './types';

// Utility function to create nodes (wraps LiteGraph.createNode)
import { LiteGraph } from './lib/litegraph-wrapper';
import type { LGraphNode as LGraphNodeType } from './lib/litegraph-wrapper';
export const createNode = (type: string): LGraphNodeType | null => {
  return LiteGraph.createNode(type);
};

// Styles
import './styles/graph-canvas.css';
