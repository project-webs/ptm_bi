import React from 'react';
import './Pengurus.css';

const Pengurus = () => {
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh', paddingBottom: '5rem' }}>
      {/* Page Title Banner */}
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
          PENGURUS PTM BI
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#a0aec0', letterSpacing: '2px' }}>
          SUSUNAN PENGURUS PERSATUAN TENIS MEJA BATAN INDAH
        </p>
      </section>

      {/* PEMBINA (Advisor) Section */}
      <section style={{ marginBottom: '0' }}>
        <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
          <i className="fa-solid fa-award text-2xl text-cyan-400" style={{ fontSize: '1.5rem', color: '#22d3ee' }}></i>
          <h2 className="text-xl font-bold tracking-wider font-orbitron text-cyan-400" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.05em', fontFamily: '"Orbitron", monospace', color: '#22d3ee' }}>
            PEMBINA
          </h2>
        </div>
        <div className="flex justify-center" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="p-card glass w-full max-w-lg p-6 rounded-2xl" style={{ width: '100%', maxWidth: '32rem', padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-center gap-5" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="icon-box bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-2xl" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#22d3ee', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-landmark"></i>
              </div>
              <div>
                <span className="sec-badge bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#22d3ee' }}>
                  Pembina Utama
                </span>
                <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', letterSpacing: '0.025em' }}>
                  Ketua RW 04 Batan Indah
                </h3>
                <p className="text-gray-400 text-sm mt-0.5" style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.125rem' }}>
                  Penasihat & Pelindung Komunitas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PENGURUS HARIAN (Executive Board) Section */}
      <section style={{ marginBottom: '0', marginTop: '-2rem' }}>
        <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
          <i className="fa-solid fa-users-line text-2xl text-purple-400" style={{ fontSize: '1.5rem', color: '#c084fc' }}></i>
          <h2 className="text-xl font-bold tracking-wider font-orbitron text-purple-400" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.05em', fontFamily: '"Orbitron", monospace', color: '#c084fc' }}>
            PENGURUS HARIAN
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Ketua */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-center gap-5" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="icon-box bg-purple-500/10 border border-purple-500/30 text-purple-400 text-2xl" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <span className="sec-badge bg-purple-500/10 border border-purple-500/30 text-purple-400" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>Ketua</span>
                <h3 className="text-lg font-bold text-white" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Kussigit Santosa</h3>
                <p className="text-gray-400 text-xs mt-0.5" style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.125rem' }}>Pemimpin PTM BI</p>
              </div>
            </div>
          </div>

          {/* Wakil Ketua */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-center gap-5" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="icon-box bg-purple-500/10 border border-purple-500/30 text-purple-400 text-2xl" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <span className="sec-badge bg-purple-500/10 border border-purple-500/30 text-purple-400" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>Wakil Ketua</span>
                <h3 className="text-lg font-bold text-white" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Asih Nariastuti</h3>
                <p className="text-gray-400 text-xs mt-0.5" style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.125rem' }}>Wakil Pemimpin PTM BI</p>
              </div>
            </div>
          </div>

          {/* Sekretaris 1 */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-center gap-5" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="icon-box bg-purple-500/10 border border-purple-500/30 text-purple-400 text-2xl" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-file-signature"></i>
              </div>
              <div>
                <span className="sec-badge bg-purple-500/10 border border-purple-500/30 text-purple-400" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>Sekretaris 1</span>
                <h3 className="text-lg font-bold text-white" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Azis Azmi</h3>
                <p className="text-gray-400 text-xs mt-0.5" style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.125rem' }}>Administrasi & Pencatatan</p>
              </div>
            </div>
          </div>

          {/* Sekretaris 2 */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-center gap-5" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="icon-box bg-purple-500/10 border border-purple-500/30 text-purple-400 text-2xl" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-file-signature"></i>
              </div>
              <div>
                <span className="sec-badge bg-purple-500/10 border border-purple-500/30 text-purple-400" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>Sekretaris 2</span>
                <h3 className="text-lg font-bold text-white" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Anna Rosalina</h3>
                <p className="text-gray-400 text-xs mt-0.5" style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.125rem' }}>Administrasi Pendukung</p>
              </div>
            </div>
          </div>

          {/* Bendahara 1 */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-center gap-5" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="icon-box bg-purple-500/10 border border-purple-500/30 text-purple-400 text-2xl" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-wallet"></i>
              </div>
              <div>
                <span className="sec-badge bg-purple-500/10 border border-purple-500/30 text-purple-400" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>Bendahara 1</span>
                <h3 className="text-lg font-bold text-white" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Agus Cahyono</h3>
                <p className="text-gray-400 text-xs mt-0.5" style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.125rem' }}>Keuangan & Kas Utama</p>
              </div>
            </div>
          </div>

          {/* Bendahara 2 */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-center gap-5" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="icon-box bg-purple-500/10 border border-purple-500/30 text-purple-400 text-2xl" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-wallet"></i>
              </div>
              <div>
                <span className="sec-badge bg-purple-500/10 border border-purple-500/30 text-purple-400" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#c084fc' }}>Bendahara 2</span>
                <h3 className="text-lg font-bold text-white" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Patlina</h3>
                <p className="text-gray-400 text-xs mt-0.5" style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.125rem' }}>Keuangan & Pembukuan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEKSI-SEKSI (Divisions) Section */}
      <section style={{ marginTop: '-2rem' }}>
        <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
          <i className="fa-solid fa-sitemap text-2xl text-pink-400" style={{ fontSize: '1.5rem', color: '#f472b6' }}></i>
          <h2 className="text-xl font-bold tracking-wider font-orbitron text-pink-400" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.05em', fontFamily: '"Orbitron", monospace', color: '#f472b6' }}>
            SEKSI-SEKSI
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
          
          {/* Seksi Pertandingan */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-start gap-5" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <div className="icon-box bg-pink-500/10 border border-pink-500/30 text-pink-400 text-2xl mt-1" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', fontSize: '1.5rem', marginTop: '0.25rem' }}>
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div>
                <span className="sec-badge bg-pink-500/10 border border-pink-500/30 text-pink-400" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6' }}>Seksi Pertandingan</span>
                <ul className="text-gray-200 mt-2 space-y-1" style={{ listStyle: 'none', color: '#e5e7eb', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Muhammad Zen</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Marsono</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seksi Perlengkapan dan Dokumentasi */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-start gap-5" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <div className="icon-box bg-pink-500/10 border border-pink-500/30 text-pink-400 text-2xl mt-1" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', fontSize: '1.5rem', marginTop: '0.25rem' }}>
                <i className="fa-solid fa-camera-retro"></i>
              </div>
              <div>
                <span className="sec-badge bg-pink-500/10 border border-pink-500/30 text-pink-400" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6' }}>Seksi Perlengkapan & Dokumentasi</span>
                <ul className="text-gray-200 mt-2 space-y-1" style={{ listStyle: 'none', color: '#e5e7eb', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Supandi</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Joko Sumanto</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seksi Pembinaan dan Prestasi */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-start gap-5" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <div className="icon-box bg-pink-500/10 border border-pink-500/30 text-pink-400 text-2xl mt-1" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', fontSize: '1.5rem', marginTop: '0.25rem' }}>
                <i className="fa-solid fa-medal"></i>
              </div>
              <div>
                <span className="sec-badge bg-pink-500/10 border border-pink-500/30 text-pink-400" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6' }}>Seksi Pembinaan & Prestasi</span>
                <ul className="text-gray-200 mt-2 space-y-1" style={{ listStyle: 'none', color: '#e5e7eb', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Teguh Iman</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Anwar bin Nurjan</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Boybul</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> M Sani</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seksi Hubungan Masyarakat */}
          <div className="p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-start gap-5" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <div className="icon-box bg-pink-500/10 border border-pink-500/30 text-pink-400 text-2xl mt-1" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', fontSize: '1.5rem', marginTop: '0.25rem' }}>
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <div>
                <span className="sec-badge bg-pink-500/10 border border-pink-500/30 text-pink-400" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6' }}>Seksi Hubungan Masyarakat</span>
                <ul className="text-gray-200 mt-2 space-y-1" style={{ listStyle: 'none', color: '#e5e7eb', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Lina Roliana Sugiman</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Iis Haryati</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Sri Wahyuni</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Greg</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Seksi Dana dan Usaha */}
          <div className="p-card glass p-6 rounded-2xl md:col-span-2" style={{ gridColumn: '1 / -1', padding: '1.5rem', borderRadius: '1rem' }}>
            <div className="circle-glow"></div>
            <div className="card-inner flex items-start gap-5" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <div className="icon-box bg-pink-500/10 border border-pink-500/30 text-pink-400 text-2xl mt-1" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', fontSize: '1.5rem', marginTop: '0.25rem' }}>
                <i className="fa-solid fa-hand-holding-dollar"></i>
              </div>
              <div style={{ width: '100%' }}>
                <span className="sec-badge bg-pink-500/10 border border-pink-500/30 text-pink-400" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6' }}>Seksi Dana & Usaha</span>
                <ul className="text-gray-200 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2" style={{ listStyle: 'none', color: '#e5e7eb', marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '150px' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Arko</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '150px' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Widiastuti</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '150px' }}><i className="fa-solid fa-chevron-right text-xs text-pink-400/70" style={{ fontSize: '0.75rem', color: 'rgba(244, 114, 182, 0.7)' }}></i> Yanlinastuti</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pengurus;
