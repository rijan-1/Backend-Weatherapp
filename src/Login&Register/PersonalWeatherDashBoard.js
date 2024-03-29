import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonalWeatherDashBoard.css'
import { useContext } from 'react';
import { MyContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './Login';
const PersonalWeatherDashBoard = () => {

  const navigate= useNavigate()
  const [weather, setWeather] = useState({});
  const [AirQuality, setAirQuality] = useState({})
  const {isLoggedIn, setIsLoggedIn ,password, setPassword,username, setUsername} = useContext(MyContext)

  
  const handleLogout = () => {
    // Clear login state and user information from local storage
   

    setIsLoggedIn(false); // Set login status to false
    setUsername('')
    setPassword('')
   // Clear the user's bio on logout
  };
  const CurrentLocationAirQuality = async (lat, lon) => {
    try {

      const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1843b3aeb0cb1f1701aadcce7c86d38e&units`).then(res=>res.data);
      
      const {
        
        list:[
  
        {
          main:{aqi},
          components:{co,no,no2, o3,so2,pm2_5,pm10,nh3}
  }
        ]
      } = response
      
      
      setAirQuality({aqi,co,no,no2, o3,so2,pm2_5,pm10,nh3})
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
      const {main:{temp, temp_max, feels_like, pressure,humidity,temp_min}, name, } = weatherData
      setWeather({temp, name,temp_max, feels_like, pressure,humidity,temp_min});
  
  
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
  
      
  
    }  }, []); 
 return (
  isLoggedIn === false?  (
    <div>
    <LoginForm/>
    </div>
    ):
  
 
    <div className='PersonalWeatherDashBoardbackground'>

      <button className='LogOutButton' onClick={handleLogout}>Log Out</button>
      <div className='Personaldashboardtitle'><h1>Current Location</h1></div>
      
            
                <div className='ProfileCurrentWeatherContents'  style={{color: 'white'}}>
                  <div className='ProfileCurrentWeatherContentsBox'>
                  <div className='DashBoardWeatherTemp'>
                    <h2 style={{position:'relative', left: '25%', top: '5%'}}>Temperature</h2>
                
                    <h1 style={{fontSize:'110px',position:'relative', left: '15%'}}>{Math.round(weather.temp) } C</h1>
             
             </div>
             <div className='DashBoardWeatherName'>
             <h1>{weather.name}</h1>
             </div>
            </div>
            <div className='ProfileCurrentWeatherContentsBox'>
              <div className='PersonalDashBoardDescriptions' style={{color: 'white'}}>
                <div className='DashboardDisplayBoxes'>
                
                  <h3 className='DashboardDescriptionDescription'>Feels like</h3>
                <h2>{Math.round(weather.feels_like)}C</h2>
             </div>
             <div className='DashboardDisplayBoxes'>
             <h3 className='DashboardDescriptionDescription'>Max Temp</h3>
                  <h2>{Math.round(weather.temp_max)}C</h2>
                </div>
               
                <div className='DashboardDisplayBoxes'>
                <h3 className='DashboardDescriptionDescription'>Humidity</h3>
                <h2>{weather.humidity} (RH)</h2>
                </div>
                <div className='DashboardDisplayBoxes'>
                <h3 className='DashboardDescriptionDescription'>Pressure</h3>
              <h2>{weather.pressure}(atm)</h2>
             </div>
             </div>
                </div>
                <div   className='ProfileCurrentWeatherContentsBox'>
                <div  className='AQIDashboard'>
                  <h1 style={{fontSize:'65px'}}>{AirQuality.aqi} AQI</h1>
                 
                </div>
                <div className='AQIDASHBOARDDESCRIPTION'>
                  <div className='AQIDASHBOARDDESCRIPTIONBoxes'>
                    <h1>{Math.round(AirQuality.co)} co</h1>

                  </div>
                  <div className='AQIDASHBOARDDESCRIPTIONBoxes'>
                    <h1>{Math.round(AirQuality.no)} no</h1>

                  </div>
                  <div className='AQIDASHBOARDDESCRIPTIONBoxes'>
                    <h1>{Math.round(AirQuality.no2)} no2</h1>

                  </div>
                  <div className='AQIDASHBOARDDESCRIPTIONBoxes'>
                    <h1>{Math.round(AirQuality.o3)} o3</h1>

                  </div>
                  <div className='AQIDASHBOARDDESCRIPTIONBoxes'>
                    <h1>{Math.round(AirQuality.so2)} so2</h1>

                  </div>
                  <div className='AQIDASHBOARDDESCRIPTIONBoxes'>
                    <h1>{Math.round(AirQuality.pm10)} pm10</h1>

                  </div>

                </div>


              </div>

              </div>
    
   
      
    </div>
  )
}

export default PersonalWeatherDashBoard
