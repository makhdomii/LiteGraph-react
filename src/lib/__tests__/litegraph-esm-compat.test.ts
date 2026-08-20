import { describe, expect, it } from 'vitest';
import {
  isLiteGraphSource,
  rewriteLiteGraphUmd,
} from '../litegraph-esm-compat';

describe('rewriteLiteGraphUmd', () => {
  it('rewrites UMD this-root to globalThis', () => {
    const source = [
      '(function(global) { global.LiteGraph = {}; })(this);',
      'exports.LiteGraph = this.LiteGraph;',
    ].join('\n');

    expect(rewriteLiteGraphUmd(source)).toBe(
      [
        '(function(global) { global.LiteGraph = {}; })(globalThis);',
        'exports.LiteGraph = globalThis.LiteGraph;',
      ].join('\n')
    );
  });

  it('leaves unrelated this bindings unchanged', () => {
    const source = 'node.onMouseDown = function () { this.flags = {}; };';

    expect(rewriteLiteGraphUmd(source)).toBe(source);
  });
});

describe('isLiteGraphSource', () => {
  it('matches the vendored LiteGraph script on Windows and POSIX paths', () => {
    expect(isLiteGraphSource('C:/proj/src/lib/litegraph.js')).toBe(true);
    expect(isLiteGraphSource('C:\\proj\\src\\lib\\litegraph.js')).toBe(true);
    expect(isLiteGraphSource('/proj/src/components/GraphCanvas.tsx')).toBe(false);
  });
});
