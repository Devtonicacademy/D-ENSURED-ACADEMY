import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/blogData';
import { Search, Calendar, User, Clock, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

export default function BlogResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState(null);

  const categories = ['ALL', 'JAMB', 'Post-UTME', 'Admissions', 'Study Tips'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCat = selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
          Blog & Educational Resource Hub
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Exam Strategies & Admission Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Stay informed with expert insights on JAMB UTME CBT secrets, UNILAG aggregate cut-off benchmarks, and O'Level verification guides.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {!activePost ? (
        filteredPosts.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4 max-w-md mx-auto">
            <BookOpen size={36} className="text-amber-400 mx-auto opacity-70" />
            <h3 className="font-heading font-bold text-lg text-white">No Articles Found</h3>
            <p className="text-xs text-slate-400">
              No educational resources match your search &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setActivePost(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden cursor-pointer group hover:border-amber-400/50 transition flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1"><User size={12} className="text-amber-400" /> {post.author}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-300 transition leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{post.summary}</p>
                  </div>
                </div>

                <div className="p-5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">{post.date}</span>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:underline">
                    Read Article <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6">
          <button
            onClick={() => {
              setActivePost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Back to Articles List</span>
          </button>

          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
            {activePost.category}
          </span>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">{activePost.title}</h1>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-y border-slate-800 py-3">
            <span>By <strong>{activePost.author}</strong></span>
            <span>•</span>
            <span>{activePost.date}</span>
            <span>•</span>
            <span>{activePost.readTime}</span>
          </div>

          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden my-4 border border-slate-800">
            <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
            {activePost.content}
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={() => setActivePost(null)}
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl"
            >
              Return to All Resources
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
