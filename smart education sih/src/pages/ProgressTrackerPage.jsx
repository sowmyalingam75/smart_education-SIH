import React, { useState } from 'react';
import { BarChart3, TrendingUp, Trophy, Star, Clock, Target, Zap, BookOpen, CheckCircle2 } from 'lucide-react';
import { mockAchievements } from '../data/mockData';

const weeklyStudyData = [
  { day: 'Mon', hours: 4, quiz: 82 },
  { day: 'Tue', hours: 2.5, quiz: 0 },
  { day: 'Wed', hours: 5, quiz: 95 },
  { day: 'Thu', hours: 3, quiz: 78 },
  { day: 'Fri', hours: 4.5, quiz: 92 },
  { day: 'Sat', hours: 6, quiz: 88 },
  { day: 'Sun', hours: 1, quiz: 0 },
];

const subjectMastery = [
  { name: 'Data Structures & Algorithms', mastery: 94, color: '#10b981', modules: '15/16' },
  { name: 'Full Stack Web Architectures', mastery: 96, color: '#06b6d4', modules: '12/12' },
  { name: 'Artificial Intelligence & ML', mastery: 78, color: '#6366f1', modules: '9/14' },
  { name: 'Operating Systems & Virtualization', mastery: 74, color: '#f59e0b', modules: '7/11' },
];

const quizScoreTrend = [88, 72, 91, 85, 95, 78, 92, 96, 88, 95];

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.hours));
  return (
    <div className="chart-container">
      {data.map((d, i) => (
        <div key={d.day} className="chart-col">
          <div className="chart-bar-wrap">
            <div
              className="chart-bar"
              style={{ height: `${(d.hours / max) * 120}px` }}
              title={`${d.hours}h`}
            />
          </div>
          <span className="chart-label">{d.day}</span>
          <span className="chart-val">{d.hours}h</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ scores }) {
  const w = 340, h = 100;
  const max = Math.max(...scores);
  const min = Math.min(...scores) - 5;
  const points = scores.map((s, i) => ({
    x: (i / (scores.length - 1)) * (w - 20) + 10,
    y: h - ((s - min) / (max - min)) * (h - 20) - 10,
    val: s,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lineGrad)" />
      <path d={pathD} stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#6366f1" stroke="rgba(99,102,241,0.4)" strokeWidth="6" />
        </g>
      ))}
    </svg>
  );
}

export default function ProgressTrackerPage({ setCurrentPage, student }) {
  const [tab, setTab] = useState('overview');

  const totalStudyHours = weeklyStudyData.reduce((s, d) => s + d.hours, 0);
  const avgQuizScore = student?.quizScore || 88;
  const streak = 7;
  const overallProgress = student?.learningProgress || 86;

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <BarChart3 size={28} style={{ color: '#6366f1' }} />
            Progress Tracker
          </h1>
          <p className="page-subtitle">
            Detailed analytics of your learning journey, quiz performance, and subject mastery.
          </p>
        </div>
        <div className="tab-group">
          {['overview', 'subjects', 'achievements'].map(t => (
            <button
              key={t}
              className={`tab-btn ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="kpi-bar">
        {[
          { label: 'Study Hours (Week)', value: `${totalStudyHours}h`, icon: Clock, color: '#06b6d4' },
          { label: 'Avg Quiz Score', value: `${avgQuizScore}%`, icon: Target, color: '#6366f1' },
          { label: 'Study Streak', value: `${streak} days`, icon: Zap, color: '#f59e0b' },
          { label: 'Overall Progress', value: `${overallProgress}%`, icon: TrendingUp, color: '#10b981' },
        ].map(kpi => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="glass-card kpi-item">
              <div className="kpi-icon" style={{ background: `${kpi.color}20`, color: kpi.color }}>
                <Icon size={20} />
              </div>
              <div>
                <div className="kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OVERVIEW TAB */}
      {tab === 'overview' && (
        <div className="progress-grid">
          {/* Weekly Study Hours Bar Chart */}
          <div className="glass-card chart-card">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Weekly Study Hours</h3>
                <p className="chart-sub">Total: {totalStudyHours}h this week</p>
              </div>
              <span className="badge badge-cyan">This Week</span>
            </div>
            <BarChart data={weeklyStudyData} />
          </div>

          {/* Quiz Score Trend Line Chart */}
          <div className="glass-card chart-card">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Quiz Score Trend</h3>
                <p className="chart-sub">Last 10 quizzes taken</p>
              </div>
              <span className="badge badge-indigo">Trending ↑</span>
            </div>
            <LineChart scores={quizScoreTrend} />
            <div className="line-labels">
              {quizScoreTrend.map((s, i) => (
                <span key={i} className="line-label">{s}%</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBJECTS TAB */}
      {tab === 'subjects' && (
        <div>
          <div className="glass-card">
            <h3 className="chart-title" style={{ marginBottom: '20px' }}>Subject Mastery Breakdown</h3>
            <div className="mastery-list">
              {subjectMastery.map((subj, i) => (
                <div key={i} className="mastery-item">
                  <div className="mastery-info">
                    <div className="mastery-name">{subj.name}</div>
                    <div className="mastery-meta">
                      <span className="mastery-modules"><BookOpen size={12} /> {subj.modules} modules</span>
                      <span className="mastery-pct" style={{ color: subj.color }}>{subj.mastery}%</span>
                    </div>
                  </div>
                  <div className="progress-bar-bg mastery-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${subj.mastery}%`, background: `linear-gradient(90deg, ${subj.color}99, ${subj.color})` }}
                    />
                  </div>
                  <div className="mastery-status">
                    {subj.mastery >= 90 ? <span className="badge badge-emerald">Expert</span>
                      : subj.mastery >= 75 ? <span className="badge badge-indigo">On Track</span>
                      : <span className="badge badge-amber">Needs Focus</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Competency */}
          <div className="glass-card" style={{ marginTop: '20px' }}>
            <h3 className="chart-title" style={{ marginBottom: '16px' }}>Core Skill Competencies</h3>
            <div className="skills-grid">
              {[
                { name: 'Problem Solving', val: 88 },
                { name: 'Algorithm Design', val: 82 },
                { name: 'Mathematical Reasoning', val: 74 },
                { name: 'Code Implementation', val: 91 },
                { name: 'Debugging & Testing', val: 86 },
                { name: 'Concept Retention', val: 79 },
              ].map(skill => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.val}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${skill.val}%`, background: 'var(--gradient-primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ACHIEVEMENTS TAB */}
      {tab === 'achievements' && (
        <div>
          <div className="achievements-grid">
            {mockAchievements.map(ach => (
              <div key={ach.id} className={`glass-card achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}`}>
                <div className="ach-icon">{ach.icon}</div>
                <div className="ach-info">
                  <div className="ach-title">{ach.title}</div>
                  <div className="ach-desc">{ach.desc}</div>
                  <div className="ach-date">
                    {ach.unlocked
                      ? <><CheckCircle2 size={12} color="#10b981" /> Unlocked {ach.date}</>
                      : <><Star size={12} color="#f59e0b" /> {ach.date}</>
                    }
                  </div>
                </div>
                {ach.unlocked && <div className="ach-glow" />}
              </div>
            ))}
          </div>

          {/* XP Progress */}
          <div className="glass-card xp-card">
            <div className="xp-header">
              <div>
                <h3 className="chart-title">Experience Points (XP)</h3>
                <p className="chart-sub">Level 8 Scholar — 2,340 / 3,000 XP to next level</p>
              </div>
              <div className="level-badge">
                <Trophy size={20} color="#fbbf24" />
                <span>Lv. 8</span>
              </div>
            </div>
            <div className="progress-bar-bg" style={{ height: '12px', marginTop: '12px' }}>
              <div className="progress-bar-fill" style={{ width: '78%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
            </div>
            <div className="xp-labels">
              <span>2,340 XP</span>
              <span>78% to Level 9</span>
              <span>3,000 XP</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .tab-group {
          display: flex;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 3px;
          gap: 2px;
        }

        .tab-btn {
          padding: 7px 18px;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 2px 10px rgba(99,102,241,0.3);
        }

        .kpi-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .kpi-item { display: flex; align-items: center; gap: 14px; }
        .kpi-icon { width: 44px; height: 44px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .kpi-value { font-size: 1.5rem; font-weight: 800; font-family: var(--font-heading); line-height: 1.1; }
        .kpi-label { font-size: 0.75rem; color: var(--text-muted); margin-top: 2px; }

        .progress-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .chart-card { padding: 20px; }
        .chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .chart-title { font-size: 1rem; font-weight: 700; }
        .chart-sub { font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; }

        /* Bar Chart */
        .chart-container {
          display: flex;
          gap: 8px;
          align-items: flex-end;
          height: 140px;
          padding-bottom: 4px;
        }

        .chart-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .chart-bar-wrap { flex: 1; display: flex; align-items: flex-end; width: 100%; }

        .chart-bar {
          width: 100%;
          background: linear-gradient(to top, #6366f1, #8b5cf6);
          border-radius: 6px 6px 0 0;
          min-height: 4px;
          transition: height 0.4s;
        }

        .chart-label { font-size: 0.7rem; color: var(--text-dim); }
        .chart-val { font-size: 0.68rem; color: var(--text-muted); }

        /* Line chart labels */
        .line-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
        }

        .line-label { font-size: 0.65rem; color: var(--text-dim); }

        /* Mastery */
        .mastery-list { display: flex; flex-direction: column; gap: 18px; }
        .mastery-item { display: flex; flex-direction: column; gap: 8px; }
        .mastery-info { display: flex; justify-content: space-between; align-items: center; }
        .mastery-name { font-size: 0.9rem; font-weight: 600; }
        .mastery-meta { display: flex; align-items: center; gap: 10px; }
        .mastery-modules { display: flex; align-items: center; gap: 4px; font-size: 0.78rem; color: var(--text-muted); }
        .mastery-pct { font-size: 1rem; font-weight: 800; font-family: var(--font-heading); }
        .mastery-bar { height: 10px !important; }
        .mastery-status { display: flex; justify-content: flex-end; }

        /* Skills Grid */
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .skill-item { display: flex; flex-direction: column; gap: 6px; }
        .skill-header { display: flex; justify-content: space-between; }
        .skill-name { font-size: 0.84rem; color: var(--text-muted); }
        .skill-pct { font-size: 0.84rem; font-weight: 700; color: var(--text-main); }

        /* Achievements */
        .achievements-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }

        .achievement-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .achievement-card.unlocked { border-color: rgba(99,102,241,0.3); }
        .achievement-card.locked { opacity: 0.5; filter: grayscale(0.6); }

        .ach-icon { font-size: 2.5rem; }
        .ach-title { font-size: 0.92rem; font-weight: 700; }
        .ach-desc { font-size: 0.78rem; color: var(--text-muted); }
        .ach-date { display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.72rem; color: var(--text-dim); }

        .ach-glow {
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: var(--gradient-primary);
          border-radius: 0;
        }

        /* XP Card */
        .xp-card { }
        .xp-header { display: flex; justify-content: space-between; align-items: center; }
        .level-badge { display: flex; align-items: center; gap: 8px; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.4); border-radius: var(--radius-full); padding: 6px 14px; font-weight: 700; color: #fbbf24; }
        .xp-labels { display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.75rem; color: var(--text-muted); }

        @media (max-width: 1024px) {
          .kpi-bar { grid-template-columns: repeat(2, 1fr); }
          .progress-grid { grid-template-columns: 1fr; }
          .achievements-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr; }
          .achievements-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
