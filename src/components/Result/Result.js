import React from "react";
import "./Result.css";

export default function Result(props) {
  const description =
    props.type === "penthouse"
      ? props.type
      : `${props.type} appartment`;
  return (
    <div className="result-line">
      <img
        className="result-img"
        src={require(`../../images/${props.type}.png`)?.default}
        alt={props.type}
      />
      <div className="result-text">
        {description} #{props.number}
      </div>
      <a
        href={`https://opensea.io/assets/0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51/${props.number}`}
        rel="noreferrer"
        target="_blank"
      >
        <img
          className="os"
          src={require("../../images/opensea-logo-b.png")?.default}
          alt="logo"
        />
      </a>
    </div>
  );
}
