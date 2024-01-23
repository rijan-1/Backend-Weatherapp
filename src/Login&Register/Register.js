import './Register.css'
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
export const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sccessful, setSuccessfull] = useState('')
const navigate = useNavigate()
  const handleRegister = async () => {
    // Send registration data to the FastAPI backend
    const response = await fetch('http://localhost:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      console.log('Registration successful:', user);
      setSuccessfull('Registeration Successful')
      return navigate('/Login')
    } else {
      console.error('Registration failed');
      setSuccessfull('')
    }
  };

  return (
    <div className='RegisterBakcground'>
      <div className='RegisterFormcss'>

      <h1>Registration</h1>
 
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {sccessful}
    </div></div>
  );
};

