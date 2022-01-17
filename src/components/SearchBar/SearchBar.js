import React, { useContext, useState } from "react";
import { SearchContext } from "../../hooks/SearchProvider";
import "./SearchBar.css";

export default function SearchBar() {
  const { search, setSearch } = useContext(SearchContext);
  const { setSearchHandled } = useContext(SearchContext);
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

  function isSearchInvalid() {
    return !isEthereumAdressValid(tempSearch) && !tempSearch.endsWith(".eth");
  }

  function invalid() {
    if (isInvalid) {
      return (
        <div className="invalid">
          Ethereum address or ENS provided is invalid.
        </div>
      );
    } else {
      return;
    }
  }

  async function launchSearch() {
    if (isSearchInvalid()) {
      setInvalidStatus(true);
      return;
    }
    setInvalidStatus(false);
    setSearchHandled(false);
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
          src={require("../../images/loop.png")}
          alt="search-img"
        />
      </div>
      <div>{invalid()}</div>
    </div>
  );
}
