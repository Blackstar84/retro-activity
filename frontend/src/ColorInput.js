

// src/ColorInput.js
import React from 'react';

const ColorInput = ({ columnNumber, color, setColor, text, setText }) => {
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(columnNumber, e.target.value)}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(columnNumber, e.target.value)}
      />
    </div>
  );
};

export default ColorInput;
