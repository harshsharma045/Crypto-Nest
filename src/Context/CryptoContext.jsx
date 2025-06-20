import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    type: "success",
  });
  const [userName, setUserName] = useState("");

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

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          return;
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  function getUserName(str) {
    const specialChars = ["@", "."];
    let index = str.length;

    for (const char of specialChars) {
      const charIndex = str.indexOf(char);
      if (charIndex !== -1 && charIndex < index) {
        index = charIndex;
      }
    }
    str=str.charAt(0).toUpperCase() + str.slice(1);
    setUserName(str.substring(0, index));
  }
  useEffect(() => {
    if (user) {
      getUserName(user.email);
    }
  }, [user]);
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
        watchlist,
        userName,
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
