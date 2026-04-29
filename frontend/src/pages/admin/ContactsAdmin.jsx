import { useEffect, useState } from 'react';
import AdminLayout from '../../admin/AdminLayout.jsx';
import { adminApi } from '../../admin/api.js';

export default function ContactsAdmin() {
  const [list, setList]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  function load() { adminApi.getContacts().then(setList).finally(() => setLoading(false)); }
  useEffect(load, []);

  async function handleDelete(id) {
    if (!confirm('Xóa tin nhắn này?')) return;
    await adminApi.deleteContact(id);
    setSelected(null);
    load();
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tin nhắn liên hệ</h1>
          <p className="text-gray-400 text-sm">{list.length} tin nhắn</p>
        </div>

        {loading ? <p className="text-gray-400">Đang tải...</p> : list.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-400">Chưa có tin nhắn nào</div>
        ) : (
          <div className="flex gap-5">
            {/* List */}
            <div className="w-80 flex-shrink-0 space-y-2">
              {list.map(c => (
                <button key={c.id} onClick={() => setSelected(c)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${selected?.id === c.id ? 'border-blue-300 bg-blue-50' : 'bg-white border-gray-100 hover:border-gray-300'}`}>
                  <p className="font-semibold text-gray-800 text-sm truncate">{c.name}</p>
                  <p className="text-gray-500 text-xs truncate">{c.email}</p>
                  <p className="text-gray-400 text-xs mt-1">{c.created_at?.slice(0, 16)}</p>
                </button>
              ))}
            </div>

            {/* Detail */}
            {selected ? (
              <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{selected.name}</h2>
                    <p className="text-gray-500 text-sm">{selected.email}</p>
                  </div>
                  <button onClick={() => handleDelete(selected.id)}
                    className="text-xs px-3 py-1.5 border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors">
                    Xóa
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                  {selected.company && <div><span className="text-gray-400">Công ty:</span> <span className="text-gray-700">{selected.company}</span></div>}
                  {selected.phone   && <div><span className="text-gray-400">Điện thoại:</span> <span className="text-gray-700">{selected.phone}</span></div>}
                  {selected.division && <div><span className="text-gray-400">Mảng:</span> <span className="text-gray-700 capitalize">{selected.division}</span></div>}
                  <div><span className="text-gray-400">Ngày gửi:</span> <span className="text-gray-700">{selected.created_at?.slice(0, 16)}</span></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Nội dung</p>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
                <a href={`mailto:${selected.email}`}
                  className="inline-block mt-4 px-4 py-2 text-sm text-white rounded transition-colors"
                  style={{ backgroundColor: '#244377' }}>
                  Trả lời qua Email
                </a>
              </div>
            ) : (
              <div className="flex-1 bg-white rounded-xl shadow-sm p-12 text-center text-gray-400">
                Chọn một tin nhắn để xem chi tiết
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
