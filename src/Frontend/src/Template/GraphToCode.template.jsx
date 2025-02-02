import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  ControlButton
} from '@xyflow/react';


import '@xyflow/react/dist/style.css';

// Default button configuration
const defaultButtonConfig = [
  { label: 'DC', type: 'data_collection', fullLabel: 'Data Collection' },
  { label: 'DP', type: 'data_preprocessing', fullLabel: 'Data Preprocessing' },
  { label: 'FE', type: 'feature_engineering', fullLabel: 'Feature Engineering' },
  { label: 'MS', type: 'model_selection', fullLabel: 'Model Selection' },
  { label: 'MT', type: 'model_training', fullLabel: 'Model Training' },
  { label: 'ME', type: 'model_evaluation', fullLabel: 'Model Evaluation' },
  { label: 'HP', type: 'hyperparameter', fullLabel: 'Hyperparameter Tuning' },
  { label: 'MD', type: 'model_deployment', fullLabel: 'Model Deployment' },
];

// Default node types
const defaultNodeTypes = {
  data_collection: ({ data }) => (
    <div style={{ padding: 10, background: '#ffcc00', borderRadius: 5 }}>
      {data.label}
      <Handle type="source" position="bottom" />
    </div>
  ),
  data_preprocessing: ({ data }) => (
    <div style={{ padding: 10, background: '#00ccff', borderRadius: 5 }}>
      {data.label}
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  ),
  feature_engineering: ({ data }) => (
    <div style={{ padding: 10, background: '#cc00ff', borderRadius: 5 }}>
      {data.label}
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  ),
  model_selection: ({ data }) => (
    <div style={{ padding: 10, background: '#ff00cc', borderRadius: 5 }}>
      {data.label}
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  ),
  model_training: ({ data }) => (
    <div style={{ padding: 10, background: '#00ffcc', borderRadius: 5 }}>
      {data.label}
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  ),
  model_evaluation: ({ data }) => (
    <div style={{ padding: 10, background: '#ff6600', borderRadius: 5 }}>
      {data.label}
      <Handle type="target" position="top" />
    </div>
  ),
  hyperparameter: ({ data }) => (
    <div style={{ padding: 10, background: '#6600ff', borderRadius: 5 }}>
      {data.label}
      <Handle type="target" position="top" />
    </div>
  ),
  model_deployment: ({ data }) => (
    <div style={{ padding: 10, background: '#00cc99', borderRadius: 5 }}>
      {data.label}
      <Handle type="target" position="top" />
    </div>
  ),
};

// Base Template Component
const GraphToCodeTemplate = ({ buttonConfig = defaultButtonConfig, nodeTypes = defaultNodeTypes, initialNodes = [], initialEdges = [] }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Function to add a new edge

  // Function to add a new node
  const addNode = (type, label) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      data: { label },
      position: { x: Math.random() * 500, y: Math.random() * 500 }, // Random position
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // Function to handle edge connections
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* Sidebar with buttons */}
      <div style={{display: 'flex', flexDirection: 'column', width: '100px', padding: '10px', background: 'transparent' , alignItems: 'center' }}>
        
        {buttonConfig.map((btn, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              marginBottom: '10px',
            }}
            onMouseEnter={() => setHoveredButton(index)} // Show popup on hover
            onMouseLeave={() => setHoveredButton(null)} // Hide popup on mouse leave
          >
            <button
              onClick={() => addNode(btn.type, btn.fullLabel)}
              style={{
                width: '60px',
                height: '60px',
                padding: '10px',
                background: '#c3e9e4',
                color: '#0086A3',
                border: '2px solid #0086A3',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'background 0.3s, border-color 0.3s',
                marginTop : '15px'

              }}
              onMouseOver={(e) => {
                e.target.style.background = '#0086A3';
                e.target.style.color = '#fff';
                e.target.style.borderColor = '#c3e9e4';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#c3e9e4';
                e.target.style.color = '#0086A3';
                e.target.style.borderColor = '#0086A3';
              }}
            >
              {btn.label}
            </button>
            {hoveredButton === index && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '110%', // Position to the right of the button
                  transform: 'translateY(-50%)',
                  background: '#333',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '20px',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                {btn.fullLabel}
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#333',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '12px',
                opacity: 0,
                transition: 'opacity 0.3s',
                pointerEvents: 'none',
              }}
              onMouseOver={(e) => (e.target.style.opacity = 1)}
              onMouseOut={(e) => (e.target.style.opacity = 0)}
            >
              {btn.fullLabel}
            </div>
          </div>
        ))}
      </div>

      {/* React Flow Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
                <Controls
                orientation='horizontal'
                style={{
            width: '10%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: '#0086A3',
            border: '1px solid #c3e9e4',
            borderRadius: '4px',
            boxShadow: '0 1px 10px #0086A3',
            color:'#000'
        }}
        />
          <MiniMap style={{ background: '#aaa' , borderRadius: '5px' , border: '1px solid #000000' }} zoomable pannable />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GraphToCodeTemplate;