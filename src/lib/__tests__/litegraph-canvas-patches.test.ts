import { describe, expect, it, vi } from 'vitest';
import { patchLGraphCanvas } from '../litegraph-canvas-patches';

describe('patchLGraphCanvas', () => {
  it('unbinds keydown and keyup with capture before the original unbind', () => {
    const keyCallback = vi.fn();
    const canvas = {
      removeEventListener: vi.fn(),
      ownerDocument: document,
    };
    const originalUnbind = vi.fn(function (this: { _key_callback: unknown }) {
      this._key_callback = null;
    });
    const documentRemove = vi.spyOn(document, 'removeEventListener');

    function FakeCanvas(this: Record<string, unknown>) {
      this.canvas = canvas;
      this._key_callback = keyCallback;
      this._events_binded = true;
      this.graph = null;
    }
    FakeCanvas.prototype.unbindEvents = originalUnbind;
    FakeCanvas.prototype.getCanvasWindow = () => window;

    patchLGraphCanvas(FakeCanvas);
    const instance = new (FakeCanvas as unknown as { new (): { unbindEvents: () => void } })();
    instance.unbindEvents();

    expect(canvas.removeEventListener).toHaveBeenCalledWith(
      'keydown',
      keyCallback,
      true
    );
    expect(documentRemove).toHaveBeenCalledWith('keyup', keyCallback, true);
    expect(originalUnbind).toHaveBeenCalledTimes(1);

    documentRemove.mockRestore();
  });

  it('is idempotent', () => {
    function FakeCanvas() {}
    FakeCanvas.prototype.unbindEvents = vi.fn();

    patchLGraphCanvas(FakeCanvas);
    const first = FakeCanvas.prototype.unbindEvents;
    patchLGraphCanvas(FakeCanvas);
    expect(FakeCanvas.prototype.unbindEvents).toBe(first);
  });

  it('closes an open search box before showing a context menu', () => {
    const search = document.createElement('div') as HTMLDivElement & { close: ReturnType<typeof vi.fn> };
    search.className = 'litegraph litesearchbox graphdialog';
    search.close = vi.fn(function (this: HTMLElement) {
      this.remove();
    });
    document.body.appendChild(search);

    const originalMenu = vi.fn();
    function FakeCanvas() {}
    FakeCanvas.prototype.processContextMenu = originalMenu;
    FakeCanvas.prototype.getCanvasWindow = () => window;

    patchLGraphCanvas(FakeCanvas);
    const instance = new (FakeCanvas as unknown as {
      new (): { processContextMenu: (node: unknown, event: Event) => void };
    })();
    instance.processContextMenu(null, new Event('contextmenu'));

    expect(search.close).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.litesearchbox')).toBeNull();
    expect(originalMenu).toHaveBeenCalledTimes(1);

    search.remove();
  });
});
