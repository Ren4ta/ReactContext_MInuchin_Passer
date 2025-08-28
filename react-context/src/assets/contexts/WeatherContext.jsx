import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
console.log("API Key in WeatherContext:", API_KEY);
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
      if (!API_KEY) throw new Error("API Key is undefined");
      console.log("Fetching weather for:", city, "with API Key:", API_KEY);
      let lat, lon;
      if (city === "current") {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        const currentRes = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const forecastRes = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        setWeather(currentRes.data);
        setForecast(forecastRes.data.list.filter((item, index) => index % 8 === 0).slice(0, 5));
      } else {
        const currentRes = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
        const forecastRes = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`);
        setWeather(currentRes.data);
        setForecast(forecastRes.data.list.filter((item, index) => index % 8 === 0).slice(0, 5));
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message.includes("geolocation") ? "Permiso de geolocalización denegado" : "Error de API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(); // Initial fetch on mount
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, forecast, loading, error, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}