import { NavLink, useNavigate, Navigate } from 'react-router-dom';

const NAV = [
  { to: '/admin',          label: 'Tổng quan',   icon: '▦', end: true },
  { to: '/admin/content',  label: 'Nội dung',    icon: '✎' },
  { to: '/admin/projects', label: 'Dự án',       icon: '🏗' },
  { to: '/admin/news',     label: 'Tin tức',     icon: '📰' },
  { to: '/admin/jobs',     label: 'Tuyển dụng',  icon: '💼' },
  { to: '/admin/contacts', label: 'Liên hệ',     icon: '📩' },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  if (!localStorage.getItem('btcons_admin_token')) return <Navigate to="/admin/login" replace />;
  function logout() {
    localStorage.removeItem('btcons_admin_token');
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#244377' }}>
        <div className="px-5 py-5 border-b border-white/10">
          <img src="/logo_foot.png" alt="BTCONS" className="h-10 w-auto object-contain" />
          <p className="text-white/50 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm transition-colors ${isActive ? 'bg-white/15 text-white font-semibold' : 'text-white/60 hover:text-white hover:bg-white/10'}`
              }>
              <span className="text-base w-5 text-center">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="mx-4 mb-5 text-xs text-white/40 hover:text-white/80 transition-colors text-left px-2 py-2">
          Đăng xuất →
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
