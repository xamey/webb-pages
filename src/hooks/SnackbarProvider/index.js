import React, { createContext, useState } from "react";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState();

  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }
  }, [isActive]);

  const openSnackBar = (msg = "Something went wrong...") => {
    setMessage(msg);
    setIsActive(true);
  };

  return (
    <SnackbarContext.Provider value={{ isActive, message, openSnackBar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
