import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../constants/content';

const Hero = () => {
    return (
        <section id="home" className="hero bg-gradient" style={{
            padding: '8rem 0',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Animated Blobs */}
            <div style={{
                position: 'absolute',
                inset: 0,
                filter: 'url(#gooey)',
                opacity: 0.6,
                zIndex: 1
            }}>
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '20%',
                        width: '300px',
                        height: '300px',
                        background: 'var(--accent)',
                        borderRadius: '50%',
                        filter: 'blur(40px)',
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, -120, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: '40%',
                        right: '15%',
                        width: '400px',
                        height: '400px',
                        background: 'var(--primary-light)',
                        borderRadius: '50%',
                        filter: 'blur(50px)',
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        left: '40%',
                        width: '250px',
                        height: '250px',
                        background: 'rgba(234, 179, 8, 0.4)',
                        borderRadius: '50%',
                        filter: 'blur(35px)',
                    }}
                />
            </div>

            {/* SVG Filter for Gooey Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '850px' }}>
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', fontWeight: 600 }}
                    >
                        Welcome to {content.brand.name} {content.brand.tagline}
                    </motion.h4>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', color: 'white', lineHeight: 1.1, marginBottom: '2rem' }}
                    >
                        {content.brand.name} Tech <br />
                        <span style={{ color: 'var(--accent)', fontSize: '0.5em', textTransform: 'uppercase', letterSpacing: '4px', display: 'block', marginTop: '1rem' }}>
                            {content.brand.fullTagline}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px' }}
                    >
                        {content.brand.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                    >
                        <a href="#contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>Get Started</a>
                        <a href="#services" className="btn btn-outline" style={{ color: 'white', borderColor: 'white', textDecoration: 'none' }}>Our Services</a>
                    </motion.div>
                </div>
            </div>

            {/* Dot pattern overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                zIndex: 5,
                opacity: 0.5
            }} />
        </section>
    );
};

export default Hero;
