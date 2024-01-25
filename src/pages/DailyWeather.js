import normal from "../assets/normal.webp"; 

import cold from '../assets/cold.webp' 

import { useContext, useEffect, useState } from "react"; 

import { MyContext } from "../App"; 

import './DailyWeather.css' 

import { FaArrowDown } from "react-icons/fa6"; 

import { FaArrowUp } from "react-icons/fa"; 

import { LuWind } from "react-icons/lu"; 

import { CiFaceSmile } from "react-icons/ci"; 

import { WiHumidity } from "react-icons/wi"; 

import { DailyWeather } from '../WeatherService' 

import { GiPressureCooker } from "react-icons/gi";
export const DailyWeatherFunction = () => { 

  const [dailyWeatherState, setDailyWeatherState] = useState([]); 

  const [cityNameState, setCityNameState] = useState(""); 

  const [countryNameState, setCountryNameState] = useState(''); 

  const { setGlobalCityName,GlobalCityName, units } = useContext(MyContext); 
  const [healthAdviceMessage, setHealthAdviceMessage] = useState('')

  const handleSetMessage =()=>{
if (dailyWeatherState.temp > 25){
  setHealthAdviceMessage('Stay Hydrated: Drink plenty of water throughout the day to stay hydrated. Avoid excessive caffeine and alcohol consumption as they can lead to dehydration.')
}else if(dailyWeatherState.temp < 25){
  setHealthAdviceMessage('Dress Appropriately: Wear clothing that suits the weather. Layering is often a good choice, allowing you to adjust your clothing as the temperature fluctuates.')
}  }
useEffect(()=>{
  handleSetMessage()

},[dailyWeatherState.temp])



  useEffect(() => {
    const HandleDailyWeatherData = async () => {
      try {
        const [DailyWeatherLink, name, country] = await DailyWeather(GlobalCityName, units);
        setDailyWeatherState(DailyWeatherLink);
        setCityNameState(name);
        setCountryNameState(country);
      } catch (error) {
        console.error('An error occurred:', error);
        setGlobalCityName('London')
        
        // You can handle the error here, such as setting an error state or displaying an error message.
      }
    };
  
    HandleDailyWeatherData();
  }, [GlobalCityName, units]);
  

  return ( 

    <div className='HomeBg' style={{ backgroundImage: `url(${normal})`, backgroundSize: 'cover', height: '1200px', width: '100%' }}> 

      <div style={{ backgroundImage: `url(${cold})`, backgroundSize: 'cover', position: 'relative', top: '100%',height: '1300px' }}> 

        <div className='overlay'> 

          <div></div> 

          <div className='dailyWeatherSection'> 

            <div className='DailyWeatherHeading'> 

              <h1 style={{fontSize:'42px'}}>{cityNameState}, {countryNameState}</h1> 

              <h1>5 Day Forecast</h1> 

            </div> 

            <hr style={{ height: '6px', borderWidth: 0, fill: 'white', backgroundColor: 'white', width: "104%", position: 'relative',left:'-16px', top: '-135px' }} /> 

             

            {dailyWeatherState.map((weather, index) => ( 

              <div key={index} className='dailyWeatherContainer'> 

                <div className='dailyWeatherBoxes'> 

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}> 

                    <div className='Dailydate'> 

                      <p>{weather.dt_txt}</p> 

                    </div> 

                    <div className='DailyTemperature'> 

                      <h1 style={{ position: 'relative', textAlign: 'center', fontSize: '50px', top: '-90px' }}>{Math.round(weather.temp_max)}{units === 'metric' ? ' °C' : ' °F'}</h1> 

                    </div> 

                  </div> 

                  <div style={{margin:'0px',padding:'0px', position:'relative',right:'22%', top:'50px'}}className='dailyweatherDescription'> 

                    <img src={weather.iconId}/> 

                    <h4 style={{position:'relative',right:'40%',bottom:'20px', fontSize:'20px'}}>{weather.description}  </h4> 

                  </div> 
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '60px', margin: '0px', padding: '0px', position: 'relative', left: '100px' }}> 

                    <div style={{position:'relative',bottom:'15px'}}className='DailyPrecipitation'> 

                      <p><WiHumidity style={{height:'40px',width:'40px'}}/></p> 

                      <h4>Humidity: {weather.humidity} RH</h4> 

                    </div> 

                    <div> 

                      <p><LuWind  style={{height:'25px',width:'25px'}}/></p> 

                      <h4>NW {weather.speed} {units === 'metric' ? ' kmph' : ' mph'}</h4> 

                    </div> 

                  </div> 

                </div> 

                <div className='DailyWeatherDescription'> 

                  <div className='DescriptionDailyWeatherBox'> 

                    <div className='iconDescriptionDailyWeather'> 

                      <p><FaArrowUp/></p> 

                      <h3>Temp max</h3> 

                    </div> 

                    <div className='DailyWeatherDescriptionNumber'> 

                      <h2 style={{position:'relative',top:'48px'}}>{weather.temp_max} {units==='metric'?'°C':'°F'}</h2> 

                    </div> 

                     

                  </div> 

                  <div className='DescriptionDailyWeatherBox'> 

                    <div className='iconDescriptionDailyWeather'> 

                      <p><FaArrowDown/></p> 

                      <h3>Temp min</h3> 

                    </div> 

                    <div className='DailyWeatherDescriptionNumber'> 

                      <h2 style={{position:'relative',top:'48px'}}>{weather.temp_min} {units ==='metric'?'°C':'°F'}</h2> 

                    </div> 

                  </div> 

                  <div className='DescriptionDailyWeatherBox'> 

                    <div className='iconDescriptionDailyWeather'> 

                      <h4 ><GiPressureCooker style={{height:'30px',width:'30px'}}/></h4> 

                      <h3>Pressure</h3> 

                    </div> 

                    <div className='DailyWeatherDescriptionNumber'> 

                      <h2 style={{position:'relative',top:'59px'}}>{weather.pressure} Pa</h2> 

                    </div> 

                  </div> 

                  <div className='DescriptionDailyWeatherBox'> 

                    <div style={{position:'relative',top:'30px'}} className='iconDescriptionDailyWeather'> 

                      <p><CiFaceSmile style={{height:'30px',width:'30px'}}/></p> 

                      <h3  style={{position:'relative',bottom:'24px'}}>Feels like </h3> 

                    </div> 

                    <div className='DailyWeatherDescriptionNumber'> 

                      <h2 style={{position:'relative',top:'59px'}}>{weather.feels_like} {units==='metric'?'°C':'°F'}</h2> 

                    </div> 

                     

                     

                  </div> 

                  

                  

                   

                </div> <hr style={{ height: '3px', borderWidth: 0, fill: 'white', backgroundColor: 'white', width: "104%", position: 'relative',left:'-1.5%',top:'75px'}} /> 

                 

              </div> 

            ))} 

          </div> 

        </div> 

      </div> 

    </div> 

  ); 

} 
