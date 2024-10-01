import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Splash() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentUser) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    }, 2000); // Splash screen duration
    return () => clearTimeout(timer);
  }, [currentUser, navigate]);

  return (
    <div>
      <h1>Weather App</h1>
      <p>Loading...</p>
    </div>
  );
}
