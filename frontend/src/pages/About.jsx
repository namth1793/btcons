import { Link } from 'react-router-dom';

const timeline = [
  { year: '1873', event: 'William Nguyen founds the company in Hanoi, Vietnam as a construction firm.' },
  { year: '1912', event: 'BTCONS expands into general contracting, completing some of Providence\'s most prominent civic buildings.' },
  { year: '1950s', event: 'National expansion begins as BTCONS takes on major federal, healthcare, and higher education projects.' },
  { year: '1970s', event: 'Construction management becomes BTCONS\'s primary service model, cementing its reputation for complex projects.' },
  { year: '1990s', event: 'International expansion into the Middle East, Europe, and Asia. Development division established.' },
  { year: '2000s', event: 'BTCONS embraces BIM and virtual design, becoming an industry leader in technology-driven construction.' },
  { year: '2010s', event: 'Sustainability programs launched; BTCONS delivers hundreds of LEED-certified projects globally.' },
  { year: '2024', event: 'Over 45 offices worldwide, 3,000+ employees, and $6B+ in annual revenue. Still family-owned.' },
];

const values = [
  { title: 'Integrity', icon: '⚖️', desc: 'We do what we say, say what we mean, and stand behind every project we deliver.' },
  { title: 'Excellence', icon: '🏆', desc: 'A relentless commitment to quality, safety, and performance on every project, every day.' },
  { title: 'Collaboration', icon: '🤝', desc: 'We believe the best outcomes come from genuine partnerships with clients, designers, and communities.' },
  { title: 'Innovation', icon: '💡', desc: 'Continuously improving through technology, process innovation, and creative problem-solving.' },
  { title: 'Diversity & Inclusion', icon: '🌍', desc: 'Building an equitable workplace and supply chain that reflects the communities we serve.' },
  { title: 'Community', icon: '🏘️', desc: 'Every project is an investment in the neighborhoods, institutions, and people we build for.' },
];

const leadership = [
  { name: 'Nguyen Van Vuong', title: 'Chairman & Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Tran Minh Duc', title: 'President & CEO, BTCONS Building', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Le Hoang Nam', title: 'President, BTCONS Development', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  { name: 'Pham Thi Lan', title: 'Board Member', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
];

export default function About() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end pb-16">
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80" alt="About BTCONS" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">Who We Are</p>
          <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight">About BTCONS</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label">Our Mission</p>
            <h2 className="section-title mb-6">A Family-Owned Legacy of Building</h2>
            <p className="text-mid-gray leading-relaxed mb-4 text-lg">
              BTCONS is one of the largest and most respected privately held, family-owned construction and real estate companies in the world. For more than 150 years, the BTCONS family has guided the company with a deep commitment to its clients, employees, and the communities where it works.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              With two complementary divisions — BTCONS Building and BTCONS Development — we offer an unmatched combination of construction expertise and real estate development capability that sets us apart in the marketplace.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[['150+', 'Years in Business'], ['3,000+', 'Employees Worldwide'], ['20+', 'Countries'], ['$6B+', 'Annual Revenue']].map(([val, label]) => (
                <div key={label} className="border-l-4 border-primary pl-4">
                  <div className="font-heading font-bold text-3xl text-dark">{val}</div>
                  <div className="text-mid-gray text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="img-zoom rounded overflow-hidden aspect-square">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="BTCONS team" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">What Drives Us</p>
          <h2 className="section-title mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white p-8 hover:shadow-md transition-shadow group">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-heading font-bold text-xl text-dark mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-mid-gray text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label text-primary">Our Story</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12">150 Years of Building</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />
            <div className="space-y-8">
              {timeline.map(t => (
                <div key={t.year} className="flex gap-8 items-start">
                  <div className="shrink-0 w-16 text-right">
                    <span className="font-heading font-bold text-primary text-lg">{t.year}</span>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-4 shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-dark z-10" />
                  </div>
                  <p className="text-white/70 leading-relaxed pt-0.5">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Our People</p>
          <h2 className="section-title mb-12">Leadership</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {leadership.map(l => (
              <div key={l.name} className="group cursor-pointer">
                <div className="img-zoom aspect-square overflow-hidden mb-4 rounded">
                  <img src={l.img} alt={l.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="font-heading font-bold text-dark group-hover:text-primary transition-colors">{l.name}</h3>
                <p className="text-mid-gray text-sm">{l.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading font-bold text-4xl mb-4">Let's Build Something Great Together</h2>
          <p className="text-white/80 text-lg mb-8">Whether you're planning a construction project or a real estate development, BTCONS has the expertise to make it exceptional.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-outline">Partner With Us</Link>
            <Link to="/projects" className="bg-white text-primary font-heading font-semibold uppercase tracking-widest text-sm px-8 py-3 hover:bg-white/90 transition-colors inline-block">View Our Work</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
