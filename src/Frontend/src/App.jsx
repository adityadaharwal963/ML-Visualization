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
import Message from './components/prompt/message';
import Flowchart from './components/flowchart/flowchart'

export default function App() {

  return (
    <>
      <GraphToCodeTemplate />


      <div className="flex flex-col items-end justify-center w-screen min-h-screen bg-red-300 text-gray-800">

        {/* Prompt section */}
        <Message />


        {/* Flowchart section */}
        <Flowchart />

      </div>

    </>
  );

}
