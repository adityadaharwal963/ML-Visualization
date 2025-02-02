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

import GraphToCodeTemplate from './Template/GraphToCode.template.jsx';
import BaseTemplate from './Template/Base.template';


export default function App() {

  return (
    <>
    <GraphToCodeTemplate />
    </>
  );
  
}
