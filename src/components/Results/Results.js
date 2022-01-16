import React, { useContext } from "react";
import { LoadingContext } from "../../hooks/LoadingProvider";
import { ResultsContext } from "../../hooks/ResultsProvider";
import { SearchContext } from "../../hooks/SearchProvider";
import Result from "../Result/Result";
import "./Results.css";

export default function Results() {
  const { isLoading } = useContext(LoadingContext);
  const { results } = useContext(ResultsContext);
  const { search } = useContext(SearchContext);

  const loading = () => {
    return <div className="pixel-loader"></div>;
  };

  const LinkToOwner = () => {
    let link = "";
    if (search.endsWith(".eth")) {
      link = `https://etherscan.io/enslookup-search?search=${search}`;
    } else {
      link = `https://etherscan.io/address/${search}`;
    }
    return (
      <a href={link} target="_blank" rel="noreferrer">
        {search}
      </a>
    );
  };

  const loaded = () => {
    if (results.length > 0) {
      return (
        <div className="results">
          <div className="sum">
            Lands owned by <LinkToOwner /> : {results.length} results
          </div>
          {results.map((item, index) => {
            return <Result key={index} type={item.type} number={item.number} />;
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  return isLoading ? loading() : loaded();
}
