import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { WeeklyStudyBarChart, ActivityHeatmap } from '../components/ChartComponents';
import { sampleStudents } from '../data/mockData';

export default function ProgressPage({ student, role }) {
  const currentStudent = student || sampleStudents[0];

  const milestones = [
    { date: 'Sep 08, 2026', title: 'Dynamic Programming Quiz Mastered', subject: 'Data Structures', score: '90%' },
    { date: 'Sep 04, 2026', title: 'Socratic AI Session: Operating System Semaphores', subject: 'Operating Systems', score: 'Passed' },
    { date: 'Aug 29, 2026', title: 'Mid-Sem Practice Test #2 Completed', subject: 'AI & ML', score: '84%' },
    { date: 'Aug 22, 2026', title: 'Unlocked React Server Components Badge', subject: 'Web Dev', score: '95%' }
  ];

  const handleDownloadReport = () => {
    alert(`Downloading Official SmartLearn AI Progress Report for ${currentStudent.name} (${currentStudent.id})...`);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Progress & Learning Timeline</span>
            <span className="badge badge-amber">{currentStudent.name} • 14-Day Streak 🔥</span>
          </h1>
          <p className="page-subtitle">Track your historical study hours, streak consistency, and milestone achievements.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleDownloadReport}>
            <Download size={16} />
            <span>Download Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Grid: Study Hours Bar + Heatmap */}
      <div className="grid-2 mb-24">
        {/* Weekly Study Hours */}
        <div className="glass-card">
          <div className="card-top-flex mb-14">
            <div>
              <h3>Weekly Study Hours Log</h3>
              <p className="card-sub">Daily tracked active learning minutes</p>
            </div>
            <span className="badge badge-indigo">18.5 hrs Total</span>
          </div>

          <WeeklyStudyBarChart />
        </div>

        {/* Activity Heatmap Calendar */}
        <div className="glass-card">
          <div className="card-top-flex mb-14">
            <div>
              <h3>Study Streak Calendar</h3>
              <p className="card-sub">Consistency heatmap over the last 30 days</p>
            </div>
            <span className="badge badge-emerald">Active Learning</span>
          </div>

          <ActivityHeatmap />
        </div>
      </div>

      {/* Timeline of Milestones */}
      <div className="glass-card timeline-card">
        <h3>Milestone Achievement History</h3>
        <p className="card-sub mb-20">Chronological verification of completed modules & tests</p>

        <div className="timeline-list">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-date">{m.date}</div>
              <div className="timeline-node">
                <CheckCircle2 size={16} className="text-emerald" />
              </div>
              <div className="timeline-content">
                <span className="badge badge-indigo mb-4">{m.subject}</span>
                <h4 className="m-title">{m.title}</h4>
                <span className="m-score">Retained Score: {m.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .mb-24 { margin-bottom: 24px; }
        .mb-20 { margin-bottom: 20px; }
        .mb-14 { margin-bottom: 14px; }
        .mb-4 { margin-bottom: 4px; }
        .text-emerald { color: #34d399; }
        .card-sub { font-size: 0.8rem; color: var(--text-muted); }

        .card-top-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          padding-left: 20px;
        }

        .timeline-list::before {
          content: '';
          position: absolute;
          left: 128px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 600px) {
          .timeline-list::before { left: 8px; }
        }

        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }

        .timeline-date {
          width: 100px;
          font-size: 0.78rem;
          color: var(--text-dim);
          font-weight: 600;
          text-align: right;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .timeline-node {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 2;
        }

        .timeline-content {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          flex: 1;
        }

        .m-title {
          font-size: 0.92rem;
          font-weight: 700;
        }

        .m-score {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 4px;
          display: block;
        }
      `}</style>
    </div>
  );
}
