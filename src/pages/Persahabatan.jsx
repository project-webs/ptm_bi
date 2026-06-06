import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Persahabatan = () => {
  // State for Matches (Events)
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Players (for Game forms)
  const [playersList, setPlayersList] = useState([]);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');

  // Modals for Match
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [matchModalMode, setMatchModalMode] = useState('add');
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [deleteMatchModalOpen, setDeleteMatchModalOpen] = useState(false);
  
  // Modals for View Games
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewedMatch, setViewedMatch] = useState(null);
  
  // Modals for Game CRUD
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [gameModalMode, setGameModalMode] = useState('add');
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [deleteGameModalOpen, setDeleteGameModalOpen] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

  // Forms
  const [matchFormData, setMatchFormData] = useState({
    ptm_name: '',
    match_date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [gameFormData, setGameFormData] = useState({
    player_id: '',
    opponent_name: '',
    score_home: 0,
    score_away: 0
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = user?.role === 'admin';

  // ================= FETCHING =================
  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/friendly-matches`, {
        headers: { 
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setMatches(Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      const res = await fetch(`${API_URL}/players?per_page=100`, {
        headers: { 
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      const json = await res.json();
      setPlayersList(Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []));
    } catch (err) {
      console.error("Failed to load players", err);
    }
  };

  const fetchMatchDetails = async (id) => {
    try {
      const res = await fetch(`${API_URL}/friendly-matches/${id}`, {
        headers: { 
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setViewedMatch(json.data || null);
    } catch (err) {
      alert("Gagal memuat detail partai: " + err.message);
    }
  };

  useEffect(() => {
    fetchMatches();
    fetchPlayers();
  }, []);

  // ================= FILTER =================
  const filteredMatches = matches.filter(match => {
    const ptm = (match.ptm_name || '').toLowerCase();
    const search = searchQuery.toLowerCase();
    return ptm.includes(search);
  });

  // ================= MATCH CRUD HANDLERS =================
  const handleOpenAddMatch = () => {
    setMatchModalMode('add');
    setMatchFormData({ ptm_name: '', match_date: new Date().toISOString().split('T')[0], notes: '' });
    setIsMatchModalOpen(true);
  };

  const handleOpenEditMatch = (match) => {
    setMatchModalMode('edit');
    setSelectedMatchId(match.id);
    setMatchFormData({
      ptm_name: match.ptm_name || '',
      match_date: match.match_date ? match.match_date.split(' ')[0] : '',
      notes: match.notes || ''
    });
    setIsMatchModalOpen(true);
  };

  const handleMatchInputChange = (e) => {
    const { name, value } = e.target;
    setMatchFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const url = matchModalMode === 'add' ? `${API_URL}/friendly-matches` : `${API_URL}/friendly-matches/${selectedMatchId}`;
      const method = matchModalMode === 'add' ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(matchFormData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Terjadi kesalahan saat menyimpan data');
      }

      setIsMatchModalOpen(false);
      fetchMatches();
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteMatch = async () => {
    setFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/friendly-matches/${selectedMatchId}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Gagal menghapus data');
      setDeleteMatchModalOpen(false);
      fetchMatches();
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  // ================= VIEW MATCH DETAILS (GAMES) =================
  const handleViewMatch = (id) => {
    setViewedMatch(null);
    setIsViewModalOpen(true);
    fetchMatchDetails(id);
  };

  // ================= GAME CRUD HANDLERS =================
  const handleOpenAddGame = () => {
    setGameModalMode('add');
    setGameFormData({ player_id: '', opponent_name: '', score_home: 0, score_away: 0 });
    setIsGameModalOpen(true);
  };

  const handleOpenEditGame = (game) => {
    setGameModalMode('edit');
    setSelectedGameId(game.id);
    setGameFormData({
      player_id: game.player_id || '',
      opponent_name: game.opponent_name || '',
      score_home: game.score_home || 0,
      score_away: game.score_away || 0
    });
    setIsGameModalOpen(true);
  };

  const handleGameInputChange = (e) => {
    const { name, value } = e.target;
    setGameFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGameSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const url = gameModalMode === 'add' 
        ? `${API_URL}/friendly-matches/${viewedMatch.id}/games` 
        : `${API_URL}/friendly-matches/${viewedMatch.id}/games/${selectedGameId}`;
      const method = gameModalMode === 'add' ? 'POST' : 'PUT';
      
      const payload = {
        player_id: gameFormData.player_id,
        opponent_name: gameFormData.opponent_name,
        score_home: parseInt(gameFormData.score_home),
        score_away: parseInt(gameFormData.score_away)
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Terjadi kesalahan saat menyimpan partai');

      setIsGameModalOpen(false);
      fetchMatchDetails(viewedMatch.id); // Refresh modal content
      fetchMatches(); // Refresh background list score
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteGame = async () => {
    setFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/friendly-matches/${viewedMatch.id}/games/${selectedGameId}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Gagal menghapus partai');
      setDeleteGameModalOpen(false);
      fetchMatchDetails(viewedMatch.id);
      fetchMatches();
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  // ================= RENDER =================
  return (
    <div style={{ paddingTop: '120px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '80vh', paddingBottom: '5rem' }}>
      
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>LAGA PERSAHABATAN</h1>
        <p style={{ fontSize: '1.1rem', color: '#a0aec0', letterSpacing: '2px' }}>JADWAL DAN HASIL PERTANDINGAN PERSAHABATAN PTM BATAN INDAH</p>
      </section>

      {/* Search */}
      <div className="glass" style={{ padding: '1.5rem', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <i className="fa-solid fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
          <input 
            type="text" 
            placeholder="Cari nama PTM Lawan..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 15px 12px 45px', color: 'white', outline: 'none' }}
            onFocus={(e) => e.target.style.borderColor = '#00d4ff'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>
      </div>

      {token && isAdmin && (
        <button 
          onClick={handleOpenAddMatch}
          style={{ position: 'fixed', bottom: '2.5rem', right: '2.5rem', zIndex: 90, background: 'linear-gradient(135deg, #00d4ff, #a855f7)', color: 'white', border: 'none', width: '60px', height: '60px', borderRadius: '18px', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 25px rgba(0, 212, 255, 0.4)', transition: 'all 0.3s ease' }}
          title="Tambah Pertemuan"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 0' }}>
          <i className="fa-solid fa-circle-notch fa-spin fa-3x" style={{ color: '#00d4ff', marginBottom: '1rem' }}></i>
          <p style={{ color: '#9ca3af' }}>Mengambil data pertemuan...</p>
        </div>
      ) : error ? (
        <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}></i>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Gagal Memuat Data</h3>
          <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>{error}</p>
          <button onClick={fetchMatches} style={{ padding: '10px 24px', borderRadius: '12px', background: 'linear-gradient(135deg, #00d4ff, #a855f7)', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Coba Lagi <i className="fa-solid fa-rotate-right" style={{ marginLeft: '8px' }}></i>
          </button>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <i className="fa-solid fa-handshake-slash" style={{ fontSize: '4rem', color: '#4b5563', marginBottom: '1rem' }}></i>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Tidak Ada Pertemuan</h3>
          <p style={{ color: '#9ca3af' }}>Belum ada data laga persahabatan yang sesuai pencarian Anda.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredMatches.map(match => {
            const dateStr = match.match_date ? new Date(match.match_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-';
            const homeScore = match.total_score_home || 0;
            const awayScore = match.total_score_away || 0;
            const isHomeWin = homeScore > awayScore;
            const isAwayWin = awayScore > homeScore;

            return (
              <div key={match.id} className="glass" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', ':hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 30px rgba(0,212,255,0.15)' } }}>
                <div style={{ height: '8px', background: 'linear-gradient(90deg, #00d4ff, #a855f7)' }}></div>
                
                {token && isAdmin && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
                    <button onClick={() => handleOpenEditMatch(match)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit Event"><i className="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={() => { setSelectedMatchId(match.id); setDeleteMatchModalOpen(true); }} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Hapus Event"><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                )}

                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontFamily: 'monospace', background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}><i className="fa-solid fa-calendar-day" style={{ marginRight: '6px', color: '#00d4ff' }}></i> {dateStr}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Home (PTM BI) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '120px' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '1.5rem', boxShadow: '0 4px 15px rgba(0,212,255,0.3)', marginBottom: '16px', border: isHomeWin ? '3px solid #facc15' : 'none', position: 'relative' }}>
                        BI
                        {isHomeWin && <i className="fa-solid fa-crown" style={{ color: '#facc15', position: 'absolute', top: '-16px', fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}></i>}
                      </div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: isHomeWin ? '#67e8f9' : 'white', textAlign: 'center' }}>PTM Batan Indah</h4>
                    </div>

                    {/* VS & Score */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '150px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #a855f7)', color: 'white', fontFamily: '"Orbitron", monospace', fontSize: '1rem', fontWeight: 700, boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)', marginBottom: '16px' }}>VS</div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'monospace', color: '#e5e7eb', background: 'rgba(0,0,0,0.6)', padding: '8px 24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '12px' }}>
                        <span style={{ color: isHomeWin ? '#22d3ee' : 'inherit' }}>{homeScore}</span>
                        <span style={{ color: '#6b7280' }}>:</span>
                        <span style={{ color: isAwayWin ? '#c084fc' : 'inherit' }}>{awayScore}</span>
                      </div>
                    </div>

                    {/* Away (Lawan) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '120px' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '1.5rem', boxShadow: '0 4px 15px rgba(168,85,247,0.3)', marginBottom: '16px', border: isAwayWin ? '3px solid #facc15' : 'none', position: 'relative' }}>
                        AW
                        {isAwayWin && <i className="fa-solid fa-crown" style={{ color: '#facc15', position: 'absolute', top: '-16px', fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}></i>}
                      </div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: isAwayWin ? '#d8b4fe' : 'white', textAlign: 'center' }}>{match.ptm_name}</h4>
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <button 
                      onClick={() => handleViewMatch(match.id)}
                      style={{ padding: '10px 24px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.3)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.1)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0,212,255,0.2)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <i className="fa-solid fa-table-tennis-paddle-ball"></i> View Match Games
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= MODALS: EVENT CRUD ================= */}
      {isMatchModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(15, 20, 50, 0.97), rgba(10, 14, 39, 0.99))', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '500px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', position: 'relative' }}>
            <button onClick={() => setIsMatchModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '1.2rem' }}><i className="fa-solid fa-xmark"></i></button>
            <h2 className="neon-cyan" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>{matchModalMode === 'add' ? 'Tambah Pertemuan' : 'Edit Pertemuan'}</h2>
            <form onSubmit={handleMatchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Nama PTM Lawan</label>
                <input type="text" name="ptm_name" required value={matchFormData.ptm_name} onChange={handleMatchInputChange} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Tanggal</label>
                <input type="date" name="match_date" required value={matchFormData.match_date} onChange={handleMatchInputChange} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', outline: 'none', colorScheme: 'dark' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Catatan</label>
                <textarea name="notes" value={matchFormData.notes} onChange={handleMatchInputChange} rows="3" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', outline: 'none' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsMatchModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>Batal</button>
                <button type="submit" disabled={formLoading} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #00d4ff, #a855f7)', border: 'none', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>{formLoading ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Match Confirm Modal */}
      {deleteMatchModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(15, 20, 50, 0.97), rgba(10, 14, 39, 0.99))', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}><i className="fa-solid fa-trash-can"></i></div>
            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Hapus Pertemuan?</h2>
            <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Semua partai di dalamnya juga akan terhapus.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={() => setDeleteMatchModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>Batal</button>
              <button onClick={handleDeleteMatch} disabled={formLoading} style={{ padding: '10px 20px', background: '#ef4444', border: 'none', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>{formLoading ? 'Menghapus...' : 'Ya, Hapus'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW MATCH MODAL (GAMES LIST) ================= */}
      {isViewModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', zIndex: 9990, padding: '2rem' }}>
          <div style={{ background: '#0a0e27', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: '24px', width: '100%', maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 60px rgba(0,0,0,0.8)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h2 className="neon-cyan" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>PTM BI vs {viewedMatch?.ptm_name || '...'}</h2>
                <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{viewedMatch?.match_date ? new Date(viewedMatch.match_date).toLocaleDateString('id-ID') : ''}</span>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '1.5rem' }}><i className="fa-solid fa-xmark"></i></button>
            </div>

            {/* Body */}
            <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
              {!viewedMatch ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}><i className="fa-solid fa-circle-notch fa-spin fa-2x" style={{ color: '#00d4ff' }}></i></div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'white', fontWeight: 600 }}><i className="fa-solid fa-list-ul" style={{ color: '#a855f7', marginRight: '8px' }}></i> Daftar Partai</h3>
                    {token && isAdmin && (
                      <button onClick={handleOpenAddGame} style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #00d4ff, #a855f7)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}><i className="fa-solid fa-plus"></i> Tambah Partai</button>
                    )}
                  </div>

                  {!viewedMatch.games || viewedMatch.games.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                      <p style={{ color: '#9ca3af' }}>Belum ada partai yang ditambahkan.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {viewedMatch.games.map((game, index) => {
                        const hScore = game.score_home;
                        const aScore = game.score_away;
                        const ptmPlayer = game.player?.name || 'Pemain BI';
                        const oppPlayer = game.opponent_name || 'Lawan';

                        return (
                          <div key={game.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                              <span style={{ color: '#6b7280', fontWeight: 'bold', fontSize: '0.9rem', width: '20px' }}>#{index+1}</span>
                              <div style={{ flex: 1, textAlign: 'right', fontWeight: hScore > aScore ? 700 : 400, color: hScore > aScore ? '#67e8f9' : 'white' }}>{ptmPlayer}</div>
                              <div style={{ padding: '4px 12px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                                <span style={{ color: hScore > aScore ? '#22d3ee' : '#d1d5db' }}>{hScore}</span> - <span style={{ color: aScore > hScore ? '#c084fc' : '#d1d5db' }}>{aScore}</span>
                              </div>
                              <div style={{ flex: 1, textAlign: 'left', fontWeight: aScore > hScore ? 700 : 400, color: aScore > hScore ? '#d8b4fe' : 'white' }}>{oppPlayer}</div>
                            </div>
                            {token && isAdmin && (
                              <div style={{ display: 'flex', gap: '8px', marginLeft: '1rem' }}>
                                <button onClick={() => handleOpenEditGame(game)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><i className="fa-solid fa-pen"></i></button>
                                <button onClick={() => { setSelectedGameId(game.id); setDeleteGameModalOpen(true); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><i className="fa-solid fa-trash"></i></button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODALS: GAME CRUD ================= */}
      {isGameModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(15, 20, 50, 0.97), rgba(10, 14, 39, 0.99))', border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '500px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', position: 'relative' }}>
            <button onClick={() => setIsGameModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '1.2rem' }}><i className="fa-solid fa-xmark"></i></button>
            <h2 className="neon-cyan" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>{gameModalMode === 'add' ? 'Tambah Partai' : 'Edit Partai'}</h2>
            <form onSubmit={handleGameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Pemain PTM BI <span style={{color:'red'}}>*</span></label>
                <select name="player_id" required value={gameFormData.player_id} onChange={handleGameInputChange} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', outline: 'none' }}>
                  <option value="">Pilih Pemain...</option>
                  {playersList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Nama Pemain Lawan <span style={{color:'red'}}>*</span></label>
                <input type="text" name="opponent_name" required value={gameFormData.opponent_name} onChange={handleGameInputChange} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Skor PTM BI</label>
                  <input type="number" name="score_home" min="0" required value={gameFormData.score_home} onChange={handleGameInputChange} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Skor Lawan</label>
                  <input type="number" name="score_away" min="0" required value={gameFormData.score_away} onChange={handleGameInputChange} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: 'white', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsGameModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>Batal</button>
                <button type="submit" disabled={formLoading} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #00d4ff, #a855f7)', border: 'none', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>{formLoading ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Game Confirm Modal */}
      {deleteGameModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(15, 20, 50, 0.97), rgba(10, 14, 39, 0.99))', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}><i className="fa-solid fa-trash-can"></i></div>
            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Hapus Partai?</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setDeleteGameModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>Batal</button>
              <button onClick={handleDeleteGame} disabled={formLoading} style={{ padding: '10px 20px', background: '#ef4444', border: 'none', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>{formLoading ? 'Menghapus...' : 'Ya, Hapus'}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Persahabatan;
