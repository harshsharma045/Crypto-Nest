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
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useCryptoState } from "../../Context/CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

function Header() {
  const { currency, setCurrency } = useCryptoState();
  const classes = useStyles();
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
            <Typography className={classes.title} variant="h6">
              <Link to="/">Crypto Tracker</Link>
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e)=> setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
