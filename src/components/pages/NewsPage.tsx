'use client';

import { useState } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  status: 'Active' | 'Expired';
}

export default function NewsPage() {
  const [articles] = useState<NewsArticle[]>([
    { id: '1', title: 'Latest Product Updates', description: 'Discover what\'s new in our latest release', tags: ['Updates', 'Product'], date: '2025-12-13', status: 'Active' },
    { id: '2', title: 'Industry Trends 2025', description: 'Explore emerging trends shaping the future', tags: ['Trends', 'Industry'], date: '2025-12-12', status: 'Active' },
    { id: '3', title: 'Company Milestones', description: 'Celebrating our achievements this year', tags: ['Company', 'Milestone'], date: '2025-12-11', status: 'Active' },
  ]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const allTags = [...new Set(articles.flatMap(a => a.tags))];

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedTags.length === 0 || selectedTags.some(tag => a.tags.includes(tag))) &&
    a.status === 'Active'
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="container mx-auto px-4">
      {/* ==================== HERO SECTION ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest News & Updates</h1>
        <p className="text-white/80 text-lg">Stay informed with our latest articles and announcements</p>
      </section>

      {/* ==================== SEARCH & TAG FILTER AREA ==================== */}
      <section className="glass p-6 rounded-2xl mb-8">
        {/* Search Input */}
        <div className="mb-4">
          <label className="text-white font-medium block mb-2">Search Articles</label>
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
          />
        </div>
        
        {/* Tag Filter Buttons */}
        <div>
          <label className="text-white font-medium block mb-3">Filter by Tags</label>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ARTICLES LIST SECTION ==================== */}
      <section className="space-y-6 mb-12">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-white/15">
              {/* Article Card Layout */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Article Icon */}
                <div className="md:w-48 h-48 bg-white/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <div className="text-4xl">📰</div>
                </div>

                {/* Article Content */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-2xl mb-2">{article.title}</h3>
                  <p className="text-white/70 mb-3">{article.description}</p>

                  {/* Tag Display */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/20 text-white/80 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Article Date */}
                  <p className="text-white/50 text-sm">{new Date(article.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass p-12 rounded-2xl text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-white/70">No articles found. Try adjusting your search or filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
