import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (location, lat = null, lon = null) => {
  try {
    let url;
    if (lat && lon) {
      // Fetch weather using coordinates
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      // Fetch weather using city name
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};