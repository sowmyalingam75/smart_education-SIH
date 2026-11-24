import React, { useState } from 'react';
import { BookOpen, Search, Download, Sparkles, FileText, Video, Code, ArrowRight } from 'lucide-react';

export default function StudyMaterialsPage({ setCurrentPage, student }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allMaterials = [
    { id: 1, title: "Machine Learning: Decision Trees & Entropy", subject: "AI & ML", type: "PDF Guide", size: "4.2 MB", icon: BookOpen, desc: "Detailed breakdown of Information Gain, Gini Impurity, and Scikit-Learn decision tree implementation." },
    { id: 2, title: "Operating Systems Process Synchronization & Semaphores", subject: "Operating Systems", type: "AI Summary", size: "1.8 MB", icon: FileText, desc: "AI-generated flashcards on Mutex vs Counting Semaphores and Dining Philosophers Solution." },
    { id: 3, title: "Data Structures: Dijkstra & Shortest Path Algorithms", subject: "Data Structures", type: "Code Repository", size: "12.5 MB", icon: Code, desc: "Complete C++ and Python implementations of Min-Heap Dijkstra and Bellman-Ford algorithms." },
    { id: 4, title: "Full Stack React & Next.js Architecture Lab Notes", subject: "Web Architectures", type: "PDF Guide", size: "5.6 MB", icon: BookOpen, desc: "Server Components, REST APIs, and Docker container deployment guide for CSE 5th Semester." },
    { id: 5, title: "Gradient Descent & Backpropagation Video Walkthrough", subject: "AI & ML", type: "Video Lecture", size: "140 MB", icon: Video, desc: "Visual walkthrough of Loss Function minimization and Stochastic Gradient Descent." },
    { id: 6, title: "Banker's Deadlock Avoidance Cheat Sheet", subject: "Operating Systems", type: "PDF Guide", size: "2.1 MB", icon: BookOpen, desc: "Safety matrix calculation formulas and sample numerical problems for mid-sem exam." }
  ];

  const filteredMaterials = allMaterials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || m.subject === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>AI Study Materials & Knowledge Hub</span>
            <span className="badge badge-emerald">SIH Smart Repository</span>
          </h1>
          <p className="page-subtitle">Access curated AI summaries, lecture notes, video walk-throughs, and code repositories.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-card mb-24">
        <div className="materials-controls">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search study materials, notes, algorithms, PDFs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-chips">
            {['All', 'AI & ML', 'Operating Systems', 'Data Structures', 'Web Architectures'].map(cat => (
              <button 
                key={cat}
                className={`cat-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="materials-grid">
        {filteredMaterials.map((item) => {
          const IconComp = item.icon;
          return (
            <div key={item.id} className="glass-card material-card hover-glow">
              <div className="mat-header mb-12">
                <div className="mat-icon-bg">
                  <IconComp size={22} className="text-indigo" />
                </div>
                <div>
                  <span className="badge badge-indigo mb-4">{item.subject}</span>
                  <h4 className="mat-title-text">{item.title}</h4>
                </div>
              </div>

              <p className="mat-desc">{item.desc}</p>

              <div className="mat-footer">
                <span className="mat-meta">{item.type} • {item.size}</span>
                <button className="btn btn-primary btn-sm" onClick={() => alert(`Downloading ${item.title}...`)}>
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .mb-24 { margin-bottom: 24px; }
        .mb-12 { margin-bottom: 12px; }
        .mb-4 { margin-bottom: 4px; }
        .materials-controls { display: flex; flex-direction: column; gap: 16px; }
        .category-chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .cat-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-chip.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
        }
        .materials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 900px) { .materials-grid { grid-template-columns: 1fr; } }
        .material-card { display: flex; flex-direction: column; justify-content: space-between; gap: 12px; }
        .mat-header { display: flex; gap: 12px; align-items: flex-start; }
        .mat-icon-bg {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(99, 102, 241, 0.15);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .mat-title-text { font-size: 0.98rem; font-weight: 700; color: var(--text-main); }
        .mat-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; }
        .mat-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-color); }
        .mat-meta { font-size: 0.74rem; color: var(--text-dim); }
      `}</style>
    </div>
  );
}
