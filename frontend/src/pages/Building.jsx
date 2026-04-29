import { Link } from 'react-router-dom';

const services = [
  { title: 'Quản lý xây dựng', desc: 'Dịch vụ CM toàn diện từ tiền thi công đến nghiệm thu, đảm bảo đúng tiến độ và ngân sách.' },
  { title: 'Thiết kế & Thi công', desc: 'Giải pháp tích hợp thiết kế và thi công giúp rút ngắn tiến độ, giảm rủi ro với một đầu mối trách nhiệm.' },
  { title: 'Giao dự án tích hợp (IPD)', desc: 'Hợp đồng IPD cộng tác, gắn kết lợi ích của chủ đầu tư, thiết kế và nhà thầu để đạt kết quả tối ưu.' },
  { title: 'Thiết kế & Thi công ảo (BIM)', desc: 'Lập kế hoạch bằng BIM, phối hợp điều phối xung đột và lập lịch 4D, giải quyết vấn đề trước khi thi công.' },
  { title: 'Ứng phó khẩn cấp', desc: 'Năng lực huy động nhanh cho sửa chữa và phục hồi khẩn cấp, tái thiết công trình thiết yếu với độ chính xác cao.' },
  { title: 'Quản lý cơ sở vật chất', desc: 'Dịch vụ vận hành và bảo trì toàn diện để bảo vệ giá trị lâu dài của công trình đầu tư.' },
  { title: 'Chiến lược bền vững', desc: 'Chuyên môn LEED, WELL và net-zero tích hợp xuyên suốt mọi giai đoạn để đáp ứng mục tiêu ESG và giảm carbon.' },
  { title: 'Triển khai đa địa điểm', desc: 'Hệ thống đã được kiểm chứng để quản lý đồng thời nhiều dự án ở nhiều khu vực với chất lượng và báo cáo nhất quán.' },
  { title: 'Quản lý chuỗi cung ứng', desc: 'Chiến lược mua sắm sớm và quan hệ nhà cung cấp giúp đảm bảo giá, đúng thời hạn và giảm rủi ro.' },
  { title: 'Đối tác công tư (PPP)', desc: 'Cơ cấu, tài chính và triển khai PPP cho hạ tầng công cộng phức tạp với hiệu quả khu vực tư nhân.' },
  { title: 'Kế hoạch chuyển giao', desc: 'Quản lý kích hoạt và di chuyển chi tiết để đảm bảo bàn giao suôn sẻ vào công trình vừa hoàn thành.' },
  { title: 'Dịch vụ công trường & Thiết bị', desc: 'Thiết bị tự có và dịch vụ công trường tự thực hiện giúp kiểm soát chi phí và đảm bảo tiến độ.' },
];

const markets = [
  { name: 'Y tế',              icon: '🏥', desc: 'Bệnh viện, phòng khám, trung tâm ung bướu và cơ sở y tế tâm thần.' },
  { name: 'Đại học',           icon: '🎓', desc: 'Giảng đường, phòng thí nghiệm nghiên cứu, ký túc xá và hạ tầng khuôn viên.' },
  { name: 'Giáo dục phổ thông',icon: '🏫', desc: 'Trường tiểu học, THCS và THPT thiết kế cho học tập thế kỷ 21.' },
  { name: 'Khoa học sự sống',  icon: '🔬', desc: 'Nhà máy sản xuất GMP, cơ sở R&D và khuôn viên công nghệ sinh học.' },
  { name: 'Trung tâm dữ liệu', icon: '🖥️', desc: 'Xây dựng trung tâm dữ liệu hyperscale, colocation và doanh nghiệp.' },
  { name: 'Công nghệ cao',     icon: '⚙️', desc: 'Nhà máy bán dẫn, phòng sạch và sản xuất công nghệ cao.' },
  { name: 'Thể thao & Giải trí',icon: '🏟️', desc: 'Sân vận động, nhà thi đấu, trung tâm nghệ thuật biểu diễn và khu giải trí.' },
  { name: 'Giao thông vận tải',icon: '🚆', desc: 'Sân bay, bến xe, nhà ga đường sắt và trung tâm vận hành giao thông.' },
  { name: 'Chính phủ',         icon: '🏛️', desc: 'Văn phòng chính phủ, tòa án, công trình quân sự và hạ tầng liên bang.' },
  { name: 'Thương mại',        icon: '🏢', desc: 'Trụ sở doanh nghiệp, tòa nhà văn phòng và khu phức hợp đa chức năng.' },
  { name: 'Công nghiệp',       icon: '🏭', desc: 'Nhà máy thực phẩm & đồ uống, hàng tiêu dùng và trung tâm logistics.' },
  { name: 'Nhà ở',             icon: '🏘️', desc: 'Chung cư, nhà ở giá rẻ và cộng đồng nhà ở hỗn hợp thu nhập.' },
];

export default function Building() {
  return (
    <main className="pt-14 lg:pt-24">
      {/* Hero */}
      <section className="relative h-[55vh] md:h-[60vh] flex items-end pb-10 md:pb-16">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="Xây dựng" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">BTCONS Xây dựng</p>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-7xl leading-tight">Xây dựng</h1>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <p className="section-label">Phương pháp của chúng tôi</p>
            <h2 className="section-title mb-6">Đối tác trong mọi giai đoạn xây dựng</h2>
            <p className="text-mid-gray leading-relaxed mb-4">
              BTCONS Xây dựng là một trong những công ty quản lý xây dựng lớn nhất và giàu kinh nghiệm nhất. Chúng tôi mang đến chuyên môn sâu về thị trường, quy trình đã được kiểm chứng và văn hóa hợp tác cho từng dự án.
            </p>
            <p className="text-mid-gray leading-relaxed mb-8">
              Từ lập kế hoạch tiền thi công đến kích hoạt công trình, đội ngũ của chúng tôi luôn tập trung mang lại giá trị — đúng tiến độ, trong ngân sách và đạt tiêu chuẩn chất lượng, an toàn cao nhất.
            </p>
            <Link to="/projects?division=building" className="btn-primary">Xem dự án xây dựng</Link>
          </div>
          <div className="img-zoom rounded overflow-hidden aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="Thi công" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Dịch vụ */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Chúng tôi làm gì</p>
          <h2 className="section-title mb-12">Dịch vụ xây dựng</h2>
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
          <p className="section-label">Chúng tôi làm việc ở đâu</p>
          <h2 className="section-title mb-12">Lĩnh vực xây dựng</h2>
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

      {/* CTA */}
      <section className="bg-dark py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center text-white">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">Sẵn sàng xây dựng cùng nhau?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Hãy cho chúng tôi biết về dự án của bạn và đội ngũ sẽ liên hệ để trao đổi cách chúng tôi có thể hỗ trợ.</p>
          <Link to="/contact" className="btn-primary">Hợp tác với chúng tôi</Link>
        </div>
      </section>
    </main>
  );
}
