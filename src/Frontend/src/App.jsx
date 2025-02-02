import React from 'react';
import './App.css';
import Message from './components/prompt/message';
import Flowchart from './components/flowchart/flowchart'

export default function App() {

  return (
    <>
      <div className="flex flex-col items-end justify-center w-screen min-h-screen bg-red-300 text-gray-800">

        {/* Prompt section */}
        <Message />


        {/* Flowchart section */}
        <Flowchart />

      </div>

    </>
  );

}