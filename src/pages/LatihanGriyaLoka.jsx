const galleryItems = [
  { type: 'img', src: 'latihan_griya_1.jpeg', label: 'Momen 01' },
  { type: 'img', src: 'latihan_griya_2.jpeg', label: 'Momen 02' },
  { type: 'img', src: 'latihan_griya_3.jpeg', label: 'Momen 03' },
  { type: 'img', src: 'latihan_griya_4.jpeg', label: 'Momen 04' },
  { type: 'img', src: 'latihan_griya_5.jpeg', label: 'Momen 05' },
  { type: 'img', src: 'latihan_griya_6.jpeg', label: 'Momen 06' },
  { type: 'img', src: 'latihan_griya_7.jpeg', label: 'Momen 07' },
  { type: 'video', src: 'latihan_griya.mp4', poster: 'latihan_griya_poster.jpg', label: '🎬 Video Latihan Bersama' }
];

const LatihanGriyaLoka = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '80vh', paddingBottom: '5rem' }}>
      <article className="glass" style={{ padding: '2.5rem', marginBottom: '3rem', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
            <i className="fa-solid fa-table-tennis-paddle-ball" style={{ marginRight: '0.25rem' }}></i> Berita
          </span>
          <span style={{ fontSize: '0.875rem', color: '#9ca3af', fontFamily: 'monospace' }}>
            <i className="fa-solid fa-calendar-day" style={{ marginRight: '0.25rem' }}></i> September 2026
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', marginBottom: '1.5rem', fontFamily: '"Space Grotesk", sans-serif', lineHeight: 1.3 }}>
          Latihan Bersama PTM Batan Indah dan PTM Griya Loka: Silaturahmi, Sportivitas, dan Kebersamaan
        </h1>

        <div style={{ height: '0.25rem', width: '5rem', background: 'linear-gradient(to right, #06b6d4, #9333ea)', marginBottom: '2rem' }}></div>

        <div style={{ color: '#d1d5db', lineHeight: 1.9, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ textAlign: 'justify' }}>
            <strong style={{ color: 'white' }}>Batan Indah</strong> — Dalam rangka mempererat tali silaturahmi sekaligus meningkatkan semangat kebersamaan antarpecinta tenis meja, PTM Batan Indah berkesempatan mengikuti kegiatan <strong style={{ color: '#00d4ff' }}>Latihan Bersama PTM Griya Loka</strong>.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Kegiatan latihan bersama ini berlangsung dalam suasana yang penuh keakraban, meriah, dan seru. Pertandingan demi pertandingan menjadi semakin menarik dengan semangat sportivitas, canda tawa, serta dukungan dari para pemain yang hadir.
          </p>

          <p style={{ textAlign: 'justify' }}>
            PTM Batan Indah menyampaikan ucapan terima kasih dan apresiasi yang sebesar-besarnya kepada keluarga besar PTM Griya Loka yang telah mengundang dan menerima kedatangan PTM Batan Indah dengan penuh kehangatan.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Sambutan yang ramah serta jamuan yang telah disiapkan oleh PTM Griya Loka membuat seluruh anggota PTM Batan Indah merasa sangat dihargai dan diterima sebagai bagian dari keluarga besar tenis meja.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Ucapan terima kasih secara khusus disampaikan kepada <strong style={{ color: 'white' }}>Ketua PTM Griya Loka, Bapak Rudi Setiawan</strong>, serta <strong style={{ color: 'white' }}>Humas PTM Griya Loka, Bapak Donny</strong>, atas inisiasi dan upayanya sehingga kegiatan latihan bersama ini dapat terlaksana dengan baik.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Lebih dari sekadar latihan dan pertandingan, kegiatan ini menjadi momentum untuk mempererat persaudaraan, memperluas silaturahmi, serta membangun kebersamaan antar-PTM. Semoga hubungan baik antara PTM Batan Indah dan PTM Griya Loka dapat terus terjalin dan semakin erat di masa yang akan datang.
          </p>

          <p style={{ textAlign: 'justify' }}>
            Semoga kegiatan seperti ini dapat terus dilaksanakan secara rutin sebagai wadah untuk berolahraga, meningkatkan kemampuan, sekaligus mempererat persahabatan dan kekeluargaan di antara para pecinta tenis meja.
          </p>

          <div style={{ background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.25)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontWeight: 700, color: 'white' }}>
              Terima kasih PTM Griya Loka!
            </p>
          </div>

          <p style={{ textAlign: 'center', fontWeight: 700, color: '#00d4ff', fontSize: '1.15rem' }}>
            Salam olahraga, salam silaturahmi, dan tetap semangat! 🏓
          </p>

          <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
            <p style={{ fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>Ketua PTM Batan Indah</p>
            <p style={{ fontWeight: 700, color: '#00d4ff' }}>Kussigit Santosa</p>
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

export default LatihanGriyaLoka;