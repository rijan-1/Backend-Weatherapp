import React, { useState, useEffect , useContext} from 'react';
import  axios from 'axios';
import { GeoCodingApi,CurrentWeather,CurrentAirQualityAPI } from '../WeatherService';
import { MyContext } from '../App';
import './Register.css'

export const LoginForm = () => {

  const [weather, setWeather] = useState({});
  const [AirQuality, setAirQuality] = useState({})
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);
// Track login status

const CurrentLocationAirQuality = async (lat, lon) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1843b3aeb0cb1f1701aadcce7c86d38e&units`).then(res=>res.data);
    
    const {main:{aqi} } = response
    
    setAirQuality({aqi})
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const successQuality = async (position) => {
  const { latitude, longitude } = position.coords;


    const AirQualityData = await CurrentLocationAirQuality(latitude, longitude);

    console.log(AirQualityData);


};



useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successQuality, error);

    

  }
}, []); 





const CurrentLocationCurrentWeather = async (lat, lon) => {

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1843b3aeb0cb1f1701aadcce7c86d38e&units=metric`);

    return response.data;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const success = async (position) => {

  const { latitude, longitude } = position.coords;

  try {
    const weatherData = await CurrentLocationCurrentWeather(latitude, longitude);
    const {main:{temp, temp_max, feels_like, pressure}, name, } = weatherData
    setWeather({temp, name,temp_max, feels_like, pressure});


  } catch (error) {
    console.log(error);
  }
};

const error = (err) => {
  console.error(`Error getting location: ${err.message}`);
};

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);

    

  }
}, []); 



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


        {isLoggedIn== false ? (<div>
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
            <div className='ProfileCurrentWeatherDashboard'>
              <div className='ProfileCurrentWeatherContents'>
             <h1 style={{fontSize:'45px'}}>{Math.round(AirQuality.aqi) }C</h1>
              <h2>{weather.name}</h2>
              

                </div>
                <div className='ProfileCurrentWeatherContents'>
             <h1 style={{fontSize:'45px'}}>{Math.round(weather.temp) }C</h1>
              <h2>{weather.name}</h2>
              <div className='ProfileCurrentWeatherDescriptions'>
                <h2>{weather.temp_min}</h2>
                <h2>{weather.temp_max}</h2>
                <h2>{weather.pressure}</h2>
            
                </div>


                </div>

              </div>

             
              <div>
                <h2>Current AQI </h2>
                </div>

            




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

