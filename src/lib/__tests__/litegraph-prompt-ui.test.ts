import { afterEach, describe, expect, it } from 'vitest';
import { LGraph, LGraphCanvas } from '../litegraph-wrapper';
import { positionGraphOverlay } from '../litegraph-overlays';

describe('positionGraphOverlay', () => {
  it('places the overlay below and to the right of the pointer', () => {
    const dialog = document.createElement('div');
    dialog.style.width = '200px';
    dialog.style.height = '80px';
    document.body.appendChild(dialog);

    positionGraphOverlay(dialog, { clientX: 100, clientY: 50 });

    expect(dialog.style.position).toBe('fixed');
    expect(parseFloat(dialog.style.left)).toBeGreaterThan(100);
    expect(parseFloat(dialog.style.top)).toBeGreaterThan(50);

    dialog.remove();
  });

  it('keeps the overlay inside the viewport', () => {
    const dialog = document.createElement('div');
    Object.defineProperty(dialog, 'offsetWidth', { value: 240 });
    Object.defineProperty(dialog, 'offsetHeight', { value: 90 });
    document.body.appendChild(dialog);

    positionGraphOverlay(dialog, {
      clientX: window.innerWidth - 10,
      clientY: window.innerHeight - 10,
    });

    expect(parseFloat(dialog.style.left) + 240).toBeLessThanOrEqual(window.innerWidth);
    expect(parseFloat(dialog.style.top) + 90).toBeLessThanOrEqual(window.innerHeight);

    dialog.remove();
  });
});

describe('LGraphCanvas prompt overlay', () => {
  const canvases: HTMLCanvasElement[] = [];

  afterEach(() => {
    for (const element of canvases) {
      element.remove();
    }
    canvases.length = 0;
    document.querySelectorAll('.graphdialog').forEach((el) => el.remove());
  });

  it('styles the value editor as a litegraph card below the pointer', () => {
    const element = document.createElement('canvas');
    element.width = 400;
    element.height = 300;
    document.body.appendChild(element);
    canvases.push(element);

    const graph = new LGraph();
    const canvas = new LGraphCanvas(element, graph, { skip_render: true });
    const dialog = canvas.prompt(
      'Value',
      'asd',
      () => undefined,
      { clientX: 140, clientY: 90 } as MouseEvent,
      false
    );

    expect(dialog).toBeTruthy();
    expect(dialog.className).toContain('litegraph');
    expect(dialog.className).toContain('graphdialog');
    expect(parseFloat(dialog.style.top)).toBeGreaterThan(90);

    canvas.stopRendering();
    canvas.unbindEvents();
    graph.detachCanvas(canvas);
  });
});
