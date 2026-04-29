import { useState, useEffect } from 'react';
import { API } from '../config.js';

export default function News() {
  const [news,    setNews]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('Tất cả');

  useEffect(() => {
    fetch(`${API}/news`).then(r => r.json()).then(data => { setNews(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const divisions = ['Tất cả', 'Building', 'Development'];
  const filtered  = filter === 'Tất cả' ? news : news.filter(n => n.division === filter);
  const formatDate = d => new Date(d).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-52 md:h-64 flex items-end pb-8 md:pb-10">
        <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80" alt="Tin tức" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/70" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">Cập nhật mới nhất</p>
          <h1 className="font-heading font-bold text-2xl sm:text-5xl md:text-6xl">Tin tức & Báo chí</h1>
        </div>
      </section>

      {/* Bộ lọc */}
      <section className="bg-dark py-4 sticky top-14 lg:top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-3">
          {divisions.map(d => (
            <button key={d} onClick={() => setFilter(d)}
              className={`px-4 py-1.5 text-xs font-heading font-semibold uppercase tracking-widest transition-colors ${filter === d ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}>
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Bài viết */}
      <section className="py-16 bg-light-gray min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="text-center py-20 text-mid-gray font-heading">Đang tải...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-mid-gray font-heading">Không có bài viết nào.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(n => (
                <div key={n.id} className="bg-white group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="img-zoom aspect-[16/9] overflow-hidden">
                    <img src={n.image_url} alt={n.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-primary text-xs font-heading font-bold uppercase tracking-widest">{n.category}</span>
                      <span className="text-mid-gray text-xs">·</span>
                      <span className="text-mid-gray text-xs">{formatDate(n.published_date)}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-dark leading-snug mb-3 group-hover:text-primary transition-colors">{n.title}</h3>
                    <p className="text-mid-gray text-sm leading-relaxed line-clamp-3">{n.excerpt}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className={`inline-block text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 ${n.division === 'Building' ? 'bg-primary/10 text-primary' : 'bg-blue-50 text-blue-600'}`}>
                        {n.division}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
