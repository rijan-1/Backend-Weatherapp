import './HealthAdvice.css'
import { FaTree } from "react-icons/fa";
import {GeoCodingApi, CurrentAirQualityAPI} from '../WeatherService'
import { GiTumbleweed } from "react-icons/gi";
import { GiMoldova } from "react-icons/gi";
import { GiGrass } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { MyContext } from '../App';
import {CurrentWeather} from '../WeatherService'
import { Link } from 'react-router-dom';
export const HealthAdvice = () => {
  const [CoordnatesState,setCoordnatesState] = useState({lat: 51.5073219, lon: -0.1276474})
  const [currentAirQualityState, setAirQualityState] = useState({})

  const{ GlobalCityName, setGlobalCityName,units, isLoggedIn, setIsLoggedIn,HealthAirQuality, setHealthAirQuality} = useContext(MyContext)
const navigate = useNavigate()
  const [ColdurticariaState, setColdurticariaState] = useState('NOT WORKING')
  const [ColorColdurticariaState, setColorColdurticariaState] = useState('white')
  const [FluState, setFluState] = useState('NOT WORKING')
  const [ColorFluState, setColorFluState] = useState('NOT WORKING')
  const [HypothermiaState, setHyprothermia] =useState('NOT WORKING')
  const [ColorHypothermiaState, setColorHyprothermia] =useState('white')
  const [heatcramps, setheatcramps]= useState('NOT WORKING')
  const [Colorheatcramps, setColorheatcramps]= useState('white')
  const [asthma, setAsthma] = useState('NOT WORKING')
  const [Colorasthma, setColorAsthma] = useState('white')
  const [pollen, setPollen] = useState('NOT WORKING')
  const [Colorpollen, setColorPollen] = useState('white')
  const [allergicRithics, setAllergicRithics] =useState('NOT WORKING')
  const [ColorallergicRithics, setColorAllergicRithics] =useState('white')
  const [frostBite, setFrostBite] =useState('NOT WORKING')
  const [ColorfrostBite, setColorFrostBite] =useState('white')
  
  useEffect(()=>{

    const HandleGeoCodingAPI = async()=>{
      if (GlobalCityName===''){
        setGlobalCityName('London')
      }
      try{
        const CoordnatesWhole = await GeoCodingApi(GlobalCityName)
       
 
     
        setCoordnatesState(CoordnatesWhole)
        
        
    }
    catch(error){
      console.log(error)
      setGlobalCityName('London')

      
    }}
    HandleGeoCodingAPI()

},[GlobalCityName])

useEffect(() => {
    const HandleCurrentAirQualkityData = async () => {
      try {
       
        const ExtractCurrentAirQuality = await CurrentAirQualityAPI(CoordnatesState);

        if (ExtractCurrentAirQuality.status === 400) {
            // Handle 400 Bad Request here, e.g., log an error or return a specific value
            console.error('Bad Request: ');
            // Or return an error object or appropriate value
          }
      
        setAirQualityState(ExtractCurrentAirQuality);
        setHealthAirQuality(ExtractCurrentAirQuality)
       
    
        const airQuality = ExtractCurrentAirQuality.so2
        if (airQuality< 3){
          setAsthma('Low')
          setColorAsthma('green')
        }else if (airQuality>=3 & airQuality<7){
          setAsthma('Medium')
          setColorAsthma('orange')
        } else if (airQuality>=7){
          setAsthma('High')
          setColorAsthma('red')
          
        }
        if (airQuality< 3){
          setAllergicRithics('Low')
          setColorAllergicRithics('green')
        }else if (airQuality>=3 & airQuality<7){
          setAllergicRithics('Medium')
          setColorAllergicRithics('orange')
        } else if (airQuality>=7){
          setAllergicRithics('High')
          setColorAllergicRithics('red')
        }

 
        
      } catch (error) {
        // Handle other errors, e.g., network issues
        console.log('Error fetching air quality data: ');
     
        // This will set the city name to automaticly London of the user doesnt put any values
      }
    };
  
    HandleCurrentAirQualkityData();
  }, [CoordnatesState]);
 

  useEffect(()=>{
    

    const handleHealthAdviceData = async()=>{
      try{

      const response = await CurrentWeather(GlobalCityName, units)
    
      const temp = response.temp
      

      if (temp < -10){
        setColdurticariaState('High')
        setColorColdurticariaState('red')
      }else if(temp < -5 && temp >= -10){
        setColdurticariaState('Medium')
        setColorColdurticariaState('orange')
      }else if(temp >= -5 && temp > 0){
        setColdurticariaState('Low')
        setColorColdurticariaState('green')
      }

      if (temp> 15){
        setFluState('Low')
        setColorFluState('green')
      }else if (temp>=0 && temp<=15){
setFluState('Medium')
setColorFluState('orange')
      } else if (temp< 0){
        setFluState('High')
        setColorFluState('red')
      }
      if (temp> 10){
        setHyprothermia('Low')
        setColorHyprothermia('green')
      }else if (temp< 10 && temp>0){
        setHyprothermia('Medium')
        setColorHyprothermia('orange')
      } else if (temp < -10){
        setHyprothermia('High')
        setColorHyprothermia('red')
      }

      if (temp< 30){
        setheatcramps('Low')
        setColorheatcramps('green')
      }else if (temp> 30 && temp<45){
        setheatcramps('Medium')
        setColorheatcramps('orange')
      } else if (temp> 45){
        setheatcramps('High')
        setColorheatcramps('red')
        
      }
      if (temp< 6){
        setPollen('Low')
        setColorPollen('green')
      }else if (temp>= 6 && temp<=14){
        setPollen('Medium')
        setColorPollen('orange')
      } else if (temp> 14){
        setPollen('High')
        setColorPollen('red')
      }

      if (temp< -6){
        setFrostBite('Low')
        setColorFrostBite('green')
      }else if (temp>= -6 && temp<=4){
        setFrostBite('Medium')
        setColorFrostBite('orange')
      } else if (temp> 4){
        setFrostBite('High')
        setColorFrostBite('red')
        
      }

      

      

      
}catch (error){
 console.log('error')
}
      
      
    }
    handleHealthAdviceData()
  },[GlobalCityName,units])
  
if (!isLoggedIn){
 return  navigate('/Login')
}

  return (
    <div className='HealthAdviceBakcground'>
      <div className='Healthadvicebackgroundcopver'>
      <div className='HealthAdvicecoverSection' style={{position:'absolute', top: '20%'}}>

        <h1 className='allergytitle'>Allergies- Risk</h1>
      
        <div className='HealthAdviceSection'>
          
          
           

            <div className='HealthAdviceBoxes'>
            <FaTree style={{width:'200px'}} />

            <h2>Pollen </h2>
            <hr style={{width: '30%', height:'5%', backgroundColor:Colorpollen, marginLeft:'0px',borderWidth:'0px'}}/>
            <h2>{pollen}</h2>
            <Link to='/Pollen'><button className='moredetailcss'>more detail</button></Link>

            </div>
            <div className='HealthAdviceBoxes'>
            <GiTumbleweed  />
            <h2>Cold hives </h2>
            <hr style={{width: '30%', height:'5%', backgroundColor:ColorColdurticariaState, marginLeft:'0px',borderWidth:'0px'}}/>
            <h2>{ColdurticariaState}</h2>
            <Link to='/ColdHives'><button className='moredetailcss'>more detail</button></Link>
              
            </div>
            <div className='HealthAdviceBoxes'>
            <GiMoldova />
            <h2>Asthma </h2>
            <hr style={{width: '30%', height:'5%', backgroundColor:Colorasthma, marginLeft:'0px',borderWidth:'0px'}}/>
            <h2>{asthma}</h2>
            <Link to='/Asthma'><button className='moredetailcss'>more detail</button></Link>
              
            </div>
            
            <div className='HealthAdviceBoxes'>
            <GiGrass />
            <h2>Eye Allergy</h2>
            <hr style={{width: '30%', height:'5%', backgroundColor:ColorallergicRithics, marginLeft:'0px',borderWidth:'0px'}}/>
            <h2>{allergicRithics}</h2>
            <Link to='/EyeAllergy'><button className='moredetailcss'>more detail</button></Link>

            </div>
        


        </div>

      </div>
      <div className='HealthAdvicecoverSection' style={{position:'absolute', top: '60%'}}>
        <h1 className='allergytitle'>Health- Risk</h1>
      
        <div className='HealthAdviceSection'>
          
          
           

            <div className='HealthAdviceBoxes'>
            <FaTree style={{width:'200px'}} />

            <h2> Flu</h2>
            <hr style={{width: '30%', height:'5%', backgroundColor:ColorFluState, marginLeft:'0px',borderWidth:'0px'}}/>
            <h2>{FluState}</h2>
            <Link to='/Flu'><button className='moredetailcss'>more detail</button></Link>

            </div>
            <div className='HealthAdviceBoxes'>
            <GiTumbleweed  />
            <h2>Hypothermia </h2>
            <hr style={{width: '30%', height:'5%', backgroundColor:ColorHypothermiaState, marginLeft:'0px',borderWidth:'0px'}}/>
            <h2>{HypothermiaState}</h2>
            <Link to='/Hypothermia'><button className='moredetailcss'>more detail</button></Link>
              
            </div>
            <div className='HealthAdviceBoxes'>
            <GiMoldova />
            <h2>Frostbite </h2>
            <hr style={{width: '30%', height:'5%', backgroundColor:ColorfrostBite, marginLeft:'0px',borderWidth:'0px'}}/>
            <h2>{frostBite}</h2>
            <Link to='/FrostBite'><button className='moredetailcss'>more detail</button></Link>
              
            </div>
            
            <div className='HealthAdviceBoxes'>
            <GiGrass />
            <h2>Heat cramps</h2>
            <hr style={{width: '30%', height:'5%', backgroundColor:Colorheatcramps, marginLeft:'0px',borderWidth:'0px'}}/>
            <h2>{heatcramps}</h2>
            <Link to='/HeatCramps'><button className='moredetailcss'>more detail</button></Link>

            </div>
        


        </div>

      </div></div>
    </div>
  )
}


