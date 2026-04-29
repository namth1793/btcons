import { useEffect, useState } from 'react';
import AdminLayout from '../../admin/AdminLayout.jsx';
import { adminApi } from '../../admin/api.js';

const EMPTY = { title: '', department: '', location: '', type: 'Full-time', description: '' };

function Field({ label, value, onChange, multiline }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={5}
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
          <h3 className="font-semibold text-gray-800">{item.id ? 'Sửa vị trí' : 'Thêm vị trí tuyển dụng'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <Field label="Vị trí *" value={form.title} onChange={v => set('title', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phòng ban" value={form.department} onChange={v => set('department', v)} />
            <Field label="Địa điểm"  value={form.location}   onChange={v => set('location',   v)} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Hình thức</label>
            <select value={form.type} onChange={e => set('type', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400">
              {['Full-time','Part-time','Contract','Internship'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <Field label="Mô tả công việc" value={form.description} onChange={v => set('description', v)} multiline />
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

export default function JobsAdmin() {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);

  function load() { adminApi.getJobs().then(setList).finally(() => setLoading(false)); }
  useEffect(load, []);

  async function handleSave(form) {
    if (form.id) await adminApi.updateJob(form.id, form);
    else         await adminApi.createJob(form);
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Xóa vị trí này?')) return;
    await adminApi.deleteJob(id); load();
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tuyển dụng</h1>
            <p className="text-gray-400 text-sm">{list.length} vị trí</p>
          </div>
          <button onClick={() => setModal(EMPTY)}
            className="px-4 py-2 text-sm text-white rounded transition-colors" style={{ backgroundColor: '#244377' }}>
            + Thêm vị trí
          </button>
        </div>

        {loading ? <p className="text-gray-400">Đang tải...</p> : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>{['Vị trí','Phòng ban','Địa điểm','Hình thức',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list.map(j => (
                  <tr key={j.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{j.title}</td>
                    <td className="px-4 py-3 text-gray-500">{j.department}</td>
                    <td className="px-4 py-3 text-gray-500">{j.location}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{j.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setModal(j)} className="text-xs px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Sửa</button>
                        <button onClick={() => handleDelete(j.id)} className="text-xs px-3 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50">Xóa</button>
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
