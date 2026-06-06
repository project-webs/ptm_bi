import React from 'react';
import './AdArt.css';

const AdArt = () => {
  return (
    <div className="adart-page-container">
      <div className="adart-hero">
    <p className="subtitle">PERKUMPULAN TENIS MEJA BATAN INDAH</p>
    <h1>AD / ART</h1>
    <p style={{"color":"#a0aec0","fontSize":"0.95rem","marginTop":"0.25rem"}}>Anggaran Dasar &amp; Anggaran Rumah Tangga</p>
    <div className="badge-row">
      <span className="badge badge-cyan"><i className="fa-solid fa-location-dot"></i> Kel. Kademangan, Kec. Setu, Tangerang Selatan</span>
      <span className="badge badge-purple"><i className="fa-solid fa-calendar-days"></i> Masa Bakti: 2026 – 2030</span>
      <span className="badge badge-pink"><i className="fa-solid fa-gavel"></i> Ditetapkan 01 Juni 2026</span>
    </div>
  </div>

  <main className="section-divider" style={{"paddingTop":"2rem","paddingBottom":"2rem"}}>

    {/* Table of Contents */}
    <div className="toc-card" id="toc">
      <h2><i className="fa-solid fa-list-ul"></i> Daftar Isi</h2>
      <div className="toc-list">
        <a href="#ad" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Anggaran Dasar (AD)</a>
        <a href="#ad-pembukaan" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pembukaan</a>
        <a href="#ad-pasal1" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 1 – Nama &amp; Tempat Kedudukan</a>
        <a href="#ad-pasal2" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 2 – Waktu</a>
        <a href="#ad-pasal3" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 3 – Asas</a>
        <a href="#ad-pasal4" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 4 – Visi dan Misi</a>
        <a href="#ad-pasal5" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 5 – Sifat</a>
        <a href="#ad-pasal6" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 6 – Tujuan</a>
        <a href="#ad-pasal7" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 7 – Keanggotaan &amp; Hak Suara</a>
        <a href="#ad-pasal8" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 8 – Struktur Organisasi</a>
        <a href="#art" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Anggaran Rumah Tangga (ART)</a>
        <a href="#art-pasal1" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 1 – Ketertiban</a>
        <a href="#art-pasal2" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 2 – Kehadiran</a>
        <a href="#art-pasal3" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 3 – Iuran</a>
        <a href="#art-pasal4" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 4 – Rapat Anggota</a>
        <a href="#art-pasal5" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 5 – Sanksi</a>
        <a href="#art-pasal6" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 6 – Perlawatan</a>
        <a href="#art-pasal7" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 7 – Kalender Kegiatan</a>
        <a href="#art-pasal9" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 9 – Organisasi</a>
        <a href="#art-pasal10" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 10 – Tugas &amp; Wewenang</a>
        <a href="#art-pasal11" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 11 – Syarat Calon Ketua</a>
        <a href="#art-pasal12" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 12 – Penasihat</a>
        <a href="#art-pasal13" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 13 – Keanggotaan &amp; Hak</a>
        <a href="#art-pasal14" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 14 – Harta Kekayaan</a>
        <a href="#art-pasal15" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 15 – Pengumuman</a>
        <a href="#art-pasal16" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 16 – Pemeriksa Keuangan</a>
        <a href="#art-pasal17" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 17 – Notulen</a>
        <a href="#art-pasal18" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 18 – Perubahan ART</a>
        <a href="#art-pasal21" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 21 – Perubahan Organisasi</a>
        <a href="#art-pasal22" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pasal 22 – Ketentuan Penutup</a>
        <a href="#pengesahan" className="toc-item"><i className="fa-solid fa-chevron-right"></i> Pengesahan</a>
      </div>
    </div>

    {/* ================================================ */}
    {/*            ANGGARAN DASAR                        */}
    {/* ================================================ */}
    <div className="doc-section" id="ad">
      <div className="doc-section-header">
        <div className="icon-box" style={{"background":"rgba(0,212,255,0.1)","border":"1px solid rgba(0,212,255,0.3)","color":"#00d4ff"}}>
          <i className="fa-solid fa-book-open"></i>
        </div>
        <div>
          <div style={{"fontSize":"0.75rem","color":"#00d4ff","letterSpacing":"2px","textTransform":"uppercase","fontFamily":"'Space Grotesk',sans-serif","marginBottom":"0.2rem"}}>Bagian I</div>
          <h2 className="neon-cyan">ANGGARAN DASAR</h2>
        </div>
      </div>

      {/* Pembukaan */}
      <div className="article-card cyan" id="ad-pembukaan">
        <h3 className="cyan">Pembukaan</h3>
        <div className="article-title">PEMBUKAAN</div>
        <p>
          Olahraga merupakan kebutuhan dasar manusia yang bersumber atas "Kebesaran Allah SWT" dan merupakan salah satu aspek dan unsur yang berpengaruh terhadap pembangunan bangsa. Selain itu, kegiatan olahraga adalah perwujudan dari kehendak dan keinginan masyarakat untuk membentuk manusia yang sehat seperti dikehendaki.
        </p>
        <p>
          Cabang olahraga tenis meja adalah bagian dari kegiatan olahraga lainnya di Indonesia, yang sesungguhnya merupakan kegiatan masyarakat untuk memelihara Kesehatan. Selanjutnya, masyarakat di Kompleks Batan Indah membentuk suatu organisasi olahraga perkumpulan tenis meja (PTM) Batan Indah dengan anggaran dasar seperti di bawah ini.
        </p>
      </div>

      {/* Pasal 1 */}
      <div className="article-card cyan" id="ad-pasal1">
        <h3 className="cyan">Pasal 1</h3>
        <div className="article-title">NAMA, ARTI DAN TEMPAT KEDUDUKAN</div>
        <ol>
          <li>Organisasi olahraga ini bernama <strong>Perkumpulan Tenis Meja Batan Indah</strong> yang disingkat <strong>PTM BI</strong>.</li>
          <li>PTM BI berlokasi di Sarana Tenis Meja Batan Indah, Kompleks Batan Indah, Kelurahan Kademangan, Kecamatan Setu, Kota Tangerang Selatan.</li>
        </ol>
      </div>

      {/* Pasal 2 */}
      <div className="article-card cyan" id="ad-pasal2">
        <h3 className="cyan">Pasal 2</h3>
        <div className="article-title">WAKTU</div>
        <p>PTM BI Tangerang Selatan didirikan pada tanggal <strong>1 September 2023</strong> dengan jangka waktu periode kepengurusan selama 4 tahun.</p>
      </div>

      {/* Pasal 3 */}
      <div className="article-card cyan" id="ad-pasal3">
        <h3 className="cyan">Pasal 3</h3>
        <div className="article-title">ASAS</div>
        <p>PTM BI Tangerang Selatan berasaskan <strong>Pancasila</strong>, kekeluargaan, dan prinsip-prinsip Islam.</p>
      </div>

      {/* Pasal 4 */}
      <div className="article-card cyan" id="ad-pasal4">
        <h3 className="cyan">Pasal 4</h3>
        <div className="article-title">VISI DAN MISI</div>
        <span className="subsec-label cyan">Visi</span>
        <p>Menjadi sebuah perkumpulan tenis meja terkemuka di Tangerang Selatan.</p>
        <span className="subsec-label cyan">Misi</span>
        <ul>
          <li>Membentuk masyarakat yang sehat rohani dan jasmani untuk mendukung pembangunan bangsa dan negara Indonesia, serta meningkatkan persahabatan antar PTM di Tangerang Selatan melalui olahraga tenis meja.</li>
          <li>Membuat anggota PTM BI agar mempunyai rasa memiliki serta mencintai PTM BI Tangerang Selatan, demi kemajuan bersama.</li>
          <li>Meningkatkan silaturrahim dan persaudaraan di antara para anggota PTM BI.</li>
        </ul>
      </div>

      {/* Pasal 5 */}
      <div className="article-card cyan" id="ad-pasal5">
        <h3 className="cyan">Pasal 5</h3>
        <div className="article-title">SIFAT</div>
        <ol>
          <li>PTM BI Tangerang Selatan merupakan perkumpulan yang berdiri sendiri dan merupakan organisasi olahraga yang keanggotaannya bersifat terbuka.</li>
          <li>PTM BI Tangerang Selatan adalah merupakan perkumpulan yang melakukan pembinaan kegiatan olahraga rekreasi dan prestasi.</li>
          <li>PTM BI Tangerang Selatan bersifat terbuka bagi pemain tenis meja yang berdomisili di Kota Tangerang Selatan dan sekitarnya.</li>
          <li>PTM BI Tangerang Selatan berafiliasi pada Persatuan Tenis Meja Seluruh Indonesia (PTMSI) dalam hal peraturan permainan dan peraturan pertandingan.</li>
          <li>Induk organisasi PTM BI Tangerang Selatan adalah PTMSI Pengurus Cabang Kota Tangerang Selatan.</li>
        </ol>
      </div>

      {/* Pasal 6 */}
      <div className="article-card cyan" id="ad-pasal6">
        <h3 className="cyan">Pasal 6</h3>
        <div className="article-title">TUJUAN</div>
        <p>PTM BI Tangerang Selatan berusaha mencapai tujuannya dengan jalan:</p>
        <ol>
          <li>Menghimpun masyarakat di dalam maupun di luar wilayah sendiri untuk menjadi anggota perkumpulan.</li>
          <li>Meningkatkan mutu dan prestasi olahraga tenis meja melalui pendekatan pelatihan.</li>
          <li>Menyelenggarakan program latihan dan pertandingan secara teratur dan mantap, baik untuk jangka pendek maupun jangka panjang.</li>
          <li>Menyelenggarakan seleksi intern untuk menentukan peringkat dengan sistem turnamen mandiri.</li>
          <li>Memperkokoh perkumpulan dan kesatuan antar anggota dan solidaritas antar PTM di Kota Tangerang Selatan melalui olahraga tenis meja.</li>
        </ol>
      </div>

      {/* Pasal 7 */}
      <div className="article-card cyan" id="ad-pasal7">
        <h3 className="cyan">Pasal 7</h3>
        <div className="article-title">KEANGGOTAAN DAN HAK SUARA</div>
        <ol>
          <li>Keanggotaan PTM BI Tangerang Selatan hanya terdiri atas anggota biasa.</li>
          <li>Syarat-syarat keanggotaan diatur dalam Anggaran Rumah Tangga.</li>
          <li>Keanggotaan PTM BI Tangerang Selatan dapat berhenti karena:
            <ol type="a">
              <li>Tidak memenuhi persyaratan;</li>
              <li>Mengundurkan diri;</li>
              <li>Diberhentikan.</li>
            </ol>
          </li>
          <li>Hak suara diatur dalam Anggaran Rumah Tangga.</li>
        </ol>
      </div>

      {/* Pasal 8 */}
      <div className="article-card cyan" id="ad-pasal8">
        <h3 className="cyan">Pasal 8</h3>
        <div className="article-title">STRUKTUR ORGANISASI</div>
        <ol>
          <li>Pengurus PTM BI Tangerang Selatan terdiri atas:
            <ol type="a">
              <li>Seorang Pembina;</li>
              <li>Seorang Ketua dan seorang Wakil Ketua;</li>
              <li>Sekretaris 1 dan 2;</li>
              <li>Bendahara 1 dan 2;</li>
              <li>Seksi Pertandingan;</li>
              <li>Seksi Perlengkapan dan Dokumentasi;</li>
              <li>Seksi Pembinaan dan Prestasi;</li>
              <li>Seksi Hubungan Masyarakat;</li>
              <li>Seksi Dana dan Usaha.</li>
            </ol>
          </li>
          <li>Pengurus dipilih oleh dan dari anggota dalam suatu Rapat Anggota.</li>
          <li>Masa jabatan Pengurus adalah 4 tahun.</li>
        </ol>
      </div>
    </div>

    {/* ================================================ */}
    {/*            ANGGARAN RUMAH TANGGA                 */}
    {/* ================================================ */}
    <div className="doc-section" id="art">
      <div className="doc-section-header">
        <div className="icon-box" style={{"background":"rgba(168,85,247,0.1)","border":"1px solid rgba(168,85,247,0.3)","color":"#a855f7"}}>
          <i className="fa-solid fa-scroll"></i>
        </div>
        <div>
          <div style={{"fontSize":"0.75rem","color":"#a855f7","letterSpacing":"2px","textTransform":"uppercase","fontFamily":"'Space Grotesk',sans-serif","marginBottom":"0.2rem"}}>Bagian II</div>
          <h2 className="neon-purple">ANGGARAN RUMAH TANGGA</h2>
        </div>
      </div>

      {/* ART Pasal 1 */}
      <div className="article-card purple" id="art-pasal1">
        <h3 className="purple">Pasal 1</h3>
        <div className="article-title">KETERTIBAN</div>
        <ol>
          <li>Setiap anggota wajib berlaku tertib dan tidak mengganggu ketenangan anggota lainnya selama kegiatan berlangsung.</li>
          <li>Setiap anggota yang membawa tamu, baik orang dewasa maupun anak-anak, bertanggung jawab penuh atas perilaku tamunya selama berada di dalam area PTM BI.</li>
          <li>Dilarang mengucapkan kata-kata kotor dan/atau melakukan kekerasan fisik selama berada di area PTM BI; pelanggaran terhadap ketentuan ini akan dikenakan sanksi.</li>
          <li>Tempat latihan harus dijaga kebersihan dan kerapihannya oleh seluruh anggota.</li>
          <li>Apabila ada peralatan yang rusak atau hilang, termasuk net, aksesoris meja, bola, bet, dan lain-lain, maka pengganti dari anggota yang menggunakannya terakhir.</li>
        </ol>
      </div>

      {/* ART Pasal 2 */}
      <div className="article-card purple" id="art-pasal2">
        <h3 className="purple">Pasal 2</h3>
        <div className="article-title">KEHADIRAN</div>
        <ol>
          <li>Kegiatan latihan PTM BI dilaksanakan sesuai jadwal yang telah ditetapkan.</li>
          <li>Setiap anggota dianjurkan agar hadir sesuai jadwal latihan yang telah ditetapkan untuk meningkatkan prestasi.</li>
        </ol>
      </div>

      {/* ART Pasal 3 */}
      <div className="article-card purple" id="art-pasal3">
        <h3 className="purple">Pasal 3</h3>
        <div className="article-title">IURAN</div>
        <ol>
          <li>Iuran anggota bersifat wajib dan besarnya ditentukan oleh Rapat Anggota.</li>
          <li>Apabila seorang anggota belum membayar iuran lebih dari 3 bulan berturut-turut, maka anggota yang bersangkutan dapat dikenai sanksi berupa larangan mengikuti berbagai kegiatan PTM BI sampai melunasi iuran yang tertunggak tersebut.</li>
          <li>Sumbangan awal keanggotaan beserta iuran bulanan ditetapkan oleh Pengurus.</li>
        </ol>
      </div>

      {/* ART Pasal 4 */}
      <div className="article-card purple" id="art-pasal4">
        <h3 className="purple">Pasal 4</h3>
        <div className="article-title">RAPAT ANGGOTA</div>
        <ol>
          <li>Rapat Anggota adalah rapat yang dihadiri oleh semua anggota PTM BI Tangerang Selatan.</li>
          <li>Rapat Anggota diadakan sedikitnya satu kali dalam satu tahun pada akhir kepengurusan.</li>
          <li>Rapat Anggota diselenggarakan untuk memilih Ketua baru, menetapkan kebijaksanaan umum organisasi dan memberikan penilaian atas laporan pertanggungjawaban Pengurus.</li>
          <li>Rapat Anggota dipimpin oleh Ketua atau bila Ketua berhalangan dapat diwakilkan kepada Wakil Ketua.</li>
          <li>Rapat Anggota Luar Biasa (RALB) dapat dilaksanakan apabila ada masalah yang mendesak dan memerlukan keputusan segera. RALB dapat diusulkan oleh sekurang-kurangnya setengah dari jumlah anggota.</li>
          <li>Rapat Anggota dianggap sah apabila dihadiri oleh lebih dari setengah jumlah anggota.</li>
          <li>Apabila kuorum tidak dicapai, Rapat Anggota ditunda selama 30 menit dan setelah itu Rapat Anggota dilaksanakan dan dianggap sah dengan anggota yang hadir.</li>
          <li>Keputusan Rapat Anggota diambil berdasarkan musyawarah dan mufakat, dan apabila tidak tercapai mufakat, keputusan diambil berdasarkan suara terbanyak.</li>
        </ol>
      </div>

      {/* ART Pasal 5 */}
      <div className="article-card purple" id="art-pasal5">
        <h3 className="purple">Pasal 5</h3>
        <div className="article-title">SANKSI</div>
        <p>Setiap anggota, jika diketahui dan berdasarkan bukti-bukti yang kuat terlibat dalam suatu perjudian, penyuapan dan kena suap di dalam suatu pertandingan, dikenakan sanksi seberat-beratnya dengan diberhentikan dari keanggotaan.</p>
        <p>Setiap anggota, jika diketahui dan berdasarkan bukti-bukti yang kuat terlibat dalam penggunaan dan pengedaran minuman keras dan obat-obat terlarang baik untuk diri sendiri maupun orang lain, akan dikenai sanksi seberat-beratnya dengan diberhentikan dari keanggotaan.</p>
      </div>

      {/* ART Pasal 6 */}
      <div className="article-card purple" id="art-pasal6">
        <h3 className="purple">Pasal 6</h3>
        <div className="article-title">PERLAWATAN</div>
        <ol>
          <li>Regu dan/atau perorangan yang akan melawat ke luar daerah atau antar PTM dalam pertandingan resmi yang mengatasnamakan PTM BI Tangerang Selatan harus mendapatkan persetujuan pengurus.</li>
          <li>Kunjungan dari PTM lain ke PTM BI Tangerang Selatan harus mendapatkan persetujuan pengurus.</li>
        </ol>
      </div>

      {/* ART Pasal 7 */}
      <div className="article-card purple" id="art-pasal7">
        <h3 className="purple">Pasal 7</h3>
        <div className="article-title">KALENDER KEGIATAN</div>
        <p>Untuk meningkatkan kualitas permainan anggota, pengurus harus menyiapkan kalender kegiatan untuk diketahui seluruh anggota.</p>
      </div>

      {/* ART Pasal 8 – Lambang (disebutkan singkat) */}
      <div className="article-card purple">
        <h3 className="purple">Pasal 8</h3>
        <div className="article-title">LAMBANG</div>
        <p>Lambang organisasi PTM BI ditetapkan dan diatur tersendiri oleh Pengurus.</p>
      </div>

      {/* ART Pasal 9 */}
      <div className="article-card purple" id="art-pasal9">
        <h3 className="purple">Pasal 9</h3>
        <div className="article-title">ORGANISASI</div>
        <p style={{"marginBottom":"1rem"}}>Pengurus PTM BI Tangerang Selatan Periode 2026 – 2030 adalah sebagai berikut:</p>
        <div style={{"overflowX":"auto"}}>
          <table className="org-table">
            <thead>
              <tr>
                <th>Jabatan</th>
                <th>Nama</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Pembina</td><td>H. Herry R. Gumelar</td></tr>
              <tr><td>Ketua</td><td>Kussigit Santosa</td></tr>
              <tr><td>Wakil Ketua</td><td>Asih Nariastuti</td></tr>
              <tr><td>Sekretaris</td><td>Azis Azmi, Anna Rosalina</td></tr>
              <tr><td>Bendahara</td><td>Agus Cahyono, Patlina</td></tr>
              <tr><td>Seksi Pertandingan</td><td>Muhammad Zen, Marsono</td></tr>
              <tr><td>Seksi Perlengkapan &amp; Dokumentasi</td><td>Supandi, Joko Sumanto</td></tr>
              <tr><td>Seksi Pembinaan &amp; Prestasi</td><td>Teguh Iman U., Anwar, Boybul, M. Sani</td></tr>
              <tr><td>Seksi Hubungan Masyarakat</td><td>Greg. Prasetyo, Lina Roliana S., Iis Haryati, Sri Wahyuni</td></tr>
              <tr><td>Seksi Dana &amp; Usaha</td><td>Arko, Yanlinastuti, Widiastuti</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{"marginTop":"1rem","fontSize":"0.85rem","color":"#718096","fontStyle":"italic"}}>Penjelasan mengenai fungsi dan tugas dari masing-masing seksi akan diatur secara tersendiri.</p>
      </div>

      {/* ART Pasal 10 */}
      <div className="article-card purple" id="art-pasal10">
        <h3 className="purple">Pasal 10</h3>
        <div className="article-title">TUGAS DAN WEWENANG</div>
        <p>Pengurus memiliki tugas dan wewenang untuk:</p>
        <ol>
          <li>Memimpin rapat;</li>
          <li>Menetapkan garis-garis kebijakan organisasi;</li>
          <li>Memimpin, membimbing, mengatur dan membantu pelaksanaan organisasi serta program kerja;</li>
          <li>Mewakili PTM BI Tangerang Selatan baik ke dalam maupun ke luar.</li>
        </ol>
      </div>

      {/* ART Pasal 11 */}
      <div className="article-card purple" id="art-pasal11">
        <h3 className="purple">Pasal 11</h3>
        <div className="article-title">SYARAT-SYARAT CALON DAN CARA PEMILIHAN KETUA</div>

        <span className="subsec-label purple">(1) Syarat-Syarat Calon Ketua Umum</span>
        <ol type="a">
          <li>Berkewarganegaraan Indonesia;</li>
          <li>Memiliki jiwa sesuai dengan asas dan tujuan PTM BI Tangerang Selatan sebagaimana tercantum dalam Anggaran Dasar;</li>
          <li>Memiliki sifat kepemimpinan dan berwibawa;</li>
          <li>Memiliki pengalaman berorganisasi dan pengetahuan mengenai tenis meja pada khususnya dan keolahragaan pada umumnya;</li>
          <li>Memiliki dedikasi terhadap tenis meja dan bertekad untuk memajukan PTM BI Tangerang Selatan;</li>
          <li>Telah banyak berjasa terhadap organisasi PTM BI Tangerang Selatan;</li>
          <li>Bersikap dan bertindak tegas terhadap usaha yang bertentangan dengan asas dan tujuan keolahragaan;</li>
          <li>Melaksanakan roda organisasi dengan jiwa, semangat dan tujuan yang tulus dan tidak untuk kepentingan pribadi.</li>
        </ol>

        <span className="subsec-label purple">(2) Cara Pemilihan Ketua</span>
        <ol type="a">
          <li>Setiap anggota dapat dipilih untuk menjadi Ketua Umum, jika dicalonkan oleh sekurang-kurangnya 5 orang anggota;</li>
          <li>Ketua dipilih oleh Rapat Anggota berdasarkan musyawarah dan mufakat;</li>
          <li>Apabila musyawarah dan mufakat tidak mungkin dicapai, maka keputusan diambil berdasarkan suara terbanyak;</li>
          <li>Pemilihan sah apabila dihadiri oleh lebih dari setengah jumlah anggota dan keputusan tentang pemilihan Ketua yang baru harus disetujui oleh sekurang-kurangnya dua pertiga dari jumlah anggota yang hadir;</li>
          <li>Ketua dan Pengurus yang baru harus diumumkan dalam waktu selambat-lambatnya 1 bulan sesudah Rapat Anggota.</li>
        </ol>

        <span className="subsec-label purple">(3) Masa Jabatan Ketua</span>
        <ol type="a">
          <li>Masa jabatan Ketua ditetapkan untuk selama 4 tahun dan selanjutnya dapat dipilih kembali untuk satu kali masa jabatan berikutnya;</li>
          <li>Semua anggota Pengurus meletakkan jabatannya pada waktu kepengurusan berikutnya.</li>
        </ol>
      </div>

      {/* ART Pasal 12 */}
      <div className="article-card purple" id="art-pasal12">
        <h3 className="purple">Pasal 12</h3>
        <div className="article-title">PENASIHAT</div>
        <p>Penasihat sedikitnya berjumlah 3 orang dari yang dituakan oleh anggota dan Pengurus serta banyak mengetahui olahraga tenis meja. Penasihat mendampingi Pengurus dalam melaksanakan tugas dan kewajibannya.</p>
        <p>Tugas dan wewenangnya adalah menyarankan langkah-langkah yang bersifat strategis dalam pengembangan dan pembinaan tenis meja, serta turut membantu memelihara hubungan baik antara masyarakat, Pemerintah Daerah dan PTM lainnya dengan PTM BI Tangerang Selatan.</p>
      </div>

      {/* ART Pasal 13 */}
      <div className="article-card purple" id="art-pasal13">
        <h3 className="purple">Pasal 13</h3>
        <div className="article-title">KEANGGOTAAN</div>
        <p>Yang dapat menjadi anggota PTM BI adalah setiap orang pecinta tenis meja yang menyetujui dan akan mentaati Anggaran Dasar dan Anggaran Rumah Tangga serta kebijakan pengurus PTM BI.</p>
        <p>Setiap peserta baru disyaratkan untuk mengisi formulir pendaftaran dan memberi <strong>sumbangan awal dengan nilai minimal Rp. 50.000,-</strong> (lima puluh ribu rupiah). Selanjutnya setiap anggota dikenai <strong>iuran anggota sebesar Rp. 25.000,- per bulan</strong>. Anggota PTM BI diharapkan dapat berpartisipasi pada kegiatan latihan baik secara berkala ataupun tidak.</p>

        <span className="subsec-label purple">Hak Anggota</span>
        <ol>
          <li>Setiap anggota berhak mendapatkan fasilitas latihan, latih tanding dan mengikuti lawatan bersama-sama dengan anggota lainnya dengan mempertimbangkan situasi dan kondisi keuangan PTM BI atau persetujuan dari Ketua PTM BI;</li>
          <li>Setiap anggota memiliki hak suara dan pendapat dalam Rapat Anggota;</li>
          <li>Setiap anggota yang terlibat sebagaimana ketentuan yang tercantum dalam Pasal 5 berhak untuk membela diri dengan didampingi saksi-saksi yang dapat meringankan dirinya.</li>
        </ol>
      </div>

      {/* ART Pasal 14 */}
      <div className="article-card purple" id="art-pasal14">
        <h3 className="purple">Pasal 14</h3>
        <div className="article-title">HARTA KEKAYAAN</div>
        <p>Kekayaan organisasi terdiri atas:</p>
        <ol type="a">
          <li>Dua meja dengan merk Nextsist;</li>
          <li>Satu meja dengan merk Shiamiq;</li>
          <li>Tiga buah net;</li>
          <li>Dua buah papan skor.</li>
        </ol>
      </div>

      {/* ART Pasal 15 */}
      <div className="article-card purple" id="art-pasal15">
        <h3 className="purple">Pasal 15</h3>
        <div className="article-title">PENGUMUMAN</div>
        <ol>
          <li>PTM BI berhak mengeluarkan pengumuman-pengumuman melalui papan pengumuman atau sarana publikasi lainnya tentang segala hal yang dianggap perlu, baik mengenai hasil keputusan rapat, peraturan, program kerja, rencana persiapan kegiatan, dan hal-hal lain yang berhubungan dengan kegiatan PTM BI.</li>
          <li>Yang dapat mengeluarkan pengumuman hanya Pengurus dan pengumuman tentang kegiatan harus ditandatangani oleh Sekretaris dan Ketua, sedangkan pengumuman yang menyangkut bidang keuangan harus ditandatangani oleh Bendahara dan Ketua.</li>
          <li>Pengurus tidak bertanggung jawab atas isi pengumuman yang dikeluarkan bukan oleh pengurus.</li>
          <li>Pengurus, Pembina maupun Penasihat yang dengan sengaja mengeluarkan pengumuman yang merugikan nama baik anggota dan PTM BI akan dikenakan sanksi hukuman skorsing.</li>
        </ol>
      </div>

      {/* ART Pasal 16 */}
      <div className="article-card purple" id="art-pasal16">
        <h3 className="purple">Pasal 16</h3>
        <div className="article-title">PEMERIKSA KEUANGAN</div>
        <ol>
          <li>Dalam Rapat Anggota yang diadakan untuk mempertanggungjawabkan pada akhir masa jabatan Pengurus selama masa jabatannya, dapat dibentuk Pemeriksa Keuangan yang sekurang-kurangnya terdiri atas 3 orang.</li>
          <li>Sebelum Rapat Anggota dilaksanakan sebagaimana dimaksud dalam ayat (1), laporan pertanggungjawaban Pengurus harus disampaikan kepada seluruh anggota selambat-lambatnya satu bulan sebelum Rapat Anggota diselenggarakan.</li>
        </ol>
      </div>

      {/* ART Pasal 17 */}
      <div className="article-card purple" id="art-pasal17">
        <h3 className="purple">Pasal 17</h3>
        <div className="article-title">NOTULEN</div>
        <p>Notulen atau risalah Rapat Anggota harus disampaikan kepada anggota selambat-lambatnya <strong>2 minggu</strong> setelah Rapat Anggota berakhir.</p>
      </div>

      {/* ART Pasal 18 */}
      <div className="article-card purple" id="art-pasal18">
        <h3 className="purple">Pasal 18</h3>
        <div className="article-title">PERUBAHAN ANGGARAN RUMAH TANGGA</div>
        <p>Perubahan Anggaran Rumah Tangga ditetapkan oleh Rapat Anggota.</p>
      </div>

      {/* ART Pasal 21 */}
      <div className="article-card purple" id="art-pasal21">
        <h3 className="purple">Pasal 21</h3>
        <div className="article-title">PERUBAHAN ORGANISASI</div>
        <ol>
          <li>PTM BI Tangerang Selatan hanya dapat dibubarkan oleh Rapat Anggota Luar Biasa yang khusus diselenggarakan untuk maksud tersebut dengan dihadiri oleh lebih dari setengah anggota.</li>
          <li>Penyelesaian tentang harta milik PTM BI Tangerang Selatan ditentukan dalam Rapat Anggota Luar Biasa.</li>
          <li>Rapat Anggota Luar Biasa dapat diadakan atas usul sekurang-kurangnya setengah dari jumlah anggota.</li>
          <li>Pengunduran diri pengurus sebelum masa jabatannya berakhir memerlukan persetujuan sekurang-kurangnya setengah dari jumlah anggota. Jika tidak dapat disetujui oleh jumlah tersebut, maka pengunduran diri tidak dapat dikabulkan.</li>
        </ol>
      </div>

      {/* ART Pasal 22 */}
      <div className="article-card purple" id="art-pasal22">
        <h3 className="purple">Pasal 22</h3>
        <div className="article-title">KETENTUAN PENUTUP</div>
        <ol>
          <li>Seluruh anggota dianggap telah mengetahui isi Anggaran Dasar dan Anggaran Rumah Tangga PTM BI Tangerang Selatan ini.</li>
          <li>Hal-hal yang tidak dan atau belum diatur dalam Anggaran Rumah Tangga ini akan diatur kemudian.</li>
          <li>Anggaran Dasar dan Anggaran Rumah Tangga ini telah disahkan dalam Rapat Anggota yang diselenggarakan di Kompleks Batan Indah, Tangerang Selatan pada tanggal <strong>01 Juni 2026</strong>.</li>
          <li>Anggaran Dasar dan Anggaran Rumah Tangga ini mulai berlaku pada tanggal ditetapkan. AD/ART ini harus diumumkan melalui forum yang memungkinkan setiap anggota mengetahui dan memahami AD/ART ini.</li>
        </ol>
      </div>
    </div>

    {/* Pengesahan */}
    <div id="pengesahan" style={{"scrollMarginTop":"110px"}}>
      <div className="signature-card">
        <i className="fa-solid fa-stamp" style={{"fontSize":"2.5rem","color":"#00d4ff","marginBottom":"0.75rem","display":"block"}}></i>
        <h3>PENGESAHAN</h3>
        <p style={{"color":"#a0aec0","fontSize":"0.9rem","marginTop":"0.25rem"}}>Ditetapkan di: <strong style={{"color":"#e2e8f0"}}>Tangerang Selatan</strong> &amp;nbsp;|&amp;nbsp; Pada tanggal: <strong style={{"color":"#e2e8f0"}}>01 Juni 2026</strong></p>
        <div className="signature-grid">
          <div className="signature-box">
            <div className="role">Sekretaris</div>
            <div className="name">Azis Azmi</div>
          </div>
          <div className="signature-box">
            <div className="role">Ketua</div>
            <div className="name">Kussigit Santosa</div>
          </div>
        </div>
        <p style={{"color":"#a0aec0","fontSize":"0.8rem","marginTop":"1.5rem","textTransform":"uppercase","letterSpacing":"1.5px"}}>Mengetahui</p>
        <div style={{"maxWidth":"240px","margin":"0.75rem auto 0"}}>
          <div className="signature-box">
            <div className="role">Pembina</div>
            <div className="name">H. Herry R. Gumelar</div>
          </div>
        </div>
      </div>
    </div>

  </main>
    </div>
  );
};

export default AdArt;
