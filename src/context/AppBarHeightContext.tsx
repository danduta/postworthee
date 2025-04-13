"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  RefObject,
} from "react";

// Define the shape of the context
type AppBarHeightContextType = {
  appBarRef: RefObject<HTMLDivElement | null>;
  height: number;
};

// Create a context with undefined initially
const AppBarHeightContext = createContext<AppBarHeightContextType | undefined>(
  undefined
);

// Hook to use the context safely
export const useAppBarHeight = () => {
  const context = useContext(AppBarHeightContext);
  if (!context) {
    throw new Error(
      "useAppBarHeight must be used within an AppBarHeightProvider"
    );
  }
  return context;
};

// Provider component
export const AppBarHeightProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const appBarRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (appBarRef.current) {
        setHeight(appBarRef.current.clientHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <AppBarHeightContext.Provider value={{ appBarRef, height }}>
      {children}
    </AppBarHeightContext.Provider>
  );
};
