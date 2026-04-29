import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const buildingDropdown = [
  { label: 'Dịch vụ', items: ['Quản lý xây dựng', 'Thiết kế & Thi công', 'Giao dự án tích hợp', 'Thiết kế & Thi công ảo', 'Chiến lược bền vững', 'Quản lý cơ sở vật chất'] },
  { label: 'Lĩnh vực', items: ['Y tế', 'Đại học', 'Giáo dục phổ thông', 'Khoa học sự sống', 'Trung tâm dữ liệu', 'Thể thao & Giải trí', 'Giao thông vận tải', 'Chính phủ'] },
];

const developmentDropdown = [
  { label: 'Dịch vụ', items: ['Mua lại', 'Phát triển', 'Tài chính & Tư vấn', 'Quản lý tài sản', 'Lập kế hoạch chiến lược', 'Đối tác công tư (PPP)'] },
  { label: 'Lĩnh vực', items: ['Chung cư', 'Nhà ở sinh viên', 'Nhà ở giá rẻ', 'Đa chức năng', 'Thương mại', 'Y tế', 'Chính phủ'] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMobileExpanded(''); }, [location]);

  const navBg = (!isHome || scrolled || mobileOpen) ? 'bg-white shadow-lg' : 'bg-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      {/* Thanh tiện ích */}
      <div className="hidden lg:flex items-center justify-end px-8 py-1 border-b border-black/10">
        <div className="flex items-center gap-6 text-xs text-black/60 font-sans">
          <Link to="/news" className="transition-colors">Tin tức</Link>
          <Link to="/contact" className="transition-colors">Liên hệ</Link>
          <a href="#" className="transition-colors">Văn phòng</a>
        </div>
      </div>

      {/* Nav chính */}
      <nav className="flex items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="BTCONS" className="h-14 lg:h-20 w-auto object-contain rounded" />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {/* Xây dựng */}
          <li className="nav-item relative group">
            <Link to="/building" className="flex items-center gap-1 px-4 py-2 text-black/90 font-heading font-semibold text-sm uppercase tracking-wider transition-colors">
              Xây dựng
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </Link>
            <div className="nav-dropdown absolute top-full left-0 w-[520px] bg-dark border-t-4 border-primary shadow-2xl p-6 grid grid-cols-2 gap-6">
              {buildingDropdown.map(col => (
                <div key={col.label}>
                  <p className="text-primary font-heading font-bold text-xs uppercase tracking-widest mb-3">{col.label}</p>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item}><Link to="/building" className="text-white/70 hover:text-white text-sm transition-colors">{item}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2 pt-3 border-t border-white/10">
                <Link to="/building" className="text-primary text-sm font-heading font-semibold hover:underline">Xem tất cả dịch vụ xây dựng →</Link>
              </div>
            </div>
          </li>

          {/* Phát triển */}
          <li className="nav-item relative group">
            <Link to="/development" className="flex items-center gap-1 px-4 py-2 text-black/90 font-heading font-semibold text-sm uppercase tracking-wider transition-colors">
              Phát triển
              <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </Link>
            <div className="nav-dropdown absolute top-full left-0 w-[520px] bg-dark border-t-4 border-primary shadow-2xl p-6 grid grid-cols-2 gap-6">
              {developmentDropdown.map(col => (
                <div key={col.label}>
                  <p className="text-primary font-heading font-bold text-xs uppercase tracking-widest mb-3">{col.label}</p>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item}><Link to="/development" className="text-white/70 hover:text-white text-sm transition-colors">{item}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2 pt-3 border-t border-white/10">
                <Link to="/development" className="text-primary text-sm font-heading font-semibold hover:underline">Xem tất cả dịch vụ phát triển →</Link>
              </div>
            </div>
          </li>

          {[{ label: 'Dự án', to: '/projects' }, { label: 'Giới thiệu', to: '/about' }, { label: 'Tuyển dụng', to: '/careers' }].map(link => (
            <li key={link.label}>
              <Link to={link.to} className="px-4 py-2 text-black/90 font-heading font-semibold text-sm uppercase tracking-wider transition-colors block">
                {link.label}
              </Link>
            </li>
          ))}

          <li className="ml-3">
            <Link to="/contact" className="btn-primary text-xs py-2.5 px-5">Hợp tác với chúng tôi</Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-black p-2" aria-label="Toggle menu">
          <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-black transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-dark border-t border-black/10 pb-6">
          {[
            { label: 'Xây dựng',      to: '/building' },
            { label: 'Phát triển',    to: '/development' },
            { label: 'Dự án',         to: '/projects' },
            { label: 'Giới thiệu',    to: '/about' },
            { label: 'Tuyển dụng',    to: '/careers' },
            { label: 'Tin tức',       to: '/news' },
            { label: 'Liên hệ',       to: '/contact' },
          ].map(item => (
            <div key={item.label}>
              <Link to={item.to} className="block px-6 py-3 text-white font-heading font-semibold text-sm uppercase tracking-wider border-b border-white/5 hover:text-primary transition-colors">
                {item.label}
              </Link>
            </div>
          ))}
          <div className="px-6 pt-4">
            <Link to="/contact" className="btn-primary block text-center">Hợp tác với chúng tôi</Link>
          </div>
        </div>
      )}
    </header>
  );
}
