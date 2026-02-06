import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGraph } from '../useGraph';
import { GraphProvider } from '../../context/GraphContext';
import type { LGraph, LGraphCanvas, LGraphNode } from 'litegraph.js';

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
});

const createMockCanvas = () => ({
  zoomAt: vi.fn(),
  centerOnNodes: vi.fn(),
  fitToWindow: vi.fn(),
  setLiveMode: vi.fn(),
  setGraph: vi.fn(),
  destroy: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
});

const mockNode = {
  pos: [0, 0],
  connect: vi.fn(() => ({})),
  disconnect: vi.fn(),
  setValue: vi.fn(),
};

vi.mock('litegraph.js', () => {
  const MockLGraph = vi.fn().mockImplementation(() => createMockGraph());
  const MockLGraphCanvas = vi.fn().mockImplementation(() => createMockCanvas());

  return {
    default: {
      createNode: vi.fn(() => mockNode),
    },
    LGraph: MockLGraph,
    LGraphCanvas: MockLGraphCanvas,
    LGraphNode: vi.fn(),
  };
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

    expect(mockCanvas.zoomAt).toHaveBeenCalledWith(1.5);
  });

  it('should center on nodes', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    result.current.center();

    expect(mockCanvas.centerOnNodes).toHaveBeenCalledWith([]);
  });

  it('should fit to window', () => {
    const { result } = renderHook(() => useGraph(), { wrapper });

    result.current.fit();

    expect(mockCanvas.fitToWindow).toHaveBeenCalled();
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
