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
          <input style={{position:'relative', top: '0px', width:'24%', height:'40px',zIndex:'1000'}} onKeyDown={EnteredCity} className='searchbar' type ='text' name='city'placeholder='enter city name'  />
          <button style={{zIndex:'1000'}} onClick={changeUnits} className='btn'>C</button>
        </div>
    <div className ='menuContainer'>  </div>
    <div className='ButtonToPagesBottomBar' style={{zIndex:'999', position:'absolute', top:'11%',display:'flex',justifyContent:'flex-end', }}>
    <Link to='../Login'><button style={{borderTop:'solid white',borderBottom:'solid white',borderRadius:'10px'}} >Profile</button></Link>
        <Link to='../Register' style={{borderTop:'solid white',borderBottom:'solid white',borderRadius:'20px'}}><button>Register</button></Link>
    

    </div>
    <div className='ButtonToPagesBottomBar'>
      <Link to='/'>
        <button>Current Weather</button>
        </Link>

        <Link to='../pages/DailyWeather/DailyWeather'><button >Daily Weather</button></Link>
    
        <Link to='../pages/CurrentAirQuality'><button>Air quality Data</button></Link>
        <Link to='../pages/HealthAdvice'><button>Health Advice</button></Link>
       </div>
        
    </div> 
  )
}


