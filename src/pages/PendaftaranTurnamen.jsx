import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const PendaftaranTurnamen = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [currentTournament, setCurrentTournament] = useState(null);

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Custom player input
  const [customName, setCustomName] = useState('');
  const [customLoading, setCustomLoading] = useState(false);

  // Local state for groups & payment status per player (persisted in localStorage)
  const [playerGroups, setPlayerGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('ptm_player_groups');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [lunasStatus, setLunasStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('ptm_lunas_status');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const token = localStorage.getItem('token');

  // Fetch all tournaments & players list
  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [resT, resP] = await Promise.all([
        fetch(`${API_URL}/tournaments`, {
          headers: { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
        }),
        fetch(`${API_URL}/players?per_page=200`, {
          headers: { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
        })
      ]);

      let pendingTournaments = [];
      if (resT.ok) {
        const dataT = await resT.json();
        const list = dataT.data || [];
        // Prioritize pending/ongoing tournaments, or fallback to all
        pendingTournaments = list;
        setTournaments(list);
        if (list.length > 0) {
          const firstActive = list.find(t => t.status === 'pending' || t.status === 'ongoing') || list[0];
          setSelectedSlug(firstActive.slug);
        }
      }

      if (resP.ok) {
        const dataP = await resP.json();
        const pList = dataP.data || dataP || [];
        setPlayers(pList);
      }
    } catch (err) {
      setError('Gagal memuat data: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch details of selected tournament (including participants)
  const fetchTournamentDetail = useCallback(async (slug) => {
    if (!slug) return;
    try {
      const res = await fetch(`${API_URL}/tournaments/${slug}`, {
        headers: { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentTournament(data.data || null);
      }
    } catch (err) {
      console.error('Error fetching tournament details:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (selectedSlug) {
      fetchTournamentDetail(selectedSlug);
    }
  }, [selectedSlug, fetchTournamentDetail]);

  // Map participants to player IDs
  const participantPlayerIds = useMemo(() => {
    if (!currentTournament || !currentTournament.participants) return new Set();
    return new Set(currentTournament.participants.map(p => p.player_id).filter(Boolean));
  }, [currentTournament]);

  // Map participant obj by player_id
  const participantByPlayerId = useMemo(() => {
    if (!currentTournament || !currentTournament.participants) return {};
    const map = {};
    currentTournament.participants.forEach(p => {
      if (p.player_id) map[p.player_id] = p;
    });
    return map;
  }, [currentTournament]);

  // Handle Checkbox "Ikut Turnamen"
  const handleToggleParticipation = async (player) => {
    if (!selectedSlug) {
      alert('Pilih turnamen terlebih dahulu!');
      return;
    }

    setActionLoadingId(player.id);
    const isParticipating = participantPlayerIds.has(player.id);

    try {
      if (isParticipating) {
        // Remove participant
        const partObj = participantByPlayerId[player.id];
        if (partObj) {
          const res = await fetch(`${API_URL}/tournaments/${selectedSlug}/participants/${partObj.id}`, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
          });
          if (!res.ok) throw new Error('Gagal menghapus peserta');
        }
      } else {
        // Add participant
        const res = await fetch(`${API_URL}/tournaments/${selectedSlug}/participants`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ player_id: player.id, name: null })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Gagal menambahkan peserta');
        }
      }
      await fetchTournamentDetail(selectedSlug);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle group selection (A / B)
  const handleGroupChange = (playerId, groupVal) => {
    setPlayerGroups(prev => {
      const updated = { ...prev, [playerId]: groupVal };
      localStorage.setItem('ptm_player_groups', JSON.stringify(updated));
      return updated;
    });
  };

  // Handle Lunas toggle
  const handleToggleLunas = (playerId) => {
    setLunasStatus(prev => {
      const updated = { ...prev, [playerId]: !prev[playerId] };
      localStorage.setItem('ptm_lunas_status', JSON.stringify(updated));
      return updated;
    });
  };

  // Add custom manual participant name
  const handleAddCustomParticipant = async (e) => {
    e.preventDefault();
    if (!customName.trim()) return;
    if (!selectedSlug) {
      alert('Pilih turnamen terlebih dahulu!');
      return;
    }

    setCustomLoading(true);
    try {
      const res = await fetch(`${API_URL}/tournaments/${selectedSlug}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ player_id: null, name: customName.trim() })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Gagal menambahkan peserta manual');
      }
      setCustomName('');
      await fetchTournamentDetail(selectedSlug);
    } catch (err) {
      alert(err.message);
    } finally {
      setCustomLoading(false);
    }
  };

  // Delete non-registered (custom) participant
  const handleDeleteParticipant = async (participantId) => {
    if (!window.confirm('Yakin ingin menghapus peserta ini?')) return;
    try {
      const res = await fetch(`${API_URL}/tournaments/${selectedSlug}/participants/${participantId}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
      });
      if (!res.ok) throw new Error('Gagal menghapus peserta');
      await fetchTournamentDetail(selectedSlug);
    } catch (err) {
      alert(err.message);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,No,Nama,Group,Ikut Turnamen,Lunas\n";
    filteredPlayers.forEach((p, idx) => {
      const isIkut = participantPlayerIds.has(p.id) ? 'Ya' : 'Tidak';
      const grp = playerGroups[p.id] || '(A)';
      const lunas = lunasStatus[p.id] ? 'Lunas' : '--';
      csvContent += `${idx + 1},"${p.name}",${grp},${isIkut},${lunas}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `peserta_turnamen_${selectedSlug || 'ptm'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered player list
  const filteredPlayers = useMemo(() => {
    return players.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const pGroup = playerGroups[p.id] !== undefined ? playerGroups[p.id] : (p.id <= 25 ? '(A)' : (p.id <= 72 ? '(B)' : ''));
      const matchGroup = filterGroup === 'ALL' || pGroup === filterGroup;
      
      const isIkut = participantPlayerIds.has(p.id);
      const matchStatus = filterStatus === 'ALL' || 
        (filterStatus === 'IKUT' && isIkut) || 
        (filterStatus === 'TIDAK' && !isIkut);

      return matchSearch && matchGroup && matchStatus;
    });
  }, [players, searchTerm, filterGroup, filterStatus, playerGroups, participantPlayerIds]);

  const totalIkut = useMemo(() => {
    return currentTournament?.participants?.length || 0;
  }, [currentTournament]);

  const totalLunasCount = useMemo(() => {
    return Object.values(lunasStatus).filter(Boolean).length;
  }, [lunasStatus]);

  return (
    <div style={{ paddingTop: '110px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem', minHeight: '80vh', paddingBottom: '5rem' }}>
      
      {/* Header Title & Tournament Select */}
      <section style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '0.8rem' }}>
          📋 DAFTAR PESERTA TURNAMEN
        </h1>
        <p style={{ fontSize: '1rem', color: '#a0aec0', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          Kelola partisipasi pemain, grup, dan status pembayaran turnamen.
        </p>

        {/* Turnamen Selector */}
        {tournaments.length > 0 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0, 212, 255, 0.3)', padding: '8px 16px', borderRadius: '50px' }}>
            <i className="fa-solid fa-trophy" style={{ color: '#00d4ff' }}></i>
            <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '14px' }}>Turnamen:</span>
            <select 
              value={selectedSlug} 
              onChange={(e) => setSelectedSlug(e.target.value)}
              style={{ background: '#1e1e2e', color: '#00d4ff', border: 'none', fontWeight: 'bold', fontSize: '15px', padding: '4px 8px', cursor: 'pointer', outline: 'none' }}
            >
              {tournaments.map(t => (
                <option key={t.id} value={t.slug}>
                  {t.name} ({t.status.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        )}
      </section>

      {/* Stats Summary Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        <div className="glass" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
            <i className="fa-solid fa-users"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>{players.length}</div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Total Master Pemain</div>
          </div>
        </div>

        <div className="glass" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
            <i className="fa-solid fa-user-check"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>{totalIkut}</div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Ikut Turnamen</div>
          </div>
        </div>

        <div className="glass" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
            <i className="fa-solid fa-file-invoice-dollar"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7' }}>{totalLunasCount}</div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Status Lunas</div>
          </div>
        </div>
      </div>

      {/* Main Glass Card */}
      <div className="glass" style={{ borderRadius: '20px', padding: '24px', position: 'relative' }}>
        
        {/* Controls Toolbar: Search & Export */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 280px' }}>
            <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
            <input 
              type="text" 
              placeholder="Cari nama pemain..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 40px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '14px', outline: 'none' }}
            />
          </div>

          {/* Group & Status Filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select 
              value={filterGroup} 
              onChange={(e) => setFilterGroup(e.target.value)}
              style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#cbd5e1', fontSize: '14px', outline: 'none' }}
            >
              <option value="ALL" style={{ background: '#1e1e2e' }}>Semua Grup</option>
              <option value="(A)" style={{ background: '#1e1e2e' }}>Grup (A)</option>
              <option value="(B)" style={{ background: '#1e1e2e' }}>Grup (B)</option>
            </select>

            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#cbd5e1', fontSize: '14px', outline: 'none' }}
            >
              <option value="ALL" style={{ background: '#1e1e2e' }}>Semua Status</option>
              <option value="IKUT" style={{ background: '#1e1e2e' }}>Hanya Ikut</option>
              <option value="TIDAK" style={{ background: '#1e1e2e' }}>Belum/Tidak Ikut</option>
            </select>

            <button 
              onClick={handleExportCSV}
              style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #27ae60, #10b981)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)' }}
            >
              <i className="fa-solid fa-file-excel"></i> Export to Excel
            </button>
          </div>
        </div>

        {/* Custom Guest Registration Bar */}
        <form onSubmit={handleAddCustomParticipant} style={{ display: 'flex', gap: '10px', marginBottom: '24px', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', border: '1px dashed rgba(0, 212, 255, 0.3)' }}>
          <input 
            type="text" 
            placeholder="Tambah nama peserta manual / tamu..." 
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            style={{ flex: 1, padding: '8px 14px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '14px' }}
          />
          <button 
            type="submit" 
            disabled={customLoading || !customName.trim()}
            style={{ padding: '8px 18px', background: '#00d4ff', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: customLoading ? 'wait' : 'pointer' }}
          >
            {customLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-user-plus"></i> Tambah</>}
          </button>
        </form>

        {/* Unregistered Custom Participants Badge Section */}
        {currentTournament?.participants?.filter(p => !p.player_id).length > 0 && (
          <div style={{ marginBottom: '20px', padding: '14px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              <i className="fa-solid fa-user-tag"></i> Peserta Manual / Tamu ({currentTournament.participants.filter(p => !p.player_id).length}):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {currentTournament.participants.filter(p => !p.player_id).map(p => (
                <span key={p.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(245, 158, 11, 0.4)', color: 'white', padding: '4px 10px', borderRadius: '50px', fontSize: '13px' }}>
                  {p.name}
                  {token && (
                    <i className="fa-solid fa-xmark" style={{ color: '#ef4444', cursor: 'pointer', marginLeft: '4px' }} onClick={() => handleDeleteParticipant(p.id)} title="Hapus"></i>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#00d4ff' }}>
            <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{error}</div>
        ) : filteredPlayers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
            Tidak ada pemain yang sesuai dengan pencarian/filter.
          </div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: 'white' }}>
              <thead>
                <tr style={{ background: 'rgba(26, 58, 92, 0.8)', borderBottom: '2px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', textAlign: 'left' }}>
                  <th style={{ padding: '14px 16px', width: '60px', textAlign: 'center' }}>No</th>
                  <th style={{ padding: '14px 16px' }}>Nama</th>
                  <th style={{ padding: '14px 16px', width: '120px', textAlign: 'center' }}>Group</th>
                  <th style={{ padding: '14px 16px', width: '150px', textAlign: 'center' }}>Ikut Turnamen</th>
                  <th style={{ padding: '14px 16px', width: '120px', textAlign: 'center' }}>Lunas</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player, index) => {
                  const isChecked = participantPlayerIds.has(player.id);
                  const isSaving = actionLoadingId === player.id;
                  const currentGroup = playerGroups[player.id] !== undefined 
                    ? playerGroups[player.id] 
                    : (index < 25 ? '(A)' : (index < 72 ? '(B)' : ''));
                  const isLunas = !!lunasStatus[player.id];

                  return (
                    <tr 
                      key={player.id} 
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.05)', 
                        background: isChecked ? 'rgba(16, 185, 129, 0.06)' : 'transparent',
                        transition: 'background 0.2s'
                      }}
                    >
                      {/* No */}
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#9ca3af', fontWeight: 600 }}>
                        {index + 1}
                      </td>

                      {/* Nama */}
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                        <span style={{ color: isChecked ? '#10b981' : 'white' }}>{player.name}</span>
                        {player.itr_rating > 0 && (
                          <span style={{ marginLeft: '8px', fontSize: '11px', color: '#9ca3af', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                            Rating: {player.itr_rating}
                          </span>
                        )}
                      </td>

                      {/* Group */}
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <select
                          value={currentGroup}
                          onChange={(e) => handleGroupChange(player.id, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            background: 'rgba(0,0,0,0.5)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            borderRadius: '6px',
                            color: '#00d4ff',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          <option value="" style={{ background: '#1e1e2e', color: '#9ca3af' }}>--</option>
                          <option value="(A)" style={{ background: '#1e1e2e', color: 'white' }}>(A)</option>
                          <option value="(B)" style={{ background: '#1e1e2e', color: 'white' }}>(B)</option>
                        </select>
                      </td>

                      {/* Ikut Turnamen Checkbox */}
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        {isSaving ? (
                          <i className="fa-solid fa-spinner fa-spin" style={{ color: '#00d4ff' }}></i>
                        ) : (
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleParticipation(player)}
                            style={{
                              width: '20px',
                              height: '20px',
                              cursor: 'pointer',
                              accentColor: '#10b981'
                            }}
                          />
                        )}
                      </td>

                      {/* Status Lunas Toggle */}
                      <td 
                        onClick={() => handleToggleLunas(player.id)}
                        style={{ 
                          padding: '12px 16px', 
                          textAlign: 'center', 
                          cursor: 'pointer', 
                          fontWeight: 'bold', 
                          userSelect: 'none',
                          color: isLunas ? '#10b981' : '#6b7280'
                        }}
                      >
                        {isLunas ? (
                          <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '4px 10px', borderRadius: '50px', fontSize: '12px' }}>
                            <i className="fa-solid fa-check"></i> Lunas
                          </span>
                        ) : (
                          <span style={{ color: '#9ca3af' }}>--</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Summary */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#9ca3af', fontSize: '13px' }}>
          <div>
            Menampilkan <strong style={{ color: 'white' }}>{filteredPlayers.length}</strong> dari <strong style={{ color: 'white' }}>{players.length}</strong> master pemain
          </div>
          <div>
            Total Terdaftar: <strong style={{ color: '#10b981' }}>{totalIkut} peserta</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendaftaranTurnamen;