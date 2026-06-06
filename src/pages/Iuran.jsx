import React, { useState, useEffect, useMemo } from 'react';
import { API_URL } from '../config';

const Iuran = () => {
  const [iurans, setIurans] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter state
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'lunas', 'belum_lunas'
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().substring(0, 7)); // 'YYYY-MM'

  // CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    player_id: '',
    tanggal: '',
    period: '',
    amount: '',
    notes: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchIurans = async () => {
    try {
      const response = await fetch(`${API_URL}/iurans`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Akses ditolak: Anda harus login untuk melihat data iuran.');
        }
        throw new Error('Gagal mengambil data dari API (Status: ' + response.status + ')');
      }
      
      const data = await response.json();
      setIurans(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${API_URL}/players?per_page=100`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        let playersData = [];
        if (data.data && Array.isArray(data.data)) playersData = data.data;
        else if (Array.isArray(data)) playersData = data;
        setPlayers(playersData);
      }
    } catch (err) {
      console.error('Failed to fetch players', err);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      await fetchIurans();
      if (token) {
        await fetchPlayers();
      }
      setLoading(false);
    };
    initFetch();
  }, [token]);

  const handleOpenModal = (mode, iuran = null, defaultPlayerId = '') => {
    setModalMode(mode);
    if (mode === 'edit' && iuran) {
      setEditingId(iuran.id);
      setFormData({
        player_id: iuran.player_id || '',
        tanggal: iuran.tanggal ? iuran.tanggal.split('T')[0] : '',
        period: iuran.period ? iuran.period.split('T')[0].substring(0, 7) + '-01' : '',
        amount: iuran.amount || '',
        notes: iuran.notes || ''
      });
    } else {
      setEditingId(null);
      setFormData({ 
        player_id: defaultPlayerId || (players.length > 0 ? players[0].id : ''), 
        tanggal: new Date().toISOString().split('T')[0], 
        period: filterMonth + '-01', 
        amount: '25000', 
        notes: '' 
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const url = modalMode === 'add' ? `${API_URL}/iurans` : `${API_URL}/iurans/${editingId}`;
      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const dataToSend = { ...formData };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Terjadi kesalahan saat menyimpan data');
      }

      handleCloseModal();
      fetchIurans();
    } catch (err) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus catatan iuran ini?')) return;
    
    try {
      const response = await fetch(`${API_URL}/iurans/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus data iuran');
      }

      fetchIurans();
    } catch (err) {
      alert(err.message);
    }
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  const formatPeriod = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date);
  };

  // Process data based on filter mode
  const displayedData = useMemo(() => {
    if (filterMode === 'all') {
      // Sort all iurans by player name
      return [...iurans].sort((a, b) => {
        const nameA = a.player?.name?.toLowerCase() || '';
        const nameB = b.player?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      });
    }

    if (filterMode === 'lunas') {
      // Filter iurans for the specific month and sort by name
      return iurans
        .filter(iuran => iuran.period && iuran.period.startsWith(filterMonth))
        .sort((a, b) => {
          const nameA = a.player?.name?.toLowerCase() || '';
          const nameB = b.player?.name?.toLowerCase() || '';
          return nameA.localeCompare(nameB);
        });
    }

    if (filterMode === 'belum_lunas') {
      // Find players who DO NOT have an iuran record for the specific month
      const paidPlayerIds = new Set(
        iurans
          .filter(iuran => iuran.period && iuran.period.startsWith(filterMonth))
          .map(iuran => iuran.player_id)
      );

      // Return synthetic "unpaid" records using player data
      return players
        .filter(player => !paidPlayerIds.has(player.id))
        .sort((a, b) => {
          const nameA = a.name?.toLowerCase() || '';
          const nameB = b.name?.toLowerCase() || '';
          return nameA.localeCompare(nameB);
        })
        .map(player => ({
          isUnpaidPlaceholder: true, // flag to render differently
          player: player,
          player_id: player.id,
          tanggal: null,
          period: filterMonth + '-01',
          amount: 0,
          notes: 'Belum Lunas'
        }));
    }

    return [];
  }, [iurans, players, filterMode, filterMonth]);

  const totalIuran = useMemo(() => {
    return displayedData.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [displayedData]);

  return (
    <div style={{ paddingTop: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh', paddingBottom: '5rem' }}>
      
      {/* Header Section */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>
          IURAN ANGGOTA
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#a0aec0', letterSpacing: '1px', marginBottom: '2rem' }}>
          Catatan pembayaran iuran wajib anggota PTM Batan Indah
        </p>
        
        {token && (
          <button 
            onClick={() => handleOpenModal('add')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #00d4ff, #0284c7)',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)'
            }}
          >
            <i className="fa-solid fa-plus"></i> Tambah Catatan Iuran
          </button>
        )}
      </section>

      {/* Filter & Summary Section */}
      <section style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* View Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setFilterMode('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #00d4ff',
                background: filterMode === 'all' ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                color: filterMode === 'all' ? '#00d4ff' : '#a0aec0',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <i className="fa-solid fa-list" style={{ marginRight: '8px' }}></i>
              Semua Data
            </button>
            <button 
              onClick={() => setFilterMode('lunas')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #10b981',
                background: filterMode === 'lunas' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: filterMode === 'lunas' ? '#10b981' : '#a0aec0',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <i className="fa-solid fa-check-circle" style={{ marginRight: '8px' }}></i>
              Sudah Lunas
            </button>
            <button 
              onClick={() => setFilterMode('belum_lunas')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #ef4444',
                background: filterMode === 'belum_lunas' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                color: filterMode === 'belum_lunas' ? '#ef4444' : '#a0aec0',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <i className="fa-solid fa-times-circle" style={{ marginRight: '8px' }}></i>
              Belum Lunas
            </button>
          </div>

          {/* Month Picker (only shown when filtering lunas/belum lunas) */}
          {filterMode !== 'all' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Pilih Bulan:</label>
              <input 
                type="month" 
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                style={{
                  padding: '8px 12px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  colorScheme: 'dark'
                }}
              />
            </div>
          )}
        </div>

        {/* Summary Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'rgba(0, 212, 255, 0.05)', padding: '1rem 1.5rem', borderRadius: '12px', borderLeft: '4px solid #00d4ff' }}>
            <p style={{ color: '#a0aec0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Total Data Ditampilkan</p>
            <h3 style={{ color: '#00d4ff', fontSize: '1.5rem', fontFamily: '"Orbitron", monospace' }}>{displayedData.length} <span style={{ fontSize: '0.9rem' }}>Anggota</span></h3>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem 1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
            <p style={{ color: '#a0aec0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Total Penerimaan Iuran</p>
            <h3 style={{ color: '#10b981', fontSize: '1.5rem', fontFamily: '"Orbitron", monospace' }}>{formatRupiah(totalIuran)}</h3>
          </div>
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
        ) : displayedData.length === 0 ? (
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
            <i className="fa-solid fa-file-invoice-dollar" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4b5563' }}></i>
            <p>Tidak ada data iuran yang sesuai dengan kriteria filter.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', background: 'rgba(0, 212, 255, 0.05)' }}>No</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', background: 'rgba(0, 212, 255, 0.05)' }}>Pemain</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', background: 'rgba(0, 212, 255, 0.05)' }}>Tanggal Bayar</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', background: 'rgba(0, 212, 255, 0.05)' }}>Periode Bulan</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', background: 'rgba(0, 212, 255, 0.05)' }}>Nominal</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', background: 'rgba(0, 212, 255, 0.05)' }}>Catatan</th>
                  {token && <th style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', background: 'rgba(0, 212, 255, 0.05)', textAlign: 'center' }}>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <tr key={item.id || `unpaid-${item.player_id}`} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.3s', background: item.isUnpaidPlaceholder ? 'rgba(239, 68, 68, 0.03)' : 'transparent' }} onMouseEnter={e => e.currentTarget.style.background = item.isUnpaidPlaceholder ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.03)'} onMouseLeave={e => e.currentTarget.style.background = item.isUnpaidPlaceholder ? 'rgba(239, 68, 68, 0.03)' : 'transparent'}>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{index + 1}</td>
                    <td style={{ padding: '1rem', color: 'white', fontWeight: 'bold' }}>{item.player?.name || 'Unknown'}</td>
                    <td style={{ padding: '1rem', color: '#cbd5e1' }}>{item.isUnpaidPlaceholder ? <span style={{ color: '#ef4444' }}>Belum Bayar</span> : formatDate(item.tanggal)}</td>
                    <td style={{ padding: '1rem', color: '#a855f7', fontWeight: 'bold' }}>{formatPeriod(item.period)}</td>
                    <td style={{ padding: '1rem', color: item.isUnpaidPlaceholder ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{formatRupiah(item.amount)}</td>
                    <td style={{ padding: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>{item.notes || '-'}</td>
                    {token && (
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          {item.isUnpaidPlaceholder ? (
                            <button 
                              onClick={() => handleOpenModal('add', null, item.player_id)}
                              style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.85rem' }}
                              title="Bayar Sekarang"
                            >
                              <i className="fa-solid fa-money-bill-wave" style={{ marginRight: '5px' }}></i> Bayar
                            </button>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleOpenModal('edit', item)}
                                style={{ background: 'rgba(255, 193, 7, 0.2)', color: '#ffc107', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                                title="Edit"
                              >
                                <i className="fa-solid fa-pen"></i>
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)}
                                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                                title="Hapus"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              {modalMode === 'add' ? 'Tambah Catatan Iuran' : 'Edit Catatan Iuran'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Nama Pemain</label>
                <select 
                  name="player_id"
                  value={formData.player_id}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                >
                  <option value="" disabled>Pilih Pemain</option>
                  {players.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Tanggal Pembayaran</label>
                <input 
                  type="date" 
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                  css={{ 'color-scheme': 'dark' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Periode Bulan (Untuk iuran bulan apa)</label>
                <input 
                  type="date" 
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                />
                <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>*Pilih tanggal berapapun di bulan tersebut</small>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Nominal Pembayaran (Rp)</label>
                <input 
                  type="number" 
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#a0aec0', marginBottom: '0.5rem' }}>Catatan (Opsional)</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', resize: 'vertical' }}
                ></textarea>
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

export default Iuran;
