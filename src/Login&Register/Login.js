import React, { useState, useEffect , useContext} from 'react';

import { MyContext } from '../App';
import './Register.css'
import './Login'
export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
// Track login status
  const [bio, setBio] = useState(''); // User's bio
const {isLoggedIn, setIsLoggedIn} = useContext(MyContext)
  useEffect(() => {
    // Initialize login state and user information from local storage
    const initialIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const initialUsername = localStorage.getItem('username') || '';
    const initialBio = localStorage.getItem('bio') || '';

    setIsLoggedIn(initialIsLoggedIn);
    setUsername(initialUsername);
    setBio(initialBio);
  }, []);

  const handleLogin = async () => {
    try {
      // Send login data to the FastAPI backend
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('Login successful:', user);

        // Store login state and user information in local storage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', user.username);
        localStorage.setItem('bio', user.bio);

        setIsLoggedIn(true); // Set login status to true
        setBio(user.bio); // Set the user's bio
      } else {
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    // Clear login state and user information from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('bio');

    setIsLoggedIn(false); // Set login status to false
    setUsername('');
    setPassword('');
    setBio(''); // Clear the user's bio on logout
  };

  return (
    <div className='RegisterBakcground'>
      <div className='RegisterFormcss'>
        {isLoggedIn ? (
          <div>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
            <h2>Bio:</h2>
            <p>{bio}</p>
          </div>
        ) : (
          <div>
            <div className='LRegisterFormcss' >
            <div style={{height:'400px', width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:'20px', paddingTop:'15px'}}>
            <h1 className='RegisterHeading'>Login</h1>
            <input  style={{position:'relative', top:'15px'}}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            required />
            <input style={{position:'relative', top:'47px'}}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            required/>
            <button style={{position:'relative', top:'87px'}} className='RegisterButton' onClick={handleLogin}>Login</button>
          </div></div></div>
        )}
      </div>
    </div>
  );
};

