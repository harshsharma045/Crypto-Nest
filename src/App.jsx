import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import { Box } from "@mui/material";
import AlertDisplay from "./Components/AlertDisplay";
function App() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#14161a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Outlet />
      </Box>
      <AlertDisplay />
    </>
  );
}

export default App;
