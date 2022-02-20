import React, { createContext, useContext, useEffect, useState } from "react";

export const ScreenSizeContext = createContext({});

export function ScreenSizeProvider({ children }) {
  const [currentScreenWidth, setCurrentScreenWidth] = useState(0);

  const screenSizes = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  function isBelowScreenSize(screenSize) {
    const size = Number.isInteger(screenSize)
      ? screenSize
      : screenSizes[screenSize];

    if (size >= currentScreenWidth) {
      return true;
    }
    return false;
  }

  function isAboveScreenSize(screenSize) {
    const size = Number.isInteger(screenSize)
      ? screenSize
      : screenSizes[screenSize];

    if (size < currentScreenWidth) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    function handleScreenResize() {
      setCurrentScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleScreenResize);

    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  useEffect(() => {
    setCurrentScreenWidth(window.innerWidth);
  }, []);

  return (
    <ScreenSizeContext.Provider
      value={{ isBelowScreenSize, isAboveScreenSize }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
}

export default function useScreenSize(size) {
  return useContext(ScreenSizeContext);
}
