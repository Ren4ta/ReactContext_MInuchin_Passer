import { useWeather } from "../../contexts/WeatherContext";
import { useUnits } from "../../contexts/UnitsContext";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/Conversions";

export default function DailyForecast() {
  const { forecast } = useWeather();
  const { unit } = useUnits();

  const days = {};
  forecast.forEach((f) => {
    const date = new Date(f.dt * 1000).toLocaleDateString();
    if (!days[date]) days[date] = [];
    days[date].push(f);
  });

  const daily = Object.entries(days).slice(0, 5);

  return (
    <div className="daily-forecast grid grid-cols-2 gap-2">
      {daily.map(([date, values], i) => {
        const temps = values.map((v) => v.main.temp);
        const min = Math.min(...temps);
        const max = Math.max(...temps);
        const displayMin = unit === "C" ? kelvinToCelsius(min) : kelvinToFahrenheit(min);
        const displayMax = unit === "C" ? kelvinToCelsius(max) : kelvinToFahrenheit(max);

        return (
          <div key={i} className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow">
            <p>{date}</p>
            <p>Min: {displayMin}°{unit} / Max: {displayMax}°{unit}</p>
          </div>
        );
      })}
    </div>
  );
}