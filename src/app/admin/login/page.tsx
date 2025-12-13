'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Mock authentication - in production, call your API
    if (email && password.length >= 6) {
      localStorage.setItem('auth_token', 'mock_token_' + Date.now());
      window.location.href = '/admin/dashboard';
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a] flex items-center justify-center px-4">
      {/* ==================== BACKGROUND SHAPES AREA ==================== */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="absolute bg-white/10 shadow-lg"
            style={{
              width: ['120px', '90px', '100px', '80px', '110px', '95px'][i - 1],
              height: ['80px', '140px', '60px', '120px', '70px', '95px'][i - 1],
              borderRadius: ['15px', '12px', '10px', '8px', '14px', '20px'][i - 1],
              top: ['20%', '60%', 'auto', '10%', 'auto', '40%'][i - 1],
              bottom: ['auto', 'auto', '20%', 'auto', '40%', 'auto'][i - 1],
              left: ['10%', 'auto', '20%', 'auto', 'auto', '5%'][i - 1],
              right: ['auto', '15%', 'auto', '30%', '20%', 'auto'][i - 1],
              transform: ['rotate(15deg)', 'rotate(-20deg)', 'rotate(25deg)', 'rotate(-10deg)', 'rotate(30deg)', 'rotate(0)'][i - 1],
              animation: `float 6s ease-in-out infinite`,
              animationDelay: [`0s`, '2s', '4s', '1s', '3s', '5s'][i - 1],
            }}
          />
        ))}
      </div>

      {/* ==================== LOGIN CARD SECTION ==================== */}
      <div className="glass p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10">
        {/* ==================== LOGO & BRANDING AREA ==================== */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 relative mx-auto mb-4">
            <Image
              src="/Logos.png"
              alt="VULE ITS Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">VULE ITS Admin</h1>
          <p className="text-white/70">Content Management System</p>
        </div>

        {/* ==================== LOGIN FORM AREA ==================== */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="text-white font-medium block mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vuleits.com"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
            />
          </div>

          {/* Password Input Field */}
          <div>
            <label htmlFor="password" className="text-white font-medium block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cta-button py-3 font-semibold text-center mt-6"
          >
            Sign In
          </button>
        </form>

        {/* ==================== DEMO INFO AREA ==================== */}
        <p className="text-white/60 text-sm text-center mt-6">
          Demo: Use any email and password (min 6 chars)
        </p>
      </div>
    </div>
  );
}
