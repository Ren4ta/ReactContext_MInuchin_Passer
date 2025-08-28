import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUnits } from "../../contexts/UnitsContext";
import { useWeather } from "../../contexts/WeatherContext"; // Import useWeather
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/Conversions";

export default function CitySummary() {
  const cities = ["New York", "Copenhagen", "Ho Chi Minh City"];
  const { unit } = useUnits();
  const { apiKey } = useWeather(); // Get API key from context
  console.log("API Key in CitySummary from context:", apiKey);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        const promises = cities.map((city) =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        );
        const results = await Promise.all(promises);
        setData(results.map((res) => res.data));
        setError(null);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Error fetching weather data. Check API key or network.");
      }
    }
    fetchCities();
  }, [apiKey]);

  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {data.map((cityWeather) => {
        const tempK = cityWeather.main.temp;
        const temp = unit === "C" ? kelvinToCelsius(tempK) : kelvinToFahrenheit(tempK);
        return (
          <div key={cityWeather.id} className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow">
            <h3 className="font-bold">{cityWeather.name}</h3>
            <p>{temp}°{unit}</p>
            <p>{cityWeather.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  );
}