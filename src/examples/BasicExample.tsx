import React, { useRef } from 'react';
import { LiteGraph } from '../lib/litegraph-wrapper';
import { GraphCanvas, useGraph } from '../index';

// Note: LiteGraph should be imported directly from 'litegraph.js'
// This is just for the example - in real usage, import it where needed

/**
 * Basic example demonstrating how to use GraphCanvas
 */
export const BasicExample: React.FC = () => {
  const graphRef = useRef<any>(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GraphCanvas
        width={1920}
        height={1080}
        grid={true}
        minimap={true}
        onReady={(_canvas, graph) => {
          console.log('Graph ready!', { graph });
          graphRef.current = graph;
        }}
        onChange={(graph) => {
          console.log('Graph changed:', graph.serialize());
        }}
        onNodeSelected={(node) => {
          console.log('Node selected:', node?.title);
        }}
      />
    </div>
  );
};

/**
 * Example with programmatic node creation
 */
export const ProgrammaticExample: React.FC = () => {
  const graphRef = useRef<any>(null);

  const handleAddNode = () => {
    if (graphRef.current) {
      const node = LiteGraph.createNode('basic/const');
      if (node) {
        node.pos = [100, 100];
        node.setValue(42);
        graphRef.current.add(node);
      }
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', background: '#2d2d2d', color: 'white' }}>
        <button onClick={handleAddNode}>Add Constant Node</button>
      </div>
      <div style={{ flex: 1 }}>
        <GraphCanvas
          width={1920}
          height={1080}
          onReady={(_canvas, graph) => {
            graphRef.current = graph;
          }}
        />
      </div>
    </div>
  );
};

/**
 * Example using the useGraph hook
 */
export const HookExample: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GraphCanvas width={1920} height={1080}>
        <GraphControls />
      </GraphCanvas>
    </div>
  );
};

const GraphControls: React.FC = () => {
  const { addNode, removeNode, selectedNode, start, stop, serialize, load, clear } = useGraph();

  const handleAddConst = () => {
    addNode('basic/const', [Math.random() * 500, Math.random() * 500]);
  };

  const handleAddWatch = () => {
    addNode('basic/watch', [Math.random() * 500, Math.random() * 500]);
  };

  const handleRemoveSelected = () => {
    if (selectedNode) {
      removeNode(selectedNode);
    }
  };

  const handleSave = () => {
    const data = serialize();
    if (data) {
      console.log('Graph data:', JSON.stringify(data, null, 2));
      localStorage.setItem('lightgraph-save', JSON.stringify(data));
      alert('Graph saved to localStorage!');
    }
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('lightgraph-save');
    if (saved) {
      const data = JSON.parse(saved);
      load(data);
      alert('Graph loaded from localStorage!');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <button onClick={handleAddConst}>Add Const</button>
      <button onClick={handleAddWatch}>Add Watch</button>
      <button onClick={handleRemoveSelected} disabled={!selectedNode}>
        Remove Selected
      </button>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
};
