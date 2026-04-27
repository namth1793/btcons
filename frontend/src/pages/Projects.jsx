import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { API } from '../config.js';

const buildingMarkets = ['All', 'Advanced Technology', 'Civic & Public Administration', 'Commercial', 'Data Centers', 'Federal', 'Healthcare', 'Higher Education', 'Industrial & Manufacturing', 'K-12 Education', 'Life Sciences', 'Sports & Entertainment', 'Transportation'];
const devMarkets = ['All', 'Affordable & Mixed-Income Housing', 'Commercial', 'Government', 'Healthcare', 'Higher Education', 'Mixed-Use', 'Multifamily', 'Student Housing'];

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const division = searchParams.get('division') || 'all';
  const market = searchParams.get('market') || 'All';

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (division !== 'all') params.set('division', division);
    fetch(`${API}/projects?${params}`)
      .then(r => r.json())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [division]);

  const markets = division === 'development' ? devMarkets : buildingMarkets;
  const filtered = market === 'All' ? projects : projects.filter(p => p.market === market);

  const setFilter = (key, val) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, val);
    if (key === 'division') next.set('market', 'All');
    setSearchParams(next);
  };

  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-52 md:h-72 flex items-end pb-8 md:pb-10">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="Projects" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/70" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">Our Work</p>
          <h1 className="font-heading font-bold text-2xl sm:text-5xl md:text-6xl">Projects</h1>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-dark py-4 sticky top-14 lg:top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-2">
          {/* Division filter */}
          <div className="flex gap-2">
            {[['all', 'All Projects'], ['building', 'Building'], ['development', 'Development']].map(([val, label]) => (
              <button key={val} onClick={() => setFilter('division', val)}
                className={`px-4 py-1.5 text-xs font-heading font-semibold uppercase tracking-widest transition-colors ${division === val ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}>
                {label}
              </button>
            ))}
          </div>
          {/* Market filter - horizontal scroll on mobile */}
          <div className="overflow-x-auto scrollbar-hide -mx-6 lg:mx-0">
            <div className="flex gap-2 flex-nowrap px-6 lg:px-0 pb-0.5">
              {markets.map(m => (
                <button key={m} onClick={() => setFilter('market', m)}
                  className={`shrink-0 px-3 py-1 text-xs font-sans transition-colors rounded-sm ${market === m ? 'bg-white text-dark' : 'text-white/50 hover:text-white'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-light-gray min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="text-center py-20 text-mid-gray font-heading">Loading projects...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-mid-gray font-heading">No projects found for selected filters.</div>
          ) : (
            <>
              <p className="text-mid-gray text-sm mb-8 font-sans">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => (
                  <Link key={p.id} to={`/projects/${p.id}`} className="bg-white group block hover:shadow-lg transition-shadow duration-300">
                    <div className="img-zoom aspect-[16/9] overflow-hidden">
                      <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-heading font-bold uppercase tracking-widest ${p.division === 'building' ? 'text-primary' : 'text-blue-600'}`}>
                          {p.division === 'building' ? 'Building' : 'Development'}
                        </span>
                        <span className="text-mid-gray text-xs">· {p.market}</span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-dark leading-snug mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-mid-gray text-sm">{p.location} · {p.year}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
