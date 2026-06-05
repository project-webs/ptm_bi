import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/images/bi_new1.jpeg",
    "/images/bi_new2.jpeg",
    "/images/bi_new3.jpeg",
    "/images/bi_new4.jpeg",
    "/images/bi_new5.jpeg",
    "/images/bi_new6.jpeg",
    "/images/bi_new7.jpeg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section id="about" className="scroll-reveal visible">
      <div className="section-title neon-cyan">About Us</div>
      <p className="section-subtitle">Komunitas Tenis Meja Batan Indah</p>

      <div className="about-grid">
        <div className="about-text">
          <h3>PTM Batan Indah</h3>
          <p>
            PTM Batan Indah (Persatuan Tenis Meja Batan Indah) adalah komunitas olahraga yang dibentuk oleh warga Batan Indah dengan semangat kebersamaan, sportivitas, dan gaya hidup sehat.
          </p>
          <p>
            Kami hadir sebagai wadah bagi warga dan para pecinta Olah raga Tenis Meja yang ingin berolahraga, bersilaturahmi, dan berkembang dalam bidang tenis meja.
          </p>
          <div style={{ marginTop: '2rem', padding: '1rem', borderLeft: '4px solid #00d4ff', background: 'rgba(0, 212, 255, 0.05)' }}>
            <p style={{ color: '#00d4ff', fontWeight: '600', fontStyle: 'italic', marginBottom: 0 }}>
              "Keringat adalah bukti dedikasi, bukan hanya hasil kompetisi"
            </p>
          </div>
        </div>
        <div className="about-image perspective">
          <div className="slideshow-container">
            {images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                className={`slide ${index === currentSlide ? 'active' : ''}`} 
                alt={`PTM Batan Indah ${index + 1}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
