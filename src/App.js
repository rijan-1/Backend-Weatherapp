import {Home} from './pages/Home'
import { NavBar } from './components/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {DailyWeatherFunction} from './pages/DailyWeather'
import { useState } from 'react';
import { createContext } from "react";
import { CurrentAirQuality } from './pages/CurrentAirQuality';
import {HealthAdvice} from './pages/HealthAdvice'
import {RegistrationForm} from './Login&Register/Register'
import {LoginForm} from './Login&Register/Login'
import { Pollen } from './HealthAdvicePages/Pollen';
import { ColdHives } from './HealthAdvicePages/ColdHives';
import { Asthma } from './HealthAdvicePages/Asthma';
import { EyeAllergy } from './HealthAdvicePages/EyeAllergy';
import { Flu } from './HealthAdvicePages/Flu';
import { Hypothermia } from './HealthAdvicePages/Hypothermia';
import { FrostBite } from './HealthAdvicePages/Frostbite';
import { HeatCramps } from './HealthAdvicePages/HeatCramp';
import PersonalWeatherDashBoard from './Login&Register/PersonalWeatherDashBoard';
import { useMediaQuery } from '@react-hook/media-query';
import  MobileNavBar  from './components/MobileNavBar';
export const MyContext = createContext()



const App = () => {
  const isMobile = useMediaQuery('(max-width: 1270px)');

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [GlobalCityName, setGlobalCityName] = useState('London')
  const [units, setUnits] = useState('metric')
  const [HealthTemp, setHealthTemp] = useState(0 )
  const [HealthAirQuality, setHealthAirQuality] = useState({})
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  return (
    <MyContext.Provider value={{GlobalCityName, setGlobalCityName, units, setUnits,
     isLoggedIn, setIsLoggedIn,HealthTemp, setHealthTemp,HealthAirQuality, setHealthAirQuality,password, setPassword,username, setUsername}}>
    <BrowserRouter >
    {isMobile ? <MobileNavBar /> : <NavBar />}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/pages/DailyWeather/DailyWeather' element={<DailyWeatherFunction/>}/>
      <Route
            path="/pages/CurrentAirQuality"
            element={<CurrentAirQuality />}
          />
      <Route path='/pages/HealthAdvice' element={<HealthAdvice/>}/>
      <Route path='/Register' element={<RegistrationForm/>}/>
      <Route path='/Login' element={<LoginForm/>}/>
      <Route path='/PersonalDashBoard' element={<PersonalWeatherDashBoard/>}/>
      <Route path='/Pollen' element={<Pollen/>}/>
      <Route path='/ColdHives' element={<ColdHives/>}/>
      <Route path='/Asthma' element={<Asthma/>}/>
      <Route path='/EyeAllergy' element={<EyeAllergy/>}/>
      <Route path='/Flu' element={<Flu/>}/>
      <Route path='/Hypothermia' element={<Hypothermia/>}/>
      <Route path='/FrostBite' element={<FrostBite/>}/>
      <Route path='/HeatCramps' element={<HeatCramps/>}/>


      </Routes>
      </BrowserRouter>

   </MyContext.Provider>
  

  );
};

export default App;
