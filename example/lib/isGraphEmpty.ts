import type { LGraph } from 'litegraph-react';

/** True when the graph has no nodes yet (safe under StrictMode remounts). */
export function isGraphEmpty(graph: LGraph): boolean {
  const nodes = (graph as { _nodes?: unknown[] })._nodes;
  return !nodes || nodes.length === 0;
}
