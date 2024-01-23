import './Home.css' 

import coldweather from "../assets/cold.webp"; 

import hotweather from "../assets/hot.webp"; 

import normal from "../assets/normal.webp"; 

import veryhot from '../assets/veryhot.webp' 

import { Descriptions } from '../components/descriptions'; 

import {CurrentWeather} from  '../WeatherService' 

import { useEffect ,useState} from 'react'; 



import { useContext } from 'react'; 

import { ExtractIcon } from '../WeatherService'; 
import { MyContext } from '../App';
export const Home = () => { 



   

    

    const [WeatherNow, setWeatherNow] = useState([]) 

   const [icon, setIcon] = useState(null) 

    const [error, setError] = useState('Data does not exist') 

const [Bg, setBg] = useState({coldweather}) 

const {setGlobalCityName, GlobalCityName, units, setUnits,setHealthTemp,HealthTemp} = useContext(MyContext) 

    

     

useEffect(() => { 

    const CurrentWeatherData = async () => { 

      try{ 

      const data = await CurrentWeather(GlobalCityName, units); 

      setWeatherNow(data); 
     
     
  
   
     
 

      

   

      const subZero = units ==='metric' ? 0: 32; 

   

      const lowerthreshold = units === 'metric' ? 10 : 50; 

      const higherthreshhold = units === 'metric'? 25 : 75 

   

      if (data.temp < subZero) { 

        setBg(coldweather); 

      } else if (subZero< data.temp & data.temp < lowerthreshold){ 

        setBg(normal); 

       

    } else if (lowerthreshold<data.temp & data.temp < higherthreshhold) { 

        setBg(hotweather); 

       

    }else if (data.temp > higherthreshhold){ 

      setBg(veryhot) 

    } 
    setHealthTemp(data.temp)

   
 
  }catch(error){ 

      setError(error.message) 

       

    }} 

  
   

    CurrentWeatherData(); 

  }, [units, GlobalCityName]); 
 

  return ( 

    <div className='HomeBg' style={{backgroundImage: `url(${Bg})`, backgroundSize:'cover',height:'1000px'}}> 

    <div className='Overlay'> 

      <div className='contanier'> 

     

        <div className='section section_temperature'> 

          <div className='icon'> 

            <h1>{WeatherNow.name}, {WeatherNow.country}</h1> 

            <img src={WeatherNow.iconId} style={{height:'110px',width:'110px', position:'relative',left:'-30%',padding:'0px'}}alt='cloudy icon'/> 

            <h3 style={{position:'relative',left:'-15%', bottom: '45%'}}>{WeatherNow.description}</h3> 

          </div> 

          <div className= 'temperature'> 

            <h1>{Math.round(WeatherNow.temp)} {units==='metric'? '°C': '°F'}</h1></div>            

        </div> 

<Descriptions currentweather ={WeatherNow}/> 

        </div>  

         

           </div> 

        </div> 

  ) 

} 

 

