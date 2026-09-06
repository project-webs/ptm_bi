import { Link } from 'react-router-dom';

const beritaList = [
  {
    to: '/turnamen-ganda-hut-2026',
    icon: 'fa-solid fa-medal',
    title: 'Turnamen Ganda, HUT Kemerdekaan Agustus 2026',
    desc: 'Selamat kepada para pemenang Turnamen Tenis Meja Ganda HUT RI – Agustus 2026.'
  },
  {
    to: '/latihan-griya-loka',
    icon: 'fa-solid fa-handshake',
    title: 'Latihan Bersama PTM Griya Loka BSD',
    desc: 'Latihan bersama PTM Batan Indah dan PTM Griya Loka, pererat silaturahmi dan semangat kebersamaan.'
  },
  {
    to: '/peresmian',
    icon: 'fa-solid fa-building-circle-check',
    title: 'Peresmian Tempat Latihan Baru',
    desc: 'Acara peresmian venue baru PTM Batan Indah pada Mei 2026.'
  },
  {
    to: '/turnamen',
    icon: 'fa-solid fa-trophy',
    title: 'Juara Turnamen Double - Feb 2026',
    desc: 'Informasi mengenai turnamen double internal yang diadakan pada Februari 2026.'
  }
];

const Berita = () => {
  return (
    <section className="scroll-reveal visible" style={{ marginTop: '100px', minHeight: '60vh' }}>
      <div className="section-title neon-purple">Berita & Informasi</div>
      <p className="section-subtitle">Update terbaru seputar PTM Batan Indah</p>

      <div className="card-grid">
        {beritaList.map((item, i) => (
          <Link key={i} to={item.to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card">
              <div className="card-content">
                <div className="card-icon"><i className={item.icon}></i></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Berita;