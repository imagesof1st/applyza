export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        padding: 'var(--space-2xl) 0',
        backgroundColor: 'var(--color-surface-1)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle decorative glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(232, 67, 32, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left: text content */}
          <div>
            <span className="accent-line" />
            <p className="label-sm reveal" style={{ marginBottom: '1rem' }}>
              About ApplyZa
            </p>
            <h2
              id="about-heading"
              className="display-serif reveal"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                color: 'var(--color-text-primary)',
                maxWidth: '20ch',
                marginBottom: '2rem',
              }}
            >
              Your career deserves more than scattered applications.
            </h2>
            <div
              className="reveal-stagger"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.75, maxWidth: '58ch' }}>
                Most job seekers apply broadly and hope for the best. ApplyZa takes a different approach — structured, deliberate, and tailored to your specific goals and market.
              </p>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.75, maxWidth: '58ch' }}>
                We help you organize your search around roles that genuinely fit, present your experience with accuracy and clarity, and ensure every application you submit is ready to be taken seriously.
              </p>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.75, maxWidth: '58ch' }}>
                From the first application to the final round interview, ApplyZa is in your corner — handling the detail work so you can focus on what you do best.
              </p>
            </div>
          </div>

          {/* Right: stat-like highlights */}
          <div
            className="reveal-stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              backgroundColor: 'var(--color-border)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {[
              { label: 'Organized search', detail: 'Every opportunity tracked and prioritized for you' },
              { label: 'Tailored applications', detail: 'Each resume and cover letter built for the specific role' },
              { label: 'Recruiter communication', detail: 'Professional outreach drafted and managed for you' },
              { label: 'Interview readiness', detail: 'Role-specific preparation before every interview' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: 'var(--color-surface-2)',
                  padding: '1.75rem 1.5rem',
                  transition: 'background-color 250ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-3)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-2)'; }}
              >
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-brand)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
