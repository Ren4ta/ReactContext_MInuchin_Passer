import React from "react"; 
import { ThemeProvider } from "./src/assets/contexts/ThemeContext";
import { UnitProvider } from "./src/assets/contexts/UnitContext";
import { WeatherProvider } from "./src/assets/contexts/WeatherContext";
import CurrentWeather from "./src/assets/components/CurrentWeather";
import HourlyForecast from "./src/assets/components/HourlyForecast";
import DailyForecast from "./src/assets/components/DailyForecast";
import CityWeather from "./src/assets/components/CityWeather";
import SearchBar from "./src/assets/components/SearchBar"; // 👈 CAMBIO: Import nuevo

function App() {
  const [selectedCity, setSelectedCity] = React.useState("Buenos Aires");

  const handleCitySearch = (city) => {
    setSelectedCity(city); // 👈 CAMBIO: Actualiza la ciudad cuando se busca
  };

  return (
    <ThemeProvider>
      <UnitProvider>
        <WeatherProvider>
          <div className="weather-app p-6">
            <SearchBar onSearch={handleCitySearch} /> {/* 👈 CAMBIO: Agregado */}
            <CurrentWeather />
            <HourlyForecast />
            <DailyForecast />
            <CityWeather />
          </div>
        </WeatherProvider>
      </UnitProvider>
    </ThemeProvider>
  );
}

export default App;
