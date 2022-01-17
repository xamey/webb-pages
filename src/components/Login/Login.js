import { useContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { SearchContext } from "../../hooks/SearchProvider";
import "./Login.css";

export default function Login() {
  const { enableWeb3, isWeb3Enabled, web3 } = useMoralis();
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      setAddress(await web3.getSigner().getAddress());
    };
    if (isWeb3Enabled && address === "") {
      getAddress();
    }
  }, [web3, isWeb3Enabled, address]);

  const { setSearch } = useContext(SearchContext);

  if (!isWeb3Enabled) {
    return (
      <div>
        <div
          className="login login-btn green-text"
          onClick={() => enableWeb3()}
        >
          connect...
        </div>
      </div>
    );
  } else {
    return (
      <div className="login connected">
        <div className="address">
          {address.slice(0, 6)}...
          {address.slice(address.length - 4, address.length)}
        </div>

        <div className="actions green-text">
          <div className="action" onClick={() => setSearch(address)}>
            my appartments
          </div>
        </div>
      </div>
    );
  }
}
