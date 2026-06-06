import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jadwal from './pages/Jadwal';
import Berita from './pages/Berita';
import Pengurus from './pages/Pengurus';
import Pemain from './pages/Pemain';
import Peresmian from './pages/Peresmian';
import Irtt from './pages/Irtt';
import Persahabatan from './pages/Persahabatan';
import Proyek from './pages/Proyek';
import Turnamen from './pages/Turnamen';
import ManajemenTurnamen from './pages/ManajemenTurnamen';
import TurnamenDetail from './pages/TurnamenDetail';
import Venue from './pages/Venue';
import Administrasi from './pages/Administrasi';
import Aplikasi from './pages/Aplikasi';
import Kontak from './pages/Kontak';
import Login from './pages/Login';
import AdArt from './pages/AdArt';
import Iuran from './pages/Iuran';
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
            <Route path="/pemain" element={<Pemain />} />
            <Route path="/peresmian" element={<Peresmian />} />
            <Route path="/irtt" element={<Irtt />} />
            <Route path="/proyek" element={<Proyek />} />
            <Route path="/turnamen" element={<Turnamen />} />
            <Route path="/manajemen-turnamen" element={<ManajemenTurnamen />} />
            <Route path="/manajemen-turnamen/:slug" element={<TurnamenDetail />} />
            <Route path="/turnamen/:slug" element={<TurnamenDetail />} />
            <Route path="/persahabatan" element={<Persahabatan />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/administrasi" element={<Administrasi />} />
            <Route path="/aplikasi" element={<Aplikasi />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adart" element={<AdArt />} />
            <Route path="/iuran" element={<Iuran />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
