const PROMISES = [
  {
    word: 'Relevance',
    contrast: 'over volume.',
    detail:
      'We do not send you a hundred job links and call it support. Every opportunity in your search is chosen because it genuinely fits your experience, goals, and situation.',
  },
  {
    word: 'Accuracy',
    contrast: 'over exaggeration.',
    detail:
      'Your resume will reflect what you have actually done — clearly, compellingly, and without stretching the truth. Honest positioning is more effective than inflated claims.',
  },
  {
    word: 'Clarity',
    contrast: 'over chaos.',
    detail:
      'The job search feels chaotic because most people run it without structure. ApplyZa gives you a clear view of every application, every follow-up, and every next step.',
  },
];

export function BrandPromise() {
  return (
    <section
      id="brand-promise"
      aria-labelledby="brand-promise-heading"
      style={{
        padding: 'var(--space-2xl) 0',
        backgroundColor: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large decorative background text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(6rem, 18vw, 16rem)',
          fontFamily: "'DM Serif Display', serif",
          fontWeight: 400,
          color: 'rgba(255,255,255,0.018)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        ApplyZa
      </div>

      {/* Brand glow center */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(232, 67, 32, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
          <p className="label-sm reveal" style={{ marginBottom: '1rem' }}>
            Our Commitment
          </p>
          <h2
            id="brand-promise-heading"
            className="display-serif reveal"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
              maxWidth: '24ch',
              margin: '0 auto',
            }}
          >
            Relevance over volume.{' '}
            <span style={{ color: 'var(--color-brand)', fontStyle: 'italic' }}>Accuracy</span> over exaggeration.{' '}
            Clarity over chaos.
          </h2>
        </div>

        {/* Promise pillars */}
        <div
          className="reveal-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {PROMISES.map((promise, i) => (
            <div
              key={promise.word}
              style={{
                backgroundColor: 'var(--color-surface-1)',
                padding: '2.5rem 2rem',
                position: 'relative',
                transition: 'background-color 300ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-2)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-1)'; }}
            >
              <div
                aria-hidden="true"
                style={{
                  fontSize: '3rem',
                  fontFamily: "'DM Serif Display', serif",
                  color: 'rgba(232, 67, 32, 0.08)',
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  lineHeight: 1,
                  userSelect: 'none',
                  fontWeight: 400,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <p
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  marginBottom: '1rem',
                }}
              >
                <span style={{ color: 'var(--color-brand)' }}>{promise.word}</span>{' '}
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>{promise.contrast}</span>
              </p>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                  margin: 0,
                  maxWidth: '40ch',
                }}
              >
                {promise.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
