import { GraduationCap, Globe, Monitor, Briefcase, MapPin, BookOpen } from 'lucide-react';

const PROFILES = [
  {
    id: 'students',
    icon: BookOpen,
    title: 'Students & Early-Career Candidates',
    description: 'Building your first professional resume, navigating application portals, and preparing for entry-level interviews — we make the process less overwhelming.',
  },
  {
    id: 'graduates',
    icon: GraduationCap,
    title: 'Recent Graduates',
    description: 'Moving from academia to industry is a significant transition. We help you frame your education and projects as professional experience that employers understand.',
  },
  {
    id: 'international',
    icon: Globe,
    title: 'International Graduates',
    description: 'Navigating the US job market from outside can feel opaque. We understand the landscape and help you present your international experience effectively.',
  },
  {
    id: 'it-professionals',
    icon: Monitor,
    title: 'IT Professionals',
    description: 'Technology roles in the US require precise positioning. We tailor your technical experience to match the exact requirements of each role you target.',
  },
  {
    id: 'experienced',
    icon: Briefcase,
    title: 'Experienced Professionals',
    description: 'Switching industries or advancing your career requires a different strategy. We help you reframe your experience for new markets and senior roles.',
  },
  {
    id: 'remote',
    icon: MapPin,
    title: 'Remote & Location-Focused Seekers',
    description: 'Whether you are searching for fully remote positions or targeting a specific US city, we filter and focus your search around what actually matters to you.',
  },
];

export function WhoWeSupport() {
  return (
    <section
      id="who-we-support"
      aria-labelledby="who-we-support-heading"
      style={{
        padding: 'var(--space-2xl) 0',
        backgroundColor: 'var(--color-surface-1)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="accent-line" />
          <p className="label-sm reveal" style={{ marginBottom: '1rem' }}>
            Who We Work With
          </p>
          <h2
            id="who-we-support-heading"
            className="display-serif reveal"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: 'var(--color-text-primary)',
              maxWidth: '22ch',
              marginBottom: '1.5rem',
            }}
          >
            Wherever you are in your career, we have worked with someone like you.
          </h2>
        </div>

        {/* Profile cards */}
        <div
          className="reveal-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {PROFILES.map((profile) => {
            const Icon = profile.icon;
            return (
              <article
                key={profile.id}
                id={`profile-${profile.id}`}
                className="az-card"
                style={{ cursor: 'default' }}
              >
                <div className="service-icon" style={{ marginBottom: '1.25rem' }}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.625rem',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {profile.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {profile.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
