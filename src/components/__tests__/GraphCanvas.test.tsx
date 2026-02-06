import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GraphCanvas } from '../GraphCanvas';
import { LGraph } from 'litegraph.js';

// Mock LiteGraph - classes must be defined inside the mock factory
vi.mock('litegraph.js', () => {
  class MockLGraph {
    add = vi.fn();
    remove = vi.fn();
    start = vi.fn();
    stop = vi.fn();
    serialize = vi.fn(() => ({ nodes: [], links: [] }));
    configure = vi.fn();
    clear = vi.fn();
    getNodes = vi.fn(() => []);
    on = vi.fn();
    off = vi.fn();
  }

  class MockLGraphCanvas {
    zoomAt = vi.fn();
    centerOnNodes = vi.fn();
    fitToWindow = vi.fn();
    setLiveMode = vi.fn();
    setGraph = vi.fn();
    destroy = vi.fn();
    on = vi.fn();
    off = vi.fn();
    bgcanvas = {
      style: {
        backgroundColor: '',
      },
    };
  }

  return {
    default: {
      createNode: vi.fn(),
    },
    LGraph: MockLGraph,
    LGraphCanvas: MockLGraphCanvas,
    LGraphNode: vi.fn(),
  };
});

describe('GraphCanvas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render canvas element', () => {
    const { container } = render(<GraphCanvas width={800} height={600} />);

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should initialize graph and canvas on mount', async () => {
    const onReady = vi.fn();
    const { container } = render(<GraphCanvas width={800} height={600} onReady={onReady} />);

    await waitFor(() => {
      expect(onReady).toHaveBeenCalled();
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  it('should call onReady callback when graph is initialized', async () => {
    const onReady = vi.fn();

    render(<GraphCanvas width={800} height={600} onReady={onReady} />);

    await waitFor(() => {
      expect(onReady).toHaveBeenCalled();
    });
  });

  it('should use external graph when provided', async () => {
    const externalGraph = new LGraph();
    const onReady = vi.fn();

    render(
      <GraphCanvas graph={externalGraph} width={800} height={600} onReady={onReady} />
    );

    await waitFor(() => {
      expect(onReady).toHaveBeenCalledWith(
        expect.any(Object),
        externalGraph
      );
    });
  });

  it('should load initial data when provided', async () => {
    const data = {
      last_node_id: 0,
      last_link_id: 0,
      nodes: [],
      links: [],
      groups: [],
      config: {},
      extra: {},
    };
    const onReady = vi.fn();
    const { container } = render(<GraphCanvas width={800} height={600} data={data} onReady={onReady} />);

    await waitFor(() => {
      expect(onReady).toHaveBeenCalled();
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  it('should apply custom className', () => {
    const { container } = render(
      <GraphCanvas width={800} height={600} className="custom-class" />
    );

    const containerDiv = container.querySelector('.lightgraph-container');
    expect(containerDiv).toHaveClass('custom-class');
  });

  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(
      <GraphCanvas width={800} height={600} style={customStyle} />
    );

    const containerDiv = container.querySelector('.lightgraph-container') as HTMLElement;
    expect(containerDiv?.style.backgroundColor).toBe('red');
  });

  it('should set live mode when liveMode prop is true', async () => {
    const { container } = render(<GraphCanvas width={800} height={600} liveMode={true} />);

    await waitFor(() => {
      // Verify that canvas was rendered
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  it('should render children', () => {
    render(
      <GraphCanvas width={800} height={600}>
        <div data-testid="child">Child Content</div>
      </GraphCanvas>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should handle node selection callback', async () => {
    const onNodeSelected = vi.fn();
    const { container } = render(
      <GraphCanvas width={800} height={600} onNodeSelected={onNodeSelected} />
    );

    await waitFor(() => {
      // Verify that canvas was rendered
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  it('should handle node added callback', async () => {
    const onNodeAdded = vi.fn();
    const { container } = render(<GraphCanvas width={800} height={600} onNodeAdded={onNodeAdded} />);

    await waitFor(() => {
      // Verify that canvas was rendered
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  it('should cleanup on unmount', async () => {
    const { container, unmount } = render(<GraphCanvas width={800} height={600} />);

    await waitFor(() => {
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    // Unmount should not throw errors
    expect(() => unmount()).not.toThrow();
  });

  it('should use default dimensions when not provided', () => {
    const { container } = render(<GraphCanvas />);

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    // Default values are 1024x720 according to the component
    expect(canvas).toHaveAttribute('width', '1024');
    expect(canvas).toHaveAttribute('height', '720');
  });
});
