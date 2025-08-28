import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city); // Only call if city is not empty
  };

  const handleCurrentLocation = () => {
    onSearch("current");
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
      />
      <button onClick={handleSubmit}>Search</button>
      <button onClick={handleCurrentLocation}>Use Current Location</button>
    </div>
  );
}