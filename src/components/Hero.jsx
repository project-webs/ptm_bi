import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">PTM BATAN INDAH</h1>
        <p className="hero-subtitle">Bukan cari juara, tapi cari bahagia</p>
        <p className="hero-text">
          Kami adalah komunitas bahagia yang main tenis meja bukan karena jago, tapi karena cinta.
          Cinta olahraga, cinta tawa, dan... cinta ngopi setelah main
        </p>
        <p className="hero-text">
          Bagi kami, tenis meja bukan hanya olahraga, tapi juga cara sederhana untuk tetap terhubung, tertawa, dan menikmati kebersamaan..
        </p>
        <p className="hero-text" style={{ fontSize: '1.3rem', color: '#00d4ff', letterSpacing: '2px' }}>
          ⚡ SPIN • SMASH • NGUPI • REPEAT ⚡
        </p>
        <div className="cta-buttons">
          <a href="#about" className="btn btn-primary">Explore Now</a>
          <Link to="/kontak" className="btn btn-secondary">Get in Touch</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
