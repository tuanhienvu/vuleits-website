'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Fetch current user info
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/admin/users', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserEmail(data.user.email || '');
          }
        }
      } catch (err) {
        // Ignore errors
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { 
        method: 'POST', 
        credentials: 'include' 
      });
      if (res.ok) {
        router.push('/admin/login');
      }
    } catch (err) {
      router.push('/admin/login');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left: Mobile Menu Button & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <span className="text-2xl">☰</span>
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-white font-zcool">Admin Dashboard</h1>
            <p className="text-white/60 text-sm hidden sm:block font-zcool">
              Welcome back! Manage your <span className="font-zcool">VULE ITS</span> content.
            </p>
          </div>
        </div>

        {/* Right: User Info & Logout */}
        <div className="flex items-center gap-4">
          {/* User Email */}
          {userEmail && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
              <span className="text-white/70 text-sm">{userEmail}</span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/30 hover:bg-red-500/50 text-red-200 rounded-lg transition-colors font-medium text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

