import { useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

const SIDEBAR_GROUPS = [
  {
    id: 'overview',
    items: [
      { label: 'Tổng quan', icon: '▦', to: '/admin', exact: true },
    ],
  },
  {
    id: 'homepage',
    title: 'TRANG CHỦ',
    collapsible: true,
    defaultOpen: true,
    items: [
      { label: 'Hero',         icon: '🖼', to: '/admin/content', s: 'hero' },
      { label: 'Thống kê',     icon: '📊', to: '/admin/content', s: 'stats' },
      { label: 'Về chúng tôi', icon: 'ℹ',  to: '/admin/content', s: 'about' },
    ],
  },
  {
    id: 'building',
    title: 'XÂY DỰNG',
    collapsible: true,
    defaultOpen: false,
    items: [
      { label: 'Tên mục',  icon: '✏', to: '/admin/content', s: 'building' },
      { label: 'Dịch vụ',  icon: '⚙', to: '/admin/content', s: 'building-services' },
      { label: 'Lĩnh vực', icon: '🏢', to: '/admin/content', s: 'building-markets' },
    ],
  },
  {
    id: 'development',
    title: 'PHÁT TRIỂN',
    collapsible: true,
    defaultOpen: false,
    items: [
      { label: 'Tên mục',  icon: '✏', to: '/admin/content', s: 'development' },
      { label: 'Dịch vụ',  icon: '⚙', to: '/admin/content', s: 'dev-services' },
      { label: 'Lĩnh vực', icon: '🏢', to: '/admin/content', s: 'dev-markets' },
    ],
  },
  {
    id: 'navlabels',
    title: 'MENU CHÍNH',
    collapsible: true,
    defaultOpen: false,
    items: [
      { label: 'Nhãn menu', icon: '📋', to: '/admin/content', s: 'menu' },
    ],
  },
  {
    id: 'manage',
    title: 'QUẢN LÝ',
    items: [
      { label: 'Dự án',          icon: '🏗', to: '/admin/projects' },
      { label: 'Tin tức',         icon: '📰', to: '/admin/news' },
      { label: 'Tuyển dụng',     icon: '💼', to: '/admin/jobs' },
      { label: 'Liên hệ (Inbox)', icon: '📩', to: '/admin/contacts' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    items: [
      { label: 'Meta Tags', icon: '🔍', to: '/admin/seo' },
    ],
  },
];

function SidebarItem({ item, onClose }) {
  const location = useLocation();
  const currentS = new URLSearchParams(location.search).get('s');

  let isActive;
  if (item.exact) {
    isActive = location.pathname === item.to && !location.search;
  } else if (item.s) {
    isActive = location.pathname === item.to && currentS === item.s;
  } else {
    isActive = location.pathname.startsWith(item.to);
  }

  const href = item.s ? `${item.to}?s=${item.s}` : item.to;

  return (
    <Link
      to={href}
      onClick={onClose}
      className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors ${
        isActive
          ? 'bg-white/20 text-white font-semibold'
          : 'text-white/60 hover:text-white hover:bg-white/10'
      }`}
    >
      <span className="w-5 text-center flex-shrink-0 text-base">{item.icon}</span>
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function SidebarGroup({ group, onClose }) {
  const [open, setOpen] = useState(group.defaultOpen !== false);

  return (
    <div className="py-1">
      {group.title ? (
        group.collapsible ? (
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-1.5 text-white/35 text-[10px] font-bold uppercase tracking-widest hover:text-white/60 transition-colors"
          >
            {group.title}
            <span className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>›</span>
          </button>
        ) : (
          <p className="px-4 py-1.5 text-white/35 text-[10px] font-bold uppercase tracking-widest">{group.title}</p>
        )
      ) : null}

      {(!group.collapsible || open) && (
        <div className="space-y-0.5 mt-0.5">
          {group.items.map(item => (
            <SidebarItem key={item.to + (item.s || '')} item={item} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarContent({ onClose, onLogout }) {
  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#244377' }}>
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/10 flex-shrink-0 flex items-center justify-between">
        <div>
          <img src="/logo_foot.png" alt="BTCONS" className="h-9 w-auto object-contain" />
          <p className="text-white/40 text-[11px] mt-0.5">Admin Panel</p>
        </div>
        {/* Close button (mobile only) */}
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-white/50 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto space-y-0.5">
        {SIDEBAR_GROUPS.map(g => (
          <SidebarGroup key={g.id} group={g} onClose={onClose} />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-white/10 flex-shrink-0">
        <button
          onClick={onLogout}
          className="text-xs text-white/40 hover:text-white/80 transition-colors flex items-center gap-2"
        >
          <span>⎋</span> Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!localStorage.getItem('btcons_admin_token')) return <Navigate to="/admin/login" replace />;

  function logout() {
    localStorage.removeItem('btcons_admin_token');
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Desktop sidebar — fixed */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 fixed inset-y-0 left-0 z-40">
        <SidebarContent onLogout={logout} />
      </aside>

      {/* Mobile sidebar — slide-over */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 flex-shrink-0">
            <SidebarContent onClose={() => setSidebarOpen(false)} onLogout={logout} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Mở menu"
          >
            <svg className="w-5 h-5" style={{ color: '#244377' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img src="/logo_foot.png" alt="BTCONS" className="h-7 w-auto object-contain" />
          <span className="text-xs text-gray-400 ml-auto font-medium">Admin</span>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
