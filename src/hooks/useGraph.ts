import { useCallback, useMemo } from 'react';
import { LiteGraph } from '../lib/litegraph-wrapper';
import type { LGraphNode, SerializedLGraph } from '../lib/litegraph-wrapper';
import { useGraphContext } from '../context/GraphContext';
import type { UseGraphReturn } from '../types';

/**
 * Hook to interact with the graph instance
 * Provides methods to manipulate nodes, connections, and graph state
 */
export const useGraph = (): UseGraphReturn => {
  const { graph, canvas, selectedNode, isReady } = useGraphContext();

  const addNode = useCallback(
    (nodeType: string, pos?: [number, number]): LGraphNode | null => {
      if (!graph || !isReady) return null;

      try {
        const node = LiteGraph.createNode(nodeType);
        if (!node) return null;

        if (pos) {
          node.pos = pos;
        }

        graph.add(node);
        return node;
      } catch (error) {
        console.error('Failed to add node:', error);
        return null;
      }
    },
    [graph, isReady]
  );

  const removeNode = useCallback(
    (node: LGraphNode): void => {
      if (!graph || !isReady) return;
      graph.remove(node);
    },
    [graph, isReady]
  );

  const connect = useCallback(
    (
      from: LGraphNode,
      fromSlot: number,
      to: LGraphNode,
      toSlot: number
    ): boolean => {
      if (!graph || !isReady) return false;
      return from.connect(fromSlot, to, toSlot) !== null;
    },
    [graph, isReady]
  );

  const disconnect = useCallback(
    (
      from: LGraphNode,
      fromSlot: number,
      to: LGraphNode,
      _toSlot: number
    ): void => {
      if (!graph || !isReady) return;
      // Use disconnectOutput method on the source node
      from.disconnectOutput(fromSlot, to);
    },
    [graph, isReady]
  );

  const start = useCallback((): void => {
    if (!graph || !isReady) return;
    graph.start();
  }, [graph, isReady]);

  const stop = useCallback((): void => {
    if (!graph || !isReady) return;
    graph.stop();
  }, [graph, isReady]);

  const serialize = useCallback((): SerializedLGraph | null => {
    if (!graph || !isReady) return null;
    return graph.serialize();
  }, [graph, isReady]);

  const load = useCallback(
    (data: SerializedLGraph): void => {
      if (!graph || !isReady) return;
      graph.configure(data);
    },
    [graph, isReady]
  );

  const clear = useCallback((): void => {
    if (!graph || !isReady) return;
    graph.clear();
  }, [graph, isReady]);

  const zoom = useCallback(
    (factor: number): void => {
      if (!canvas || !isReady) return;
      // Use setZoom with current center
      canvas.setZoom(factor, [0, 0]);
    },
    [canvas, isReady]
  );

  const center = useCallback((): void => {
    if (!canvas || !isReady || !graph) return;
    // Center on the first node if available
    // Access nodes via the graph's internal _nodes array
    const nodes = (graph as any)._nodes || [];
    if (nodes.length > 0) {
      canvas.centerOnNode(nodes[0]);
    }
  }, [canvas, graph, isReady]);

  const fit = useCallback((): void => {
    if (!canvas || !isReady) return;
    // LiteGraph doesn't have fitToWindow, use setZoom to fit
    canvas.setZoom(1, [0, 0]);
  }, [canvas, isReady]);

  return useMemo<UseGraphReturn>(
    () => ({
      graph,
      canvas,
      selectedNode,
      isReady,
      addNode,
      removeNode,
      connect,
      disconnect,
      start,
      stop,
      serialize,
      load,
      clear,
      zoom,
      center,
      fit,
    }),
    [
      graph,
      canvas,
      selectedNode,
      isReady,
      addNode,
      removeNode,
      connect,
      disconnect,
      start,
      stop,
      serialize,
      load,
      clear,
      zoom,
      center,
      fit,
    ]
  );
};
