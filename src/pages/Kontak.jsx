import React from 'react';

const Kontak = () => {
  return (
    <section className="scroll-reveal visible" style={{ marginTop: '100px', minHeight: '60vh' }}>
      <div className="section-title neon-cyan">Kontak Kami</div>
      <p className="section-subtitle">Hubungi pengurus PTM Batan Indah</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div className="glass" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', color: '#00d4ff', marginBottom: '1rem' }}>
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <h4 style={{ fontFamily: '"Orbitron", monospace', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#00d4ff' }}>Lokasi</h4>
          <p style={{ color: '#cbd5e1' }}>Batan Indah, Serpong, Tangerang Selatan</p>
        </div>
        
        <div className="glass" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', color: '#a855f7', marginBottom: '1rem' }}>
            <i className="fa-brands fa-whatsapp"></i>
          </div>
          <h4 style={{ fontFamily: '"Orbitron", monospace', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#a855f7' }}>WhatsApp</h4>
          <p style={{ color: '#cbd5e1' }}>+62 812-3456-7890</p>
        </div>
        
        <div className="glass" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', color: '#ec4899', marginBottom: '1rem' }}>
            <i className="fa-solid fa-envelope"></i>
          </div>
          <h4 style={{ fontFamily: '"Orbitron", monospace', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#ec4899' }}>Email</h4>
          <p style={{ color: '#cbd5e1' }}>info@ptmbatanindah.com</p>
        </div>
      </div>
    </section>
  );
};

export default Kontak;
