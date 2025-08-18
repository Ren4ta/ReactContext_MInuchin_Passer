import React from "react"; 
import { UnitsProvider } from "./assets/contexts/UnitsContext"

import { WeatherProvider } from "./assets/contexts/WeatherContext";
import CurrentWeather from "./assets/components/CurrentWeather/CurrentWeather";
import HourlyForecast from "./assets/components/HourlyForecast/HourlyForecast";
import DailyForecast from "./assets/components/DailyForecast/DailyForecast";
import CitySummary from "./assets/components/CitySummary/CitySummary";
import SearchBar from "./assets/components/SearchBar/SearchBar"; // 👈 CAMBIO: Import nuevo

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
