import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { content } from '../constants/content';

const Contact = () => {
    return (
        <section id="contact" className="section">
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                    <div>
                        <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>{content.sections.contact.title}</h4>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{content.sections.contact.subtitle}</h2>
                        <p style={{ color: '#666', marginBottom: '2.5rem' }}>
                            {content.sections.contact.desc}
                        </p>

                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '50px', height: '50px', background: 'var(--bg-alt)', borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'
                                }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>Call Us</h4>
                                    <p style={{ margin: 0, color: '#666' }}>{content.contact.phone}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '50px', height: '50px', background: 'var(--bg-alt)', borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'
                                }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>Email Us</h4>
                                    <p style={{ margin: 0, color: '#666' }}>{content.contact.supportEmail}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '50px', height: '50px', background: 'var(--bg-alt)', borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'
                                }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>Visit Us</h4>
                                    <p style={{ margin: 0, color: '#666' }}>{content.contact.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '2rem',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <form style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                                <input type="text" placeholder="Your Name" style={{
                                    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                    border: '1px solid #ddd', background: 'var(--bg-alt)'
                                }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                                <input type="email" placeholder="your email@example.com" style={{
                                    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                    border: '1px solid #ddd', background: 'var(--bg-alt)'
                                }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
                                <textarea rows="4" placeholder="How can we help you?" style={{
                                    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                    border: '1px solid #ddd', background: 'var(--bg-alt)', resize: 'none'
                                }}></textarea>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
