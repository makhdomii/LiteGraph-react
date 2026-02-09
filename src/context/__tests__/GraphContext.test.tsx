import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { GraphProvider, useGraphContext } from '../GraphContext';
import type { LGraph, LGraphCanvas, LGraphNode } from '../../lib/litegraph-wrapper';

describe('GraphContext', () => {
  it('should provide graph context values', () => {
    const mockGraph = {} as LGraph;
    const mockCanvas = {} as LGraphCanvas;
    const mockSelectedNode = null as LGraphNode | null;
    const isReady = true;

    let contextValue: any = null;

    const TestComponent = () => {
      contextValue = useGraphContext();
      return <div>Test</div>;
    };

    render(
      <GraphProvider
        graph={mockGraph}
        canvas={mockCanvas}
        selectedNode={mockSelectedNode}
        isReady={isReady}
      >
        <TestComponent />
      </GraphProvider>
    );

    expect(contextValue).toBeDefined();
    expect(contextValue.graph).toBe(mockGraph);
    expect(contextValue.canvas).toBe(mockCanvas);
    expect(contextValue.selectedNode).toBe(mockSelectedNode);
    expect(contextValue.isReady).toBe(true);
  });

  it('should throw error when used outside provider', () => {
    const TestComponent = () => {
      useGraphContext();
      return <div>Test</div>;
    };

    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useGraphContext must be used within a GraphProvider');

    consoleSpy.mockRestore();
  });

  it('should update context when props change', () => {
    const mockGraph1 = {} as LGraph;
    const mockGraph2 = {} as LGraph;
    const mockCanvas = {} as LGraphCanvas;

    let contextValue: any = null;

    const TestComponent = () => {
      contextValue = useGraphContext();
      return <div>Test</div>;
    };

    const { rerender } = render(
      <GraphProvider
        graph={mockGraph1}
        canvas={mockCanvas}
        selectedNode={null}
        isReady={false}
      >
        <TestComponent />
      </GraphProvider>
    );

    expect(contextValue.graph).toBe(mockGraph1);
    expect(contextValue.isReady).toBe(false);

    rerender(
      <GraphProvider
        graph={mockGraph2}
        canvas={mockCanvas}
        selectedNode={null}
        isReady={true}
      >
        <TestComponent />
      </GraphProvider>
    );

    expect(contextValue.graph).toBe(mockGraph2);
    expect(contextValue.isReady).toBe(true);
  });
});
