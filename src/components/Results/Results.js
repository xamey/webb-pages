import React, { useContext, useEffect, useState } from "react";
import {
  useApiContract,
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { SearchContext } from "../../hooks/SearchProvider";
import { SnackbarContext } from "../../hooks/SnackbarProvider";
import Result from "../Result/Result";
import "./Results.css";

export default function Results() {
  const namehash = require('eth-ens-namehash')

  const ensRegistryAddress = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
  const ensRegistryAbi = require("../../contracts/registry-abi.json");
  const ensResolverAbi = require("../../contracts/resolver-abi.json");

  /**
   * Local state
   */
  const [results, setResults] = useState([]);
  const [ensDomain, setEnsDomain] = useState("");
  const [addressObject, setAddressObject] = useState("");
  const [hashedDomain, setHashedDomain] = useState("");
  const [resolverAddress, setResolverAddress] = useState("");
  /**
   * Contexts
   */
  const { searchHandled, setSearchHandled } = useContext(SearchContext);
  const { search } = useContext(SearchContext);
  const { openSnackBar } = useContext(SnackbarContext);

  /**
   * Moralis calls
   */
  const Web3Api = useMoralisWeb3Api();

  const { fetch, data, error, isLoading, isFetching } = useMoralisWeb3ApiCall(
    Web3Api.account.getNFTsForContract,
    {
      address: addressObject.address,
      token_address: "0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51",
    }
  );

  const {
    runContractFunction: runContractFunctionMain,
    data: dataMain,
    error: errorMain,
  } = useApiContract({
    functionName: "resolver",
    abi: ensRegistryAbi,
    address: ensRegistryAddress,
    params: { node: hashedDomain },
  });

  const {
    runContractFunction: runContractFunctionResolver,
    data: dataResolver,
    error: errorResolver,
  } = useApiContract({
    functionName: "addr",
    abi: ensResolverAbi,
    address: resolverAddress,
    params: { coinType: 60, node: hashedDomain },
  });

  const clearEnsInputs = () => {
    setEnsDomain("");
    setHashedDomain("");
    setResolverAddress("");
  }
  /**
   * hooks
   */

  useEffect(() => {
    if (error) {
      openSnackBar(error.message);
    }
  }, [openSnackBar, error]);

  useEffect(() => {
    if (addressObject) {
      fetch();
    }
  }, [addressObject, fetch, setSearchHandled]);

  useEffect(() => {
    if (errorResolver) {
      openSnackBar(errorResolver);
    }
  }, [errorResolver, openSnackBar]);

  useEffect(() => {
    if (dataResolver) {
      setAddressObject({ address: dataResolver });
    }
  }, [dataResolver]);

  useEffect(() => {
    if (resolverAddress) {
      runContractFunctionResolver();
    }
  }, [resolverAddress, runContractFunctionResolver, hashedDomain]);

  useEffect(() => {
    if (dataMain) {
      setResolverAddress(dataMain);
    }
  }, [dataMain, setResolverAddress]);

  useEffect(() => {
    if (errorMain) {
      openSnackBar(errorMain);
    }
  }, [openSnackBar, errorMain]);

  useEffect(() => {
    if (hashedDomain !== "") {
      runContractFunctionMain();
    }
  }, [hashedDomain, runContractFunctionMain]);

  useEffect(() => {
    if (ensDomain) {
      setHashedDomain(
        namehash.hash(ensDomain)
      );
    }
  }, [ensDomain, namehash]);

  useEffect(() => {
    if (search) {
      if (search.endsWith(".eth")) {
        clearEnsInputs();
        setEnsDomain(search);
      } else {
        setEnsDomain(null);
        setAddressObject({ address: search });
      }
    }
    return () => {
      setResults([]);
    };
  }, [search]);

  useEffect(() => {
    if (!(isLoading || isFetching) && data) {
      parseAndStoreResults(data.result);
      setSearchHandled(true);
    }
  }, [isLoading, isFetching, data, setSearchHandled]);

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

  return !searchHandled ? loading() : loaded();
}
