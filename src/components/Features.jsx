import React from 'react';
import './Features.css';

const Features = () => {
  const featuresList = [
    {
      icon: '🎯',
      title: 'Modern Facilities',
      desc: 'Sarana latihan dengan standar yg baik, dan pencahayaan profesional untuk performa maksimal.'
    },
    {
      icon: '👥',
      title: 'Community',
      desc: 'Gabungan dengan pemain dari berbagai level yang bersemangat dan saling mendukung.'
    },
    {
      icon: '🏆',
      title: 'Tournaments',
      desc: 'Kompetisi reguler dengan sistem yang fair, dan kesempatan untuk showcase kemampuan.'
    },
    {
      icon: '📈',
      title: 'Development',
      desc: 'Program pelatihan untuk meningkatkan skill, strategi, dan konsistensi permainan.'
    },
    {
      icon: '☕',
      title: 'Networking',
      desc: 'Lebih dari olahraga, kami adalah ruang untuk bersosialisasi, berbagi pengalaman, dan membangun persahabatan.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      desc: 'Kami terus berinovasi untuk memberikan pengalaman tenis meja terdepan.'
    }
  ];

  return (
    <section className="scroll-reveal visible">
      <div className="section-title neon-purple">Our Features</div>
      <p className="section-subtitle">Fasilitas & Layanan Kelas Dunia</p>

      <div className="card-grid">
        {featuresList.map((feature, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <div className="card-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
