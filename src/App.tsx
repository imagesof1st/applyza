import './index.css';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { Process } from './components/Process';
import { WhoWeSupport } from './components/WhoWeSupport';
import { BrandPromise } from './components/BrandPromise';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  // Initialize scroll-reveal IntersectionObserver
  useScrollReveal();

  return (
    <>
      <a
        href="#hero"
        id="skip-to-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 9999,
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '1rem';
          e.currentTarget.style.top = '1rem';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.overflow = 'visible';
          e.currentTarget.style.backgroundColor = 'var(--color-brand)';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.padding = '0.5rem 1rem';
          e.currentTarget.style.borderRadius = '4px';
          e.currentTarget.style.fontWeight = '600';
          e.currentTarget.style.textDecoration = 'none';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
          e.currentTarget.style.width = '1px';
          e.currentTarget.style.height = '1px';
          e.currentTarget.style.overflow = 'hidden';
        }}
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <Hero />

        {/* Divider between hero and about */}
        <div className="section-divider" aria-hidden="true" />

        <About />
        <Services />

        <div className="section-divider" aria-hidden="true" />

        {/* Upgraded Live Interactive Intelligence Bento */}
        <FeaturesShowcase />

        <div className="section-divider" aria-hidden="true" />

        <Process />

        <div className="section-divider" aria-hidden="true" />

        <WhoWeSupport />
        <BrandPromise />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
