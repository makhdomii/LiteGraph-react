import { LiteGraph } from 'litegraph-react';

let registered = false;

/**
 * Registers demo custom node types once (safe across StrictMode remounts).
 * Uses LiteGraph's classic constructor pattern (registerNodeType copies LGraphNode methods).
 */
export function ensureDemoNodesRegistered(): void {
  if (registered) return;
  registered = true;

  function DoubleNumber(this: Record<string, unknown>) {
    const self = this as {
      addInput: (name: string, type: string) => void;
      addOutput: (name: string, type: string) => void;
      addWidget: (
        type: string,
        name: string,
        value: number,
        callback: (v: number) => void
      ) => void;
      properties: { bias: number };
      size: [number, number];
    };
    self.addInput('in', 'number');
    self.addOutput('out', 'number');
    self.properties = { bias: 0 };
    self.addWidget('number', 'bias', 0, (v: number) => {
      self.properties.bias = v;
    });
    self.size = [160, 60];
  }
  (DoubleNumber as { title?: string; desc?: string }).title = 'Double';
  (DoubleNumber as { title?: string; desc?: string }).desc =
    'Demo node: doubles an input number';
  DoubleNumber.prototype.onExecute = function (this: {
    getInputData: (slot: number) => unknown;
    setOutputData: (slot: number, data: unknown) => void;
    properties: { bias: number };
  }) {
    const v = this.getInputData(0);
    const bias = Number(this.properties.bias) || 0;
    this.setOutputData(0, typeof v === 'number' ? v * 2 + bias : null);
  };

  function HelloString(this: Record<string, unknown>) {
    const self = this as {
      addOutput: (name: string, type: string) => void;
      addWidget: (
        type: string,
        name: string,
        value: string,
        callback: (v: string) => void
      ) => void;
      properties: { name: string };
      size: [number, number];
    };
    self.addOutput('text', 'string');
    self.properties = { name: 'LiteGraph' };
    self.addWidget('text', 'name', 'LiteGraph', (v: string) => {
      self.properties.name = v;
    });
    self.size = [180, 50];
  }
  (HelloString as { title?: string; desc?: string }).title = 'Hello';
  (HelloString as { title?: string; desc?: string }).desc =
    'Demo node: greets with a string';
  HelloString.prototype.onExecute = function (this: {
    setOutputData: (slot: number, data: unknown) => void;
    properties: { name: string };
  }) {
    this.setOutputData(0, `Hello, ${this.properties.name}!`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LiteGraph.registerNodeType('demo/double', DoubleNumber as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LiteGraph.registerNodeType('demo/hello', HelloString as any);
}
