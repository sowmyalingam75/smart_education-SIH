import React from 'react';
import { 
  BarChart3, 
  Award, 
  Target, 
  Flame, 
  Code, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';
import { RadarChart } from '../components/ChartComponents';
import { sampleStudents } from '../data/mockData';

export default function PerformancePage({ student, role }) {
  const currentStudent = student || sampleStudents[0];
  const subjectPerformance = currentStudent.subjectPerformance || [];

  const radarData = subjectPerformance.map(s => ({
    subject: s.name.split(' ')[0],
    score: s.mastery
  }));

  const badges = [
    { id: "b1", title: "Streak Master", desc: "14 Days Active Learning", icon: "Flame", color: "#f59e0b" },
    { id: "b2", title: "Code Wizard", desc: "95% Score in Web Dev", icon: "Code", color: "#06b6d4" },
    { id: "b3", title: "Problem Solver", desc: "50+ Quizzes Solved", icon: "CheckCircle2", color: "#10b981" },
    { id: "b4", title: "AI Enthusiast", desc: "20+ AI Tutor Sessions", icon: "Sparkles", color: "#8b5cf6" }
  ];

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Flame': return Flame;
      case 'Code': return Code;
      case 'CheckCircle2': return CheckCircle2;
      case 'Sparkles': return Sparkles;
      default: return Award;
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Performance Analytics</span>
            <span className="badge badge-emerald">{currentStudent.name} ({currentStudent.id})</span>
          </h1>
          <p className="page-subtitle">Granular topic mastery analysis, learning speed velocity, and skill achievement badges.</p>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Speed Velocity */}
      <div className="grid-2 mb-24">
        {/* Radar Visual Card */}
        <div className="glass-card radar-card">
          <div className="card-header-flex">
            <div>
              <h3>Subject Mastery Matrix</h3>
              <p className="card-sub">AI-computed concept retention balance across CSE topics</p>
            </div>
            <span className="badge badge-indigo">Multi-Axis Evaluation</span>
          </div>

          <RadarChart data={radarData} />
        </div>

        {/* Velocity Metrics & Speed */}
        <div className="glass-card velocity-card">
          <h3>Learning Velocity & Accuracy</h3>
          <p className="card-sub mb-16">Metrics computed from practice quizzes & AI Tutor interactions</p>

          <div className="velocity-stats-grid">
            <div className="vel-item">
              <div className="vel-icon-box bg-emerald">
                <Zap size={20} />
              </div>
              <div>
                <span className="vel-val">{currentStudent.quizScore}%</span>
                <span className="vel-label">Quiz Performance Score</span>
              </div>
            </div>

            <div className="vel-item">
              <div className="vel-icon-box bg-indigo">
                <TrendingUp size={20} />
              </div>
              <div>
                <span className="vel-val">{currentStudent.internalMarks}/100</span>
                <span className="vel-label">Internal Exam Score</span>
              </div>
            </div>

            <div className="vel-item">
              <div className="vel-icon-box bg-cyan">
                <Target size={20} />
              </div>
              <div>
                <span className="vel-val">{currentStudent.attendance}%</span>
                <span className="vel-label">Class Attendance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Subject Breakdown */}
      <div className="glass-card mb-24">
        <h3>Granular Concept Diagnosis</h3>
        <p className="card-sub mb-20">AI diagnosis of specific weak topics needing practice vs strong areas</p>

        <div className="subject-diag-grid">
          {subjectPerformance.map(subject => (
            <div key={subject.id} className="diag-card-item">
              <div className="diag-top">
                <h4>{subject.name}</h4>
                <span className="score-badge" style={{ color: subject.statusColor }}>{subject.mastery}% Mastery</span>
              </div>

              <div className="diag-details">
                <div className="diag-row weak">
                  <AlertCircle size={16} className="text-amber" />
                  <div>
                    <span className="row-label">Needs Focus:</span>
                    <span className="row-val">{subject.weakTopic}</span>
                  </div>
                </div>

                <div className="diag-row strong">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <div>
                    <span className="row-label">Modules Completed:</span>
                    <span className="row-val">{subject.completedModules}/{subject.totalModules}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Badges Showcase */}
      <div className="glass-card badges-card">
        <h3>Skill Badges & Milestones</h3>
        <p className="card-sub mb-16">Achievements unlocked on SmartLearn AI platform</p>

        <div className="grid-4">
          {badges.map(badge => {
            const Icon = getBadgeIcon(badge.icon);
            return (
              <div key={badge.id} className="badge-item-card">
                <div className="badge-icon-box" style={{ background: `${badge.color}20`, color: badge.color, border: `1px solid ${badge.color}40` }}>
                  <Icon size={26} />
                </div>
                <h4 className="badge-title">{badge.title}</h4>
                <span className="badge-desc">{badge.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .mb-24 { margin-bottom: 24px; }
        .mb-20 { margin-bottom: 20px; }
        .mb-16 { margin-bottom: 16px; }
        .card-sub { font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; }
        .text-amber { color: #f59e0b; }
        .text-emerald { color: #34d399; }

        .card-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .velocity-stats-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }

        .vel-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
        }

        .vel-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-emerald { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .bg-indigo { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
        .bg-cyan { background: rgba(6, 182, 212, 0.15); color: #22d3ee; }

        .vel-val {
          font-size: 1.25rem;
          font-weight: 800;
          display: block;
          line-height: 1.1;
        }

        .vel-label {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .subject-diag-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 900px) {
          .subject-diag-grid { grid-template-columns: 1fr; }
        }

        .diag-card-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .diag-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .diag-top h4 {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .score-badge {
          font-weight: 800;
          font-size: 0.88rem;
        }

        .diag-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .diag-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.8rem;
        }

        .row-label {
          font-weight: 600;
          margin-right: 4px;
        }

        .row-val {
          color: var(--text-muted);
        }

        .badge-item-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          transition: transform 0.2s;
        }

        .badge-item-card:hover {
          transform: translateY(-4px);
        }

        .badge-icon-box {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .badge-title {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .badge-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
