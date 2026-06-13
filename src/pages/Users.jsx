import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config.js';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: null, name: '', email: '', role: 'pemain', password: '' });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  const navigate = useNavigate();

  // Check authorization
  const currentUserStr = localStorage.getItem('user');
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const isAdmin = currentUser && (currentUser.email === 'admin@ptmbi.com' || currentUser.email === 'admin@turnament.com');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
      }

      const responseData = await response.json();
      console.log("=== RAW API Response ===", JSON.stringify(responseData));
      const usersList = responseData.data || responseData || [];
      console.log("=== Users List ===", JSON.stringify(usersList));
      if (usersList.length > 0) {
        console.log("=== First user keys ===", JSON.stringify(Object.keys(usersList[0])));
        console.log("=== First user ===", JSON.stringify(usersList[0]));
      }
      setUsers(usersList);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError('Belum ada data pengguna yang dapat ditampilkan atau koneksi bermasalah.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      // If not admin, we could redirect or just show the access denied message.
      // For this implementation we will let the component render the "Access Denied" view.
      setLoading(false);
      return;
    }

    fetchUsers();
  }, [isAdmin]);

  const handleAddUser = () => {
    setModalMode('add');
    setFormData({ id: null, name: '', email: '', role: 'pemain', password: '' });
    setModalError('');
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setFormData({ 
      id: user.id, 
      name: user.name || '', 
      email: user.email || '', 
      role: user.role ? user.role.toLowerCase() : 'pemain', 
      password: '' 
    });
    setModalError('');
    setShowModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      try {
        const token = localStorage.getItem('token');
        console.log("Menghapus user id:", userId);
        const response = await fetch(`${API_URL}/users/${userId}?_method=DELETE`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error("Delete error data:", errData);
          throw new Error(errData.message || 'Gagal menghapus pengguna');
        }

        setUsers(users.filter(u => u.id !== userId));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError('');

    try {
      const token = localStorage.getItem('token');
      const url = modalMode === 'add' ? `${API_URL}/users` : `${API_URL}/users/${formData.id}?_method=PUT`;
      const method = 'POST';
      
      const payload = { ...formData };
      if (modalMode === 'edit' && !payload.password) {
        delete payload.password;
      }

      console.log("Submit URL:", url, "Method:", method, "Payload:", payload);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Gagal ${modalMode === 'add' ? 'menambah' : 'menyimpan'} pengguna`);
      }

      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isAdmin) {
    return (
      <div className="users-page-container">
        <div className="access-denied-card">
          <i className="fa-solid fa-lock" style={{ fontSize: '4rem', color: '#f43f5e', marginBottom: '1rem' }}></i>
          <h2 style={{ fontFamily: '"Orbitron", monospace', color: '#f43f5e', fontSize: '2rem', marginBottom: '1rem' }}>Akses Ditolak</h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Halaman ini hanya dapat diakses oleh Administrator.</p>
          <button onClick={() => navigate('/')} className="back-home-btn">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page-container" style={{ paddingTop: '120px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem', minHeight: '70vh', paddingBottom: '5rem', position: 'relative', zIndex: 10 }}>
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="neon-cyan" style={{ fontFamily: '"Orbitron", monospace', fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
          MANAJEMEN PENGGUNA
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#a0aec0', letterSpacing: '2px' }}>
          DAFTAR PENGGUNA SISTEM PTM BI
        </p>
      </section>

      <div className="users-content">
        {loading ? (
          <div className="text-center text-cyan-400 py-10" style={{ textAlign: 'center', color: '#22d3ee', padding: '2.5rem 0' }}>
            <i className="fa-solid fa-circle-notch fa-spin text-4xl mb-4" style={{ fontSize: '2.25rem', marginBottom: '1rem' }}></i>
            <p>Memuat data pengguna...</p>
          </div>
        ) : error ? (
          <div className="error-card p-card glass p-6 rounded-2xl" style={{ padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
            <p className="text-gray-400" style={{ color: '#9ca3af' }}>{error}</p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button className="add-user-btn" onClick={handleAddUser}>
                <i className="fa-solid fa-plus"></i> Tambah Pengguna
              </button>
            </div>
            <div className="p-card glass p-6 rounded-2xl overflow-x-auto" style={{ padding: '1.5rem', borderRadius: '1rem', overflowX: 'auto' }}>
              {users.length > 0 ? (
              <table className="users-table w-full text-left" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="border-b border-gray-700 text-cyan-400" style={{ borderBottom: '1px solid #374151', color: '#22d3ee' }}>
                    <th className="py-3 px-4" style={{ padding: '0.75rem 1rem' }}>Nama</th>
                    <th className="py-3 px-4" style={{ padding: '0.75rem 1rem' }}>Email</th>
                    <th className="py-3 px-4" style={{ padding: '0.75rem 1rem' }}>Role</th>
                    <th className="py-3 px-4" style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors" style={{ borderBottom: '1px solid rgba(31, 41, 55, 0.5)' }}>
                      <td className="py-3 px-4 text-white" style={{ padding: '0.75rem 1rem', color: 'white' }}>{user.name}</td>
                      <td className="py-3 px-4 text-gray-400" style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>{user.email}</td>
                      <td className="py-3 px-4" style={{ padding: '0.75rem 1rem' }}>
                        <span className="sec-badge bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#22d3ee', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', textTransform: 'capitalize' }}>
                          {user.role || 'Pemain'}
                        </span>
                      </td>
                      <td className="py-3 px-4" style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
                        <button 
                          onClick={() => { console.log('Edit clicked', user); handleEditUser(user); }} 
                          title="Edit"
                          style={{
                            background: 'rgba(251, 191, 36, 0.1)',
                            color: '#fbbf24',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            transition: 'all 0.3s ease',
                            fontFamily: 'Inter, sans-serif',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.25)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(251, 191, 36, 0.3)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.3)';
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        <button 
                          onClick={() => { console.log('Delete clicked', user.id); handleDeleteUser(user.id); }} 
                          title="Hapus"
                          style={{
                            background: 'rgba(244, 63, 94, 0.1)',
                            color: '#f43f5e',
                            border: '1px solid rgba(244, 63, 94, 0.3)',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            transition: 'all 0.3s ease',
                            fontFamily: 'Inter, sans-serif',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.25)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(244, 63, 94, 0.3)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.3)';
                          }}
                        >
                          <i className="fa-solid fa-trash"></i> Hapus
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-400 py-8" style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem 0' }}>
                <i className="fa-solid fa-users-slash text-4xl mb-3" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}></i>
                <p>Tidak ada data pengguna yang ditemukan.</p>
              </div>
            )}
          </div>
          </>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{modalMode === 'add' ? 'Tambah Pengguna' : 'Edit Pengguna'}</h3>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            {modalError && (
              <div className="error-alert" style={{ marginBottom: '1rem', color: '#f43f5e', background: 'rgba(244, 63, 94, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                {modalError}
              </div>
            )}

            <form onSubmit={handleModalSubmit}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Masukkan nama"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange} required>
                  <option value="pemain">Pemain</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Password {modalMode === 'edit' && <span style={{fontSize: '0.75rem', color: '#9ca3af'}}>(Kosongkan jika tidak ingin mengubah)</span>}</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  required={modalMode === 'add'} 
                  placeholder="********"
                  minLength="6"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)} disabled={modalLoading}>
                  Batal
                </button>
                <button type="submit" className="submit-btn" disabled={modalLoading}>
                  {modalLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
