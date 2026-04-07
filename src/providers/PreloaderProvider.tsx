"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface PreloaderContextValue {
  isPreloaderComplete: boolean;
  setPreloaderComplete: (complete: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextValue | undefined>(
  undefined,
);

interface PreloaderProviderProps {
  children: React.ReactNode;
}

export const PreloaderProvider: React.FC<PreloaderProviderProps> = ({
  children,
}) => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  // Fallback: hide preloader after 2s for pages that don’t control it (e.g. home page)
  useEffect(() => {
    const t = setTimeout(() => setIsPreloaderComplete(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const setPreloaderComplete = useCallback((complete: boolean) => {
    setIsPreloaderComplete(complete);
  }, []);

  const value: PreloaderContextValue = {
    isPreloaderComplete,
    setPreloaderComplete,
  };

  return (
    <PreloaderContext.Provider value={value}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloaderContext = (): PreloaderContextValue => {
  const context = useContext(PreloaderContext);

  if (!context) {
    throw new Error(
      "usePreloaderContext must be used within a PreloaderProvider",
    );
  }

  return context;
};
