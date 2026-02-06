# LiteGraph React Example

This directory contains a development example application to test and demonstrate the LiteGraph React library.

## Running the Example

To start the development server:

```bash
npm run dev:example
```

This will:
- Build the library package first
- Start a Vite dev server on `http://localhost:3000`
- Automatically open the browser
- Use the built package from `dist/` (not source)

**Important:** If you see errors about `.on()` not being a function:
1. **Stop the dev server** (Ctrl+C)
2. **Clear browser cache** (Ctrl+Shift+R or Ctrl+F5 for hard refresh)
3. **Rebuild the package**: `npm run build`
4. **Restart the dev server**: `npm run dev:example`

**Note:** The example app uses the built version of the package (`dist/`), so you need to rebuild after making changes to the source code:

```bash
npm run build
```

Or use the watch mode to rebuild automatically:

```bash
npm run dev:example:watch
```

## Examples Included

The example app includes three different usage patterns:

### 1. Basic Example
Minimal setup showing the simplest way to use `GraphCanvas` component.

### 2. Programmatic Example
Demonstrates how to programmatically add nodes using refs and the LiteGraph API.

### 3. Hooks API Example
Shows how to use the `useGraph` hook for graph manipulation, including:
- Adding/removing nodes
- Starting/stopping graph execution
- Saving/loading graph data
- Clearing the graph

## Testing Your Changes

When you make changes to the library source code in `../src/`, the example will automatically reload to show your changes. This makes it easy to test and verify that your library works correctly.

## File Structure

```
example/
├── index.html      # HTML entry point
├── main.tsx        # React entry point
├── App.tsx         # Main example app with all examples
├── vite.config.ts  # Vite configuration for dev server
└── tsconfig.json   # TypeScript configuration
```
