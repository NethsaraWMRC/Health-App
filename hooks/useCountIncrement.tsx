import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the context with the correct type
interface CountContextType {
  count: number;
  countIncrement: () => void;
}

const CountContext = createContext<CountContextType | undefined>(undefined);

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  // Increment function
  const countIncrement = () => setCount((prev) => prev + 1);

  return (
    <CountContext.Provider value={{ count, countIncrement }}>
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
