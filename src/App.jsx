import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jadwal from './pages/Jadwal';
import Berita from './pages/Berita';
import Pengurus from './pages/Pengurus';
import Peresmian from './pages/Peresmian';
import Proyek from './pages/Proyek';
import Turnamen from './pages/Turnamen';
import Venue from './pages/Venue';
import Administrasi from './pages/Administrasi';
import Aplikasi from './pages/Aplikasi';
import Kontak from './pages/Kontak';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/pengurus" element={<Pengurus />} />
            <Route path="/peresmian" element={<Peresmian />} />
            <Route path="/proyek" element={<Proyek />} />
            <Route path="/turnamen" element={<Turnamen />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/administrasi" element={<Administrasi />} />
            <Route path="/aplikasi" element={<Aplikasi />} />
            <Route path="/kontak" element={<Kontak />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
