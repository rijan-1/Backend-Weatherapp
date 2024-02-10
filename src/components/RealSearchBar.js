import { useContext } from "react"
import { MyContext } from "../App"
import './SearchBar.css'



const RealSearchBar = () => {
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
  return (

          <div className='section section_input' style={{backgroundColor:'rgba(24,24,24)'}} >
          <input onKeyDown={EnteredCity} className='searchbar' type ='text' name='city'placeholder='enter city name'  />
          <button style={{zIndex:'1000'}} onClick={changeUnits} className='btn'>C</button>
        </div>
      
  
  )
}

export default RealSearchBar
