import { useState } from "react";
import { Box, Drawer, Button, Avatar } from "@mui/material";
import { useCryptoState } from "../../Context/CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function UserSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setAlert, watchlist, coins, symbol,userName} = useCryptoState();
  const toggleDrawer = (open) => (event) => {
    // Prevent closing drawer with Tab or Shift key
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  const logout = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      msg: "Logout Successful!",
    });
    toggleDrawer();
  };

  

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        msg: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Avatar
        style={{
          height: 38,
          width: 38,
          marginLeft: 15,
          cursor: "p7ointer",
          backgroundColor: "#EEBC1D",
        }}
        onClick={toggleDrawer(true)}
        src={user.photoURL}
        alt={user.displayName || userName}
      />
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 350,
            padding: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              height: "92%",
            }}
          >
            <Avatar
              sx={{
                objectFit: "contain",
                width: 200,
                height: 200,
                cursor: "pointer",
                backgroundColor: "#EEBC1D",
              }}
              alt={user.displayName || userName}
              src={user.photoURL}
            />
            <span
              style={{
                width: "100%",
                fontSize: 25,
                textAlign: "center",
                fontWeight: "bolder",
                wordWrap: "break-word",
              }}
            >
              {user.displayName || userName}
            </span>
            <div
              className="wishlist"
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "grey",
                borderRadius: 10,
                padding: 15,
                paddingTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                overflowY: "scroll",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  textShadow: "0 0 5px black",
                }}
              >
                WatchList
              </span>
              <span>
                {coins.map((coin) => {
                  if (watchlist.includes(coin.id)) {
                    return (
                      <div
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          color: "black",
                          width: "300px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#EEBC1D",
                          boxShadow: "0 0 3px black",
                        }}
                      ><Link to={`/coins/${coin.id}`} onClick={toggleDrawer(false)}>
                        <span>{coin.name}</span></Link>

                        <span
                          style={{
                            display: "flex",
                            gap: 8,
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          <span>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                          </span>
                          <AiFillDelete
                            style={{
                              cursor: "pointer",
                            }}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          ></AiFillDelete>
                        </span>
                      </div>
                    );
                  }
                })}
              </span>
            </div>
          </div>
          <Button
            variant="contained"
            sx={{
              height: "6%",
              width: "100%",
              background: "#EEBC1D",
              marginTop: 20,
            }}
            onClick={logout}
          >
            {" "}
            Log out
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default UserSideBar;
