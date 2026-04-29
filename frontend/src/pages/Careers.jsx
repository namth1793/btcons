import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config.js';

const benefits = [
  { icon: '🏥', title: 'Sức khỏe & Phúc lợi',    desc: 'Gói bảo hiểm y tế, nha khoa và thị lực toàn diện cho nhân viên và gia đình.' },
  { icon: '💰', title: 'Lương cạnh tranh',          desc: 'Mức lương dẫn đầu thị trường kèm thưởng hiệu suất và cơ hội cổ phần.' },
  { icon: '📚', title: 'Học tập & Phát triển',      desc: 'Hỗ trợ học phí, chứng chỉ chuyên môn và chương trình phát triển lãnh đạo.' },
  { icon: '🌴', title: 'Nghỉ phép',                 desc: 'Nghỉ phép hào phóng, ngày lễ có lương, nghỉ thai sản và sắp xếp làm việc linh hoạt.' },
  { icon: '🏦', title: 'Hưu trí',                   desc: 'Quỹ hưu trí với đóng góp của công ty và tài nguyên lập kế hoạch tài chính.' },
  { icon: '🤝', title: 'Đóng góp cộng đồng',        desc: 'Thời gian tình nguyện có lương và quà tặng đối ứng cho các tổ chức bạn quan tâm.' },
];

export default function Careers() {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('Tất cả');

  useEffect(() => {
    fetch(`${API}/jobs`).then(r => r.json()).then(data => { setJobs(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const departments  = ['Tất cả', ...new Set(jobs.map(j => j.department))];
  const filtered     = filter === 'Tất cả' ? jobs : jobs.filter(j => j.department === filter);
  const formatDate   = d => new Date(d).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[55vh] flex items-end pb-10 md:pb-16">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80" alt="Tuyển dụng" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">Gia nhập đội ngũ</p>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl leading-tight">Tuyển dụng</h1>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <p className="section-label">Tại sao chọn BTCONS</p>
            <h2 className="section-title mb-6">Xây dựng sự nghiệp bền vững như những công trình chúng tôi tạo ra</h2>
            <p className="text-mid-gray leading-relaxed mb-4">
              Tại BTCONS, chúng tôi tin rằng con người là tài sản lớn nhất của mình. Là công ty gia đình, chúng tôi thực sự hành động như vậy — đầu tư vào sự phát triển, sức khỏe và thành công lâu dài của nhân viên.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              Tham gia đội ngũ nơi công việc của bạn định hình đường chân trời, phục vụ cộng đồng, giáo dục thế hệ trẻ và kiến tạo tương lai. Với 45+ văn phòng và dự án tại 20+ quốc gia, cơ hội phát triển cùng chúng tôi là vô hạn.
            </p>
            <a href="#openings" className="btn-primary">Xem vị trí tuyển dụng</a>
          </div>
          <div className="img-zoom rounded overflow-hidden aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Đội ngũ BTCONS" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Phúc lợi */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Phúc lợi toàn diện</p>
          <h2 className="section-title mb-12">Quyền lợi & Đãi ngộ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="bg-white p-7 hover:shadow-md transition-shadow group">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-heading font-bold text-lg text-dark mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="text-mid-gray text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Đa dạng */}
      <section className="bg-dark py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start gap-8 md:gap-10">
          <div className="flex-1">
            <p className="section-label text-primary">Cam kết của chúng tôi</p>
            <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">Đa dạng, Công bằng & Hòa nhập</h2>
            <p className="text-white/70 leading-relaxed">
              BTCONS cam kết xây dựng môi trường làm việc đa dạng, công bằng và hòa nhập, nơi mọi người đều có thể phát triển. Chúng tôi tin rằng những đội ngũ đa dạng xây dựng những công trình tốt hơn và cộng đồng tốt hơn.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[['40%', 'Tuyển dụng đa dạng 2024'], ['500+', 'Đối tác nhà cung cấp đa dạng'], ['15+', 'Nhóm hòa nhập & cộng đồng'], ['250 tỷ+', 'Chi tiêu đa dạng hàng năm']].map(([v, l]) => (
              <div key={l} className="border border-white/20 p-5 text-center">
                <div className="font-heading font-bold text-3xl text-primary">{v}</div>
                <div className="text-white/60 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Danh sách việc làm */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Vị trí đang mở</p>
          <h2 className="section-title mb-8">Tuyển dụng hiện tại</h2>

          <div className="flex flex-wrap gap-2 mb-10">
            {departments.map(d => (
              <button key={d} onClick={() => setFilter(d)}
                className={`px-4 py-2 text-xs font-heading font-semibold uppercase tracking-widest border transition-colors ${filter === d ? 'bg-primary border-primary text-white' : 'border-gray-300 text-mid-gray hover:border-primary hover:text-primary'}`}>
                {d}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-16 text-mid-gray">Đang tải...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-mid-gray">Không có vị trí nào phù hợp.</div>
          ) : (
            <div className="space-y-4">
              {filtered.map(job => (
                <div key={job.id} className="border border-gray-200 p-6 hover:border-primary hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl text-dark group-hover:text-primary transition-colors mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-mid-gray">
                        <span className="font-heading font-semibold text-primary text-xs uppercase tracking-widest">{job.department}</span>
                        <span>·</span>
                        <span>📍 {job.location}</span>
                        <span>·</span>
                        <span>⏱ {job.type}</span>
                        <span>·</span>
                        <span>Đăng {formatDate(job.posted_date)}</span>
                      </div>
                      <p className="text-mid-gray text-sm leading-relaxed mt-3 max-w-2xl">{job.description}</p>
                    </div>
                    <div className="shrink-0">
                      <Link to="/contact" className="btn-primary text-xs py-2.5">Ứng tuyển</Link>
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
