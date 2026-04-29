import { useRef, useState } from 'react';
import { adminApi } from './api.js';

export default function ImageUpload({ value, onChange, label = 'Ảnh' }) {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true); setErr('');
    try {
      const url = await adminApi.uploadImage(file);
      onChange(url);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</label>
      <div className="flex gap-3 items-start">
        {value && <img src={value} alt="" className="w-24 h-16 object-cover rounded border border-gray-200 flex-shrink-0" />}
        <div className="flex-1">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button type="button" onClick={() => inputRef.current.click()}
            disabled={loading}
            className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50">
            {loading ? 'Đang tải...' : value ? 'Đổi ảnh' : 'Chọn ảnh'}
          </button>
          {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
          {value && (
            <input type="text" value={value} onChange={e => onChange(e.target.value)}
              className="mt-1 w-full text-xs border border-gray-200 rounded px-2 py-1 text-gray-500" placeholder="URL ảnh" />
          )}
        </div>
      </div>
    </div>
  );
}
