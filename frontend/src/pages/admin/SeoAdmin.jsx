import { useEffect, useState } from 'react';
import AdminLayout from '../../admin/AdminLayout.jsx';
import { adminApi } from '../../admin/api.js';

const PAGES = [
  { key: 'home',        label: '🏠 Trang chủ' },
  { key: 'building',    label: '🏗 Xây dựng' },
  { key: 'development', label: '🏢 Phát triển' },
  { key: 'projects',    label: '📁 Dự án' },
  { key: 'about',       label: 'ℹ Giới thiệu' },
  { key: 'careers',     label: '💼 Tuyển dụng' },
  { key: 'news',        label: '📰 Tin tức' },
  { key: 'contact',     label: '📩 Liên hệ' },
];

function Field({ label, value, onChange, multiline, hint }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</label>
      {hint && <p className="text-[11px] text-gray-400 mb-1">{hint}</p>}
      {multiline
        ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none" />
        : <input value={value || ''} onChange={e => onChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
      }
    </div>
  );
}

export default function SeoAdmin() {
  const [seo,     setSeo]     = useState(null);
  const [active,  setActive]  = useState('home');
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    adminApi.getContent()
      .then(c => setSeo(c.seo || {}))
      .catch(console.error);
  }, []);

  function updatePage(pageKey, field, value) {
    setSeo(s => ({
      ...s,
      [pageKey]: { ...(s[pageKey] || {}), [field]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await adminApi.putContent('seo', seo);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (!seo) {
    return <AdminLayout><div className="p-8 text-gray-400 text-sm">Đang tải...</div></AdminLayout>;
  }

  const pageData = seo[active] || {};
  const activeLabel = PAGES.find(p => p.key === active)?.label || '';

  /* Heuristics for preview */
  const previewTitle = pageData.title || '(chưa có tiêu đề)';
  const previewDesc  = pageData.description || '(chưa có mô tả)';

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 max-w-3xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">SEO — Meta Tags</h1>
          <p className="text-gray-400 text-sm mt-1">
            Tối ưu tiêu đề, mô tả và từ khóa cho từng trang. Chọn trang để chỉnh sửa.
          </p>
        </div>

        <div className="flex gap-5 flex-col md:flex-row">
          {/* Page list */}
          <div className="md:w-44 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {PAGES.map(p => (
                <button key={p.key} onClick={() => setActive(p.key)}
                  className={`w-full text-left px-4 py-3 text-sm border-b last:border-0 transition-colors ${
                    active === p.key
                      ? 'text-white font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={active === p.key ? { backgroundColor: '#244377' } : {}}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="font-semibold text-gray-800">{activeLabel}</h2>
                <button onClick={handleSave} disabled={saving}
                  className="px-5 py-2 text-sm text-white rounded transition-colors disabled:opacity-60 font-medium"
                  style={{ backgroundColor: saved ? '#059669' : '#244377' }}>
                  {saving ? 'Đang lưu...' : saved ? '✓ Đã lưu' : 'Lưu tất cả'}
                </button>
              </div>

              <Field
                label="Title (thẻ <title>)"
                hint="Hiển thị trên tab trình duyệt và kết quả tìm kiếm. Nên 50–60 ký tự."
                value={pageData.title}
                onChange={v => updatePage(active, 'title', v)}
              />
              <Field
                label="Description (meta description)"
                hint="Mô tả ngắn hiển thị dưới tiêu đề trong kết quả tìm kiếm. Nên 120–160 ký tự."
                value={pageData.description}
                onChange={v => updatePage(active, 'description', v)}
                multiline
              />
              <Field
                label="Keywords (meta keywords)"
                hint="Từ khóa phân cách bằng dấu phẩy. Ví dụ: xây dựng, BTCONS, nhà thầu"
                value={pageData.keywords}
                onChange={v => updatePage(active, 'keywords', v)}
              />

              {/* Char counters */}
              <div className="flex gap-4 text-[11px] text-gray-400">
                <span>Title: <b className={pageData.title?.length > 60 ? 'text-red-500' : 'text-gray-600'}>{pageData.title?.length || 0}</b>/60 ký tự</span>
                <span>Description: <b className={pageData.description?.length > 160 ? 'text-red-500' : 'text-gray-600'}>{pageData.description?.length || 0}</b>/160 ký tự</span>
              </div>
            </div>

            {/* Google preview */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Xem trước kết quả Google</p>
              <div className="border border-gray-200 rounded-lg p-4 space-y-1">
                <p className="text-[13px] text-blue-700 font-medium truncate">{previewTitle}</p>
                <p className="text-[11px] text-green-700">https://btcons.com/{active === 'home' ? '' : active}</p>
                <p className="text-[12px] text-gray-600 line-clamp-2">{previewDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
