// MobileNavBar.js
import { Link } from "react-router-dom";
import './MobileNavBar.css'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import RealSearchBar from "./RealSearchBar";
const MobileNavBar = () => {

    const [showDropDown, setShowDropDown] = useState(false)

    const handleShowDropDown=()=>{
        setShowDropDown(!showDropDown)
    }
  return (
   <div>
    <div className='SearchBarMobile'>
    <RealSearchBar/>

    </div>
    <button className='buttonforDropDown' onClick={handleShowDropDown}><MdOutlineKeyboardArrowDown style={{height:'40px',width:'40px'}}/></button>
    {showDropDown&&
    <div className='MobileNavDropdoiwnButtons'>
    <Link to='/' ><button >Current Weather</button></Link>
    <Link to='/pages/DailyWeather/DailyWeather' ><button>Daily Weather</button></Link>
    <Link to='../pages/CurrentAirQuality'><button >Air Quality</button></Link>
    <Link to='/pages/HealthAdvice'><button>Health Advice</button></Link>
    <Link to='/Login'><button>Profile</button></Link>
    <Link to='/Register'><button>Register</button></Link>
    
   

</div>
}
   </div>
  );
};

export default MobileNavBar;
