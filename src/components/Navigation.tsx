import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { ApplyZaLogo } from './Logo';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Our Process', href: '#process' },
  { label: 'Who We Support', href: '#who-we-support' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        id="site-header"
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background-color 400ms cubic-bezier(0.16, 1, 0.3, 1), border-color 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
      >
        <nav
          className="section-container"
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            id="nav-logo"
            aria-label="ApplyZa — home"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <ApplyZaLogo size={36} showWordmark />
          </a>

          {/* Desktop nav links */}
          <ul
            role="list"
            style={{
              display: 'none',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: '2rem',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="#contact"
              id="nav-cta"
              className="btn-primary desktop-cta"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              style={{ padding: '0.625rem 1.375rem', fontSize: '0.8125rem' }}
            >
              Let's Talk
            </a>
            <button
              id="mobile-menu-toggle"
              className="mobile-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                transition: 'border-color 150ms ease',
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          backgroundColor: 'rgba(10, 10, 10, 0.98)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          id="mobile-nav-cta"
          className="btn-primary"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          style={{ marginTop: '1rem' }}
        >
          Let's Talk
        </a>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}
