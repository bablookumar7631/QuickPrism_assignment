import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useNavigate } from 'react-router-dom';

export default function Location() {
  const [city, setCity] = useState('');
  const { getWeather } = useWeather();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      localStorage.setItem('location', city); // Store the new location in local storage
      getWeather(city); // Fetch weather for the new location
      navigate('/home'); // Navigate back to home screen
    }
  };

  return (
    <div>
      <h1>Select Location</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
}
