import React, { useState, useEffect } from 'react';
import { LayoutGrid, Users, Settings, LogOut, Package, Plus, Trash2, ShieldAlert, Key, UserPlus, Mail, ShieldCheck, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CEODashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [staff, setStaff] = useState([]);
    const [logs, setLogs] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    // Responsive State
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        fetchData();
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarOpen(true);
            else setIsSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const fetchData = async () => {
        try {
            const prodRes = await fetch('http://localhost/HT/backend/api/products.php');
            const staffRes = await fetch('http://localhost/HT/backend/api/staff.php');
            const logRes = await fetch('http://localhost/HT/backend/api/logs.php');
            const accRes = await fetch('http://localhost/HT/backend/api/users.php');

            setProducts(await prodRes.json());
            setStaff(await staffRes.json());
            setLogs(await logRes.json());
            setAccounts(await accRes.json());
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        let endpoint = '';
        if (activeTab === 'products') endpoint = 'products.php';
        else if (activeTab === 'staff') endpoint = 'staff.php';
        else if (activeTab === 'users') endpoint = 'users.php';

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        // Add file if exists
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
            formDataToSend.append('image', fileInput.files[0]);
        }

        const res = await fetch(`http://localhost/HT/backend/api/${endpoint}`, {
            method: 'POST',
            body: activeTab === 'users' ? JSON.stringify(formData) : formDataToSend,
            headers: activeTab === 'users' ? { 'Content-Type': 'application/json' } : {}
        });
        if (res.ok) {
            setShowModal(false);
            setFormData({});
            fetchData();
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        let endpoint = '';
        if (type === 'products') endpoint = 'products.php';
        else if (type === 'staff') endpoint = 'staff.php';
        else if (type === 'users') endpoint = 'users.php';

        const res = await fetch(`http://localhost/HT/backend/api/${endpoint}?id=${id}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            fetchData();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('helox_user');
        navigate('/admin');
    };

    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'radial-gradient(circle at top left, #0f172a, #020617)',
            color: '#f8fafc',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Mobile Sidebar Backdrop */}
            {isMobile && isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                        zIndex: 998, backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Sidebar */}
            <div style={{
                width: isMobile ? '280px' : '300px',
                background: 'rgba(2, 6, 23, 0.95)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                padding: isMobile ? '1.5rem 1rem' : '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: isMobile ? 'absolute' : 'relative',
                left: isSidebarOpen ? 0 : (isMobile ? '-280px' : '-300px'),
                height: '100vh',
                zIndex: 999,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--accent)', borderRadius: '12px' }}></div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: 'white' }}>HELOX</h2>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Command Center</p>
                    </div>
                    {isMobile && (
                        <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    )}
                </div>

                <nav style={{ display: 'grid', gap: '0.75rem' }}>
                    <button onClick={() => setActiveTab('products')} style={tabStyle(activeTab === 'products')}>
                        <Package size={20} /> Products
                    </button>
                    <button onClick={() => setActiveTab('staff')} style={tabStyle(activeTab === 'staff')}>
                        <Users size={20} /> Staff Directory
                    </button>
                    <button onClick={() => setActiveTab('users')} style={tabStyle(activeTab === 'users')}>
                        <Key size={20} /> Access Control
                    </button>
                    <button onClick={() => setActiveTab('logs')} style={tabStyle(activeTab === 'logs')}>
                        <ShieldAlert size={20} /> System Logs
                    </button>

                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                        <button onClick={handleLogout} style={{
                            ...tabStyle(false),
                            color: '#fb7185',
                            marginTop: '2rem',
                            background: 'rgba(251, 113, 133, 0.05)'
                        }}>
                            <LogOut size={20} /> Terminate Session
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: isMobile ? '2rem 1rem' : '4rem', overflowY: 'auto' }}>
                <header style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    marginBottom: isMobile ? '2.5rem' : '4rem',
                    gap: isMobile ? '1.5rem' : '0'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {isMobile && (
                            <button onClick={toggleSidebar} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.75rem', borderRadius: '12px', cursor: 'pointer' }}>
                                <Menu size={24} />
                            </button>
                        )}
                        <div>
                            <h1 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                                {activeTab === 'products' ? 'Inventory Control' :
                                    activeTab === 'staff' ? 'Human Capital' :
                                        activeTab === 'users' ? 'Access Management' : 'Security Intelligence'}
                            </h1>
                            <p style={{ color: '#94a3b8', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Manage your digital infrastructure with precision.</p>
                        </div>
                    </div>
                    {activeTab !== 'logs' && (
                        <button onClick={() => setShowModal(true)} style={{
                            background: 'var(--accent)',
                            color: 'var(--primary)',
                            padding: '1rem 2rem',
                            borderRadius: '16px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px -5px rgba(234, 179, 8, 0.4)',
                            transition: 'all 0.3s'
                        }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <Plus size={22} /> {activeTab === 'products' ? 'Create Product' :
                                activeTab === 'staff' ? 'Onboard Staff' : 'Grant Access'}
                        </button>
                    )}
                </header>

                {/* Content Area */}
                <div style={{ ...glassStyle, padding: '2rem', minHeight: '600px' }}>
                    {activeTab === 'products' && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: isMobile ? '1.5rem' : '2rem'
                        }}>
                            {products.map(p => (
                                <div key={p.id} style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    padding: '2rem', borderRadius: '20px',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        height: '180px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '16px',
                                        marginBottom: '1.5rem',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {p.image ? (
                                            <img src={`http://localhost/HT/backend${p.image}`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <Package size={48} opacity={0.2} />
                                        )}
                                    </div>
                                    <div style={{
                                        position: 'absolute', top: '1.5rem', right: '1.5rem',
                                        background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent)',
                                        padding: '0.4rem 1rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800
                                    }}>{p.badge}</div>
                                    <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '1rem' }}>{p.name}</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{p.description}</p>
                                    <button onClick={() => handleDelete(p.id, 'products')} style={{ color: '#fb7185', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'staff' && (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {staff.map(s => (
                                <div key={s.id} style={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    justifyContent: 'space-between',
                                    background: 'rgba(255,255,255,0.02)',
                                    padding: isMobile ? '1.5rem' : '1.5rem 2rem',
                                    borderRadius: '16px',
                                    gap: isMobile ? '1.5rem' : '0'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            background: '#334155',
                                            borderRadius: '12px',
                                            overflow: 'hidden'
                                        }}>
                                            {s.image ? (
                                                <img src={`http://localhost/HT/backend${s.image}`} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : null}
                                        </div>
                                        <div>
                                            <h4 style={{ color: 'white', margin: 0 }}>{s.name}</h4>
                                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{s.role}</p>
                                        </div>
                                    </div>
                                    <div style={{ color: '#94a3b8' }}>{s.phone}</div>
                                    <button onClick={() => handleDelete(s.id, 'staff')} style={{ color: '#fb7185', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {accounts.map(acc => (
                                <div key={acc.id} style={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    justifyContent: 'space-between',
                                    background: 'rgba(255,255,255,0.02)',
                                    padding: isMobile ? '1.5rem' : '1.5rem 2rem',
                                    borderRadius: '16px',
                                    borderLeft: `4px solid ${acc.role === 'Programmer' ? '#38bdf8' : '#f472b6'}`,
                                    gap: isMobile ? '1rem' : '0'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <ShieldCheck size={isMobile ? 20 : 24} color={acc.role === 'Programmer' ? '#38bdf8' : '#f472b6'} />
                                        <div>
                                            <h4 style={{ color: 'white', margin: 0 }}>{acc.name}</h4>
                                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{acc.email} • <span style={{ color: 'white' }}>{acc.role}</span></p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(acc.id, 'users')} style={{ color: '#fb7185', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'logs' && (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ textAlign: 'left', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    <tr>
                                        <th style={{ padding: '1rem' }}>Operator</th>
                                        <th style={{ padding: '1rem' }}>Operation</th>
                                        <th style={{ padding: '1rem' }}>Telemetry</th>
                                        <th style={{ padding: '1rem' }}>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map(l => (
                                        <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '1.25rem 1rem', color: 'white' }}>{l.user_name || 'SYSTEM_AUTO'}</td>
                                            <td style={{ padding: '1.25rem 1rem' }}><span style={{ color: 'var(--accent)', fontWeight: 600 }}>{l.action}</span></td>
                                            <td style={{ padding: '1.25rem 1rem', color: '#94a3b8' }}>{l.details}</td>
                                            <td style={{ padding: '1.25rem 1rem', color: '#64748b', fontSize: '0.85rem' }}>{new Date(l.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Redesigned Modal */}
                {showModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                    }}>
                        <div style={{
                            background: '#0f172a',
                            padding: isMobile ? '2rem 1.5rem' : '3rem',
                            borderRadius: isMobile ? '24px' : '32px',
                            width: '95%',
                            maxWidth: '550px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}>
                            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', color: 'white', marginBottom: '1.5rem' }}>
                                {activeTab === 'products' ? 'Product Specification' :
                                    activeTab === 'staff' ? 'Personnel Enrollment' : 'Access Authorization'}
                            </h2>
                            <form onSubmit={handleAdd} style={{ display: 'grid', gap: '1.25rem' }}>
                                {activeTab === 'users' ? (
                                    <>
                                        <input placeholder="Full Name" required onChange={e => setFormData({ ...formData, name: e.target.value })} style={darkInputStyle} />
                                        <input type="email" placeholder="Email Address" required onChange={e => setFormData({ ...formData, email: e.target.value })} style={darkInputStyle} />
                                        <input type="password" placeholder="Temporal Password" required onChange={e => setFormData({ ...formData, password: e.target.value })} style={darkInputStyle} />
                                        <select required onChange={e => setFormData({ ...formData, role: e.target.value })} style={darkInputStyle}>
                                            <option value="">Assign Protocol/Role</option>
                                            <option value="Secretary">Secretary</option>
                                            <option value="Programmer">Programmer</option>
                                        </select>
                                    </>
                                ) : activeTab === 'products' ? (
                                    <>
                                        <input placeholder="Product Nomenclature" required onChange={e => setFormData({ ...formData, name: e.target.value })} style={darkInputStyle} />
                                        <input placeholder="Classification Badge" onChange={e => setFormData({ ...formData, badge: e.target.value })} style={darkInputStyle} />
                                        <textarea placeholder="Technical Description" rows="4" onChange={e => setFormData({ ...formData, description: e.target.value })} style={darkInputStyle} />
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Product Visualization (Image)</label>
                                            <input type="file" accept="image/*" style={darkInputStyle} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <input placeholder="Staff Name" required onChange={e => setFormData({ ...formData, name: e.target.value })} style={darkInputStyle} />
                                        <input placeholder="Designated Role" required onChange={e => setFormData({ ...formData, role: e.target.value })} style={darkInputStyle} />
                                        <input placeholder="Communication Link (Phone)" onChange={e => setFormData({ ...formData, phone: e.target.value })} style={darkInputStyle} />
                                        <textarea placeholder="Professional Bio" rows="3" onChange={e => setFormData({ ...formData, bio: e.target.value })} style={darkInputStyle} />
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Staff Portrait (Image)</label>
                                            <input type="file" accept="image/*" style={darkInputStyle} />
                                        </div>
                                    </>
                                )}
                                <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '1rem', borderRadius: '14px' }}>Execute</button>
                                    <button type="button" onClick={() => setShowModal(false)} className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '14px' }}>Abort</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const tabStyle = (active) => ({
    display: 'flex', alignItems: 'center', gap: '1rem', width: '100%',
    padding: '1.25rem 1.5rem', borderRadius: '16px', border: 'none',
    background: active ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
    color: active ? 'var(--accent)' : '#94a3b8',
    cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left',
    fontWeight: active ? 700 : 500,
    fontSize: '1rem'
});

const darkInputStyle = {
    width: '100%', padding: '1rem 1.25rem', borderRadius: '14px',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'white', fontSize: '1rem', outline: 'none'
};

export default CEODashboard;
