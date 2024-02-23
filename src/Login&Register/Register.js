import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Input} from "@nextui-org/react";
export const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [successful, setSuccessful] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleRegister = async () => {
    // Check if username or password is empty
   

    var  lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (username==='' || password==='') {
      setError('Username and password cannot be empty');
      return;
    }
    if (confirmPassword!== password){
      setError('Your Passwords do not match')
      return;
    }
    if (password.length<8) {
      setError('Your Password need to be atleast 8 chatacters long');
      return;
    }
    if (!password.match(lowerCase)) {
      setError("Password should contains lowercase letters!");
      return;
   } else if (!password.match(upperCase)) {
    setError("Password should contain uppercase letters!");
    return;
   } else if (!password.match(numbers)) {
    setError("Password should contains numbers also!");
    return;
   } else if (password.length < 10) {
    setError("Password length should be more than 10.");
    return;
   } else {
    setError("Password is strong!");
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
    <div className='RegisterBakcground' >
      <div style={{height:'100%', width:'100%',backgroundColor:'rgba(0,0,0,0.2)'}}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className='RegisterButton' onClick={handleRegister}>Register</button>
        {error && <p className='ErrorMessage'>{error}</p>}
        {successful && <p className='SuccessMessage'>{successful}</p>}
      </div></div>
    </div>
  );
};
