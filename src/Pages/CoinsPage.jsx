import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LinearProgress,
  Typography,
  Box,
  
} from "@mui/material";
import axios from "axios";
import { SingleCoin } from "../Config/api";
import { useCryptoState } from "../Context/CryptoContext";
import CoinsInfo from "../Components/CoinsInfo/CoinsInfo";
import { numberWithCommas } from "../Components/Banner/Carousel";

function CoinsPage() {
  const { id } = useParams();
  const [coins, setCoins] = useState(null);
  const { currency, symbol } = useCryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoins(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coins) {
    return (
      <LinearProgress
        sx={{ backgroundColor: "gold", width: "100%", marginTop: 2 }}
      />
    );
  }

  return (
    <Box
      sx={{
        
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: { xs: 2, md: 5 },
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          borderRight: { md: "2px solid grey" },
          paddingRight: { md: 5 },
          marginBottom: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            width: "100%",
          }}
        >
          <img
            src={coins?.image.large}
            alt={coins?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            {coins?.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Montserrat",
              textAlign: "justify",
              paddingX: 2,
            }}
          >
            {coins?.description.en.split(". ")[0]}.
          </Typography>

          <Box sx={{ marginTop: 4, width: "100%", paddingX: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="h6" fontWeight="bold">
                Rank:
              </Typography>
              <Typography variant="h6">
                {numberWithCommas(coins.market_cap_rank)}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="h6" fontWeight="bold">
                Current Price:
              </Typography>
              <Typography variant="h6">
                {symbol}{" "}
                {numberWithCommas(
                  coins.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="h6" fontWeight="bold">
                Market Cap:
              </Typography>
              <Typography variant="h6">
                {symbol}{" "}
                {numberWithCommas(
                  coins.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          width: "100%",
          minHeight: "400px",
          marginLeft: { md: 5 },
        }}
      >
        <CoinsInfo coin={coins} />
      </Box>
    </Box>
  );
}

export default CoinsPage;
