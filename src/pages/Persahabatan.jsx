import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Persahabatan = () => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  
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
  
  // Detail Match View
  const [viewedMatch, setViewedMatch] = useState(null);
  const [gameModalMode, setGameModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedGameId, setSelectedGameId] = useState(null);

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

  if (!token) {
    return (
      <div style={{ paddingTop: '150px', paddingBottom: '150px', textAlign: 'center', minHeight: '60vh' }}>
        <div className="glass" style={{ display: 'inline-block', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)', maxWidth: '500px', width: '90%' }}>
          <i className="fa-solid fa-lock" style={{ fontSize: '3.5rem', color: '#ef4444', marginBottom: '1.5rem', display: 'block' }}></i>
          <h2 style={{ fontFamily: '"Orbitron", monospace', fontSize: '1.75rem', color: '#ef4444', marginBottom: '1rem' }}>Akses Ditolak</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>Harus Login untuk melihat halaman ini</p>
          <Link to="/login" className="btn btn-primary" style={{ display: 'inline-block' }}>Login Sekarang</Link>
        </div>
      </div>
    );
  }

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
      if (!res.ok) {
        let errMsg = `HTTP error! status: ${res.status}`;
        try {
          const err = await res.json();
          errMsg = err.message || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }
      const json = await res.json();
      setViewedMatch(json.data || (json && json.id ? json : null));
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
      match_date: match.match_date ? match.match_date.split(/[T ]/)[0] : '',
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
        let errMsg = 'Terjadi kesalahan saat menyimpan data';
        try {
          const err = await res.json();
          errMsg = err.message || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }

      setIsMatchModalOpen(false);
      fetchMatches();
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteMatch = async (matchId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pertandingan ini?')) return;
    setFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/friendly-matches/${matchId}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        let errMsg = 'Gagal menghapus data';
        try {
          const err = await res.json();
          errMsg = err.message || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }
      fetchMatches();
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  // ================= VIEW MATCH DETAILS =================
  const handleViewMatch = async (id) => {
    setViewedMatch(null);
    setViewMode('detail');
    setGameModalMode('add');
    setGameFormData({ player_id: '', opponent_name: '', score_home: 0, score_away: 0 });
    await fetchMatchDetails(id);
  };

  // ================= GAME CRUD HANDLERS =================
  const handleOpenEditGame = (game) => {
    setGameModalMode('edit');
    setSelectedGameId(game.id);
    setGameFormData({
      player_id: game.player_id || '',
      opponent_name: game.opponent_name || '',
      score_home: game.score_home || 0,
      score_away: game.score_away || 0
    });
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

      if (!res.ok) {
        let errMsg = 'Terjadi kesalahan saat menyimpan partai';
        try {
          const err = await res.json();
          errMsg = err.message || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }

      setGameModalMode('add');
      setGameFormData({ player_id: '', opponent_name: '', score_home: 0, score_away: 0 });
      fetchMatchDetails(viewedMatch.id); // Refresh detail
      fetchMatches(); // Refresh list
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteGame = async (gameId) => {
    if (!window.confirm('Hapus partai ini?')) return;
    setFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/friendly-matches/${viewedMatch.id}/games/${gameId}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        let errMsg = 'Gagal menghapus partai';
        try {
          const err = await res.json();
          errMsg = err.message || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }
      setGameModalMode('add');
      setGameFormData({ player_id: '', opponent_name: '', score_home: 0, score_away: 0 });
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
    <div style={{ paddingTop: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '80vh', paddingBottom: '5rem' }}>
      
      {viewMode === 'list' ? (
        <>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>🤝 Pertandingan Persahabatan</h1>
              <p style={{ color: '#a0aec0', fontSize: '15px' }}>Catat dan kelola hasil pertandingan persahabatan Anda dengan PTM lain.</p>
            </div>
            {token && isAdmin && (
              <button 
                onClick={handleOpenAddMatch}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #00d4ff, #0284c7)',
                  color: 'black',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
                  fontFamily: '"Space Grotesk", sans-serif'
                }}
              >
                <i className="fa-solid fa-plus"></i> Tambah Pertandingan
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="glass" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <i className="fa-solid fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
              <input 
                type="text" 
                placeholder="Cari nama PTM Lawan..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 15px 10px 45px', color: 'white', outline: 'none' }}
              />
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 0' }}>
              <i className="fa-solid fa-circle-notch fa-spin fa-3x" style={{ color: '#00d4ff', marginBottom: '1rem' }}></i>
              <p style={{ color: '#9ca3af' }}>Mengambil data pertandingan...</p>
            </div>
          ) : error ? (
            <div className="glass" style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Gagal Memuat Data</h3>
              <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>{error}</p>
              <button onClick={fetchMatches} style={{ padding: '10px 24px', borderRadius: '12px', background: '#00d4ff', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                Coba Lagi
              </button>
            </div>
          ) : filteredMatches.length === 0 ? (
            <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <i className="fa-solid fa-handshake-slash" style={{ fontSize: '4rem', color: '#4b5563', marginBottom: '1rem' }}></i>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Belum ada pertandingan persahabatan</h3>
              <p style={{ color: '#9ca3af' }}>Mulai catat hasil latih tanding dan pertandingan persahabatan Anda.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left' }}>Tanggal</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left' }}>Nama PTM</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left' }}>Keterangan</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center' }}>Total Partai Menang (Anda - Lawan)</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left' }}>Hasil</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', width: '150px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMatches.map(match => {
                    const dateStr = match.match_date ? new Date(match.match_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '-';
                    const homeScore = match.total_score_home || 0;
                    const awayScore = match.total_score_away || 0;
                    const isWin = homeScore > awayScore;
                    const isLoss = awayScore > homeScore;
                    const isDraw = homeScore === awayScore && homeScore > 0;
                    const isNotPlayed = homeScore === 0 && awayScore === 0;

                    let badgeColor = '#9ca3af'; // gray
                    let badgeBg = 'rgba(156,163,175,0.15)';
                    let resultText = 'Belum Main';
                    if (isWin) {
                      badgeColor = '#10b981'; // green
                      badgeBg = 'rgba(16,185,129,0.15)';
                      resultText = 'Menang';
                    } else if (isLoss) {
                      badgeColor = '#ef4444'; // red
                      badgeBg = 'rgba(239,68,68,0.15)';
                      resultText = 'Kalah';
                    } else if (isDraw) {
                      badgeColor = '#ffc107'; // yellow
                      badgeBg = 'rgba(255,193,7,0.15)';
                      resultText = 'Seri';
                    }

                    return (
                      <tr key={match.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                        <td style={{ padding: '16px 20px', color: '#cbd5e1' }}>{dateStr}</td>
                        <td style={{ padding: '16px 20px', fontWeight: 600, color: 'white' }}>{match.ptm_name}</td>
                        <td style={{ padding: '16px 20px', color: '#9ca3af' }}>{match.notes || '-'}</td>
                        <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                          <span style={{ color: isWin ? '#10b981' : isLoss ? '#ef4444' : '#ffc107' }}>{homeScore}</span>
                          <span style={{ color: '#6b7280', margin: '0 8px' }}>-</span>
                          <span style={{ color: isLoss ? '#10b981' : isWin ? '#ef4444' : '#ffc107' }}>{awayScore}</span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{ color: badgeColor, background: badgeBg, padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', border: `1px solid ${badgeColor}20` }}>
                            {resultText}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button 
                              onClick={() => handleViewMatch(match.id)}
                              style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #00d4ff', color: '#00d4ff', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}
                            >
                              Detail
                            </button>
                            {token && isAdmin && (
                              <>
                                <button 
                                  onClick={() => handleOpenEditMatch(match)}
                                  style={{ padding: '4px', background: 'transparent', border: 'none', color: '#ffc107', cursor: 'pointer', fontSize: '15px' }}
                                  title="Edit"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button 
                                  onClick={() => handleDeleteMatch(match.id)}
                                  style={{ padding: '4px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '15px' }}
                                  title="Hapus"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div>
          {/* Summary Card */}
          {viewedMatch && (
            <div className="glass" style={{ padding: '24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '24px' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px', color: 'white' }}>🤝 Lawan {viewedMatch.ptm_name}</h2>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#9ca3af', marginBottom: '12px' }}>
                  <span><i className="fa-regular fa-calendar" style={{ marginRight: '6px', color: '#00d4ff' }}></i> {viewedMatch.match_date ? new Date(viewedMatch.match_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</span>
                  <span><i className="fa-solid fa-gamepad" style={{ marginRight: '6px', color: '#00d4ff' }}></i> {viewedMatch.games?.length || 0} Partai</span>
                </div>
                {viewedMatch.notes && (
                  <div style={{ fontSize: '14px', color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '6px', display: 'inline-block' }}>
                    <i className="fa-solid fa-note-sticky" style={{ marginRight: '6px', color: '#ffc107' }}></i> {viewedMatch.notes}
                  </div>
                )}
                
                <div style={{ marginTop: '20px' }}>
                  <button 
                    onClick={() => setViewMode('list')} 
                    style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}
                  >
                    <i className="fa-solid fa-arrow-left"></i> Kembali ke Daftar
                  </button>
                </div>
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 24px', borderRadius: '12px', textAlign: 'center', minWidth: '150px' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: viewedMatch.total_score_home > viewedMatch.total_score_away ? '#10b981' : viewedMatch.total_score_home < viewedMatch.total_score_away ? '#ef4444' : '#ffc107' }}>{viewedMatch.total_score_home || 0}</span>
                  <span style={{ color: '#6b7280', fontSize: '24px' }}>-</span>
                  <span style={{ color: viewedMatch.total_score_away > viewedMatch.total_score_home ? '#10b981' : viewedMatch.total_score_away < viewedMatch.total_score_home ? '#ef4444' : '#ffc107' }}>{viewedMatch.total_score_away || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af', marginTop: '4px', fontWeight: 'bold', textTransform: 'uppercase', gap: '20px' }}>
                  <span>Tim Anda</span>
                  <span>Lawan</span>
                </div>
              </div>
            </div>
          )}

          {/* Grid Layout */}
          {viewedMatch && (
            <div style={{ display: 'grid', gridTemplateColumns: token && isAdmin ? '320px 1fr' : '1fr', gap: '24px', alignItems: 'start' }}>
              
              {/* Form Tambah/Edit Partai (Left column) */}
              {token && isAdmin && (
                <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
                    {gameModalMode === 'add' ? 'Tambah Partai' : 'Edit Partai'}
                  </h3>
                  <form onSubmit={handleGameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Pemain Anda</label>
                      <select 
                        name="player_id" 
                        required 
                        value={gameFormData.player_id} 
                        onChange={handleGameInputChange} 
                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', color: 'white', outline: 'none' }}
                      >
                        <option value="">-- Pilih --</option>
                        {playersList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Pemain Lawan</label>
                      <input 
                        type="text" 
                        name="opponent_name" 
                        required 
                        value={gameFormData.opponent_name} 
                        onChange={handleGameInputChange} 
                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', color: 'white', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Skor (Game)</label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <input 
                          type="number" 
                          name="score_home" 
                          min="0" 
                          required 
                          placeholder="Anda" 
                          value={gameFormData.score_home} 
                          onChange={handleGameInputChange} 
                          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', color: 'white', outline: 'none', textAlign: 'center' }}
                        />
                        <span style={{ fontWeight: 800, color: '#6b7280' }}>-</span>
                        <input 
                          type="number" 
                          name="score_away" 
                          min="0" 
                          required 
                          placeholder="Lawan" 
                          value={gameFormData.score_away} 
                          onChange={handleGameInputChange} 
                          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px', color: 'white', outline: 'none', textAlign: 'center' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      {gameModalMode === 'edit' && (
                        <button 
                          type="button" 
                          onClick={() => {
                            setGameModalMode('add');
                            setGameFormData({ player_id: '', opponent_name: '', score_home: 0, score_away: 0 });
                          }} 
                          style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                        >
                          Batal
                        </button>
                      )}
                      <button 
                        type="submit" 
                        disabled={formLoading} 
                        style={{ flex: 2, padding: '10px', background: 'linear-gradient(135deg, #00d4ff, #0284c7)', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                      >
                        {formLoading ? 'Memproses...' : gameModalMode === 'add' ? 'Tambah' : 'Simpan'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Daftar Pertandingan (Right column) */}
              <div className="glass" style={{ padding: '20px', borderRadius: '16px', flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
                  Daftar Pertandingan
                </h3>
                
                {!viewedMatch.games || viewedMatch.games.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>
                    <i className="fa-solid fa-table-tennis-paddle-ball" style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }}></i>
                    <p>Belum ada data partai yang dimainkan.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textTransform: 'uppercase', fontSize: '11px', textAlign: 'left' }}>
                          <th style={{ padding: '12px 16px', width: '40px' }}>#</th>
                          <th style={{ padding: '12px 16px' }}>Pemain Anda</th>
                          <th style={{ padding: '12px 16px', width: '40px', textAlign: 'center' }}></th>
                          <th style={{ padding: '12px 16px' }}>Pemain Lawan</th>
                          <th style={{ padding: '12px 16px', textAlign: 'center' }}>Skor</th>
                          {token && isAdmin && <th style={{ padding: '12px 16px', width: '80px' }}>Aksi</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {viewedMatch.games.map((game, index) => {
                          const hScore = game.score_home;
                          const aScore = game.score_away;
                          const ptmPlayer = game.player?.name || 'Pemain BI';
                          const oppPlayer = game.opponent_name || 'Lawan';
                          const isHWin = hScore > aScore;
                          const isAWin = aScore > hScore;

                          return (
                            <tr key={game.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <td style={{ padding: '12px 16px', color: '#9ca3af' }}>{index + 1}</td>
                              <td style={{ padding: '12px 16px', fontWeight: 600, color: '#00d4ff' }}>{ptmPlayer}</td>
                              <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>VS</td>
                              <td style={{ padding: '12px 16px', fontWeight: 600, color: '#ef4444' }}>{oppPlayer}</td>
                              <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>
                                <span style={{ color: isHWin ? '#10b981' : isAWin ? '#6b7280' : 'inherit' }}>{hScore}</span>
                                <span style={{ color: '#6b7280', margin: '0 6px' }}>-</span>
                                <span style={{ color: isAWin ? '#10b981' : isHWin ? '#6b7280' : 'inherit' }}>{aScore}</span>
                              </td>
                              {token && isAdmin && (
                                <td style={{ padding: '12px 16px' }}>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                      onClick={() => handleOpenEditGame(game)} 
                                      style={{ background: 'transparent', border: 'none', color: '#ffc107', cursor: 'pointer', padding: '4px' }}
                                      title="Edit"
                                    >
                                      <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteGame(game.id)} 
                                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                      title="Hapus"
                                    >
                                      <i className="fa-solid fa-trash"></i>
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}
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

    </div>
  );
};

export default Persahabatan;
