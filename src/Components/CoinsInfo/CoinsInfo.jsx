import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../../Config/api";
import axios from "axios";
import { chartDays } from "../../Config/data";
import SelectBtn from "../Btn/SelectBtn";
import { styled } from "@mui/material/styles";
import { useCryptoState } from "../../Context/CryptoContext";

const StyledContainer = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
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
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const { currency } = useCryptoState();

  const fetchHistoricData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledContainer>
        {loading ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <div style={{ width: "100%", height: "500px" }}>
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${String(
                            date.getMinutes()
                          ).padStart(2, "0")} PM`
                        : `${date.getHours()}:${String(
                            date.getMinutes()
                          ).padStart(2, "0")} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price (Past ${days} Days) in ${currency}`,
                      borderColor: "#EEBC1D",
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
                key={days + currency + coin.id}
              />
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
                flexWrap: "wrap",
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
      </StyledContainer>
    </ThemeProvider>
  );
}

export default CoinsInfo;
