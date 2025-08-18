import { createContext, useContext, useState } from "react";

const UnitsContext = createContext();
export const useUnits = () => useContext(UnitsContext);

export function UnitsProvider({ children }) {
  const [unit, setUnit] = useState("C");
  const toggleUnit = () => setUnit((u) => (u === "C" ? "F" : "C"));

  return (
    <UnitsContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitsContext.Provider>
  );
}