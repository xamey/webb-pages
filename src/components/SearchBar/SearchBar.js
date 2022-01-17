import React, { useContext, useState } from "react";
import { LoadingContext } from "../../hooks/LoadingProvider";
import { SearchContext } from "../../hooks/SearchProvider";
import "./SearchBar.css";

export default function SearchBar() {
  const { search, setSearch } = useContext(SearchContext);
  const { globalLoading, setGlobalLoading } = useContext(LoadingContext);
  const [isInvalid, setInvalidStatus] = useState(false);
  const [tempSearch, setTempSearch] = useState(search);

  function handleSubmit(e) {
    if (e.key === "Enter") {
      launchSearch();
    }
  }

  function isEthereumAdressValid(address) {
    return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
  }

  function isEns() {
    return tempSearch.endsWith(".eth");
  }

  function isSearchInvalid() {
    return !isEthereumAdressValid(tempSearch) && !isEns;
  }

  function searchEqualsTempSearch() {
    return tempSearch === search;
  }

  function invalid() {
    if (isInvalid) {
      let msg = "";
      if (isSearchInvalid())
        msg = "Ethereum address or ENS provided is invalid.";
      if (searchEqualsTempSearch()) msg = "You already searched that.";
      return <div className="invalid">{msg}</div>;
    } else {
      return;
    }
  }

  async function launchSearch() {
    if (globalLoading) return;
    if (isSearchInvalid() || searchEqualsTempSearch()) {
      setInvalidStatus(true);
      return;
    }

    setInvalidStatus(false);
    setGlobalLoading(true);
    setSearch(tempSearch);
  }

  return (
    <div>
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          onKeyDown={handleSubmit}
          spellCheck="false"
          placeholder="enter an ETH address or ENS domain"
        />
        <img
          className="search-img"
          onClick={launchSearch}
          src={require("../../images/loop.png")?.default}
          alt="search-img"
        />
      </div>
      <div>{invalid()}</div>
    </div>
  );
}
