import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { content } from '../constants/content';

const Footer = () => {
    return (
        <footer style={{ background: '#050c26', color: 'white', padding: '5rem 0 2rem' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem'
                }}>
                    {/* Company Bio */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <a href="#" style={{ display: 'block', marginBottom: '1.5rem' }}>
                            <img src="/logo.png" alt={content.brand.name} style={{ height: '120px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
                        </a>
                        <p style={{ opacity: 0.7, lineHeight: 1.8, maxWidth: '400px' }}>
                            {content.brand.name} {content.brand.tagline} is a premier technology firm based in {content.contact.location}. We specialize in delivering innovative software, web, and mobile solutions that empower businesses to scale and succeed in the digital era.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <a href="#" style={{
                                width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)'
                            }}><Facebook size={18} /></a>
                            <a href="#" style={{
                                width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)'
                            }}><Twitter size={18} /></a>
                            <a href="#" style={{
                                width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)'
                            }}><Linkedin size={18} /></a>
                            <a href="#" style={{
                                width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)'
                            }}><Instagram size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', position: 'relative', paddingBottom: '0.5rem' }}>
                            Quick Links
                            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', background: 'var(--accent)' }}></span>
                        </h4>
                        <ul style={{ display: 'grid', gap: '1rem' }}>
                            {content.navLinks.map((item) => (
                                <li key={item.name}><a href={item.href} style={{ opacity: 0.7, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ArrowRight size={14} color="var(--accent)" /> {item.name}
                                </a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', position: 'relative', paddingBottom: '0.5rem' }}>
                            Business Hours
                            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', background: 'var(--accent)' }}></span>
                        </h4>
                        <ul style={{ display: 'grid', gap: '1rem', opacity: 0.7 }}>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Mon - Fri:</span>
                                <span>{content.contact.hours.weekday}</span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Sat:</span>
                                <span>{content.contact.hours.saturday}</span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Sun:</span>
                                <span style={{ color: 'var(--accent)' }}>{content.contact.hours.sunday}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', position: 'relative', paddingBottom: '0.5rem' }}>
                            Our Office
                            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', background: 'var(--accent)' }}></span>
                        </h4>
                        <ul style={{ display: 'grid', gap: '1.25rem' }}>
                            <li style={{ display: 'flex', gap: '1rem', opacity: 0.7 }}>
                                <MapPin size={20} color="var(--accent)" />
                                <span>{content.contact.location}</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', opacity: 0.7 }}>
                                <Phone size={20} color="var(--accent)" />
                                <span>{content.contact.phone}</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', opacity: 0.7 }}>
                                <Mail size={20} color="var(--accent)" />
                                <span>{content.contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2rem',
                    textAlign: 'center',
                    opacity: 0.5,
                    fontSize: '0.875rem'
                }}>
                    <p>© {new Date().getFullYear()} {content.brand.name} {content.brand.tagline}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
