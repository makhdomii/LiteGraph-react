import { useCallback, useMemo } from 'react';
import LiteGraph from 'litegraph.js';
import type { LGraphNode, SerializedLGraph } from 'litegraph.js';
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
      toSlot: number
    ): void => {
      if (!graph || !isReady) return;
      from.disconnect(fromSlot, to, toSlot);
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
      canvas.zoomAt(factor);
    },
    [canvas, isReady]
  );

  const center = useCallback((): void => {
    if (!canvas || !isReady) return;
    canvas.centerOnNodes(graph?.getNodes() || []);
  }, [canvas, graph, isReady]);

  const fit = useCallback((): void => {
    if (!canvas || !isReady) return;
    canvas.fitToWindow();
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
