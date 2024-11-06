import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import sun from '../assets/clear.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import drizzel from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'


const Weather = () => {

    const [weatherData, setWeatherData] = useState("")
    const [city, setCity] = useState("Hyderabad")
    const inputRef = useRef();

    const allIcons = {
        "01d" : sun,
        "01n" : sun,
        "02d" : sun,
        "02n" : sun,
        "03d" : sun,
        "03n" : sun,
        "04d" : drizzel,
        "04n" : drizzel,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow,
    }
   

    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const res = await fetch(url)
            const data = await res.json()

            if(!res.ok){
                alert(data.message)
                return;
            }
            const icon = allIcons[data.weather[0].icon] || sun
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed : data.wind.speed,
                temparature : Math.floor( data.main.temp)  ,
                location: data.name,
                icon : icon          
                
            })
            
        } catch (error) {
            setWeatherData(false)
            console.error("error in feching data")
            
        }
    }
    
    useEffect(()=>{
        search("Hyderabad")
    },[city])
   

  return (
    <div className='container'>
     <h1>Wheather App</h1>
    <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search city...' />
        <img src={search_icon} onClick={()=>search(inputRef.current.value)}  alt="" />
     </div>
     {weatherData?
     <>
     <img className='sun' src={weatherData.icon} alt="" />
     <p className='temprature'>{weatherData.temparature}°c</p>
     <p className='location'>{weatherData.location}</p>

     <div className="weather-info">
        <div className="frist">
            <img src={humidity} alt="" />
            <div className='humidity'>
                <p>{weatherData.humidity}%</p>
                <p>Humidity</p>
            </div>
        </div>
        <div className="frist">
            <img src={wind} alt="" />
            <div className='humidity'>
                <p>{weatherData.windSpeed}</p>
                <p>wind speed</p>
            </div>
        </div>
     </div></> : <></>}
    </div>
  )
}

export default Weather
