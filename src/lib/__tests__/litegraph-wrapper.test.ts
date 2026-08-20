import { describe, expect, it } from 'vitest';
import {
  LGraph,
  LGraphCanvas,
  LGraphNode,
  LiteGraph,
} from '../litegraph-wrapper';

describe('litegraph-wrapper', () => {
  it('loads LiteGraph in an ESM context', () => {
    expect(LiteGraph).toBeDefined();
    expect(LiteGraph).toBe((globalThis as { LiteGraph?: unknown }).LiteGraph);
    expect(typeof LGraph).toBe('function');
    expect(typeof LGraphCanvas).toBe('function');
    expect(typeof LGraphNode).toBe('function');
    expect(typeof LiteGraph.createNode).toBe('function');
  });

  it('constructs an empty graph', () => {
    const graph = new LGraph();

    expect(graph).toBeInstanceOf(LGraph);
    expect(graph.serialize().nodes).toEqual([]);
  });
});
