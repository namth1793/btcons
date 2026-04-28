import { useState, useEffect, useRef } from 'react';

const PHONE = '0901234567';
const ZALO_ID = '0901234567';

const QUICK = [
  { label: 'Dịch vụ', answer: 'BTCONS cung cấp dịch vụ xây dựng tổng thầu (Building) và phát triển bất động sản (Development) cho các dự án quy mô lớn trên toàn quốc.' },
  { label: 'Liên hệ', answer: `Hotline: ${PHONE} | Email: info@btcons.vn | Địa chỉ: 7 Jackson Walkway, Providence, RI 02903` },
  { label: 'Dự án', answer: 'BTCONS đã thực hiện hơn 500 dự án lớn. Xem chi tiết danh mục dự án tại trang Projects của chúng tôi.' },
  { label: 'Tư vấn', answer: 'Để được tư vấn miễn phí, vui lòng để lại thông tin tại trang Liên Hệ hoặc gọi trực tiếp hotline của chúng tôi.' },
];

function getBotReply(text) {
  const t = text.toLowerCase();
  const match = QUICK.find(q => t.includes(q.label.toLowerCase()));
  return match
    ? match.answer
    : 'Cảm ơn bạn đã liên hệ! Đội ngũ BTCONS sẽ phản hồi sớm nhất. Bạn cũng có thể gọi hotline để được hỗ trợ ngay.';
}

export default function FloatingContact() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Xin chào! Tôi là trợ lý ảo của BTCONS. Tôi có thể giúp gì cho bạn?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const msgEnd = useRef(null);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getBotReply(text) }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat popup */}
      {chatOpen && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mb-1 animate-slideUp">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 text-white" style={{ backgroundColor: '#244377' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.955 7.955 0 01-4.078-1.117l-.292-.174-3.032.901.901-3.032-.174-.292A7.955 7.955 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">BTCONS Support</p>
                <p className="text-white/70 text-xs">Trực tuyến</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white transition-colors p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="h-52 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.from === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-sm'
                }`} style={m.from === 'user' ? { backgroundColor: '#244377' } : {}}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={msgEnd} />
          </div>

          {/* Quick replies */}
          <div className="px-3 pt-2 pb-1 flex gap-1.5 flex-wrap bg-white border-t border-gray-100">
            {QUICK.map(q => (
              <button key={q.label} onClick={() => sendMessage(q.label)}
                className="text-xs px-2.5 py-1 border rounded-full transition-colors hover:text-white"
                style={{ borderColor: '#244377', color: '#244377' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#244377'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '#244377'; }}>
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 flex gap-2 bg-white">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border border-gray-200 rounded-full px-3 py-2 text-sm focus:outline-none transition-colors"
              style={{ '--tw-ring-color': '#244377' }}
              onFocus={e => (e.target.style.borderColor = '#244377')}
              onBlur={e => (e.target.style.borderColor = '')}
            />
            <button onClick={() => sendMessage(input)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#244377' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Zalo button */}
      <a
        href={`https://zalo.me/${ZALO_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo"
        className="group relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        style={{ backgroundColor: '#0068FF' }}
      >
        <svg className="w-7 h-7" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial">Z</text>
        </svg>
        <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat Zalo
        </span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
      </a>

      {/* Phone button */}
      <a
        href={`tel:${PHONE}`}
        title="Gọi ngay"
        className="group relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 bg-green-500"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Gọi ngay
        </span>
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
      </a>

      {/* Chatbot button */}
      <button
        onClick={() => setChatOpen(v => !v)}
        title="Hỗ trợ trực tuyến"
        className="group relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110"
        style={{ backgroundColor: chatOpen ? '#1a3660' : '#244377' }}
      >
        {chatOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
        {!chatOpen && (
          <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Hỗ trợ trực tuyến
          </span>
        )}
      </button>
    </div>
  );
}
