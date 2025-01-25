import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import './App.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1', customData: 'Custom 1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Node 2', customData: 'Custom 2' } }
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const readData = () => {
    console.log('Button clicked!');
    nodes.forEach(node => {
      console.log(`Node ID: ${node.id}, Label: ${node.data.label}, Custom Data: ${node.data.customData}`);
    });
  };

  return (
    <div>
      <div style={{ width: '80vw', height: '80vh' }}> 
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        
      </div>
      <button type="button" onClick={readData} className="button-save">Save</button>
      
    </div>
  );
}
