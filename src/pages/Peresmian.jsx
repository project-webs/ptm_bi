import React from 'react';

const Peresmian = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh' }}>
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
          PERESMIAN
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#a0aec0', letterSpacing: '2px' }}>
          TEMPAT LATIHAN BARU PTM BATAN INDAH - MEI 2026
        </p>
      </section>

      <article className="glass p-8 md:p-12 mb-10 max-w-4xl mx-auto" style={{ padding: '3rem', marginBottom: '3rem', maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span style={{ 
            display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px',
            background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)' 
          }}>
            <i className="fa-solid fa-building-circle-check" style={{ marginRight: '0.25rem' }}></i> Peresmian
          </span>
          <span style={{ fontSize: '0.875rem', color: '#9ca3af', fontFamily: 'monospace' }}>
            <i className="fa-solid fa-calendar-day" style={{ marginRight: '0.25rem' }}></i> Mei 2026
          </span>
        </div>
        
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', fontFamily: '"Space Grotesk", sans-serif' }}>
          Peresmian Tempat Latihan Baru PTM Batan Indah
        </h2>
        
        <div style={{ height: '0.25rem', width: '5rem', background: 'linear-gradient(to right, #06b6d4, #9333ea)', marginBottom: '2rem' }}></div>

        <div style={{ color: '#d1d5db', lineHeight: 1.8, fontSize: '1.125rem', textAlign: 'justify', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Alhamdulillah, dengan penuh rasa syukur kami panitia PTM Batan Indah telah berhasil mewujudkan dan meresmikan
            tempat latihan baru yang diharapkan menjadi pusat pembinaan, olahraga, dan silaturahmi bagi warga Batan Indah.
          </p>

          <p>
            Acara Peresmian ini menjadi momen yang istimewa dengan kehadiran para tokoh masyarakat, di antaranya Lurah,
            Ketua RW, para Ketua RT, tokoh masyarakat, serta warga Batan Indah yang telah memberikan dukungan dan
            partisipasi sejak awal pembangunan hingga peresmian.
          </p>

          <p>
            Kami mengucapkan terima kasih yang sebesar-besarnya kepada seluruh pihak yang telah membantu, baik dalam
            bentuk tenaga, pemikiran, fasilitas, maupun dukungan moril dan materiil. Kebersamaan dan semangat gotong
            royong inilah yang menjadi kunci terwujudnya tempat latihan baru PTM Batan Indah.
          </p>

          <p>Dengan hadirnya fasilitas ini, kami berharap dapat:</p>
          
          <div style={{ background: '#111633', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #1f2937', margin: '2rem 0' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 600 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#22d3ee' }}>
                <i className="fa-solid fa-check" style={{ fontSize: '1.25rem' }}></i> 
                <span>Menjadi sarana olahraga yang sehat dan positif bagi warga.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#c084fc' }}>
                <i className="fa-solid fa-check" style={{ fontSize: '1.25rem' }}></i>
                <span>Mempererat persaudaraan dan kebersamaan antarwarga.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f472b6' }}>
                <i className="fa-solid fa-check" style={{ fontSize: '1.25rem' }}></i> 
                <span>Menjadi wadah pembinaan generasi muda melalui kegiatan olahraga yang terarah.</span>
              </li>
            </ul>
          </div>

          <p>
            Semoga tempat latihan baru PTM Batan Indah ini dapat memberikan manfaat yang berkelanjutan bagi masyarakat
            serta menjadi kebanggaan bersama bagi seluruh warga Batan Indah.
          </p>

          <br />
          <p style={{ fontStyle: 'italic', textAlign: 'right', color: '#22d3ee', fontWeight: 600 }}>
            Panitia PTM Batan Indah<br/>
            Peresmian Tempat Latihan Baru PTM Batan Indah<br/>
            Tahun 2026
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #1f2937' }}>
          {[11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => {
            const numStr = num.toString().padStart(2, '0');
            return (
              <div key={num} style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/9', border: '1px solid rgba(0, 212, 255, 0.3)', cursor: 'pointer' }}>
                <img 
                  src={`${import.meta.env.BASE_URL}images/opening${numStr}.jpeg`} 
                  alt={`Opening ${numStr}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            );
          })}
        </div>
      </article>
    </div>
  );
};

export default Peresmian;
