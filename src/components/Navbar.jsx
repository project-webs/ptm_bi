import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header>
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/logo_bi.png" alt="PTM Batan Indah Logo" style={{ width: '60px', height: '60px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))' }} />
          <span>PTM<br/><span style={{ fontSize: '0.6em', letterSpacing: '3px' }}>BATAN</span></span>
        </Link>
        <nav className={isMenuOpen ? 'active' : ''}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
          <a href="/#about" onClick={() => setIsMenuOpen(false)}>Tentang</a>
          
          <div className={`dropdown ${activeDropdown === 'berita' ? 'active' : ''}`} onClick={() => toggleDropdown('berita')}>
            <Link to="/berita" className="dropdown-trigger">Berita</Link>
            <div className="dropdown-content">
              <Link to="/berita" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-newspaper"></i> Berita Terbaru</Link>
              <Link to="/turnamen" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-trophy"></i> Juara Turnamen Double</Link>
              <Link to="/proyek" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-diagram-project"></i> Proyek Pembangunan</Link>
              <Link to="/peresmian" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-building-circle-check"></i> Peresmian Tempat Latihan</Link>
            </div>
          </div>
          
          <div className={`dropdown ${activeDropdown === 'venue' ? 'active' : ''}`} onClick={() => toggleDropdown('venue')}>
            <Link to="/venue" className="dropdown-trigger">Venue</Link>
            <div className="dropdown-content">
              <Link to="/venue" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-building"></i> Venue Baru</Link>
              <Link to="/jadwal" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-calendar-days"></i> Jadwal Latihan</Link>
            </div>
          </div>
          
          <div className={`dropdown ${activeDropdown === 'administrasi' ? 'active' : ''}`} onClick={() => toggleDropdown('administrasi')}>
            <Link to="/administrasi" className="dropdown-trigger">Administrasi</Link>
            <div className="dropdown-content">
              <Link to="/pengurus" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-users-gear"></i> Pengurus PTM BI</Link>
              <Link to="/administrasi" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-folder-open"></i> Administrasi</Link>
            </div>
          </div>
          
          <div className={`dropdown ${activeDropdown === 'aplikasi' ? 'active' : ''}`} onClick={() => toggleDropdown('aplikasi')}>
            <Link to="/aplikasi" className="dropdown-trigger">Aplikasi</Link>
            <div className="dropdown-content">
              <Link to="/aplikasi" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-trophy"></i> Turnamen</Link>
            </div>
          </div>
          
          <Link to="/kontak" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
          <Link to="/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>
            <i className="fa-solid fa-right-to-bracket"></i> Masuk
          </Link>
        </nav>
        <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
