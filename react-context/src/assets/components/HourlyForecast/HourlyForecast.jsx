import { useWeather } from "../../contexts/WeatherContext";
import { useUnits } from "../../contexts/UnitsContext";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/Conversions";

export default function HourlyForecast() {
  const { forecast } = useWeather();
  const { unit } = useUnits();

  return (
    <div className="hourly-forecast grid grid-cols-3 gap-2">
      {forecast.slice(0, 8).map((f, i) => {
        const temp = unit === "C" ? kelvinToCelsius(f.main.temp) : kelvinToFahrenheit(f.main.temp);
        return (
          <div key={i} className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow">
            <p>{new Date(f.dt * 1000).getHours()}:00</p>
            <p>{temp}°{unit}</p>
          </div>
        );
      })}
    </div>
  );
}