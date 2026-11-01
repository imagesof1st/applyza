import InkOrbitFeatures from "@/components/ui/ink-orbit-features";

export function FeaturesShowcase() {
  return (
    <section
      id="intelligence"
      aria-label="ApplyZa Candidate Intelligence Architecture"
      className="relative bg-[#070709] py-20 md:py-32 overflow-hidden"
    >
      {/* 3D Atmosphere Lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[#E84320]/12 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <InkOrbitFeatures
          theme="dark"
          brand="APPLYZA CORE"
          tag="Candidate Intelligence Architecture"
          title="Where *strategy* meets\nexecution at scale."
          collaboration={{
            title: "Dedicated Advisor Sync & Live Candidate Pipeline",
            description:
              "You are assigned a dedicated US recruitment specialist who manages your active candidate pipeline end-to-end. Weekly 1-on-1 advisor calls, real-time Slack updates, and full visibility into every application, outreach, and recruiter response — so nothing falls through the gaps.",
          }}
          reports={{
            title: "ATS-Engineered Dossiers & Role Intelligence Briefs",
            description:
              "Every resume we produce is built to clear enterprise ATS filters and compel the hiring manager who reads it. Each submission is accompanied by a company intelligence brief covering the team, their recent hires, the hiring manager's background, and the exact language that resonates in that org.",
          }}
          integrations={{
            title: "Full US Hiring Ecosystem Coverage",
            description:
              "We operate natively across every major US hiring channel — LinkedIn Recruiter, Workday enterprise portals, Dice, Handshake, and direct recruiter networks — so no relevant opportunity is missed regardless of where it is posted.",
            tools: ["LinkedIn", "Workday", "Dice", "Handshake"],
          }}
          insights={{
            title: "Application-to-Interview Velocity Forecast",
            description:
              "Our pipeline analytics engine tracks your application-to-response rate in real time and benchmarks it against current US tech hiring velocity — so you always know whether your search is on track, accelerating, or needs a strategy adjustment.",
            values: [14, 22, 28, 36, 32, 47, 44, 59, 54, 71, 83, 98],
            forecastFrom: 7,
          }}
        />
      </div>
    </section>
  );
}
