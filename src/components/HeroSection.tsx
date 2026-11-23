import React, { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { AgencyDrawers, StudioPanel } from './AgencyDrawers';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204103_f607742e-09da-4cf5-bb06-4e67b0a531de.mp4';

const NAV_ITEMS = [
  { label: 'Contexto', target: 'contexto' },
  { label: 'ITEM 1', target: 'item-1' },
  { label: 'ITEM 2', target: 'item-2' },
  { label: 'ITEM 3', target: 'item-3' },
  { label: 'ITEM 4', target: 'item-4' },
  { label: 'Conclusiones', target: 'conclusiones' },
];

export const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<StudioPanel>(null);
  const [isReelOpen, setIsReelOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleOpenPanel = (panel: StudioPanel) => {
    setIsMenuOpen(false);
    setActivePanel(panel);
  };

  return (
    <section className="relative w-full h-svh overflow-hidden bg-slate-50">
      {/* Fullscreen Looping Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-[center_70%]"
        src={HERO_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Contrast Scrim for WCAG Legibility */}
      <div
        className="absolute inset-0 bg-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Navigation Bar */}
        <header className="min-h-20 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between shadow-lg shadow-blue-950/10">
          {/* Left: Brand Wordmark & Desktop Links */}
          <div className="flex items-center gap-10 lg:gap-12">
            <a
              href="#top"
              onClick={() => setIsMenuOpen(false)}
              className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] font-semibold text-lg tracking-tight font-sans whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
            >
              AGROEYE-DL
            </a>

            <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-5 lg:gap-7">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  className="text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] text-sm font-light transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Project actions and mobile navigation toggle */}
          <div className="flex items-center gap-6 shrink-0">
            <a
              href="#contexto"
              className="hidden lg:inline-block text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] text-sm font-light transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
            >
              Explorar proyecto
            </a>

            <button
              type="button"
              onClick={() => setIsReelOpen(true)}
              className="hidden lg:inline-flex items-center justify-center bg-white text-blue-900 rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Ver presentación
            </button>

            {/* Animated Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-overlay"
              className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-md"
            >
              <span className="flex flex-col items-end justify-center gap-[5px]">
                <span
                  className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-[2px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </header>

        {/* Centered Hero Content */}
        <div className="hero-copy flex-1 flex flex-col items-center justify-start pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-6 text-center">
          <p className="reveal-on-scroll reveal-delay-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] text-white text-[10px] sm:text-xs uppercase tracking-[0.28em]">
            Big Data&nbsp; · &nbsp;Deep Learning&nbsp; · &nbsp;Scrum&nbsp; · &nbsp;Agricultura inteligente
          </p>

          <h1 className="reveal-on-scroll reveal-delay-2 hero-title mt-4 drop-shadow-[0_2px_5px_rgba(0,0,0,0.55)] font-sans font-semibold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-5xl tracking-tight">
            AGROEYE-DL
          </h1>

          <h2 className="reveal-on-scroll reveal-delay-3 hero-subtitle mt-4 md:mt-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] text-white text-lg sm:text-xl md:text-2xl font-medium max-w-3xl leading-relaxed">
            Plataforma Predictiva de Fitosanidad y Cosecha
          </h2>

          <p className="reveal-on-scroll reveal-delay-4 hero-company mt-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] text-white/90 text-sm md:text-base font-light max-w-3xl leading-relaxed">
            Empresa: <span className="text-white font-medium">AgroVision Perú S.A.C.</span>
            &nbsp; · &nbsp;Palta Hass y Arándanos
          </p>

          <p className="reveal-on-scroll reveal-delay-5 hero-description mt-4 md:mt-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] text-white/90 text-sm md:text-base font-light max-w-3xl leading-relaxed">
            Presentación académica en SENATI de los cuatro artefactos y entregables del marco de
            trabajo Scrum aplicados a una plataforma Big Data y Deep Learning en La Libertad,
            Lambayeque e Ica.
          </p>

          <div className="reveal-on-scroll reveal-delay-6 hero-actions mt-5 md:mt-6 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenPanel('projects')}
              className="group inline-flex items-center justify-center gap-2 bg-white text-slate-900 rounded-full px-7 py-3 text-sm font-medium hover:bg-slate-100 transition-colors duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <span>Explorar proyecto</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => setIsReelOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/70 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/10 hover:border-white transition-colors duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Iniciar presentación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div
        id="mobile-nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-white/95 backdrop-blur-xl transition-opacity duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Overlay Content */}
        <div
          className={`relative z-10 flex flex-col h-full transition-opacity duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Overlay Header matching Navbar */}
          <div className="px-6 py-5 flex items-center justify-between">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
              }}
              className="text-slate-900 font-semibold text-lg tracking-tight font-sans"
            >
              AGROEYE-DL
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 -mr-2 relative flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/60 rounded-md"
            >
              <span className="absolute w-6 h-[2px] bg-slate-900 rounded-full rotate-45" />
              <span className="absolute w-6 h-[2px] bg-slate-900 rounded-full -rotate-45" />
            </button>
          </div>

          {/* Staggered Vertical Nav Links */}
          <nav aria-label="Mobile menu links" className="flex-1 flex flex-col justify-center px-6">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                style={{
                  transitionDelay: isMenuOpen ? `${150 + index * 80}ms` : '0ms',
                }}
                className={`block text-center text-4xl sm:text-5xl font-instrument-serif text-slate-900 border-b border-slate-200 py-4 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:pl-4 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

        </div>
      </div>

      {/* Interactive Showreel & Studio Drawer Panels */}
      <AgencyDrawers
        activePanel={activePanel}
        onClosePanel={() => setActivePanel(null)}
        onSelectPanel={(panel) => setActivePanel(panel)}
        isReelOpen={isReelOpen}
        onCloseReel={() => setIsReelOpen(false)}
        reelVideoUrl={HERO_VIDEO_URL}
      />
    </section>
  );
};
