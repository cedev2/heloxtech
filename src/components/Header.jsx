import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Lock } from 'lucide-react';
import { content } from '../constants/content';

const TopBar = ({ scrolled }) => {
  return (
    <div className="top-bar bg-gradient" style={{
      padding: '0.5rem 0',
      fontSize: '0.875rem',
      position: 'fixed',
      top: scrolled ? '-50px' : 0,
      left: 0,
      right: 0,
      height: '40px',
      zIndex: 1001,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.4s ease'
    }}>
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
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', borderRight: '1px solid rgba(255,255,255,0.2)', paddingRight: '1rem' }}>
            <a href="#" style={{ color: 'white' }}><Facebook size={16} /></a>
            <a href="#" style={{ color: 'white' }}><Twitter size={16} /></a>
            <a href="#" style={{ color: 'white' }}><Linkedin size={16} /></a>
            <a href="#" style={{ color: 'white' }}><Instagram size={16} /></a>
          </div>
          <a href="/admin" title="Staff Portal" style={{
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'transform 0.2s',
          }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Lock size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
      position: 'fixed',
      top: scrolled ? 0 : '40px', // Adjust based on TopBar height
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: scrolled ? '0.4rem 0' : '0.75rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img
            src="/logo.png"
            alt={content.brand.name}
            style={{
              height: scrolled ? '50px' : '65px',
              width: 'auto',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {content.navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{
              fontWeight: 600,
              color: 'var(--text-dark)',
              textShadow: 'none'
            }} className="nav-link">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>Hire Us</a>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer', color: 'var(--text-dark)' }} onClick={() => setIsOpen(!isOpen)}>
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
          .navbar { top: 0 !important; padding: 1rem 0 !important; background: ${scrolled ? 'rgba(255,255,255,0.95)' : 'white'} !important; }
        }
        .nav-link { transition: all 0.3s ease; position: relative; }
        .nav-link:hover { color: var(--accent) !important; }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--accent);
            transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
      `}} />
    </nav>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <TopBar scrolled={scrolled} />
      <Navbar scrolled={scrolled} />
    </header>
  );
};

export default Header;
