import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../admin/AdminLayout.jsx';
import ImageUpload from '../../admin/ImageUpload.jsx';
import { adminApi } from '../../admin/api.js';

/* ── Reusable field ── */
function Field({ label, value, onChange, multiline, hint }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {multiline
        ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none" />
        : <input value={value || ''} onChange={e => onChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
      }
    </div>
  );
}

/* ── Save button ── */
function SaveBtn({ saving, saved, onClick, label = 'Lưu' }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="px-5 py-2 text-sm text-white rounded transition-colors disabled:opacity-60 font-medium"
      style={{ backgroundColor: saved ? '#059669' : '#244377' }}>
      {saving ? 'Đang lưu...' : saved ? '✓ Đã lưu' : label}
    </button>
  );
}

/* ── Section wrapper ── */
function Section({ title, desc, children, onSave, saving, saved }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 space-y-4">
      <div className="flex items-start justify-between gap-4 border-b pb-3">
        <div>
          <h2 className="font-semibold text-gray-800">{title}</h2>
          {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
        </div>
        <SaveBtn saving={saving} saved={saved} onClick={onSave} />
      </div>
      {children}
    </div>
  );
}

/* ── Editable list (array of strings) ── */
function EditableList({ items, onChange }) {
  function updateItem(i, val) {
    const next = [...items];
    next[i] = val;
    onChange(next);
  }
  function addItem() { onChange([...items, '']); }
  function removeItem(i) { onChange(items.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input value={item} onChange={e => updateItem(i, e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
          <button onClick={() => removeItem(i)}
            className="px-3 py-2 text-red-400 hover:text-red-600 border border-gray-200 rounded hover:bg-red-50 text-sm transition-colors">
            ✕
          </button>
        </div>
      ))}
      <button onClick={addItem}
        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1">
        + Thêm mục
      </button>
    </div>
  );
}

const SECTIONS = [
  { s: 'hero',               label: 'Hero' },
  { s: 'stats',              label: 'Thống kê' },
  { s: 'about',              label: 'Về chúng tôi' },
  { s: 'building',           label: 'Xây dựng — Tên mục' },
  { s: 'building-services',  label: 'Xây dựng — Dịch vụ' },
  { s: 'building-markets',   label: 'Xây dựng — Lĩnh vực' },
  { s: 'development',        label: 'Phát triển — Tên mục' },
  { s: 'dev-services',       label: 'Phát triển — Dịch vụ' },
  { s: 'dev-markets',        label: 'Phát triển — Lĩnh vực' },
  { s: 'menu',               label: 'Nhãn menu chính' },
];

export default function ContentEditor() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const currentS = params.get('s') || 'hero';

  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState({});
  const [saved,  setSaved]  = useState({});

  useEffect(() => {
    adminApi.getContent().then(setContent).catch(console.error);
  }, []);

  async function save(key, value) {
    setSaving(s => ({ ...s, [key]: true }));
    try {
      await adminApi.putContent(key, value);
      setSaved(s => ({ ...s, [key]: true }));
      setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2500);
    } catch (e) { alert(e.message); }
    finally { setSaving(s => ({ ...s, [key]: false })); }
  }

  function updateField(key, field, value) {
    setContent(c => ({ ...c, [key]: { ...c[key], [field]: value } }));
  }

  function updateStat(i, field, value) {
    setContent(c => {
      const stats = [...c.stats];
      stats[i] = { ...stats[i], [field]: value };
      return { ...c, stats };
    });
  }

  function updateNavbar(path, value) {
    setContent(c => {
      const navbar = { ...c.navbar };
      if (path.length === 1) {
        navbar[path[0]] = value;
      } else if (path.length === 2) {
        navbar[path[0]] = { ...navbar[path[0]], [path[1]]: value };
      } else if (path.length === 3) {
        const arr = [...(navbar[path[0]] || [])];
        arr[path[1]] = { ...arr[path[1]], [path[2]]: value };
        navbar[path[0]] = arr;
      }
      return { ...c, navbar };
    });
  }

  if (!content) {
    return (
      <AdminLayout>
        <div className="p-8 text-gray-400 text-sm">Đang tải...</div>
      </AdminLayout>
    );
  }

  const hero    = content.hero    || {};
  const stats   = content.stats   || [];
  const about   = content.about   || {};
  const navbar  = content.navbar  || {};
  const links   = navbar.links    || {};
  const bDrop   = navbar.buildingDropdown    || [{ label: 'Dịch vụ', items: [] }, { label: 'Lĩnh vực', items: [] }];
  const dDrop   = navbar.developmentDropdown || [{ label: 'Dịch vụ', items: [] }, { label: 'Lĩnh vực', items: [] }];

  /* ── Render section based on ?s= ── */
  function renderSection() {
    switch (currentS) {

      /* ─── HERO ─── */
      case 'hero':
        return (
          <Section title="Hero Section" desc="Tiêu đề và ảnh nền trang chủ."
            onSave={() => save('hero', content.hero)} saving={saving.hero} saved={saved.hero}>
            <Field label="Tiêu đề chính" value={hero.title} onChange={v => updateField('hero', 'title', v)} multiline />
            <ImageUpload label="Ảnh nền Hero" value={hero.image_url} onChange={v => updateField('hero', 'image_url', v)} />
          </Section>
        );

      /* ─── STATS ─── */
      case 'stats':
        return (
          <Section title="Thống kê (Stats)" desc="4 chỉ số hiển thị dưới hero."
            onSave={() => save('stats', content.stats)} saving={saving.stats} saved={saved.stats}>
            {stats.map((s, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4 border-b last:border-0">
                <Field label={`Stat ${i + 1} — Giá trị`} value={s.value} onChange={v => updateStat(i, 'value', v)} />
                <Field label="Nhãn"      value={s.label} onChange={v => updateStat(i, 'label', v)} />
                <Field label="Mô tả nhỏ" value={s.sub}   onChange={v => updateStat(i, 'sub',   v)} />
              </div>
            ))}
          </Section>
        );

      /* ─── ABOUT ─── */
      case 'about':
        return (
          <Section title="Về chúng tôi (About)" desc="Đoạn giới thiệu ngắn trên trang chủ."
            onSave={() => save('about', content.about)} saving={saving.about} saved={saved.about}>
            <Field label="Tiêu đề"  value={about.title} onChange={v => updateField('about', 'title', v)} />
            <Field label="Nội dung" value={about.body}  onChange={v => updateField('about', 'body',  v)} multiline />
          </Section>
        );

      /* ─── BUILDING label ─── */
      case 'building':
        return (
          <Section title="Xây dựng — Tên & Nhãn" desc="Tên hiển thị của mục Xây dựng trên menu và text nút xem tất cả."
            onSave={() => save('navbar', content.navbar)} saving={saving.navbar} saved={saved.navbar}>
            <Field label="Tên menu (Xây dựng)" value={links.building}
              onChange={v => updateNavbar(['links', 'building'], v)} />
            <Field label="Text nút 'Xem tất cả'" value={navbar.buildingViewAll}
              onChange={v => updateNavbar(['buildingViewAll'], v)} />
            <Field label="Nhãn cột Dịch vụ" value={bDrop[0]?.label}
              onChange={v => updateNavbar(['buildingDropdown', 0, 'label'], v)} />
            <Field label="Nhãn cột Lĩnh vực" value={bDrop[1]?.label}
              onChange={v => updateNavbar(['buildingDropdown', 1, 'label'], v)} />
          </Section>
        );

      /* ─── BUILDING services ─── */
      case 'building-services':
        return (
          <Section title="Xây dựng — Danh sách Dịch vụ" desc="Các dịch vụ hiển thị trong dropdown Xây dựng."
            onSave={() => save('navbar', content.navbar)} saving={saving.navbar} saved={saved.navbar}>
            <EditableList
              items={bDrop[0]?.items || []}
              onChange={val => updateNavbar(['buildingDropdown', 0, 'items'], val)}
            />
          </Section>
        );

      /* ─── BUILDING markets ─── */
      case 'building-markets':
        return (
          <Section title="Xây dựng — Danh sách Lĩnh vực" desc="Các lĩnh vực hiển thị trong dropdown Xây dựng."
            onSave={() => save('navbar', content.navbar)} saving={saving.navbar} saved={saved.navbar}>
            <EditableList
              items={bDrop[1]?.items || []}
              onChange={val => updateNavbar(['buildingDropdown', 1, 'items'], val)}
            />
          </Section>
        );

      /* ─── DEVELOPMENT label ─── */
      case 'development':
        return (
          <Section title="Phát triển — Tên & Nhãn" desc="Tên mục Phát triển trên menu và text nút xem tất cả."
            onSave={() => save('navbar', content.navbar)} saving={saving.navbar} saved={saved.navbar}>
            <Field label="Tên menu (Phát triển)" value={links.development}
              onChange={v => updateNavbar(['links', 'development'], v)} />
            <Field label="Text nút 'Xem tất cả'" value={navbar.developmentViewAll}
              onChange={v => updateNavbar(['developmentViewAll'], v)} />
            <Field label="Nhãn cột Dịch vụ" value={dDrop[0]?.label}
              onChange={v => updateNavbar(['developmentDropdown', 0, 'label'], v)} />
            <Field label="Nhãn cột Lĩnh vực" value={dDrop[1]?.label}
              onChange={v => updateNavbar(['developmentDropdown', 1, 'label'], v)} />
          </Section>
        );

      /* ─── DEV services ─── */
      case 'dev-services':
        return (
          <Section title="Phát triển — Danh sách Dịch vụ" desc="Các dịch vụ hiển thị trong dropdown Phát triển."
            onSave={() => save('navbar', content.navbar)} saving={saving.navbar} saved={saved.navbar}>
            <EditableList
              items={dDrop[0]?.items || []}
              onChange={val => updateNavbar(['developmentDropdown', 0, 'items'], val)}
            />
          </Section>
        );

      /* ─── DEV markets ─── */
      case 'dev-markets':
        return (
          <Section title="Phát triển — Danh sách Lĩnh vực" desc="Các lĩnh vực hiển thị trong dropdown Phát triển."
            onSave={() => save('navbar', content.navbar)} saving={saving.navbar} saved={saved.navbar}>
            <EditableList
              items={dDrop[1]?.items || []}
              onChange={val => updateNavbar(['developmentDropdown', 1, 'items'], val)}
            />
          </Section>
        );

      /* ─── MENU labels ─── */
      case 'menu':
        return (
          <Section title="Nhãn menu chính" desc="Tên hiển thị của các mục trên thanh điều hướng."
            onSave={() => save('navbar', content.navbar)} saving={saving.navbar} saved={saved.navbar}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'building',    label: 'Xây dựng' },
                { key: 'development', label: 'Phát triển' },
                { key: 'projects',    label: 'Dự án' },
                { key: 'about',       label: 'Giới thiệu' },
                { key: 'careers',     label: 'Tuyển dụng' },
                { key: 'news',        label: 'Tin tức' },
                { key: 'contact',     label: 'Liên hệ' },
                { key: 'cta',         label: 'Nút CTA' },
              ].map(({ key, label }) => (
                <Field key={key} label={label} value={links[key]}
                  onChange={v => updateNavbar(['links', key], v)} />
              ))}
            </div>
          </Section>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 text-gray-400 text-sm">
            Chọn một mục từ sidebar để bắt đầu chỉnh sửa.
          </div>
        );
    }
  }

  const currentLabel = SECTIONS.find(s => s.s === currentS)?.label || 'Nội dung';

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 max-w-3xl space-y-6">
        {/* Header + quick nav */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Chỉnh sửa: {currentLabel}</h1>
          <p className="text-gray-400 text-sm mt-1">Thay đổi hiển thị ngay trên website sau khi lưu.</p>
          {/* Quick section tabs (scrollable on mobile) */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            {SECTIONS.map(sec => (
              <button key={sec.s}
                onClick={() => navigate(`/admin/content?s=${sec.s}`)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentS === sec.s
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={currentS === sec.s ? { backgroundColor: '#244377' } : {}}>
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {renderSection()}
      </div>
    </AdminLayout>
  );
}
