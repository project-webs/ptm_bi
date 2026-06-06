import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../config';
import './TurnamenDetail.css';

const TurnamenDetail = () => {
  const { slug } = useParams();
  const [tournament, setTournament] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('bracket');

  // Add Participant Form
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [customName, setCustomName] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  // Score Modal
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [scoreData, setScoreData] = useState({ score1: '', score2: '' });
  const [scoreLoading, setScoreLoading] = useState(false);

  // Bracket generation
  const [playersPerGroup, setPlayersPerGroup] = useState('');
  const [genLoading, setGenLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchTournament = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/tournaments/${slug}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Gagal memuat data turnamen');
      const data = await response.json();
      setTournament(data.data);
    } catch (err) {
      setError(err.message);
    }
  }, [slug, token]);

  const fetchPlayers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/players?per_page=200`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        setPlayers(data.data || data || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setTimeout(() => setLoading(true), 0);
      Promise.all([fetchTournament(), fetchPlayers()]).finally(() => setLoading(false));
    } else {
      setError("Akses ditolak: Anda harus login.");
      setLoading(false);
    }
  }, [token, fetchTournament, fetchPlayers]);

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    if (!selectedPlayerId && !customName) return;
    setAddLoading(true);
    try {
      const response = await fetch(`${API_URL}/tournaments/${slug}/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        body: JSON.stringify({ player_id: selectedPlayerId || null, name: customName || null })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Gagal menambah peserta');
      }
      setSelectedPlayerId('');
      setCustomName('');
      fetchTournament();
    } catch (err) {
      alert(err.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteParticipant = async (participantId) => {
    if (!window.confirm('Yakin ingin menghapus peserta ini?')) return;
    try {
      const response = await fetch(`${API_URL}/tournaments/${slug}/participants/${participantId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Gagal menghapus peserta');
      fetchTournament();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStartTournament = async (e) => {
    e.preventDefault();
    setGenLoading(true);
    try {
      const body = tournament.type === 'round_robin' && playersPerGroup ? { players_per_group: playersPerGroup } : {};
      const response = await fetch(`${API_URL}/tournaments/${slug}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Gagal memulai turnamen');
      }
      fetchTournament();
    } catch (err) {
      alert(err.message);
    } finally {
      setGenLoading(false);
    }
  };

  const handleResetBracket = async () => {
    if (!window.confirm('Reset bracket? Semua skor akan dihapus!')) return;
    try {
      const response = await fetch(`${API_URL}/tournaments/${slug}/reset-bracket`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Gagal reset bracket');
      fetchTournament();
    } catch (err) {
      alert(err.message);
    }
  };

  const openScoreModal = (match) => {
    setCurrentMatch(match);
    const s1 = match.score1 !== null ? match.score1 : '';
    const s2 = match.score2 !== null ? match.score2 : '';
    let winId = match.winner_id || '';
    if (!winId && s1 !== '' && s2 !== '') {
        if (parseInt(s1) > parseInt(s2)) winId = match.participant1_id;
        else if (parseInt(s2) > parseInt(s1)) winId = match.participant2_id;
    }
    
    let pointsP1 = [];
    let pointsP2 = [];
    const totalSets = (parseInt(s1) || 0) + (parseInt(s2) || 0);
    
    if (match.point_history && Array.isArray(match.point_history)) {
       pointsP1 = match.point_history.map(p => p.p1 !== undefined ? p.p1 : '');
       pointsP2 = match.point_history.map(p => p.p2 !== undefined ? p.p2 : '');
    }
    
    while (pointsP1.length < totalSets) pointsP1.push('');
    while (pointsP2.length < totalSets) pointsP2.push('');
    
    setScoreData({ 
      score1: s1, 
      score2: s2,
      winner_id: winId,
      points_p1: pointsP1.slice(0, totalSets),
      points_p2: pointsP2.slice(0, totalSets)
    });
    setScoreModalOpen(true);
  };

  const handleScoreChange = (field, value) => {
    setScoreData(prev => {
      const updated = { ...prev, [field]: value };
      const s1 = parseInt(updated.score1) || 0;
      const s2 = parseInt(updated.score2) || 0;
      
      if (s1 > s2 && currentMatch?.participant1_id) {
        updated.winner_id = currentMatch.participant1_id;
      } else if (s2 > s1 && currentMatch?.participant2_id) {
        updated.winner_id = currentMatch.participant2_id;
      } else {
        updated.winner_id = '';
      }

      const totalSets = s1 + s2;
      if (totalSets >= 0 && totalSets <= 9) {
        const newP1 = [...updated.points_p1];
        const newP2 = [...updated.points_p2];
        while (newP1.length < totalSets) newP1.push('');
        while (newP2.length < totalSets) newP2.push('');
        updated.points_p1 = newP1.slice(0, totalSets);
        updated.points_p2 = newP2.slice(0, totalSets);
      }
      return updated;
    });
  };

  const handlePointChange = (playerIndex, setIndex, value) => {
     setScoreData(prev => {
        const arrName = playerIndex === 1 ? 'points_p1' : 'points_p2';
        const newArr = [...prev[arrName]];
        newArr[setIndex] = value;
        return { ...prev, [arrName]: newArr };
     });
  };

  const handleSaveScore = async (e) => {
    e.preventDefault();
    if (!scoreData.winner_id) {
      alert("Pemenang harus dipilih!");
      return;
    }
    setScoreLoading(true);
    try {
      const response = await fetch(`${API_URL}/matches/${currentMatch.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        body: JSON.stringify({ 
          score1: scoreData.score1, 
          score2: scoreData.score2,
          winner_id: scoreData.winner_id,
          points_p1: scoreData.points_p1,
          points_p2: scoreData.points_p2
        })
      });
      if (!response.ok) throw new Error('Gagal menyimpan skor');
      setScoreModalOpen(false);
      fetchTournament();
    } catch (err) {
      alert(err.message);
    } finally {
      setScoreLoading(false);
    }
  };

  // Grouping logic for brackets
  const matchesByRound = useMemo(() => {
    if (!tournament || !tournament.matches) return {};
    if (tournament.type === 'round_robin') return {}; // Handle differently
    
    // Group single elimination matches by round
    const groups = {};
    tournament.matches.forEach(m => {
      if (m.bracket === 'final' || m.bracket === 'winner') {
        const r = m.round;
        if (!groups[r]) groups[r] = [];
        groups[r].push(m);
      }
    });
    return groups;
  }, [tournament]);

  const thirdPlaceMatch = useMemo(() => {
    if (!tournament || !tournament.matches) return null;
    return tournament.matches.find(m => m.bracket === 'third_place');
  }, [tournament]);


  if (loading) return <div style={{ paddingTop: '150px', textAlign: 'center', color: '#00d4ff' }}><i className="fa-solid fa-spinner fa-spin fa-3x"></i></div>;
  if (error) return <div style={{ paddingTop: '150px', textAlign: 'center', color: '#ef4444' }}>{error}</div>;
  if (!tournament) return null;

  return (
    <div style={{ paddingTop: '100px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh', paddingBottom: '5rem' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#9ca3af', marginBottom: '20px' }}>
        <Link to="/manajemen-turnamen" style={{ color: '#00d4ff', textDecoration: 'none' }}>Manajemen Turnamen</Link>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: '11px' }}></i>
        <span style={{ color: 'white', fontWeight: 'bold' }}>{tournament.name}</span>
        
        <span style={{ marginLeft: 'auto', background: tournament.status === 'pending' ? 'rgba(255,193,7,0.2)' : tournament.status === 'ongoing' ? 'rgba(16,185,129,0.2)' : 'rgba(168,85,247,0.2)', color: tournament.status === 'pending' ? '#ffc107' : tournament.status === 'ongoing' ? '#10b981' : '#a855f7', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>
          {tournament.status.toUpperCase()}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Main Content Area */}
        <div style={{ flex: '1 1 700px', minWidth: 0 }}>
          
          {/* Tabs Nav */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '12px', marginBottom: '20px' }}>
            <button 
              onClick={() => setActiveTab('bracket')}
              style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: 'none', background: activeTab === 'bracket' ? '#00d4ff' : 'transparent', color: activeTab === 'bracket' ? 'black' : '#9ca3af', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
            >
              <i className="fa-solid fa-sitemap"></i> Bracket
            </button>
            <button 
              onClick={() => setActiveTab('participants')}
              style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: 'none', background: activeTab === 'participants' ? '#00d4ff' : 'transparent', color: activeTab === 'participants' ? 'black' : '#9ca3af', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <i className="fa-solid fa-users"></i> Peserta
              <span style={{ background: activeTab === 'participants' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '50px', fontSize: '11px' }}>
                {tournament.participants?.length || 0}
              </span>
            </button>
          </div>

          {/* TAB: BRACKET */}
          {activeTab === 'bracket' && (
            <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
              {tournament.status === 'pending' ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏓</div>
                  <h3 style={{ color: 'white', marginBottom: '8px' }}>Bracket Belum Di-generate</h3>
                  <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Tambahkan minimal 2 peserta, lalu klik tombol di bawah untuk membuat bracket.</p>
                  
                  {tournament.participants?.length >= 2 ? (
                    <form onSubmit={handleStartTournament}>
                      {tournament.type === 'round_robin' && (
                        <div style={{ marginBottom: '16px', maxWidth: '300px', margin: '0 auto 16px' }}>
                          <label style={{ display: 'block', color: '#a0aec0', marginBottom: '8px', fontSize: '13px' }}>Jumlah Pemain per Grup (Opsional)</label>
                          <input type="number" min="2" value={playersPerGroup} onChange={e => setPlayersPerGroup(e.target.value)} placeholder="Misal: 4" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '8px', color: 'white' }} />
                        </div>
                      )}
                      <button type="submit" disabled={genLoading} style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
                        <i className="fa-solid fa-circle-play"></i> {genLoading ? 'Memproses...' : 'Generate Bracket & Mulai Turnamen'}
                      </button>
                    </form>
                  ) : (
                    <div style={{ display: 'inline-block', padding: '12px 24px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px' }}>
                      <i className="fa-solid fa-circle-info"></i> Tambahkan minimal 2 peserta terlebih dahulu
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {/* SINGLE ELIMINATION BRACKET */}
                  {tournament.type === 'single_elimination' && (
                    <div style={{ overflowX: 'auto', paddingBottom: '20px' }}>
                      <div style={{ display: 'flex', gap: '30px', minWidth: 'max-content' }}>
                        {Object.keys(matchesByRound).sort((a,b)=>a-b).map((roundStr, rIdx, arr) => {
                          const round = parseInt(roundStr);
                          const matches = matchesByRound[round];
                          const isLast = rIdx === arr.length - 1;
                          const label = matches.length === 1 && isLast ? 'Final' : matches.length === 2 ? 'Semifinal' : `Babak ${round}`;
                          
                          return (
                            <div key={round} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minWidth: '220px', position: 'relative' }}>
                              <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>{label}</div>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-around', gap: '20px' }}>
                                {matches.sort((a,b)=>a.match_number - b.match_number).map(match => {
                                  const isFinal = match.bracket === 'final';
                                  const canClick = !match.is_bye && match.participant1_id && match.participant2_id && match.status !== 'finished';
                                  return (
                                    <div key={match.id} style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1 }}>
                                      {/* Connector Line to next round */}
                                      {!isLast && <div style={{ position: 'absolute', right: '-30px', top: '50%', width: '30px', height: '2px', background: 'rgba(255,255,255,0.1)' }}></div>}
                                      
                                      <div 
                                        onClick={() => canClick && openScoreModal(match)}
                                        style={{ 
                                          background: isFinal ? 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(0,0,0,0.5))' : 'rgba(0,0,0,0.3)', 
                                          border: isFinal ? '2px solid rgba(245,158,11,0.5)' : '1px solid rgba(255,255,255,0.1)', 
                                          borderRadius: '8px', width: '220px', cursor: canClick ? 'pointer' : 'default', overflow: 'hidden', position: 'relative',
                                          opacity: match.is_bye ? 0.7 : 1, transition: 'all 0.3s'
                                        }}
                                        className={canClick ? 'match-card hoverable' : 'match-card'}
                                      >
                                        {isFinal && <div style={{ background: 'linear-gradient(90deg, #f59e0b, #ef4444)', color: 'white', fontSize: '10px', fontWeight: 'bold', textAlign: 'center', padding: '4px', textTransform: 'uppercase' }}>🏆 Final</div>}
                                        <div style={{ position: 'absolute', top: '4px', right: '6px', fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>#{match.match_number}</div>
                                        
                                        {/* Player 1 */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                          <span style={{ fontSize: '13px', color: match.winner_id === match.participant1_id ? '#10b981' : match.winner_id ? '#6b7280' : 'white', fontWeight: match.winner_id === match.participant1_id ? 'bold' : 'normal', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {match.player1_name || (match.is_bye ? 'BYE' : 'TBD')}
                                          </span>
                                          {match.status === 'finished' && !match.is_bye && <span style={{ fontSize: '14px', fontWeight: 'bold', color: match.winner_id === match.participant1_id ? '#10b981' : '#6b7280' }}>{match.score1}</span>}
                                        </div>
                                        
                                        {/* Player 2 */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px' }}>
                                          <span style={{ fontSize: '13px', color: match.winner_id === match.participant2_id ? '#10b981' : match.winner_id ? '#6b7280' : 'white', fontWeight: match.winner_id === match.participant2_id ? 'bold' : 'normal', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {match.player2_name || 'TBD'}
                                          </span>
                                          {match.status === 'finished' && !match.is_bye && <span style={{ fontSize: '14px', fontWeight: 'bold', color: match.winner_id === match.participant2_id ? '#10b981' : '#6b7280' }}>{match.score2}</span>}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Third Place Match */}
                  {tournament.type === 'single_elimination' && thirdPlaceMatch && (
                    <div style={{ marginTop: '30px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>🥉 Perebutan Juara 3</div>
                      <div 
                        onClick={() => (!thirdPlaceMatch.is_bye && thirdPlaceMatch.participant1_id && thirdPlaceMatch.participant2_id && thirdPlaceMatch.status !== 'finished') && openScoreModal(thirdPlaceMatch)}
                        style={{ background: 'rgba(0,0,0,0.3)', border: '2px solid rgba(168,85,247,0.3)', borderRadius: '8px', width: '220px', cursor: 'pointer', overflow: 'hidden' }}
                        className="match-card hoverable"
                      >
                        <div style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)', color: 'white', fontSize: '10px', fontWeight: 'bold', textAlign: 'center', padding: '4px', textTransform: 'uppercase' }}>🥉 Juara 3</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ fontSize: '13px', color: thirdPlaceMatch.winner_id === thirdPlaceMatch.participant1_id ? '#10b981' : thirdPlaceMatch.winner_id ? '#6b7280' : 'white' }}>{thirdPlaceMatch.player1_name || 'TBD'}</span>
                          {thirdPlaceMatch.status === 'finished' && <span style={{ fontSize: '14px', fontWeight: 'bold', color: thirdPlaceMatch.winner_id === thirdPlaceMatch.participant1_id ? '#10b981' : '#6b7280' }}>{thirdPlaceMatch.score1}</span>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px' }}>
                          <span style={{ fontSize: '13px', color: thirdPlaceMatch.winner_id === thirdPlaceMatch.participant2_id ? '#10b981' : thirdPlaceMatch.winner_id ? '#6b7280' : 'white' }}>{thirdPlaceMatch.player2_name || 'TBD'}</span>
                          {thirdPlaceMatch.status === 'finished' && <span style={{ fontSize: '14px', fontWeight: 'bold', color: thirdPlaceMatch.winner_id === thirdPlaceMatch.participant2_id ? '#10b981' : '#6b7280' }}>{thirdPlaceMatch.score2}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ROUND ROBIN STANDINGS AND MATCHES */}
                  {tournament.type === 'round_robin' && (
                    <div style={{ color: 'white' }}>
                      {/* Standings Tables */}
                      {tournament.standings && tournament.standings.map(group => (
                        <div key={group.name} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '24px', overflow: 'hidden' }}>
                          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '16px', margin: 0, color: 'white' }}>
                              <i className="fa-solid fa-list-ol" style={{ color: '#00d4ff' }}></i> &nbsp;Klasemen (Grup {group.name})
                            </h3>
                          </div>
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                              <thead>
                                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: '#9ca3af', textAlign: 'left' }}>
                                  <th style={{ padding: '12px', width: '40px', textAlign: 'center' }}>#</th>
                                  <th style={{ padding: '12px' }}>Peserta</th>
                                  <th style={{ padding: '12px', textAlign: 'center' }} title="Main">M</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: '#10b981' }} title="Menang">W</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: '#ef4444' }} title="Kalah">L</th>
                                  <th style={{ padding: '12px', textAlign: 'center' }} title="Set Won">SW</th>
                                  <th style={{ padding: '12px', textAlign: 'center' }} title="Set Lost">SL</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: '#00d4ff' }} title="Set Difference">SD</th>
                                  <th style={{ padding: '12px', textAlign: 'center' }} title="Point Won">PW</th>
                                  <th style={{ padding: '12px', textAlign: 'center' }} title="Point Lost">PL</th>
                                  <th style={{ padding: '12px', textAlign: 'center', color: '#a855f7' }} title="Point Difference">PD</th>
                                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: '#00d4ff' }}>Poin</th>
                                </tr>
                              </thead>
                              <tbody>
                                {group.standings.map((row, index) => (
                                  <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: '#9ca3af' }}>{index + 1}</td>
                                    <td style={{ padding: '12px', fontWeight: 600, color: 'white' }}>
                                      {row.name}
                                      {index === 0 && tournament.status === 'finished' && <i className="fa-solid fa-crown" style={{ color: '#f59e0b', marginLeft: '8px' }}></i>}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.played}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#10b981' }}>{row.won}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#ef4444' }}>{row.lost}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.set_won}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.set_lost}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: row.set_diff > 0 ? '#10b981' : (row.set_diff < 0 ? '#ef4444' : '#9ca3af') }}>
                                      {row.set_diff > 0 ? `+${row.set_diff}` : row.set_diff}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.point_won}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{row.point_lost}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700, color: row.point_diff > 0 ? '#10b981' : (row.point_diff < 0 ? '#ef4444' : '#9ca3af') }}>
                                      {row.point_diff > 0 ? `+${row.point_diff}` : row.point_diff}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: '#00d4ff' }}>{row.points}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}

                      {/* Matches List */}
                      <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                          <h3 style={{ fontSize: '16px', margin: 0, color: 'white' }}>
                            <i className="fa-solid fa-calendar-days" style={{ color: '#10b981' }}></i> &nbsp;Jadwal Pertandingan
                          </h3>
                        </div>
                        <div style={{ padding: '20px' }}>
                          {Object.entries(tournament.matches.reduce((acc, match) => {
                            const groupName = match.bracket.replace('round_robin_', '') || 'A';
                            if (!acc[groupName]) acc[groupName] = {};
                            if (!acc[groupName][match.round]) acc[groupName][match.round] = [];
                            acc[groupName][match.round].push(match);
                            return acc;
                          }, {})).map(([groupName, rounds]) => (
                            <div key={groupName} style={{ marginBottom: '24px' }}>
                              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#00d4ff', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                                <i className="fa-solid fa-users"></i> Grup {groupName}
                              </h4>
                              {Object.entries(rounds).sort(([a], [b]) => Number(a) - Number(b)).map(([round, matches]) => (
                                <div key={round} style={{ marginBottom: '20px', marginLeft: '12px' }}>
                                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', marginBottom: '12px' }}>
                                    Ronde {round}
                                  </div>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                                    {matches.map(match => {
                                      const canClick = !match.is_bye && match.participant1_id && match.participant2_id && match.status !== 'finished';
                                      return (
                                        <div key={match.id} 
                                          onClick={() => canClick && openScoreModal(match)}
                                          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: canClick ? 'pointer' : 'default', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                                          className={canClick ? 'hoverable match-card' : 'match-card'}
                                        >
                                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <span style={{ fontSize: '13px', fontWeight: match.winner_id === match.participant1_id ? 'bold' : 'normal', color: match.winner_id === match.participant1_id ? '#10b981' : (match.winner_id ? '#6b7280' : 'white') }}>
                                              {match.player1_name || (match.is_bye ? 'BYE' : 'TBD')}
                                              {match.winner_id === match.participant1_id && <i className="fa-solid fa-crown" style={{ color: '#f59e0b', fontSize: '10px', marginLeft: '6px' }}></i>}
                                            </span>
                                            {match.status === 'finished' && !match.is_bye && <span style={{ fontSize: '14px', fontWeight: 'bold', color: match.winner_id === match.participant1_id ? '#10b981' : '#6b7280' }}>{match.score1}</span>}
                                          </div>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: match.winner_id === match.participant2_id ? 'bold' : 'normal', color: match.winner_id === match.participant2_id ? '#10b981' : (match.winner_id ? '#6b7280' : 'white') }}>
                                              {match.player2_name || 'TBD'}
                                              {match.winner_id === match.participant2_id && <i className="fa-solid fa-crown" style={{ color: '#f59e0b', fontSize: '10px', marginLeft: '6px' }}></i>}
                                            </span>
                                            {match.status === 'finished' && !match.is_bye && <span style={{ fontSize: '14px', fontWeight: 'bold', color: match.winner_id === match.participant2_id ? '#10b981' : '#6b7280' }}>{match.score2}</span>}
                                          </div>
                                          
                                          {canClick && (
                                            <div style={{ textAlign: 'center', padding: '6px', background: 'rgba(0,212,255,0.1)', fontSize: '11px', color: '#00d4ff', fontWeight: 600, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                              <i className="fa-solid fa-pen"></i> Input skor
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={handleResetBracket} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '6px', cursor: 'pointer' }}>
                      <i className="fa-solid fa-rotate-left"></i> Reset Bracket
                    </button>
                    <small style={{ display: 'block', color: '#6b7280', marginTop: '8px' }}>*Hati-hati: Menghapus semua hasil pertandingan</small>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: PESERTA */}
          {activeTab === 'participants' && (
            <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'white', fontSize: '1.25rem' }}>Daftar Peserta</h2>
                <div style={{ color: '#00d4ff', fontWeight: 'bold' }}>Total: {tournament.participants?.length || 0}</div>
              </div>

              {tournament.status === 'pending' && (
                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                  <h3 style={{ color: '#00d4ff', fontSize: '1rem', marginBottom: '12px' }}><i className="fa-solid fa-user-plus"></i> Tambah Peserta</h3>
                  <form onSubmit={handleAddParticipant} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <select 
                      value={selectedPlayerId} 
                      onChange={e => setSelectedPlayerId(e.target.value)}
                      disabled={customName !== ''}
                      style={{ flex: 1, minWidth: '200px', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}
                    >
                      <option value="">-- Pilih dari Pemain --</option>
                      {players.map(p => (
                        <option key={p.id} value={p.id}>{p.name} {p.division ? `(${p.division})` : ''}</option>
                      ))}
                    </select>
                    <span style={{ color: '#6b7280', alignSelf: 'center' }}>atau</span>
                    <input 
                      type="text" 
                      placeholder="Ketik Nama Bebas..." 
                      value={customName}
                      onChange={e => setCustomName(e.target.value)}
                      disabled={selectedPlayerId !== ''}
                      style={{ flex: 1, minWidth: '200px', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}
                    />
                    <button type="submit" disabled={addLoading || (!selectedPlayerId && !customName)} style={{ padding: '10px 20px', background: '#00d4ff', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                      {addLoading ? 'Menambahkan...' : 'Tambah'}
                    </button>
                  </form>
                </div>
              )}

              {tournament.participants?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tournament.participants.map((p, idx) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '28px', height: '28px', background: 'rgba(0,212,255,0.1)', color: '#00d4ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{idx + 1}</div>
                        <div>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>{p.name}</div>
                          {p.player && <div style={{ color: '#9ca3af', fontSize: '12px' }}>ITR: {p.player.itr_rating} | Div: {p.player.division || '-'}</div>}
                        </div>
                      </div>
                      {tournament.status === 'pending' && (
                        <button onClick={() => handleDeleteParticipant(p.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>Belum ada peserta.</div>
              )}
            </div>
          )}

        </div>

        {/* Sidebar Info */}
        <div style={{ flex: '0 0 300px', width: '100%' }}>
          <div className="glass" style={{ padding: '20px', borderRadius: '16px', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '13px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Detail Turnamen</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }}>
              <span style={{ color: '#9ca3af' }}>Format</span>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{tournament.type === 'single_elimination' ? 'Single Elimination' : 'Round Robin'}</span>
            </div>
            {tournament.start_date && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }}>
                <span style={{ color: '#9ca3af' }}>Tanggal</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}>{tournament.start_date.split('T')[0]}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }}>
              <span style={{ color: '#9ca3af' }}>Peserta</span>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{tournament.participants?.length || 0} Orang</span>
            </div>
            {tournament.type === 'single_elimination' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '13px' }}>
                <span style={{ color: '#9ca3af' }}>Perebutan Juara 3</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}>{tournament.third_place_match ? 'Ya' : 'Tidak'}</span>
              </div>
            )}
            
            {tournament.description && (
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>Deskripsi</div>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>{tournament.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Score Input Modal */}
      {scoreModalOpen && currentMatch && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'rgba(30, 30, 46, 0.95)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '400px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <h2 style={{ color: 'white', marginBottom: '24px', textAlign: 'center', fontSize: '1.25rem' }}>Input Skor Pertandingan</h2>
            
            <form onSubmit={handleSaveScore}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
                <div style={{ flex: 1, color: 'white', fontWeight: 'bold', fontSize: '15px' }}>{currentMatch.player1_name}</div>
                <div style={{ textAlign: 'center' }}>
                  <input type="number" min="0" required value={scoreData.score1} onChange={e => handleScoreChange('score1', e.target.value)} style={{ width: '60px', height: '40px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', background: 'rgba(0,0,0,0.5)', border: '1px solid #00d4ff', borderRadius: '6px', color: '#00d4ff' }} />
                  <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>Set Menang</div>
                </div>
              </div>

              <div style={{ textAlign: 'center', color: '#6b7280', fontWeight: 'bold', margin: '10px 0' }}>VS</div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
                <div style={{ flex: 1, color: 'white', fontWeight: 'bold', fontSize: '15px' }}>{currentMatch.player2_name}</div>
                <div style={{ textAlign: 'center' }}>
                  <input type="number" min="0" required value={scoreData.score2} onChange={e => handleScoreChange('score2', e.target.value)} style={{ width: '60px', height: '40px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', background: 'rgba(0,0,0,0.5)', border: '1px solid #00d4ff', borderRadius: '6px', color: '#00d4ff' }} />
                  <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>Set Menang</div>
                </div>
              </div>

              {scoreData.points_p1.length > 0 && (
                <div style={{ marginBottom: '30px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>POIN PER SET (Opsional)</div>
                  {scoreData.points_p1.map((val, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 'bold' }}>S{idx + 1}</span>
                        <input type="number" min="0" max="99" value={scoreData.points_p1[idx]} onChange={e => handlePointChange(1, idx, e.target.value)} style={{ flex: 1, height: '36px', textAlign: 'center', background: 'rgba(0,0,0,0.5)', border: '1px solid #374151', borderRadius: '6px', color: 'white' }} />
                        <span style={{ color: '#6b7280' }}>-</span>
                        <input type="number" min="0" max="99" value={scoreData.points_p2[idx]} onChange={e => handlePointChange(2, idx, e.target.value)} style={{ flex: 1, height: '36px', textAlign: 'center', background: 'rgba(0,0,0,0.5)', border: '1px solid #374151', borderRadius: '6px', color: 'white' }} />
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginBottom: '30px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 'bold', marginBottom: '10px' }}>PEMENANG</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div onClick={() => setScoreData(prev => ({...prev, winner_id: currentMatch.participant1_id}))} style={{ flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', border: scoreData.winner_id === currentMatch.participant1_id ? '2px solid #10b981' : '1px solid #374151', borderRadius: '8px', background: scoreData.winner_id === currentMatch.participant1_id ? 'rgba(16,185,129,0.1)' : 'transparent', color: scoreData.winner_id === currentMatch.participant1_id ? '#10b981' : 'white', fontWeight: 'bold' }}>
                    {scoreData.winner_id === currentMatch.participant1_id && <i className="fa-solid fa-crown" style={{marginRight: '6px'}}></i>}
                    {currentMatch.player1_name}
                  </div>
                  <div onClick={() => setScoreData(prev => ({...prev, winner_id: currentMatch.participant2_id}))} style={{ flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', border: scoreData.winner_id === currentMatch.participant2_id ? '2px solid #f59e0b' : '1px solid #374151', borderRadius: '8px', background: scoreData.winner_id === currentMatch.participant2_id ? 'rgba(245,158,11,0.1)' : 'transparent', color: scoreData.winner_id === currentMatch.participant2_id ? '#f59e0b' : 'white', fontWeight: 'bold' }}>
                    {scoreData.winner_id === currentMatch.participant2_id && <i className="fa-solid fa-crown" style={{marginRight: '6px'}}></i>}
                    {currentMatch.player2_name}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => setScoreModalOpen(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Batal</button>
                <button type="submit" disabled={scoreLoading} style={{ flex: 1, padding: '12px', background: '#00d4ff', border: 'none', color: 'black', borderRadius: '8px', cursor: scoreLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: scoreLoading ? 0.7 : 1 }}>
                  {scoreLoading ? 'Menyimpan...' : 'Simpan Skor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TurnamenDetail;
