import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

function Banner() {
  return (
    <Box
      sx={{
        backgroundImage: "url(../../bannerimg.jpg)",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 3,
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favorite crypto currencies
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
}

export default Banner;
