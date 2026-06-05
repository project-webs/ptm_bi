import React from 'react';

const Turnamen = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh' }}>
      <section id="tournament" className="scroll-reveal visible">
        <div className="section-title neon-cyan">Turnamen Doubles</div>
        <p className="section-subtitle">Februari 2026</p>

        <div className="glass" style={{ padding: '3rem', borderRadius: '20px', marginBottom: '3rem' }}>
          <h3 style={{ color: '#00d4ff', fontFamily: '"Orbitron", monospace', fontSize: '1.8rem', marginBottom: '2rem' }}>
            🏆 JUARA TURNAMEN DOUBLES
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '12px', borderTop: '3px solid #00d4ff' }}>
              <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🥇 JUARA</p>
              <p style={{ color: '#00d4ff', fontWeight: 600, fontSize: '1.1rem' }}>Greg / Edi Korpri</p>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', borderTop: '3px solid #a855f7' }}>
              <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🥈 RUNNER UP</p>
              <p style={{ color: '#a855f7', fontWeight: 600, fontSize: '1.1rem' }}>Wisnu / Acong</p>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', borderTop: '3px solid #ec4899' }}>
              <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🥉 PERINGKAT 3</p>
              <p style={{ color: '#ec4899', fontWeight: 600, fontSize: '1.1rem' }}>Alaudin / Agus</p>
            </div>
            
            <div style={{ padding: '1.5rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', borderTop: '3px solid #ec4899' }}>
              <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏅 PERINGKAT 4</p>
              <p style={{ color: '#ec4899', fontWeight: 600, fontSize: '1.1rem' }}>Teguh Bale / Heni</p>
            </div>
          </div>

          <div style={{ color: '#cbd5e1', lineHeight: 1.8, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'justify' }}>
            <p>
              Selamat kepada para juara Turnamen Double PTM Batan Indah Feb 2026. 
              Kami dari panitia mau ngucapin terima kasih banyak buat semua peserta yang sudah ikut meramaikan turnamen ini. 
              Terima kasih sudah meluangkan waktu, tenaga, dan semangat.
            </p>
            <p>
              Terimakasih juga kepada para donatur yang sudah memberikan hadiah untuk para juara, karena memang uang pendaftaran kami serahkan semua untuk keperluan pembangunan Sarana PTM BI yang baru.
            </p>
            <p>
              Setiap donasi hadiah dan uang pendaftaran kami serahkan untuk pembangunan sarana PTM Batan Indah yang baru. 
              Terima kasih atas sportivitas dan dukungan Anda!
            </p>
            <p className="italic text-right" style={{ color: '#00d4ff', marginTop: '1rem' }}>
              — Panitia —
            </p>
          </div>
        </div>

        {/* Tournament Gallery */}
        <div className="gallery-grid">
          {[
            { type: 'img', src: import.meta.env.BASE_URL + 'images/tur1-1.jpeg', label: 'Moment 01', color: '#00d4ff' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/tur1-2.jpeg', label: 'Moment 02', color: '#a855f7' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/tur1-3.jpeg', label: 'Moment 03', color: '#ec4899' },
            { type: 'img', src: import.meta.env.BASE_URL + 'images/tur1-7.jpeg', label: 'Moment 04', color: '#ec4899' },
            { type: 'video', src: import.meta.env.BASE_URL + 'images/tur1-11.mp4', label: '🎬 Highlight', color: '#00d4ff' }
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

export default Turnamen;
