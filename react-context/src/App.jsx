import React from "react";
import { UnitsProvider } from "./assets/contexts/UnitsContext";
import { WeatherProvider } from "./assets/contexts/WeatherContext";
import { ThemeProvider } from "./assets/contexts/ThemeContext"; // Import the new ThemeProvider
import CurrentWeather from "./assets/components/CurrentWeather/CurrentWeather";
import HourlyForecast from "./assets/components/HourlyForecast/HourlyForecast";
import DailyForecast from "./assets/components/DailyForecast/DailyForecast";
import CitySummary from "./assets/components/CitySummary/CitySummary";
import SearchBar from "./assets/components/SearchBar/SearchBar";
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = React.useState("Buenos Aires");

  const handleCitySearch = (city) => {
    setSelectedCity(city);
  };

  return (
    <ThemeProvider> {/* Use the custom ThemeProvider */}
      <UnitsProvider>
        <WeatherProvider>
          <div className="weather-app p-6">
            <SearchBar onSearch={handleCitySearch} />
            <CurrentWeather />
            <HourlyForecast />
            <DailyForecast />
            <CitySummary />
          </div>
        </WeatherProvider>
      </UnitsProvider>
    </ThemeProvider>
  );
}

export default App;