import React, { useState } from 'react';
import Menu from './template/menu.jsx';
import FileUpload from './template/fileUpload.jsx';
import GraphToCode from './template/GraphToCode.jsx';

<<<<<<< HEAD
function App() {
  const [activeComponent, setActiveComponent] = useState('FileUpload');

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <Menu onButtonClick={handleButtonClick} />
      {activeComponent === 'FileUpload' && <FileUpload />}
      {activeComponent === 'GraphToCode' && <GraphToCode />}
    </div>
=======
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
>>>>>>> origin
  );

}

export default App;