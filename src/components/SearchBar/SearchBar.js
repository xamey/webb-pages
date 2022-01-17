import React, { useContext, useState } from "react";
import { useMoralis } from "react-moralis";
import { SearchContext } from "../../hooks/SearchProvider";
import "./SearchBar.css";

export default function SearchBar() {
  const { search, setSearch } = useContext(SearchContext);
  const { setSearchHandled } = useContext(SearchContext);
  const [isInvalid, setInvalidStatus] = useState(false);
  const [tempSearch, setTempSearch] = useState(search);
  const [showConnectMessage, setShowConnectMessage] = useState(false);
  const { isWeb3Enabled } = useMoralis();

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

  function invalid() {
    if (isInvalid) {
      return (
        <div className="invalid">
          Ethereum address or ENS provided is invalid.
        </div>
      );
    } else if (showConnectMessage) {
      return (
        <div className="invalid">
          You must connect your wallet first if you want to search an ENS.
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
    if (!isWeb3Enabled && isEns()) {
      setShowConnectMessage(true);
    } else {
      setShowConnectMessage(false);
      setInvalidStatus(false);
      setSearchHandled(false);
      setSearch(tempSearch);
    }
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
