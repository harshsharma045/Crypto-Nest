import { useState } from "react";
import { Box, Drawer, Button, Typography, Avatar } from "@mui/material";
import { useCryptoState } from "../../Context/CryptoContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function UserSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setAlert } = useCryptoState();

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
    signOut(auth)
    setAlert({
        open: true,
        type: "success",
        msg: "Logout Successful!"
    })
    toggleDrawer()
  };

  function getUserName(str) {
    const specialChars = ["@", "."];
    let index = str.length;

    for (const char of specialChars) {
      const charIndex = str.indexOf(char);
      if (charIndex !== -1 && charIndex < index) {
        index = charIndex;
      }
    }

    return str.toUpperCase().substring(0, index);
  }

  return (
    <Box>
      <Avatar
        style={{
          height: 38,
          width: 38,
          marginLeft: 15,
          cursor: "pointer",
          backgroundColor: "#EEBC1D",
        }}
        onClick={toggleDrawer(true)}
        src={user.photoURL}
        alt={user.displayName || getUserName(user.email)}
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
              alt={user.displayName || getUserName(user.email)}
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
              {user.displayName || getUserName(user.email)}
            </span>
            <div className="wishlist" style={{
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
                overflow: "hidden"

            }}>
                <span style={{
                fontSize: 15, textShadow: "0 0 5px black"
            }}>WatchList</span>
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
