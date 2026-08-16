import React from 'react';

const medals = {
  gold: { emoji: '🥇', color: '#fbbf24', label: 'Juara 1' },
  silver: { emoji: '🥈', color: '#cbd5e1', label: 'Peringkat 2' },
  bronze: { emoji: '🥉', color: '#fb923c', label: 'Peringkat 3' },
  fourth: { emoji: '🏅', color: '#f9a8d4', label: 'Peringkat 4' }
};

const podiumStyles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem'
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  emoji: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '0.75rem'
  },
  label: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.75rem'
  },
  name: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 700,
    fontFamily: '"Space Grotesk", sans-serif'
  }
};

const winners = [
  { key: 'gold', pair: 'Shofi / Zen' },
  { key: 'silver', pair: 'Kusigit / Teguh' },
  { key: 'bronze', pair: 'Andrie / Sinambela' },
  { key: 'fourth', pair: 'Wisnu / Boybul' }
];

const mixedWinners = [
  { key: 'gold', pair: 'Teguh / Evi' },
  { key: 'silver', pair: 'Wisnu / Rinie' }
];

const TurnamenGanda = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '80vh', paddingBottom: '5rem' }}>

      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '2px' }}>
          SELAMAT KEPADA PEMENANG
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#a0aec0', letterSpacing: '1px', maxWidth: '800px', margin: '0 auto' }}>
          Turnamen Tenis Meja Ganda HUT Kemerdekaan RI – Agustus 2026
        </p>
      </section>

      <article className="glass" style={{ padding: '2.5rem', marginBottom: '3rem', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
            <i className="fa-solid fa-trophy" style={{ marginRight: '0.25rem' }}></i> Turnamen Ganda
          </span>
          <span style={{ fontSize: '0.875rem', color: '#9ca3af', fontFamily: 'monospace' }}>
            <i className="fa-solid fa-calendar-day" style={{ marginRight: '0.25rem' }}></i> Agustus 2026
          </span>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', fontFamily: '"Space Grotesk", sans-serif' }}>
          Terima Kasih & Apresiasi
        </h2>

        <div style={{ height: '0.25rem', width: '5rem', background: 'linear-gradient(to right, #06b6d4, #9333ea)', marginBottom: '2rem' }}></div>

        <div style={{ color: '#d1d5db', lineHeight: 1.9, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ textAlign: 'justify' }}>
            Alhamdulillah, puji syukur kita panjatkan kepada Tuhan Yang Maha Esa karena rangkaian Turnamen Tenis Meja Double HUT Kemerdekaan RI – Agustus 2026 telah terlaksana dengan sukses, lancar, dan penuh semangat kebersamaan.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Kami mengucapkan terima kasih yang sebesar-besarnya kepada teman-teman panitia yang telah meluangkan waktu, tenaga, pikiran, dan kebersamaannya sehingga turnamen ini dapat berjalan dengan baik.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Kami juga menyampaikan permohonan maaf atas segala kekurangan selama pelaksanaan, khususnya terkait pengaturan dan ketepatan jam pertandingan yang mungkin masih membuat beberapa peserta harus menunggu. Hal ini tentu menjadi bahan evaluasi bagi kami agar pelaksanaan turnamen berikutnya dapat lebih tertib, tepat waktu, dan semakin baik.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Tidak lupa, terima kasih kepada seluruh teman-teman peserta yang telah ikut berpartisipasi, menjunjung tinggi sportivitas, dan membuat suasana turnamen menjadi meriah serta penuh keakraban. Kemenangan dan kekalahan adalah bagian dari pertandingan, tetapi kebersamaan dan silaturahmi adalah tujuan utama kita.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', textAlign: 'center', marginTop: '0.5rem', fontFamily: '"Space Grotesk", sans-serif' }}>
            🏆 SELAMAT KEPADA PARA PEMENANG 🏆
          </h2>

          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00d4ff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-person" style={{ fontSize: '1.1rem' }}></i> Ganda Putra
            </h3>
            <div style={podiumStyles.container}>
              {winners.map(w => {
                const m = medals[w.key];
                return (
                  <div
                    key={w.key}
                    style={podiumStyles.card}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${m.color}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <span style={podiumStyles.emoji}>{m.emoji}</span>
                    <span style={{ ...podiumStyles.label, background: `${m.color}20`, color: m.color, border: `1px solid ${m.color}40` }}>
                      {m.label}
                    </span>
                    <div style={podiumStyles.name}>{w.pair}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#cbd5e1' }}>8 Besar:</div>
              {['Sobari / Edy', 'Greg / Heriko'].map(name => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontSize: '1.05rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>👏</span> {name}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1f2937', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ec4899', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-people-arrows" style={{ fontSize: '1.1rem' }}></i> Ganda Campuran
            </h3>
            <div style={podiumStyles.container}>
              {mixedWinners.map(w => {
                const m = medals[w.key];
                return (
                  <div
                    key={w.key}
                    style={podiumStyles.card}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${m.color}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <span style={podiumStyles.emoji}>{m.emoji}</span>
                    <span style={{ ...podiumStyles.label, background: `${m.color}20`, color: m.color, border: `1px solid ${m.color}40` }}>
                      {m.label}
                    </span>
                    <div style={podiumStyles.name}>{w.pair}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.25)', padding: '1.5rem', borderRadius: '12px', marginTop: '1rem' }}>
            <p style={{ textAlign: 'justify', marginBottom: '0.75rem' }}>
              Selamat kepada seluruh pemenang! Semoga prestasi ini menjadi motivasi untuk terus berkembang dan semakin semangat berlatih.
            </p>
            <p style={{ textAlign: 'justify' }}>
              Dan bagi teman-teman yang belum berkesempatan menjadi juara, tetap semangat. Yang terpenting adalah sudah berani bertanding, menikmati permainan, menjaga sportivitas, dan ikut meramaikan kebersamaan kita.
            </p>
          </div>

          <p style={{ textAlign: 'justify' }}>
            Sekali lagi, terima kasih untuk panitia dan seluruh peserta atas dukungan dan partisipasinya.
          </p>

          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', fontFamily: '"Space Grotesk", sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span>🇮🇩</span>
              <span className="neon-cyan">Dirgahayu Kemerdekaan Republik Indonesia!</span>
              <span>🇮🇩</span>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#22d3ee', fontWeight: 600 }}>
            Sampai bertemu di turnamen berikutnya dengan semangat, kebersamaan, dan pertandingan yang tentunya semakin seru!
          </p>
        </div>
      </article>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="neon-purple" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>
          <i className="fa-solid fa-camera" style={{ marginRight: '0.5rem' }}></i> Galeri Foto
        </h2>
        <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { src: 'tganda_juara_all.jpeg', alt: 'Foto bersama seluruh pemenang' },
            { src: 'tganda_juara_all2.jpeg', alt: 'Foto bersama seluruh pemenang 2' },
            { src: 'tganda_juara1.jpeg', alt: 'Juara 1 Ganda Putra - Shofi / Zen' },
            { src: 'tganda_juara2.jpeg', alt: 'Peringkat 2 Ganda Putra - Kusigit / Teguh' },
            { src: 'tganda_juara3.jpeg', alt: 'Peringkat 3 Ganda Putra - Andrie / Sinambela' },
            { src: 'tganda_juara4.jpeg', alt: 'Peringkat 4 Ganda Putra - Wisnu / Boybul' },
            { src: 'tganda_8_besar.jpeg', alt: 'Peserta 8 Besar Ganda Putra' },
            { src: 'tganda_juara1_mix.jpeg', alt: 'Peringkat 1 Ganda Campuran - Teguh / Evi' },
            { src: 'tganda_juara2_mix.jpeg', alt: 'Peringkat 2 Ganda Campuran - Wisnu / Rinie' },
            { src: 'tganda_panitia1.jpeg', alt: 'Foto bersama panitia turnamen' }
          ].map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={`${import.meta.env.BASE_URL}images/${img.src}`} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay">
                <span style={{ color: 'white', fontWeight: 600, padding: '0.5rem 1rem', textAlign: 'center' }}>{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TurnamenGanda;