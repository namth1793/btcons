import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API } from '../config.js';

const benefits = [
  { icon: '🏥', title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision plans for employees and families.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Market-leading compensation with performance bonuses and equity opportunities.' },
  { icon: '📚', title: 'Learning & Development', desc: 'Tuition reimbursement, certifications, and leadership development programs.' },
  { icon: '🌴', title: 'Time Off', desc: 'Generous PTO, paid holidays, parental leave, and flexible work arrangements.' },
  { icon: '🏦', title: 'Retirement', desc: '401(k) with company match and financial planning resources.' },
  { icon: '🤝', title: 'Community Impact', desc: 'Paid volunteer time and matching gifts to the causes you care about.' },
];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`${API}/jobs`).then(r => r.json()).then(data => { setJobs(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const departments = ['All', ...new Set(jobs.map(j => j.department))];
  const filtered = filter === 'All' ? jobs : jobs.filter(j => j.department === filter);
  const formatDate = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[55vh] flex items-end pb-10 md:pb-16">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80" alt="Careers" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">Join Our Team</p>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl leading-tight">Careers</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <p className="section-label">Why BTCONS</p>
            <h2 className="section-title mb-6">Build a Career as Lasting as the Projects We Deliver</h2>
            <p className="text-mid-gray leading-relaxed mb-4">
              At BTCONS, we believe that our people are our greatest asset. We're a family-owned company that truly acts like it — investing in our employees' growth, well-being, and long-term success.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              Join a team where your work shapes skylines, heals communities, educates students, and powers the future. With 45+ offices and projects in 20+ countries, the opportunity to grow with us is limitless.
            </p>
            <a href="#openings" className="btn-primary">View Open Positions</a>
          </div>
          <div className="img-zoom rounded overflow-hidden aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="BTCONS team" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Total Rewards</p>
          <h2 className="section-title mb-12">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="bg-white p-7 hover:shadow-md transition-shadow group">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-heading font-bold text-lg text-dark mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="text-mid-gray text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diversity Banner */}
      <section className="bg-dark py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start gap-8 md:gap-10">
          <div className="flex-1">
            <p className="section-label text-primary">Our Commitment</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">Diversity, Equity & Inclusion</h2>
            <p className="text-white/70 leading-relaxed">
              BTCONS is committed to fostering a diverse, equitable, and inclusive workplace where every person can thrive. We believe that diverse teams build better buildings and better communities — and we're actively working to reflect that belief in every hire, promotion, and supplier relationship.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[['40%', 'Diverse Hires in 2024'], ['500+', 'Diverse Supplier Partners'], ['15+', 'ERG & Affinity Groups'], ['$250M+', 'Diverse Spend Annually']].map(([v, l]) => (
              <div key={l} className="border border-white/20 p-5 text-center">
                <div className="font-heading font-bold text-3xl text-primary">{v}</div>
                <div className="text-white/60 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Open Roles</p>
          <h2 className="section-title mb-8">Current Openings</h2>

          {/* Department filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {departments.map(d => (
              <button key={d} onClick={() => setFilter(d)}
                className={`px-4 py-2 text-xs font-heading font-semibold uppercase tracking-widest border transition-colors ${filter === d ? 'bg-primary border-primary text-white' : 'border-gray-300 text-mid-gray hover:border-primary hover:text-primary'}`}>
                {d}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-16 text-mid-gray">Loading openings...</div>
          ) : (
            <div className="space-y-4">
              {filtered.map(job => (
                <div key={job.id} className="border border-gray-200 p-6 hover:border-primary hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl text-dark group-hover:text-primary transition-colors mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-mid-gray">
                        <span className="font-heading font-semibold text-primary text-xs uppercase tracking-widest">{job.department}</span>
                        <span>·</span>
                        <span>📍 {job.location}</span>
                        <span>·</span>
                        <span>⏱ {job.type}</span>
                        <span>·</span>
                        <span>Posted {formatDate(job.posted_date)}</span>
                      </div>
                      <p className="text-mid-gray text-sm leading-relaxed mt-3 max-w-2xl">{job.description}</p>
                    </div>
                    <div className="shrink-0">
                      <Link to="/contact" className="btn-primary text-xs py-2.5">Apply Now</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
