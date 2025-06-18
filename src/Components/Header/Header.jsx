import {
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Typography,
  Select,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCryptoState } from "../../Context/CryptoContext";
import AuthModel from "../Authentication/AuthModel";

function Header() {
  const { currency, setCurrency } = useCryptoState();

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
              variant="h6"
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
              Crypto Tracker
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
            <AuthModel/>
          </Toolbar>
        </Container>
      </AppBar>
      
    </ThemeProvider>
  );
}

export default Header;
