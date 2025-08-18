import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city = "Buenos Aires") => {  // Cambié city por valor por defecto
    try {
      setLoading(true);
      setError(null);
      const currentRes = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
      const forecastRes = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`);
      setWeather(currentRes.data);
      setForecast(forecastRes.data.list);  // Ahora tomo todo, para 5 días
    } catch (err) {
      setError("Ciudad no encontrada");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(); // Carga por defecto
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, forecast, loading, error, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}
