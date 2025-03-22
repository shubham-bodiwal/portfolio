import  { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeProvider as StyledProvider, createGlobalStyle } from "styled-components";

const themes = {
  dark: {
    name: "dark",
    background: "#0e101c",
    text: "#ffffff",
    accent: "#00f5d4"
  },
  light: {
    name: "light",
    background: "#ffffff",
    text: "#121212",
    accent: "#0077ff"
  },
  solarized: {
    name: "solarized",
    background: "#fdf6e3",
    text: "#657b83",
    accent: "#b58900"
  }
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const ThemeSwitcherContext = createContext({
  theme: themes.dark,
  setTheme: (name: keyof typeof themes) => {}
});

export const useTheme = () => useContext(ThemeSwitcherContext);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.dark);

  useEffect(() => {
    const stored = localStorage.getItem("app-theme");
    if (stored && themes[stored as keyof typeof themes]) {
      setCurrentTheme(themes[stored as keyof typeof themes]);
    }
  }, []);

  const setTheme = (name: keyof typeof themes) => {
    localStorage.setItem("app-theme", name);
    setCurrentTheme(themes[name]);
  };

  return (
    <ThemeSwitcherContext.Provider value={{ theme: currentTheme, setTheme }}>
      <StyledProvider theme={currentTheme}>
        <GlobalStyle />
        {children}
      </StyledProvider>
    </ThemeSwitcherContext.Provider>
  );
};
