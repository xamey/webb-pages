import React, { useContext } from "react";
import { SnackbarContext } from "../../hooks/SnackbarProvider";
import Line from "../Line/Line";
import Results from "../Results/Results";
import SearchBar from "../SearchBar/SearchBar";
import { Snackbar } from "../Snackbar/Snackbar";
import './Terminal.css';

export default function Terminal() {
  const { isActive, message } = useContext(SnackbarContext);
  
    return (
      <div id="crt">
        <div className="scanline"></div>
        <div className="container">
          <div className="header">
            <img
              className="logo"
              src={require("../../images/logo.png")}
              alt="logo"
            />
            <Line />
          </div>
          <SearchBar/>
          <p>{isActive}</p>

          <Results/>
        </div>

        <Snackbar isActive = {isActive} message = {message}  />
      </div>
    );
  
}
