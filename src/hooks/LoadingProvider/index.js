import { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
