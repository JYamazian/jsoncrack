import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useMantineColorScheme } from "@mantine/core";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../constants/theme";
import useConfig from "../../store/useConfig";
import { Navbar } from "../Navbar";

const inter = Inter({
  subsets: ["latin-ext"],
});

const StyledLayoutWrapper = styled.div<{ $darkMode?: boolean }>`
  background: ${({ $darkMode }) => ($darkMode ? "#0a0a0a" : "#ffffff")};
  font-family: ${inter.style.fontFamily};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background 0.2s ease;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const PageLayout = ({ children }: React.PropsWithChildren) => {
  const themeMode = useConfig(state => state.themeMode);
  const { setColorScheme } = useMantineColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getEffectiveTheme = () => {
      if (themeMode === "auto") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return themeMode === "dark";
    };

    setIsDarkMode(getEffectiveTheme());
    setColorScheme(getEffectiveTheme() ? "dark" : "light");

    // Listen for system theme changes when in auto mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (themeMode === "auto") {
        setIsDarkMode(mediaQuery.matches);
        setColorScheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode, setColorScheme]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <StyledLayoutWrapper $darkMode={isDarkMode}>
        <Navbar darkMode={isDarkMode} />
        <ContentWrapper>{children}</ContentWrapper>
      </StyledLayoutWrapper>
    </ThemeProvider>
  );
};

export default PageLayout;
