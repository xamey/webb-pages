import React from "react";
import "./Result.css";

export default function Result() {
  const description =
    this.props.type === "penthouse"
      ? this.props.type
      : `${this.props.type} appartment`;
  return (
    <div className="result-line">
      <img
        className="result-img"
        src={require(`../../images/${this.props.type}.png`)}
        alt={this.props.type}
      />
      <div className="result-text">
        {description} #{this.props.number}
      </div>
      <a
        href={`https://opensea.io/assets/0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51/${this.props.number}`}
        rel="noreferrer"
        target="_blank"
      >
        <img
          className="os"
          src={require("../../images/opensea-logo-b.png")}
          alt="logo"
        />
      </a>
    </div>
  );
}
