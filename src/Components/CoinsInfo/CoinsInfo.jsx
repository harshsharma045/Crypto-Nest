import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart }from "../../Config/api";
import { useCryptoState } from "../../Context/CryptoContext";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import { chartDays } from "../../Config/data";
import SelectBtn from '../Btn/SelectBtn'
import { styled } from "@mui/material/styles";

const StyledContainer  = styled("div")(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

function CoinsInfo({ coin }) {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const { currency } = useCryptoState();
  const [loading, setLoading] = useState(true);

  const fetchHistoricData = async () => {
    setLoading(true); // start loading
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
    setLoading(false); // stop loading
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days, currency, coin.id]);

  

  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark", 
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledContainer >
        {loading || !historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
               
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${String(date.getMinutes()).padStart(2, "0")} PM`
                      : `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectBtn
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectBtn>
              ))}
            </div>
          </>
        )}
      </StyledContainer >
    </ThemeProvider>
  );
}

export default CoinsInfo;
