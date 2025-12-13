'use client';

import { useState, FormEvent } from 'react';

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
      {/* Background Shapes */}
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

      <div className="glass p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
              <circle cx="16" cy="16" r="5" opacity="0.9"/>
              <circle cx="32" cy="16" r="4" opacity="0.8"/>
              <circle cx="16" cy="32" r="4" opacity="0.7"/>
              <circle cx="32" cy="32" r="5" opacity="0.85"/>
              <circle cx="24" cy="8" r="2" opacity="1"/>
              <circle cx="8" cy="24" r="2" opacity="0.9"/>
              <circle cx="40" cy="24" r="2" opacity="0.9"/>
              <circle cx="24" cy="40" r="2" opacity="1"/>
              <circle cx="8" cy="8" r="1" opacity="0.6"/>
              <circle cx="40" cy="8" r="1" opacity="0.6"/>
              <circle cx="8" cy="40" r="1" opacity="0.6"/>
              <circle cx="40" cy="40" r="1" opacity="0.6"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">VULE ITS Admin</h1>
          <p className="text-white/70">Content Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

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

          <button
            type="submit"
            className="w-full cta-button py-3 font-semibold text-center mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="text-white/60 text-sm text-center mt-6">
          Demo: Use any email and password (min 6 chars)
        </p>
      </div>
    </div>
  );
}
