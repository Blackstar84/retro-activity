import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import Post from './Post';
import axios from 'axios';


const Column = (props) => {
    const [title, setTitle] = useState('');
    const [titleValue, setInputValue] = useState('');
    const category = props.cat;
    const [color, setColor] = useState('#ffffff');
   
    let [update, setUpdate] = useState(false);
    let [posts, setPosts] = useState([]);

    const [postData, setPostData] = useState([]);

    
    let categoria = props.cat;
  
    const handleInputChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleColorChange = (color) => {
      setColor(color.hex);
    };
    
    
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
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
  useEffect(() => {
    const getTodos = (categoria) => {
      axios.get(`http://localhost:5000/posts?category=${categoria}`)
        .then(res => {             
              setPosts(res.data);            
                                
        }) 
        .catch(err => {
          console.log(err);
        })
    }
    getTodos(categoria);
    setUpdate(false);
  },[update]);
    
  
    /* const handleEdit = (key,index, e) => {
      e.preventDefault();
      console.log(key);
      let newValue = [];
      newValue[key] = e.target.value;
      setTitle(newValue);



    }; */

    /*
    const handleEdit = (index, newValue) => {
      const newItems = [...items];
      newItems[index].value = newValue;
      setItems(newItems);
    };

    */

    
     
    const handleEdit = (index, e) => {

      const newItems = [...posts];
      newItems[index].value = e.target.value;
      setPosts(newItems);
      /* console.log(index);
      const updatedPosts = [...posts];
      updatedPosts[index][e.target.id] = e.target.value;
      setUpdate(true);
      setPosts(updatedPosts); */
      
      
      
    };

    const updatePost = (index) => {
      // Perform a PUT request to update the post on the server
      console.log('hola');
      console.log(posts[index].id, '-', posts[index])
      axios.patch(`http://localhost:5000//updatePost/\${posts[index].id}`, posts[index])
        .then((response) => {
          console.log("Post updated:", response.data);
        });
    };

    


    const deletePost = (id) =>{
        axios.delete(`http://localhost:5000/${id}`)
        .then(() => alert('Datos Borrados!')).catch((error) => console.log(error));
        setUpdate(true);
    }
    
    
    return (
        <React.Fragment>
      <div className='col'>
        <input 
          type="text"
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <SketchPicker color={color} onChange={handleColorChange} />
        
        
       {  
       
        posts.length > 0 && posts.map((item, index) => (
          
          <div key={index} style={{ backgroundColor: item.color }}>
            
            <input id={item._id}
              type="text"
              value={item.title}
              name= 'title'
              
              onChange={(e) => handleEdit(index, e)}
            />
            <button onClick={(e) => deletePost(item._id)}>Delete</button>
            <input type='hidden' value={item._id} />
            
          </div>
          
        ))} 
        
        
      </div>
      </React.Fragment>
    );
  };

  

  export default Column;