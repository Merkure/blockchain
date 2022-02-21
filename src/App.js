import React, { useState, useEffect } from "react";
import "./App.css";

const Login = () => {
  const [token, setToken] = useState();

  const handleClick = async () => {
    if (token) {
      window.solana.disconnect();
      return;
    }

    try {
      const resp = await window.solana.connect();
      setToken(resp.publicKey.toString());
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  };

  useEffect(() => {
    window.solana.on("disconnect", () => {
      setToken();
    });
  }, []);

  return (
    <div>
      <div>{token ? `Connected: ${token}` : "not connected"}</div>
      <button onClick={handleClick}>{token ? "disconnect" : "connect"}</button>
    </div>
  );
};

function App() {
  return <Login />;
}

export default App;
