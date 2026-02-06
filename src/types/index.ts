import type { LGraph, LGraphNode, LGraphCanvas, SerializedLGraph } from 'litegraph.js';

export interface GraphCanvasProps {
  /**
   * The graph instance to render
   */
  graph?: LGraph;
  
  /**
   * Initial graph data (JSON)
   */
  data?: SerializedLGraph;
  
  /**
   * Canvas width
   */
  width?: number;
  
  /**
   * Canvas height
   */
  height?: number;
  
  /**
   * Enable/disable grid
   */
  grid?: boolean;
  
  /**
   * Enable/disable minimap
   */
  minimap?: boolean;
  
  /**
   * Enable/disable live mode
   */
  liveMode?: boolean;
  
  /**
   * Custom theme configuration
   */
  theme?: GraphTheme;
  
  /**
   * Callback when graph is ready
   */
  onReady?: (canvas: LGraphCanvas, graph: LGraph) => void;
  
  /**
   * Callback when graph changes
   */
  onChange?: (graph: LGraph) => void;
  
  /**
   * Callback when a node is selected
   */
  onNodeSelected?: (node: LGraphNode | null) => void;
  
  /**
   * Callback when a node is added
   */
  onNodeAdded?: (node: LGraphNode) => void;
  
  /**
   * Callback when a node is removed
   */
  onNodeRemoved?: (node: LGraphNode) => void;
  
  /**
   * Callback when nodes are connected
   */
  onConnectionChange?: (from: LGraphNode, to: LGraphNode, slot: number) => void;
  
  /**
   * Additional canvas options
   */
  options?: Partial<LGraphCanvasOptions>;
  
  /**
   * CSS class name
   */
  className?: string;
  
  /**
   * CSS styles
   */
  style?: React.CSSProperties;
}

export interface GraphTheme {
  background?: string;
  gridColor?: string;
  nodeBackground?: string;
  nodeSelected?: string;
  connectionColor?: string;
  textColor?: string;
}

export interface LGraphCanvasOptions {
  skip_events?: boolean;
  autoresize?: boolean;
  render_only_visible?: boolean;
  allow_dragnodes?: boolean;
  allow_dragcanvas?: boolean;
  allow_searchbox?: boolean;
  allow_minimap?: boolean;
  allow_duplicate_nodes?: boolean;
  allow_autoarrange?: boolean;
  allow_restore?: boolean;
  allow_save?: boolean;
  allow_load?: boolean;
  allow_clear?: boolean;
  allow_undo?: boolean;
  allow_redo?: boolean;
  allow_zoom?: boolean;
  allow_pan?: boolean;
  allow_contextmenu?: boolean;
  allow_keyboard?: boolean;
  allow_multi_selection?: boolean;
  allow_node_selection?: boolean;
  allow_connection_drag?: boolean;
  allow_connection_reconnect?: boolean;
  allow_connection_delete?: boolean;
  allow_connection_insert?: boolean;
  allow_connection_replace?: boolean;
  allow_connection_swap?: boolean;
  allow_connection_split?: boolean;
  allow_connection_merge?: boolean;
  allow_connection_reroute?: boolean;
  allow_connection_snap?: boolean;
  allow_connection_curve?: boolean;
  allow_connection_arrow?: boolean;
  allow_connection_label?: boolean;
  allow_connection_color?: boolean;
  allow_connection_width?: boolean;
  allow_connection_style?: boolean;
  allow_connection_animation?: boolean;
  allow_connection_highlight?: boolean;
  allow_connection_tooltip?: boolean;
  allow_connection_contextmenu?: boolean;
  allow_connection_keyboard?: boolean;
  allow_connection_multi_selection?: boolean;
  allow_connection_selection?: boolean;
  [key: string]: any;
}

export interface GraphContextValue {
  graph: LGraph | null;
  canvas: LGraphCanvas | null;
  selectedNode: LGraphNode | null;
  isReady: boolean;
}

export interface UseGraphReturn {
  graph: LGraph | null;
  canvas: LGraphCanvas | null;
  selectedNode: LGraphNode | null;
  isReady: boolean;
  addNode: (nodeType: string, pos?: [number, number]) => LGraphNode | null;
  removeNode: (node: LGraphNode) => void;
  connect: (from: LGraphNode, fromSlot: number, to: LGraphNode, toSlot: number) => boolean;
  disconnect: (from: LGraphNode, fromSlot: number, to: LGraphNode, toSlot: number) => void;
  start: () => void;
  stop: () => void;
  serialize: () => SerializedLGraph | null;
  load: (data: SerializedLGraph) => void;
  clear: () => void;
  zoom: (factor: number) => void;
  center: () => void;
  fit: () => void;
}
