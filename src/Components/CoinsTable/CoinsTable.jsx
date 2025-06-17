import { useState, useEffect } from "react";
import { useCryptoState } from "../../Context/CryptoContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../../Config/api";

import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Pagination,
  Box,
} from "@mui/material";

import { numberWithCommas } from "../Banner/Carousel";

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { currency, symbol } = useCryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const rowStyle = {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ margin: 2.2, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices
        </Typography>

        <TextField
          label="Search for a Cryptocurrency"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        key={row.id}
                        sx={rowStyle}
                        onClick={() => navigate(`coins/${row.id}`)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", gap: 2 }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height={50}
                            style={{ marginBottom: 10 }}
                          />
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </Box>
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}{" "}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          sx={{
            padding: 2.5,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
          }}
          count={Math.ceil(handleSearch().length / 10)}
          onChange={(_, value) => {
            setPage(value);
            window.scrollTo({ top: 450, behavior: "smooth" });
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
