import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LGraph, LGraphCanvas, LGraphNode } from 'litegraph.js';
import { GraphProvider } from '../context/GraphContext';
import type { GraphCanvasProps, GraphTheme } from '../types';
import '../styles/graph-canvas.css';

/**
 * Main React component for rendering LiteGraph canvas
 * Provides full React integration with LiteGraph functionality
 */
export interface GraphCanvasWithChildrenProps extends GraphCanvasProps {
  children?: React.ReactNode;
}

export const GraphCanvas: React.FC<GraphCanvasWithChildrenProps> = ({
  graph: externalGraph,
  data,
  width = 1024,
  height = 720,
  grid: _grid = true,
  minimap = true,
  liveMode = false,
  theme,
  onReady,
  onChange,
  onNodeSelected,
  onNodeAdded,
  onNodeRemoved,
  onConnectionChange: _onConnectionChange, // Unused: LiteGraph doesn't provide detailed connection info
  options = {},
  className = '',
  style,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<LGraph | null>(null);
  const [canvas, setCanvas] = useState<LGraphCanvas | null>(null);
  const [selectedNode, setSelectedNode] = useState<LGraphNode | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize graph and canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    let graphInstance: LGraph;
    let canvasInstance: LGraphCanvas;
    let originalSelectNode: ((node: LGraphNode | null) => any) | undefined;
    let originalOnNodeAdded: ((node: LGraphNode) => void) | undefined;
    let originalOnNodeRemoved: ((node: LGraphNode) => void) | undefined;
    let originalOnConnectionChange: ((node: LGraphNode) => void) | undefined;

    try {
      // Use external graph or create new one
      if (externalGraph) {
        graphInstance = externalGraph;
      } else {
        graphInstance = new LGraph();
      }

      // Create canvas
      // Note: We don't set any callback properties here as LiteGraph.js doesn't use them
      // Instead, we'll set up our own tracking mechanisms after canvas creation
      canvasInstance = new LGraphCanvas(canvasRef.current, graphInstance, {
        skip_events: false,
        autoresize: true,
        render_only_visible: true,
        allow_dragnodes: true,
        allow_dragcanvas: true,
        allow_searchbox: true,
        allow_minimap: minimap,
        allow_duplicate_nodes: true,
        allow_autoarrange: false,
        allow_restore: true,
        allow_save: true,
        allow_load: true,
        allow_clear: true,
        allow_undo: true,
        allow_redo: true,
        allow_zoom: true,
        allow_pan: true,
        allow_contextmenu: true,
        allow_keyboard: true,
        allow_multi_selection: true,
        allow_node_selection: true,
        ...options,
      });
      
      // Verify canvas was created successfully
      if (!canvasInstance) {
        throw new Error('Failed to create LGraphCanvas instance');
      }

      // Load initial data if provided
      if (data && !externalGraph) {
        graphInstance.configure(data);
      }

      // Set up event listeners using callback properties
      // LiteGraph canvas tracks selected nodes in selected_nodes object
      // We'll poll for changes or override selectNode if available
      let lastSelectedNodeId: number | null = null;
      
      const checkSelectedNode = () => {
        const selectedNodes = (canvasInstance as any).selected_nodes || {};
        const nodeIds = Object.keys(selectedNodes);
        const firstSelectedId = nodeIds.length > 0 ? parseInt(nodeIds[0]) : null;
        
        // Only update if selection actually changed
        if (firstSelectedId !== lastSelectedNodeId) {
          lastSelectedNodeId = firstSelectedId;
          const node = firstSelectedId ? (graphInstance as any).getNodeById(firstSelectedId) : null;
          
          setSelectedNode(node || null);
          if (onNodeSelected) {
            onNodeSelected(node || null);
          }
        } else if (firstSelectedId === null && lastSelectedNodeId !== null) {
          // Selection was cleared
          lastSelectedNodeId = null;
          setSelectedNode(null);
          if (onNodeSelected) {
            onNodeSelected(null);
          }
        }
      };

      // Override selectNode method if it exists
      const originalSelectNode = (canvasInstance as any).selectNode;
      if (originalSelectNode) {
        (canvasInstance as any).selectNode = function(node: LGraphNode | null) {
          const result = originalSelectNode.call(this, node);
          // Update immediately when selectNode is called
          const nodeId = node ? (node as any).id : null;
          if (nodeId !== lastSelectedNodeId) {
            lastSelectedNodeId = nodeId;
            setSelectedNode(node);
            if (onNodeSelected) {
              onNodeSelected(node);
            }
          }
          return result;
        };
      }

      // Also check periodically for selection changes (fallback)
      // Use longer interval to reduce re-renders
      const selectionCheckInterval = setInterval(checkSelectedNode, 300);
      
      // Store interval for cleanup
      (canvasInstance as any)._selectionCheckInterval = selectionCheckInterval;

      // Listen to graph events for node changes
      // LGraph uses callback properties, not event emitters
      originalOnNodeAdded = graphInstance.onNodeAdded;
      graphInstance.onNodeAdded = (node: LGraphNode) => {
        onNodeAdded?.(node);
        onChange?.(graphInstance);
        if (originalOnNodeAdded) {
          originalOnNodeAdded.call(graphInstance, node);
        }
      };

      originalOnNodeRemoved = graphInstance.onNodeRemoved;
      graphInstance.onNodeRemoved = (node: LGraphNode) => {
        onNodeRemoved?.(node);
        onChange?.(graphInstance);
        if (originalOnNodeRemoved) {
          originalOnNodeRemoved.call(graphInstance, node);
        }
      };

      originalOnConnectionChange = graphInstance.onConnectionChange;
      graphInstance.onConnectionChange = (node: LGraphNode) => {
        // Note: LiteGraph's onConnectionChange provides the node where connection changed
        // For more detailed connection info (from, to, slot), we'd need to track before/after states
        // Since LiteGraph doesn't provide detailed connection info, we only call onChange
        onChange?.(graphInstance);
        // Note: onConnectionChange prop expects (from, to, slot) but LiteGraph only provides node
        // So we don't call onConnectionChange here - users can use onChange instead
        if (originalOnConnectionChange) {
          originalOnConnectionChange.call(graphInstance, node);
        }
      };

      // Apply theme if provided
      if (theme) {
        applyTheme(canvasInstance, theme);
      }

      // Set live mode
      if (liveMode && (canvasInstance as any).setLiveMode) {
        (canvasInstance as any).setLiveMode(true);
      } else if (liveMode) {
        // Fallback: set live_mode property directly if method doesn't exist
        (canvasInstance as any).live_mode = true;
      }

      setGraph(graphInstance);
      setCanvas(canvasInstance);
      setIsReady(true);

      // Call onReady callback
      onReady?.(canvasInstance, graphInstance);

      // Start graph execution
      graphInstance.start();
    } catch (error) {
      console.error('Failed to initialize LiteGraph:', error);
    }

    // Cleanup
    return () => {
      // Clear selection check interval
      if (canvasInstance && (canvasInstance as any)._selectionCheckInterval) {
        clearInterval((canvasInstance as any)._selectionCheckInterval);
      }
      
      // Restore original selectNode if we overrode it
      if (canvasInstance && originalSelectNode) {
        (canvasInstance as any).selectNode = originalSelectNode;
      }
      
      if (graphInstance) {
        if (originalOnNodeAdded) {
          graphInstance.onNodeAdded = originalOnNodeAdded;
        }
        if (originalOnNodeRemoved) {
          graphInstance.onNodeRemoved = originalOnNodeRemoved;
        }
        if (originalOnConnectionChange) {
          graphInstance.onConnectionChange = originalOnConnectionChange;
        }
        graphInstance.stop();
      }
      if (canvasInstance) {
        canvasInstance.destroy?.();
      }
    };
  }, [
    // Only include stable dependencies
    // Note: We intentionally don't include callbacks in deps to avoid re-initialization
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

  // Handle data changes
  useEffect(() => {
    if (!graph || !data || externalGraph) return;
    graph.configure(data);
    onChange?.(graph);
  }, [data, graph, onChange, externalGraph]);

  // Handle external graph changes
  useEffect(() => {
    if (externalGraph && canvas) {
      canvas.setGraph(externalGraph);
      setGraph(externalGraph);
    }
  }, [externalGraph, canvas]);

  // Handle live mode changes
  useEffect(() => {
    if (!canvas) return;
    if ((canvas as any).setLiveMode) {
      (canvas as any).setLiveMode(liveMode);
    } else {
      // Fallback: set live_mode property directly if method doesn't exist
      (canvas as any).live_mode = liveMode;
    }
  }, [liveMode, canvas]);

  // Handle theme changes
  useEffect(() => {
    if (!canvas || !theme) return;
    applyTheme(canvas, theme);
  }, [theme, canvas]);

  // Apply theme to canvas
  const applyTheme = useCallback((canvasInstance: LGraphCanvas, themeConfig: GraphTheme) => {
    if (!canvasInstance) return;

    // Apply background color
    if (themeConfig.background) {
      canvasInstance.bgcanvas.style.backgroundColor = themeConfig.background;
    }

    // Apply grid color
    if (themeConfig.gridColor) {
      // LiteGraph uses canvas context for grid, we'd need to override draw methods
      // This is a simplified approach - full theme support would require more work
    }

    // Note: Full theme support requires extending LiteGraph's rendering methods
    // This is a basic implementation
  }, []);

  return (
    <GraphProvider
      graph={graph}
      canvas={canvas}
      selectedNode={selectedNode}
      isReady={isReady}
    >
      <div
        ref={containerRef}
        className={`lightgraph-container ${className}`}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          ...style,
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />
        {children}
      </div>
    </GraphProvider>
  );
};

// Note: useGraph hook is exported from hooks/useGraph.ts
