import React from 'react';

const Aplikasi = () => {
  return (
    <section className="scroll-reveal visible" style={{ marginTop: '100px', minHeight: '60vh' }}>
      <div className="section-title neon-purple">Aplikasi & Layanan</div>
      <p className="section-subtitle">Sistem pendukung kegiatan PTM Batan Indah</p>
      
      <div className="card-grid">
        <div className="card">
          <div className="card-content">
            <div className="card-icon"><i className="fa-solid fa-trophy"></i></div>
            <h3>Sistem Turnamen</h3>
            <p>Pendaftaran, jadwal, dan bracket turnamen internal maupun eksternal.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-icon"><i className="fa-solid fa-handshake"></i></div>
            <h3>Laga Persahabatan</h3>
            <p>Jadwal laga persahabatan antar PTM lain.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-icon"><i className="fa-solid fa-calendar-check"></i></div>
            <h3>Janjian Latihan</h3>
            <p>Atur jadwal latihan dengan sesama anggota PTM BI.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aplikasi;
