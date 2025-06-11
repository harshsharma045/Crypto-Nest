import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-alice-carousel/lib/alice-carousel.css';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import CoinsPage from './Pages/CoinsPage.jsx';
import CryptoContext from './Context/CryptoContext.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home/>} />
      <Route path="coins/:id" element={<CoinsPage/>} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoContext>
    <RouterProvider router={router} />
    </CryptoContext>
  </StrictMode>
);
