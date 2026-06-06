import React from 'react';

const Irtt = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '5rem', minHeight: '80vh' }}>
      
      {/* Header Section */}
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '2px' }}>
          ATURAN IRTT PTM BI
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#a0aec0', letterSpacing: '1px', maxWidth: '800px', margin: '0 auto' }}>
          Panduan lengkap mengenai Indonesian Table Tennis Rating (IRTT) dan sistem pertukaran poin
        </p>
      </section>

      {/* Content Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Definisi */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', borderTop: '4px solid #00d4ff' }}>
          <h2 style={{ color: '#00d4ff', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-book-open"></i> 1. Definisi
          </h2>
          
          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: 'rgba(0, 212, 255, 0.1)', borderBottom: '1px solid rgba(0, 212, 255, 0.3)' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#00d4ff', width: '30%' }}>Istilah</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#00d4ff' }}>Penjelasan</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '15px', color: 'white', fontWeight: 'bold' }}>Rating</td>
                  <td style={{ padding: '15px', color: '#cbd5e1' }}>Nilai kemampuan pemain (misalnya 1200, 1800, 2200)</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px', color: 'white', fontWeight: 'bold' }}>Ranking</td>
                  <td style={{ padding: '15px', color: '#cbd5e1' }}>Peringkat nasional berdasarkan hasil turnamen tertentu</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem' }}>Contoh:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {['Pemain A (2200)', 'Pemain B (1800)', 'Pemain C (1400)'].map((p, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: '#00d4ff', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>{p.split(' ')[0]} {p.split(' ')[1]}</div>
                <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 900, fontFamily: '"Orbitron", monospace' }}>{p.split(' ')[2].replace(/[()]/g, '')}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', borderRadius: '0 8px 8px 0', color: '#cbd5e1' }}>
            <i className="fa-solid fa-circle-info" style={{ color: '#10b981', marginRight: '10px' }}></i>
            Berdasarkan rating di atas, Pemain A diperkirakan lebih kuat daripada B dan C.
          </div>
        </div>

        {/* Cara Kerja */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', borderTop: '4px solid #f59e0b' }}>
          <h2 style={{ color: '#f59e0b', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-cogs"></i> 2. Cara Kerja Rating IRTT
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>Setelah setiap turnamen resmi, akan terjadi perhitungan poin sebagai berikut:</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { icon: 'fa-arrow-trend-up', color: '#10b981', text: 'Jika mengalahkan pemain yang ratingnya lebih tinggi → dapat banyak poin.' },
              { icon: 'fa-minus', color: '#3b82f6', text: 'Jika mengalahkan pemain yang ratingnya lebih rendah → dapat sedikit poin atau bahkan 0.' },
              { icon: 'fa-arrow-trend-down', color: '#f59e0b', text: 'Jika kalah dari pemain yang jauh lebih kuat → kehilangan sedikit poin.' },
              { icon: 'fa-angles-down', color: '#ef4444', text: 'Jika kalah dari pemain yang jauh lebih lemah → kehilangan banyak poin.' }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', border: `1px solid rgba(255,255,255,0.05)` }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `${item.color}20`, display: 'flex', justifyContent: 'center', alignItems: 'center', color: item.color, fontSize: '1.2rem' }}>
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <span style={{ color: 'white', flex: 1 }}>{item.text}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center', padding: '15px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', color: '#fcd34d', fontWeight: 'bold' }}>
            IRTT menggunakan sistem pertukaran poin (point exchange).
          </div>
        </div>

        {/* Tabel Perhitungan Poin */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', borderTop: '4px solid #a855f7' }}>
          <h2 style={{ color: '#a855f7', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-table"></i> 3. Tabel Perhitungan Poin IRTT
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>Berikut adalah sebagian tabel resmi pertukaran poin IRTT:</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: 'rgba(168, 85, 247, 0.1)', borderBottom: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <th style={{ padding: '15px', textAlign: 'center', color: '#a855f7' }}>Selisih Rating</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: '#10b981' }}>Jika Favorit Menang</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: '#f59e0b' }}>Jika Terjadi Upset (Kejutan)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { diff: '0 – 12', fav: 8, upset: 8 },
                  { diff: '13 – 37', fav: 7, upset: 10 },
                  { diff: '38 – 62', fav: 6, upset: 13 },
                  { diff: '63 – 87', fav: 5, upset: 16 },
                  { diff: '88 – 112', fav: 4, upset: 20 },
                  { diff: '113 – 137', fav: 3, upset: 25 },
                  { diff: '138 – 162', fav: 2, upset: 30 },
                  { diff: '163 – 187', fav: 2, upset: 35 },
                  { diff: '188 – 212', fav: 1, upset: 40 },
                  { diff: '213 – 237', fav: 1, upset: 45 },
                  { diff: '≥ 238', fav: 0, upset: 50 },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.3s', ':hover': { background: 'rgba(255,255,255,0.05)' } }}>
                    <td style={{ padding: '12px', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{row.diff}</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#cbd5e1' }}>{row.fav} poin</td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#cbd5e1' }}>{row.upset} poin</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contoh Perhitungan */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', borderTop: '4px solid #ec4899' }}>
          <h2 style={{ color: '#ec4899', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-calculator"></i> 4. Contoh Perhitungan
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Contoh 1 */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>Contoh 1: Hasil Normal</h3>
              <p style={{ color: '#9ca3af', marginBottom: '10px' }}>A (1800) vs B (1700) → <span style={{ color: 'white' }}>Selisih = 100</span></p>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '6px', color: '#10b981', fontWeight: 'bold', marginBottom: '15px' }}>
                Jika A (Favorit) menang:
              </div>
              <ul style={{ color: '#cbd5e1', marginBottom: '15px', paddingLeft: '20px' }}>
                <li>A mendapat <strong style={{ color: '#10b981' }}>+4</strong></li>
                <li>B kehilangan <strong style={{ color: '#ef4444' }}>-4</strong></li>
              </ul>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '8px' }}>Rating Baru:</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: 'white' }}>Pemain A</span>
                  <span style={{ color: '#00d4ff', fontWeight: 'bold', fontFamily: '"Orbitron"' }}>1804</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'white' }}>Pemain B</span>
                  <span style={{ color: '#00d4ff', fontWeight: 'bold', fontFamily: '"Orbitron"' }}>1696</span>
                </div>
              </div>
            </div>

            {/* Contoh 2 */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>Contoh 2: Upset (Kejutan)</h3>
              <p style={{ color: '#9ca3af', marginBottom: '10px' }}>A (1800) vs B (1700) → <span style={{ color: 'white' }}>Selisih = 100</span></p>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '6px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '15px' }}>
                Jika B (Underdog) menang:
              </div>
              <ul style={{ color: '#cbd5e1', marginBottom: '15px', paddingLeft: '20px' }}>
                <li>B mendapat <strong style={{ color: '#10b981' }}>+20</strong></li>
                <li>A kehilangan <strong style={{ color: '#ef4444' }}>-20</strong></li>
              </ul>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '8px' }}>Rating Baru:</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: 'white' }}>Pemain A</span>
                  <span style={{ color: '#00d4ff', fontWeight: 'bold', fontFamily: '"Orbitron"' }}>1780</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'white' }}>Pemain B</span>
                  <span style={{ color: '#00d4ff', fontWeight: 'bold', fontFamily: '"Orbitron"' }}>1720</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Kategori Rating */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', borderTop: '4px solid #10b981' }}>
          <h2 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-ranking-star"></i> 5. Kategori Rating IRTT
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>Berikut adalah perkiraan kemampuan pemain berdasarkan skala rating:</p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: 'rgba(16, 185, 129, 0.1)', borderBottom: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#10b981' }}>Rating</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#10b981' }}>Level Perkiraan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { r: '< 1000', l: 'Pemula' },
                  { r: '1000 – 1400', l: 'Menengah bawah' },
                  { r: '1400 – 1800', l: 'Menengah' },
                  { r: '1800 – 2200', l: 'Mahir' },
                  { r: '2200 – 2500', l: 'Expert' },
                  { r: '2500+', l: 'Elite Nasional' },
                  { r: '2700+', l: 'Kelas Dunia' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px', color: 'white', fontWeight: 'bold', fontFamily: '"Orbitron"' }}>{row.r}</td>
                    <td style={{ padding: '15px', color: '#cbd5e1' }}>{row.l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mengapa Sistem IRTT */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', borderTop: '4px solid #3b82f6' }}>
          <h2 style={{ color: '#3b82f6', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-circle-question"></i> 6. Mengapa Menggunakan Sistem IRTT?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
              <i className="fa-solid fa-lightbulb" style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '15px' }}></i>
              <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>Mudah Dipahami</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Aturan pertukaran poin sangat jelas dan dapat dikalkulasi dengan cepat.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
              <i className="fa-solid fa-arrow-up-right-dots" style={{ fontSize: '2rem', color: '#10b981', marginBottom: '15px' }}></i>
              <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>Cepat Mencerminkan Kemampuan</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Kemajuan dan penurunan level bermain langsung terlihat dari fluktuasi poin.</p>
            </div>
          </div>

          <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '20px', borderRadius: '0 12px 12px 0' }}>
            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '10px' }}>Kategori Turnamen yang Setara</h3>
            <p style={{ color: '#cbd5e1', marginBottom: '15px' }}>Dengan adanya IRTT, penyelenggara turnamen dapat membuat kategori berdasarkan batasan rating, misalnya:</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
              {['Under 1200', 'Under 1500', 'Under 1800', 'Under 2200'].map((cat, i) => (
                <span key={i} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(59,130,246,0.3)', padding: '5px 15px', borderRadius: '50px', color: '#00d4ff', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {cat}
                </span>
              ))}
            </div>
            <p style={{ color: 'white', fontWeight: 'bold' }}>
              <i className="fa-solid fa-check" style={{ color: '#10b981', marginRight: '10px' }}></i>
              Sehingga pemain bertanding dengan lawan yang relatif setara.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Irtt;
