import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWeather } from '../context/WeatherContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { currentUser, logout } = useAuth();
  const { weatherData, getWeather, loading } = useWeather();
  const [location, setLocation] = useState(localStorage.getItem('location') || '');

  const navigate = useNavigate();

  const handleSelectLocation = () => {
    navigate('/location');
  };

  // If location is empty, fallback to device location
  useEffect(() => {
    console.log("Fetching weather for:", location || "device location");
    getWeather(location);
  }, [location]); // Fetch weather on component mount or when location changes

  return (
    <div>
      <h1>Welcome, {currentUser.email}</h1>
      <button onClick={logout}>Sign Out</button>
      <button onClick={handleSelectLocation}>Select Location</button>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}


