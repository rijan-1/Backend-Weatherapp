import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonalWeatherDashBoard.css'

const PersonalWeatherDashBoard = () => {
  const [weather, setWeather] = useState({});
  const [AirQuality, setAirQuality] = useState({})

  

  const CurrentLocationAirQuality = async (lat, lon) => {
    try {
      console.log({lat,lon})
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1843b3aeb0cb1f1701aadcce7c86d38e&units`).then(res=>res.data);
      
      const {
        
        list:[
  
        {
          main:{aqi},
          components:{co,no,no2, o3,so2,pm2_5,pm10,nh3}
  }
        ]
      } = response
      
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
  
      
  
    }
  }, []); 
  
  
  
  return (
    <div className='PersonalWeatherDashBoardbackground'>
      
              <div className='ProfileCurrentWeatherContents' style={{color:'white'}}>
             <h1 style={{fontSize:'45px'}}>{Math.round(AirQuality.aqi) }helloC</h1>
              <h2>{weather.name}</h2>
              

                </div>
                <div className='ProfileCurrentWeatherContents'  style={{color: 'white'}}>
                  <div className='DashBoardWeatherTemp'>
                    <h2 style={{position:'relative', left: '25%', top: '5%'}}>Temperature</h2>
                
                    <h1 style={{fontSize:'110px',position:'relative', left: '15%'}}>{Math.round(weather.temp) } C</h1>
               
             </div>
            
              <div className='PersonalDashBoardDescriptions' style={{color: 'white'}}>
                <h2>{weather.feels_like}</h2>
             
                <h2>{weather.pressure}</h2>
                <h2>{weather.humidity}</h2>
                
                <h2>{weather.temp_max}</h2>
             
                </div>


              

              </div>
    
   
      
    </div>
  )
}

export default PersonalWeatherDashBoard
