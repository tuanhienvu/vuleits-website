'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Products', value: '24', icon: '📦' },
    { label: 'Total News', value: '42', icon: '📰' },
    { label: 'Total Users', value: '8', icon: '👥' },
    { label: 'Contact Messages', value: '15', icon: '💬' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'media', label: 'Media', icon: '🖼️' },
    { id: 'banners', label: 'Banners', icon: '🎬' },
    { id: 'contacts', label: 'Contacts', icon: '💬' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a] p-4">
      {/* Header */}
      <div className="glass p-6 rounded-2xl mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-white/70">Welcome back! Manage your VULE ITS content.</p>
        </div>
        <button className="bg-red-500/30 hover:bg-red-500/50 text-red-200 px-6 py-2 rounded-lg transition-colors">
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="glass p-2 rounded-2xl mb-8 overflow-x-auto">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Areas */}
      <div className="glass p-8 rounded-2xl">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-white/70">📈 Your content is performing well. 42 news articles and 24 active products.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-white/70">💡 Tip: Keep your content updated regularly for better engagement.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Product Management</h2>
              <button className="cta-button px-6 py-2">+ Add Product</button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Product {i}</p>
                    <p className="text-white/50 text-sm">Status: Active</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">Edit</button>
                    <button className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">News Management</h2>
              <button className="cta-button px-6 py-2">+ Add News</button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">News Article {i}</p>
                    <p className="text-white/50 text-sm">Tags: Updates, News</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">Edit</button>
                    <button className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <button className="cta-button px-6 py-2">+ Add User</button>
            </div>
            <div className="space-y-3">
              {[{ name: 'Admin User', role: 'Admin' }, { name: 'Editor User', role: 'Editor' }].map((user, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-white/50 text-sm">Role: {user.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">Edit</button>
                    <button className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Media Library</h2>
              <button className="cta-button px-6 py-2">+ Upload Media</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-white/70 text-sm">image_{i}.jpg</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'banners' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Banner Sliders</h2>
              <button className="cta-button px-6 py-2">+ Create Banner</button>
            </div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">Banner Slider {i}</p>
                    <p className="text-white/50 text-sm">3 slides</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/20 text-white px-4 py-2 rounded hover:bg-white/30">Edit</button>
                    <button className="bg-red-500/20 text-red-200 px-4 py-2 rounded hover:bg-red-500/30">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-medium">User {i}</p>
                      <p className="text-white/50 text-sm">user{i}@example.com</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">New</span>
                  </div>
                  <p className="text-white/70">This is a contact message from the user...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
