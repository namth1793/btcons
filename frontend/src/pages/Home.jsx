import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { API } from '../config.js';

/* ─── Hero split panel ─── */
function HeroSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="h-screen flex flex-col md:flex-row">
      {/* Building panel */}
      <div
        className={`relative flex-1 overflow-hidden cursor-pointer transition-all duration-700 ${hovered === 'dev' ? 'flex-[0.35]' : hovered === 'build' ? 'flex-[0.65]' : 'flex-1'}`}
        onMouseEnter={() => setHovered('build')}
        onMouseLeave={() => setHovered(null)}
      >
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
          alt="Building"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105"
          style={{ transform: hovered === 'build' ? 'scale(1.08)' : 'scale(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
          <p className="section-label text-white/80">BTCONS Building</p>
          <h2 className="font-heading font-bold text-4xl md:text-6xl text-white mb-4 leading-tight">Building</h2>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-md leading-relaxed">
            Construction management, design-build, and integrated project delivery across every major market sector.
          </p>
          <Link to="/building" className="btn-outline self-start">Explore Building</Link>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-1 bg-primary z-10 relative">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-heading font-bold text-xs">+</span>
          </div>
        </div>
      </div>

      {/* Development panel */}
      <div
        className={`relative flex-1 overflow-hidden cursor-pointer transition-all duration-700 ${hovered === 'build' ? 'flex-[0.35]' : hovered === 'dev' ? 'flex-[0.65]' : 'flex-1'}`}
        onMouseEnter={() => setHovered('dev')}
        onMouseLeave={() => setHovered(null)}
      >
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"
          alt="Development"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered === 'dev' ? 'scale(1.08)' : 'scale(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
          <p className="section-label text-primary">BTCONS Development</p>
          <h2 className="font-heading font-bold text-4xl md:text-6xl text-white mb-4 leading-tight">Development</h2>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-md leading-relaxed">
            Real estate development, acquisition, finance, and property management — creating communities that last.
          </p>
          <Link to="/development" className="btn-outline self-start">Explore Development</Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10">
        <span className="text-white/50 text-xs uppercase tracking-widest font-heading">Scroll</span>
        <div className="w-0.5 h-10 bg-white/30 relative overflow-hidden rounded">
          <div className="absolute top-0 left-0 w-full bg-primary animate-bounce h-1/2 rounded"></div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function StatsSection() {
  const stats = [
    { value: '150+', label: 'Years in Business', sub: 'Founded 1873' },
    { value: '20+', label: 'Countries Worldwide', sub: 'Global Presence' },
    { value: '45+', label: 'Office Locations', sub: 'Across the US & Abroad' },
    { value: '$6B+', label: 'Annual Revenue', sub: 'Top 10 US Contractor' },
  ];
  return (
    <section className="bg-light-gray py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-heading font-bold text-5xl text-primary mb-2">{s.value}</div>
              <div className="font-heading font-semibold text-base text-dark uppercase tracking-wide">{s.label}</div>
              <div className="text-mid-gray text-sm mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Projects Carousel ─── */
function ProjectsCarousel({ projects }) {
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const max = Math.max(0, projects.length - visible);
  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(max, i + 1));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Portfolio</p>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} disabled={idx === 0}
              className="w-10 h-10 flex items-center justify-center border border-dark text-dark hover:bg-dark hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              ←
            </button>
            <button onClick={next} disabled={idx >= max}
              className="w-10 h-10 flex items-center justify-center border border-dark text-dark hover:bg-dark hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              →
            </button>
            <Link to="/projects" className="ml-4 text-primary font-heading font-semibold text-sm hover:underline uppercase tracking-wider">View All</Link>
          </div>
        </div>

        <div className="carousel-container">
          <div className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(calc(-${idx} * (100% / ${visible} + 8px)))` }}>
            {projects.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`}
                className="img-zoom shrink-0 group block"
                style={{ width: `calc(100% / ${visible} - 16px)` }}>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-300 flex items-end p-0 group-hover:p-5">
                    <span className="text-white font-heading font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">View Project →</span>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-primary text-xs font-heading font-semibold uppercase tracking-widest mb-1">{p.market} · {p.location}</p>
                  <h3 className="font-heading font-bold text-lg text-dark leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About Banner ─── */
function AboutBanner() {
  return (
    <section className="relative py-28 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80" alt="About" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-dark/75" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
        <p className="section-label text-white/70">Who We Are</p>
        <h2 className="font-heading font-bold text-4xl md:text-6xl max-w-3xl leading-tight mb-6">
          Innovative. Solutions-Driven. Community-Focused.
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mb-10 leading-relaxed">
          For more than 150 years, BTCONS has been one of the largest privately held, family-owned construction and real estate companies in the world — building communities and transforming lives through exceptional project delivery.
        </p>
        <Link to="/about" className="btn-outline">Our Story</Link>
      </div>
    </section>
  );
}

/* ─── News Section ─── */
function NewsSection({ news }) {
  const formatDate = d => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <section className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Latest</p>
            <h2 className="section-title">News & Press</h2>
          </div>
          <Link to="/news" className="text-primary font-heading font-semibold text-sm hover:underline uppercase tracking-wider">View All News</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(n => (
            <div key={n.id} className="bg-white group cursor-pointer">
              <div className="img-zoom aspect-[16/9] overflow-hidden">
                <img src={n.image_url} alt={n.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary text-xs font-heading font-bold uppercase tracking-widest">{n.category}</span>
                  <span className="text-mid-gray text-xs">·</span>
                  <span className="text-mid-gray text-xs">{formatDate(n.published_date)}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-dark leading-snug group-hover:text-primary transition-colors">{n.title}</h3>
                <p className="text-mid-gray text-sm mt-3 leading-relaxed line-clamp-3">{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Careers CTA ─── */
function CareersCTA() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center text-white">
        <p className="font-heading text-sm uppercase tracking-widest text-white/70 mb-3">Join Our Team</p>
        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">Build Your Career With BTCONS</h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          We are always looking for talented, driven people who are passionate about construction, development, and making a lasting impact in the communities where we work.
        </p>
        <Link to="/careers" className="btn-outline">Explore Careers</Link>
      </div>
    </section>
  );
}

/* ─── Reports CTA ─── */
function ReportsCTA() {
  return (
    <section className="bg-dark py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: '2024 Annual Report', sub: 'Our year in review — achievements, financials, and impact.', icon: '📄' },
            { title: '2024 Impact Report', sub: 'How we\'re driving sustainability, equity, and community benefit.', icon: '🌿' },
          ].map(r => (
            <div key={r.title} className="border border-white/15 p-8 flex items-center gap-6 hover:border-primary transition-colors group cursor-pointer">
              <div className="text-4xl">{r.icon}</div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white mb-1 group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{r.sub}</p>
              </div>
              <svg className="w-5 h-5 text-white/30 group-hover:text-primary ml-auto transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  const [projects, setProjects] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${API}/projects?featured=1`).then(r => r.json()).then(setProjects).catch(() => {});
    fetch(`${API}/news?limit=6`).then(r => r.json()).then(setNews).catch(() => {});
  }, []);

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ProjectsCarousel projects={projects} />
      <AboutBanner />
      <NewsSection news={news} />
      <CareersCTA />
      <ReportsCTA />
    </main>
  );
}
