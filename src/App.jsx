import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutTotem from './components/LayoutTotem';
import Home from './pages/Home';
import Offering from './pages/Offering';
import Tithe from './pages/Tithe';
import PrayerRequest from './pages/PrayerRequest';
import MiracleReport from './pages/MiracleReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutTotem />}>
          <Route path="/" element={<Home />} />
          <Route path="/oferta" element={<Offering />} />
          <Route path="/dizimo" element={<Tithe />} />
          <Route path="/pedido-oracao" element={<PrayerRequest />} />
          <Route path="/milagre" element={<MiracleReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
