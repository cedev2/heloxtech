import React from 'react';
import { Code, Smartphone, Globe, Shield, Laptop, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { content } from '../constants/content';

const serviceIcons = [
    <Code size={40} />,
    <Smartphone size={40} />,
    <Globe size={40} />,
    <Shield size={40} />,
    <Laptop size={40} />,
    <Settings size={40} />
];

const Services = () => {
    return (
        <section id="services" className="section" style={{ background: 'var(--bg-alt)' }}>
            <div className="container">
                <div className="section-title">
                    <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>Expertise</h4>
                    <h2>Our Specialized Services</h2>
                    <p style={{ maxWidth: '700px', margin: '1rem auto', color: '#666' }}>
                        We provide comprehensive technology solutions designed to fuel growth and operational efficiency.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {content.services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card"
                            style={{
                                padding: '2.5rem',
                                textAlign: 'center',
                                background: 'white',
                                border: 'none',
                                transition: 'var(--transition)'
                            }}
                            whileHover={{ translateY: -10, boxShadow: 'var(--shadow-lg)' }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'rgba(10, 29, 86, 0.05)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'var(--primary)'
                            }}>
                                {serviceIcons[index % serviceIcons.length]}
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>{service.title}</h3>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>{service.desc}</p>
                            <a href="#contact" style={{ color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                Get More Info <span style={{ color: 'var(--accent)' }}>&rarr;</span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
