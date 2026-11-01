import { ApplyZaLogo } from './Logo';
import { InstagramIcon, LinkedinIcon } from './SocialIcons';

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Process', href: '#process' },
  { label: 'Who We Support', href: '#who-we-support' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      role="contentinfo"
      style={{
        backgroundColor: '#050505',
        borderTop: '1px solid var(--color-border)',
        padding: '4rem 0 2rem',
      }}
    >
      <div className="section-container">
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            marginBottom: '3rem',
          }}
          className="footer-top"
        >
          {/* Brand column */}
          <div>
            <a
              href="#"
              aria-label="ApplyZa — back to top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ display: 'inline-flex', textDecoration: 'none', marginBottom: '1rem' }}
            >
              <ApplyZaLogo size={36} showWordmark />
            </a>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                maxWidth: '34ch',
                marginTop: '1rem',
              }}
            >
              Apply Smart. Get Hired.
            </p>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                maxWidth: '36ch',
                marginTop: '0.5rem',
              }}
            >
              Structured job-search support for candidates pursuing opportunities in the United States.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p
              className="label-sm"
              style={{ marginBottom: '1.25rem', color: 'var(--color-text-muted)' }}
            >
              Navigation
            </p>
            <ul
              role="list"
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="nav-link"
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div>
            <p
              className="label-sm"
              style={{ marginBottom: '1.25rem', color: 'var(--color-text-muted)' }}
            >
              Follow
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="https://instagram.com/applyza"
                id="footer-instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ApplyZa on Instagram (@applyza)"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  textDecoration: 'none',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  transition: 'color 150ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <InstagramIcon size={16} aria-hidden={true} />
                @applyza
              </a>
              <a
                href="https://linkedin.com/company/applyzaofficial"
                id="footer-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ApplyZa on LinkedIn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  textDecoration: 'none',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  transition: 'color 150ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <LinkedinIcon size={16} aria-hidden={true} />
                applyzaofficial
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider" style={{ marginBottom: '2rem' }} />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            © {currentYear} ApplyZa. All rights reserved.
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            USA Job Search Support
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-top { grid-template-columns: 2fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
