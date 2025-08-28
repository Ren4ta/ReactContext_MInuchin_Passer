import { useWeather } from "../../contexts/WeatherContext";
import { useUnits } from "../../contexts/UnitsContext";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/Conversions";

export default function CurrentWeather() {
  const { weather, loading, error } = useWeather();
  const { unit } = useUnits();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return <p>No hay datos disponibles</p>;

  const temp = unit === "C" ? kelvinToCelsius(weather.main.temp) : kelvinToFahrenheit(weather.main.temp);
  const min = unit === "C" ? kelvinToCelsius(weather.main.temp_min) : kelvinToFahrenheit(weather.main.temp_min);
  const max = unit === "C" ? kelvinToCelsius(weather.main.temp_max) : kelvinToFahrenheit(weather.main.temp_max);
  const icon = weather.weather[0].icon;

  return (
    <div className="current-weather">
      <h2>{weather.name}</h2>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={weather.weather[0].description} />
      <p>{weather.weather[0].description}</p>
      <p className="text-4xl">{temp}°{unit}</p>
      <p>Min: {min}°{unit} / Max: {max}°{unit}</p>
      <p>Viento: {weather.wind.speed} m/s</p>
      <p>Humedad: {weather.main.humidity}%</p>
      <p>Visibilidad: {weather.visibility} m</p>
      <p>Presión: {weather.main.pressure} hPa</p>
    </div>
  );
}