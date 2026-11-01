import { ArrowRight, ChevronDown } from 'lucide-react';
import InkBackground from '@/components/ui/ink-background';

export function Hero() {
  const handleScrollDown = () => {
    const about = document.querySelector('#about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#080809] overflow-hidden"
    >
      {/* Interactive WebGL Liquid Ink Simulation Header */}
      <InkBackground
        text="APPLYZA"
        accent="#E84320"
        interactive={true}
        className="min-h-[100svh] w-full flex flex-col justify-center items-center relative"
      >
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-4 pt-4 pb-20 pointer-events-auto">
          {/* Subheading Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-[1.2] mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Your next career move deserves a{' '}
            <span className="bg-gradient-to-r from-white via-[#FF8C66] to-[#E84320] bg-clip-text text-transparent">
              smarter strategy.
            </span>
          </h1>

          {/* Value Prop Description */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl leading-relaxed mb-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            From finding curated opportunities to personalized interview preparation,
            ApplyZa brings structure, precision, and confidence to your US job search.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-7">
            <a
              href="#contact"
              id="hero-primary-cta"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E84320] to-[#FF6B47] text-white font-semibold text-sm shadow-[0_4px_25px_rgba(232,67,32,0.4)] hover:shadow-[0_6px_35px_rgba(232,67,32,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <span>Let's Talk About Your Career</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="#services"
              id="hero-secondary-cta"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-sm border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-200"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </InkBackground>

      {/* Properly Arranged Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <button
          id="hero-scroll-indicator"
          aria-label="Scroll to About section"
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-[#E84320]/50 backdrop-blur-md shadow-lg shadow-black/50 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold font-mono text-zinc-400 group-hover:text-white transition-colors">
              SCROLL
            </span>
            <ChevronDown size={14} className="text-[#FF7A59] group-hover:translate-y-0.5 transition-transform duration-200" />
          </div>
        </button>
      </div>
    </section>
  );
}
