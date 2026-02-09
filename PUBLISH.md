# Publishing @makhdomii/litegraph-react

This package **bundles** LiteGraph.js from `src/lib/` into the build. It must **not** list `litegraph.js` (or any litegraph npm module) in `dependencies`—consumers use this package only from npm and get a self-contained bundle.

## Prerequisites

1. Make sure you're logged into npm:
   ```bash
   npm login
   ```

2. Ensure you have publish access to the `@makhdomii` scope

## Building

The package automatically builds before publishing (via `prepublishOnly` hook):

```bash
npm run build
```

This will:
- Bundle LiteGraph.js from `src/lib/litegraph.js` into the dist files
- Generate TypeScript declarations
- Create both ESM and CJS builds

## Publishing

### Patch version (1.0.1 → 1.0.2)
```bash
npm run publish:patch
```

### Minor version (1.0.1 → 1.1.0)
```bash
npm run publish:minor
```

### Major version (1.0.1 → 2.0.0)
```bash
npm run publish:major
```

### Manual publish
```bash
npm publish
```

## What Gets Published

Only the following are included (via `.npmignore`):
- `dist/` - Built files (ESM, CJS, types, CSS)
- `README.md`
- `LICENSE`
- `package.json`

Source files (`src/`) are NOT included in the published package.

## After Publishing

In the **consuming project** (e.g. this repo’s root), use the new version from npm only (no local `file:` or `npm link`):

1. Update `package.json` to the new version:
   ```json
   "@makhdomii/litegraph-react": "^1.0.2"
   ```

2. Install from npm:
   ```bash
   npm install
   ```

3. The published package is self-contained; consumers do not need the `litegraph.js` npm module.
