import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>PTM Batan Indah</h4>
          <p>Komunitas Tenis Meja Batan Indah. Bukan cari juara, tapi cari bahagia. Spin, Smash, Ngupi, Repeat.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Beranda</Link></li>
            <li><Link to="/#about">Tentang Kami</Link></li>
            <li><Link to="/venue">Venue</Link></li>
            <li><Link to="/kontak">Kontak</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Hubungi Kami</h4>
          <p><i className="fa-solid fa-location-dot"></i> Batan Indah, Serpong</p>
          <p><i className="fa-solid fa-envelope"></i> info@ptmbatanindah.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PTM Batan Indah. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
