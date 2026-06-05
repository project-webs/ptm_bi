import React from 'react';

const Proyek = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh' }}>
      <section id="project" className="scroll-reveal visible">
        <div className="section-title neon-pink">Project</div>
        <p className="section-subtitle">Proyek Pembangunan Tempat Latihan Baru</p>

        <div className="glass" style={{ padding: '3rem', borderRadius: '20px', marginTop: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '12px', borderLeft: '4px solid #00d4ff' }}>
              <h4 style={{ color: '#00d4ff', fontWeight: 600, marginBottom: '0.5rem' }}>📍 Lokasi</h4>
              <p style={{ color: '#cbd5e1' }}>Blok K, Batan Indah - Lokasi strategis dengan akses mudah</p>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', borderLeft: '4px solid #a855f7' }}>
              <h4 style={{ color: '#a855f7', fontWeight: 600, marginBottom: '0.5rem' }}>📐 Dimensi</h4>
              <p style={{ color: '#cbd5e1' }}>14m × 10m - Menampung 3 meja tenis meja simultan</p>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', borderLeft: '4px solid #ec4899' }}>
              <h4 style={{ color: '#ec4899', fontWeight: 600, marginBottom: '0.5rem' }}>💰 Status</h4>
              <p style={{ color: '#cbd5e1' }}>Proses pembangunan Selesai 26 April 2026</p>
            </div>
          </div>

          <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
            <h4 style={{ color: '#00d4ff', fontWeight: 600, marginBottom: '1rem', fontSize: '1.1rem' }}>💝 Bergabunglah dalam Membangun</h4>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>
              Kami mengundang seluruh komunitas untuk berkontribusi dalam pembangunan sarana latihan yang akan menjadi kebanggaan bersama.
            </p>
            <div style={{ padding: '1rem', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px', borderLeft: '3px solid #00d4ff' }}>
              <p style={{ color: '#00d4ff', fontWeight: 600, marginBottom: '0.5rem' }}>🏦 Rekening Donasi:</p>
              <p style={{ color: '#e0e7ff', fontSize: '1.1rem', fontWeight: 600 }}>BCA • 8010098557</p>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>a.n. Agus Cahyono | 0812-9090-3090</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="gallery-grid" style={{ marginTop: '3rem' }}>
          {[
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi1.jpeg', label: 'Progress 01', color: '#00d4ff' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi2.jpeg', label: 'Progress 02', color: '#a855f7' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi3.jpeg', label: 'Progress 03', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi4.jpeg', label: 'Progress 04', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi5.jpeg', label: 'Progress 05', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi6.jpeg', label: 'Progress 06', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi7.jpeg', label: 'Progress 07', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi8.jpeg', label: 'Progress 08', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi9.jpeg', label: 'Progress 09', color: '#ec4899' },
            { type: 'video', src: import.meta.env.BASE_URL + 'images/p_bi11.mp4', label: '🎬 Video', color: '#00d4ff' },
            { type: 'video', src: import.meta.env.BASE_URL + 'images/p_bi12.mp4', label: '🎬 Video', color: '#00d4ff' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi13.jpeg', label: 'Progress 13', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi14.jpeg', label: 'Progress 14', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi15.jpeg', label: 'Progress 15', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi17.jpeg', label: 'Progress 17', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi18.jpeg', label: 'Progress 18', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi19.jpeg', label: 'Progress 19', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi19b.jpeg', label: 'Progress 19b', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi20.jpeg', label: 'Progress 20', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi21.jpeg', label: 'Progress 21', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi22.jpeg', label: 'Progress 22', color: '#ec4899' },
            { type: 'video', src: import.meta.env.BASE_URL + 'images/p_bi23.mp4', label: '🎬 Video', color: '#00d4ff' },
            { type: 'video', src: import.meta.env.BASE_URL + 'images/p_bi24.mp4', label: '🎬 Video', color: '#00d4ff' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi25.jpeg', label: 'Progress 25', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi26.jpeg', label: 'Progress 26', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi27.jpeg', label: 'Progress 27', color: '#ec4899' },
            { type: 'video', src: import.meta.env.BASE_URL + 'images/p_bi28.mp4', label: '🎬 Video', color: '#00d4ff' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi29.jpeg', label: 'Progress 29', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi30.jpeg', label: 'Progress 30', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/p_bi31.jpeg', label: 'Progress 31', color: '#ec4899' }
          ].map((item, i) => (
            <div className="gallery-item" key={i}>
              {item.type === 'img' ? (
                <img src={item.src} alt={item.label} />
              ) : (
                <video autoPlay muted loop playsInline>
                  <source src={item.src} />
                </video>
              )}
              <div className="gallery-overlay">
                <span style={{ color: item.color, fontWeight: 600 }}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Proyek;
