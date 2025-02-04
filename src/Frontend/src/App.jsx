import React, { useState } from 'react';
import Menu from './template/menu.jsx';
import FileUpload from './template/fileUpload.jsx';
import GraphToCode from './template/GraphToCode.jsx';

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
  );

}

export default App;