import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Users, ChevronRight, ChevronLeft, User } from 'lucide-react';
import { content } from '../constants/content';

const Staff = () => {
    const [staff, setStaff] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(3);

    useEffect(() => {
        fetch('http://localhost/HT/backend/api/staff.php')
            .then(res => res.json())
            .then(data => setStaff(data))
            .catch(err => console.error("Error fetching staff:", err));
    }, []);

    const team = staff.length > 0 ? staff : content.staff;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setVisibleItems(1);
            else if (window.innerWidth < 1024) setVisibleItems(2);
            else setVisibleItems(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalItems = team.length;
    const maxIndex = Math.max(0, totalItems - visibleItems);

    const paginate = (newDirection) => {
        const nextIndex = currentIndex + newDirection;
        if (nextIndex >= 0 && nextIndex <= maxIndex) {
            setCurrentIndex(nextIndex);
        }
    };

    return (
        <section id="staff" className="section" style={{ background: 'var(--bg-alt)', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative' }}>
                <div className="section-title">
                    <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Team</h4>
                    <h2 style={{ fontSize: '2.5rem' }}>Meet Our Experts</h2>
                    <p style={{ maxWidth: '700px', margin: '1rem auto', color: '#666' }}>
                        The dedicated professionals behind {content.brand.name} Tech's success.
                    </p>
                </div>

                <div style={{ position: 'relative', marginTop: '4rem', padding: '0 1rem' }}>
                    {/* Navigation Buttons */}
                    {currentIndex > 0 && (
                        <button
                            onClick={() => paginate(-1)}
                            style={{
                                position: 'absolute', left: '-1rem', top: '50%', transform: 'translateY(-50%)',
                                zIndex: 20, width: '45px', height: '45px', borderRadius: '50%', background: 'white',
                                border: 'none', boxShadow: 'var(--shadow)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <ChevronLeft size={24} color="var(--primary)" />
                        </button>
                    )}
                    {currentIndex < maxIndex && (
                        <button
                            onClick={() => paginate(1)}
                            style={{
                                position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)',
                                zIndex: 20, width: '45px', height: '45px', borderRadius: '50%', background: 'white',
                                border: 'none', boxShadow: 'var(--shadow)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <ChevronRight size={24} color="var(--primary)" />
                        </button>
                    )}

                    {/* Slider Wrap */}
                    <div style={{ overflow: 'hidden' }}>
                        <motion.div
                            style={{
                                display: 'flex',
                                gap: '2.5rem',
                                width: '100%'
                            }}
                            animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
                            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                        >
                            {team.map((member, index) => (
                                <div
                                    key={index}
                                    style={{
                                        flex: `0 0 calc(${100 / visibleItems}% - ${(2.5 * (visibleItems - 1)) / visibleItems}rem)`,
                                        background: 'white',
                                        borderRadius: '2rem',
                                        overflow: 'hidden',
                                        boxShadow: 'var(--shadow)',
                                        textAlign: 'center',
                                        transition: 'var(--transition)',
                                        cursor: 'grab'
                                    }}
                                >
                                    <div style={{
                                        position: 'relative',
                                        height: '320px',
                                        background: '#eee',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {member.image ? (
                                            <img
                                                src={member.image.startsWith('/uploads') ? `http://localhost/HT/backend${member.image}` : member.image}
                                                alt={member.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div style={{
                                            display: member.image ? 'none' : 'flex',
                                            alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#ccc'
                                        }}>
                                            <User size={60} />
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem' }}>
                                        <h3 style={{ marginBottom: '0.25rem', fontSize: '1.4rem', fontWeight: 700 }}>{member.name}</h3>
                                        <h4 style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>{member.role}</h4>

                                        {member.phone && (
                                            <a href={`tel:${member.phone}`} style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                                color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem', textDecoration: 'none',
                                                fontSize: '0.95rem'
                                            }}>
                                                <Phone size={14} /> {member.phone}
                                            </a>
                                        )}

                                        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            style={{
                                width: i === currentIndex ? '30px' : '10px',
                                height: '10px',
                                borderRadius: '5px',
                                background: i === currentIndex ? 'var(--accent)' : '#ddd',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Staff;
