import React, { useState, useEffect , useContext} from 'react';
import {GeoCodingApi,CurrentAirQualityAPI ,CurrentWeather} from './WeatherSevice.js'

import { MyContext } from '../App';
import './Register.css'
import './Login'
export const LoginForm = () => {

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);
// Track login status


function handleLocationClick() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
}



function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  setLocation({ latitude, longitude });
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric`)
  .then(response => response.json())
  .then(data => {
    setWeather(data);
    console.log(data);
  })
  .catch(error => console.log(error));
}
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
  const handleChangePassword = async () => {
    try {
      // Send new password data to the FastAPI backend
      const response = await fetch('http://localhost:8000/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, newPassword }),
      });

      if (response.ok) {
        console.log('Password change successful');

        // Update the local storage and state with the new password
        localStorage.setItem('password', newPassword);
        setPassword(newPassword);
      } else {
        console.error('Password change failed:', response.status);
      }
    } catch (error) {
      console.error('Password change failed:', error);
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


        {isLoggedIn ? (<div>
          <div>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
            <h2>Bio:</h2>
            <p>{bio}</p>
            <h2>Change Password:</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button style={{position:'relative', left: '20%'}} onClick={handleChangePassword}>Change Password</button>
          </div>
          <div>




          </div>
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
          </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

