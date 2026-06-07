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

  // Lock body scroll on mobile when menu is open
  React.useEffect(() => {
    if (isMenuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleDropdownClick = (e, name) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation();
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  return (
    <header>
      <div className="header-content">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}logo_bi.png`} alt="PTM Batan Indah Logo" className="logo-img" />
          <span>PTM<br/><span style={{ fontSize: '0.6em', letterSpacing: '3px' }}>BATAN</span></span>
        </Link>
        <nav className={isMenuOpen ? 'active' : ''}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
          <a href="/#about" onClick={() => setIsMenuOpen(false)}>Tentang</a>
          
          <div className={`dropdown ${activeDropdown === 'berita' ? 'active' : ''}`}>
            <Link to="/berita" className="dropdown-trigger" onClick={(e) => handleDropdownClick(e, 'berita')}>
              Berita <i className="fa-solid fa-chevron-down dropdown-chevron"></i>
            </Link>
            <div className="dropdown-content">
              <Link to="/berita" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-newspaper"></i> Berita Terbaru</Link>
              <Link to="/turnamen" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-trophy"></i> Juara Turnamen Double</Link>
              <Link to="/proyek" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-diagram-project"></i> Proyek Pembangunan</Link>
              <Link to="/peresmian" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-building-circle-check"></i> Peresmian Tempat Latihan</Link>
              <Link to="/irtt" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-ranking-star"></i> IRTT PTM BI</Link>
            </div>
          </div>
          
          <div className={`dropdown ${activeDropdown === 'venue' ? 'active' : ''}`}>
            <Link to="/venue" className="dropdown-trigger" onClick={(e) => handleDropdownClick(e, 'venue')}>
              Venue <i className="fa-solid fa-chevron-down dropdown-chevron"></i>
            </Link>
            <div className="dropdown-content">
              <Link to="/venue" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-building"></i> Venue Baru</Link>
              <Link to="/jadwal" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-calendar-days"></i> Jadwal Latihan</Link>
            </div>
          </div>
          
          <div className={`dropdown ${activeDropdown === 'administrasi' ? 'active' : ''}`}>
            <Link to="/administrasi" className="dropdown-trigger" onClick={(e) => handleDropdownClick(e, 'administrasi')}>
              Administrasi <i className="fa-solid fa-chevron-down dropdown-chevron"></i>
            </Link>
            <div className="dropdown-content">
              <Link to="/pengurus" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-users-gear"></i> Pengurus PTM BI</Link>
              <Link to="/pemain" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-users"></i> Pemain (Players)</Link>
              <Link to="/iuran" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-handholding-dollar"></i> Iuran Anggota</Link>
              <Link to="/administrasi" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-folder-open"></i> Administrasi</Link>
              <Link to="/adart" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-scale-balanced"></i> AD/ART</Link>
            </div>
          </div>
          
          <div className={`dropdown ${activeDropdown === 'aplikasi' ? 'active' : ''}`}>
            <Link to="/manajemen-turnamen" className="dropdown-trigger" onClick={(e) => handleDropdownClick(e, 'aplikasi')}>
              Aplikasi <i className="fa-solid fa-chevron-down dropdown-chevron"></i>
            </Link>
            <div className="dropdown-content">
              <Link to="/manajemen-turnamen" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-trophy"></i> Manajemen Turnamen</Link>
              <Link to="/persahabatan" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-handshake"></i> Laga Persahabatan</Link>
            </div>
          </div>
          
          <Link to="/kontak" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
          
          {user ? (
            <div className={`dropdown ${activeDropdown === 'user' ? 'active' : ''}`}>
              <span 
                className="dropdown-trigger user-nav" 
                style={{cursor: 'pointer', color: '#00d4ff'}}
                onClick={(e) => handleDropdownClick(e, 'user')}
              >
                <i className="fa-solid fa-user-circle"></i> {user.name} ({user.role}) <i className="fa-solid fa-chevron-down dropdown-chevron"></i>
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
          <i className={isMenuOpen ? "fas fa-xmark" : "fas fa-bars"}></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
