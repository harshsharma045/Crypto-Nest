import {
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Select,
  createTheme,
  ThemeProvider,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCryptoState } from "../../Context/CryptoContext";
import AuthModel from "../Authentication/AuthModel";
import UserSideBar from "./UserSideBar";

function Header() {
  const { currency, setCurrency, user } = useCryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                cursor: "pointer",
              }}
              component={Link}
              to="/"
            >
              <Box
                component="img"
                src="/CryptoNestLogo.png"
                alt="Crypto-Nest Icon"
                sx={{
                  height: { xs: 30, sm: 40, md: 45 },
                  width: "auto",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <Box
                component="img"
                src="/Crypto-Nest Logo.png"
                alt="Crypto-Nest Text"
                sx={{
                  height: { xs: 35, sm: 45, md: 50 },
                  width: "auto",
                  transition: "transform 0.3s",
                  display: { xs: "none", sm: "block" },
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Typography>

            <Select
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
                color: "white",
                borderColor: "white",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
            </Select>
            {user ? <UserSideBar /> : <AuthModel />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
