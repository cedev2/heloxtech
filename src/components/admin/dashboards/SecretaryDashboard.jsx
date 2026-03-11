import React, { useState, useEffect } from 'react';
import { MessageSquare, Package, LogOut, CheckCircle, Clock, ShieldCheck, Mail, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SecretaryDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('messages');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();
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

    const fetchMessages = async () => {
        const res = await fetch('http://localhost/HT/backend/api/messages.php');
        setMessages(await res.json());
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
                        <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Secretary Hub</p>
                    </div>
                    {isMobile && (
                        <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    )}
                </div>

                <nav style={{ display: 'grid', gap: '0.5rem', flex: 1 }}>
                    <button onClick={() => { setActiveTab('messages'); if (isMobile) setIsSidebarOpen(false); }} style={tabStyle(activeTab === 'messages')}>
                        <MessageSquare size={20} /> Client Inquiries
                    </button>
                    <button onClick={() => { setActiveTab('products'); if (isMobile) setIsSidebarOpen(false); }} style={tabStyle(activeTab === 'products')}>
                        <Package size={20} /> System Inventory
                    </button>

                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                        <button onClick={handleLogout} style={{
                            ...tabStyle(false),
                            color: '#fb7185',
                            padding: '1rem',
                            background: 'rgba(251, 113, 133, 0.05)'
                        }}>
                            <LogOut size={20} /> End Session
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
                            <h1 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Communication Matrix</h1>
                            <p style={{ color: '#94a3b8', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Processing global client intelligence and service requests.</p>
                        </div>
                    </div>
                </header>

                <div style={{ display: 'grid', gap: isMobile ? '1.5rem' : '2rem' }}>
                    {messages.map(m => (
                        <div key={m.id} style={{
                            ...glassStyle,
                            padding: isMobile ? '1.5rem' : '2.5rem',
                            borderLeft: '8px solid var(--accent)',
                            position: 'relative'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                justifyContent: 'space-between',
                                alignItems: isMobile ? 'flex-start' : 'flex-start',
                                marginBottom: '1.5rem',
                                gap: isMobile ? '1rem' : '0'
                            }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: isMobile ? '1.25rem' : '1.5rem', color: 'white', marginBottom: '0.25rem' }}>{m.full_name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>
                                        <Mail size={16} /> {m.email}
                                    </div>
                                </div>
                                <div style={{
                                    color: '#64748b', fontSize: '0.75rem', fontWeight: 600,
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '10px'
                                }}>
                                    <Clock size={16} /> RECEIVED: {new Date(m.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem', marginBottom: '2rem' }}>{m.message}</p>
                            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem' }}>
                                <button style={{
                                    background: 'var(--accent)', color: 'var(--primary)',
                                    padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 700,
                                    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    justifyContent: 'center'
                                }}>
                                    Dispatch Response
                                </button>
                                <button style={{
                                    background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8',
                                    padding: '0.75rem 1.5rem', borderRadius: '12px',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600,
                                    justifyContent: 'center'
                                }}>
                                    <CheckCircle size={20} /> Archive Intelligence
                                </button>
                            </div>
                        </div>
                    ))}
                    {messages.length === 0 && (
                        <div style={{ ...glassStyle, padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                            <ShieldCheck size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                            <p>All communication channels are clear. No pending transmissions.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const tabStyle = (active) => ({
    display: 'flex', alignItems: 'center', gap: '1rem', width: '100%',
    padding: '1rem 1.25rem', borderRadius: '16px', border: 'none',
    background: active ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
    color: active ? 'var(--accent)' : '#94a3b8',
    cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left',
    fontWeight: active ? 700 : 500,
    fontSize: '0.95rem'
});

export default SecretaryDashboard;
