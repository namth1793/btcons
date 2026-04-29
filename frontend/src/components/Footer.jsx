import { Link } from 'react-router-dom';


const cols = [
  {
    heading: 'Xây dựng',
    links: [
      { label: 'Phương pháp',   to: '/building' },
      { label: 'Dịch vụ',      to: '/building' },
      { label: 'Lĩnh vực',     to: '/building' },
      { label: 'Văn phòng',    to: '/building' },
      { label: 'Ban lãnh đạo', to: '/about' },
    ]
  },
  {
    heading: 'Phát triển',
    links: [
      { label: 'Dịch vụ',      to: '/development' },
      { label: 'Lĩnh vực',     to: '/development' },
      { label: 'Văn phòng',    to: '/development' },
      { label: 'Ban lãnh đạo', to: '/about' },
    ]
  },
  {
    heading: 'Công ty',
    links: [
      { label: 'Về BTCONS',         to: '/about' },
      { label: 'Dự án',             to: '/projects' },
      { label: 'Tin tức',           to: '/news' },
      { label: 'Tuyển dụng',        to: '/careers' },
      { label: 'Hợp tác với chúng tôi', to: '/contact' },
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
              Nhà thầu xây dựng & phát triển bất động sản hàng đầu — sáng tạo, hiệu quả và hướng đến cộng đồng trong suốt hơn 150 năm.
            </p>
            <div className="mb-4">
              <p className="text-white text-xs uppercase tracking-widest mb-2 font-heading">Xây dựng</p>
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
              <p className="text-white text-xs uppercase tracking-widest mb-2 font-heading">Phát triển</p>
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
          <p className="text-white text-xs">© {new Date().getFullYear()} BTCONS, Inc. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-6">
            {['Chính sách bảo mật', 'Điều khoản sử dụng', 'Sơ đồ trang'].map(item => (
              <a key={item} href="#" className="text-white hover:text-white/70 text-xs transition-colors">{item}</a>
            ))}
            <Link to="/admin/login" className="text-white/30 hover:text-white/60 text-xs transition-colors">admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
