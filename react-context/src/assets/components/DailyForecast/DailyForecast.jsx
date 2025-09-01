import { useWeather } from "../../contexts/WeatherContext";
import { useUnits } from "../../contexts/UnitsContext";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/Conversions";

export default function DailyForecast() {
  const { forecast, loading, error } = useWeather();
  const { unit } = useUnits();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!forecast) return <p>No hay datos disponibles</p>;

  return (
    <div className="daily-forecast">
      {forecast.map((day, index) => {
        const date = new Date(day.dt_txt).toLocaleDateString();
        const temp =
          unit === "C"
            ? kelvinToCelsius(day.main.temp)
            : kelvinToFahrenheit(day.main.temp);

        return (
          <div key={index}>
            <h4>{date}</h4>
            <p>
              {temp}°{unit}
            </p>
            <p>{day.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  );
}
