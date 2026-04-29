import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API } from '../config.js';

/* ─── Hero full-width ─── */
function HeroSection({ hero }) {
  const title    = hero?.title     || 'BTCONS is a leading global builder and real estate developer';
  const imageUrl = hero?.image_url || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80';
  return (
    <section className="relative h-screen min-h-[560px] flex items-center justify-center overflow-hidden">
      <img src={imageUrl} alt="BTCONS construction" className="absolute inset-0 w-full h-full object-cover scale-105" />
      <div className="absolute inset-0 bg-dark/55" />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="font-heading font-bold text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-10 drop-shadow-lg">
          {title}
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/building"
            className="flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 transition-colors duration-200 group">
            Mảng Xây dựng
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/development"
            className="flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 transition-colors duration-200 group">
            Mảng Phát triển
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ─── */
const DEFAULT_STATS = [
  { value: '150+', label: 'Years in Business', sub: 'Founded 1873' },
  { value: '20+',  label: 'Countries Worldwide', sub: 'Global Presence' },
  { value: '45+',  label: 'Office Locations',   sub: 'Across the US & Abroad' },
  { value: '$6B+', label: 'Annual Revenue',     sub: 'Top 10 US Contractor' },
];

function StatsSection({ stats }) {
  const data = (Array.isArray(stats) && stats.length) ? stats : DEFAULT_STATS;
  return (
    <section className="bg-light-gray py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.map(s => (
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
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => { setIdx(0); }, [visible]);

  const gap = 24;
  const itemOffset = Math.floor((visible - 1) * gap / visible);
  const stepOffset = gap - itemOffset;
  const max = Math.max(0, projects.length - visible);
  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(max, i + 1));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Danh mục</p>
            <h2 className="section-title">Dự án nổi bật</h2>
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
            <Link to="/projects" className="ml-4 text-primary font-heading font-semibold text-sm hover:underline uppercase tracking-wider">Xem tất cả</Link>
          </div>
        </div>

        <div className="carousel-container">
          <div className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(calc(-${idx} * (100% / ${visible} + ${stepOffset}px)))` }}>
            {projects.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`}
                className="img-zoom shrink-0 group block"
                style={{ width: `calc(100% / ${visible} - ${itemOffset}px)` }}>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-300 flex items-end p-0 group-hover:p-5">
                    <span className="text-white font-heading font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">Xem dự án →</span>
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
      <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80" alt="Về chúng tôi" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-dark/75" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
        <p className="section-label text-white/70">Chúng tôi là ai</p>
        <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-6xl max-w-3xl leading-tight mb-6">
          Sáng tạo. Hiệu quả. Hướng đến cộng đồng.
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mb-10 leading-relaxed">
          Hơn 150 năm qua, BTCONS là một trong những công ty xây dựng và bất động sản tư nhân, thuộc sở hữu gia đình lớn nhất thế giới — xây dựng cộng đồng và thay đổi cuộc sống qua từng dự án xuất sắc.
        </p>
        <Link to="/about" className="btn-outline">Câu chuyện của chúng tôi</Link>
      </div>
    </section>
  );
}

/* ─── News Section ─── */
function NewsSection({ news }) {
  const formatDate = d => new Date(d).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <section className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Mới nhất</p>
            <h2 className="section-title">Tin tức & Báo chí</h2>
          </div>
          <Link to="/news" className="text-primary font-heading font-semibold text-sm hover:underline uppercase tracking-wider">Xem tất cả tin tức</Link>
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
        <p className="font-heading text-sm uppercase tracking-widest text-white/70 mb-3">Gia nhập đội ngũ</p>
        <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl mb-4">Xây dựng sự nghiệp cùng BTCONS</h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Chúng tôi luôn tìm kiếm những người tài năng, nhiệt huyết với xây dựng, phát triển và mong muốn tạo ra tác động bền vững cho các cộng đồng nơi chúng tôi làm việc.
        </p>
        <Link to="/careers" className="btn-outline">Khám phá cơ hội nghề nghiệp</Link>
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
            { title: 'Báo cáo thường niên 2024', sub: 'Tổng kết năm — thành tựu, tài chính và tác động xã hội.', icon: '📄' },
            { title: 'Báo cáo tác động 2024',   sub: 'Cách chúng tôi thúc đẩy bền vững, công bằng và lợi ích cộng đồng.', icon: '🌿' },
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
  const [news,     setNews]     = useState([]);
  const [content,  setContent]  = useState({});

  useEffect(() => {
    fetch(`${API}/projects?featured=1`).then(r => r.json()).then(setProjects).catch(() => {});
    fetch(`${API}/news?limit=6`).then(r => r.json()).then(setNews).catch(() => {});
    fetch(`${API}/content`).then(r => r.json()).then(setContent).catch(() => {});
  }, []);

  return (
    <main>
      <HeroSection   hero={content.hero} />
      <StatsSection  stats={content.stats} />
      <ProjectsCarousel projects={projects} />
      <AboutBanner />
      <NewsSection news={news} />
      <CareersCTA />
      <ReportsCTA />
    </main>
  );
}
