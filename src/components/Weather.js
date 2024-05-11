import React, { useState } from 'react'
import './Weather.css'
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from 'react-icons/md'
import { WiHumidity } from 'react-icons/wi'

const Weather = () => {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState();
    const [error, setError] = useState('');

    // const API_key = process.env.REACT_APP_API_key.replace(/['"]+/g, '');

    const API_key = process.env.REACT_APP_API_key;

    console.log(API_key);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;

    // console.log(url);

    const handleChange = (e) => {
        setCity(e.target.value);
        console.log(e.target.value);
    }

    async function fetchData() {
        try {
            const response = await fetch(url);
            const output = await response.json();
            if (response.ok) {
                setWeather(output);
                setError('');
                console.log(output);
            }
            else {
                setError("No data found.Please enter a valid city name.");
            }
        }
        catch (err) {
            setError(err);
        }
    }


    // async function fetchData() {
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         setWeather(data);
    //         setError('');
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // }

    return (
        <div className="container">
            <div className='city'>
                <input type='text' value={city} onChange={handleChange} placeholder='Enter the City Name' />
                <button onClick={() => fetchData()}><FaSearch /></button>
            </div>
            {
                error && <p className='error-message'>{error}</p>
            }
            {
                weather && weather.weather &&
                <div className='content'>
                    <div className='weather-image'>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" />
                        <div className='desc'>{weather.weather[0].description}</div>
                    </div>
                    <div className='weather-temp'>
                        <h2>{weather.main.temp}<span>&deg;C</span></h2>
                    </div>
                    <div className='weather-city'>
                        <div className='location'>
                            <MdLocationOn />
                        </div>
                        <p>{weather.name},<span>{weather.sys.country}</span></p>
                    </div>
                    <div className='weather-stats'>
                        <div className='wind'>
                            <div className='wind-icon'>
                                <FaWind />
                            </div>
                            <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
                            <h3 className='wind-heading'>Wind Speed</h3>
                        </div>
                        <div className='humidity'>
                            <div className='humidity-icon'>
                                <WiHumidity />
                            </div>
                            <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                            <h3 className='humidity-heading'>Humidity</h3>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Weather