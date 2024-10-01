import React, { createContext, useContext, useState } from 'react';
import { fetchWeather } from '../services/weatherService';

const WeatherContext = createContext();

export function useWeather() {
  return useContext(WeatherContext);
}

export function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async (location = null) => {
    setLoading(true);
    setError(null);

    try {
      // If no location is provided, use Geolocation API
      if (!location) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Fetching weather using device location", latitude, longitude);
            const data = await fetchWeather(null, latitude, longitude);
            setWeatherData(data);
            localStorage.setItem('weatherData', JSON.stringify(data));
          }, (error) => {
            console.error("Error getting device location:", error);
            setError('Unable to retrieve device location');
          });
        } else {
          setError('Geolocation is not supported by your browser.');
        }
      } else {
        // Fetch weather for the given location
        const data = await fetchWeather(location);
        setWeatherData(data);
        localStorage.setItem('weatherData', JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      const savedData = localStorage.getItem('weatherData');
      if (savedData) {
        console.log("Using saved data from localStorage");
        setWeatherData(JSON.parse(savedData));
      } else {
        setError('No weather data available');
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    weatherData,
    getWeather,
    loading,
    error,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}