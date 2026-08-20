import { closeLiteGraphOverlays, positionGraphOverlay } from './litegraph-overlays';

const PATCH_FLAG = '__litegraphReactCanvasPatches';

type CanvasPrototype = {
  [PATCH_FLAG]?: boolean;
  canvas?: HTMLCanvasElement | null;
  graph?: { detachCanvas: (canvas: unknown) => void } | null;
  _key_callback?: EventListener | null;
  _events_binded?: boolean;
  unbindEvents?: () => void;
  stopRendering?: () => void;
  setCanvas?: (canvas: HTMLCanvasElement | null, skipEvents?: boolean) => void;
  getCanvasWindow?: () => Window;
  processKey?: (event: KeyboardEvent) => boolean | undefined;
  destroy?: () => void;
  showSearchBox?: (event?: MouseEvent, options?: unknown) => unknown;
  processContextMenu?: (node: unknown, event: Event) => unknown;
  prompt?: (
    title: string,
    value: unknown,
    callback: ((value: string) => void) | undefined,
    event?: MouseEvent,
    multiline?: boolean
  ) => unknown;
};

type CanvasConstructor = {
  prototype: CanvasPrototype;
};

/**
 * LiteGraph binds keydown/keyup with capture:true, but unbindEvents removes
 * them without capture. In the browser those leftover listeners keep a
 * destroyed editor alive: Delete is swallowed (stopImmediatePropagation) and
 * keyup redraws the stale graph over the live one.
 */
export function patchLGraphCanvas(LGraphCanvas: CanvasConstructor | undefined): void {
  if (!LGraphCanvas?.prototype || LGraphCanvas.prototype[PATCH_FLAG]) {
    return;
  }

  const proto = LGraphCanvas.prototype;
  const originalUnbindEvents = proto.unbindEvents;
  const originalProcessKey = proto.processKey;
  const originalShowSearchBox = proto.showSearchBox;
  const originalProcessContextMenu = proto.processContextMenu;
  const originalPrompt = proto.prompt;

  proto.unbindEvents = function unbindEventsWithCapture(this: CanvasPrototype) {
    const keyCallback = this._key_callback;
    const canvas = this.canvas;
    if (canvas && keyCallback) {
      canvas.removeEventListener('keydown', keyCallback, true);
      const ownerDocument =
        this.getCanvasWindow?.().document ?? canvas.ownerDocument ?? document;
      ownerDocument.removeEventListener('keyup', keyCallback, true);
    }

    originalUnbindEvents?.call(this);
  };

  proto.processKey = function processKeyGuarded(
    this: CanvasPrototype,
    event: KeyboardEvent
  ) {
    if (!this.graph || !this.canvas) {
      return;
    }
    return originalProcessKey?.call(this, event);
  };

  proto.destroy = function destroy(this: CanvasPrototype) {
    this.stopRendering?.();
    this.unbindEvents?.();
    if (this.graph && typeof this.graph.detachCanvas === 'function') {
      this.graph.detachCanvas(this);
    }
    this.setCanvas?.(null, true);
  };

  proto.showSearchBox = function showSearchBoxExclusive(
    this: CanvasPrototype,
    event?: MouseEvent,
    options?: unknown
  ) {
    closeLiteGraphOverlays(this.getCanvasWindow?.().document ?? document);
    const dialog = originalShowSearchBox?.call(this, event, options);
    if (dialog instanceof HTMLElement) {
      positionGraphOverlay(dialog, event);
    }
    return dialog;
  };

  proto.processContextMenu = function processContextMenuExclusive(
    this: CanvasPrototype,
    node: unknown,
    event: Event
  ) {
    closeLiteGraphOverlays(this.getCanvasWindow?.().document ?? document);
    return originalProcessContextMenu?.call(this, node, event);
  };

  proto.prompt = function promptOverlay(
    this: CanvasPrototype & { constructor: { active_canvas?: unknown } },
    title: string,
    value: unknown,
    callback: ((value: string) => void) | undefined,
    event?: MouseEvent,
    multiline?: boolean
  ) {
    if (!this.constructor.active_canvas) {
      this.constructor.active_canvas = this;
    }
    const dialog = originalPrompt?.call(this, title, value, callback, event, multiline);
    if (dialog instanceof HTMLElement) {
      dialog.classList.add('litegraph');
      positionGraphOverlay(dialog, event);
    }
    return dialog;
  };

  proto[PATCH_FLAG] = true;
}
