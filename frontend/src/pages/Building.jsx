import { Link } from 'react-router-dom';

const services = [
  { title: 'Construction Management', desc: 'Full-spectrum CM services from preconstruction through closeout, delivering projects on schedule and within budget.' },
  { title: 'Design-Build', desc: 'Integrated design and construction solutions that accelerate schedules and reduce risk through a single point of responsibility.' },
  { title: 'Integrated Project Delivery', desc: 'Collaborative IPD contracts that align the interests of owner, designer, and contractor for optimal outcomes.' },
  { title: 'Virtual Design & Construction', desc: 'BIM-powered planning, clash coordination, and 4D scheduling that resolves issues before they become field problems.' },
  { title: 'Disaster Response', desc: 'Rapid mobilization expertise for emergency repair and recovery, restoring critical facilities with urgency and precision.' },
  { title: 'Facilities Management', desc: 'Comprehensive ongoing operations and maintenance services to protect the long-term value of your facility investment.' },
  { title: 'Sustainability Strategies', desc: 'LEED, WELL, and net-zero expertise embedded throughout every phase to meet today\'s ESG and carbon reduction goals.' },
  { title: 'Multi-Site Delivery', desc: 'Proven systems for managing simultaneous projects across multiple geographies with consistent quality and reporting.' },
  { title: 'Supply Chain Management', desc: 'Early procurement strategies and supplier relationships that lock in pricing, beat lead times, and reduce exposure.' },
  { title: 'Public-Private Partnerships', desc: 'P3 structuring, financing, and delivery for complex public infrastructure with private-sector efficiency.' },
  { title: 'Transition Planning', desc: 'Detailed activation and move management to ensure seamless transitions into newly completed facilities.' },
  { title: 'Site Services & Equipment', desc: 'Owned equipment and self-performed site services that improve cost control and scheduling certainty.' },
];

const markets = [
  { name: 'Healthcare', icon: '🏥', desc: 'Hospitals, MOBs, cancer centers, and behavioral health facilities.' },
  { name: 'Higher Education', icon: '🎓', desc: 'Academic buildings, research labs, student housing, and campus infrastructure.' },
  { name: 'K-12 Education', icon: '🏫', desc: 'Elementary, middle, and high schools designed for 21st-century learning.' },
  { name: 'Life Sciences', icon: '🔬', desc: 'GMP manufacturing, R&D facilities, and biotech campuses.' },
  { name: 'Data Centers', icon: '🖥️', desc: 'Hyperscale, colocation, and enterprise data center construction.' },
  { name: 'Advanced Technology', icon: '⚙️', desc: 'Semiconductor fabs, cleanrooms, and high-tech manufacturing.' },
  { name: 'Sports & Entertainment', icon: '🏟️', desc: 'Stadiums, arenas, performing arts centers, and entertainment venues.' },
  { name: 'Transportation', icon: '🚆', desc: 'Airports, transit hubs, rail facilities, and transportation operations centers.' },
  { name: 'Federal', icon: '🏛️', desc: 'Government offices, courthouses, military facilities, and federal infrastructure.' },
  { name: 'Commercial', icon: '🏢', desc: 'Corporate headquarters, office towers, and mixed-use developments.' },
  { name: 'Industrial', icon: '🏭', desc: 'Food & beverage facilities, consumer goods plants, and logistics centers.' },
  { name: 'Residential', icon: '🏘️', desc: 'Multifamily, affordable housing, and mixed-income residential communities.' },
];

export default function Building() {
  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[55vh] md:h-[60vh] flex items-end pb-10 md:pb-16">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="Building" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">BTCONS Building</p>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl leading-tight">Building</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <p className="section-label">Our Approach</p>
            <h2 className="section-title mb-6">A Partner in Every Phase of Construction</h2>
            <p className="text-mid-gray leading-relaxed mb-4">
              BTCONS Building is one of the largest and most experienced construction management firms in the United States. We bring deep market expertise, proven processes, and a collaborative culture to every project we deliver.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              From preconstruction planning through facility activation, our teams are relentlessly focused on delivering value — on time, within budget, and to the highest standard of quality and safety.
            </p>
            <Link to="/projects?division=building" className="btn-primary">View Building Projects</Link>
          </div>
          <div className="img-zoom rounded overflow-hidden aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="Construction" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">What We Do</p>
          <h2 className="section-title mb-12">Building Services</h2>
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
          <p className="section-label">Where We Work</p>
          <h2 className="section-title mb-12">Building Markets</h2>
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

      {/* CTA */}
      <section className="bg-dark py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center text-white">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">Ready to Build Together?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Tell us about your project and our team will be in touch to explore how we can help.</p>
          <Link to="/contact" className="btn-primary">Partner With Us</Link>
        </div>
      </section>
    </main>
  );
}
