import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Pemain = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Laki-laki',
    division: '',
    itr_rating: '',
    match_played: 0,
    win_count: 0,
    lose_count: 0
  });
  const [formLoading, setFormLoading] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = user?.role === 'admin';

  const fetchPlayers = () => {
    setLoading(true);
    fetch(`${API_URL}/players?per_page=100`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Akses ditolak: Anda harus login untuk melihat data pemain.');
          }
          throw new Error('Gagal mengambil data dari API (Status: ' + response.status + ')');
        }
        return response.json();
      })
      .then(data => {
        let playersData = [];
        // The API returns paginated data (data.data) or simple array.
        if (data.data && Array.isArray(data.data)) {
          playersData = data.data;
        } else if (Array.isArray(data)) {
          playersData = data;
        } else if (data.status === 'success' && data.data) {
          playersData = data.data;
        }

        setPlayers(playersData);

        if (data.message === 'Unauthenticated.') {
          setError('Akses ditolak: Anda harus login untuk melihat data pemain.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleOpenModal = (mode, player = null) => {
    setModalMode(mode);
    if (mode === 'edit' && player) {
      setEditingId(player.id);
      setFormData({
        name: player.name || '',
        gender: player.gender || 'Laki-laki',
        division: player.division || '',
        itr_rating: player.itr_rating || '',
        match_played: player.match_played || 0,
        win_count: player.win_count || 0,
        lose_count: player.lose_count || 0
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', gender: 'Laki-laki', division: '', itr_rating: '', match_played: 0, win_count: 0, lose_count: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', gender: 'Laki-laki', division: '', itr_rating: '', match_played: 0, win_count: 0, lose_count: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const url = modalMode === 'add' ? `${API_URL}/players` : `${API_URL}/players/${editingId}`;
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
        throw new Error(errorData.message || 'Terjadi kesalahan saat menyimpan data');
      }

      handleCloseModal();
      fetchPlayers();
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pemain ini?')) return;
    
    try {
      const response = await fetch(`${API_URL}/players/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus data pemain');
      }

      fetchPlayers();
    } catch (err) {
      alert(err.message);
    }
  };

  const renderPlayerCard = (player) => (
    <div key={player.id} className="glass" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s ease', borderTop: player.gender === 'Perempuan' ? '3px solid #ec4899' : '3px solid #00d4ff', ':hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 25px rgba(0,212,255,0.2)' } }}>
      {/* Admin Actions */}
      {token && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
          <button 
            onClick={() => handleOpenModal('edit', player)}
            style={{ background: 'rgba(255, 193, 7, 0.2)', color: '#ffc107', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
            title="Edit"
          >
            <i className="fa-solid fa-pen"></i>
          </button>
          <button 
            onClick={() => handleDelete(player.id)}
            style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
            title="Hapus"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      )}

      <div style={{ padding: '1.5rem', paddingTop: token ? '2.5rem' : '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{player.name}</h3>
          <div style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold' }}>
            {player.division || 'No Div'}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', background: 'rgba(0, 0, 0, 0.2)', padding: '0.75rem', borderRadius: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: player.gender === 'Perempuan' ? 'linear-gradient(135deg, #ec4899, #be185d)' : 'linear-gradient(135deg, #00d4ff, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '1.2rem' }}>
            <i className="fa-solid fa-ranking-star"></i>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>ITR Rating</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: '"Orbitron", monospace', color: player.gender === 'Perempuan' ? '#ec4899' : '#00d4ff' }}>
              {player.itr_rating || '0'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '1rem', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <div>
             <div style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase' }}>Main</div>
             <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>{player.match_played || 0}</div>
          </div>
          <div>
             <div style={{ fontSize: '10px', color: '#10b981', textTransform: 'uppercase' }}>Menang</div>
             <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>{player.win_count || 0}</div>
          </div>
          <div>
             <div style={{ fontSize: '10px', color: '#ef4444', textTransform: 'uppercase' }}>Kalah</div>
             <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444' }}>{player.lose_count || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.division && p.division.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const playersPutra = filteredPlayers.filter(p => p.gender !== 'Perempuan');
  const playersPutri = filteredPlayers.filter(p => p.gender === 'Perempuan');

  return (
    <div style={{ paddingTop: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh', paddingBottom: '5rem' }}>
      
      {/* Header Section */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>
          DAFTAR PEMAIN PTM BI
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#a0aec0', letterSpacing: '1px', marginBottom: '2rem' }}>
          Daftar anggota pemain dan rating ITR (Indonesian Table Tennis Rating)
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <i className="fa-solid fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }}></i>
            <input 
              type="text" 
              placeholder="Cari nama atau divisi pemain..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px 12px 45px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '50px',
                color: 'white',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 15px rgba(0,212,255,0.3)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
          </div>

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
              <i className="fa-solid fa-plus"></i> Tambah Pemain
            </button>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: '#00d4ff' }}>
            <i className="fa-solid fa-circle-notch fa-spin fa-3x"></i>
          </div>
        ) : error ? (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#ef4444', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Terjadi Kesalahan</h3>
            <p style={{ color: '#fca5a5' }}>{error}</p>
          </div>
        ) : players.length === 0 ? (
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
            <i className="fa-solid fa-users-slash" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4b5563' }}></i>
            <p>Belum ada data pemain yang terdaftar.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{ color: '#00d4ff', borderBottom: '2px solid rgba(0, 212, 255, 0.3)', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-mars"></i> Pemain Putra
              </h2>
              {playersPutra.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {playersPutra.map(renderPlayerCard)}
                </div>
              ) : (
                <p style={{ color: '#9ca3af' }}>Tidak ada data pemain putra.</p>
              )}
            </div>

            <div>
              <h2 style={{ color: '#ec4899', borderBottom: '2px solid rgba(236, 72, 153, 0.3)', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-venus"></i> Pemain Putri
              </h2>
              {playersPutri.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {playersPutri.map(renderPlayerCard)}
                </div>
              ) : (
                <p style={{ color: '#9ca3af' }}>Tidak ada data pemain putri.</p>
              )}
            </div>
          </>
        )}
      </section>

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'rgba(30, 30, 46, 0.95)', border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '500px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>
              {modalMode === 'add' ? 'Tambah Pemain' : 'Edit Pemain'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Nama Pemain</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Jenis Kelamin</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                >
                  <option value="Laki-laki">Putra (Laki-laki)</option>
                  <option value="Perempuan">Putri (Perempuan)</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Divisi</label>
                <input 
                  type="text" 
                  name="division"
                  value={formData.division}
                  onChange={handleInputChange}
                  placeholder="e.g. Divisi 1"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>ITR Rating</label>
                <input 
                  type="number" 
                  name="itr_rating"
                  value={formData.itr_rating}
                  onChange={handleInputChange}
                  placeholder="e.g. 1500"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem', fontSize: '12px' }}>Main</label>
                  <input type="number" name="match_played" value={formData.match_played} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#10b981', marginBottom: '0.5rem', fontSize: '12px' }}>Menang</label>
                  <input type="number" name="win_count" value={formData.win_count} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', color: '#10b981' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ef4444', marginBottom: '0.5rem', fontSize: '12px' }}>Kalah</label>
                  <input type="number" name="lose_count" value={formData.lose_count} onChange={handleInputChange} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={formLoading}
                  style={{ padding: '10px 20px', background: '#00d4ff', border: 'none', color: 'black', fontWeight: 'bold', borderRadius: '8px', cursor: formLoading ? 'not-allowed' : 'pointer', opacity: formLoading ? 0.7 : 1 }}
                >
                  {formLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pemain;
