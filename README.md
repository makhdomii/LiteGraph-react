# @makhdomii/litegraph-react

A React-compatible version of LiteGraph.js - A graph node engine and editor written in JavaScript, similar to Unreal Blueprints or Pure Data. This package provides seamless React integration with full TypeScript support.

## Features

- **Full React Integration** - Native React components and hooks
- **TypeScript Support** - Complete type definitions
- **Self-Contained** - Bundles LiteGraph.js directly (no external dependency)
- **All LiteGraph Features** - Supports all original LiteGraph.js features
- **Customizable** - Theme support and extensive configuration options
- **Performance Optimized** - Optimized for React rendering

## Installation

```bash
npm install @makhdomii/litegraph-react
```

**Note:** This package bundles LiteGraph.js directly. Do **not** install the `litegraph.js` npm module—use only `@makhdomii/litegraph-react` from npm.

## Quick Start

```tsx
import React from 'react';
import { GraphCanvas } from '@makhdomii/litegraph-react';
import '@makhdomii/litegraph-react/styles';

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

## Public API

| Export | Role |
|--------|------|
| `GraphCanvas` | Main React canvas component |
| `GraphProvider` / `useGraphContext` | Context for graph / canvas / selection |
| `useGraph` | Imperative helpers (add, connect, serialize, zoom, …) |
| `createNode` | Create a node by type string |
| `LiteGraph` | Registry (`registerNodeType`, `createNode`, …) |
| `LGraph` / `LGraphNode` / `LGraphGroup` | Runtime classes for external graphs and custom nodes |

Custom nodes:

```tsx
import { LiteGraph, LGraphNode, createNode } from '@makhdomii/litegraph-react';

// Register once, then createNode('demo/my-node') or use the canvas menu
```

## Examples

The `example/` app is a multi-page gallery covering React APIs, custom nodes, subgraphs, groups, and built-in node categories:

```bash
npm run dev:example
```

Open `http://localhost:3000` for the catalog. See [example/README.md](example/README.md) for the full route list.

## Development

### Building

```bash
npm run build
```

## License

MIT

## Credits

Built on top of [LiteGraph.js](https://github.com/jagenjo/litegraph.js) by [jagenjo](https://github.com/jagenjo).
