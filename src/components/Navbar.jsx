import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  React.useEffect(() => {
    const handleAuthChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header>
      <div className="header-content">
        <Link to="/" className="logo">
          <img src={`${import.meta.env.BASE_URL}logo_bi.png`} alt="PTM Batan Indah Logo" style={{ width: '60px', height: '60px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))' }} />
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
              <Link to="/irtt" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-ranking-star"></i> IRTT PTM BI</Link>
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
              <Link to="/pemain" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-users"></i> Pemain (Players)</Link>
              <Link to="/iuran" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-hand-holding-dollar"></i> Iuran Anggota</Link>
              <Link to="/administrasi" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-folder-open"></i> Administrasi</Link>
              <Link to="/adart" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-scale-balanced"></i> AD/ART</Link>
            </div>
          </div>
          
          <div className={`dropdown ${activeDropdown === 'aplikasi' ? 'active' : ''}`} onClick={() => toggleDropdown('aplikasi')}>
            <Link to="/manajemen-turnamen" className="dropdown-trigger">Aplikasi</Link>
            <div className="dropdown-content">
              <Link to="/manajemen-turnamen" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-trophy"></i> Manajemen Turnamen</Link>
              <Link to="/persahabatan" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-handshake"></i> Laga Persahabatan</Link>
            </div>
          </div>
          
          <Link to="/kontak" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
          
          {user ? (
            <div className={`dropdown ${activeDropdown === 'user' ? 'active' : ''}`} onClick={() => toggleDropdown('user')}>
              <span className="dropdown-trigger user-nav" style={{cursor: 'pointer', color: '#00d4ff'}}>
                <i className="fa-solid fa-user-circle"></i> {user.name} ({user.role})
              </span>
              <div className="dropdown-content">
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.dispatchEvent(new Event('authChange'));
                  setIsMenuOpen(false);
                }}><i className="fa-solid fa-right-from-bracket"></i> Keluar</a>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-right-to-bracket"></i> Masuk
            </Link>
          )}
        </nav>
        <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
