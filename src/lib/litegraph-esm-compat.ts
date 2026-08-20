export function rewriteLiteGraphUmd(code: string): string {
  return code
    .replace(/\}\)\(this\);/g, '})(globalThis);')
    .replace(/exports\.(\w+) = this\./g, 'exports.$1 = globalThis.');
}

export function isLiteGraphSource(id: string): boolean {
  return id.replace(/\\/g, '/').endsWith('/src/lib/litegraph.js');
}

/**
 * LiteGraph.js is a UMD script that does `})(this)`.
 * In ESM, bundlers rewrite top-level `this` to undefined, which crashes with
 * "Cannot set properties of undefined (setting 'LiteGraph')".
 */
export function litegraphEsmCompat() {
  return {
    name: 'litegraph-esm-compat',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!isLiteGraphSource(id)) {
        return null;
      }

      return {
        code: rewriteLiteGraphUmd(code),
        map: null,
      };
    },
  };
}
