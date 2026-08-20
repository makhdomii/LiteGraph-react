import { afterEach, describe, expect, it, vi } from 'vitest';
import { LGraph, LGraphCanvas, LiteGraph } from '../litegraph-wrapper';

function createCanvasElement(): HTMLCanvasElement {
  const element = document.createElement('canvas');
  element.width = 400;
  element.height = 300;
  document.body.appendChild(element);
  return element;
}

function addConstNode(graph: LGraph) {
  const node = LiteGraph.createNode('basic/const');
  if (!node) {
    throw new Error('basic/const node type is not registered');
  }
  graph.add(node);
  return node;
}

function dispatchDeleteKeydown(target: EventTarget): KeyboardEvent {
  const event = new KeyboardEvent('keydown', {
    key: 'Delete',
    code: 'Delete',
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, 'keyCode', { get: () => 46 });
  Object.defineProperty(event, 'which', { get: () => 46 });
  target.dispatchEvent(event);
  return event;
}

function destroyCanvas(canvas: LGraphCanvas, graph: LGraph): void {
  canvas.stopRendering();
  canvas.unbindEvents();
  graph.detachCanvas(canvas);
}

describe('LGraphCanvas keyboard delete', () => {
  const canvases: HTMLCanvasElement[] = [];

  afterEach(() => {
    for (const element of canvases) {
      element.remove();
    }
    canvases.length = 0;
  });

  it('deletes the selected node when Delete is pressed', () => {
    const element = createCanvasElement();
    canvases.push(element);

    const graph = new LGraph();
    const canvas = new LGraphCanvas(element, graph, { skip_render: true });
    const node = addConstNode(graph);
    canvas.selectNodes([node]);

    dispatchDeleteKeydown(element);

    expect(graph.getNodeById(node.id)).toBeFalsy();
    expect(graph.serialize().nodes).toHaveLength(0);

    destroyCanvas(canvas, graph);
  });

  it('lets the live canvas handle Delete after the previous canvas is unbound', () => {
    const element = createCanvasElement();
    canvases.push(element);

    const staleGraph = new LGraph();
    const staleCanvas = new LGraphCanvas(element, staleGraph, { skip_render: true });
    const staleNode = addConstNode(staleGraph);
    staleCanvas.selectNodes([staleNode]);

    destroyCanvas(staleCanvas, staleGraph);

    const liveGraph = new LGraph();
    const liveCanvas = new LGraphCanvas(element, liveGraph, { skip_render: true });
    const liveNode = addConstNode(liveGraph);
    liveCanvas.selectNodes([liveNode]);

    dispatchDeleteKeydown(element);

    expect(liveGraph.getNodeById(liveNode.id)).toBeFalsy();
    expect(liveGraph.serialize().nodes).toHaveLength(0);

    destroyCanvas(liveCanvas, liveGraph);
  });

  it('unbinds keyboard listeners with capture so a remounted canvas can receive Delete', () => {
    const element = createCanvasElement();
    canvases.push(element);

    const graph = new LGraph();
    const canvas = new LGraphCanvas(element, graph, { skip_render: true });

    const canvasRemove = vi.spyOn(element, 'removeEventListener');
    const documentRemove = vi.spyOn(document, 'removeEventListener');

    canvas.unbindEvents();

    const keydownUnbind = canvasRemove.mock.calls.find(
      (call) => call[0] === 'keydown'
    );
    const keyupUnbind = documentRemove.mock.calls.find(
      (call) => call[0] === 'keyup'
    );

    expect(keydownUnbind?.[2]).toBe(true);
    expect(keyupUnbind?.[2]).toBe(true);

    canvas.stopRendering();
    graph.detachCanvas(canvas);
  });
});
