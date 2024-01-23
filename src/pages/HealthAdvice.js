import './HealthAdvice.css'
import { FaTree } from "react-icons/fa";
import {GeoCodingApi, CurrentAirQualityAPI} from '../WeatherService'
import { GiTumbleweed } from "react-icons/gi";
import { GiMoldova } from "react-icons/gi";
import { GiGrass } from "react-icons/gi";

import { useContext, useState, useEffect } from 'react';
import { MyContext } from '../App';
import {CurrentWeather} from '../WeatherService'
export const HealthAdvice = () => {
  const [CoordnatesState,setCoordnatesState] = useState({lat: 51.5073219, lon: -0.1276474})
  const [currentAirQualityState, setAirQualityState] = useState({})

  const{ GlobalCityName, setGlobalCityName,units, setUnits, HealthTemp, setHealthTemp,HealthAirQuality, setHealthAirQuality} = useContext(MyContext)

  const [ColdurticariaState, setColdurticariaState] = useState('NOT WORKING')
  const [FluState, setFluState] = useState('NOT WORKING')
  const [HypothermiaState, setHyprothermia] =useState('NOT WORKING')
  const [heatcramps, setheatcramps]= useState('NOT WORKING')

  
  useEffect(()=>{

    const HandleGeoCodingAPI = async()=>{
        const CoordnatesWhole = await GeoCodingApi(GlobalCityName)
       
 
     
        setCoordnatesState(CoordnatesWhole)
        
        
    }
    HandleGeoCodingAPI()

},[GlobalCityName])

useEffect(() => {
    const HandleCurrentAirQualkityData = async () => {
      try {
        console.log("test")
        const ExtractCurrentAirQuality = await CurrentAirQualityAPI(CoordnatesState);

        if (ExtractCurrentAirQuality.status === 400) {
            // Handle 400 Bad Request here, e.g., log an error or return a specific value
            console.error('Bad Request: ');
            // Or return an error object or appropriate value
          }
      
        setAirQualityState(ExtractCurrentAirQuality);
        setHealthAirQuality(ExtractCurrentAirQuality)
       
        console.log("test")
        
      } catch (error) {
        // Handle other errors, e.g., network issues
        console.log('Error fetching air quality data: ');
        // Optionally, you can handle this error here or rethrow it for higher-level error handling
      }
    };
  
    HandleCurrentAirQualkityData();
  }, [CoordnatesState]);
 

  useEffect(()=>{
    

    const handleHealthAdviceData = async()=>{

      const response = await CurrentWeather(GlobalCityName, units)
      console.log(HealthAirQuality)
      const temp = response.temp

      if (temp <-10){
        setColdurticariaState('High')
      }else if(temp <-5 & temp >= -10){
        setColdurticariaState('Medium')
      }else if(temp >=-5 & temp>0){
        setColdurticariaState('Low')
      }

      if (temp> 15){
        setFluState('Low')
      }else if (temp>=0 & temp<=15){
setFluState('Medium')
      } else if (temp< 0){
        setFluState('High')
      }
      if (temp> 10){
        setHyprothermia('Low')
      }else if (temp< 10 & temp>0){
        setHyprothermia('Medium')
      } else if (temp< -10){
        setHyprothermia('High')
      }

      if (temp< 30){
        setheatcramps('Low')
      }else if (temp> 30 & temp<45){
        setheatcramps('Medium')
      } else if (temp> 45){
        setheatcramps('High')
      }

      

      
      
    }
    handleHealthAdviceData()
  },[GlobalCityName,units])


  return (
    <div className='HealthAdviceBakcground'>
      <div className='HealthAdvicecoverSection' style={{position:'absolute', top: '20%'}}>
        <h1 className='allergytitle'>Allergies</h1>
      
        <div className='HealthAdviceSection'>
          
          
           

            <div className='HealthAdviceBoxes'>
            <FaTree style={{width:'200px'}} />

            <h2>Pollen </h2>
            <hr style={{width: '30%', height:'3%', backgroundColor:'white', marginLeft:'0px'}}/>
            <h2>Low</h2>

            </div>
            <div className='HealthAdviceBoxes'>
            <GiTumbleweed  />
            <h2>Cold urticaria </h2>
            <hr style={{width: '30%', height:'3%', backgroundColor:'white', marginLeft:'0px'}}/>
            <h2>{ColdurticariaState}</h2>
              
            </div>
            <div className='HealthAdviceBoxes'>
            <GiMoldova />
            <h2>Asthma </h2>
            <hr style={{width: '30%', height:'3%', backgroundColor:'white', marginLeft:'0px'}}/>
            <h2>Low</h2>
              
            </div>
            
            <div className='HealthAdviceBoxes'>
            <GiGrass />
            <h2>allergic rhinitis</h2>
            <hr style={{width: '30%', height:'3%', backgroundColor:'white', marginLeft:'0px'}}/>
            <h2>Low</h2>

            </div>
        


        </div>

      </div>
      <div className='HealthAdvicecoverSection' style={{position:'absolute', top: '60%'}}>
        <h1 className='allergytitle'>Health</h1>
      
        <div className='HealthAdviceSection'>
          
          
           

            <div className='HealthAdviceBoxes'>
            <FaTree style={{width:'200px'}} />

            <h2> Flu</h2>
            <hr style={{width: '30%', height:'3%', backgroundColor:'white', marginLeft:'0px'}}/>
            <h2>{FluState}</h2>

            </div>
            <div className='HealthAdviceBoxes'>
            <GiTumbleweed  />
            <h2>hypothermia </h2>
            <hr style={{width: '30%', height:'3%', backgroundColor:'white', marginLeft:'0px'}}/>
            <h2>{HypothermiaState}</h2>
              
            </div>
            <div className='HealthAdviceBoxes'>
            <GiMoldova />
            <h2>frostbite </h2>
            <hr style={{width: '30%', height:'3%', backgroundColor:'white', marginLeft:'0px'}}/>
            <h2>Low</h2>
              
            </div>
            
            <div className='HealthAdviceBoxes'>
            <GiGrass />
            <h2>heat cramps</h2>
            <hr style={{width: '30%', height:'3%', backgroundColor:'white', marginLeft:'0px'}}/>
            <h2>{heatcramps}</h2>

            </div>
        


        </div>

      </div>
    </div>
  )
}


