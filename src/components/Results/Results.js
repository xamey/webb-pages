import React, { useContext, useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { SearchContext } from "../../hooks/SearchProvider";
import { SnackbarContext } from "../../hooks/SnackbarProvider";
import Result from "../Result/Result";
import "./Results.css";

export default function Results() {
  /**
   * Local state
   */
  const [results, setResults] = useState([]);
  const [ensDomain, setEnsDomain] = useState("");
  const [addressState, setAddressState] = useState("");

  /**
   * Contexts
   */
  const { searchHandled, setSearchHandled } = useContext(SearchContext);
  const { search } = useContext(SearchContext);
  const { setMessage } = useContext(SnackbarContext);

  /**
   * Moralis calls
   */
  const { web3, isWeb3Enabled } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const { fetch, data, error, isLoading, isFetching } = useMoralisWeb3ApiCall(
    Web3Api.account.getNFTsForContract,
    {
      address: addressState.address,
      token_address: "0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51",
    }
  );

  /**
   * hooks
   */

  useEffect(() => {
    if (error) {
      setMessage(error.message);
    }
  });

  useEffect(() => {
    if (addressState) {
      fetch();
      setSearchHandled(true);
    }
  }, [addressState, fetch, setSearchHandled]);

  useEffect(() => {
    if (ensDomain && web3) {
      web3.resolveName(ensDomain).then(function (address) {
        setAddressState({ address: address });
      });
    }
  }, [ensDomain, web3]);

  useEffect(() => {
    if (search) {
      if (search.endsWith(".eth")) {
        setEnsDomain(search);
      } else {
        setEnsDomain(null);
        setAddressState({ address: search });
      }
    }
    return () => {
      setResults([]);
    };
  }, [search, isWeb3Enabled]);

  useEffect(() => {
    if (!(isLoading || isFetching) && data) {
      parseAndStoreResults(data.result);
    }
  }, [isLoading, isFetching, data]);

  // useEffect(() => {
  //   if (!isWeb3Enabled) {
  //     enableWeb3();
  //   }
  // }, [isWeb3Enabled, enableWeb3]);

  /**
   * Hooks calls
   */

  function parseAndStoreResults(data) {
    if (data == null) return;
    const nfts = data?.map((w) => {
      let metadata = w.metadata;
      if (typeof metadata === "string") {
        metadata = JSON.parse(metadata);
      }
      return {
        type: metadata.name.split(" ")[0].toLowerCase(),
        number: w.token_id,
      };
    });
    setResults(nfts);
  }

  function sortResultsById() {
    setResults([
      ...results.sort(function (a, b) {
        return a.number - b.number;
      }),
    ]);
  }

  function sortResultsByType() {
    const types = { small: 0, medium: 1, large: 2, penthouse: 3 };
    setResults([
      ...results.sort(function (a, b) {
        return types[a.type] - types[b.type];
      }),
    ]);
  }

  /**
   * Render functions
   */

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

  return isLoading || isFetching || !searchHandled ? loading() : loaded();
}
