import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Post = (props) =>{
    
    const [posts, setPosts] = useState([]);
    let update;
    const categoria = props.categoria;
    update = props.update;

    
    useEffect(() => {
        const getTodos = (categoria) => {
          axios.get(`http://localhost:5000/posts?category=${categoria}`)
            .then(res => {
                  console.log(res);  
                  setPosts(res.data);                      
            }) 
            .catch(err => {
              console.log(err);
            })
        }
        getTodos(categoria);
        update = false;
      },[update]); 

      return(
        <div className='col'>
            { 
            posts.length > 0 && posts.map((item, index) => (
                <div key={index} style={{ backgroundColor: item.color }}>
                <input
                    type="text"
                    value={item.title}
                    /* onChange={(e) => handleEdit(e.key,index, e.target.value)} */
                />
                </div>
                
            ))} 
        </div>
      )




}


export default Post;