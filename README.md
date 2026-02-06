# litegraph-react

A React-compatible version of [LiteGraph.js](https://github.com/jagenjo/litegraph.js) - A graph node engine and editor written in JavaScript, similar to Unreal Blueprints or Pure Data. This package provides seamless React integration with full TypeScript support, making it easy to build visual node-based editors in React applications.

## Features

### 🎨 Core Features

- ✅ **Full React Integration** - Native React components and hooks that work seamlessly with React's lifecycle
- ✅ **TypeScript Support** - Complete type definitions for all APIs, ensuring type safety and excellent IDE support
- ✅ **Hooks API** - Easy-to-use React hooks (`useGraph`) for graph manipulation without direct DOM access
- ✅ **Context API** - React Context (`GraphProvider`, `useGraphContext`) for state management and component communication
- ✅ **All LiteGraph Features** - Supports all original LiteGraph.js features including nodes, connections, execution, and more
- ✅ **Customizable** - Theme support and extensive configuration options for styling and behavior
- ✅ **Performance Optimized** - Optimized for React rendering with features like `render_only_visible` and `autoresize`

### 📦 Component Features

#### GraphCanvas Component

The main component that renders the graph editor canvas with the following capabilities:

- **Canvas Rendering** - High-performance canvas-based rendering with automatic resizing
- **Grid Display** - Optional background grid for better visual alignment
- **Minimap** - Optional minimap for navigation in large graphs
- **Live Mode** - Real-time execution mode for dynamic graphs
- **External Graph Support** - Can work with externally created graph instances
- **Initial Data Loading** - Load graphs from serialized JSON data
- **Event Callbacks** - Comprehensive event system for graph lifecycle and user interactions
- **Custom Styling** - Support for custom CSS classes and inline styles
- **Child Components** - Supports React children that can use graph hooks

#### Canvas Options

The canvas supports extensive configuration through the `options` prop:

- **Node Interaction**
  - `allow_dragnodes` - Enable dragging nodes around the canvas
  - `allow_node_selection` - Enable selecting nodes by clicking
  - `allow_multi_selection` - Enable selecting multiple nodes
  - `allow_duplicate_nodes` - Allow duplicating nodes

- **Canvas Interaction**
  - `allow_dragcanvas` - Enable panning the canvas by dragging
  - `allow_zoom` - Enable zooming with mouse wheel or gestures
  - `allow_pan` - Enable panning the canvas
  - `allow_contextmenu` - Enable right-click context menu
  - `allow_keyboard` - Enable keyboard shortcuts

- **Connection Management**
  - `allow_connection_drag` - Enable dragging connections
  - `allow_connection_reconnect` - Enable reconnecting connections
  - `allow_connection_delete` - Enable deleting connections
  - `allow_connection_insert` - Enable inserting nodes into connections
  - `allow_connection_replace` - Enable replacing connections
  - `allow_connection_swap` - Enable swapping connection endpoints
  - `allow_connection_split` - Enable splitting connections
  - `allow_connection_merge` - Enable merging connections
  - `allow_connection_reroute` - Enable rerouting connections
  - `allow_connection_snap` - Enable snapping connections to slots
  - `allow_connection_curve` - Enable curved connection lines
  - `allow_connection_arrow` - Show arrows on connections
  - `allow_connection_label` - Show labels on connections
  - `allow_connection_color` - Customize connection colors
  - `allow_connection_width` - Customize connection line width
  - `allow_connection_style` - Customize connection line style
  - `allow_connection_animation` - Animate connections
  - `allow_connection_highlight` - Highlight connections on hover
  - `allow_connection_tooltip` - Show tooltips on connections
  - `allow_connection_contextmenu` - Context menu for connections
  - `allow_connection_keyboard` - Keyboard shortcuts for connections
  - `allow_connection_multi_selection` - Multi-select connections
  - `allow_connection_selection` - Select connections

- **Graph Operations**
  - `allow_save` - Enable saving graphs
  - `allow_load` - Enable loading graphs
  - `allow_clear` - Enable clearing the graph
  - `allow_undo` - Enable undo functionality
  - `allow_redo` - Enable redo functionality
  - `allow_restore` - Enable restoring previous state
  - `allow_autoarrange` - Enable automatic node arrangement
  - `allow_searchbox` - Enable search box for finding nodes

- **Performance**
  - `render_only_visible` - Only render visible nodes for better performance
  - `autoresize` - Automatically resize canvas to container
  - `skip_events` - Skip event handling for performance (advanced)

### 🎣 Hook Features

#### useGraph Hook

Provides programmatic access to graph operations:

- **Node Management**
  - `addNode(type, pos?)` - Add a new node to the graph by type and optional position
  - `removeNode(node)` - Remove a node from the graph
  - `selectedNode` - Access the currently selected node

- **Connection Management**
  - `connect(from, fromSlot, to, toSlot)` - Connect two nodes
  - `disconnect(from, fromSlot, to, toSlot)` - Disconnect two nodes

- **Graph Execution**
  - `start()` - Start graph execution
  - `stop()` - Stop graph execution

- **Serialization**
  - `serialize()` - Serialize graph to JSON format
  - `load(data)` - Load graph from serialized JSON data
  - `clear()` - Clear all nodes from the graph

- **Canvas Navigation**
  - `zoom(factor)` - Zoom the canvas by a factor
  - `center()` - Center the view on all nodes
  - `fit()` - Fit all nodes to the window

- **State Access**
  - `graph` - Direct access to the LGraph instance
  - `canvas` - Direct access to the LGraphCanvas instance
  - `isReady` - Boolean indicating if graph is initialized and ready

### 🎯 Event System

Comprehensive event callbacks for graph lifecycle and user interactions:

- **Lifecycle Events**
  - `onReady(canvas, graph)` - Called when graph is initialized and ready
  - `onChange(graph)` - Called whenever the graph structure changes

- **Node Events**
  - `onNodeSelected(node)` - Called when a node is selected or deselected
  - `onNodeAdded(node)` - Called when a new node is added to the graph
  - `onNodeRemoved(node)` - Called when a node is removed from the graph

- **Connection Events**
  - `onConnectionChange(from, to, slot)` - Called when connections change

### 🎨 Theming

Custom theme support for visual customization:

- `background` - Canvas background color
- `gridColor` - Grid line color
- `nodeBackground` - Default node background color
- `nodeSelected` - Selected node highlight color
- `connectionColor` - Connection line color
- `textColor` - Text color

### 🛠 Utility Functions

- `createNode(type)` - Utility function to create nodes programmatically (wraps `LiteGraph.createNode`)

### 📊 Type Exports

Full TypeScript support with exported types:

- `GraphCanvasProps` - Props interface for GraphCanvas component
- `GraphTheme` - Theme configuration interface
- `GraphContextValue` - Context value interface
- `UseGraphReturn` - Return type for useGraph hook
- `LGraphCanvasOptions` - Canvas options interface
- `LGraph` - LiteGraph graph instance type
- `LGraphNode` - LiteGraph node type
- `LGraphCanvas` - LiteGraph canvas type
- `SerializedLGraph` - Serialized graph data type

## Installation

```bash
npm install litegraph-react litegraph.js
```

## Quick Start

```tsx
import React from 'react';
import { GraphCanvas } from 'litegraph-react';
import 'litegraph.js/css/litegraph.css';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GraphCanvas
        width={1920}
        height={1080}
        onReady={(canvas, graph) => {
          console.log('Graph ready!');
        }}
      />
    </div>
  );
}
```

## Usage Examples

### Basic Usage

```tsx
import { GraphCanvas } from 'litegraph-react';

<GraphCanvas
  width={1920}
  height={1080}
  grid={true}
  minimap={true}
  onReady={(canvas, graph) => {
    // Graph is ready to use
  }}
/>
```

### Using the Hook API

```tsx
import { GraphCanvas, useGraph } from 'litegraph-react';

function MyGraphEditor() {
  return (
    <GraphCanvas width={1920} height={1080}>
      <GraphControls />
    </GraphCanvas>
  );
}

function GraphControls() {
  const { addNode, removeNode, selectedNode, start, stop } = useGraph();

  const handleAddNode = () => {
    addNode('basic/const', [100, 100]);
  };

  return (
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
      <button onClick={handleAddNode}>Add Node</button>
      <button onClick={() => selectedNode && removeNode(selectedNode)}>
        Remove Selected
      </button>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### Programmatic Node Creation

```tsx
import { GraphCanvas, createNode } from 'litegraph-react';

function App() {
  const graphRef = useRef(null);

  const addConstantNode = () => {
    if (graphRef.current) {
      const node = createNode('basic/const');
      node.pos = [100, 100];
      node.setValue(42);
      graphRef.current.add(node);
    }
  };

  return (
    <>
      <button onClick={addConstantNode}>Add Constant</button>
      <GraphCanvas
        width={1920}
        height={1080}
        onReady={(canvas, graph) => {
          graphRef.current = graph;
        }}
      />
    </>
  );
}
```

### Loading and Saving Graphs

```tsx
import { GraphCanvas, useGraph } from 'litegraph-react';

function GraphWithSave() {
  return (
    <GraphCanvas
      width={1920}
      height={1080}
      data={savedGraphData} // Load initial data
      onChange={(graph) => {
        const data = graph.serialize();
        // Save data somewhere
        localStorage.setItem('my-graph', JSON.stringify(data));
      }}
    >
      <SaveLoadControls />
    </GraphCanvas>
  );
}

function SaveLoadControls() {
  const { serialize, load } = useGraph();

  const handleSave = () => {
    const data = serialize();
    localStorage.setItem('graph-save', JSON.stringify(data));
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('graph-save');
    if (saved) {
      load(JSON.parse(saved));
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
    </div>
  );
}
```

### Advanced Canvas Configuration

```tsx
import { GraphCanvas } from 'litegraph-react';

<GraphCanvas
  width={1920}
  height={1080}
  minimap={true}
  liveMode={false}
  options={{
    allow_dragnodes: true,
    allow_dragcanvas: true,
    allow_zoom: true,
    allow_pan: true,
    allow_undo: true,
    allow_redo: true,
    allow_multi_selection: true,
    allow_connection_curve: true,
    allow_connection_arrow: true,
    render_only_visible: true,
    autoresize: true,
  }}
  theme={{
    background: '#1e1e1e',
    gridColor: '#333',
    nodeBackground: '#2d2d2d',
    nodeSelected: '#007acc',
    connectionColor: '#666',
    textColor: '#fff',
  }}
/>
```

### Using Context Directly

```tsx
import { GraphProvider, useGraphContext } from 'litegraph-react';

function CustomComponent() {
  const { graph, canvas, selectedNode, isReady } = useGraphContext();
  
  // Direct access to graph and canvas instances
  if (isReady && graph) {
    // Use graph methods directly
  }
  
  return <div>Custom UI</div>;
}
```

## API Reference

### `<GraphCanvas />` Component

Main component for rendering the graph canvas.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `graph` | `LGraph` | - | External graph instance (optional) |
| `data` | `SerializedLGraph` | - | Initial graph data (JSON) |
| `width` | `number` | `1024` | Canvas width |
| `height` | `number` | `720` | Canvas height |
| `grid` | `boolean` | `true` | Show grid |
| `minimap` | `boolean` | `true` | Show minimap |
| `liveMode` | `boolean` | `false` | Enable live mode |
| `theme` | `GraphTheme` | - | Custom theme configuration |
| `onReady` | `(canvas, graph) => void` | - | Callback when graph is ready |
| `onChange` | `(graph) => void` | - | Callback when graph changes |
| `onNodeSelected` | `(node) => void` | - | Callback when node is selected |
| `onNodeAdded` | `(node) => void` | - | Callback when node is added |
| `onNodeRemoved` | `(node) => void` | - | Callback when node is removed |
| `onConnectionChange` | `(from, to, slot) => void` | - | Callback when connection changes |
| `options` | `LGraphCanvasOptions` | `{}` | Additional canvas options |
| `className` | `string` | `''` | CSS class name |
| `style` | `React.CSSProperties` | - | CSS styles |
| `children` | `React.ReactNode` | - | Child components (can use hooks) |

### `useGraph()` Hook

Hook to interact with the graph instance. Must be used within a `<GraphCanvas>` component.

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `graph` | `LGraph \| null` | The graph instance |
| `canvas` | `LGraphCanvas \| null` | The canvas instance |
| `selectedNode` | `LGraphNode \| null` | Currently selected node |
| `isReady` | `boolean` | Whether graph is ready |
| `addNode` | `(type, pos?) => LGraphNode` | Add a node to the graph |
| `removeNode` | `(node) => void` | Remove a node from the graph |
| `connect` | `(from, fromSlot, to, toSlot) => boolean` | Connect two nodes |
| `disconnect` | `(from, fromSlot, to, toSlot) => void` | Disconnect two nodes |
| `start` | `() => void` | Start graph execution |
| `stop` | `() => void` | Stop graph execution |
| `serialize` | `() => SerializedLGraph` | Serialize graph to JSON |
| `load` | `(data) => void` | Load graph from JSON |
| `clear` | `() => void` | Clear all nodes |
| `zoom` | `(factor) => void` | Zoom canvas |
| `center` | `() => void` | Center on nodes |
| `fit` | `() => void` | Fit to window |

### `useGraphContext()` Hook

Hook to access graph context directly. Must be used within a `<GraphCanvas>` component.

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `graph` | `LGraph \| null` | The graph instance |
| `canvas` | `LGraphCanvas \| null` | The canvas instance |
| `selectedNode` | `LGraphNode \| null` | Currently selected node |
| `isReady` | `boolean` | Whether graph is ready |

### `createNode(type: string)` Function

Utility function to create nodes programmatically.

#### Parameters

- `type` - The node type identifier (e.g., `'basic/const'`)

#### Returns

- `LGraphNode | null` - The created node or null if type not found

## Styling

Import the LiteGraph CSS file:

```tsx
import 'litegraph.js/css/litegraph.css';
```

Or use the included styles:

```tsx
import 'litegraph-react/styles';
```

The component also supports custom styling through `className` and `style` props:

```tsx
<GraphCanvas
  className="my-custom-graph"
  style={{ border: '1px solid #333' }}
/>
```

## TypeScript

Full TypeScript support is included. All types are exported:

```tsx
import type {
  GraphCanvasProps,
  GraphTheme,
  UseGraphReturn,
  GraphContextValue,
  LGraphCanvasOptions,
  LGraph,
  LGraphNode,
  LGraphCanvas,
  SerializedLGraph,
} from 'litegraph-react';
```

## Performance Considerations

The library includes several performance optimizations:

- **Render Only Visible** - Only renders nodes that are currently visible in the viewport
- **Automatic Resizing** - Canvas automatically resizes to fit its container
- **Efficient Event Handling** - Optimized event listeners with proper cleanup
- **React Optimization** - Uses React hooks and memoization to minimize re-renders

For large graphs, consider:

- Enabling `render_only_visible` option
- Using `autoresize` for responsive layouts
- Debouncing `onChange` callbacks if saving frequently
- Using `skip_events` option for read-only views

## Building

```bash
npm run build
```

## Development

```bash
# Build in watch mode
npm run dev

# Run example app
npm run dev:example

# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm test
```

## Testing

The package includes comprehensive tests:

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Browser Support

This package supports all modern browsers that support:
- React 18+
- Canvas API
- ES6+ JavaScript features

## License

MIT

## Credits

Built on top of [LiteGraph.js](https://github.com/jagenjo/litegraph.js) by [jagenjo](https://github.com/jagenjo).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
