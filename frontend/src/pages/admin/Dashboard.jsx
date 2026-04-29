import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../admin/AdminLayout.jsx';
import { adminApi } from '../../admin/api.js';

function StatCard({ label, value, to, color }) {
  return (
    <Link to={to} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow block">
      <p className="text-3xl font-bold mb-1" style={{ color }}>{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, news: 0, jobs: 0, contacts: 0 });

  useEffect(() => {
    Promise.all([
      adminApi.getProjects(),
      adminApi.getNews(),
      adminApi.getJobs(),
      adminApi.getContacts(),
    ]).then(([projects, news, jobs, contacts]) => {
      setCounts({ projects: projects.length, news: news.length, jobs: jobs.length, contacts: contacts.length });
    }).catch(() => {});
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tổng quan</h1>
        <p className="text-gray-500 text-sm mb-8">Quản lý nội dung website BTCONS</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard label="Dự án"     value={counts.projects} to="/admin/projects" color="#244377" />
          <StatCard label="Tin tức"   value={counts.news}     to="/admin/news"     color="#C41230" />
          <StatCard label="Việc làm"  value={counts.jobs}     to="/admin/jobs"     color="#059669" />
          <StatCard label="Liên hệ"   value={counts.contacts} to="/admin/contacts" color="#d97706" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: '✎  Chỉnh sửa nội dung trang',   to: '/admin/content',  desc: 'Hero, stats, about text' },
            { label: '🏗  Quản lý dự án',              to: '/admin/projects', desc: 'Thêm, sửa, xóa dự án' },
            { label: '📰  Quản lý tin tức',            to: '/admin/news',     desc: 'Thêm, sửa, xóa bài viết' },
            { label: '💼  Quản lý tuyển dụng',         to: '/admin/jobs',     desc: 'Đăng & quản lý vị trí' },
          ].map(c => (
            <Link key={c.to} to={c.to}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{c.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{c.desc}</p>
              </div>
              <span className="text-gray-300 group-hover:text-gray-500 transition-colors text-lg">→</span>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
