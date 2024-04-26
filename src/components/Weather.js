import React, { useState } from 'react'
import './Weather.css'
import { FaSearch } from "react-icons/fa";
import {API_key} from '../config'

const Weather = () => {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState();
    const[error ,setError]=useState('');

    // const API_key = "4d18c9398c8b157bac9b4ea7c1b20e9e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

    const handleChange = (e) => {
        setCity(e.target.value);
        console.log(e.target.value);
    }

    async function fetchData() {
        try {
            const response=await fetch(url);
            const output= await response.json();
            if(response.ok){
            setWeather(output);
                setError('');
                console.log(output);
            }
            else{
                setError("No data found.Please enter a valid city name.");
            }
        }
        catch (err) {
            setError(err);
        }
    }

    return (
        <div className="container">
            <div className='city'>
                <input type='text' value={city} onChange={handleChange} placeholder='Enter the City Name' />
                <button onClick={()=>fetchData()}><FaSearch /></button>
            </div>
        {
            error && <p className='error-message'>{error}</p>
        }
        </div>
    )
}

export default Weather