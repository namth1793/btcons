import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../admin/api.js';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); setErr(''); setLoading(true);
    try {
      const { token } = await adminApi.login(form.username, form.password);
      localStorage.setItem('btcons_admin_token', token);
      navigate('/admin');
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="/logo_foot.png" alt="BTCONS" className="h-12 object-contain" style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(190deg)' }} />
        </div>
        <h1 className="text-xl font-bold text-center text-gray-800 mb-6">Đăng nhập Admin</h1>
        {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded mb-4">{err}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Tên đăng nhập</label>
            <input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" autoFocus required />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Mật khẩu</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 text-white text-sm font-semibold rounded transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#244377' }}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <p className="text-center mt-4 text-xs text-gray-400">
          <a href="/" className="hover:text-gray-600">← Về trang chủ</a>
        </p>
      </div>
    </div>
  );
}
