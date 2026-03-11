import React, { useState, useEffect } from 'react';
import { Terminal, Shield, LogOut, Code, Activity, Cpu, Database, Network, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgrammerDashboard = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleLogout = () => {
        localStorage.removeItem('helox_user');
        navigate('/admin');
    };

    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#020617',
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
                            <div style={{ width: '40px', height: '40px', background: '#38bdf8', borderRadius: '12px' }}></div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: 'white' }}>HELOX</h2>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Dev Ops System</p>
                    </div>
                    {isMobile && (
                        <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    )}
                </div>

                <nav style={{ display: 'grid', gap: '0.5rem', flex: 1 }}>
                    <button style={tabStyle(true)}>
                        <Activity size={20} /> System Health
                    </button>
                    <button style={tabStyle(false)}>
                        <Terminal size={20} /> Kernel Logs
                    </button>
                    <button style={tabStyle(false)}>
                        <Database size={20} /> Data Clusters
                    </button>
                    <button style={tabStyle(false)}>
                        <Network size={20} /> Network Mesh
                    </button>

                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                        <button onClick={handleLogout} style={{
                            ...tabStyle(false),
                            color: '#fb7185',
                            padding: '1rem',
                            background: 'rgba(251, 113, 133, 0.05)'
                        }}>
                            <LogOut size={20} /> Halt Operations
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
                            <h1 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Neural Command</h1>
                            <p style={{ color: '#94a3b8', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>Sustaining the digital core and infrastructural integrity.</p>
                        </div>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: isMobile ? '1.5rem' : '2.5rem' }}>
                    <div style={{ ...glassStyle, padding: isMobile ? '1.5rem' : '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
                                <Cpu color="#38bdf8" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: isMobile ? '1.1rem' : '1.25rem' }}>Core Latency</h3>
                        </div>
                        <div style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 800, color: '#4ade80' }}>14ms</div>
                        <p style={{ color: '#94a3b8', margin: '0.75rem 0 0', fontWeight: 500, fontSize: '0.9rem' }}>Global average response time</p>
                    </div>

                    <div style={{ ...glassStyle, padding: isMobile ? '1.5rem' : '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'rgba(250, 204, 21, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
                                <Shield color="#facc15" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: isMobile ? '1.1rem' : '1.25rem' }}>Active Firewall</h3>
                        </div>
                        <div style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 800 }}>V.4.2</div>
                        <p style={{ color: '#94a3b8', margin: '0.75rem 0 0', fontWeight: 500, fontSize: '0.9rem' }}>Zero vulnerabilities detected</p>
                    </div>

                    <div style={{ ...glassStyle, padding: isMobile ? '1.5rem' : '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
                                <Network color="#a855f7" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: isMobile ? '1.1rem' : '1.25rem' }}>Traffic Load</h3>
                        </div>
                        <div style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 800 }}>8.4GB/s</div>
                        <p style={{ color: '#94a3b8', margin: '0.75rem 0 0', fontWeight: 500, fontSize: '0.9rem' }}>Currently processing peaks</p>
                    </div>
                </div>

                <div style={{ marginTop: isMobile ? '2rem' : '3rem', ...glassStyle, padding: isMobile ? '1.5rem' : '2.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: isMobile ? '1.1rem' : '1.25rem' }}>Real-time Kernel Events</h3>
                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        fontFamily: "'Fira Code', monospace",
                        fontSize: isMobile ? '0.75rem' : '0.9rem',
                        color: '#4ade80',
                        overflowX: 'auto'
                    }}>
                        <div>[2026-03-11 15:38:12] INFO: Database cluster synchronized.</div>
                        <div>[2026-03-11 15:38:15] WARN: Unexpected peak in routing node 42.</div>
                        <div>[2026-03-11 15:38:20] INFO: Firewall successfully deflected 12 unauthorized requests.</div>
                        <div style={{ color: '#38bdf8' }}>[2026-03-11 15:38:24] DEBUG: Handshake initiated between API and Frontend.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const tabStyle = (active) => ({
    display: 'flex', alignItems: 'center', gap: '1rem', width: '100%',
    padding: '1rem 1.25rem', borderRadius: '16px', border: 'none',
    background: active ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
    color: active ? '#38bdf8' : '#64748b',
    cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left',
    fontWeight: active ? 700 : 500,
    fontSize: '0.95rem'
});

export default ProgrammerDashboard;
