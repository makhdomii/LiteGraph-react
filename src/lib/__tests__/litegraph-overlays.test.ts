import { afterEach, describe, expect, it, vi } from 'vitest';
import { closeLiteGraphOverlays, patchLiteGraphOverlays } from '../litegraph-overlays';
import { LiteGraph } from '../litegraph-wrapper';

function mountOverlay(className: string): HTMLDivElement & { close: ReturnType<typeof vi.fn> } {
  const element = document.createElement('div') as HTMLDivElement & {
    close: ReturnType<typeof vi.fn>;
  };
  element.className = className;
  element.close = vi.fn(function (this: HTMLElement) {
    this.remove();
  });
  document.body.appendChild(element);
  return element;
}

describe('closeLiteGraphOverlays', () => {
  afterEach(() => {
    document.querySelectorAll('.litecontextmenu, .litesearchbox, .graphdialog').forEach((el) => {
      el.remove();
    });
  });

  it('closes search boxes and context menus so only one overlay can remain', () => {
    const search = mountOverlay('litegraph litesearchbox graphdialog rounded');
    const menu = mountOverlay('litegraph litecontextmenu litemenubar-panel');

    closeLiteGraphOverlays(document);

    expect(search.close).toHaveBeenCalledTimes(1);
    expect(menu.close).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.litesearchbox')).toBeNull();
    expect(document.querySelector('.litecontextmenu')).toBeNull();
  });

  it('removes overlays that have no close() helper', () => {
    const orphan = document.createElement('div');
    orphan.className = 'litegraph litesearchbox graphdialog';
    document.body.appendChild(orphan);

    closeLiteGraphOverlays(document);

    expect(document.body.contains(orphan)).toBe(false);
  });
});

describe('LiteGraph overlay exclusivity', () => {
  afterEach(() => {
    document.querySelectorAll('.litecontextmenu, .litesearchbox, .graphdialog').forEach((el) => {
      el.remove();
    });
  });

  it('dismisses an open search box when context menus are closed', () => {
    const search = mountOverlay('litegraph litesearchbox graphdialog rounded');

    LiteGraph.closeAllContextMenus(window);

    expect(search.close).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.litesearchbox')).toBeNull();
  });

  it('patches closeAllContextMenus only once', () => {
    const first = LiteGraph.closeAllContextMenus;
    patchLiteGraphOverlays(LiteGraph);
    expect(LiteGraph.closeAllContextMenus).toBe(first);
  });
});
