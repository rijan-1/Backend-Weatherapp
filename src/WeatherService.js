import axios from 'axios' 

const APIKEY = '1843b3aeb0cb1f1701aadcce7c86d38e' 

export const CurrentWeather = async (city, units)=>{ 

    const makeIconUrl = (iconId)=>  `https://openweathermap.org/img/wn/${iconId}@2x.png` 

    const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=${units}` 

    const Data = await axios.get(URL).then(res => res.data).catch(err => console.log(err)) 

    

     

    const {name,main:{humidity, feels_like,temp, temp_max, temp_min},sys:{country},wind:{speed}} =Data 

    const {description, icon} =Data.weather[0] 

  

    return {name,description, iconId:makeIconUrl(icon)  , humidity, feels_like, temp, temp_max, temp_min, country, speed} 

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

    const GeoCodinnUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=3&appid=${APIKEY}`
    const Data = await axios.get(GeoCodinnUrl).then(res=> res.data)
    const {lat, lon,name, country} = Data[0]



    return {lat,lon, name, country}
}

export const CurrentAirQualityAPI = async()=>{
    const CurrentAirQualityAPIURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=51.5073219&lon=-0.1276474&appid=1a86bd2d037ea5faa1b8661f5281a8c9`
    try {
        let DataAirQuality = await axios.get(CurrentAirQualityAPIURL).then((res) => res.data);
        console.log(DataAirQuality[0]);
      } catch (error) {
        console.error(error);
      }
    }