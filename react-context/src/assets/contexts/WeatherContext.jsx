import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
console.log("API Key in WeatherContext:", API_KEY); // Debug log
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city = "Buenos Aires") => {
    try {
      setLoading(true);
      setError(null);
      const currentRes = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
      const forecastRes = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`);
      setWeather(currentRes.data);
      setForecast(forecastRes.data.list);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Ciudad no encontrada o error de API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, forecast, loading, error, fetchWeather, apiKey: API_KEY }}>
      {children}
    </WeatherContext.Provider>
  );
}