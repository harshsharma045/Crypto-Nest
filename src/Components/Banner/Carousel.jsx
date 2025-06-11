import { makeStyles } from "@material-ui/core";
import { TrendingCoins } from "../../Config/api";
import { useCryptoState } from "../../Context/CryptoContext";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    textTransform: "uppercase",
    cursor: "pointer",
  }
}));

// commas in nubers
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
  const { currency, symbol } = useCryptoState();
  const [trendingCoins, setTrendingCoins] = useState([]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  const classes = useStyles();

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  

  const items = trendingCoins.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
            {coin?.symbol} &nbsp;
            <span style={{ color: profit>0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
                { profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
         {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
}

export default Carousel;
