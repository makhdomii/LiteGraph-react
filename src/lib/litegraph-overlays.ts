const OVERLAY_SELECTOR = '.litecontextmenu, .litesearchbox, .graphdialog';
const OVERLAY_PATCH_FLAG = '__litegraphReactOverlayPatches';

type CloseableOverlay = Element & { close?: () => void };

type LiteGraphOverlaysHost = {
  closeAllContextMenus?: (refWindow?: Window) => void;
  [OVERLAY_PATCH_FLAG]?: boolean;
};

/**
 * LiteGraph can open a search box (double-click) and a context menu
 * (right-click) at the same time. Only one overlay should be visible.
 */
export function closeLiteGraphOverlays(root: ParentNode = document): void {
  const overlays = Array.from(root.querySelectorAll(OVERLAY_SELECTOR));
  for (const overlay of overlays) {
    const closeable = overlay as CloseableOverlay;
    if (typeof closeable.close === 'function') {
      closeable.close();
    } else {
      overlay.remove();
    }
  }
}

const POINTER_GAP = 12;
const VIEWPORT_PAD = 8;

/**
 * Place a LiteGraph overlay near the pointer without covering the control
 * that opened it, and keep it on screen.
 */
export function positionGraphOverlay(
  dialog: HTMLElement,
  pointer?: { clientX: number; clientY: number } | null
): void {
  dialog.style.position = 'fixed';

  const width = dialog.offsetWidth || 240;
  const height = dialog.offsetHeight || 80;
  const viewportWidth = window.innerWidth || 1024;
  const viewportHeight = window.innerHeight || 768;

  let left = pointer ? pointer.clientX + POINTER_GAP : VIEWPORT_PAD;
  let top = pointer ? pointer.clientY + POINTER_GAP : VIEWPORT_PAD;

  left = Math.min(left, viewportWidth - width - VIEWPORT_PAD);
  top = Math.min(top, viewportHeight - height - VIEWPORT_PAD);
  left = Math.max(VIEWPORT_PAD, left);
  top = Math.max(VIEWPORT_PAD, top);

  dialog.style.left = `${left}px`;
  dialog.style.top = `${top}px`;
}

export function patchLiteGraphOverlays(
  LiteGraph: LiteGraphOverlaysHost | undefined
): void {
  if (!LiteGraph || LiteGraph[OVERLAY_PATCH_FLAG]) {
    return;
  }

  const originalCloseAll = LiteGraph.closeAllContextMenus?.bind(LiteGraph);

  LiteGraph.closeAllContextMenus = function closeAllContextMenusAndDialogs(
    refWindow?: Window
  ) {
    originalCloseAll?.(refWindow);
    closeLiteGraphOverlays(refWindow?.document ?? document);
  };

  LiteGraph[OVERLAY_PATCH_FLAG] = true;
}
