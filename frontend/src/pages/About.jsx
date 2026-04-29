import { Link } from 'react-router-dom';

const timeline = [
  { year: '1873', event: 'William Nguyen thành lập công ty tại Hà Nội, Việt Nam với tư cách là một công ty xây dựng.' },
  { year: '1912', event: 'BTCONS mở rộng sang tổng thầu xây dựng, hoàn thành nhiều công trình dân sự nổi bật.' },
  { year: '1950s', event: 'Mở rộng ra cả nước với các dự án lớn về liên bang, y tế và giáo dục đại học.' },
  { year: '1970s', event: 'Quản lý xây dựng trở thành mô hình dịch vụ chủ đạo, củng cố danh tiếng cho các dự án phức tạp.' },
  { year: '1990s', event: 'Mở rộng quốc tế sang Trung Đông, châu Âu và châu Á. Thành lập bộ phận phát triển.' },
  { year: '2000s', event: 'BTCONS tiên phong ứng dụng BIM và thiết kế ảo, trở thành nhà lãnh đạo ngành trong xây dựng ứng dụng công nghệ.' },
  { year: '2010s', event: 'Ra mắt chương trình bền vững; BTCONS hoàn thành hàng trăm dự án đạt chứng chỉ LEED trên toàn cầu.' },
  { year: '2024', event: 'Hơn 45 văn phòng trên toàn thế giới, 3.000+ nhân viên và doanh thu hàng năm hơn 6 tỷ USD. Vẫn là công ty gia đình.' },
];

const values = [
  { title: 'Chính trực',         icon: '⚖️', desc: 'Chúng tôi làm những gì đã nói, nói những gì chúng tôi làm và đứng sau mọi dự án chúng tôi bàn giao.' },
  { title: 'Xuất sắc',           icon: '🏆', desc: 'Cam kết không ngừng về chất lượng, an toàn và hiệu suất trên mọi dự án, mọi ngày.' },
  { title: 'Hợp tác',            icon: '🤝', desc: 'Chúng tôi tin rằng kết quả tốt nhất đến từ sự hợp tác chân thành với khách hàng, nhà thiết kế và cộng đồng.' },
  { title: 'Đổi mới',            icon: '💡', desc: 'Liên tục cải tiến thông qua công nghệ, đổi mới quy trình và giải quyết vấn đề sáng tạo.' },
  { title: 'Đa dạng & Hòa nhập', icon: '🌍', desc: 'Xây dựng môi trường làm việc và chuỗi cung ứng công bằng phản ánh cộng đồng chúng tôi phục vụ.' },
  { title: 'Cộng đồng',          icon: '🏘️', desc: 'Mỗi dự án là một khoản đầu tư vào các khu phố, tổ chức và người dân mà chúng tôi xây dựng cho họ.' },
];

const leadership = [
  { name: 'Nguyễn Văn Vượng', title: 'Chủ tịch & Người sáng lập',    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Trần Minh Đức',    title: 'Tổng Giám đốc, BTCONS Xây dựng', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Lê Hoàng Nam',     title: 'Giám đốc, BTCONS Phát triển',    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  { name: 'Phạm Thị Lan',     title: 'Thành viên HĐQT',                img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
];

export default function About() {
  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[55vh] md:h-[60vh] flex items-end pb-10 md:pb-16">
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80" alt="Về BTCONS" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">Chúng tôi là ai</p>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl leading-tight">Về BTCONS</h1>
        </div>
      </section>

      {/* Sứ mệnh */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <p className="section-label">Sứ mệnh của chúng tôi</p>
            <h2 className="section-title mb-6">Di sản gia đình trong xây dựng</h2>
            <p className="text-mid-gray leading-relaxed mb-4 text-lg">
              BTCONS là một trong những công ty xây dựng và bất động sản tư nhân, thuộc sở hữu gia đình lớn nhất và được kính trọng nhất thế giới. Hơn 150 năm qua, gia đình BTCONS đã dẫn dắt công ty với cam kết sâu sắc với khách hàng, nhân viên và cộng đồng nơi chúng tôi làm việc.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              Với hai bộ phận bổ sung — BTCONS Xây dựng và BTCONS Phát triển — chúng tôi mang lại sự kết hợp vô song giữa chuyên môn xây dựng và năng lực phát triển bất động sản.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[['150+', 'Năm hoạt động'], ['3.000+', 'Nhân viên toàn cầu'], ['20+', 'Quốc gia'], ['6 tỷ+', 'Doanh thu hàng năm']].map(([val, label]) => (
                <div key={label} className="border-l-4 border-primary pl-4">
                  <div className="font-heading font-bold text-3xl text-dark">{val}</div>
                  <div className="text-mid-gray text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="img-zoom rounded overflow-hidden aspect-square">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="Đội ngũ BTCONS" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Điều thúc đẩy chúng tôi</p>
          <h2 className="section-title mb-12">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white p-8 hover:shadow-md transition-shadow group">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-heading font-bold text-xl text-dark mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-mid-gray text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lịch sử */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label text-primary">Câu chuyện của chúng tôi</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12">150 năm xây dựng</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />
            <div className="space-y-8">
              {timeline.map(t => (
                <div key={t.year} className="flex gap-8 items-start">
                  <div className="shrink-0 w-16 text-right">
                    <span className="font-heading font-bold text-primary text-lg">{t.year}</span>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-4 shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-dark z-10" />
                  </div>
                  <p className="text-white/70 leading-relaxed pt-0.5">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ban lãnh đạo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Con người của chúng tôi</p>
          <h2 className="section-title mb-12">Ban lãnh đạo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {leadership.map(l => (
              <div key={l.name} className="group cursor-pointer">
                <div className="img-zoom aspect-square overflow-hidden mb-4 rounded">
                  <img src={l.img} alt={l.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="font-heading font-bold text-dark group-hover:text-primary transition-colors">{l.name}</h3>
                <p className="text-mid-gray text-sm">{l.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading font-bold text-4xl mb-4">Hãy cùng xây dựng điều tuyệt vời</h2>
          <p className="text-white/80 text-lg mb-8">Dù bạn đang lên kế hoạch dự án xây dựng hay phát triển bất động sản, BTCONS có đủ chuyên môn để tạo ra những điều đặc biệt.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-outline">Hợp tác với chúng tôi</Link>
            <Link to="/projects" className="bg-white text-primary font-heading font-semibold uppercase tracking-widest text-sm px-8 py-3 hover:bg-white/90 transition-colors inline-block">Xem công trình của chúng tôi</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
