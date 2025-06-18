import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
function Signup({ handleClose }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = () => {};
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
