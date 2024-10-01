import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext';
import { WeatherProvider } from './context/WeatherContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </AuthProvider>
);
