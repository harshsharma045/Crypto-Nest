import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { SingleCoin } from "../Config/api";
import { useCryptoState } from "../Context/CryptoContext";
import CoinsInfo from "../Components/CoinsInfo/CoinsInfo";
import { numberWithCommas } from "../Components/Banner/Carousel";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: "none",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
    marginBottom: 20,
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

function CoinsPage() {
  const { id } = useParams();
  const [coins, setCoins] = useState();
  const fetchcoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoins(data);
  };
  useEffect(() => {
    fetchcoin();
  }, []);

  const { currency, symbol } = useCryptoState();

  const classes = useStyles();

  if (!coins)
    return (
      <LinearProgress
        variant="indeterminate"
        style={{ backgroundColor: "gold" }}
      />
    );

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coins?.image.large}
          alt={coins?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coins?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coins?.description.en.split(". ")[0])}.
          {ReactHtmlParser(coins?.description.en.split(". ")[1])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coins?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coins?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
        </div>
      </div>
      <div>
        <CoinsInfo coin={coins} />
      </div>
    </div>
  );
}

export default CoinsPage;
