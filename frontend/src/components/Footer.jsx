import { Link } from 'react-router-dom';


const cols = [
  {
    heading: 'Building',
    links: [
      { label: 'Our Approach', to: '/building' },
      { label: 'Services', to: '/building' },
      { label: 'Markets', to: '/building' },
      { label: 'Locations', to: '/building' },
      { label: 'Leadership', to: '/about' },
    ]
  },
  {
    heading: 'Development',
    links: [
      { label: 'Services', to: '/development' },
      { label: 'Markets', to: '/development' },
      { label: 'Locations', to: '/development' },
      { label: 'Leadership', to: '/about' },
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About BTCONS', to: '/about' },
      { label: 'Projects', to: '/projects' },
      { label: 'News', to: '/news' },
      { label: 'Careers', to: '/careers' },
      { label: 'Partner With Us', to: '/contact' },
    ]
  },
];

const socialBuilding = [
  { name: 'LinkedIn', href: '#', icon: 'in' },
  { name: 'Twitter', href: '#', icon: 'X' },
  { name: 'Facebook', href: '#', icon: 'f' },
  { name: 'YouTube', href: '#', icon: '▶' },
];

const socialDev = [
  { name: 'LinkedIn', href: '#', icon: 'in' },
  { name: 'Instagram', href: '#', icon: '◎' },
  { name: 'Facebook', href: '#', icon: 'f' },
];

export default function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: '#244377' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-2">
              <img src="/logo_foot.png" alt="BTCONS" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-white text-sm leading-relaxed mb-6">
              A leading global builder and real estate developer — innovative, solutions-driven, and community-focused for over 150 years.
            </p>
            <div className="mb-4">
              <p className="text-white text-xs uppercase tracking-widest mb-2 font-heading">Building</p>
              <div className="flex gap-2">
                {socialBuilding.map(s => (
                  <a key={s.name} href={s.href} title={s.name}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-primary text-white text-xs font-bold transition-colors rounded-sm">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white text-xs uppercase tracking-widest mb-2 font-heading">Development</p>
              <div className="flex gap-2">
                {socialDev.map(s => (
                  <a key={s.name} href={s.href} title={s.name}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-primary text-white text-xs font-bold transition-colors rounded-sm">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-white mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-white hover:text-white/70 text-sm transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white text-xs">© {new Date().getFullYear()} BTCONS, Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'Site Map'].map(item => (
              <a key={item} href="#" className="text-white hover:text-white/70 text-xs transition-colors">{item}</a>
            ))}
            <Link to="/admin/login" className="text-white/30 hover:text-white/60 text-xs transition-colors">admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
