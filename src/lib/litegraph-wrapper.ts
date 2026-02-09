// Wrapper to load LiteGraph.js as a module
// LiteGraph.js is a UMD module that sets up globals, so we need to import it
// and then re-export from the global scope

// Import the LiteGraph.js script (it sets up globals when executed)
// @ts-ignore - This is a UMD script file that sets up globals
import './litegraph.js';

// Access the global LiteGraph object after the script loads
// The UMD script attaches LiteGraph to globalThis/window
// @ts-ignore - LiteGraph is available as a global after the script loads
const LiteGraphGlobal =
  (typeof globalThis !== 'undefined' && (globalThis as any).LiteGraph) ||
  (typeof window !== 'undefined' && (window as any).LiteGraph) ||
  (typeof global !== 'undefined' && (global as any).LiteGraph);

if (!LiteGraphGlobal) {
  throw new Error('LiteGraph.js failed to load. Make sure litegraph.js is properly bundled.');
}

// Export the LiteGraph namespace and classes as values
export const LiteGraph = LiteGraphGlobal;
export const LGraph = LiteGraphGlobal.LGraph;
export const LGraphCanvas = LiteGraphGlobal.LGraphCanvas;
export const LGraphNode = LiteGraphGlobal.LGraphNode;
export const LLink = LiteGraphGlobal.LLink;
export const LGraphGroup = LiteGraphGlobal.LGraphGroup;
export const DragAndScale = LiteGraphGlobal.DragAndScale;
export const ContextMenu = LiteGraphGlobal.ContextMenu;

// Import types from the type definition file
import type {
  LGraph as LGraphType,
  LGraphCanvas as LGraphCanvasType,
  LGraphNode as LGraphNodeType,
  LLink as LLinkType,
  LGraphGroup as LGraphGroupType,
  serializedLGraph,
  INodeSlot,
  INodeInputSlot,
  INodeOutputSlot,
  IWidget,
  Vector2,
  Vector4,
} from './litegraph.d';

// Re-export types with the same names as the values (TypeScript allows this)
export type LGraph = LGraphType;
export type LGraphCanvas = LGraphCanvasType;
export type LGraphNode = LGraphNodeType;
export type LLink = LLinkType;
export type LGraphGroup = LGraphGroupType;

// Create type alias for SerializedLGraph (the .d.ts file uses lowercase serializedLGraph)
export type SerializedLGraph = serializedLGraph;

// Export other types
export type {
  INodeSlot,
  INodeInputSlot,
  INodeOutputSlot,
  IWidget,
  Vector2,
  Vector4,
};
