import { Link } from 'react-router-dom';

const services = [
  { title: 'Mua lại',                desc: 'Xác định địa điểm chiến lược, thẩm định và thực hiện giao dịch để xây dựng hệ thống dự án phát triển chất lượng cao.' },
  { title: 'Phát triển',             desc: 'Phát triển dự án toàn chu kỳ từ cấp phép và thiết kế đến quản lý thi công và bàn giao.' },
  { title: 'Tài chính & Tư vấn',     desc: 'Cơ cấu vốn, huy động cổ phần, thu xếp nợ và mô hình tài chính cho các giao dịch bất động sản phức tạp.' },
  { title: 'Quản lý tài sản',        desc: 'Dịch vụ quản lý tài sản và bất động sản chuyên nghiệp nhằm bảo vệ và gia tăng giá trị đầu tư dài hạn.' },
  { title: 'Đối tác công tư (PPP)',   desc: 'Chuyên môn PPP đã được kiểm chứng cho các cơ quan chính phủ, quản lý nhà ở và tổ chức tìm kiếm năng lực phát triển tư nhân.' },
  { title: 'Lập kế hoạch chiến lược',desc: 'Nghiên cứu thị trường, phân tích khả thi và quy hoạch tổng thể để định hướng chiến lược phát triển phù hợp với mục tiêu chủ đầu tư.' },
];

const markets = [
  { name: 'Chung cư',          icon: '🏢', desc: 'Cộng đồng chung cư thị trường tại các đô thị và ngoại ô có nhu cầu cao.' },
  { name: 'Nhà ở sinh viên',   icon: '🎓', desc: 'Nhà ở sinh viên chuyên dụng cho các trường đại học và cao đẳng.' },
  { name: 'Nhà ở giá rẻ',      icon: '🏠', desc: 'LIHTC, nhà ở hỗn hợp thu nhập phục vụ các cộng đồng có nhu cầu.' },
  { name: 'Đa chức năng',      icon: '🏙️', desc: 'Phát triển đô thị năng động kết hợp nhà ở, bán lẻ, văn phòng và không gian công cộng.' },
  { name: 'Thương mại',        icon: '🏬', desc: 'Văn phòng, bán lẻ và phát triển đa chức năng với nền tảng thị trường vững chắc.' },
  { name: 'Y tế',              icon: '🏥', desc: 'Tòa nhà văn phòng y tế, nhà dưỡng lão và phát triển neo bởi y tế.' },
  { name: 'Chính phủ',         icon: '🏛️', desc: 'Công trình chính phủ liên bang, tiểu bang và địa phương qua cơ cấu PPP và cho thuê đất.' },
  { name: 'Nhà ở đơn lẻ',     icon: '🏡', desc: 'Cộng đồng nhà ở đơn lẻ để bán và xây-để-cho-thuê.' },
];

const stats = [
  { value: '50.000+', label: 'Căn hộ đã phát triển' },
  { value: '3 tỷ+',   label: 'Pipeline phát triển' },
  { value: '30+',     label: 'Năm kinh nghiệm phát triển' },
  { value: '25+',     label: 'Tỉnh thành đang triển khai' },
];

export default function Development() {
  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[55vh] md:h-[60vh] flex items-end pb-10 md:pb-16">
        <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80" alt="Phát triển" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-primary">BTCONS Phát triển</p>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl leading-tight">Phát triển</h1>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="img-zoom rounded overflow-hidden aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" alt="Phát triển" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="section-label">Phương pháp của chúng tôi</p>
            <h2 className="section-title mb-6">Tạo dựng cộng đồng bền vững</h2>
            <p className="text-mid-gray leading-relaxed mb-4">
              BTCONS Phát triển là nhà phát triển bất động sản tích hợp dọc với thành tích đã được kiểm chứng trong lĩnh vực chung cư, nhà ở sinh viên, nhà ở giá rẻ và dự án đa chức năng trên cả nước.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              Chúng tôi kết hợp chuyên môn mua lại, tài chính, thi công và quản lý dưới một mái nhà — tạo ra những cộng đồng xuất sắc phục vụ cư dân, hỗ trợ khu dân cư và tạo giá trị bền vững cho đối tác.
            </p>
            <Link to="/projects?division=development" className="btn-primary">Xem dự án phát triển</Link>
          </div>
        </div>
      </section>

      {/* Thống kê */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-heading font-bold text-4xl md:text-5xl mb-2">{s.value}</div>
                <div className="text-white/80 text-sm font-heading uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dịch vụ */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Chúng tôi làm gì</p>
          <h2 className="section-title mb-12">Dịch vụ phát triển</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="bg-white p-7 border-l-4 border-transparent hover:border-primary transition-all duration-200 group">
                <h3 className="font-heading font-bold text-lg text-dark mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-mid-gray text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lĩnh vực */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Chúng tôi phát triển ở đâu</p>
          <h2 className="section-title mb-12">Lĩnh vực phát triển</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {markets.map(m => (
              <div key={m.name} className="p-5 border border-gray-200 hover:border-primary hover:shadow-md transition-all cursor-pointer group">
                <div className="text-2xl mb-3">{m.icon}</div>
                <h3 className="font-heading font-bold text-dark mb-1 group-hover:text-primary transition-colors">{m.name}</h3>
                <p className="text-mid-gray text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quy trình */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label text-primary">Cách chúng tôi làm việc</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12">Quy trình phát triển</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-0">
            {['Mua lại địa điểm', 'Cấp phép & Thiết kế', 'Tài chính & Ký kết', 'Thi công', 'Vận hành & Quản lý'].map((step, i) => (
              <div key={step} className="relative flex flex-col items-center text-center p-5 md:p-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-lg text-white mb-4 z-10 shrink-0">{i + 1}</div>
                {i < 4 && <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-primary/30" />}
                <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-white/90">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-light-gray py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="section-title mb-4">Có cơ hội phát triển?</h2>
          <p className="text-mid-gray text-lg mb-8 max-w-xl mx-auto">Chúng tôi hợp tác với chủ đất, cơ quan nhà nước, tổ chức và nhà đầu tư để khai thác toàn bộ tiềm năng tài sản bất động sản.</p>
          <Link to="/contact" className="btn-primary">Liên hệ với đội ngũ của chúng tôi</Link>
        </div>
      </section>
    </main>
  );
}
