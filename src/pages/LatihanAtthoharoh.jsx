const galleryItems = [
  { type: 'img', src: 'latihan_atthoharoh_1.jpeg', label: 'Momen 01' },
  { type: 'img', src: 'latihan_atthoharoh_2.jpeg', label: 'Momen 02' },
  { type: 'img', src: 'latihan_atthoharoh_3.jpeg', label: 'Momen 03' },
  { type: 'img', src: 'latihan_atthoharoh_4.jpeg', label: 'Momen 04' },
  { type: 'video', src: 'latihan_atthoharoh.mp4', poster: 'latihan_atthoharoh_poster.jpg', label: '🎬 Video Latihan Bersama' }
];

const LatihanAtthoharoh = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '80vh', paddingBottom: '5rem' }}>
      <article className="glass" style={{ padding: '2.5rem', marginBottom: '3rem', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
            <i className="fa-solid fa-table-tennis-paddle-ball" style={{ marginRight: '0.25rem' }}></i> Berita
          </span>
          <span style={{ fontSize: '0.875rem', color: '#9ca3af', fontFamily: 'monospace' }}>
            <i className="fa-solid fa-calendar-day" style={{ marginRight: '0.25rem' }}></i> Jumat, 9 Oktober 2026
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', marginBottom: '1.5rem', fontFamily: '"Space Grotesk", sans-serif', lineHeight: 1.3 }}>
          Ucapan Terima Kasih atas Terlaksananya Latihan Bersama PTM Batan Indah &amp; PTM Atthoharoh
        </h1>

        <div style={{ height: '0.25rem', width: '5rem', background: 'linear-gradient(to right, #06b6d4, #9333ea)', marginBottom: '2rem' }}></div>

        <div style={{ color: '#d1d5db', lineHeight: 1.9, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ textAlign: 'justify' }}>
            <strong style={{ color: 'white' }}>Alhamdulillah, Latihan Bersama (Latber) PTM Batan Indah dengan PTM Atthoharoh pada Jumat, 9 Oktober 2026, telah terlaksana dengan baik dan lancar.</strong>
          </p>

          <p style={{ textAlign: 'justify' }}>
            Kegiatan ini bukan sekadar ajang berlatih tenis meja, tetapi juga menjadi sarana mempererat tali silaturahmi, membangun kebersamaan, serta menumbuhkan semangat berolahraga dan berprestasi.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Kami mengucapkan <strong style={{ color: 'white' }}>terima kasih yang sebesar-besarnya kepada seluruh pihak yang telah mendukung dan menyukseskan kegiatan ini.</strong>
          </p>

          <h3 style={{ color: 'white', fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.35rem', fontWeight: 700, marginTop: '1rem' }}>
            🙏 Terima Kasih kepada Pengurus PTM Batan Indah
          </h3>

          <p style={{ textAlign: 'justify' }}>
            Apresiasi dan terima kasih kami sampaikan kepada:
          </p>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.5rem', listStyle: 'none' }}>
            <li><i className="fa-solid fa-circle-check" style={{ color: '#00d4ff', marginRight: '0.5rem' }}></i><strong style={{ color: 'white' }}>Bapak Kussigit</strong> selaku Ketua PTM Batan Indah.</li>
            <li><i className="fa-solid fa-circle-check" style={{ color: '#00d4ff', marginRight: '0.5rem' }}></i><strong style={{ color: 'white' }}>Bapak Agus Cahyono</strong> selaku Bendahara Umum PTM Batan Indah.</li>
            <li><i className="fa-solid fa-circle-check" style={{ color: '#00d4ff', marginRight: '0.5rem' }}></i><strong style={{ color: 'white' }}>Ibu Asih Nariastuti</strong> atas dukungan dan kontribusinya dalam kegiatan ini.</li>
            <li><i className="fa-solid fa-circle-check" style={{ color: '#00d4ff', marginRight: '0.5rem' }}></i><strong style={{ color: 'white' }}>Coach Teguh</strong> selaku Pelatih PTM Batan Indah.</li>
          </ul>

          <p style={{ textAlign: 'justify' }}>
            Terima kasih atas dukungan, perhatian, dan peran aktif pengurus dalam mendorong terselenggaranya kegiatan Latihan Bersama ini.
          </p>

          <h3 style={{ color: 'white', fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.35rem', fontWeight: 700, marginTop: '1rem' }}>
            🤝 Terima Kasih kepada Tim Pendukung Acara
          </h3>

          <p style={{ textAlign: 'justify' }}>
            Ucapan terima kasih secara khusus kami sampaikan kepada:
          </p>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.5rem', listStyle: 'none' }}>
            <li><i className="fa-solid fa-circle-check" style={{ color: '#00d4ff', marginRight: '0.5rem' }}></i><strong style={{ color: 'white' }}>Bapak Prof Wisnu</strong></li>
            <li><i className="fa-solid fa-circle-check" style={{ color: '#00d4ff', marginRight: '0.5rem' }}></i><strong style={{ color: 'white' }}>Ibu Hj. Rini Setramedja</strong></li>
            <li><i className="fa-solid fa-circle-check" style={{ color: '#00d4ff', marginRight: '0.5rem' }}></i><strong style={{ color: 'white' }}>Mas Koco Restu</strong></li>
          </ul>

          <p style={{ textAlign: 'justify' }}>
            yang telah menyediakan konsumsi sehingga kebutuhan peserta selama kegiatan dapat terpenuhi dengan baik.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Kami juga mengucapkan terima kasih kepada seluruh pihak yang telah membantu, mendukung, dan meluangkan waktu serta tenaga demi kelancaran acara ini, yang tidak dapat kami sebutkan satu per satu.
          </p>

          <p style={{ textAlign: 'justify' }}>
            <strong style={{ color: 'white' }}>Semoga setiap kebaikan, bantuan, dan waktu yang telah diberikan menjadi amal kebaikan dan mendapatkan balasan terbaik dari Allah Subhanahu wa Ta'ala. Aamiin.</strong>
          </p>

          <h3 style={{ color: 'white', fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.35rem', fontWeight: 700, marginTop: '1rem' }}>
            🏓 Terima Kasih kepada Keluarga Besar PTM Atthoharoh
          </h3>

          <p style={{ textAlign: 'justify' }}>
            Terima kasih kami sampaikan kepada <strong style={{ color: 'white' }}>Bapak Taufik beserta seluruh teman-teman dari PTM Atthoharoh</strong> yang telah berkenan hadir dan berpartisipasi dalam kegiatan Latihan Bersama ini.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Kehadiran dan antusiasme teman-teman PTM Atthoharoh menjadikan kegiatan ini lebih bermakna, penuh keakraban, dan membawa semangat positif bagi kita semua.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Semoga silaturahmi yang telah terjalin semakin erat, persahabatan semakin kuat, dan kerja sama antarklub tenis meja dapat terus berlanjut melalui kegiatan-kegiatan positif berikutnya.
          </p>

          <h3 style={{ color: 'white', fontFamily: '"Space Grotesk", sans-serif', fontSize: '1.35rem', fontWeight: 700, marginTop: '1rem' }}>
            ❤️ Kebersamaan yang Lebih Berharga daripada Kemenangan
          </h3>

          <p style={{ textAlign: 'justify' }}>
            Bagi kami, Latihan Bersama bukan semata-mata tentang siapa yang menang atau kalah di meja pertandingan. Lebih dari itu, kegiatan ini adalah tentang <strong style={{ color: 'white' }}>kebersamaan, persaudaraan, kesehatan, dan semangat untuk terus berkembang bersama.</strong>
          </p>

          <p style={{ textAlign: 'justify' }}>
            Semoga semangat ini senantiasa terjaga dan menjadi motivasi bagi kita semua untuk terus berlatih, menjaga kesehatan, serta meningkatkan prestasi tanpa melupakan nilai sportivitas dan persahabatan.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Akhir kata, kami memohon maaf apabila dalam pelaksanaan kegiatan ini masih terdapat kekurangan, baik dalam penyambutan, penyajian, maupun hal-hal lainnya.
          </p>

          <div style={{ background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.25)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontWeight: 700, color: 'white' }}>
              Terima kasih atas kebersamaan dan dukungan semua pihak. Sampai bertemu kembali di Latihan Bersama berikutnya!
            </p>
          </div>

          <p style={{ textAlign: 'center', fontWeight: 700, color: '#00d4ff', fontSize: '1.15rem' }}>
            Salam olahraga! 🏓
          </p>

          <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
            <p style={{ fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>PTM Batan Indah</p>
            <p style={{ fontStyle: 'italic', color: '#00d4ff' }}>Berlatih • Sehat • Berprestasi</p>
          </div>
        </div>
      </article>

      <section style={{ marginBottom: '3rem' }}>
        <h2 className="neon-purple" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>
          <i className="fa-solid fa-camera" style={{ marginRight: '0.5rem' }}></i> Galeri Foto & Video
        </h2>
        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div className="gallery-item" key={i}>
              {item.type === 'img' ? (
                <img src={`${import.meta.env.BASE_URL}images/${item.src}`} alt={item.label} loading="lazy" />
              ) : (
                <video controls preload="metadata" playsInline poster={`${import.meta.env.BASE_URL}images/${item.poster}`}>
                  <source src={`${import.meta.env.BASE_URL}images/${item.src}`} type="video/mp4" />
                </video>
              )}
              <div className="gallery-overlay">
                <span style={{ color: 'white', fontWeight: 600, padding: '0.5rem 1rem', textAlign: 'center' }}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LatihanAtthoharoh;
