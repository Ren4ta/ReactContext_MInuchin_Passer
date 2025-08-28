import { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const themes = {
  light: {
    background: "#f3f4f6",
    color: "#1f2937",
  },
  dark: {
    background: "#1e293b",
    color: "#f9fafb",
  },
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={themes[isDarkMode ? "dark" : "light"]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}