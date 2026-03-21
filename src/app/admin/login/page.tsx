'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';

// ==================== ADMIN LOGIN PAGE [SEARCH: AUTH, LOGIN, ADMIN] ====================
export default function AdminLogin() {
  // ==================== STATE MANAGEMENT [SEARCH: STATE, FORM] ====================
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to dashboard if already authenticated (check for auth cookie via API)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/users', { credentials: 'include' });
        if (res.ok) {
          window.location.href = '/admin/dashboard';
        }
      } catch {
        // not authenticated, continue
      }
    };
    checkAuth();
  }, []);

  // ==================== AUTHENTICATION HANDLER [SEARCH: AUTH, HANDLER, SUBMIT] ====================
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Enable cookie sending
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Cookie is set by server; redirect to dashboard
      window.location.href = '/admin/dashboard';
    } catch {
      setError('Server error');
      setLoading(false);
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
        {/* ==================== LOGO & BRANDING AREA [SEARCH: LOGO, BRANDING, TITLE] ==================== */}
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
          <h1 className="text-3xl font-bold text-white mb-2 font-zcool">VULE ITS Admin</h1>
          <p className="text-white/70 font-zcool">Content Management System</p>
        </div>

        {/* ==================== LOGIN FORM AREA [SEARCH: FORM, INPUT, FIELDS] ==================== */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ========== ERROR MESSAGE DISPLAY ========== */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* ========== EMAIL INPUT FIELD ========== */}
          <div>
            <label htmlFor="email" className="text-white font-medium block mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vuleits.com"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              disabled={loading}
            />
          </div>

          {/* ========== PASSWORD INPUT FIELD ========== */}
          <div>
            <label htmlFor="password" className="text-white font-medium block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              disabled={loading}
            />
          </div>

          {/* ========== SUBMIT BUTTON ========== */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cta-button py-3 font-semibold text-center mt-6 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* ==================== DEMO INFO AREA [SEARCH: DEMO, INFO, HELP] ==================== */}
        <p className="text-white/60 text-sm text-center mt-6">
          Demo: vuleitsolution@gmail.com / VULEITS@2025#
        </p>
      </div>
    </div>
  );
}
