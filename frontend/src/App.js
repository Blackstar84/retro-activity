import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
//import axios from 'axios';
//import Post from './components/Post';
import Column  from './components/Column';




const App = () => (
  
    <div className='container'>
      <div className="row align-items-start">
        <Column cat='wentWell' />
        <Column cat='toImprove' />
        <Column cat='kudos' />
      </div>
     {/*  <div className="row align-items-start">
        <Post categoria='wentWell' update={true} />
        <Post categoria='toImprove' update={true} />
        <Post categoria='kudos' update={true} />
      </div> */}
    </div>
);

export default App;




/* function App() {
  const [firstName, setFirstName] = useState('');
  const [companyRole, setCompanyRole] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/insert', {
      firstName,
      companyRole
    }).then(() => alert('Data sent to server!')).catch((error) => console.log(error));
  };
  return (
    <div>
      <h1>React MongoDB Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Company Role" onChange={(e) => setCompanyRole(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
} */






/* 

const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );


try {
  setIsLoading(true);
  
  const response = await fetch('http://localhost:5000/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    })
  });

  const responseData = await response.json(); */