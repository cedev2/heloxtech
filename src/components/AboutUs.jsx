import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../constants/content';

const AboutUs = () => {
    const values = [
        { title: 'Our Vision', desc: content.sections.about.vision || 'To be the leading tech firm in Rwanda and the region.' },
        { title: 'Professionals', desc: 'Our team consists of highly skilled and dedicated experts.' },
        { title: 'Expertise', desc: 'Deep technical knowledge combined with industry-specific experience.' }
    ];

    return (
        <section id="about" className="section">
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>{content.sections.about.title}</h4>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{content.sections.about.subtitle}</h2>
                        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
                            {content.sections.about.desc}
                        </p>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {values.map((val, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        background: 'var(--accent)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        marginTop: '4px'
                                    }}>
                                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>{val.title}</h4>
                                        <p style={{ color: '#666' }}>{val.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            width: '100%',
                            height: '500px',
                            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                            borderRadius: '2rem',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
                                <h3 style={{ color: 'white', fontSize: '2rem' }}>10+ Years</h3>
                                <p>Of Industry Excellence</p>
                            </div>
                        </div>
                        <div className="glass-card" style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '-2rem',
                            padding: '1.5rem',
                            zIndex: 10,
                            background: 'white'
                        }}>
                            <h4 style={{ fontSize: '1.5rem', margin: 0 }} className="text-gradient">500+</h4>
                            <p style={{ margin: 0 }}>Projects Completed</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
