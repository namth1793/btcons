import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { API } from '../config.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/projects/${id}`)
      .then(r => r.json())
      .then(data => {
        setProject(data);
        return fetch(`${API}/projects?division=${data.division}`);
      })
      .then(r => r.json())
      .then(all => setRelated(all.filter(p => p.id !== parseInt(id)).slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="pt-32 text-center text-mid-gray font-heading text-xl min-h-screen">Loading...</div>;
  if (!project) return <div className="pt-32 text-center text-mid-gray font-heading text-xl min-h-screen">Project not found.</div>;

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end pb-16">
        <img src={project.image_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/projects" className="text-white/50 hover:text-white text-sm transition-colors">Projects</Link>
            <span className="text-white/30">›</span>
            <span className="text-white/70 text-sm">{project.market}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl leading-tight max-w-3xl">{project.title}</h1>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <p className="section-label">Project Overview</p>
            <p className="text-dark text-lg leading-relaxed">{project.description}</p>
          </div>
          <div className="bg-light-gray p-8 space-y-5">
            {[
              { label: 'Division', value: project.division === 'building' ? 'BTCONS Building' : 'BTCONS Development' },
              { label: 'Market', value: project.market },
              { label: 'Location', value: project.location },
              { label: 'Completed', value: project.year },
            ].map(item => (
              <div key={item.label} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <p className="text-xs font-heading font-bold uppercase tracking-widest text-primary mb-1">{item.label}</p>
                <p className="font-heading font-semibold text-dark">{item.value}</p>
              </div>
            ))}
            <Link to="/contact" className="btn-primary block text-center mt-4">Discuss Your Project</Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-light-gray">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="section-title mb-10">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/projects/${p.id}`} className="bg-white group block hover:shadow-md transition-shadow">
                  <div className="img-zoom aspect-[16/9] overflow-hidden">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-primary text-xs font-heading font-bold uppercase tracking-widest mb-1">{p.market}</p>
                    <h3 className="font-heading font-bold text-dark group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-mid-gray text-sm mt-1">{p.location} · {p.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
