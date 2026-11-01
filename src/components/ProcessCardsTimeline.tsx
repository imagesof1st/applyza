/**
 * ApplyZa Process section — powered by the Template Empire
 * ProcessCardsTimeline (GSAP sticky-stack, spine-rail, depth scrub).
 */
import type React from "react";
import { ProcessCardsTimeline as TEProcessCardsTimeline } from "@/components/ui/timeline-process-cards";
import type { ProcessCardStep } from "@/components/ui/timeline-process-cards";

/* ─── ApplyZa 6-stage process steps (rich content) ─────────────────────── */
const STEPS: ProcessCardStep[] = [
  {
    id: "profile",
    title: "Profile & Goals Calibration",
    description:
      "Every engagement begins with a structured intake session where we map your technical depth, career trajectory, compensation expectations, visa status, and geographic constraints. We don't just collect your resume — we build a comprehensive candidate dossier that governs every subsequent decision. This prevents misaligned applications, wasted time, and role rejections before they happen.",
    details: [
      "Comprehensive Candidate Intake Dossier",
      "Target Role & Seniority Calibration",
      "Compensation Floor & Equity Expectations",
      "Visa Constraints — OPT / STEM / H-1B / GC",
      "Geographic & Remote Work Boundaries",
      "Culture Fit & Team Environment Preferences",
    ],
  },
  {
    id: "discovery",
    title: "Curated Opportunity Discovery",
    description:
      "We run a focused sourcing operation across verified US hiring channels — LinkedIn Recruiter, enterprise career portals, direct recruiter networks, and specialty tech job feeds. Every position is scored against your intake dossier before it reaches you. There are no blind bulk submissions. Every application you receive has been pre-vetted for role relevance, compensation alignment, and company caliber.",
    details: [
      "Zero Blind Volume Submissions Policy",
      "Verified Direct Hiring Manager Postings",
      "LinkedIn Recruiter & Enterprise Portal Ingestion",
      "Role Relevance Match Score: 96%+",
      "Compensation Alignment Pre-Screen",
      "Company Health & Growth Stage Verification",
    ],
  },
  {
    id: "resume",
    title: "Precision Resume & Asset Tailoring",
    description:
      "Your resume is not copied — it is rebuilt for each target role. We inject the exact ATS keywords parsed from the job description, restructure impact bullets around measurable outcomes, and ensure clean formatting that passes every enterprise parsing engine. Alongside the resume, we produce a custom pitch note and align your LinkedIn profile and GitHub portfolio to reinforce the same narrative across every touchpoint the hiring manager sees.",
    details: [
      "Role-Specific ATS Keyword Injection",
      "Quantified Impact Bullet Reconstruction",
      "Clean ATS-Safe Formatting Standards",
      "Custom Pitch Cover Letter per Application",
      "LinkedIn Profile & Headline Sync",
      "GitHub & Portfolio Narrative Alignment",
    ],
  },
  {
    id: "application",
    title: "Application Dispatch & Recruiter Outreach",
    description:
      "We handle the full submission process — portal applications, email outreach, and LinkedIn InMail — so you never lose momentum to administrative friction. Every application is logged into your real-time candidate dashboard with status, submission timestamp, and next action. Alongside the applications, our team sends direct outreach to hiring managers and in-house recruiters, creating a parallel visibility channel that most candidates never use.",
    details: [
      "Full Portal Application Submission Handling",
      "Direct LinkedIn InMail to Hiring Managers",
      "Email Outreach to In-House Recruiters",
      "Real-Time Candidate Tracker Dashboard",
      "Submission Timestamp & Status Logs",
      "Follow-Up Cadence — Day 3, 7, and 14",
    ],
  },
  {
    id: "tracking",
    title: "Pipeline Tracking & Active Outreach Management",
    description:
      "A job search without tracking is a job search without control. We maintain a live dashboard showing every open application, its current stage, pending follow-ups, and recruiter engagement status. Our team actively monitors response signals and dispatches timely follow-up messages to keep your name at the top of each hiring manager's stack — precisely when it matters.",
    details: [
      "Live Application Status Dashboard",
      "Open Role Stage Tracking",
      "Recruiter Response Signal Monitoring",
      "Timed Follow-Up Message Sequences",
      "Offer & Rejection Log with Notes",
      "Weekly Pipeline Summary Reports",
    ],
  },
  {
    id: "interview",
    title: "Interview Coaching & Offer Strategy",
    description:
      "Before every interview stage — phone screen, technical round, or final loop — we run targeted preparation built around that specific company, team, and interviewer profile where available. You receive a company intelligence dossier, a set of role-specific behavioral and technical questions, a structured answer framework, and a compensation negotiation blueprint calibrated to current US market data. The goal is not just to prepare you — it is to ensure you walk out with the offer.",
    details: [
      "Role-Specific Technical Mock Interviews",
      "Behavioral Question & STAR Answer Frameworks",
      "Company Intelligence Dossier per Round",
      "Interviewer Background Research",
      "Salary, Bonus & Equity Negotiation Blueprint",
      "Competing Offer Leverage Strategy",
    ],
  },
];

/* ─── Thin wrapper that injects ApplyZa design tokens ───────────────────── */
export function ProcessCardsTimeline() {
  return (
    <div
      id="process"
      style={
        {
          "--background":          "#0A0A0C",
          "--surface":             "#131318",
          "--border":              "rgba(255,255,255,0.09)",
          "--primary":             "#E84320",
          "--foreground":          "#F3F3F5",
          "--muted-foreground":    "#8A8A9A",
          "--process-card":        "var(--surface)",
          "--process-card-border": "rgba(255,255,255,0.11)",
          "--process-card-number": "#E84320",
          "--process-card-shadow": "#040405",
          "--dur-2":               "0.28s",
          "--dur-3":               "0.55s",
        } as React.CSSProperties
      }
      className="border-t border-b border-white/[0.07] bg-[#0A0A0C]"
    >
      <TEProcessCardsTimeline
        title="A structured path from profile to offer."
        description="Six focused stages keep direction, quality, and momentum visible from the first intake brief to the final compensation negotiation. Every step is deliberate."
        steps={STEPS}
        stackOffset={28}
        className="text-[--foreground]"
      />
    </div>
  );
}

export type { ProcessCardStep };
