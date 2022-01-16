import { useMoralis } from "react-moralis";
import "./Login.css";

export default function Login() {
  const { authenticate, isAuthenticated, user } = useMoralis();
  if (!isAuthenticated) {
    return (
      <div>
        <div className="login-btn" onClick={() => authenticate()}>
          authenticate...
        </div>
      </div>
    );
  } else {
    const ethAddress = user.get("ethAddress");

    return (
      <div className="login-text">
        {ethAddress.slice(0, 6)}...
        {ethAddress.slice(ethAddress.length - 4, ethAddress.length)}
      </div>
    );
  }
}
