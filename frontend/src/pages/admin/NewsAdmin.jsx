import { useEffect, useState } from 'react';
import AdminLayout from '../../admin/AdminLayout.jsx';
import ImageUpload from '../../admin/ImageUpload.jsx';
import { adminApi } from '../../admin/api.js';

const EMPTY = { title: '', category: '', excerpt: '', image_url: '', published_date: new Date().toISOString().slice(0, 10), division: 'building' };

function Field({ label, value, onChange, multiline }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none" />
        : <input value={value} onChange={e => onChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
      }
    </div>
  );
}

function Modal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault(); setLoading(true);
    try { await onSave(form); onClose(); }
    catch (e) { alert(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">{item.id ? 'Sửa bài viết' : 'Thêm bài viết'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <Field label="Tiêu đề *" value={form.title} onChange={v => set('title', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Danh mục" value={form.category} onChange={v => set('category', v)} />
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Mảng</label>
              <select value={form.division} onChange={e => set('division', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400">
                <option value="building">Building</option>
                <option value="development">Development</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Ngày đăng</label>
            <input type="date" value={form.published_date} onChange={e => set('published_date', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <Field label="Tóm tắt" value={form.excerpt} onChange={v => set('excerpt', v)} multiline />
          <ImageUpload label="Ảnh bài viết" value={form.image_url} onChange={v => set('image_url', v)} />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">Hủy</button>
            <button type="submit" disabled={loading}
              className="px-5 py-2 text-sm text-white rounded disabled:opacity-60"
              style={{ backgroundColor: '#244377' }}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewsAdmin() {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);

  function load() { adminApi.getNews().then(setList).finally(() => setLoading(false)); }
  useEffect(load, []);

  async function handleSave(form) {
    if (form.id) await adminApi.updateNews(form.id, form);
    else         await adminApi.createNews(form);
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Xóa bài viết này?')) return;
    await adminApi.deleteNews(id); load();
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tin tức</h1>
            <p className="text-gray-400 text-sm">{list.length} bài viết</p>
          </div>
          <button onClick={() => setModal(EMPTY)}
            className="px-4 py-2 text-sm text-white rounded transition-colors" style={{ backgroundColor: '#244377' }}>
            + Thêm bài viết
          </button>
        </div>

        {loading ? <p className="text-gray-400">Đang tải...</p> : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>{['Ảnh','Tiêu đề','Danh mục','Ngày đăng',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list.map(n => (
                  <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      {n.image_url ? <img src={n.image_url} alt="" className="w-14 h-10 object-cover rounded" /> : <div className="w-14 h-10 bg-gray-100 rounded" />}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{n.title}</td>
                    <td className="px-4 py-3 text-gray-500">{n.category}</td>
                    <td className="px-4 py-3 text-gray-500">{n.published_date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setModal(n)} className="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Sửa</button>
                        <button onClick={() => handleDelete(n.id)} className="text-xs px-3 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50">Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && <Modal item={modal} onClose={() => setModal(null)} onSave={handleSave} />}
    </AdminLayout>
  );
}
