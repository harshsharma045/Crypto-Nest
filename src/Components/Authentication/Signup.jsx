import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useCryptoState } from "../../Context/CryptoContext";

function Signup({ handleClose }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const {setAlert} = useCryptoState();
  
  const handleSubmit = async () => {
    if(pass!=confirmPass){
        setAlert({open:true, msg: "Password do Not Match", type:"error"})
    }
    
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
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default Signup;
