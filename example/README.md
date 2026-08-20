# LiteGraph React Example

Multi-page development gallery for `@makhdomii/litegraph-react`.

## Running

```bash
npm run dev:example
```

This builds the library, then serves the example app on `http://localhost:3000` using `dist/` (not source).

For auto-rebuild while editing the library:

```bash
npm run dev:example:watch
```

If you see errors about `.on()` not being a function: stop the server, hard-refresh the browser, run `npm run build`, then restart `npm run dev:example`.

## Routes

### Getting started

| Path | Situation |
|------|-----------|
| `/` | Catalog of all examples |
| `/basic` | Mounted `GraphCanvas` with seeded Const → Watch |
| `/programmatic` | `createNode` + graph ref toolbar |
| `/hooks` | `useGraph` add / run / save / load / clear |

### React APIs

| Path | Situation |
|------|-----------|
| `/theme` | `theme` prop |
| `/live-mode` | `liveMode` + start/stop |
| `/options` | Restricted `options` (no context menu / zoom) |
| `/external-graph` | External `LGraph` via `graph` prop |
| `/data-prop` | Initial `data: SerializedLGraph` |
| `/viewport` | `zoom` / `center` / `fit` |
| `/connect` | Programmatic `connect` / `disconnect` |
| `/callbacks` | `onReady`, `onChange`, `onNodeSelected`, `onNodeAdded` |

### Advanced

| Path | Situation |
|------|-----------|
| `/custom-nodes` | `LiteGraph.registerNodeType` demos |
| `/subgraphs` | `graph/subgraph` nested graph |
| `/groups` | `LGraphGroup` |

### Node library tours

| Path | Situation |
|------|-----------|
| `/nodes/basic` | const, watch, string, boolean, console |
| `/nodes/math` | operation, compare, formula, clamp |
| `/nodes/events` | trigger, delay, timer, sequence, branch |
| `/nodes/widgets` | button, toggle, number, combo, knob |
| `/nodes/logic` | AND, OR, NOT, selector, IF |
| `/nodes/string-input` | string + gamepad |
| `/nodes/math3d` | vec2 / vec3 converters |

## File structure

```
example/
├── App.tsx                 # Shell: nav + status + Outlet
├── main.tsx                # BrowserRouter + routes
├── chrome.ts               # Shared palette / button styles
├── components/             # ExampleLayout, StatusBar
├── lib/                    # Helpers, catalog, demo nodes
└── pages/                  # One page per use case
```
