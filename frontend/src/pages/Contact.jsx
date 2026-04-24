import { useState } from 'react';
import { Link } from 'react-router-dom';

import { API } from '../config.js';

const offices = [
  { city: 'Providence, RI', label: 'Headquarters', address: '7 Jackson Walkway, Providence, RI 02903', phone: '+1 (401) 456-5800' },
  { city: 'Boston, MA', label: 'Regional Office', address: '10 Guest Street, Suite 400, Brighton, MA 02135', phone: '+1 (617) 254-7700' },
  { city: 'New York, NY', label: 'Regional Office', address: '100 William Street, Suite 600, New York, NY 10038', phone: '+1 (212) 269-3030' },
  { city: 'Washington, DC', label: 'Development Office', address: '1425 K Street NW, Suite 850, Washington, DC 20005', phone: '+1 (202) 783-5800' },
  { city: 'Chicago, IL', label: 'Midwest Office', address: '200 W. Madison Street, Suite 1000, Chicago, IL 60606', phone: '+1 (312) 442-1110' },
  { city: 'Atlanta, GA', label: 'Southeast Office', address: '3445 Peachtree Road NE, Suite 1200, Atlanta, GA 30326', phone: '+1 (404) 231-3100' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', division: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message });
        setForm({ name: '', email: '', company: '', phone: '', division: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Something went wrong.' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Unable to send message. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative h-64 flex items-end pb-10">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/70" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-white">
          <p className="section-label text-white/70">Get in Touch</p>
          <h1 className="font-heading font-bold text-5xl md:text-6xl">Partner With Us</h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-14">
          {/* Form */}
          <div className="md:col-span-2">
            <p className="section-label">Contact Us</p>
            <h2 className="section-title mb-2">Tell Us About Your Project</h2>
            <p className="text-mid-gray mb-8">Whether you have a construction project in mind or a real estate development opportunity, our team would love to hear from you.</p>

            {status && (
              <div className={`mb-6 p-4 border-l-4 text-sm font-sans ${status.type === 'success' ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-dark mb-2">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    className="w-full border border-gray-300 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-dark mb-2">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    className="w-full border border-gray-300 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" placeholder="jane@company.com" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-dark mb-2">Company / Organization</label>
                  <input name="company" value={form.company} onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-widest text-dark mb-2">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-widest text-dark mb-2">Area of Interest</label>
                <select name="division" value={form.division} onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors bg-white">
                  <option value="">Select one...</option>
                  <option value="building">BTCONS Building</option>
                  <option value="development">BTCONS Development</option>
                  <option value="both">Both / General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-widest text-dark mb-2">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  className="w-full border border-gray-300 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your project, timeline, and how we can help..." />
              </div>
              <button type="submit" disabled={sending}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Side info */}
          <div className="space-y-8">
            <div className="bg-light-gray p-7">
              <h3 className="font-heading font-bold text-lg text-dark mb-4">Headquarters</h3>
              <p className="text-mid-gray text-sm leading-relaxed mb-2">7 Jackson Walkway<br />Providence, RI 02903</p>
              <p className="text-mid-gray text-sm">+1 (401) 456-5800</p>
            </div>
            <div className="bg-primary p-7 text-white">
              <h3 className="font-heading font-bold text-lg mb-3">Media Inquiries</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-3">For press and media-related questions, please contact our communications team.</p>
              <a href="mailto:media@btcons.vn" className="text-white font-heading font-semibold text-sm hover:underline">media@btcons.vn</a>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-dark mb-4">Looking for Careers?</h3>
              <p className="text-mid-gray text-sm leading-relaxed mb-4">Explore open positions across our Building and Development divisions.</p>
              <Link to="/careers" className="btn-outline-dark text-xs py-2.5 inline-block">View Open Positions</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label">Where We Are</p>
          <h2 className="section-title mb-10">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offices.map(o => (
              <div key={o.city} className="bg-white p-6 border-l-4 border-primary hover:shadow-md transition-shadow">
                <p className="text-primary text-xs font-heading font-bold uppercase tracking-widest mb-1">{o.label}</p>
                <h3 className="font-heading font-bold text-xl text-dark mb-3">{o.city}</h3>
                <p className="text-mid-gray text-sm leading-relaxed mb-2">{o.address}</p>
                <a href={`tel:${o.phone}`} className="text-mid-gray text-sm hover:text-primary transition-colors">{o.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
