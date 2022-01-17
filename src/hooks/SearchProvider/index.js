import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchHandled, setSearchHandled] = useState(true);

  return (
    <SearchContext.Provider value={{ search, setSearch, searchHandled, setSearchHandled }}>
      {children}
    </SearchContext.Provider>
  );
};
