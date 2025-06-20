import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useCryptoState } from "../../Context/CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
function Signup({ handleClose }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setAlert, userName } = useCryptoState();

  const handleSubmit = async () => {
    if (!pass || !email) {
      setAlert({
        open: true,
        msg: "Please fill all the field",
        type: "error",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setAlert({
        open: true,
        msg: `Sign Up Successful, Welcom ${userName}`,
        type: "success",
      });
    } catch (e) {
      setAlert({
        open: true,
        msg: e.message,
        type: "error",
      });
    }
    handleClose();
  };
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Your Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        log in
      </Button>
    </Box>
  );
}

export default Signup;
