import {
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Select,
  createTheme,
  ThemeProvider,
  Typography,
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
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "none", 
              }}
              component={Link}
              to="/"
            >
              <img
                style={{ height: "45px", width: "30px", paddingBottom:10,
                }}
                src="../../../CryptoNestLogo.png"
                alt="Crypto-Nest"
              />
              <img
                style={{ height: "50px", width: "200px"}}
                src="../../../Crypto-Nest Logo.png"
                alt="Crypto-Nest"
              />
              {/* Crypto-Nest */}
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
