/// <reference types="vite/client" />

declare module 'litegraph.js' {
  export class LGraph {
    constructor();
    add(node: LGraphNode): void;
    remove(node: LGraphNode): void;
    start(): void;
    stop(): void;
    serialize(): SerializedLGraph;
    configure(data: SerializedLGraph): void;
    clear(): void;
    getNodes(): LGraphNode[];
    onNodeAdded?: (node: LGraphNode) => void;
    onNodeRemoved?: (node: LGraphNode) => void;
    onConnectionChange?: (node: LGraphNode) => void;
  }

  export class LGraphNode {
    title: string;
    pos: [number, number];
    addInput(name: string, type: string): void;
    addOutput(name: string, type: string): void;
    getInputData(slot: number): any;
    setOutputData(slot: number, value: any): void;
    connect(slot: number, node: LGraphNode, targetSlot: number): any;
    disconnect(slot: number, node: LGraphNode, targetSlot: number): void;
    setValue(value: any): void;
    on(event: string, callback: Function): void;
  }

  export class LGraphCanvas {
    constructor(
      canvas: HTMLCanvasElement,
      graph: LGraph,
      options?: Partial<LGraphCanvasOptions>
    );
    setGraph(graph: LGraph): void;
    setLiveMode?(enabled: boolean): void;
    live_mode?: boolean;
    zoomAt(factor: number): void;
    centerOnNodes(nodes: LGraphNode[]): void;
    fitToWindow(): void;
    onNodeSelected?: (node: LGraphNode | null) => void;
    destroy?(): void;
    bgcanvas: HTMLCanvasElement;
    selected_nodes?: { [key: number]: LGraphNode };
    selectNode?(node: LGraphNode | null): void;
  }

  export interface SerializedLGraph {
    last_node_id: number;
    last_link_id: number;
    nodes: any[];
    links: any[];
    groups: any[];
    config: any;
    extra: any;
  }

  export interface LGraphCanvasOptions {
    skip_events?: boolean;
    autoresize?: boolean;
    render_only_visible?: boolean;
    allow_dragnodes?: boolean;
    allow_dragcanvas?: boolean;
    allow_searchbox?: boolean;
    allow_minimap?: boolean;
    [key: string]: any;
  }

  export function createNode(type: string): LGraphNode | null;

  const LiteGraph: {
    LGraph: typeof LGraph;
    LGraphNode: typeof LGraphNode;
    LGraphCanvas: typeof LGraphCanvas;
    createNode: typeof createNode;
    ALWAYS: number;
    ON_EVENT: number;
    ON_TRIGGER: number;
  };

  export default LiteGraph;
}
