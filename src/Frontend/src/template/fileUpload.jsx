import React, { useState } from 'react';
import './FileUpload.css';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div id="file">
      <input type="file" id="file-input" onChange={handleFileChange} />
      <label htmlFor="file-input">Choose File</label>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
}

export default FileUpload;