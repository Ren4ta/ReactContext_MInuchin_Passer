import React, { useState } from "react";
import { UnitsProvider } from "./assets/contexts/UnitsContext";
import { WeatherProvider, useWeather } from "./assets/contexts/WeatherContext";
import { ThemeProvider } from "./assets/contexts/ThemeContext";
import CurrentWeather from "./assets/components/CurrentWeather/CurrentWeather";
import HourlyForecast from "./assets/components/HourlyForecast/HourlyForecast";
import DailyForecast from "./assets/components/DailyForecast/DailyForecast";
import CitySummary from "./assets/components/CitySummary/CitySummary";
import SearchBar from "./assets/components/SearchBar/SearchBar";
import "./App.css";

function AppContent() {
  const [selectedCity, setSelectedCity] = useState("Buenos Aires");
  const { fetchWeather } = useWeather();

  const handleCitySearch = (city) => {
    setSelectedCity(city);
    fetchWeather(city); // Trigger weather fetch for the new city
  };

  return (
    <div className="weather-app p-6">
      <SearchBar onSearch={handleCitySearch} />
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
      <CitySummary />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UnitsProvider>
        <WeatherProvider>
          <AppContent />
        </WeatherProvider>
      </UnitsProvider>
    </ThemeProvider>
  );
}

export default App;