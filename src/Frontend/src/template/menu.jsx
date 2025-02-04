import React from 'react';
import './menu.css';

const Menu = ({ onButtonClick }) => {
  return (
    <div className="button-container">
      <button onClick={() => onButtonClick('FileUpload')}>Code to Graph</button>
      <button onClick={() => onButtonClick('GraphToCode')}>Graph to Code</button>
    </div>
  );
};

export default Menu;