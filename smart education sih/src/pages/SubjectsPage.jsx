import React, { useState } from 'react';
import { BookOpen, User, Calendar, CheckCircle2, Clock, FileText, Sparkles, HelpCircle, ChevronRight, X, Download } from 'lucide-react';
import { mockSubjectsList } from '../data/mockData';

export default function SubjectsPage({ setCurrentPage, student }) {
  const [filter, setFilter] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredSubjects = mockSubjectsList.filter(subj => {
    if (filter === 'completed') return subj.progress === 100;
    if (filter === 'in-progress') return subj.progress < 100;
    return true;
  });

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <BookOpen className="text-primary" size={28} />
            My Subjects
          </h1>
          <p className="page-subtitle">
            Manage your enrolled courses, syllabus progress, lecture notes, and upcoming exams.
          </p>
        </div>
        
        {/* Filter Pills */}
        <div className="filter-pills">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Courses ({mockSubjectsList.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setFilter('in-progress')}
          >
            In Progress ({mockSubjectsList.filter(s => s.progress < 100).length})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({mockSubjectsList.filter(s => s.progress === 100).length})
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid-2" style={{ gap: '24px' }}>
        {filteredSubjects.map(subj => {
          const completedUnits = subj.syllabus.filter(u => u.completed).length;
          const totalUnits = subj.syllabus.length;
          
          return (
            <div key={subj.id} className="glass-card hover-glow subject-card">
              <div className="card-top-bar">
                <span className={`badge ${subj.badgeColor}`}>{subj.code}</span>
                <span className="badge badge-indigo">
                  <User size={12} /> {subj.instructor}
                </span>
              </div>

              <h2 className="subject-name">{subj.name}</h2>
              <p className="subject-desc">{subj.description}</p>

              {/* Progress section */}
              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Syllabus Completion</span>
                  <span className="progress-value">{subj.progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ 
                      width: `${subj.progress}%`,
                      background: 'var(--gradient-primary)'
                    }}
                  />
                </div>
              </div>

              {/* Meta stats */}
              <div className="subject-meta-grid">
                <div className="meta-item">
                  <Clock size={14} className="text-muted" />
                  <span>{completedUnits}/{totalUnits} Units Done</span>
                </div>
                <div className="meta-item">
                  <Calendar size={14} className="text-muted" />
                  <span>Exam: {subj.nextExam}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="subject-actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedSubject(subj)}
                >
                  <FileText size={14} />
                  <span>Syllabus & Notes</span>
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setCurrentPage('ai-assistant')}
                >
                  <Sparkles size={14} />
                  <span>Ask AI</span>
                </button>
                <button 
                  className="btn btn-emerald btn-sm"
                  onClick={() => setCurrentPage('quiz')}
                >
                  <HelpCircle size={14} />
                  <span>Practice Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Syllabus Modal / Drawer */}
      {selectedSubject && (
        <div className="modal-backdrop" onClick={() => setSelectedSubject(null)}>
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className={`badge ${selectedSubject.badgeColor}`}>{selectedSubject.code}</span>
                <h2 style={{ marginTop: '8px', fontSize: '1.4rem' }}>{selectedSubject.name}</h2>
                <p className="page-subtitle">Instructor: {selectedSubject.instructor} • Credits: {selectedSubject.credits}</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedSubject(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Units Timeline */}
              <h3 className="section-title">
                <CheckCircle2 size={18} className="text-emerald" /> Syllabus & Unit Modules
              </h3>
              <div className="units-list">
                {selectedSubject.syllabus.map((unit, index) => (
                  <div key={index} className={`unit-item ${unit.completed ? 'completed' : ''}`}>
                    <div className="unit-status-icon">
                      {unit.completed ? <CheckCircle2 size={16} color="#10b981" /> : <Clock size={16} color="#94a3b8" />}
                    </div>
                    <div className="unit-info">
                      <div className="unit-tag">{unit.unit}</div>
                      <div className="unit-title">{unit.title}</div>
                    </div>
                    <span className={`badge ${unit.completed ? 'badge-emerald' : 'badge-amber'}`}>
                      {unit.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Course Resources */}
              <h3 className="section-title" style={{ marginTop: '24px' }}>
                <FileText size={18} className="text-primary" /> Study Resources & Materials
              </h3>
              <div className="resources-list">
                {selectedSubject.resources.map((res, i) => (
                  <div key={i} className="resource-item">
                    <div className="res-info">
                      <FileText size={16} className="text-primary" />
                      <div>
                        <div className="res-name">{res.name}</div>
                        <div className="res-size">{res.type} • {res.size}</div>
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => alert(`Downloading ${res.name}`)}>
                      <Download size={14} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedSubject(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setSelectedSubject(null); setCurrentPage('ai-assistant'); }}>
                <Sparkles size={16} /> Ask AI about this course
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .filter-pills {
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          padding: 4px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .filter-btn {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn.active {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
        }

        .subject-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .card-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .subject-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .subject-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .progress-section {
          background: rgba(255, 255, 255, 0.03);
          padding: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          margin-bottom: 8px;
        }

        .progress-label { color: var(--text-muted); }
        .progress-value { font-weight: 700; color: #818cf8; }

        .subject-meta-grid {
          display: flex;
          gap: 16px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .subject-actions {
          display: flex;
          gap: 8px;
          margin-top: 6px;
          flex-wrap: wrap;
        }

        /* Modal styling */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 650px;
          max-height: 85vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
          margin-bottom: 16px;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
        }

        .close-btn:hover { color: white; background: rgba(255,255,255,0.1); }

        .section-title {
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .units-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .unit-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .unit-item.completed {
          background: rgba(16, 185, 129, 0.05);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .unit-info { flex: 1; }
        .unit-tag { font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; }
        .unit-title { font-size: 0.88rem; font-weight: 600; color: var(--text-main); }

        .resources-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .resource-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .res-info { display: flex; align-items: center; gap: 10px; }
        .res-name { font-size: 0.86rem; font-weight: 600; }
        .res-size { font-size: 0.72rem; color: var(--text-muted); }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
