import React, { useContext, useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useNFTBalances,
} from "react-moralis";
import { SearchContext } from "../../hooks/SearchProvider";
import Result from "../Result/Result";
import "./Results.css";

export default function Results() {
  const [results, setResults] = useState([]);
  const { search } = useContext(SearchContext);
  const [ensDomain, setEnsDomain] = useState("");
  const [ensAddress, setEnsAddress] = useState("");
  const { web3, enableWeb3, isWeb3Enabled } = useMoralis();

  const { getNFTBalances, data, isLoading, isFetching } = useNFTBalances();

  useEffect(() => {
    if (ensAddress) {
      getNFTBalances({ params: { address: ensAddress } });
    }
  }, [ensAddress, getNFTBalances]);

  useEffect(() => {
    if (ensDomain) {
      web3.resolveName(ensDomain).then(function (address) {
        setEnsAddress(address);
      });
    }
  }, [ensDomain, web3]);

  useEffect(() => {
    if (search) {
      if (search.endsWith(".eth")) {
        setEnsDomain(search);
      } else {
        getNFTBalances({ params: { address: search } });
      }
    }
    return () => {
      setResults([]);
    };
  }, [getNFTBalances, search]);

  useEffect(() => {
    if (!(isLoading || isFetching) && data) {
      parseAndStoreResults(data.result);
    }
  }, [isLoading, isFetching, data]);

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [isWeb3Enabled, enableWeb3]);

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

  function parseAndStoreResults(data) {
    if (data == null) return;
    const webbNfts = data.filter(
      (e) => e.token_address === "0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51"
    );
    const nfts = webbNfts?.map((w) => {
      return {
        type: w.metadata.name.split(" ")[0].toLowerCase(),
        number: w.token_id,
      };
    });
    setResults(nfts);
  }

  function sortResultsById() {
    setResults(
      results.sort(function (a, b) {
        return a.id - b.id;
      })
    );
  }

  function sortResultsByType() {
    const types = { small: 0, medium: 1, large: 2, penthouse: 3 };
    setResults(
      results.sort(function (a, b) {
        return types[a.type] - types[b.type];
      })
    );
  }

  const loaded = () => {
    if (search) {
      return (
        <div className="results">
          <div className="sum">
            Lands owned by <LinkToOwner /> : {results?.length} results
          </div>
          {results.length > 0 && (
            <div className="filters green-text">
              <div className="filter" onClick={() => sortResultsById()}>
                Sort by id
              </div>
              <div className="filter" onClick={() => sortResultsByType()}>
                Sort by type
              </div>
            </div>
          )}
          {results?.map((item, index) => {
            return <Result key={index} type={item.type} number={item.number} />;
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  return isLoading || isFetching ? loading() : loaded();
}
