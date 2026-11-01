import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Building2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export function CareerCockpit() {
  return (
    <section
      id="cockpit"
      aria-label="Interactive 3D Career Command Center"
      className="relative bg-[#070708] overflow-hidden py-12 md:py-24 border-b border-white/[0.08]"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E84320]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E84320]/30 bg-[#E84320]/10 text-[#E84320] text-xs font-semibold tracking-wider uppercase mb-5 shadow-[0_0_20px_rgba(232,67,32,0.15)]">
              <Sparkles size={14} className="animate-pulse" />
              <span>Next-Generation Career Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] text-center font-display">
              Unleash the full velocity of{" "}
              <span className="bg-gradient-to-r from-white via-[#E84320] to-[#FF7A59] bg-clip-text text-transparent">
                Data-Driven USA Placement
              </span>
            </h2>

            <p className="mt-4 text-base md:text-lg text-zinc-400 max-w-2xl text-center leading-relaxed">
              Experience the ApplyZa Candidate Dossier & Application Engine in real time.
              Scroll to inspect how we transform candidate profiles into top-tier offers.
            </p>
          </div>
        }
      >
        {/* Cockpit Card Interior: Ultra-High-Fidelity 3D Dashboard Mockup */}
        <div className="h-full w-full bg-[#0c0d0f] flex flex-col text-left select-none overflow-hidden relative font-sans">
          {/* Top Window Bar */}
          <div className="h-11 border-b border-white/[0.08] bg-[#121316] px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
              <span className="ml-3 text-xs font-mono text-zinc-400 font-medium hidden sm:inline-block">
                applyza://command-center/pipeline-v2.4
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                STRATEGY ACTIVE
              </span>
              <span className="text-xs text-zinc-400 border-l border-white/10 pl-3 hidden md:inline">
                USA Placement Desk #04
              </span>
            </div>
          </div>

          {/* Subheader: Candidate Profile Bar */}
          <div className="bg-[#15161a] border-b border-white/[0.06] px-5 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E84320] to-[#FF8C66] flex items-center justify-center font-bold text-white text-base shadow-lg shadow-[#E84320]/20">
                AC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-white text-sm font-semibold tracking-tight">
                    Alex Chen, M.S.
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/5">
                    STEM OPT • Tier-1
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Target: Senior Software Architect / ML Infrastructure • San Francisco & NYC
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-zinc-500 text-[10px] block">ATS SCORE</span>
                <span className="text-emerald-400 font-bold text-sm">98.4%</span>
              </div>
              <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-zinc-500 text-[10px] block">TARGET COMP</span>
                <span className="text-[#FF8C66] font-bold text-sm">$195k – $240k</span>
              </div>
            </div>
          </div>

          {/* Main Content Dashboard Grid */}
          <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#0c0d0f] to-[#08080a]">
            {/* Left Column: Live Active Pipeline */}
            <div className="md:col-span-7 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Briefcase size={14} className="text-[#E84320]" />
                  Active Curated Pipelines (Selected 4 of 28)
                </span>
                <span className="text-[11px] text-[#E84320] font-mono hover:underline cursor-pointer">
                  Sync All Portals
                </span>
              </div>

              {/* Company 1 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#E84320]/40 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                    <Building2 size={18} className="text-zinc-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold group-hover:text-[#FF7A59] transition-colors">
                        Datadog
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                        Referral Verified
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Staff Infrastructure Engineer • New York, NY
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20 inline-block font-mono">
                    Round 3 / Technical
                  </span>
                  <span className="block text-[10px] text-zinc-500 mt-1">Tomorrow, 2:00 PM EST</span>
                </div>
              </div>

              {/* Company 2 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#E84320]/40 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                    <Building2 size={18} className="text-[#FF6B47]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold group-hover:text-[#FF7A59] transition-colors">
                        Stripe
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 font-mono">
                        Recruiter Outreach
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Senior Backend Engineer (Payments Core) • Remote (USA)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 inline-block font-mono">
                    Offer Review Stage
                  </span>
                  <span className="block text-[10px] text-zinc-500 mt-1">Compensation Strategy Set</span>
                </div>
              </div>

              {/* Company 3 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#E84320]/40 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                    <Building2 size={18} className="text-zinc-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold group-hover:text-[#FF7A59] transition-colors">
                        Snowflake
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-400 font-mono">
                        Target Enterprise
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Cloud Systems Performance Architect • San Mateo, CA
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 inline-block font-mono">
                    System Design Prep
                  </span>
                  <span className="block text-[10px] text-zinc-500 mt-1">Advisor Mock: Completed</span>
                </div>
              </div>

              {/* Status summary pill row */}
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="bg-[#141518] p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Resume Versions</span>
                    <span className="text-xs font-semibold text-white">4 Tailored Masteries</span>
                  </div>
                </div>
                <div className="bg-[#141518] p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#E84320] shrink-0" />
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Interview Rate</span>
                    <span className="text-xs font-semibold text-white">28.4% (vs 2% avg)</span>
                  </div>
                </div>
                <div className="bg-[#141518] p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-zinc-400 block">H-1B Cap Status</span>
                    <span className="text-xs font-semibold text-white">Sponsor Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Strategic Dossier Stream */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Award size={14} className="text-amber-400" />
                  Strategy & Advisory Stream
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Live Sync</span>
              </div>

              <div className="bg-[#131417] border border-white/[0.08] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-xs font-medium text-white flex items-center gap-1.5">
                    <Zap size={14} className="text-[#E84320]" />
                    Advisor Strategic Calibration
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Complete</span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  "Candidate's distributed caching and low-latency metrics repositioned to section 1. All recruiter outbound messages tuned for high-growth US cloud platforms."
                </p>

                <div className="bg-black/50 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-mono">NEXT ACTION ITEM</span>
                    <span className="text-xs text-white font-medium">Final Round Negotiation Protocol</span>
                  </div>
                  <Calendar size={15} className="text-zinc-400" />
                </div>
              </div>

              {/* Key Benefit Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#E84320]/15 via-black to-zinc-900 border border-[#E84320]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Zero Blind Volume Submissions
                  </span>
                  <span className="text-[11px] text-zinc-300">
                    Targeted precision tailored to US hiring cycles.
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#E84320] flex items-center justify-center text-white shadow-lg shadow-[#E84320]/30">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
