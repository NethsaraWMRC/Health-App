import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the context with the correct type
interface CountContextType {
  count: number;
  selectedIndex: number;
  countIncrement: () => void;
  setIndex: (index: number) => void;
}

const CountContext = createContext<CountContextType | undefined>(undefined);

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Increment function
  const countIncrement = () => setCount((prev) => prev + 1);
  const setIndex = (index: number) => setSelectedIndex(index);

  return (
    <CountContext.Provider
      value={{ count, countIncrement, selectedIndex, setIndex }}
    >
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
