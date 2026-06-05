import React, { useEffect } from 'react';
import './Jadwal.css';

const Jadwal = () => {

  useEffect(() => {
    // Scroll reveal logic
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObserver.observe(el));

    return () => {
      revealEls.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <div style={{ paddingTop: '100px', maxWidth: '1100px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '5rem', minHeight: '70vh' }}>
      {/* Page Hero */}
      <div className="page-hero reveal">
        <div className="page-hero-badge">
          <i className="fas fa-table-tennis-paddle-ball"></i>
          PTM Batan Indah
        </div>
        <h1 className="page-title">Jadwal Latihan</h1>
        <div className="divider"></div>
        <p className="page-subtitle">Informasi waktu latihan resmi komunitas tenis meja Batan Indah</p>
      </div>

      {/* Days badge */}
      <div style={{ textAlign: 'center' }}>
        <div className="days-badge reveal delay-1">
          <i className="fas fa-calendar-week"></i>
          Senin &nbsp;—&nbsp; Minggu
          <i className="fas fa-calendar-week"></i>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="schedule-wrapper">

        {/* Siang Session */}
        <div className="session-card session-siang reveal delay-1">
          <div className="session-inner">
            <div className="session-header">
              <div className="session-icon icon-siang">☀️</div>
              <div>
                <div className="session-title neon-cyan">SIANG</div>
                <span className="session-tag tag-siang">Morning & Afternoon Session</span>
              </div>
            </div>

            <div className="time-slots">
              <div className="time-slot slot-siang">
                <div className="slot-number num-siang">1</div>
                <div className="slot-time time-siang">06.00 – 11.45</div>
                <div className="slot-label">Pagi</div>
              </div>
              <div className="time-slot slot-siang">
                <div className="slot-number num-siang">2</div>
                <div className="slot-time time-siang">13.00 – 15.00</div>
                <div className="slot-label">Siang</div>
              </div>
              <div className="time-slot slot-siang">
                <div className="slot-number num-siang">3</div>
                <div className="slot-time time-siang">15.30 – 17.45</div>
                <div className="slot-label">Sore</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tutup Maghrib-Isya */}
        <div className="session-card session-tutup reveal delay-2">
          <div className="tutup-notice">
            <div className="tutup-icon-wrap">🕌</div>
            <div>
              <div className="tutup-text-main">WAKTU MAGHRIB – ISYA</div>
              <div className="tutup-text-sub">
                Lapangan <strong style={{ color: '#ec4899' }}>TUTUP</strong> sementara untuk menghormati waktu shalat Maghrib hingga selesai Isya.<br/>
                Terima kasih atas pengertiannya. 🙏
              </div>
            </div>
          </div>
        </div>

        {/* Malam Session */}
        <div className="session-card session-malam reveal delay-3">
          <div className="session-inner">
            <div className="session-header">
              <div className="session-icon icon-malam">🌙</div>
              <div>
                <div className="session-title neon-purple">MALAM</div>
                <span className="session-tag tag-malam">Night Session</span>
              </div>
            </div>

            <div className="time-slots">
              <div className="time-slot slot-malam">
                <div className="slot-number num-malam">1</div>
                <div className="slot-time time-malam">20.00 – 23.00</div>
                <div className="slot-label">Malam</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Info Note */}
      <div className="info-note reveal">
        <i className="fas fa-circle-info"></i>
        <p>
          <strong>Catatan:</strong> Jadwal latihan berlaku setiap hari <strong>Senin hingga Minggu</strong>. 
          Lapangan ditutup sementara pada waktu <strong>Maghrib sampai Isya</strong>. 
          Untuk informasi lebih lanjut, silakan hubungi pengurus PTM Batan Indah.
        </p>
      </div>

      {/* Summary Strip */}
      <div className="summary-strip reveal">
        <div className="strip-item glass">
          <div className="strip-icon">📅</div>
          <div className="strip-label">Hari Aktif</div>
          <div className="strip-value">7 Hari / Minggu</div>
        </div>
        <div className="strip-item glass">
          <div className="strip-icon">⏱️</div>
          <div className="strip-label">Sesi Latihan</div>
          <div className="strip-value">4 Sesi / Hari</div>
        </div>
        <div className="strip-item glass">
          <div className="strip-icon">☀️</div>
          <div className="strip-label">Sesi Siang</div>
          <div className="strip-value">3 Slot</div>
        </div>
        <div className="strip-item glass">
          <div className="strip-icon">🌙</div>
          <div className="strip-label">Sesi Malam</div>
          <div className="strip-value">1 Slot</div>
        </div>
      </div>

    </div>
  );
};

export default Jadwal;
