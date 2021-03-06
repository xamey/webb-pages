import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import { SnackbarContext } from "../../hooks/SnackbarProvider";
import Line from "../Line/Line";
import Login from "../Login/Login";
import Results from "../Results/Results";
import SearchBar from "../SearchBar/SearchBar";
import { Snackbar } from "../Snackbar/Snackbar";
import "./Terminal.css";

export default function Terminal() {
  const { isActive, message } = useContext(SnackbarContext);

  return (
    <div id="crt">
      <div className="scanline"></div>
      <div className="container">
        <div className="header">
          <Line />
          <Login />
        </div>
        <SearchBar />
        <Results />
      </div>
      <div className="about">
        This project is not affiliated or endorsed by Worldwide Webb project.
        Created by{" "}
        <a href="https://twitter.com/xameyz" rel="noreferrer" target="_blank">
          xameyz
        </a>
      </div>
      <Snackbar isActive={isActive} message={message} />
    </div>
  );
}
