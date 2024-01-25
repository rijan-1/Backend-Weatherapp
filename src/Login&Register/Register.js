import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Check if username or password is empty
    if (username==='' || password==='') {
      setError('Username and password cannot be empty');
      return;
    }

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
      setSuccessful('Registration Successful');
      setError('');
      navigate('/Login');
    } else {
      console.error('Registration failed');
      setSuccessful('');
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='RegisterBakcground'>
      <div className='RegisterFormcss'>
        <h1 className='RegisterHeading'>Registration</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='RegisterButton' onClick={handleRegister}>Register</button>
        {error && <p className='ErrorMessage'>{error}</p>}
        {successful && <p className='SuccessMessage'>{successful}</p>}
      </div>
    </div>
  );
};
