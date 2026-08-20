import { StrictMode } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import { GraphCanvas } from '../GraphCanvas';
import { LGraphCanvas, LiteGraph } from '../../lib/litegraph-wrapper';
import type { LGraph } from '../../lib/litegraph-wrapper';

function dispatchDeleteKeydown(target: EventTarget): void {
  const event = new KeyboardEvent('keydown', {
    key: 'Delete',
    code: 'Delete',
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, 'keyCode', { get: () => 46 });
  Object.defineProperty(event, 'which', { get: () => 46 });
  target.dispatchEvent(event);
}

describe('GraphCanvas keyboard delete', () => {
  afterEach(() => {
    cleanup();
  });

  it('deletes the selected node after StrictMode remounts the canvas', async () => {
    let graph: LGraph | null = null;
    let canvas: LGraphCanvas | null = null;

    const { container } = render(
      <StrictMode>
        <GraphCanvas
          width={400}
          height={300}
          options={{ skip_render: true }}
          onReady={(nextCanvas, nextGraph) => {
            canvas = nextCanvas;
            graph = nextGraph;
          }}
        />
      </StrictMode>
    );

    await waitFor(() => {
      expect(graph).not.toBeNull();
      expect(canvas).not.toBeNull();
    });

    const node = LiteGraph.createNode('basic/const');
    expect(node).toBeTruthy();
    graph!.add(node!);
    canvas!.selectNodes([node!]);

    const canvasElement = container.querySelector('canvas');
    expect(canvasElement).toBeTruthy();
    dispatchDeleteKeydown(canvasElement!);

    expect(graph!.getNodeById(node!.id)).toBeFalsy();
    expect(graph!.serialize().nodes).toHaveLength(0);
  });
});
