import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    type: "success",
  });
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "GBP") setSymbol("£");
  }, [currency]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        loading,
        coins,
        fetchCoins,
        alert,
        setAlert,
        user,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const useCryptoState = () => {
  return useContext(Crypto);
};
