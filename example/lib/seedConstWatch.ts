import { createNode } from 'litegraph-react';
import type { LGraph, LGraphNode } from 'litegraph-react';

export function seedConstWatchGraph(graph: LGraph): boolean {
  const constNode = createNode('basic/const');
  const watchNode = createNode('basic/watch');
  if (!constNode || !watchNode) return false;

  constNode.pos = [180, 180];
  if (typeof (constNode as LGraphNode & { setValue?: (v: number) => void }).setValue === 'function') {
    (constNode as LGraphNode & { setValue: (v: number) => void }).setValue(42);
  }
  watchNode.pos = [480, 180];
  graph.add(constNode);
  graph.add(watchNode);
  constNode.connect(0, watchNode, 0);
  return true;
}

export function placeNode(): [number, number] {
  return [Math.random() * 600 + 120, Math.random() * 320 + 120];
}

export function placeAt(x: number, y: number): [number, number] {
  return [x, y];
}
