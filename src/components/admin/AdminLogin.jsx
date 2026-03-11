import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost/HT/backend/api/auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Server Error:", text);
                throw new Error(`Server returned ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('helox_user', JSON.stringify(data.user));

                // Redirect based on role
                if (data.user.role === 'CEO') navigate('/admin/ceo');
                else if (data.user.role === 'Secretary') navigate('/admin/secretary');
                else if (data.user.role === 'Programmer') navigate('/admin/programmer');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError('Connection error. Is backend running? Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient" style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem'
        }}>
            <div className="glass-card" style={{
                padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '450px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none', boxShadow: 'var(--shadow-lg)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <img src="/logo.png" alt="Helox Tech" style={{ height: '80px', width: 'auto', margin: '0 auto 1.5rem', display: 'block' }} />
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Staff Portal</h1>
                    <p style={{ color: '#64748b' }}>Secure access for Helox Tech Team</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444',
                        color: '#f87171', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem',
                        fontSize: '0.9rem', textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ color: 'var(--text-dark)', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.5 }} size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@heloxtech.rw"
                                required
                                style={{
                                    width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '12px',
                                    background: '#f8fafc', border: '1px solid #e2e8f0',
                                    color: 'var(--text-dark)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ color: 'var(--text-dark)', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
                                    background: '#f8fafc', border: '1px solid #e2e8f0',
                                    color: 'var(--text-dark)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{
                            width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem',
                            fontWeight: 700, marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                        }}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In to Portal'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, opacity: 0.7 }}>
                        ← Back to Website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
