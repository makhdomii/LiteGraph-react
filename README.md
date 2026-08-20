# @makhdomii/litegraph-react

A React-compatible version of [LiteGraph.js](https://github.com/jagenjo/litegraph.js) — a graph node engine and editor similar to Unreal Blueprints or Pure Data. This package provides React components, hooks, and TypeScript types while bundling LiteGraph.js so you do not need a separate `litegraph.js` dependency.

## Features

- Full React integration (`GraphCanvas`, context, hooks)
- TypeScript types for props, theme, and runtime classes
- Self-contained: LiteGraph.js is bundled inside the package
- Original LiteGraph node library (basic, math, events, widgets, …)
- Custom nodes via `LiteGraph.registerNodeType`
- Theme and canvas `options` for editor behavior

## Table of contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Styles](#styles)
- [Public API](#public-api)
- [GraphCanvas](#graphcanvas)
- [Theme](#theme)
- [Canvas options](#canvas-options)
- [useGraph](#usegraph)
- [GraphProvider / useGraphContext](#graphprovider--usegraphcontext)
- [createNode](#createnode)
- [LiteGraph runtime](#litegraph-runtime)
- [Custom nodes](#custom-nodes)
- [Programmatic graphs](#programmatic-graphs)
- [External graph & initial data](#external-graph--initial-data)
- [Built-in node types](#built-in-node-types)
- [Examples](#examples)
- [Development](#development)
- [Issues & feedback](#issues--feedback)
- [License](#license)
- [Credits](#credits)

## Installation

```bash
npm install @makhdomii/litegraph-react
```

Peer dependencies: `react` and `react-dom` (18 or 19).

**Important:** This package bundles LiteGraph.js. Do **not** install the separate `litegraph.js` npm package — use only `@makhdomii/litegraph-react`.

## Quick start

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
          console.log('Graph ready', canvas, graph);
        }}
      />
    </div>
  );
}
```

Give the parent a real size (`width`/`height` 100%). The canvas scales to fill its container; the `width` / `height` props set the internal canvas resolution.

Right-click the canvas to open the node menu, drag from outputs to inputs to connect, and use the mouse wheel (when zoom is allowed) to zoom.

## Styles

Import the package stylesheet once in your app entry (or root layout):

```ts
import '@makhdomii/litegraph-react/styles';
```

This loads LiteGraph UI styles (context menus, search box, overlays, etc.).

## Public API

| Export | Kind | Role |
|--------|------|------|
| `GraphCanvas` | Component | Main React canvas; owns or accepts an `LGraph` |
| `GraphProvider` | Component | Context provider (also used internally by `GraphCanvas`) |
| `useGraphContext` | Hook | Read `graph`, `canvas`, `selectedNode`, `isReady` |
| `useGraph` | Hook | Imperative helpers: add/remove/connect, run, serialize, zoom |
| `createNode` | Function | `LiteGraph.createNode(type)` helper |
| `LiteGraph` | Object | Registry: `registerNodeType`, `createNode`, … |
| `LGraph` | Class | Graph instance |
| `LGraphNode` | Class | Base node type (for typing / extending) |
| `LGraphGroup` | Class | Visual groups on the canvas |
| Types | Type-only | `GraphCanvasProps`, `GraphTheme`, `UseGraphReturn`, `LGraphCanvasOptions`, `SerializedLGraph`, `LGraphCanvas`, … |

```ts
import {
  GraphCanvas,
  GraphProvider,
  useGraph,
  useGraphContext,
  createNode,
  LiteGraph,
  LGraph,
  LGraphNode,
  LGraphGroup,
} from '@makhdomii/litegraph-react';

import type {
  GraphCanvasProps,
  GraphTheme,
  GraphContextValue,
  UseGraphReturn,
  LGraphCanvasOptions,
  SerializedLGraph,
  LGraphCanvas,
} from '@makhdomii/litegraph-react';
```

---

## GraphCanvas

Primary React component. It creates (or uses) an `LGraph`, mounts an `LGraphCanvas` on an HTML canvas, wraps children in `GraphProvider`, and starts graph execution on ready.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `graph` | `LGraph` | — | Optional external graph. If omitted, a new `LGraph` is created. |
| `data` | `SerializedLGraph` | — | Initial serialized graph. Applied with `graph.configure(data)` when not using an external `graph`. Updates re-apply when `data` changes. |
| `width` | `number` | `1024` | Canvas element width (resolution). |
| `height` | `number` | `720` | Canvas element height (resolution). |
| `grid` | `boolean` | `true` | Reserved for grid display (kept for API compatibility). |
| `minimap` | `boolean` | `true` | Passed as `allow_minimap` when creating the canvas. |
| `liveMode` | `boolean` | `false` | Toggles LiteGraph live mode (`setLiveMode` / `live_mode`). |
| `theme` | `GraphTheme` | — | Visual theme (see [Theme](#theme)). |
| `options` | `Partial<LGraphCanvasOptions>` | `{}` | Merged into LiteGraph canvas constructor options (see [Canvas options](#canvas-options)). |
| `className` | `string` | `''` | Extra class on the container `div`. |
| `style` | `React.CSSProperties` | — | Inline styles on the container (`position: relative` is always set). |
| `children` | `React.ReactNode` | — | Rendered inside the provider (toolbars that call `useGraph`, overlays, etc.). |

### Callbacks

| Prop | Signature | When it fires |
|------|-----------|---------------|
| `onReady` | `(canvas: LGraphCanvas, graph: LGraph) => void` | After graph + canvas are created and started. Ideal place to seed nodes. |
| `onChange` | `(graph: LGraph) => void` | After a node is added, or when connections change (via LiteGraph’s `connectionChange`). Also when `data` is reconfigured. |
| `onNodeSelected` | `(node: LGraphNode \| null) => void` | When selection changes (via `selectNode` override + polling). |
| `onNodeAdded` | `(node: LGraphNode) => void` | When a node is added to the graph. |
| `onNodeRemoved` | `(node: LGraphNode) => void` | Declared in types but **not wired** — LiteGraph does not expose a reliable `onNodeRemoved` hook in this wrapper. Prefer tracking removals yourself or listening via `onChange` / graph APIs. |
| `onConnectionChange` | `(from, to, slot) => void` | Declared in types but **not wired** with full `(from, to, slot)` detail. Use `onChange` for connection updates. |

### Minimal example with seeding

```tsx
import { GraphCanvas, createNode } from '@makhdomii/litegraph-react';
import '@makhdomii/litegraph-react/styles';

export function Editor() {
  return (
    <GraphCanvas
      width={1280}
      height={720}
      grid
      minimap
      liveMode
      onReady={(_canvas, graph) => {
        const a = createNode('basic/const');
        const b = createNode('basic/watch');
        if (!a || !b) return;
        a.pos = [120, 120];
        b.pos = [360, 120];
        graph.add(a);
        graph.add(b);
        a.connect(0, b, 0);
      }}
      onNodeSelected={(node) => console.log('selected', node?.title)}
      onChange={(g) => console.log('graph changed', g.serialize())}
    />
  );
}
```

### Using children with hooks

`GraphCanvas` provides context to descendants. Put controls that call `useGraph` as children:

```tsx
function Toolbar() {
  const { addNode, serialize, isReady } = useGraph();
  if (!isReady) return null;
  return (
    <button type="button" onClick={() => addNode('basic/const', [100, 100])}>
      Add Const
    </button>
  );
}

function App() {
  return (
    <GraphCanvas width={1280} height={720}>
      <Toolbar />
    </GraphCanvas>
  );
}
```

---

## Theme

```ts
interface GraphTheme {
  background?: string;
  gridColor?: string;
  nodeBackground?: string;
  nodeSelected?: string;
  connectionColor?: string;
  textColor?: string;
}
```

Pass via the `theme` prop. **Currently applied:** `background` is set on the canvas background element. Other fields are reserved for fuller theming; node/connection colors may still follow LiteGraph defaults unless you customize rendering yourself.

```tsx
<GraphCanvas
  theme={{
    background: '#0f1419',
    gridColor: '#1a3a4a',
    connectionColor: '#4fc3f7',
  }}
/>
```

---

## Canvas options

`options` is merged into the `LGraphCanvas` constructor after package defaults. Use it to restrict or enable editor features.

### Defaults set by GraphCanvas

| Option | Default |
|--------|---------|
| `skip_events` | `false` |
| `autoresize` | `true` |
| `render_only_visible` | `true` |
| `allow_dragnodes` | `true` |
| `allow_dragcanvas` | `true` |
| `allow_searchbox` | `true` |
| `allow_minimap` | from `minimap` prop |
| `allow_duplicate_nodes` | `true` |
| `allow_autoarrange` | `false` |
| `allow_restore` / `allow_save` / `allow_load` / `allow_clear` | `true` |
| `allow_undo` / `allow_redo` | `true` |
| `allow_zoom` / `allow_pan` | `true` |
| `allow_contextmenu` / `allow_keyboard` | `true` |
| `allow_multi_selection` / `allow_node_selection` | `true` |

### Common flags

| Flag | Purpose |
|------|---------|
| `allow_contextmenu` | Right-click node/canvas menus |
| `allow_searchbox` | Node search UI |
| `allow_zoom` | Zoom with wheel / UI |
| `allow_pan` | Pan the canvas |
| `allow_dragnodes` | Drag nodes |
| `allow_dragcanvas` | Drag empty canvas |
| `allow_minimap` | Minimap (also controlled by `minimap` prop) |
| `allow_keyboard` | Keyboard shortcuts |
| `allow_multi_selection` | Multi-select nodes |

Many additional connection-related flags exist on `LGraphCanvasOptions` (see package types). Extra keys are allowed (`[key: string]: any`) for forward compatibility with LiteGraph.

```tsx
<GraphCanvas
  options={{
    allow_contextmenu: false,
    allow_searchbox: false,
    allow_zoom: false,
  }}
/>
```

---

## useGraph

Hook for imperative control. **Must** be used under `GraphCanvas` (or a `GraphProvider` that supplies the same context).

### Return value

| Field / method | Type | Description |
|----------------|------|-------------|
| `graph` | `LGraph \| null` | Current graph instance |
| `canvas` | `LGraphCanvas \| null` | Current canvas instance |
| `selectedNode` | `LGraphNode \| null` | First selected node (if any) |
| `isReady` | `boolean` | `true` after canvas init |
| `addNode` | `(type, pos?) => LGraphNode \| null` | Creates via `LiteGraph.createNode`, optional `[x, y]`, adds to graph |
| `removeNode` | `(node) => void` | Removes a node from the graph |
| `connect` | `(from, fromSlot, to, toSlot) => boolean` | Connects output → input; returns success |
| `disconnect` | `(from, fromSlot, to, toSlot) => void` | Disconnects using `from.disconnectOutput(fromSlot, to)` |
| `start` | `() => void` | Starts graph execution loop |
| `stop` | `() => void` | Stops graph execution |
| `serialize` | `() => SerializedLGraph \| null` | JSON-serializable graph snapshot |
| `load` | `(data: SerializedLGraph) => void` | `graph.configure(data)` |
| `clear` | `() => void` | Clears all nodes/links |
| `zoom` | `(factor: number) => void` | Multiplies current scale by `factor` |
| `center` | `() => void` | Centers view on the first node if present |
| `fit` | `() => void` | Resets zoom to `1` at origin (LiteGraph has no full fit-to-window in this wrapper) |

Methods that need the graph/canvas no-op (or return `null` / `false`) until `isReady` is `true`.

```tsx
function Controls() {
  const {
    addNode,
    connect,
    serialize,
    load,
    clear,
    start,
    stop,
    zoom,
    isReady,
  } = useGraph();

  if (!isReady) return <p>Loading…</p>;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          const a = addNode('basic/const', [80, 80]);
          const b = addNode('basic/watch', [280, 80]);
          if (a && b) connect(a, 0, b, 0);
        }}
      >
        Seed Const → Watch
      </button>
      <button
        type="button"
        onClick={() => {
          const data = serialize();
          if (data) localStorage.setItem('my-graph', JSON.stringify(data));
        }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => {
          const raw = localStorage.getItem('my-graph');
          if (raw) load(JSON.parse(raw));
        }}
      >
        Load
      </button>
      <button type="button" onClick={() => zoom(1.2)}>Zoom in</button>
      <button type="button" onClick={clear}>Clear</button>
      <button type="button" onClick={stop}>Stop</button>
      <button type="button" onClick={start}>Start</button>
    </>
  );
}
```

---

## GraphProvider / useGraphContext

`GraphCanvas` already wraps its tree in `GraphProvider`. You usually do not mount `GraphProvider` yourself unless you are building a custom shell.

### Context value

```ts
interface GraphContextValue {
  graph: LGraph | null;
  canvas: LGraphCanvas | null;
  selectedNode: LGraphNode | null;
  isReady: boolean;
}
```

`useGraphContext()` returns that object and **throws** if used outside a provider.

Prefer `useGraph()` when you need helpers; use `useGraphContext()` when you only need the raw instances.

---

## createNode

```ts
createNode(type: string): LGraphNode | null
```

Thin wrapper around `LiteGraph.createNode(type)`. Returns `null` if the type is unknown or creation fails.

Does **not** add the node to a graph — call `graph.add(node)` (or `useGraph().addNode`) yourself.

```ts
import { createNode } from '@makhdomii/litegraph-react';

const node = createNode('math/operation');
if (node) {
  node.pos = [200, 200];
  graph.add(node);
}
```

---

## LiteGraph runtime

### `LiteGraph`

Global registry and utilities. Common methods:

| Method | Description |
|--------|-------------|
| `registerNodeType(type, constructor)` | Register a custom node (`"category/name"`) |
| `unregisterNodeType(type)` | Remove a registered type |
| `createNode(type)` | Instantiate a registered type |
| `getNodeType(type)` | Get the constructor for a type |
| `getNodeTypesInCategory(category)` | List types in a category |
| `getNodeTypesCategories()` | List category names |
| `registered_node_types` | Map of all registered types |

### `LGraph`

Graph document: nodes, links, execution.

Useful methods (LiteGraph API): `add`, `remove`, `start`, `stop`, `clear`, `serialize`, `configure`, `getNodeById`, …

### `LGraphNode`

Base node. Custom nodes typically use the classic constructor + `prototype.onExecute` pattern (see below). Helpers on instances include `addInput`, `addOutput`, `addWidget`, `getInputData`, `setOutputData`, `connect`, `disconnectOutput`, …

### `LGraphGroup`

Visual grouping of nodes on the canvas (title/box). See the `/groups` example.

### `SerializedLGraph`

JSON shape produced by `graph.serialize()` / accepted by `graph.configure()` and the `data` prop — suitable for persistence (`localStorage`, server, file).

---

## Custom nodes

Yes — users can define custom nodes. Register them once at startup (module scope or before the canvas mounts), then create them with `createNode` or from the right-click menu under your category.

### Pattern

```tsx
import { LiteGraph, createNode } from '@makhdomii/litegraph-react';

function DoubleNumber(this: any) {
  this.addInput('in', 'number');
  this.addOutput('out', 'number');
  this.properties = { bias: 0 };
  this.addWidget('number', 'bias', 0, (v: number) => {
    this.properties.bias = v;
  });
  this.size = [160, 60];
}

DoubleNumber.title = 'Double';
DoubleNumber.desc = 'Doubles a number and adds bias';

DoubleNumber.prototype.onExecute = function () {
  const v = this.getInputData(0);
  const bias = Number(this.properties.bias) || 0;
  this.setOutputData(0, typeof v === 'number' ? v * 2 + bias : null);
};

// Register once
LiteGraph.registerNodeType('demo/double', DoubleNumber);

// Create later
const node = createNode('demo/double');
```

### Tips

- Type string format: `"category/name"` (e.g. `demo/double` → menu category **demo**).
- Register **before** loading a serialized graph that references that type.
- Guard against double-registration in React Strict Mode (a module-level `registered` flag works well).
- Slot types (`'number'`, `'string'`, `'*'`, …) should match what you connect.
- Widgets: `'number'`, `'text'`, `'toggle'`, `'combo'`, `'button'`, etc. (LiteGraph widget types).
- Execution runs when the graph is started (`GraphCanvas` starts it on ready; or call `graph.start()` / `useGraph().start()`).

A complete demo lives at **`/custom-nodes`** (`example/lib/demoNodes.ts` + `example/pages/custom-nodes.tsx`).

---

## Programmatic graphs

```tsx
import { GraphCanvas, createNode } from '@makhdomii/litegraph-react';

<GraphCanvas
  onReady={(_canvas, graph) => {
    const constNode = createNode('basic/const');
    const watch = createNode('basic/watch');
    if (!constNode || !watch) return;

    constNode.pos = [100, 100];
    watch.pos = [350, 100];
    graph.add(constNode);
    graph.add(watch);
    constNode.connect(0, watch, 0); // output slot 0 → input slot 0
  }}
/>
```

Or with the hook:

```ts
const { addNode, connect } = useGraph();
const a = addNode('basic/const', [100, 100]);
const b = addNode('basic/watch', [350, 100]);
if (a && b) connect(a, 0, b, 0);
```

---

## External graph & initial data

### Own the graph outside React

```tsx
import { useMemo } from 'react';
import { GraphCanvas, LGraph, createNode } from '@makhdomii/litegraph-react';

function App() {
  const graph = useMemo(() => {
    const g = new LGraph();
    const a = createNode('basic/const');
    const b = createNode('basic/watch');
    if (a && b) {
      a.pos = [160, 160];
      b.pos = [420, 160];
      g.add(a);
      g.add(b);
      a.connect(0, b, 0);
    }
    return g;
  }, []);

  return <GraphCanvas graph={graph} width={1280} height={720} />;
}
```

Mutating that `LGraph` (e.g. `graph.add(...)`) updates the same editor instance.

### Load from JSON

```tsx
const saved: SerializedLGraph = JSON.parse(localStorage.getItem('graph')!);

<GraphCanvas data={saved} width={1280} height={720} />
```

Do not pass both a conflicting external `graph` and `data` expecting `data` to apply on the external instance — `data` is applied only when GraphCanvas creates the graph itself.

---

## Built-in node types

Registered by the bundled LiteGraph.js. Create with `createNode('category/name')` or the context menu.

### basic

| Type | Role |
|------|------|
| `basic/const` | Constant number |
| `basic/boolean` | Constant boolean |
| `basic/string` | Constant string |
| `basic/watch` | Display incoming value |
| `basic/console` | Log to console |
| `basic/alert` | Browser alert |
| `basic/time` | Time |
| `basic/file` / `basic/jsonparse` / `basic/data` | File / JSON / data |
| `basic/array`, `basic/set_array`, `basic/array[]`, `basic/table[][]` | Arrays / tables |
| `basic/object_property`, `basic/object_keys`, `basic/set_object`, `basic/merge_objects` | Objects |
| `basic/variable`, `basic/download`, `basic/cast`, `basic/script` | Misc |
| `basic/CompareValues`, `basic/data_store` | Compare / store |

### math

Includes `math/operation`, `math/compare`, `math/condition`, `math/formula`, `math/clamp`, `math/lerp`, `math/abs`, `math/floor`, `math/rand`, `math/noise`, `math/trigonometry`, `math/converter`, and many more.

### math3d

`math3d/vec2-to-xy`, `math3d/xy-to-vec2`, `math3d/vec3-to-xyz`, `math3d/xyz-to-vec3`, `math3d/vec4-to-xyzw`, `math3d/xyzw-to-vec4`.

### events

`events/trigger`, `events/delay`, `events/timer`, `events/sequence`, `events/branch`, `events/filter`, `events/counter`, `events/once`, `events/semaphore`, `events/log`, `events/stepper`, `events/waitAll`, …

### widget

`widget/button`, `widget/toggle`, `widget/number`, `widget/combo`, `widget/knob`, `widget/text`, `widget/hslider`, `widget/progress`, `widget/panel`, …

### graph / input

`graph/subgraph`, `graph/input`, `graph/output`, `input/gamepad`.

Logic and string categories are also available in the editor menu where registered by LiteGraph. Browse them in the example app under **Node library tours**.

---

## Examples

The `example/` app is a multi-page gallery:

```bash
npm run dev:example
```

Open `http://localhost:3000`. Notable routes:

| Path | What it shows |
|------|----------------|
| `/basic` | Mounted canvas + Const → Watch |
| `/programmatic` | `createNode` + toolbar |
| `/hooks` | `useGraph` add / run / save / load |
| `/theme` | `theme` prop |
| `/live-mode` | `liveMode` |
| `/options` | Restricted `options` |
| `/external-graph` | External `LGraph` via `graph` |
| `/data-prop` | Initial `data` |
| `/callbacks` | Ready / change / selection callbacks |
| `/custom-nodes` | `registerNodeType` demos |
| `/subgraphs` | Nested `graph/subgraph` |
| `/groups` | `LGraphGroup` |
| `/nodes/*` | Built-in node category tours |

Full route list: [example/README.md](example/README.md).

Watch mode (rebuild library while editing):

```bash
npm run dev:example:watch
```

---

## Development

```bash
npm run build          # Vite library build + .d.ts
npm run type-check     # tsc --noEmit
npm run lint           # ESLint
npm test               # Vitest
npm run test:coverage  # Coverage report
```

Published entry points:

| Path | File |
|------|------|
| `@makhdomii/litegraph-react` | `dist/index.esm.js` / `dist/index.cjs.js` + `dist/index.d.ts` |
| `@makhdomii/litegraph-react/styles` | `dist/litegraph-react.css` |

---

## Issues & feedback

Bugs, questions, and ideas are welcome: [open an issue](https://github.com/makhdomii/LiteGraph-react/issues).

## License

MIT

## Credits

Built on [LiteGraph.js](https://github.com/jagenjo/litegraph.js) by [jagenjo](https://github.com/jagenjo).
