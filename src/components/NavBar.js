import './NavBar.css';
import {Link} from 'react-router-dom'
import { SearchBar } from './SearchBar';
export const NavBar = () => {
  return (
    <div>
      <SearchBar/>
    
    <div className="menu-container">

      <input type="checkbox" id="openmenu" className="hamburger-checkbox" />


      <div className="menu-pane" >
        <div className='ButtonToPages'>
      <Link to='/'>
        <button>Current Weather</button>
        </Link>
   
        <Link to='../pages/DailyWeather/DailyWeather'><button >Daily Weather</button></Link>
        <Link to='../pages/WeeklyWeather/WeeklyWeather'><button>Weekly Weather</button></Link>
        <Link to='../pages/CurrentAirQuality'><button>Air quality Data</button></Link>
        <Link to='../pages/HealthAdvice'><button>Health Advice</button></Link>
       </div>
      </div>
     
    </div></div>
  );
};
