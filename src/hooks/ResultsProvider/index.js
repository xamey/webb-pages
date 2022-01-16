import { createContext, useState } from "react";

export const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState([]); 

  return (
    <ResultsContext.Provider value={{ results, setResults}}>
      {children}
    </ResultsContext.Provider>
  );
};
