import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    `${import.meta.env.BASE_URL}images/bi_new1.jpeg`,
    `${import.meta.env.BASE_URL}images/bi_new2.jpeg`,
    `${import.meta.env.BASE_URL}images/bi_new3.jpeg`,
    `${import.meta.env.BASE_URL}images/bi_new4.jpeg`,
    `${import.meta.env.BASE_URL}images/bi_new5.jpeg`,
    `${import.meta.env.BASE_URL}images/bi_new6.jpeg`,
    `${import.meta.env.BASE_URL}images/bi_new7.jpeg`
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const visiMisi = {
    visi: "Menjadi sebuah perkumpulan tenis meja terkemuka di Tangerang Selatan.",
    misi: [
      "Membentuk masyarakat yang sehat rohani dan jasmani untuk mendukung pembangunan bangsa dan negara Indonesia, serta meningkatkan persahabatan antar PTM di Tangerang Selatan melalui olahraga tenis meja.",
      "Membuat anggota PTM BI agar mempunyai rasa memiliki serta mencintai PTM BI Tangerang Selatan, demi kemajuan bersama.",
      "Meningkatkan silaturrahim dan persaudaraan di antara para anggota PTM BI."
    ]
  };

  const tujuan = [
    {
      icon: "fa-solid fa-users-rectangle",
      title: "Menghimpun Masyarakat",
      desc: "Menghimpun pecinta tenis meja di dalam maupun di luar wilayah Kompleks Batan Indah untuk menjadi bagian dari keluarga besar perkumpulan."
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Peningkatan Mutu & Prestasi",
      desc: "Meningkatkan mutu, keterampilan, dan prestasi olahraga tenis meja melalui pendekatan pelatihan yang intensif dan sistematis."
    },
    {
      icon: "fa-solid fa-calendar-check",
      title: "Latihan & Tanding Teratur",
      desc: "Menyelenggarakan program latihan rutin dan pertandingan secara terjadwal, baik untuk jangka pendek maupun jangka panjang."
    },
    {
      icon: "fa-solid fa-ranking-star",
      title: "Seleksi Intern & Peringkat",
      desc: "Menyelenggarakan seleksi dan kompetisi internal berkala untuk menentukan peringkat performa pemain dengan sistem turnamen yang mandiri."
    },
    {
      icon: "fa-solid fa-handshake-angle",
      title: "Solidaritas Antar PTM",
      desc: "Memperkokoh persatuan, rasa kekeluargaan, dan solidaritas yang tinggi baik antar anggota maupun dengan PTM lain di wilayah Kota Tangerang Selatan."
    }
  ];

  const sarana = [
    {
      name: "Meja Nextsist",
      qty: "2 Unit",
      type: "Premium Tournament Table",
      icon: "fa-solid fa-table-tennis-paddle-ball"
    },
    {
      name: "Meja Shiamiq",
      qty: "1 Unit",
      type: "Standard Practice Table",
      icon: "fa-solid fa-table-tennis-paddle-ball"
    },
    {
      name: "Net Profesional",
      qty: "3 Set",
      type: "High Tension & Durable Net",
      icon: "fa-solid fa-border-top-left"
    },
    {
      name: "Papan Skor",
      qty: "2 Buah",
      type: "Match Score Indicator",
      icon: "fa-solid fa-list-ol"
    }
  ];

  return (
    <div className="about-page-container">
      {/* Hero Header Section */}
      <section className="about-hero-section">
        <div className="about-hero-glow"></div>
        <p className="about-subtitle-tag neon-cyan">PROFIL KOMUNITAS</p>
        <h1 className="about-title-main">Tentang PTM BI</h1>
        <p className="about-lead">
          Perkumpulan Tenis Meja Batan Indah - Wadah olahraga, silaturahmi, dan prestasi untuk gaya hidup yang sehat dan dinamis.
        </p>
        <div className="badge-row">
          <span className="badge badge-cyan"><i className="fa-solid fa-location-dot"></i> Tangerang Selatan</span>
          <span className="badge badge-purple"><i className="fa-solid fa-calendar"></i> Berdiri: 2023</span>
          <span className="badge badge-pink"><i className="fa-solid fa-users"></i> Anggota Aktif</span>
        </div>
      </section>

      <main className="about-main-content">
        {/* Sejarah & Latar Belakang */}
        <section className="about-card-section glass">
          <div className="about-section-grid">
            <div className="about-content-left">
              <h2 className="gradient-text">Tentang PTM Batan Indah</h2>
              <p>
                PTM Batan Indah (Persatuan Tenis Meja Batan Indah) adalah komunitas olahraga yang dibentuk oleh warga Batan Indah dengan semangat kebersamaan, sportivitas, dan gaya hidup sehat.
              </p>
              <p>
                Kami hadir sebagai wadah bagi warga dan para pecinta Olah raga Tenis Meja yang ingin berolahraga, bersilaturahmi, dan berkembang dalam bidang tenis meja.
              </p>
              <blockquote className="about-quote">
                "Keringat adalah bukti dedikasi, bukan hanya hasil kompetisi"
              </blockquote>
            </div>
            <div className="about-content-right flex justify-center items-center">
              <div className="about-image perspective" style={{ width: '100%' }}>
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
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="about-visimisi-section">
          <div className="section-title neon-cyan">Visi & Misi</div>
          <p className="section-subtitle text-center">Landasan arah dan komitmen Perkumpulan Tenis Meja Batan Indah</p>

          <div className="visimisi-grid">
            <div className="visi-card glass-thick card-3d">
              <div className="card-inner">
                <div className="card-header-icon color-cyan">
                  <i className="fa-solid fa-eye"></i>
                </div>
                <h3>Visi PTM BI</h3>
                <p className="visi-text">"{visiMisi.visi}"</p>
              </div>
            </div>

            <div className="misi-card glass-thick card-3d">
              <div className="card-inner">
                <div className="card-header-icon color-purple">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <h3>Misi PTM BI</h3>
                <ul className="misi-list">
                  {visiMisi.misi.map((misiPoint, index) => (
                    <li key={index}>
                      <span className="misi-number">0{index + 1}</span>
                      <p>{misiPoint}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tujuan */}
        <section className="about-tujuan-section">
          <div className="section-title neon-purple">Tujuan Kami</div>
          <p className="section-subtitle text-center">Bagaimana kami berusaha mewujudkan Visi & Misi organisasi</p>

          <div className="tujuan-grid">
            {tujuan.map((item, idx) => (
              <div key={idx} className="tujuan-card glass card-3d">
                <div className="tujuan-icon">
                  <i className={item.icon}></i>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fasilitas & Sarana */}
        <section className="about-sarana-section glass">
          <div className="about-section-grid">
            <div className="about-content-left flex justify-center items-center">
              <div className="sarana-visual">
                <div className="glass-decor decoration-1"></div>
                <div className="glass-decor decoration-2"></div>
                <div className="sarana-main-icon">
                  <i className="fa-solid fa-building-circle-check"></i>
                </div>
                <h3>Fasilitas Latihan</h3>
                <p>Kami berkomitmen menyediakan sarana bermain terbaik bagi para anggota guna menunjang kenyamanan serta perkembangan teknik permainan.</p>
              </div>
            </div>
            <div className="about-content-right">
              <h2 className="gradient-text" style={{ marginBottom: '2rem' }}>Sarana & Prasarana</h2>
              <div className="sarana-list">
                {sarana.map((s, idx) => (
                  <div key={idx} className="sarana-item">
                    <div className="sarana-item-icon">
                      <i className={s.icon}></i>
                    </div>
                    <div className="sarana-item-details">
                      <h5>{s.name}</h5>
                      <p>{s.type}</p>
                    </div>
                    <div className="sarana-item-qty">
                      <span>{s.qty}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: '1.5rem', color: '#a0aec0', fontSize: '0.9rem', fontStyle: 'italic' }}>
                * Harta kekayaan dan fasilitas PTM BI diperoleh secara gotong royong melalui iuran, sumbangan sukarela anggota, serta kas organisasi.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links Section / CTA */}
        <section className="about-cta-section text-center">
          <div className="cta-box glass-thick">
            <h2 className="neon-pink">Mari Bergabung Bersama Kami!</h2>
            <p className="cta-text">
              Punya hobi bermain tenis meja atau ingin belajar dari awal? PTM Batan Indah menyambut hangat kehadiran Anda sebagai bagian dari komunitas kami yang solid dan kekeluargaan.
            </p>
            <div className="cta-motto">
              <span>"Bukan Cari Juara, Tapi Cari Bahagia. Spin, Smash, Ngupi, Repeat!"</span>
            </div>
            <div className="cta-buttons gap-4 flex justify-center items-center">
              <Link to="/kontak" className="btn btn-primary">
                Hubungi Kami <i className="fa-solid fa-paper-plane" style={{ marginLeft: '8px' }}></i>
              </Link>
              <Link to="/pengurus" className="btn btn-secondary">
                Lihat Pengurus <i className="fa-solid fa-users-gear" style={{ marginLeft: '8px' }}></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
