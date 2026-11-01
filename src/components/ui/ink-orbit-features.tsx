"use client";

import React from "react";

export type InkFeatureCopy = { title: string; description: string };
export type InkFeatures = {
  tag: string;
  title: string;
  collaboration: InkFeatureCopy;
  reports: InkFeatureCopy;
  integrations: InkFeatureCopy & { tools: string[] };
  insights: InkFeatureCopy & { values: number[]; forecastFrom: number };
};

export type InkOrbitFeaturesProps = {
  theme?: "light" | "dark" | "auto";
  brand?: string;
  tag?: string;
  title?: string;
  collaboration?: { [K in keyof InkFeatureCopy]?: InkFeatureCopy[K] };
  reports?: { [K in keyof InkFeatureCopy]?: InkFeatureCopy[K] };
  integrations?: { [K in keyof InkFeatures["integrations"]]?: InkFeatures["integrations"][K] };
  insights?: { [K in keyof InkFeatures["insights"]]?: InkFeatures["insights"][K] };
  className?: string;
  style?: React.CSSProperties;
};

/* ------------------------------------------------------------------ logic */

function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

function chartPaths(values: number[], w: number, h: number, pad: number) {
  const n = values.length;
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  const pts = values.map((v, i) => [
    pad + (n < 2 ? 0 : (i / (n - 1)) * (w - pad * 2)),
    h - pad - ((v - lo) / span) * (h - pad * 2),
  ] as [number, number]);
  let line = "";
  pts.forEach(([x, y], i) => {
    if (i === 0) {
      line = "M" + x.toFixed(1) + "," + y.toFixed(1);
      return;
    }
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    line += " C" + cx.toFixed(1) + "," + py.toFixed(1) + " " + cx.toFixed(1) + "," + y.toFixed(1) + " " + x.toFixed(1) + "," + y.toFixed(1);
  });
  const area = n ? line + " L" + pts[n - 1][0].toFixed(1) + "," + (h - pad) + " L" + pts[0][0].toFixed(1) + "," + (h - pad) + " Z" : "";
  return { line, area, points: pts };
}

function nearestIndex(xs: number[], x: number): number {
  let best = 0;
  for (let i = 1; i < xs.length; i++) if (Math.abs(xs[i] - x) < Math.abs(xs[best] - x)) best = i;
  return best;
}

function parseTitle(s: string): { text: string; muted: boolean }[][] {
  return s.split(/\r?\n|\\n/).map((line) => {
    const out: { text: string; muted: boolean }[] = [];
    line.split("*").forEach((text, i) => {
      if (text) out.push({ text, muted: i % 2 === 1 });
    });
    return out;
  });
}

/* --------------------------------------------------------------- defaults */

const D_FEATURES: InkFeatures = {
  tag: "Intelligent Job Search Architecture",
  title: "Precision Strategy.\n*Zero Noise* Execution.",
  collaboration: {
    title: "Dedicated Advisor Sync & Live Candidate Pipeline",
    description: "Align 1-on-1 with dedicated USA recruitment specialists. Every resume tweak, target employer calibration, and interview stage tracked in real time.",
  },
  reports: {
    title: "High-Impact ATS Dossiers & Briefings",
    description: "Tailored applications and company intelligence sheets engineered specifically to clear enterprise screening filters and impress hiring managers.",
  },
  integrations: {
    title: "US Hiring Ecosystem Ingestion",
    description: "Seamless synchronization across LinkedIn, enterprise career portals, job boards, and specialized tech recruiter channels.",
    tools: ["LinkedIn", "Workday", "Dice", "Handshake"],
  },
  insights: {
    title: "Predictive Interview Conversion Velocity",
    description: "Data-driven forecasting calculates your application-to-interview acceleration compared against industry averages.",
    values: [16, 22, 26, 35, 33, 44, 41, 56, 52, 68, 79, 92],
    forecastFrom: 7,
  },
};

/* -------------------------------------------------------------- component */

export default function InkOrbitFeatures({
  theme = "dark",
  brand = "APPLYZA ENGINE",
  tag = D_FEATURES.tag,
  title = D_FEATURES.title,
  collaboration,
  reports,
  integrations,
  insights,
  className = "",
  style,
}: InkOrbitFeaturesProps) {
  const uid = "ib" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const F: InkFeatures = {
    tag,
    title,
    collaboration: { ...D_FEATURES.collaboration, ...collaboration },
    reports: { ...D_FEATURES.reports, ...reports },
    integrations: { ...D_FEATURES.integrations, ...integrations },
    insights: { ...D_FEATURES.insights, ...insights },
  };

  const [dark, setDark] = React.useState(theme === "dark");
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      setDark(theme === "dark");
      return;
    }
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setDark(theme === "auto" ? scheme.matches : theme === "dark");
      setReduced(motion.matches);
    };
    sync();
    scheme.addEventListener?.("change", sync);
    motion.addEventListener?.("change", sync);
    return () => {
      scheme.removeEventListener?.("change", sync);
      motion.removeEventListener?.("change", sync);
    };
  }, [theme]);

  const [featRef, featIn] = useInView(0.12);

  return (
    <div className={"ib-root " + className} data-theme={dark ? "dark" : "light"} style={style}>
      <style>{IB_CSS}</style>
      <div className="ib-shell">
        <section className="ib-sec" aria-labelledby={uid + "feat"}>
          {/* Subtle Ambient Brand Glow */}
          <div className="ib-glow-spot" aria-hidden="true" />

          <div className="ib-reveal" ref={featRef as never} data-in={featIn}>
            <div className="ib-head" id={uid + "feat"}>
              <Title text={F.title} />
              <p className="ib-subtitle">
                How ApplyZa replaces blind spray-and-pray applications with calibrated, data-backed candidate positioning.
              </p>
            </div>

            <div className="ib-bento">
              <FlowCard brand={brand} features={F} uid={uid} reduced={reduced} inView={featIn} />
              <IntegrationsCard copy={F.integrations} reduced={reduced} />
              <InsightsCard copy={F.insights} uid={uid} reduced={reduced} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- pieces */

function useInView(threshold = 0.2) {
  const ref = React.useRef(null as HTMLElement | null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver !== "function") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, threshold]);
  return [ref, inView] as const;
}

function Brackets() {
  return (
    <>
      <span className="ib-c ib-c-tl" aria-hidden="true" />
      <span className="ib-c ib-c-tr" aria-hidden="true" />
      <span className="ib-c ib-c-bl" aria-hidden="true" />
      <span className="ib-c ib-c-br" aria-hidden="true" />
    </>
  );
}

function Title({ text, className = "ib-h2", as = "h2" }: { text: string; className?: string; as?: "h2" | "h3" }) {
  const Tag = as;
  return (
    <Tag className={className}>
      {parseTitle(text).map((line, i) => (
        <span key={i} className="ib-title-line">
          {line.map((run, j) => (
            <React.Fragment key={j}>
              {run.muted ? (
                <span className="ib-brand-gradient">{run.text}</span>
              ) : (
                run.text
              )}
            </React.Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}

function ApplyZaMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L2 21H7.5L12 11.5L16.5 21H22L12 3Z" fill="url(#azMarkGrad)" />
      <path d="M12 9.5L15 16.5H9L12 9.5Z" fill="#0A0A0B" />
      <defs>
        <linearGradient id="azMarkGrad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A59" />
          <stop offset="1" stopColor="#E84320" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Candidate profile portraits */
const PORTRAITS = [
  { hair: "short", beard: true, glasses: false, skin: "#d4a373", hairC: "#2b2a29", shirt: "#1e1e24", bg: "#3a3a40" },
  { hair: "long", beard: false, glasses: false, skin: "#e0ac69", hairC: "#6f4e37", shirt: "#2d3142", bg: "#4f5d75" },
  { hair: "buzz", beard: false, glasses: true, skin: "#c68642", hairC: "#2c2c2c", shirt: "#333333", bg: "#555555" },
  { hair: "bun", beard: false, glasses: true, skin: "#f1c27d", hairC: "#1b1b1b", shirt: "#283618", bg: "#606c38" },
  { hair: "curly", beard: false, glasses: false, skin: "#8d5524", hairC: "#111111", shirt: "#3d348b", bg: "#7678ed" },
];

function Portrait({ index, size = 38, uid }: { index: number; size?: number; uid: string }) {
  const p = PORTRAITS[((index % PORTRAITS.length) + PORTRAITS.length) % PORTRAITS.length];
  const id = uid + "pt" + index;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.bg} />
          <stop offset="1" stopColor="#1a1a1c" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="32" fill={"url(#" + id + ")"} />
      <path d="M8 64c2-12 12-18 24-18s22 6 24 18z" fill={p.shirt} />
      <rect x="27.5" y="36" width="9" height="11" rx="3" fill={p.skin} />
      <ellipse cx="32" cy="28" rx="11" ry="13" fill={p.skin} />
      {p.hair === "short" && <path d="M21 25c0-9 5-13 11-13s11 4 11 13c-2-4-6-6-11-6s-9 2-11 6z" fill={p.hairC} />}
      {p.hair === "curly" &&
        [[22, 20], [28, 15], [36, 15], [42, 20], [45, 28], [19, 28]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill={p.hairC} />)}
      {p.hair === "long" && <path d="M18 30c0-12 6-19 14-19s14 7 14 19v20H18z" fill={p.hairC} />}
      {p.hair === "buzz" && <path d="M21.5 24c.5-8 5-11.5 10.5-11.5S42 16 42.5 24c-3-3-6.5-4-10.5-4s-7.5 1-10.5 4z" fill={p.hairC} opacity=".85" />}
      {p.hair === "bun" && (
        <>
          <circle cx="32" cy="11" r="6" fill={p.hairC} />
          <path d="M21 26c0-10 5-14 11-14s11 4 11 14c-2-5-6-7.5-11-7.5S23 21 21 26z" fill={p.hairC} />
        </>
      )}
      {p.beard && <path d="M21.5 30c1 9 5 12 10.5 12s9.5-3 10.5-12c-2 4-5 5-10.5 5s-8.5-1-10.5-5z" fill={p.hairC} opacity=".9" />}
      <circle cx="27.5" cy="28" r="1.3" fill="#111" />
      <circle cx="36.5" cy="28" r="1.3" fill="#111" />
      {p.glasses && (
        <g fill="none" stroke="#111" strokeWidth="1.2">
          <circle cx="27.5" cy="28" r="4" />
          <circle cx="36.5" cy="28" r="4" />
          <path d="M31.5 28h1" />
        </g>
      )}
    </svg>
  );
}

function PlatformGlyph({ index }: { index: number }) {
  const k = index % 4;
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* LinkedIn symbol */}
      {k === 0 && (
        <>
          <rect x="-7" y="-7" width="14" height="14" rx="3" stroke="#0077b5" />
          <path d="M-4.5 -1v5M-4.5 -4.5v.1M-.5 4V0c0-1.2.9-2 2-2s2 .8 2 2v4M-.5 1h4" stroke="#0077b5" />
        </>
      )}
      {/* Workday / Enterprise cloud */}
      {k === 1 && (
        <>
          <path d="M-6 2a4 4 0 0 1 7.8-1.2A3 3 0 0 1 5.5 2 3 3 0 0 1 5 5h-11a3 3 0 0 1 0-3z" stroke="#FF7A59" />
          <circle cx="0" cy="1" r="1.5" fill="#FF7A59" />
        </>
      )}
      {/* Dice / Tech job database */}
      {k === 2 && (
        <>
          <rect x="-6" y="-6" width="12" height="12" rx="2" stroke="#E84320" />
          <circle cx="-2.5" cy="-2.5" r="1" fill="#E84320" />
          <circle cx="2.5" cy="2.5" r="1" fill="#E84320" />
          <circle cx="0" cy="0" r="1" fill="#E84320" />
        </>
      )}
      {/* Handshake / Campus network */}
      {k === 3 && (
        <>
          <path d="M-6 -2l3.5 3.5a2 2 0 0 0 2.8 0L3 -1.2a2 2 0 0 0 0-2.8l-1.5-1.5" stroke="#10b981" />
          <path d="M6 2l-3.5-3.5a2 2 0 0 0-2.8 0L-3 1.2a2 2 0 0 0 0 2.8l1.5 1.5" stroke="#10b981" />
        </>
      )}
    </g>
  );
}

function FlowCard({ brand, features, uid, reduced, inView }: { brand: string; features: InkFeatures; uid: string; reduced: boolean; inView: boolean }) {
  const [reports, setReports] = React.useState(248);
  const [side, setSide] = React.useState("" as "" | "left" | "right");

  React.useEffect(() => {
    if (reduced || !inView) return;
    const t = setInterval(() => setReports((n) => n + 1), 2500);
    return () => clearInterval(t);
  }, [reduced, inView]);

  const team = [
    { x: 58, y: 38, name: "David · FAANG Resume Optimized" },
    { x: 104, y: 22, name: "Sneha · Strategy & H-1B Target Set" },
    { x: 150, y: 40, name: "Alex · Stripe Interview Round 2" },
    { x: 46, y: 92, name: "Priya · Datadog Technical Screen" },
    { x: 146, y: 114, name: "Marcus · Offer Negotiation Phase" },
  ];

  const L1 = "M117,67 C196,67 210,100 262,100";
  const L2 = "M117,73 C186,73 206,120 262,120";
  const R1 = "M378,100 C412,100 418,86 450,86";
  const R2 = "M378,120 C412,120 418,134 450,134";

  const chip = brand.split(" ")[0].toUpperCase();
  const glow = uid + "glow";
  const rays = uid + "rays";

  return (
    <div className="ib-frame ib-frame-hover ib-wide">
      <Brackets />
      <div className="ib-card ib-card-3d" style={{ padding: 0, overflow: "hidden" }}>
        {/* Top Mini Header */}
        <div className="ib-flow-header">
          <div className="ib-flow-title">
            <span className="ib-live-indicator" />
            <span className="ib-flow-label">LIVE CANDIDATE PIPELINE ORCHESTRATION</span>
          </div>
          <span className="ib-flow-meta">DISPATCH VELOCITY: 2.8s</span>
        </div>

        <svg
          className="ib-diagram"
          viewBox="0 0 640 184"
          role="img"
          aria-label={"Candidate profiles flow through " + brand + " into targeted employer dossiers"}
        >
          <defs>
            <radialGradient id={glow} cx="320" cy="110" r="190" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="rgba(232,67,32,0.18)" />
              <stop offset="1" stopColor="rgba(232,67,32,0)" />
            </radialGradient>
            <linearGradient id={rays} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E84320" stopOpacity=".35" />
              <stop offset="1" stopColor="#E84320" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="packetGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FF8C66" />
              <stop offset="1" stopColor="#E84320" />
            </linearGradient>
          </defs>

          {/* Ambient Lighting */}
          <rect x="0" y="0" width="640" height="184" fill={"url(#" + glow + ")"} />

          {/* Radiating Light Beams */}
          {[-60, -36, -12, 12, 36, 60].map((a, i) => (
            <path
              key={i}
              d={
                "M320,110 L" +
                (320 + Math.sin((a * Math.PI) / 180) * 260) +
                "," +
                (110 - Math.cos((a * Math.PI) / 180) * 260) +
                " L" +
                (320 + Math.sin(((a + 6) * Math.PI) / 180) * 260) +
                "," +
                (110 - Math.cos(((a + 6) * Math.PI) / 180) * 260) +
                "Z"
              }
              fill={"url(#" + rays + ")"}
              opacity=".45"
            />
          ))}

          {/* Left: Candidate Cluster */}
          <g onMouseEnter={() => setSide("left")} onMouseLeave={() => setSide("")}>
            <rect x="20" y="8" width="170" height="130" fill="transparent" />
            {team.map((m, i) => (
              <line key={"l" + i} x1={m.x} y1={m.y} x2="104" y2="70" stroke="rgba(255,255,255,0.12)" strokeDasharray="2 3" />
            ))}

            {/* Central Node in Candidate Cluster */}
            <g transform="translate(90,56)">
              <rect width="28" height="28" rx="7" className="ib-node ib-node-highlight" />
              <g transform="translate(6,6)">
                <ApplyZaMark size={16} />
              </g>
            </g>

            {/* Candidate Avatars */}
            {team.map((m, i) => (
              <g key={i} className="ib-av" tabIndex={0} role="img" aria-label={m.name}>
                <svg x={m.x - 12} y={m.y - 12} width="24" height="24" viewBox="0 0 24 24" overflow="visible">
                  <clipPath id={uid + "avc" + i}>
                    <circle cx="12" cy="12" r="11" />
                  </clipPath>
                  <g clipPath={"url(#" + uid + "avc" + i + ")"}>
                    <Portrait index={i} size={24} uid={uid + "f"} />
                  </g>
                  <circle cx="12" cy="12" r="11" fill="none" stroke="#222" strokeWidth="1.5" />
                </svg>
                {/* Active Indicator Pulse */}
                <circle
                  cx={m.x + 9}
                  cy={m.y + 9}
                  r="2.8"
                  fill={i === 4 ? "#10b981" : "#E84320"}
                  stroke="#121316"
                  strokeWidth="1.2"
                  className={i === 4 ? undefined : "ib-presence"}
                />
                {/* Hover Tooltip */}
                <g className="ib-av-tip" transform={"translate(" + m.x + "," + (m.y - 20) + ")"}>
                  <rect
                    x={-m.name.length * 2.5 - 8}
                    y="-10"
                    width={m.name.length * 5 + 16}
                    height="17"
                    rx="4"
                    fill="#18191d"
                    stroke="#E84320"
                    strokeWidth="0.8"
                  />
                  <text x="0" y="2" textAnchor="middle" fontSize="8" fill="#F5F5F5" fontFamily="var(--ib-sans)" fontWeight="500">
                    {m.name}
                  </text>
                </g>
              </g>
            ))}
          </g>

          {/* Connecting Conduit Lines */}
          {[L1, L2].map((d, i) => (
            <path key={d} d={d} className={"ib-flow" + (side === "left" ? " ib-flow-on" : "") + (i ? " ib-dash" : "")} />
          ))}
          {[R1, R2].map((d, i) => (
            <path key={d} d={d} className={"ib-flow" + (side === "right" ? " ib-flow-on" : "") + (i ? " ib-dash" : "")} />
          ))}

          {/* Animated Glow Packets Traveling Conduits */}
          {!reduced &&
            [L1, L2, R1, R2].map((d, i) => (
              <circle key={"p" + i} r="2.8" fill="url(#packetGrad)" className="ib-pkt">
                <animateMotion dur={2.2 + (i % 2) * 0.6 + "s"} begin={i * 0.35 + "s"} repeatCount="indefinite" path={d} />
              </circle>
            ))}

          {/* Central ApplyZa Command Chip */}
          <g transform="translate(260,86)">
            {/* Ambient Neon Outer Stroke */}
            <rect
              x="-4"
              y="-4"
              width="128"
              height="54"
              rx="10"
              fill="none"
              stroke="#E84320"
              strokeOpacity="0.4"
              className={reduced ? undefined : "ib-glow"}
            />
            {/* Core Chip Body */}
            <rect
              width="120"
              height="46"
              rx="8"
              fill="#18191e"
              stroke="rgba(255,255,255,0.14)"
              style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,.6))" }}
            />
            {/* Brand Logo Inside Chip */}
            <g transform="translate(13,14)">
              <ApplyZaMark size={18} />
            </g>
            {/* Chip Label */}
            <text
              x="38"
              y="25"
              fontSize="9"
              letterSpacing="1.2"
              fontWeight="700"
              fill="#FFFFFF"
              fontFamily="var(--ib-sans)"
            >
              {chip}
            </text>
            <text x="38" y="36" fontSize="7" letterSpacing="0.8" fill="#FF7A59" fontFamily="var(--ib-mono)">
              OPTIMIZING ATS
            </text>
            <path d="M102 19l4 4-4 4" fill="none" stroke="#E84320" strokeWidth="1.6" />
          </g>

          {/* Right: Target Dossier Stack */}
          <g onMouseEnter={() => setSide("right")} onMouseLeave={() => setSide("")}>
            {[2, 1, 0].map((k) => (
              <g key={reports - k} transform={"translate(" + (450 + k * 12) + "," + (40 - k * 10) + ")"} opacity={1 - k * 0.22}>
                <g className={"ib-sheet" + (k === 0 ? " ib-sheet-new" : "")}>
                  <rect
                    width="142"
                    height="106"
                    rx="6"
                    fill="#15161a"
                    stroke={k === 0 ? "#E84320" : "rgba(255,255,255,0.12)"}
                    strokeWidth={k === 0 ? "1.5" : "1"}
                  />
                  {k === 0 && (
                    <>
                      {/* Dossier Header */}
                      <text x="12" y="18" fontSize="7.5" fill="#FF7A59" fontWeight="700" fontFamily="var(--ib-mono)">
                        {"TARGET DOSSIER #" + reports}
                      </text>
                      {/* ATS Score Tag */}
                      <rect x="94" y="9" width="36" height="12" rx="3" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="0.8" />
                      <text x="112" y="18" fontSize="6.5" fill="#34d399" textAnchor="middle" fontWeight="bold" fontFamily="var(--ib-mono)">
                        98% MATCH
                      </text>

                      {/* Content Placeholders */}
                      <rect x="12" y="27" width="70" height="5" rx="1.5" fill="#FFFFFF" opacity=".8" />
                      <rect x="12" y="37" width="98" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
                      <rect x="12" y="44" width="86" height="3" rx="1" fill="rgba(255,255,255,0.15)" />

                      {/* Calibrated Skill Bars */}
                      {[20, 28, 16, 32, 24, 36].map((h, j) => (
                        <rect
                          key={j}
                          x={14 + j * 14}
                          y={96 - h}
                          width="9"
                          rx="2"
                          height={h}
                          fill={j % 2 === 0 ? "#E84320" : "#FF7A59"}
                          opacity={0.6 + j * 0.08}
                        />
                      ))}
                      <path d="M98 68h32M98 76h26M98 84h30" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
                    </>
                  )}
                </g>
              </g>
            ))}
          </g>
        </svg>

        {/* Card Copy */}
        <div className="ib-wide-copy">
          <div>
            <h3>{features.collaboration.title}</h3>
            <p>{features.collaboration.description}</p>
          </div>
          <div>
            <h3>{features.reports.title}</h3>
            <p>{features.reports.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsCard({ copy, reduced }: { copy: InkFeatures["integrations"]; reduced: boolean }) {
  const [hover, setHover] = React.useState(-1);
  const [auto, setAuto] = React.useState(0);

  React.useEffect(() => {
    if (reduced || hover >= 0) return;
    const t = setInterval(() => setAuto((a) => (a + 1) % 4), 1800);
    return () => clearInterval(t);
  }, [reduced, hover]);

  const on = hover >= 0 ? hover : reduced ? -1 : auto;
  const tiles = [
    { x: 66, y: 34, label: "LinkedIn Recruiter" },
    { x: 66, y: 116, label: "Workday Enterprise" },
    { x: 234, y: 34, label: "Dice Tech Talent" },
    { x: 234, y: 116, label: "Handshake Network" },
  ];

  const path = (i: number) => {
    const t = tiles[i];
    const dir = t.x < 150 ? -1 : 1;
    return "M" + (150 + dir * 18) + ",75 H" + (150 + dir * 42) + " V" + t.y + " H" + (t.x - dir * 16);
  };

  return (
    <div className="ib-frame ib-frame-hover">
      <Brackets />
      <div className="ib-card ib-card-3d">
        <div className="ib-card-pill">
          <span className="ib-pill-dot" />
          <span>MULTI-PORTAL SYNCHRONIZATION</span>
        </div>

        <svg className="ib-diagram" viewBox="0 0 300 150" role="group" aria-label="Recruitment Ecosystem Integrations">
          {tiles.map((_, i) => (
            <path key={i} d={path(i)} className={"ib-flow" + (on === i ? " ib-flow-on" : "")} />
          ))}

          {!reduced && on >= 0 && (
            <circle key={on} r="2.8" className="ib-pkt" fill="#FF7A59">
              <animateMotion dur="1s" repeatCount="indefinite" path={path(on)} />
            </circle>
          )}

          {/* Central Hub Node */}
          <g transform="translate(132,57)">
            <rect
              width="36"
              height="36"
              rx="8"
              fill="#18191e"
              stroke="#E84320"
              strokeWidth="1.2"
              style={{ filter: "drop-shadow(0 6px 14px rgba(232,67,32,0.25))" }}
            />
            <g transform="translate(9,9)">
              <ApplyZaMark size={18} />
            </g>
          </g>

          {/* Platform Tiles */}
          {tiles.map((t, i) => (
            <g
              key={i}
              className={"ib-tool" + (on === i ? " ib-tool-on" : "")}
              tabIndex={0}
              role="img"
              aria-label={t.label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
            >
              <rect
                x={t.x - 17}
                y={t.y - 17}
                width="34"
                height="34"
                rx="8"
                fill="#16171b"
                stroke={on === i ? "#E84320" : "rgba(255,255,255,0.1)"}
                strokeWidth={on === i ? "1.5" : "1"}
              />
              <g transform={"translate(" + t.x + "," + t.y + ")"}>
                <PlatformGlyph index={i} />
              </g>
              <text
                x={t.x}
                y={t.y + (t.y < 75 ? -23 : 30)}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="600"
                fill={on === i ? "#FF7A59" : "var(--ib-muted)"}
                fontFamily="var(--ib-sans)"
                opacity={on === i ? 1 : 0.8}
              >
                {copy.tools[i] ?? ""}
              </text>
            </g>
          ))}

          <text x="150" y="114" textAnchor="middle" fontSize="7.5" fill="#A1A1AA" fontFamily="var(--ib-mono)">
            {on >= 0 ? "STREAMING TO " + (copy.tools[on] ?? "").toUpperCase() : "4 ENTERPRISE HUBS CONNECTED"}
          </text>
        </svg>

        <div style={{ marginTop: "auto" }}>
          <h3>{copy.title}</h3>
          <p>{copy.description}</p>
        </div>
      </div>
    </div>
  );
}

function InsightsCard({ copy, uid, reduced }: { copy: InkFeatures["insights"]; uid: string; reduced: boolean }) {
  const [ref, inView] = useInView(0.3);
  const [hover, setHover] = React.useState(-1);
  const W = 300;
  const H = 130;
  const vals = copy.values.length > 1 ? copy.values : [1, 2];
  const { line, area, points } = chartPaths(vals, W, H, 14);
  const split = clamp(copy.forecastFrom, 1, vals.length - 1);
  const fill = uid + "area";
  const last = points[points.length - 1];
  const i = hover >= 0 ? hover : points.length - 1;
  const p = points[i];
  const pct = Math.round(((vals[i] - vals[0]) / (vals[0] || 1)) * 100);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHover(nearestIndex(points.map((q) => q[0]), ((e.clientX - r.left) / r.width) * W));
  };

  return (
    <div className="ib-frame ib-frame-hover" ref={ref as never} data-in={inView}>
      <Brackets />
      <div className="ib-card ib-card-3d">
        <div className="ib-card-pill">
          <span className="ib-pill-dot" />
          <span>PROPRIETARY OUTCOME TRAJECTORY</span>
        </div>

        <svg
          className="ib-diagram ib-chart"
          viewBox={"0 0 " + W + " " + (H + 6)}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(-1)}
          role="img"
          aria-label={copy.title + " chart"}
        >
          <defs>
            <linearGradient id={fill} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E84320" stopOpacity=".32" />
              <stop offset="1" stopColor="#E84320" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="14" x2={W - 14} y1={H * g} y2={H * g} stroke="rgba(255,255,255,0.06)" />
          ))}

          {/* Shaded Area */}
          <path d={area} fill={"url(#" + fill + ")"} />

          {/* Trajectory Stroke */}
          <path d={line} fill="none" stroke="#FF7A59" strokeWidth="2.2" pathLength={1} className="ib-line-draw" />

          {/* Forecast Split Line */}
          <line
            x1={points[split][0]}
            x2={points[split][0]}
            y1="10"
            y2={H - 14}
            stroke="#E84320"
            strokeDasharray="2 3"
            strokeOpacity="0.8"
          />
          <text x={points[split][0] - 6} y={H - 18} textAnchor="end" fontSize="7" fill="#FF7A59" fontWeight="600" fontFamily="var(--ib-mono)">
            APPLYZA CALIBRATION
          </text>

          {/* Hover tracker */}
          {hover >= 0 && <line x1={p[0]} x2={p[0]} y1="8" y2={H - 14} stroke="#FFFFFF" strokeOpacity=".4" />}
          {!reduced && hover < 0 && <circle cx={last[0]} cy={last[1]} r="8" fill="#E84320" opacity=".25" className="ib-glow" />}

          {/* Active Data Point */}
          <circle cx={p[0]} cy={p[1]} r="3.6" fill="#FF7A59" stroke="#FFFFFF" strokeWidth="1.8" />

          {/* Interactive Tooltip Card */}
          <g transform={"translate(" + clamp(p[0], 45, W - 45) + "," + (p[1] < 34 ? p[1] + 24 : p[1] - 14) + ")"}>
            <rect x="-34" y="-12" width="68" height="17" rx="4" fill="#141518" stroke="#E84320" strokeWidth="0.8" />
            <text x="0" y="0" textAnchor="middle" fontSize="8" fill="#FFFFFF" fontWeight="600" fontFamily="var(--ib-mono)">
              {(i >= split ? "PROJ: " : "WK " + (i + 1) + ": ") + (pct >= 0 ? "+" : "") + pct + "% INTV"}
            </text>
          </g>
        </svg>

        <div style={{ marginTop: "auto" }}>
          <h3>{copy.title}</h3>
          <p>{copy.description}</p>
        </div>
      </div>
    </div>
  );
}

const IB_CSS = `
.ib-root {
  --ib-page: #080809;
  --ib-hatch: rgba(255,255,255,.025);
  --ib-paper: #0e0e11;
  --ib-card: #131418;
  --ib-raise: #1a1b22;
  --ib-ink: #f5f5f7;
  --ib-soft: #d1d1d6;
  --ib-muted: #9c9ca4;
  --ib-faint: #636366;
  --ib-line: rgba(255,255,255,0.08);
  --ib-line-strong: rgba(255,255,255,0.16);
  --ib-bracket: rgba(232,67,32,0.4);
  --ib-inv: #ffffff;
  --ib-inv-ink: #0a0a0c;
  --ib-shadow: 0 4px 20px rgba(0,0,0,0.5), 0 20px 50px -20px rgba(232,67,32,0.12);
  --ib-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --ib-mono: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--ib-page);
  background-image: repeating-linear-gradient(135deg, var(--ib-hatch) 0 1px, transparent 1px 12px);
  color: var(--ib-ink);
  font-family: var(--ib-sans);
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  padding: 32px clamp(12px, 3vw, 36px);
  transition: background-color .45s ease, color .45s ease;
}

.ib-root :where(*) { box-sizing: border-box; }
.ib-root :focus-visible { outline: 2px solid #E84320; outline-offset: 2px; }
.ib-root :where(svg) { display: block; max-width: none; flex: none; }
.ib-root :where(h2,h3,p) { margin: 0; padding: 0; font-size: inherit; font-weight: inherit; }

.ib-shell { width: 100%; max-width: 1200px; margin: 0 auto; container-type: inline-size; }

.ib-sec {
  position: relative;
  background: radial-gradient(100% 100% at 50% 0%, #15161c 0%, #0c0d10 100%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: clamp(40px, 6cqw, 72px) clamp(20px, 5cqw, 56px);
  box-shadow: 0 30px 80px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
  overflow: hidden;
}

.ib-glow-spot {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 280px;
  background: radial-gradient(circle, rgba(232,67,32,0.18) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}

.ib-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
}
.ib-reveal[data-in="true"] { opacity: 1; transform: none; }

.ib-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  margin-bottom: clamp(32px, 5cqw, 56px);
}

.ib-tag-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(232,67,32,0.08);
  border: 1px solid rgba(232,67,32,0.3);
  box-shadow: 0 0 20px rgba(232,67,32,0.15);
}
.ib-tag-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #E84320;
  box-shadow: 0 0 8px #E84320;
}
.ib-tag {
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-weight: 700;
  color: #FF8C66;
  font-family: var(--ib-mono);
}

.ib-h2 {
  font-size: clamp(30px, 4.6cqw, 48px);
  line-height: 1.15;
  letter-spacing: -.025em;
  font-weight: 700;
  color: #FFFFFF;
}
.ib-title-line { display: block; }
.ib-brand-gradient {
  background: linear-gradient(135deg, #FFFFFF 0%, #FF8C66 60%, #E84320 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ib-subtitle {
  font-size: clamp(14px, 1.8cqw, 16.5px);
  color: var(--ib-muted);
  max-width: 58ch;
  line-height: 1.6;
}

.ib-frame { position: relative; }
.ib-c {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: var(--ib-bracket);
  border-style: solid;
  border-width: 0;
  pointer-events: none;
  transition: border-color .3s, transform .35s cubic-bezier(.16,1,.3,1);
}
.ib-c-tl { top: -6px; left: -6px; border-top-width: 2px; border-left-width: 2px; }
.ib-c-tr { top: -6px; right: -6px; border-top-width: 2px; border-right-width: 2px; }
.ib-c-bl { bottom: -6px; left: -6px; border-bottom-width: 2px; border-left-width: 2px; }
.ib-c-br { bottom: -6px; right: -6px; border-bottom-width: 2px; border-right-width: 2px; }

.ib-frame-hover:hover > .ib-c { border-color: #FF7A59; }
.ib-frame-hover:hover > .ib-c-tl { transform: translate(-4px, -4px); }
.ib-frame-hover:hover > .ib-c-tr { transform: translate(4px, -4px); }
.ib-frame-hover:hover > .ib-c-bl { transform: translate(-4px, 4px); }
.ib-frame-hover:hover > .ib-c-br { transform: translate(4px, 4px); }

.ib-bento {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(20px, 3cqw, 32px);
}
@container (min-width: 760px) {
  .ib-bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ib-wide { grid-column: 1 / -1; width: min(100%, 880px); justify-self: center; }
}

.ib-card {
  background: linear-gradient(180deg, #181920 0%, #111216 100%);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 16px;
  padding: clamp(18px, 2.5cqw, 28px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.6);
  transition: border-color .35s, box-shadow .35s, transform .35s cubic-bezier(.16,1,.3,1);
}
.ib-card-3d:hover {
  border-color: rgba(232,67,32,0.45);
  box-shadow: 0 20px 50px -15px rgba(232,67,32,0.22), 0 0 0 1px rgba(232,67,32,0.2);
  transform: translateY(-3px);
}

.ib-card-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--ib-mono);
  font-size: 10px;
  letter-spacing: .08em;
  font-weight: 700;
  color: #FF8C66;
  background: rgba(232,67,32,0.06);
  border: 1px solid rgba(232,67,32,0.2);
  padding: 4px 10px;
  border-radius: 6px;
  align-self: flex-start;
}
.ib-pill-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #E84320;
}

.ib-card h3 {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -.01em;
  color: #FFFFFF;
}
.ib-card p {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ib-muted);
  max-width: 48ch;
}

.ib-flow-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  background: #121317;
}
.ib-flow-title { display: flex; align-items: center; gap: 8px; }
.ib-live-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: ib-pulse 2s infinite;
}
.ib-flow-label {
  font-family: var(--ib-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  color: #E4E4E7;
}
.ib-flow-meta {
  font-family: var(--ib-mono);
  font-size: 9.5px;
  color: #71717A;
}

.ib-diagram { width: 100%; height: auto; overflow: visible; }
.ib-wide-copy {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 4px 22px 22px;
}
@container (min-width: 600px) {
  .ib-wide-copy { grid-template-columns: 1fr 1fr; }
  .ib-wide-copy > div:last-child { justify-self: end; text-align: left; }
}

.ib-flow {
  stroke: rgba(255,255,255,0.15);
  fill: none;
  stroke-width: 1.4;
  transition: stroke .3s;
}
.ib-flow-on { stroke: #E84320; }
.ib-dash { stroke-dasharray: 3 4; animation: ib-dash 1.2s linear infinite; }
.ib-pkt { filter: drop-shadow(0 0 6px #E84320); }

.ib-node {
  fill: #191a20;
  stroke: rgba(255,255,255,0.16);
  transition: stroke .3s, transform .3s;
}
.ib-node-highlight {
  stroke: #E84320;
  fill: #16171b;
}

.ib-av {
  cursor: pointer;
  transition: transform .35s cubic-bezier(.16,1,.3,1);
  transform-box: fill-box;
  transform-origin: center;
}
.ib-av:hover, .ib-av:focus-visible { transform: scale(1.25); }
.ib-av-tip { opacity: 0; transition: opacity .2s; pointer-events: none; }
.ib-av:hover .ib-av-tip, .ib-av:focus .ib-av-tip { opacity: 1; }

.ib-presence {
  animation: ib-pulse 2.2s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

.ib-sheet { transition: transform .7s cubic-bezier(.16,1,.3,1), opacity .7s; }
.ib-sheet-new { animation: ib-sheet-in .7s cubic-bezier(.16,1,.3,1) both; }

.ib-tool {
  cursor: pointer;
  transition: transform .3s cubic-bezier(.16,1,.3,1);
  transform-box: fill-box;
  transform-origin: center;
}
.ib-tool:hover, .ib-tool-on { transform: translateY(-3px); }

.ib-chart { cursor: crosshair; }
.ib-line-draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1);
}
[data-in="true"] .ib-line-draw { stroke-dashoffset: 0; }

.ib-glow {
  animation: ib-pulse 2s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

.ib-credibility-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  margin-top: clamp(32px, 4.5cqw, 48px);
  padding: 18px 24px;
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
}
.ib-cred-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 3px;
}
.ib-cred-val {
  font-family: var(--ib-sans);
  font-weight: 800;
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: -.02em;
}
.ib-cred-label {
  font-size: 11px;
  color: var(--ib-muted);
  font-family: var(--ib-mono);
  letter-spacing: .04em;
  text-transform: uppercase;
}
.ib-cred-sep {
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.08);
  display: none;
}
@media (min-width: 640px) {
  .ib-cred-sep { display: block; }
}

@keyframes ib-dash { to { stroke-dashoffset: -14; } }
@keyframes ib-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .45; transform: scale(1.35); }
}
@keyframes ib-sheet-in {
  from { opacity: 0; transform: translate(14px, -10px) rotate(4deg); }
  to { opacity: 1; transform: none; }
}

.ib-bento > .ib-frame { display: flex; flex-direction: column; }
.ib-bento > .ib-frame > .ib-card { flex: 1; }

@media (prefers-reduced-motion: reduce) {
  .ib-reveal { opacity: 1; transform: none; transition: none; }
  .ib-dash, .ib-presence, .ib-glow, .ib-sheet-new { animation: none; }
  .ib-line-draw { transition: none; stroke-dashoffset: 0; }
}
`;
