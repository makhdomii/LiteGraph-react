import { describe, expect, it } from 'vitest';
import {
  GraphCanvas,
  GraphProvider,
  useGraphContext,
  useGraph,
  createNode,
  LiteGraph,
  LGraph,
  LGraphNode,
  LGraphGroup,
} from '../index';

describe('public package exports', () => {
  it('exports React integration surface', () => {
    expect(GraphCanvas).toBeTypeOf('function');
    expect(GraphProvider).toBeTypeOf('function');
    expect(useGraphContext).toBeTypeOf('function');
    expect(useGraph).toBeTypeOf('function');
    expect(createNode).toBeTypeOf('function');
  });

  it('exports LiteGraph runtime classes for custom nodes', () => {
    expect(LiteGraph).toBeDefined();
    expect(typeof LiteGraph.createNode).toBe('function');
    expect(typeof LiteGraph.registerNodeType).toBe('function');
    expect(typeof LGraph).toBe('function');
    expect(typeof LGraphNode).toBe('function');
    expect(typeof LGraphGroup).toBe('function');
  });

  it('createNode uses the same LiteGraph registry', () => {
    const viaHelper = createNode('basic/const');
    const viaLiteGraph = LiteGraph.createNode('basic/const');
    expect(viaHelper).not.toBeNull();
    expect(viaLiteGraph).not.toBeNull();
    expect(viaHelper?.type).toBe(viaLiteGraph?.type);
  });
});
