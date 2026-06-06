import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const ManajemenTurnamen = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'single_elimination',
    start_date: '',
    end_date: '',
    third_place_match: true
  });
  const [formLoading, setFormLoading] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchTournaments = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/tournaments`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) throw new Error('Akses ditolak: Anda harus login.');
        throw new Error(`Gagal mengambil data: ${response.status}`);
      }
      
      const data = await response.json();
      setTournaments(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    setTimeout(() => setLoading(true), 0);
    fetchTournaments();
  }, [fetchTournaments]);

  const handleOpenModal = (mode, tournament = null) => {
    setModalMode(mode);
    if (mode === 'edit' && tournament) {
      setEditingId(tournament.slug);
      setFormData({
        name: tournament.name || '',
        description: tournament.description || '',
        type: tournament.type || 'single_elimination',
        start_date: tournament.start_date ? tournament.start_date.split('T')[0] : '',
        end_date: tournament.end_date ? tournament.end_date.split('T')[0] : '',
        third_place_match: tournament.third_place_match !== false
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        type: 'single_elimination',
        start_date: '',
        end_date: '',
        third_place_match: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const url = modalMode === 'add' ? `${API_URL}/tournaments` : `${API_URL}/tournaments/${editingId}`;
      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan turnamen');
      }

      handleCloseModal();
      fetchTournaments();
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (slug, e) => {
    e.stopPropagation();
    if (!window.confirm('Yakin ingin menghapus turnamen ini beserta seluruh jadwal pertandingannya?')) return;
    
    try {
      const response = await fetch(`${API_URL}/tournaments/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Gagal menghapus turnamen');
      fetchTournaments();
    } catch (err) {
      alert(err.message);
    }
  };

  const stats = {
    total: tournaments.length,
    ongoing: tournaments.filter(t => t.status === 'ongoing').length,
    pending: tournaments.filter(t => t.status === 'pending').length,
    finished: tournaments.filter(t => t.status === 'finished').length,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ffc107'; // yellow
      case 'ongoing': return '#10b981'; // green
      case 'finished': return '#a855f7'; // purple
      default: return '#9ca3af';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Belum Dimulai';
      case 'ongoing': return 'Sedang Berlangsung';
      case 'finished': return 'Selesai';
      default: return 'Tidak Diketahui';
    }
  };

  return (
    <div style={{ paddingTop: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh', paddingBottom: '5rem' }}>
      
      {/* Header */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>
          🏆 MANAJEMEN TURNAMEN
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#a0aec0', letterSpacing: '1px', marginBottom: '2rem' }}>
          Kelola semua turnamen tenis meja Anda di satu tempat.
        </p>
        
        {token && (
          <button 
            onClick={() => handleOpenModal('add')}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #00d4ff, #0284c7)',
              color: 'black',
              border: 'none',
              borderRadius: '50px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)'
            }}
          >
            <i className="fa-solid fa-plus"></i> Buat Turnamen Baru
          </button>
        )}
      </section>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        <div className="glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '16px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            <i className="fa-solid fa-trophy"></i>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.total}</div>
            <div style={{ fontSize: '0.85rem', color: '#a0aec0' }}>Total Turnamen</div>
          </div>
        </div>
        <div className="glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '16px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            <i className="fa-solid fa-circle-play"></i>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.ongoing}</div>
            <div style={{ fontSize: '0.85rem', color: '#a0aec0' }}>Berlangsung</div>
          </div>
        </div>
        <div className="glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '16px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.pending}</div>
            <div style={{ fontSize: '0.85rem', color: '#a0aec0' }}>Belum Dimulai</div>
          </div>
        </div>
        <div className="glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '16px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            <i className="fa-solid fa-flag-checkered"></i>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.finished}</div>
            <div style={{ fontSize: '0.85rem', color: '#a0aec0' }}>Selesai</div>
          </div>
        </div>
      </div>

      {/* Grid Turnamen */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: '#00d4ff' }}>
          <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
        </div>
      ) : error ? (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '1rem' }}></i>
          <h3 style={{ color: '#ef4444', fontSize: '1.25rem', fontWeight: 'bold' }}>Terjadi Kesalahan</h3>
          <p style={{ color: '#fca5a5' }}>{error}</p>
        </div>
      ) : tournaments.length === 0 ? (
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', color: '#9ca3af' }}>
          <i className="fa-solid fa-trophy" style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#4b5563' }}></i>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Belum ada turnamen</h3>
          <p>Buat turnamen pertama Anda dan mulai kelola bracket!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {tournaments.map(tournament => (
            <div 
              key={tournament.id} 
              onClick={() => navigate(`/manajemen-turnamen/${tournament.slug}`)}
              className="glass"
              style={{ padding: '1.5rem', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{tournament.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#9ca3af', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {tournament.description}
                  </p>
                </div>
                <span style={{ 
                  background: `${getStatusColor(tournament.status)}20`, 
                  color: getStatusColor(tournament.status), 
                  padding: '4px 10px', 
                  borderRadius: '50px', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  <i className="fa-solid fa-circle" style={{ fontSize: '6px' }}></i> {getStatusLabel(tournament.status)}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {(tournament.start_date || tournament.end_date) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                    <i className="fa-solid fa-calendar-days" style={{ color: '#00d4ff' }}></i>
                    <span>{tournament.start_date ? tournament.start_date.split('T')[0] : '?'} s/d {tournament.end_date ? tournament.end_date.split('T')[0] : '?'}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <i className="fa-solid fa-users" style={{ color: '#00d4ff' }}></i>
                  <span>{tournament.participant_count ?? 0} peserta</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <i className="fa-solid fa-sitemap" style={{ color: '#00d4ff' }}></i>
                  <span>{tournament.type === 'round_robin' ? 'Round Robin' : 'Single Elimination'}</span>
                </div>
              </div>

              {token && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }} onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => navigate(`/manajemen-turnamen/${tournament.slug}`)}
                    style={{ flex: 1, padding: '8px', background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    <i className="fa-solid fa-eye"></i> Bracket
                  </button>
                  {tournament.status === 'pending' && (
                    <button 
                      onClick={() => handleOpenModal('edit', tournament)}
                      style={{ padding: '8px 12px', background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: '8px', cursor: 'pointer' }}
                      title="Edit"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  )}
                  <button 
                    onClick={(e) => handleDelete(tournament.slug, e)}
                    style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', cursor: 'pointer' }}
                    title="Hapus"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'rgba(30, 30, 46, 0.95)', border: '1px solid rgba(0, 212, 255, 0.3)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '500px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <h2 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>
              {modalMode === 'add' ? 'Buat Turnamen Baru' : 'Edit Turnamen'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Nama Turnamen</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleInputChange} required
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Tipe Turnamen</label>
                <select 
                  name="type" value={formData.type} onChange={handleInputChange} required
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                >
                  <option value="single_elimination">Single Elimination (Bagan Gugur)</option>
                  <option value="round_robin">Round Robin (Klasemen Grup)</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Tgl Mulai</label>
                  <input 
                    type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} style={{ colorScheme: 'dark', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Tgl Selesai</label>
                  <input 
                    type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} style={{ colorScheme: 'dark', width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Deskripsi</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleInputChange} rows="3"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', resize: 'vertical' }}
                ></textarea>
              </div>
              {formData.type === 'single_elimination' && (
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input 
                    type="checkbox" name="third_place_match" id="third_place_match"
                    checked={formData.third_place_match} onChange={handleInputChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label htmlFor="third_place_match" style={{ color: '#a0aec0' }}>Buat pertandingan perebutan Juara 3</label>
                </div>
              )}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Batal</button>
                <button type="submit" disabled={formLoading} style={{ padding: '10px 20px', background: '#00d4ff', border: 'none', color: 'black', fontWeight: 'bold', borderRadius: '8px', cursor: formLoading ? 'not-allowed' : 'pointer', opacity: formLoading ? 0.7 : 1 }}>{formLoading ? 'Menyimpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenTurnamen;
