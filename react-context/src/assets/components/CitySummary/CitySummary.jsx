import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUnits } from "../../contexts/UnitsContext";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/Conversions" ; 

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function CitySummary() {
  const cities = ["New York", "Copenhagen", "Ho Chi Minh City"];
  const { unit } = useUnits();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      const promises = cities.map((city) =>
        axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`)
      );
      const results = await Promise.all(promises);
      setData(results.map((res) => res.data));
    }
    fetchCities();
  }, []);

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
