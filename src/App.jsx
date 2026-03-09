import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Offering from './pages/Offering';
import Tithe from './pages/Tithe';
import PrayerRequest from './pages/PrayerRequest';
import MiracleReport from './pages/MiracleReport';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oferta" element={<Offering />} />
          <Route path="/dizimo" element={<Tithe />} />
          <Route path="/pedido-oracao" element={<PrayerRequest />} />
          <Route path="/milagre" element={<MiracleReport />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
