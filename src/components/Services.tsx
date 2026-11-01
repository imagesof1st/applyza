import { Target, Search, FileText, ClipboardList, Users, Mic } from 'lucide-react';

const SERVICES = [
  {
    id: 'job-search',
    icon: Search,
    title: 'Job Search & Opportunity Discovery',
    description:
      'We identify roles that genuinely match your profile, experience level, and location preferences — replacing scattered browsing with a focused, relevant list.',
  },
  {
    id: 'resume-tailoring',
    icon: FileText,
    title: 'Resume Tailoring',
    description:
      'Your resume is reframed to align with each specific role — accurate, keyword-aware, and positioned to pass applicant tracking systems without exaggeration.',
  },
  {
    id: 'application-support',
    icon: Target,
    title: 'Application Support',
    description:
      'Cover letters, application forms, and supplementary questions handled with precision. Every submission is polished, complete, and submitted on time.',
  },
  {
    id: 'application-tracking',
    icon: ClipboardList,
    title: 'Application Tracking',
    description:
      'Every application is logged, followed up, and managed in a structured tracker. You always know the status of every role you have applied to.',
  },
  {
    id: 'recruiter-outreach',
    icon: Users,
    title: 'Recruiter Outreach',
    description:
      'Professional LinkedIn messages and email outreach crafted for you. We help you connect with recruiters at target companies in a way that gets responses.',
  },
  {
    id: 'interview-prep',
    icon: Mic,
    title: 'Interview Preparation',
    description:
      'Role-specific mock interviews, answer frameworks, and company research so you walk into every interview ready to perform at your best.',
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      style={{
        padding: 'var(--space-2xl) 0',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="accent-line" />
          <p className="label-sm reveal" style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
            What We Offer
          </p>
          <h2
            id="services-heading"
            className="display-serif reveal"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: 'var(--color-text-primary)',
              maxWidth: '22ch',
              marginBottom: '1.5rem',
            }}
          >
            Everything your job search needs. One clear process.
          </h2>
          <p
            className="reveal"
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
              maxWidth: '52ch',
              lineHeight: 1.7,
            }}
          >
            ApplyZa covers every stage of your job search — from discovering opportunities to stepping into the interview room.
          </p>
        </div>

        {/* Services grid */}
        <div
          className="reveal-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5px',
            backgroundColor: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                id={`service-${service.id}`}
                style={{
                  backgroundColor: 'var(--color-surface-1)',
                  padding: '2.5rem 2rem',
                  cursor: 'default',
                  transition: 'background-color 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-1)';
                }}
              >
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--color-brand), transparent)',
                    opacity: 0,
                    transition: 'opacity 300ms ease',
                  }}
                  className="service-top-line"
                />
                <div className="service-icon" style={{ marginBottom: '1.5rem' }}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        article:hover .service-top-line { opacity: 1; }
      `}</style>
    </section>
  );
}
