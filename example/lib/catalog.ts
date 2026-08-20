export type ExampleEntry = {
  path: string;
  label: string;
  hint: string;
};

export type ExampleSection = {
  title: string;
  items: ExampleEntry[];
};

export const EXAMPLE_SECTIONS: ExampleSection[] = [
  {
    title: 'Getting started',
    items: [
      {
        path: '/basic',
        label: 'Basic',
        hint: 'Mounted GraphCanvas with a seeded Const → Watch graph. Right-click to add more nodes.',
      },
      {
        path: '/programmatic',
        label: 'Programmatic',
        hint: 'Add nodes through createNode + the graph ref.',
      },
      {
        path: '/hooks',
        label: 'Hooks',
        hint: 'Drive the graph with useGraph: add, run, save, load, clear.',
      },
    ],
  },
  {
    title: 'React APIs',
    items: [
      {
        path: '/theme',
        label: 'Theme',
        hint: 'Custom GraphTheme colors on GraphCanvas.',
      },
      {
        path: '/live-mode',
        label: 'Live mode',
        hint: 'liveMode prop with start/stop execution.',
      },
      {
        path: '/options',
        label: 'Canvas options',
        hint: 'Restricted editor via options (no context menu / limited zoom).',
      },
      {
        path: '/external-graph',
        label: 'External graph',
        hint: 'Own an LGraph instance and pass it as the graph prop.',
      },
      {
        path: '/data-prop',
        label: 'Data prop',
        hint: 'Load initial SerializedLGraph via the data prop.',
      },
      {
        path: '/viewport',
        label: 'Viewport',
        hint: 'useGraph zoom, center, and fit helpers.',
      },
      {
        path: '/connect',
        label: 'Connect',
        hint: 'Programmatic connect and disconnect via useGraph.',
      },
      {
        path: '/callbacks',
        label: 'Callbacks',
        hint: 'onReady, onChange, onNodeSelected, onNodeAdded event wiring.',
      },
    ],
  },
  {
    title: 'Advanced',
    items: [
      {
        path: '/custom-nodes',
        label: 'Custom nodes',
        hint: 'LiteGraph.registerNodeType with widgets and onExecute.',
      },
      {
        path: '/subgraphs',
        label: 'Subgraphs',
        hint: 'graph/subgraph with nested graph/input and graph/output.',
      },
      {
        path: '/groups',
        label: 'Groups',
        hint: 'Visual LGraphGroup around nodes.',
      },
    ],
  },
  {
    title: 'Node library',
    items: [
      {
        path: '/nodes/basic',
        label: 'Basic nodes',
        hint: 'const, watch, string, boolean, console.',
      },
      {
        path: '/nodes/math',
        label: 'Math nodes',
        hint: 'operation, compare, formula, clamp.',
      },
      {
        path: '/nodes/events',
        label: 'Events nodes',
        hint: 'trigger, delay, timer, sequence, branch.',
      },
      {
        path: '/nodes/widgets',
        label: 'Widget nodes',
        hint: 'button, toggle, number, combo, knob.',
      },
      {
        path: '/nodes/logic',
        label: 'Logic nodes',
        hint: 'AND, OR, NOT, selector, IF.',
      },
      {
        path: '/nodes/string-input',
        label: 'String & input',
        hint: 'String helpers and input/gamepad sample.',
      },
      {
        path: '/nodes/math3d',
        label: 'Math3D nodes',
        hint: 'vec2 / vec3 converters.',
      },
    ],
  },
];

export function findExample(pathname: string): ExampleEntry | undefined {
  for (const section of EXAMPLE_SECTIONS) {
    const hit = section.items.find((item) => item.path === pathname);
    if (hit) return hit;
  }
  return undefined;
}
