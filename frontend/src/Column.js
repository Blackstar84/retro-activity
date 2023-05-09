import React, { useState } from "react";
import { SketchPicker } from "react-color";

const Column = () => {
  const [color, setColor] = useState("#ffffff");
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setItems([...items, { value: inputValue, color }]);
      setInputValue("");
    }
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ backgroundColor: item.color }}>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
