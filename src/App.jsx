// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Location from './pages/Location';
import Splash from './pages/Splash';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/location" element={currentUser ? <Location /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/splash" />} />
      </Routes>
    </Router>
  );
}

export default App;


