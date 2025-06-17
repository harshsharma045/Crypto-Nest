import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default App;
