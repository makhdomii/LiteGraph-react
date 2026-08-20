import type { LGraph } from 'litegraph-react';
import { createNode } from 'litegraph-react';

type SeedSpec = {
  type: string;
  pos: [number, number];
};

/**
 * Place a small set of node types on the canvas; skip types that fail to create.
 */
export function seedNodeTypes(graph: LGraph, specs: SeedSpec[]): string[] {
  const placed: string[] = [];
  for (const spec of specs) {
    const node = createNode(spec.type);
    if (!node) continue;
    node.pos = spec.pos;
    graph.add(node);
    placed.push(spec.type);
  }
  return placed;
}
