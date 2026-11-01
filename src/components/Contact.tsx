import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Check, ShieldCheck, Clock, Copy, Send } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, WhatsappIcon, MailIcon } from './SocialIcons';

// Central ApplyZa Logo mark - pristine and clean
function CentralApplyZaMark({ size = 52 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ApplyZa core mark"
      role="img"
      className="filter drop-shadow-[0_0_20px_rgba(232,67,32,0.65)]"
    >
      {/* White A letter form */}
      <path
        d="M12 60 L32 16 L40 16 L52 44"
        stroke="white"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 42 L46 42"
        stroke="white"
        strokeWidth="8.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Upward-right brand orange arrow */}
      <path
        d="M40 60 L62 22"
        stroke="#E84320"
        strokeWidth="8.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M62 22 L48 24 M62 22 L60 36"
        stroke="#E84320"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

type ChannelKey = 'whatsapp' | 'instagram' | 'linkedin' | 'email';

interface ChannelInfo {
  key: ChannelKey;
  name: string;
  badge: string;
  handle: string;
  description: string;
  actionText: string;
  url: string;
  isExternal: boolean;
  accentColor: string;
  glowColor: string;
}

const CHANNELS: Record<ChannelKey, ChannelInfo> = {
  whatsapp: {
    key: 'whatsapp',
    name: 'WhatsApp',
    badge: 'DIRECT STRATEGY DESK',
    handle: '+1 (US) Direct Advisory',
    description: 'Direct 1-on-1 strategy channel with our senior US recruitment specialists. Share your current resume and target roles for immediate advice.',
    actionText: 'Message on WhatsApp',
    url: 'https://wa.me/message/APPLYZA',
    isExternal: true,
    accentColor: '#25D366',
    glowColor: 'rgba(37, 211, 102, 0.35)',
  },
  instagram: {
    key: 'instagram',
    name: 'Instagram',
    badge: 'DIRECT CANDIDATE DM',
    handle: '@applyza',
    description: 'Direct message our candidate representation desk. Inquire about active searches, visa timelines, and custom placement programs.',
    actionText: 'Message @applyza on Instagram',
    url: 'https://instagram.com/applyza',
    isExternal: true,
    accentColor: '#E84320',
    glowColor: 'rgba(232, 67, 32, 0.35)',
  },
  linkedin: {
    key: 'linkedin',
    name: 'LinkedIn',
    badge: 'CORPORATE HIRING NETWORK',
    handle: 'linkedin.com/company/applyzaofficial',
    description: 'Connect with our corporate recruiters and executive talent advisors across premier US tech, finance, and engineering networks.',
    actionText: 'Connect on LinkedIn',
    url: 'https://linkedin.com/company/applyzaofficial',
    isExternal: true,
    accentColor: '#0077b5',
    glowColor: 'rgba(0, 119, 181, 0.35)',
  },
  email: {
    key: 'email',
    name: 'Email',
    badge: 'DOSSIER & RESUME AUDIT',
    handle: 'contact@applyza.com',
    description: 'Submit your resume, portfolio, and target compensation parameters for a comprehensive, confidential search evaluation.',
    actionText: 'Email Resume to ApplyZa',
    url: 'mailto:contact@applyza.com?subject=ApplyZa%20Candidate%20Representation%20Inquiry',
    isExternal: false,
    accentColor: '#FF9F7A',
    glowColor: 'rgba(255, 159, 122, 0.35)',
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  angle?: number;
  speed?: number;
  radiusA?: number;
  radiusB?: number;
  tilt?: number;
  wobble?: number;
}

interface TrailPoint {
  x: number;
  y: number;
}

interface NodePos {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active expanded channel
  const [activeChannel, setActiveChannel] = useState<ChannelKey>('whatsapp');
  const [hoveredChannel, setHoveredChannel] = useState<ChannelKey | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Mouse coords inside orb
  const mouseRef = useRef({ x: 0, y: 0, rawX: 0, rawY: 0, isHovering: false });
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  // 4 Orbit Node positions
  const [nodePositions, setNodePositions] = useState<Record<ChannelKey, NodePos>>({
    whatsapp: { x: 0, y: 0, z: 1, scale: 1, opacity: 1 },
    instagram: { x: 0, y: 0, z: 1, scale: 1, opacity: 1 },
    linkedin: { x: 0, y: 0, z: 1, scale: 1, opacity: 1 },
    email: { x: 0, y: 0, z: 1, scale: 1, opacity: 1 },
  });

  const thetasRef = useRef<Record<ChannelKey, number>>({
    whatsapp: 0,
    instagram: Math.PI * 0.5,
    linkedin: Math.PI * 1.0,
    email: Math.PI * 1.5,
  });

  const speedsRef = useRef<Record<ChannelKey, number>>({
    whatsapp: 0.22,
    instagram: 0.18,
    linkedin: 0.14,
    email: 0.11,
  });

  const trailsRef = useRef<Record<ChannelKey, TrailPoint[]>>({
    whatsapp: [],
    instagram: [],
    linkedin: [],
    email: [],
  });

  const inViewRef = useRef(true);

  // Canvas Particle & Orbit Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = orbContainerRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = stage.clientWidth);
    let height = (canvas.height = stage.clientHeight);

    const handleResize = () => {
      if (!stage || !canvas) return;
      width = canvas.width = stage.clientWidth;
      height = canvas.height = stage.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(stage);

    // Stream particles along orbits (48 particles)
    const particles: Particle[] = [];
    const colors = ['#E84320', '#25D366', '#0077b5', '#FF9F7A', '#FFFFFF'];

    for (let i = 0; i < 48; i++) {
      const tier = i % 4;
      let radiusA = 115;
      let radiusB = 50;
      let tilt = -0.32;

      if (tier === 1) {
        radiusA = 155;
        radiusB = 66;
        tilt = 0.26;
      } else if (tier === 2) {
        radiusA = 195;
        radiusB = 82;
        tilt = -0.2;
      } else if (tier === 3) {
        radiusA = 235;
        radiusB = 98;
        tilt = 0.16;
      }

      particles.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0.8 + Math.random() * 1.5,
        alpha: 0.15 + Math.random() * 0.45,
        baseAlpha: 0.15 + Math.random() * 0.45,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: (0.0015 + Math.random() * 0.0024) * (tier % 2 === 0 ? 1 : -1),
        radiusA,
        radiusB,
        tilt,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    // Swarm particles (24 particles)
    const swarmParticles: Particle[] = [];
    for (let i = 0; i < 24; i++) {
      swarmParticles.push({
        x: width / 2 + (Math.random() - 0.5) * 320,
        y: height / 2 + (Math.random() - 0.5) * 280,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 0.8 + Math.random() * 1.4,
        alpha: 0.15 + Math.random() * 0.4,
        baseAlpha: 0.15 + Math.random() * 0.4,
        color: i % 2 === 0 ? '#E84320' : '#FFF0EB',
      });
    }

    let lastTime = performance.now();
    let breatheTime = 0;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!inViewRef.current) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      breatheTime += dt;

      // Mouse lerp
      const sm = smoothMouseRef.current;
      const m = mouseRef.current;
      sm.x += (m.x - sm.x) * 0.07;
      sm.y += (m.y - sm.y) * 0.07;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + sm.x * 14;
      const cy = height / 2 + sm.y * 10;
      const scale = Math.min(1.0, Math.max(0.68, width / 460));

      // 1. Central Orb Breathing Aura
      const breath = Math.sin(breatheTime * 1.5);
      const orbRadius = (135 + breath * 14) * scale;

      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius);
      coreGlow.addColorStop(0, 'rgba(232, 67, 32, 0.22)');
      coreGlow.addColorStop(0.4, 'rgba(255, 107, 71, 0.09)');
      coreGlow.addColorStop(0.75, 'rgba(232, 67, 32, 0.02)');
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, orbRadius, 0, Math.PI * 2);
      ctx.fill();

      // Mouse interactive aura
      if (m.isHovering) {
        const mouseAura = ctx.createRadialGradient(
          m.rawX,
          m.rawY,
          0,
          m.rawX,
          m.rawY,
          90 * scale
        );
        mouseAura.addColorStop(0, 'rgba(232, 67, 32, 0.12)');
        mouseAura.addColorStop(0.5, 'rgba(255, 122, 89, 0.03)');
        mouseAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseAura;
        ctx.beginPath();
        ctx.arc(m.rawX, m.rawY, 90 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Orbits Configuration
      const orbitConfigs: Record<ChannelKey, { a: number; b: number; phi: number; color: string }> = {
        whatsapp: { a: 112 * scale, b: 49 * scale, phi: -0.32, color: 'rgba(37, 211, 102, 0.35)' },
        instagram: { a: 152 * scale, b: 65 * scale, phi: 0.26, color: 'rgba(232, 67, 32, 0.35)' },
        linkedin: { a: 192 * scale, b: 81 * scale, phi: -0.2, color: 'rgba(0, 119, 181, 0.35)' },
        email: { a: 232 * scale, b: 97 * scale, phi: 0.16, color: 'rgba(255, 159, 122, 0.35)' },
      };

      // Draw Orbit Guide Rings
      Object.keys(orbitConfigs).forEach((k) => {
        const key = k as ChannelKey;
        const cfg = orbitConfigs[key];
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(cfg.phi);
        ctx.beginPath();
        ctx.ellipse(0, 0, cfg.a, cfg.b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = activeChannel === key ? cfg.color : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = activeChannel === key ? 1.5 : 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.restore();
      });

      // Update Node positions & Trails
      const nextPositions: Record<ChannelKey, NodePos> = { ...nodePositions };

      (Object.keys(orbitConfigs) as ChannelKey[]).forEach((key) => {
        const cfg = orbitConfigs[key];
        const isHovered = hoveredChannel === key;
        const isSelected = activeChannel === key;

        const targetSpeed = isHovered || isSelected ? 0.03 : speedsRef.current[key];
        thetasRef.current[key] += targetSpeed * dt;

        const th = thetasRef.current[key];
        const ux = cfg.a * Math.cos(th);
        const uy = cfg.b * Math.sin(th);
        const nx = cx + (ux * Math.cos(cfg.phi) - uy * Math.sin(cfg.phi));
        const ny = cy + (ux * Math.sin(cfg.phi) + uy * Math.cos(cfg.phi));
        const nz = Math.sin(th);

        const nScale = nz > 0 ? 1.0 + nz * 0.14 : 0.85 + (nz + 1) * 0.15;
        const nOp = nz > 0 ? 1.0 : 0.7 + (nz + 1) * 0.2;

        nextPositions[key] = { x: nx, y: ny, z: nz, scale: nScale, opacity: nOp };

        // Trails
        const trail = trailsRef.current[key];
        trail.unshift({ x: nx, y: ny });
        if (trail.length > 15) trail.pop();

        if (trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          for (let i = 1; i < trail.length; i++) {
            ctx.lineTo(trail[i].x, trail[i].y);
          }
          ctx.strokeStyle = cfg.color;
          ctx.lineWidth = 2 * scale;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      });

      // 3. Render Stream Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle = (p.angle || 0) + (p.speed || 0.002);
        p.wobble = (p.wobble || 0) + 0.02;

        const effectiveA = (p.radiusA || 150) * scale;
        const effectiveB = (p.radiusB || 65) * scale + Math.sin(p.wobble) * 2.5;
        const tilt = p.tilt || 0;

        const ux = effectiveA * Math.cos(p.angle);
        const uy = effectiveB * Math.sin(p.angle);

        p.x = cx + (ux * Math.cos(tilt) - uy * Math.sin(tilt));
        p.y = cy + (ux * Math.sin(tilt) + uy * Math.cos(tilt));

        const depth = Math.sin(p.angle);
        const currentAlpha = p.baseAlpha * (0.6 + (depth + 1) * 0.2);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 4. Render Swarm Stardust
      for (let i = 0; i < swarmParticles.length; i++) {
        const sp = swarmParticles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;

        if (m.isHovering) {
          const dx = m.rawX - sp.x;
          const dy = m.rawY - sp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160 && dist > 10) {
            const force = (160 - dist) / 160;
            sp.vx += (dx / dist) * force * 0.15 - (dy / dist) * force * 0.08;
            sp.vy += (dy / dist) * force * 0.15 + (dx / dist) * force * 0.08;
          }
        }

        sp.vx *= 0.94;
        sp.vy *= 0.94;

        if (sp.x < 0) sp.x = width;
        if (sp.x > width) sp.x = 0;
        if (sp.y < 0) sp.y = height;
        if (sp.y > height) sp.y = 0;

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      setNodePositions(nextPositions);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleOrbMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbContainerRef.current) return;
    const rect = orbContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = {
      x: (x / rect.width) * 2 - 1,
      y: (y / rect.height) * 2 - 1,
      rawX: x,
      rawY: y,
      isHovering: true,
    };
  };

  const handleOrbMouseLeave = () => {
    mouseRef.current.isHovering = false;
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
    setHoveredChannel(null);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-[#060609] text-white py-16 md:py-24 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Ambient background atmosphere */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#E84320]/[0.05] rounded-full blur-[180px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[450px] bg-[#25D366]/[0.025] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================= */}
        {/* UNIFIED PROFESSIONAL CONTACT TERMINAL */}
        {/* ============================================================= */}
        <div
          ref={containerRef}
          className="relative w-full rounded-3xl md:rounded-[2.5rem] bg-gradient-to-b from-[#0B0B11]/95 via-[#08080E]/95 to-[#0A0A10]/95 border border-white/[0.09] shadow-[0_30px_100px_rgba(0,0,0,0.85)] p-6 sm:p-10 lg:p-12 select-none overflow-hidden"
        >
          {/* Subtle Ambient Grid */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-35"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ----------------------------------------------------------- */}
            {/* LEFT SIDE: Professional Executive Content & Accordion Deck */}
            {/* ----------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Display Serif Heading - Clean, no pill badge above */}
              <h2
                id="contact-heading"
                className="display-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] mb-4"
              >
                Let's talk about your <br />
                <span className="italic font-light text-zinc-300">next career move.</span>
              </h2>

              {/* Clean, professional description */}
              <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed mb-6 max-w-xl">
                Tell us about your background, the roles you're targeting, and your US job-search goals. No obligations required — our recruitment specialists review your candidate profile within 24 hours.
              </p>

              {/* ========================================================= */}
              {/* UNIFIED SINGLE CONTACT CARD WITH 4 OPTIONS IN ONE LINE    */}
              {/* ========================================================= */}
              {(() => {
                const activeCh = CHANNELS[activeChannel];
                return (
                  <div
                    className="relative rounded-2xl sm:rounded-3xl bg-[#0C0C14]/90 border border-white/[0.08] p-5 sm:p-7 mb-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden transition-all duration-300"
                    style={{
                      boxShadow: `0 24px 60px -20px ${activeCh.glowColor}, 0 0 0 1px rgba(255,255,255,0.06)`,
                    }}
                  >
                    {/* Subtle top specular highlight */}
                    <div
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Soft radial glow reflecting channel accent */}
                    <div
                      className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-15"
                      style={{ backgroundColor: activeCh.accentColor }}
                      aria-hidden="true"
                    />

                    {/* 4 Options Segmented Bar in ONE SINGLE LINE */}
                    <div
                      className="grid grid-cols-4 gap-1 sm:gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-5 relative"
                      role="tablist"
                      aria-label="Direct contact options"
                    >
                      {(Object.keys(CHANNELS) as ChannelKey[]).map((key) => {
                        const ch = CHANNELS[key];
                        const isSelected = activeChannel === key;

                        return (
                          <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setActiveChannel(key)}
                            onMouseEnter={() => setHoveredChannel(key)}
                            onMouseLeave={() => setHoveredChannel(null)}
                            className={`relative flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-2.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer select-none ${
                              isSelected
                                ? 'text-white font-semibold'
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId="activeTabPill"
                                className="absolute inset-0 rounded-lg bg-[#181824] border border-white/15"
                                style={{
                                  boxShadow: `0 2px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`,
                                }}
                                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                              />
                            )}
                            <span
                              className="relative z-10 flex-shrink-0 flex items-center justify-center transition-colors"
                              style={{ color: isSelected ? ch.accentColor : 'inherit' }}
                            >
                              {key === 'whatsapp' && <WhatsappIcon size={16} color="currentColor" />}
                              {key === 'instagram' && <InstagramIcon size={16} color="currentColor" />}
                              {key === 'linkedin' && <LinkedinIcon size={16} color="currentColor" />}
                              {key === 'email' && <MailIcon size={16} color="currentColor" />}
                            </span>
                            <span className="relative z-10 truncate text-[11px] sm:text-xs md:text-[13px]">
                              {ch.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Option Content Area */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeChannel}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="flex flex-col gap-4"
                      >
                        {/* Channel Header Meta Row */}
                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                              style={{ backgroundColor: activeCh.accentColor }}
                            />
                            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 truncate">
                              {activeCh.badge}
                            </span>
                          </div>

                          {/* Copyable Handle Pill */}
                          <button
                            type="button"
                            onClick={() => copyToClipboard(activeCh.handle, activeCh.key)}
                            className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer max-w-[210px] sm:max-w-none"
                            title="Click to copy handle"
                          >
                            <span className="truncate">{activeCh.handle}</span>
                            {copiedKey === activeCh.key ? (
                              <Check size={12} className="text-emerald-400 flex-shrink-0" />
                            ) : (
                              <Copy size={12} className="text-zinc-500 group-hover:text-zinc-300 flex-shrink-0" />
                            )}
                          </button>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed min-h-[42px]">
                          {activeCh.description}
                        </p>

                        {/* Action Buttons: Primary CTA + Quick Copy */}
                        <div className="flex items-center gap-2.5 pt-1">
                          <a
                            href={activeCh.url}
                            id={`cta-${activeCh.key}-btn`}
                            target={activeCh.isExternal ? '_blank' : undefined}
                            rel={activeCh.isExternal ? 'noopener noreferrer' : undefined}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm text-white tracking-wide transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer"
                            style={{
                              backgroundColor: activeCh.accentColor,
                              boxShadow: `0 4px 18px ${activeCh.glowColor}`,
                            }}
                          >
                            <span>{activeCh.actionText}</span>
                            {activeCh.isExternal ? <ExternalLink size={14} /> : <Send size={14} />}
                          </a>

                          <button
                            type="button"
                            onClick={() => copyToClipboard(activeCh.handle, activeCh.key)}
                            className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.08] text-xs sm:text-sm font-sans flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
                            title="Copy handle"
                          >
                            {copiedKey === activeCh.key ? (
                              <>
                                <Check size={14} className="text-emerald-400" />
                                <span className="text-emerald-400 font-medium">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                );
              })()}

              {/* Reassurance Strip */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 font-sans pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[#FF7A59]" />
                  <span>Response Time &lt; 24h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>100% Confidential Candidate Review</span>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------- */}
            {/* RIGHT SIDE: Seamlessly Integrated Clean Orb (No dots) */}
            {/* ----------------------------------------------------------- */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div
                ref={orbContainerRef}
                onMouseMove={handleOrbMouseMove}
                onMouseLeave={handleOrbMouseLeave}
                className="relative w-full max-w-[480px] h-[460px] sm:h-[500px] flex items-center justify-center select-none"
              >
                {/* Seamless Canvas Engine (Blends directly into container background) */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                />

                {/* Central ApplyZa Brand Logo Anchor (Pristine, no extra dots) */}
                <div
                  onMouseEnter={() => setLogoHovered(true)}
                  onMouseLeave={() => setLogoHovered(false)}
                  style={{
                    transform: `perspective(800px) rotateX(${-mouseRef.current.y * 8}deg) rotateY(${mouseRef.current.x * 8}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="relative z-20 flex flex-col items-center justify-center cursor-default group"
                >
                  {/* Subtle Glowing Aura */}
                  <div
                    className={`absolute -inset-8 rounded-full transition-all duration-700 pointer-events-none ${
                      logoHovered
                        ? 'bg-[#E84320]/28 blur-2xl scale-120'
                        : 'bg-[#E84320]/14 blur-xl scale-100 animate-pulse'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Clean Glass Disc Housing Logo */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#1C1C26]/90 to-[#0A0A10]/95 border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.25)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 group-hover:border-[#E84320]/60 group-hover:shadow-[0_0_45px_rgba(232,67,32,0.45)]">
                    {/* Delicate spinning outer perimeter */}
                    <div
                      className="absolute inset-1 rounded-full border border-dashed border-white/15 animate-[spin_24s_linear_infinite]"
                      aria-hidden="true"
                    />

                    {/* Clean ApplyZa Logo Mark */}
                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                      <CentralApplyZaMark size={52} />
                    </div>
                  </div>

                  {/* Clean brand label - no dots */}
                  <div className="mt-3">
                    <span className="font-sans font-bold tracking-tight text-white text-base">
                      Apply<span className="text-[#E84320]">Za</span>
                    </span>
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* 4 Orbiting Channel Nodes (Clean, no corner dots) */}
                {/* --------------------------------------------------------- */}
                {(Object.keys(CHANNELS) as ChannelKey[]).map((key) => {
                  const pos = nodePositions[key];
                  if (!pos || pos.x <= 0) return null;

                  const ch = CHANNELS[key];
                  const isSelected = activeChannel === key;
                  const isHovered = hoveredChannel === key;

                  return (
                    <div
                      key={key}
                      style={{
                        position: 'absolute',
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        transform: `translate(-50%, -50%) scale(${pos.scale * (isHovered || isSelected ? 1.15 : 1)})`,
                        opacity: pos.opacity,
                        zIndex: pos.z > 0 ? 30 : 15,
                        transition: 'transform 0.15s ease-out, opacity 0.2s ease',
                      }}
                      onMouseEnter={() => setHoveredChannel(key)}
                      onMouseLeave={() => setHoveredChannel(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveChannel(key);
                      }}
                      className="group cursor-pointer flex flex-col items-center pointer-events-auto"
                    >
                      {/* Clean glass node icon - no dots */}
                      <div
                        className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isSelected || isHovered ? ch.accentColor : '#12121A',
                          border: `1.5px solid ${isSelected || isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.2)'}`,
                          boxShadow: isSelected || isHovered ? `0 0 25px ${ch.glowColor}` : '0 6px 18px rgba(0,0,0,0.6)',
                          color: isSelected || isHovered ? '#FFFFFF' : ch.accentColor,
                        }}
                      >
                        {key === 'whatsapp' && <WhatsappIcon size={18} color="currentColor" />}
                        {key === 'instagram' && <InstagramIcon size={18} color="currentColor" />}
                        {key === 'linkedin' && <LinkedinIcon size={18} color="currentColor" />}
                        {key === 'email' && <MailIcon size={18} color="currentColor" />}
                      </div>

                      {/* Tooltip Label */}
                      <div
                        className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider backdrop-blur-md border transition-all duration-300 flex items-center gap-1 whitespace-nowrap ${
                          isSelected || isHovered
                            ? 'opacity-100 translate-y-0 bg-[#0E0E16]/95 text-white border-white/20 shadow-md'
                            : 'opacity-0 -translate-y-1 bg-black/60 text-zinc-400 border-white/10 group-hover:opacity-100 group-hover:translate-y-0'
                        }`}
                      >
                        <span className="font-semibold">{ch.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
