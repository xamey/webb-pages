import { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoadingStatus] = useState(false); 

  return (
    <LoadingContext.Provider value={{ isLoading, setLoadingStatus}}>
      {children}
    </LoadingContext.Provider>
  );
};
