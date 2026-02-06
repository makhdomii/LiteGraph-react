import React, { useState } from 'react';
import { GraphCanvas, useGraph, createNode } from 'litegraph-react';
import type { SerializedLGraph } from 'litegraph-react';

/**
 * Example app demonstrating LiteGraph React integration
 */
const App: React.FC = () => {
  const [activeExample, setActiveExample] = useState<'basic' | 'programmatic' | 'hooks'>('basic');

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with example selector */}
      <div
        style={{
          background: '#1e1e1e',
          color: '#fff',
          padding: '10px 20px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          borderBottom: '1px solid #333',
        }}
      >
        <h1 style={{ fontSize: '18px', marginRight: '20px' }}>LiteGraph React Examples</h1>
        <button
          onClick={() => setActiveExample('basic')}
          style={{
            padding: '8px 16px',
            background: activeExample === 'basic' ? '#007acc' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Basic
        </button>
        <button
          onClick={() => setActiveExample('programmatic')}
          style={{
            padding: '8px 16px',
            background: activeExample === 'programmatic' ? '#007acc' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Programmatic
        </button>
        <button
          onClick={() => setActiveExample('hooks')}
          style={{
            padding: '8px 16px',
            background: activeExample === 'hooks' ? '#007acc' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Hooks API
        </button>
      </div>

      {/* Example content */}
      <div style={{ flex: 1, position: 'relative' }}>
        {activeExample === 'basic' && <BasicExample />}
        {activeExample === 'programmatic' && <ProgrammaticExample />}
        {activeExample === 'hooks' && <HookExample />}
      </div>
    </div>
  );
};

/**
 * Basic example - minimal setup
 */
const BasicExample: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <GraphCanvas
        width={window.innerWidth}
        height={window.innerHeight - 60}
        grid={true}
        minimap={true}
        onReady={(canvas, graph) => {
          console.log('✅ Graph ready!', { canvas, graph });
        }}
        onChange={(graph) => {
          console.log('📝 Graph changed');
        }}
        onNodeSelected={(node) => {
          console.log('🎯 Node selected:', node?.title);
        }}
      />
    </div>
  );
};

/**
 * Programmatic example - adding nodes via refs
 */
const ProgrammaticExample: React.FC = () => {
  const graphRef = React.useRef<any>(null);
  const [nodeCount, setNodeCount] = React.useState(0);

  const handleAddConstNode = () => {
    if (graphRef.current) {
      const node = createNode('basic/const');
      if (node) {
        node.pos = [Math.random() * 800 + 100, Math.random() * 400 + 100];
        node.setValue(Math.floor(Math.random() * 100));
        graphRef.current.add(node);
        setNodeCount((prev) => prev + 1);
      }
    }
  };

  const handleAddWatchNode = () => {
    if (graphRef.current) {
      const node = createNode('basic/watch');
      if (node) {
        node.pos = [Math.random() * 800 + 100, Math.random() * 400 + 100];
        graphRef.current.add(node);
        setNodeCount((prev) => prev + 1);
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '10px',
          background: '#2d2d2d',
          color: 'white',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handleAddConstNode}
          style={{
            padding: '8px 16px',
            background: '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Constant Node
        </button>
        <button
          onClick={handleAddWatchNode}
          style={{
            padding: '8px 16px',
            background: '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Watch Node
        </button>
        <span style={{ marginLeft: '20px' }}>Nodes: {nodeCount}</span>
      </div>
      <div style={{ flex: 1 }}>
        <GraphCanvas
          width={window.innerWidth}
          height={window.innerHeight - 120}
          onReady={(_canvas, graph) => {
            console.log('✅ Graph ready for programmatic control');
            graphRef.current = graph;
          }}
        />
      </div>
    </div>
  );
};

/**
 * Hooks example - using useGraph hook
 */
const HookExample: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <GraphCanvas width={window.innerWidth} height={window.innerHeight - 60}>
        <GraphControls />
      </GraphCanvas>
    </div>
  );
};

const GraphControls: React.FC = () => {
  const {
    addNode,
    removeNode,
    selectedNode,
    start,
    stop,
    serialize,
    load,
    clear,
    isReady,
  } = useGraph();
  const [saveData, setSaveData] = React.useState<SerializedLGraph | null>(null);

  const handleAddConst = () => {
    addNode('basic/const', [Math.random() * 800 + 100, Math.random() * 400 + 100]);
  };

  const handleAddWatch = () => {
    addNode('basic/watch', [Math.random() * 800 + 100, Math.random() * 400 + 100]);
  };

  const handleRemoveSelected = () => {
    if (selectedNode) {
      removeNode(selectedNode);
    }
  };

  const handleSave = () => {
    const data = serialize();
    if (data) {
      setSaveData(data);
      console.log('💾 Graph saved:', JSON.stringify(data, null, 2));
      localStorage.setItem('lightgraph-save', JSON.stringify(data));
      alert('Graph saved to localStorage!');
    }
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('lightgraph-save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        load(data);
        setSaveData(data);
        alert('Graph loaded from localStorage!');
      } catch (e) {
        alert('Failed to load graph: ' + e);
      }
    } else {
      alert('No saved graph found');
    }
  };

  if (!isReady) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1000,
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          borderRadius: '5px',
        }}
      >
        Loading graph...
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.9)',
        padding: '15px',
        borderRadius: '8px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      }}
    >
      <button
        onClick={handleAddConst}
        style={{
          padding: '8px 16px',
          background: '#007acc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        ➕ Add Const
      </button>
      <button
        onClick={handleAddWatch}
        style={{
          padding: '8px 16px',
          background: '#007acc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        👁️ Add Watch
      </button>
      <button
        onClick={handleRemoveSelected}
        disabled={!selectedNode}
        style={{
          padding: '8px 16px',
          background: selectedNode ? '#d32f2f' : '#666',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: selectedNode ? 'pointer' : 'not-allowed',
          fontSize: '14px',
        }}
      >
        🗑️ Remove Selected
      </button>
      <div style={{ width: '100%', height: '1px', background: '#444', margin: '5px 0' }} />
      <button
        onClick={start}
        style={{
          padding: '8px 16px',
          background: '#2e7d32',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        ▶️ Start
      </button>
      <button
        onClick={stop}
        style={{
          padding: '8px 16px',
          background: '#d32f2f',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        ⏹️ Stop
      </button>
      <div style={{ width: '100%', height: '1px', background: '#444', margin: '5px 0' }} />
      <button
        onClick={handleSave}
        style={{
          padding: '8px 16px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        💾 Save
      </button>
      <button
        onClick={handleLoad}
        style={{
          padding: '8px 16px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        📂 Load
      </button>
      <button
        onClick={clear}
        style={{
          padding: '8px 16px',
          background: '#666',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        🧹 Clear
      </button>
      {selectedNode && (
        <div
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '10px',
            background: '#333',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          <strong>Selected:</strong> {selectedNode.title || selectedNode.type}
        </div>
      )}
    </div>
  );
};

export default App;
