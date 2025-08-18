import { useWeather } from "../../contexts/WeatherContext";
import { useUnits } from "../../contexts/UnitsContext";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/Conversions";

export default function CurrentWeather() {
  const { weather, loading, error } = useWeather();
  const { unit } = useUnits();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return null;

  const temp = unit === "C" ? kelvinToCelsius(weather.main.temp) : kelvinToFahrenheit(weather.main.temp);
  const min = unit === "C" ? kelvinToCelsius(weather.main.temp_min) : kelvinToFahrenheit(weather.main.temp_min);
  const max = unit === "C" ? kelvinToCelsius(weather.main.temp_max) : kelvinToFahrenheit(weather.main.temp_max);

  return (
    <div className="current-weather p-4 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800">
      <h2 className="text-xl font-bold">{weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p className="text-4xl">{temp}°{unit}</p>
      <p>Min: {min}°{unit} / Max: {max}°{unit}</p>
      <p>Viento: {weather.wind.speed} m/s</p>
      <p>Humedad: {weather.main.humidity}%</p>
    </div>
  );
}