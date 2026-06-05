import React from 'react';

const Administrasi = () => {
  return (
    <section className="scroll-reveal visible" style={{ marginTop: '100px', minHeight: '60vh' }}>
      <div className="section-title neon-cyan">Administrasi</div>
      <p className="section-subtitle">Pusat Administrasi & Informasi Anggota</p>
      
      <div className="card-grid">
        <div className="card">
          <div className="card-content">
            <div className="card-icon"><i className="fa-solid fa-users-gear"></i></div>
            <h3>Pengurus PTM BI</h3>
            <p>Struktur kepengurusan PTM Batan Indah saat ini.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-icon"><i className="fa-solid fa-users"></i></div>
            <h3>Daftar Anggota</h3>
            <p>Informasi keanggotaan PTM Batan Indah.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-icon"><i className="fa-solid fa-file-invoice-dollar"></i></div>
            <h3>Laporan Keuangan</h3>
            <p>Transparansi dana dan laporan keuangan bulanan.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Administrasi;
