import React from 'react';

const Venue = () => {
  return (
    <section className="scroll-reveal visible" style={{ marginTop: '100px', minHeight: '60vh' }}>
      <div className="section-title neon-cyan">New Venue</div>
      <p className="section-subtitle">Alhamdulillah, Minggu, 26 April 2026, Lapangan baru PTM BI sudah bisa digunakan</p>

      <div className="glass" style={{ 
        padding: '2.5rem', 
        marginTop: '3rem', 
        marginBottom: '3rem', 
        lineHeight: '1.8', 
        textAlign: 'justify', 
        maxWidth: '1000px', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        borderLeft: '5px solid #00d4ff' 
      }}>
        <p style={{ marginBottom: '1.5rem', color: '#e0e7ff', fontSize: '1.1rem' }}>
          Kami memanjatkan puji dan syukur ke hadirat Allah SWT atas segala rahmat dan karunia-Nya, sehingga tempat latihan baru ini dapat terwujud dengan baik. Kehadiran venue ini menjadi langkah baru dalam perjalanan kami untuk terus berkembang, berlatih, dan meraih prestasi yang lebih baik.
        </p>
        <p style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>
          Tempat ini bukan sekadar ruang latihan, tetapi juga menjadi wadah kebersamaan, semangat, dan perjuangan. Kami berharap dengan adanya venue baru ini, seluruh anggota dapat berlatih dengan lebih nyaman, fokus, dan maksimal.
        </p>
        <p style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>
          Kami juga mengucapkan terima kasih yang sebesar-besarnya kepada semua pihak yang telah membantu, baik secara tenaga, pikiran, maupun materi. Tanpa dukungan dan kontribusi dari berbagai pihak, terwujudnya tempat ini tentu tidak akan semudah ini.
        </p>
      </div>
    </section>
  );
};

export default Venue;
