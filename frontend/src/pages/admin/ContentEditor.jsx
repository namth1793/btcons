import { useEffect, useState } from 'react';
import AdminLayout from '../../admin/AdminLayout.jsx';
import ImageUpload from '../../admin/ImageUpload.jsx';
import { adminApi } from '../../admin/api.js';

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

export default function ContentEditor() {
  const [content, setContent] = useState(null);
  const [saving, setSaving]   = useState({});
  const [saved,  setSaved]    = useState({});

  useEffect(() => {
    adminApi.getContent().then(setContent).catch(console.error);
  }, []);

  async function save(key, value) {
    setSaving(s => ({ ...s, [key]: true }));
    try {
      await adminApi.putContent(key, value);
      setSaved(s => ({ ...s, [key]: true }));
      setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000);
    } catch (e) { alert(e.message); }
    finally { setSaving(s => ({ ...s, [key]: false })); }
  }

  function update(section, field, value) {
    setContent(c => ({ ...c, [section]: Array.isArray(c[section])
      ? c[section]
      : { ...c[section], [field]: value }
    }));
  }

  function updateStat(i, field, value) {
    setContent(c => {
      const stats = [...c.stats];
      stats[i] = { ...stats[i], [field]: value };
      return { ...c, stats };
    });
  }

  if (!content) return <AdminLayout><div className="p-8 text-gray-400">Đang tải...</div></AdminLayout>;

  const hero  = content.hero  || {};
  const stats = content.stats || [];
  const about = content.about || {};

  function SaveBtn({ k }) {
    return (
      <button onClick={() => save(k, content[k])}
        disabled={saving[k]}
        className="px-4 py-1.5 text-sm text-white rounded transition-colors disabled:opacity-60"
        style={{ backgroundColor: saved[k] ? '#059669' : '#244377' }}>
        {saving[k] ? 'Đang lưu...' : saved[k] ? '✓ Đã lưu' : 'Lưu'}
      </button>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Chỉnh sửa nội dung</h1>
          <p className="text-gray-400 text-sm">Thay đổi sẽ hiển thị ngay trên website sau khi lưu.</p>
        </div>

        {/* Hero */}
        <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 border-b pb-2">Hero Section</h2>
          <Field label="Tiêu đề chính" value={hero.title || ''} onChange={v => update('hero', 'title', v)} multiline />
          <ImageUpload label="Ảnh nền Hero" value={hero.image_url || ''} onChange={v => update('hero', 'image_url', v)} />
          <div className="flex justify-end"><SaveBtn k="hero" /></div>
        </section>

        {/* Stats */}
        <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 border-b pb-2">Thống kê (Stats)</h2>
          {stats.map((s, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 pb-4 border-b last:border-0">
              <Field label={`Stat ${i + 1} - Giá trị`} value={s.value} onChange={v => updateStat(i, 'value', v)} />
              <Field label="Nhãn"                        value={s.label} onChange={v => updateStat(i, 'label', v)} />
              <Field label="Mô tả nhỏ"                   value={s.sub}   onChange={v => updateStat(i, 'sub',   v)} />
            </div>
          ))}
          <div className="flex justify-end"><SaveBtn k="stats" /></div>
        </section>

        {/* About */}
        <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 border-b pb-2">Giới thiệu (About)</h2>
          <Field label="Tiêu đề"  value={about.title || ''} onChange={v => update('about', 'title', v)} />
          <Field label="Nội dung" value={about.body  || ''} onChange={v => update('about', 'body',  v)} multiline />
          <div className="flex justify-end"><SaveBtn k="about" /></div>
        </section>
      </div>
    </AdminLayout>
  );
}
