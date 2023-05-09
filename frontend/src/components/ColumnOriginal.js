import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import Post from './Post';
import axios from 'axios';


const Column = (props) => {
    const [title, setTitle] = useState('');
    const category = props.cat;
    const [color, setColor] = useState('#ffffff');
    const [items, setItems] = useState([]);
    const [update, setUpdate] = useState(false);
  
    const handleInputChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleColorChange = (color) => {
      setColor(color.hex);
    };
    
    
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log(title, category, color);
        setItems([...items, { value: title, color }]);
        
        axios.post('http://localhost:5000/createPost', {
          title, category, color
      }).then(() => alert('Datos guardados!')).catch((error) => console.log(error));
      setTitle('');
      setUpdate(true);  
      }
    };
  
    /* const [wentWell, setWell] = useState([]);
    const [toImprove, setImprove] = useState([]);
    const [kudos, setKudos] = useState([]);
    const [update, setUpdate] = useState(false);
  let categoria = '';
  
    */
    
  
    const handleEdit = (index, newValue) => {
      const newItems = [...items];
      newItems[index].value = newValue;
      setItems(newItems);
    };
  
    return (
      <div className='col'>
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <SketchPicker color={color} onChange={handleColorChange} />
  
       {/*  { 
        wentWell.length > 0 && wentWell.map((item, index) => (
          <div key={index} style={{ backgroundColor: item.color }}>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleEdit(e.key,index, e.target.value)}
            />
          </div>
          
        ))} */}
      </div>
    );
  };

  export default Column;