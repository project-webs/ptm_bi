import React from 'react';

const Berita = () => {
  return (
    <section className="scroll-reveal visible" style={{ marginTop: '100px', minHeight: '60vh' }}>
      <div className="section-title neon-purple">Berita & Informasi</div>
      <p className="section-subtitle">Update terbaru seputar PTM Batan Indah</p>
      
      <div className="card-grid">
        <div className="card">
          <div className="card-content">
            <div className="card-icon"><i className="fa-solid fa-newspaper"></i></div>
            <h3>Turnamen Double - Feb 2026</h3>
            <p>Informasi mengenai turnamen double internal yang diadakan pada Februari 2026.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-icon"><i className="fa-solid fa-building-circle-check"></i></div>
            <h3>Peresmian Tempat Latihan Baru</h3>
            <p>Acara peresmian venue baru PTM Batan Indah pada Mei 2026.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Berita;
