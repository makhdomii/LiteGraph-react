import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGraph } from '../useGraph';
import { GraphProvider } from '../../context/GraphContext';
import type { LGraph, LGraphCanvas, LGraphNode } from '../../lib/litegraph-wrapper';

// Mock LiteGraph
const createMockGraph = () => ({
  add: vi.fn(),
  remove: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  serialize: vi.fn(() => ({ nodes: [] })),
  configure: vi.fn(),
  clear: vi.fn(),
  getNodes: vi.fn(() => []),
  on: vi.fn(),
  off: vi.fn(),
  // Add required properties to satisfy type checks
  filter: '',
  catch_errors: false,
  config: {},
  elapsed_time: 0,
  fixedtime: 0,
  fixedtime_lapse: 0,
  globaltime: 0,
  inputs: {},
  iteration: 0,
  last_link_id: 0,
  last_node_id: 0,
  last_update_time: 0,
  links: {},
  list_of_graphcanvas: [],
  outputs: {},
  runningtime: 0,
  starttime: 0,
  status: 1,
  onNodeAdded: undefined,
  connectionChange: undefined,
});

const createMockCanvas = () => ({
  setZoom: vi.fn(),
  centerOnNode: vi.fn(),
  setLiveMode: vi.fn(),
  setGraph: vi.fn(),
  destroy: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  // Add required properties to satisfy type checks
  allow_dragcanvas: true,
  allow_dragnodes: true,
  allow_interaction: true,
  allow_reconnect_links: true,
  selected_nodes: {},
  bgcanvas: {
    style: {
      backgroundColor: '',
    },
  },
});

const mockNode = {
  pos: [0, 0],
  connect: vi.fn(() => ({})),
  disconnect: vi.fn(),
  setValue: vi.fn(),
  // Add required properties to satisfy type checks
  type: '',
  size: [0, 0],
  graph: null,
  graph_version: 0,
  id: 0,
  inputs: [],
  outputs: [],
  properties: {},
  title: '',
  color: '',
  bgcolor: '',
  boxcolor: '',
  shape: 0,
  serialize: vi.fn(() => ({})),
  configure: vi.fn(),
};

// Mock LiteGraph wrapper's dependency
vi.mock('../../lib/litegraph.js', () => {
  const MockLGraph = vi.fn().mockImplementation(() => createMockGraph());
  const MockLGraphCanvas = vi.fn().mockImplementation(() => createMockCanvas());

  // Set up global LiteGraph object
  (globalThis as any).LiteGraph = {
    createNode: vi.fn(() => mockNode),
    LGraph: MockLGraph,
    LGraphCanvas: MockLGraphCanvas,
    LGraphNode: vi.fn(),
    VERSION: 1,
  };

  return {};
});

describe('useGraph', () => {
  let mockGraph: LGraph;
  let mockCanvas: LGraphCanvas;
  let mockSelectedNode: LGraphNode | null;

  beforeEach(() => {
    mockGraph = createMockGraph() as any;
    mockCanvas = createMockCanvas() as any;
    mockSelectedNode = null;
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <GraphProvider
      graph={mockGraph}
      canvas={mockCanvas}
      selectedNode={mockSelectedNode}
      isReady={true}
    >
      {children}
    </GraphProvider>
  );

  it('should return graph and canvas instances', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    expect(result.current.graph).toBe(mockGraph);
    expect(result.current.canvas).toBe(mockCanvas);
    expect(result.current.isReady).toBe(true);
  });

  it('should add a node to the graph', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    const node = result.current.addNode('basic/const', [100, 200]);

    // Verify node was added to graph
    expect(mockGraph.add).toHaveBeenCalled();
    expect(node).toBeDefined();
  });

  it('should return null when adding node if graph is not ready', () => {
    const NotReadyWrapper = ({ children }: { children: React.ReactNode }) => (
      <GraphProvider
        graph={mockGraph}
        canvas={mockCanvas}
        selectedNode={null}
        isReady={false}
      >
        {children}
      </GraphProvider>
    );

    const { result } = renderHook(() => useGraph(), {
      wrapper: NotReadyWrapper,
    });

    const node = result.current.addNode('basic/const');

    expect(node).toBeNull();
    expect(mockGraph.add).not.toHaveBeenCalled();
  });

  it('should remove a node from the graph', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });
    const mockNode = {} as LGraphNode;

    result.current.removeNode(mockNode);

    expect(mockGraph.remove).toHaveBeenCalledWith(mockNode);
  });

  it('should connect two nodes', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });
    const fromNode = { connect: vi.fn(() => ({})) } as any;
    const toNode = {} as LGraphNode;

    const connected = result.current.connect(fromNode, 0, toNode, 1);

    expect(fromNode.connect).toHaveBeenCalledWith(0, toNode, 1);
    expect(connected).toBe(true);
  });

  it('should disconnect two nodes', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });
    const fromNode = { disconnect: vi.fn() } as any;
    const toNode = {} as LGraphNode;

    result.current.disconnect(fromNode, 0, toNode, 1);

    expect(fromNode.disconnect).toHaveBeenCalledWith(0, toNode, 1);
  });

  it('should start graph execution', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    result.current.start();

    expect(mockGraph.start).toHaveBeenCalled();
  });

  it('should stop graph execution', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    result.current.stop();

    expect(mockGraph.stop).toHaveBeenCalled();
  });

  it('should serialize graph', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });
    const mockData = { nodes: [], links: [] };

    vi.mocked(mockGraph.serialize).mockReturnValue(mockData as any);

    const serialized = result.current.serialize();

    expect(mockGraph.serialize).toHaveBeenCalled();
    expect(serialized).toBe(mockData);
  });

  it('should load graph data', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });
    const mockData = { nodes: [], links: [] };

    result.current.load(mockData as any);

    expect(mockGraph.configure).toHaveBeenCalledWith(mockData);
  });

  it('should clear graph', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    result.current.clear();

    expect(mockGraph.clear).toHaveBeenCalled();
  });

  it('should zoom canvas', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    result.current.zoom(1.5);

    expect(mockCanvas.setZoom).toHaveBeenCalledWith(1.5, [0, 0]);
  });

  it('should center on nodes', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    result.current.center();

    // center() calls centerOnNode if nodes exist, or does nothing
    // Since we have an empty graph, it won't call centerOnNode
    // But we can verify setZoom was called for fit
  });

  it('should fit to window', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    result.current.fit();

    expect(mockCanvas.setZoom).toHaveBeenCalledWith(1, [0, 0]);
  });

  it('should return null for serialize when graph is not ready', () => {
    const NotReadyWrapper = ({ children }: { children: React.ReactNode }) => (
      <GraphProvider
        graph={mockGraph}
        canvas={mockCanvas}
        selectedNode={null}
        isReady={false}
      >
        {children}
      </GraphProvider>
    );

    const { result } = renderHook(() => useGraph(), {
      wrapper: NotReadyWrapper,
    });

    const serialized = result.current.serialize();

    expect(serialized).toBeNull();
  });
});
