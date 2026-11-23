import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';

export type StudioPanel = 'projects' | 'expertise' | 'studio' | 'insights' | 'contact' | null;

interface AgencyDrawersProps {
  activePanel: StudioPanel;
  onClosePanel: () => void;
  onSelectPanel: (panel: StudioPanel) => void;
  isReelOpen: boolean;
  onCloseReel: () => void;
  reelVideoUrl: string;
}

const SELECTED_CASES = [
  {
    index: '01',
    client: 'Vespera Treasury',
    scope: 'Product Architecture · Design System',
    metric: '+142% institutional onboarding velocity in 90 days',
    year: '2026',
  },
  {
    index: '02',
    client: 'Kestrel Mobility',
    scope: 'Native iOS App · Telemetry UX',
    metric: '4.9 App Store rating across 180k active drivers',
    year: '2026',
  },
  {
    index: '03',
    client: 'Northwind Bio',
    scope: 'Brand Platform · Lab Bench Software',
    metric: '$38M Series B closed following product relaunch',
    year: '2025',
  },
];

const EXPERTISE_AREAS = [
  {
    number: '01.',
    title: 'Product Strategy & Discovery',
    detail: 'Positioning, customer research, and rapid prototyping to validate high-stakes bets before engineering commits.',
  },
  {
    number: '02.',
    title: 'Web & Mobile App UX',
    detail: 'End-to-end interface architecture for iOS, Android, and complex browser applications with sub-second interaction polish.',
  },
  {
    number: '03.',
    title: 'Design Systems & Motion',
    detail: 'Tokenized component libraries and choreographed interface physics built directly alongside your engineering team.',
  },
  {
    number: '04.',
    title: 'Venture Brand Identity',
    detail: 'Editorial typography, verbal systems, and launch flagships designed to separate category leaders from the field.',
  },
];

const INSIGHTS_ESSAYS = [
  {
    title: 'Against Frictionless Blandness in Financial Software',
    meta: 'Product Craft · 6 min read',
  },
  {
    title: 'Designing Calm Interfaces for High-Throughput Operations',
    meta: 'Systems · 8 min read',
  },
  {
    title: 'Why Motion Grammar Belongs in Your Design Tokens',
    meta: 'Engineering · 5 min read',
  },
];

export const AgencyDrawers: React.FC<AgencyDrawersProps> = ({
  activePanel,
  onClosePanel,
  onSelectPanel,
  isReelOpen,
  onCloseReel,
  reelVideoUrl,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isReelOpen) onCloseReel();
        if (activePanel) onClosePanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReelOpen, activePanel, onCloseReel, onClosePanel]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBrief = brief.trim();

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid work email address.');
      return;
    }
    if (trimmedBrief.length < 10) {
      setError('Tell us a bit about your product or timeline (at least 10 characters).');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setBrief('');
    setError('');
    setSubmitted(false);
  };

  return (
    <>
      {/* Studio Showreel Lightbox */}
      {isReelOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Atelier Showreel"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          onClick={onCloseReel}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3 text-sm text-white/80 font-light">
                <span className="font-semibold text-white">Atelier</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>2026 Studio Reel</span>
              </div>
              <button
                type="button"
                onClick={onCloseReel}
                aria-label="Close showreel"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                src={reelVideoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Studio Panel */}
      {activePanel && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Atelier ${activePanel}`}
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          onClick={onClosePanel}
        >
          <aside
            className="relative w-full max-w-xl h-full bg-[#0A0A0B]/95 backdrop-blur-2xl border-l border-white/10 text-white flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 sm:px-8 py-6 border-b border-white/10">
              <div className="flex items-center gap-5 text-xs uppercase tracking-[0.14em] text-white/50">
                {(['projects', 'expertise', 'studio', 'insights', 'contact'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => onSelectPanel(tab)}
                    className={`transition-colors cursor-pointer whitespace-nowrap ${
                      activePanel === tab ? 'text-white font-medium' : 'text-white/45 hover:text-white/80'
                    }`}
                  >
                    {tab === 'contact' ? 'Reach Out' : tab}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={onClosePanel}
                aria-label="Close panel"
                className="w-10 h-10 -mr-2 inline-flex items-center justify-center rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 px-6 sm:px-8 py-8">
              {activePanel === 'projects' && (
                <div>
                  <h2 className="font-instrument-serif text-4xl sm:text-5xl font-normal leading-tight">
                    Selected <span className="italic">Cases</span>
                  </h2>
                  <p className="mt-3 text-sm text-white/65 font-light leading-relaxed max-w-md">
                    Flagship products designed and shipped in partnership with venture-backed founders and product leaders.
                  </p>
                  <div className="mt-8 divide-y divide-white/10 border-t border-b border-white/10">
                    {SELECTED_CASES.map((item) => (
                      <div key={item.index} className="py-6 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs text-white/45">
                          <span className="tabular-nums">{item.index} · {item.year}</span>
                          <span>{item.scope}</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-instrument-serif text-2xl sm:text-3xl text-white">
                            {item.client}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-white/40 shrink-0" aria-hidden="true" />
                        </div>
                        <p className="text-sm text-white/70 font-light">{item.metric}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPanel('contact')}
                    className="mt-8 bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    Request Full Case Deck
                  </button>
                </div>
              )}

              {activePanel === 'expertise' && (
                <div>
                  <h2 className="font-instrument-serif text-4xl sm:text-5xl font-normal leading-tight">
                    Studio <span className="italic">Expertise</span>
                  </h2>
                  <p className="mt-3 text-sm text-white/65 font-light leading-relaxed max-w-md">
                    Focused senior teams embedded directly with founders from zero-to-one concepting through production release.
                  </p>
                  <div className="mt-8 divide-y divide-white/10 border-t border-b border-white/10">
                    {EXPERTISE_AREAS.map((area) => (
                      <div key={area.number} className="py-5">
                        <h3 className="text-base font-medium text-white">
                          <span className="text-white/45 mr-2 tabular-nums">{area.number}</span>
                          {area.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/65 font-light leading-relaxed">
                          {area.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePanel === 'studio' && (
                <div>
                  <h2 className="font-instrument-serif text-4xl sm:text-5xl font-normal leading-tight">
                    Inside <span className="italic">Atelier</span>
                  </h2>
                  <p className="mt-4 text-base text-white/75 font-light leading-relaxed">
                    Atelier is an independent UX and application design practice working across San Francisco, Zurich, and Tokyo. We partner with two to three ventures per quarter so principal designers remain hands-on from first sketch to shipped build.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-6 py-6 border-t border-b border-white/10">
                    <div>
                      <p className="text-3xl font-instrument-serif tabular-nums">42</p>
                      <p className="mt-1 text-xs text-white/55 font-light">Products shipped since 2019</p>
                    </div>
                    <div>
                      <p className="text-3xl font-instrument-serif tabular-nums">$1.4B</p>
                      <p className="mt-1 text-xs text-white/55 font-light">Follow-on capital raised by partners</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPanel('contact')}
                    className="mt-8 bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    Start a Conversation
                  </button>
                </div>
              )}

              {activePanel === 'insights' && (
                <div>
                  <h2 className="font-instrument-serif text-4xl sm:text-5xl font-normal leading-tight">
                    Recent <span className="italic">Insights</span>
                  </h2>
                  <p className="mt-3 text-sm text-white/65 font-light leading-relaxed max-w-md">
                    Field notes on product architecture, interaction design, and craft at venture speed.
                  </p>
                  <div className="mt-8 divide-y divide-white/10 border-t border-b border-white/10">
                    {INSIGHTS_ESSAYS.map((essay) => (
                      <div key={essay.title} className="py-5">
                        <p className="text-xs text-white/45 font-light">{essay.meta}</p>
                        <h3 className="mt-1.5 font-instrument-serif text-2xl text-white leading-snug">
                          {essay.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePanel === 'contact' && (
                <div>
                  <h2 className="font-instrument-serif text-4xl sm:text-5xl font-normal leading-tight">
                    Let&rsquo;s <span className="italic">Talk</span>
                  </h2>
                  <p className="mt-3 text-sm text-white/65 font-light leading-relaxed max-w-md">
                    Share your product goals and target launch window. A partner will reply within one business day.
                  </p>

                  {submitted ? (
                    <div className="mt-8 p-6 rounded-2xl border border-white/15 bg-white/5">
                      <div className="flex items-center gap-3 text-white">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <h3 className="text-base font-medium">Inquiry received</h3>
                      </div>
                      <p className="mt-2 text-sm text-white/70 font-light leading-relaxed">
                        Thank you, {name}. We&rsquo;ve logged your brief for {email} and will follow up shortly with available times for an intro call.
                      </p>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="mt-5 text-xs text-white/70 hover:text-white underline underline-offset-4 cursor-pointer"
                      >
                        Send another note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                      <div>
                        <label htmlFor="atelier-name" className="block text-xs text-white/60 mb-2">
                          Your Name
                        </label>
                        <input
                          id="atelier-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Maya Lin"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="atelier-email" className="block text-xs text-white/60 mb-2">
                          Work Email
                        </label>
                        <input
                          id="atelier-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="maya@venture.io"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="atelier-brief" className="block text-xs text-white/60 mb-2">
                          Project Scope & Timeline
                        </label>
                        <textarea
                          id="atelier-brief"
                          rows={4}
                          value={brief}
                          onChange={(e) => setBrief(e.target.value)}
                          placeholder="Launching our v1 mobile banking app in Q2..."
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors resize-none"
                        />
                      </div>

                      {error && (
                        <p role="alert" className="text-xs text-rose-300 font-light">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-white text-black rounded-full py-3.5 text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer"
                      >
                        Send Inquiry
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
