import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { content } from '../constants/content';

const TopBar = () => {
  return (
    <div className="top-bar bg-gradient" style={{ padding: '0.5rem 0', fontSize: '0.875rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={14} color="var(--accent)" />
            <span>{content.contact.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={14} color="var(--accent)" />
            <span>{content.contact.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={14} color="var(--accent)" />
            <span>{content.contact.phone}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#"><Facebook size={16} /></a>
          <a href="#"><Twitter size={16} /></a>
          <a href="#"><Linkedin size={16} /></a>
          <a href="#"><Instagram size={16} /></a>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: scrolled ? 'var(--glass)' : 'white',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? 'var(--shadow)' : 'none',
      transition: 'var(--transition)',
      padding: scrolled ? '0.2rem 0' : '0.5rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img
            src="/logo.png"
            alt={content.brand.name}
            style={{
              height: scrolled ? '60px' : '90px',
              width: 'auto',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {content.navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ fontWeight: 600, color: 'var(--text-dark)' }} className="nav-link">
              {link.name}
            </a>
          ))}
          <button className="btn btn-primary">Hire Us</button>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 999
        }}>
          {content.navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} style={{ fontWeight: 600, padding: '0.5rem 0' }}>
              {link.name}
            </a>
          ))}
          <button className="btn btn-primary" style={{ width: '100%' }}>Hire Us</button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 992px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-link:hover { color: var(--accent) !important; }
      `}} />
    </nav>
  );
};

const Header = () => (
  <header>
    <TopBar />
    <Navbar />
  </header>
);

export default Header;
