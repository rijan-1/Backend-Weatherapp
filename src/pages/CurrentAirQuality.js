import {GeoCodingApi, CurrentAirQualityAPI} from '../WeatherService'
import './CurrentAirQuality.css'
import Ellipse from '../assets/Ellipse 5.png'
import { useEffect ,useState, useContext} from 'react'
import {MyContext} from '../App'
import { useNavigate  } from 'react-router-dom';

export const CurrentAirQuality = () => {
    const {GlobalCityName, isLoggedIn,HealthAirQuality, setHealthAirQuality,setGlobalCityName} = useContext(MyContext)

    const [CoordnatesState,setCoordnatesState] = useState({lat: 51.5073219, lon: -0.1276474})
    const [currentAirQualityState, setAirQualityState] = useState({})
    const [aqivalueState, setaqivalueState] = useState('')
    const [airQulaityBackground, setAirQualityBackground] = useState('')



    const HighPolution = 'https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    const mediumPollution ='https://images.pexels.com/photos/12276056/pexels-photo-12276056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    const lowpollution = 'https://images.pexels.com/photos/5745683/pexels-photo-5745683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'


    useEffect(()=>{
        const airQualityBakcgroundhandle=()=>{
            if (currentAirQualityState.aqi===1){
                setAirQualityBackground(lowpollution)

            }else if (currentAirQualityState.aqi>=2 &&currentAirQualityState.aqi<=3){
                setAirQualityBackground(mediumPollution)
            }else if(currentAirQualityState.aqi>=4 &&currentAirQualityState.aqi<=5){
                setAirQualityBackground(HighPolution)
            }
        }
        airQualityBakcgroundhandle()
    },[currentAirQualityState.aqi])

    useEffect(()=>{

        const HandleGeoCodingAPI = async()=>{
            try{
            const CoordnatesWhole = await GeoCodingApi(GlobalCityName)
           
     
         
            setCoordnatesState(CoordnatesWhole)
            
            }catch(error){
                console.log('error')
                setGlobalCityName('London')

            }
        }
        HandleGeoCodingAPI()

    },[
        
        GlobalCityName])

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
           
         
            
          } catch (error) {
            // Handle other errors, e.g., network issues
            console.log('Error fetching air quality data: ');
            // Optionally, you can handle this error here or rethrow it for higher-level error handling
          }
        };
      
        HandleCurrentAirQualkityData();
      }, [CoordnatesState]);

const airqualityValue = ()=>{
      {if (currentAirQualityState.aqi===1){
        setaqivalueState('Good')
    }else if (currentAirQualityState.aqi===2){
        setaqivalueState('Fair')
    }else if (currentAirQualityState.aqi===3){
        setaqivalueState('Moderate')
    }else if (currentAirQualityState.aqi===4){
        setaqivalueState('Poor')
    }else if (currentAirQualityState.aqi===5){
        setaqivalueState('Very Poor')
    }}
}
useEffect(()=>{
    airqualityValue()
},[currentAirQualityState.aqi])
const navigate = useNavigate();
if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return navigate("/Login") ;
  }
  return (
    <div className='AirQualityBackGround' style={{backgroundImage:`url(${airQulaityBackground})`}}>

            <div className='AirqualityMainContent'>
                <div className='Airqualityttitle'>

                    <h1 className='Airqualityttitle2'>Today air quality- {CoordnatesState.name},{CoordnatesState.country} </h1>
                    

                </div>
                <div className='AirQualityIndex'>
<img style={{position:'relative', right:'-10%',top:'18%'}} src={Ellipse} alt='ellipse'/>
<h1 style={{position:'relative', right:'-35%',fontSize:'45px'}}>{currentAirQualityState.aqi}  AQI</h1>
                </div>
                <div style={{position:'relative', right:'-5%',top:'20%'}} className='airqualitytitle'>
                    <h1>{aqivalueState}</h1>
                

                    
                    <h4 style={{width:'85%'}}>“Lorem ipsum dolor sit aue.orttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa</h4>

                </div>
                <hr style={{ height: '2px', borderWidth: 0, fill: 'white', backgroundColor: 'white', width: "50%", position: 'absolute',
                left:'32%', top: '450px' ,margin:'0px'}} />

                <div className='airqualityinformation'>
                    <div className='AirQualityComponent'>
                        <h2 className='airqualitydescriptionstitle'>All Pollutants</h2>
                        <div className='airqualitycomponents'>
                            <div className='airqualitycomponentname'>
                                <h3 style={{position:'absolute',top:'45px',left:'40px',height:'60px',width:'60px'}}>{Math.round(currentAirQualityState.co)}co</h3>
                            <img style={{position:'relative',top:'30px',left:'20px',height:'120px',width:'120px'}} src={Ellipse} alt='ellipse'/>

                            </div>
                            <div className='airqualitycomponentname'>
                                <h3 style={{position:'relative',top:'55px',left:'40px',height:'60px',width:'60px'}}>{Math.round(currentAirQualityState.nh3)}nh3</h3>
                            <img style={{position:'relative',top:'-74px',left:'20px',height:'120px',width:'120px'}} src={Ellipse} alt='ellipse'/>

                            </div>
                            <div className='airqualitycomponentname'>
                                <h3 style={{position:'relative',top:'55px',left:'40px',height:'60px',width:'60px'}}>{Math.round(currentAirQualityState.no)}no</h3>
                            <img style={{position:'relative',top:'-75px',left:'20px',height:'120px',width:'120px'}} src={Ellipse} alt='ellipse'/>

                            </div>
                            
                     
                      
                            <div className='airqualitycomponentname'>
                                <h3 style={{position:'absolute',left:'40px',height:'60px',width:'60px'}}>{Math.round(currentAirQualityState.no2)}no2</h3>
                            <img style={{position:'relative',top:'30px',left:'20px',height:'120px',width:'120px'}} src={Ellipse} alt='ellipse'/>

                            </div>
                            <div className='airqualitycomponentname'>
                                <h3 style={{position:'relative',top:'55px',left:'40px',height:'60px',width:'60px'}}>{Math.round(currentAirQualityState.o3)}o3</h3>
                            <img style={{position:'relative',top:'-70px',left:'20px',height:'120px',width:'120px'}} src={Ellipse} alt='ellipse'/>

                            </div>
                            <div className='airqualitycomponentname'>
                                <h3 style={{position:'relative',top:'60px',left:'40px',height:'60px',width:'60px'}}>{Math.round(currentAirQualityState.so2)}so2</h3>
                            <img style={{position:'relative',top:'-70px',left:'20px',height:'120px',width:'120px'}} src={Ellipse} alt='ellipse'/>

                            </div>
                            
                          
                        </div>
                        
                    </div>
                 

                </div>

            </div>


    
      
    </div>
  )
}


