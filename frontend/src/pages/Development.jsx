import { Link } from 'react-router-dom';

const services = [
  { title: 'Acquisitions', desc: 'Strategic site identification, due diligence, and transaction execution to build a high-quality development pipeline.' },
  { title: 'Development', desc: 'Full-cycle project development from entitlement and design through construction management and delivery.' },
  { title: 'Finance & Advisory', desc: 'Capital structuring, equity syndication, debt placement, and financial modeling for complex real estate transactions.' },
  { title: 'Property Management', desc: 'Professional asset and property management services that protect and grow the long-term value of real estate investments.' },
  { title: 'Public-Private Partnerships', desc: 'Proven P3 expertise for government, housing authorities, and institutions seeking private development capacity.' },
  { title: 'Strategic Planning', desc: 'Market research, feasibility analysis, and master planning to align development strategy with owner goals.' },
];

const markets = [
  { name: 'Multifamily', icon: '🏢', desc: 'Market-rate apartment communities in high-demand urban and suburban markets.' },
  { name: 'Student Housing', icon: '🎓', desc: 'Purpose-built student housing for universities and colleges nationwide.' },
  { name: 'Affordable Housing', icon: '🏠', desc: 'LIHTC, mixed-income, and workforce housing serving underserved communities.' },
  { name: 'Mixed-Use', icon: '🏙️', desc: 'Dynamic urban developments combining residential, retail, office, and public space.' },
  { name: 'Commercial', icon: '🏬', desc: 'Office, retail, and mixed-use developments anchored by strong market fundamentals.' },
  { name: 'Healthcare', icon: '🏥', desc: 'Medical office buildings, senior living, and healthcare-anchored developments.' },
  { name: 'Government', icon: '🏛️', desc: 'Federal, state, and local government facilities delivered via P3 and ground lease structures.' },
  { name: 'Single Family', icon: '🏡', desc: 'For-sale and build-to-rent single family residential communities.' },
];

const stats = [
  { value: '50,000+', label: 'Residential Units Developed' },
  { value: '$3B+', label: 'Development Pipeline' },
  { value: '30+', label: 'Years of Development Experience' },
  { value: '25+', label: 'States Active' },
];

export default function Development() {
  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[55vh] md:h-[60vh] flex items-end pb-10 md:pb-16">
        <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80" alt="Development" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-primary">BTCONS Development</p>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl leading-tight">Development</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="img-zoom rounded overflow-hidden aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" alt="Development" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="section-label">Our Approach</p>
            <h2 className="section-title mb-6">Creating Communities That Last</h2>
            <p className="text-mid-gray leading-relaxed mb-4">
              BTCONS Development is a vertically integrated real estate developer with a proven track record across multifamily, student housing, affordable housing, and mixed-use projects nationwide.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              We bring together acquisitions, finance, construction, and management expertise under one roof — delivering exceptional communities that serve residents, support neighborhoods, and generate enduring value for our partners.
            </p>
            <Link to="/projects?division=development" className="btn-primary">View Development Projects</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-heading font-bold text-4xl md:text-5xl mb-2">{s.value}</div>
                <div className="text-white/80 text-sm font-heading uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">What We Do</p>
          <h2 className="section-title mb-12">Development Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="bg-white p-7 border-l-4 border-transparent hover:border-primary transition-all duration-200 group">
                <h3 className="font-heading font-bold text-lg text-dark mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-mid-gray text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Where We Develop</p>
          <h2 className="section-title mb-12">Development Markets</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {markets.map(m => (
              <div key={m.name} className="p-5 border border-gray-200 hover:border-primary hover:shadow-md transition-all cursor-pointer group">
                <div className="text-2xl mb-3">{m.icon}</div>
                <h3 className="font-heading font-bold text-dark mb-1 group-hover:text-primary transition-colors">{m.name}</h3>
                <p className="text-mid-gray text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label text-primary">How We Work</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12">Our Development Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-0">
            {['Site Acquisition', 'Entitlement & Design', 'Financing & Closing', 'Construction', 'Operations & Management'].map((step, i) => (
              <div key={step} className="relative flex flex-col items-center text-center p-5 md:p-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-lg text-white mb-4 z-10 shrink-0">{i + 1}</div>
                {i < 4 && <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-primary/30" />}
                <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-white/90">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-light-gray py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="section-title mb-4">Have a Development Opportunity?</h2>
          <p className="text-mid-gray text-lg mb-8 max-w-xl mx-auto">We partner with landowners, municipalities, institutions, and investors to unlock the full potential of real estate assets.</p>
          <Link to="/contact" className="btn-primary">Talk to Our Team</Link>
        </div>
      </section>
    </main>
  );
}
