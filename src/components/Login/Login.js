import { useContext } from "react";
import { useMoralis } from "react-moralis";
import { SearchContext } from "../../hooks/SearchProvider";
import "./Login.css";

export default function Login() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const { setSearch } = useContext(SearchContext);
  if (!isAuthenticated) {
    return (
      <div>
        <div className="login login-btn green-text" onClick={() => authenticate()}>
          authenticate...
        </div>
      </div>
    );
  } else {
    const ethAddress = user.get("ethAddress");

    return (
      <div className="login connected">
        <div className="address">
        {ethAddress.slice(0, 6)}...
        {ethAddress.slice(ethAddress.length - 4, ethAddress.length)}
        </div>
        <div className="actions green-text">
          <div className="action" onClick={() => logout()}>logout</div>
          <div className="action" onClick={() => setSearch(ethAddress)}>my appartments</div>
        </div>
      </div>
    );
  }
}
