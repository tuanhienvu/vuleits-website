'use client';

import { useState, FormEvent } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4">
      {/* Contact Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-white font-medium mb-2 block">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-white font-medium mb-2 block">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              />
            </div>
            <div>
              <label htmlFor="subject" className="text-white font-medium mb-2 block">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-white font-medium mb-2 block">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                required
                rows={5}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 resize-none"
              />
            </div>
            <button type="submit" className="cta-button w-full text-center">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-3xl">📧</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email</h4>
                <p className="text-white/70">hello@glossytouch.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📞</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Phone</h4>
                <p className="text-white/70">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📍</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Address</h4>
                <p className="text-white/70">123 Design Street<br/>Creative District, CD 12345</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🕐</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                <p className="text-white/70">Mon-Fri: 9AM-6PM<br/>Sat-Sun: 10AM-4PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-12">
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Find Us</h2>
          <div className="bg-white/10 rounded-2xl h-96 flex items-center justify-center border border-white/20">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-white font-semibold mb-2">Interactive Map Area</p>
              <p className="text-white/70 mb-1">123 Design Street</p>
              <p className="text-white/70 mb-4">Creative District, CD 12345</p>
              <p className="text-white/50 text-sm">Map integration can be added with Google Maps, OpenStreetMap, or Mapbox</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
