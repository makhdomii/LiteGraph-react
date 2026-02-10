# @makhdomii/litegraph-react

A React-compatible version of LiteGraph.js - A graph node engine and editor written in JavaScript, similar to Unreal Blueprints or Pure Data. This package provides seamless React integration with full TypeScript support.

## ✨ Features

- ✅ **Full React Integration** - Native React components and hooks
- ✅ **TypeScript Support** - Complete type definitions
- ✅ **Self-Contained** - Bundles LiteGraph.js directly (no external dependency)
- ✅ **All LiteGraph Features** - Supports all original LiteGraph.js features
- ✅ **Customizable** - Theme support and extensive configuration options
- ✅ **Performance Optimized** - Optimized for React rendering

## 📦 Installation

```bash
npm install @makhdomii/litegraph-react
```

**Note:** This package bundles LiteGraph.js directly. Do **not** install the `litegraph.js` npm module—use only `@makhdomii/litegraph-react` from npm.

## 🚀 Quick Start

```tsx
import React from 'react';
import { GraphCanvas } from '@makhdomii/litegraph-react';

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

## 📚 Documentation

See the [full documentation](https://github.com/makhdomii/LiteGraph-react#readme) for complete API reference and examples.

## 🔧 Development

### Building

```bash
npm run build
```

## 📄 License

MIT

## 🙏 Credits

Built on top of [LiteGraph.js](https://github.com/jagenjo/litegraph.js) by [jagenjo](https://github.com/jagenjo).
