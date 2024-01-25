import axios from 'axios' 
import { useContext } from 'react'
const APIKEY = '1843b3aeb0cb1f1701aadcce7c86d38e' 

export const CurrentWeather = async (city, units)=>{ 
    try{
  
    const makeIconUrl = (iconId)=>  `https://openweathermap.org/img/wn/${iconId}@2x.png` 

    const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=${units}` 

    const Data = await axios.get(URL).then(res => res.data).catch(err => console.log(err)) 

    

     

    const {name,main:{humidity, feels_like,temp, temp_max, temp_min},sys:{country},wind:{speed}} =Data 

    const {description, icon} =Data.weather[0] 

  

    return {name,description, iconId:makeIconUrl(icon)  , humidity, feels_like, temp, temp_max, temp_min, country, speed} 
}catch(error){
    console.error('error')
}
} 

export const ExtractIcon = async (icon)=>{ 

   const IconURL = `https://openweathermap.org/img/wn/?=${icon}` 

     const IconData = await axios.get(IconURL).then((res)=>res.data) 

    

     return IconData 

} 

export const DailyWeather = async (city, units) =>{ 

    const DailyWeatherUrl =(iconId)=> `https://openweathermap.org/img/wn/${iconId}@2x.png` 

   const DailyWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=${units}` 

   const ExtractedDailyData = await axios.get(DailyWeatherURL).then((res)=>res.data) 

   const {city: {name}} = ExtractedDailyData 

   const {city:{country}} = ExtractedDailyData 

   

 const filteredData = ExtractedDailyData.list.filter(item => item.dt_txt.includes('12:00:00')) 

 const extractedArray = filteredData.map((extractedData)=>{ 

 const {dt_txt,main:{temp_max,temp_min, humidity,pressure, feels_like},wind:{speed,}}= extractedData 

 const {main,description, icon} = extractedData.weather[0] 

return{ 

    dt_txt,temp_max,temp_min, humidity,speed,main,description, iconId:DailyWeatherUrl(icon),pressure, feels_like 

} 

}) 

return [extractedArray, name,country] 

     

     

} 


export const GeoCodingApi = async (city)=>{

    if (city===''){
        const city ='London'
    }

    const GeoCodinnUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${APIKEY}`
    const Data = await axios.get(GeoCodinnUrl).then(res=> res.data)

    const {lat, lon,name, country} = Data[0]




    return {lat,lon, name, country}
}

export const CurrentAirQualityAPI = async (coords) => {
 

    const CurrentAirQualityAPIURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=1a86bd2d037ea5faa1b8661f5281a8c9`;
     
    const DataAirQuality = await axios.get(CurrentAirQualityAPIURL).then((res) => res.data);

    const { components: { co, nh3, no, no2, o3, so2 }, main: { aqi } } = DataAirQuality.list[0];
 
  
    return { co, nh3, no, no2, o3, so2, aqi };
  };
  