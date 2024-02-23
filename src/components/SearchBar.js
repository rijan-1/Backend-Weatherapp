import { useContext } from "react"
import { MyContext } from "../App"
import './SearchBar.css'
import {Link} from 'react-router-dom'
export const SearchBar = () => {

    const {setGlobalCityName, GlobalCityName, units, setUnits} =useContext(MyContext)

    const EnteredCity =(e)=>{
        if (e.keyCode === 13){
            setGlobalCityName(e.target.value)
            e.currentTarget.blur()
         
        }
        
    
    }
    const changeUnits = () => {
        {units === 'metric'? setUnits('imperial') : setUnits('metric')}
       
      };
      
 ;
  return (
    <div className='SearchBarContainer'>


   
     
        <div className='section section_input'>
          <input  onKeyDown={EnteredCity} className='searchbar' type ='text' name='city'placeholder='enter city name'  />
          <button style={{zIndex:'1000'}} onClick={changeUnits} className='btn'>C</button>
        </div>
    <div className ='menuContainer'>  </div>
 
   

   
    <div className='ButtonToPagesBottomBar'>
    
      <Link to='/'>
        <button>Current Weather</button>
        </Link>

        <Link to='../pages/DailyWeather/DailyWeather'><button >Daily Weather</button></Link>
    
        <Link to='../pages/CurrentAirQuality'><button>Air quality Data</button></Link>
        <Link to='../pages/HealthAdvice'><button>Health Advice</button></Link> <Link to='../Login'><button >Profile</button></Link>
        <Link to='../Register' ><button>Register</button></Link>
       </div>
        
    </div> 
  )
}


