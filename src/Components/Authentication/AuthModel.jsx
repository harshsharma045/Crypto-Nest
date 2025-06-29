import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AppBar, Tab, Tabs } from "@mui/material";
import Signup from "./Signup";
import Login from "./Login";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useCryptoState } from "../../Context/CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { setAlert } = useCryptoState();

  const googleProvider = new GoogleAuthProvider();

  const signinWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          type: "success",
          msg: "Logout Successful!",
        });
        handleClose();
      })
      .catch((e) => {
        setAlert({
          open: true,
          type: "error",
          msg: e.message,
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        LOGIN
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Box sx={style}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "transparent",
              borderRadius: 10,
            }}
          >
            <Tabs centered value={value} onChange={handleChange}>
              <Tab style={{ width: 200 }} label="Login" />
              <Tab style={{ width: 200 }} label="Signup" />
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <Signup handleClose={handleClose} />}
          <Box
            className="google"
            sx={{
              color: "white",
              padding: 2,
              paddingTop: 0,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: 1,
              fontSize: 20,
            }}
          >
            <span>OR</span>
            <GoogleButton
              style={{ width: "100%", outline: "none" }}
              onClick={signinWithGoogle}
              type="dark"
            ></GoogleButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
