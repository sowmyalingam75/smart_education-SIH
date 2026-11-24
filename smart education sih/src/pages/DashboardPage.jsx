import React from 'react';
import {
  LayoutDashboard, TrendingUp, BookOpen, HelpCircle, Bot, CalendarCheck, FileText,
  Flame, Target, Clock, Star, ArrowRight, Zap, CheckCircle2
} from 'lucide-react';
import { mockSubjectsList, mockStudyTasks } from '../data/mockData';

const QUICK_ACTIONS = [
  { label: 'Start Quiz', icon: HelpCircle, color: '#06b6d4', page: 'quiz' },
  { label: 'Ask AI', icon: Bot, color: '#a78bfa', page: 'ai-assistant' },
  { label: 'Study Planner', icon: CalendarCheck, color: '#34d399', page: 'study-planner' },
  { label: 'My Notes', icon: FileText, color: '#fb923c', page: 'notes' },
];

const weekData = [
  { day: 'M', hours: 4 },
  { day: 'T', hours: 2.5 },
  { day: 'W', hours: 5 },
  { day: 'Th', hours: 3 },
  { day: 'F', hours: 4.5 },
  { day: 'Sa', hours: 6 },
  { day: 'Su', hours: 1 },
];

export default function Dashboard({ setCurrentPage, student }) {
  const pendingTasks = mockStudyTasks.filter(t => !t.completed).slice(0, 3);
  const maxHours = Math.max(...weekData.map(d => d.hours));

  const statCards = [
    { label: 'Overall GPA', value: '8.8', icon: Star, color: '#fbbf24', gradient: 'var(--gradient-amber)', change: '+0.2 this sem' },
    { label: 'Subjects', value: mockSubjectsList.length, icon: BookOpen, color: '#6366f1', gradient: 'var(--gradient-primary)', change: '4 active' },
    { label: 'Pending Tasks', value: mockStudyTasks.filter(t => !t.completed).length, icon: Target, color: '#f43f5e', gradient: 'var(--gradient-rose)', change: '2 due today' },
    { label: 'Study Hours (Week)', value: '26h', icon: Clock, color: '#10b981', gradient: 'var(--gradient-emerald)', change: '+4h vs last week' },
  ];

  return (
    <div className="page-wrapper">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-left">
          <div className="welcome-greet">
            <span className="wave">👋</span>
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'},
          </div>
          <h1 className="welcome-name">{student?.name || 'Student'}!</h1>
          <p className="welcome-sub">
            You're on a <strong style={{ color: '#f59e0b' }}>7-day study streak</strong> 🔥 — keep it up!
            <br />Your personalized AI dashboard is ready.
          </p>
          <div className="welcome-actions">
            <button className="btn btn-primary" onClick={() => setCurrentPage('study-planner')}>
              <CalendarCheck size={16} /> Plan Today's Session
            </button>
            <button className="btn btn-secondary" onClick={() => setCurrentPage('ai-assistant')}>
              <Bot size={16} /> Ask AI Tutor
            </button>
          </div>
        </div>
        <div className="welcome-right">
          <div className="streak-display">
            <Flame size={36} style={{ color: '#f59e0b' }} />
            <div className="streak-num">7</div>
            <div className="streak-label">Day Streak</div>
          </div>
          <div className="level-display">
            <Star size={28} style={{ color: '#fbbf24' }} />
            <div className="level-num">Lv.8</div>
            <div className="level-label">Scholar</div>
          </div>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="glass-card stat-card hover-glow">
              <div className="stat-icon-wrap" style={{ background: `${card.color}20` }}>
                <Icon size={22} style={{ color: card.color }} />
              </div>
              <div className="stat-value" style={{ color: card.color }}>{card.value}</div>
              <div className="stat-label">{card.label}</div>
              <div className="stat-change">
                <TrendingUp size={11} /> {card.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="section-header-row">
        <h2 className="section-title-main">Quick Actions</h2>
      </div>
      <div className="quick-actions-grid" style={{ marginBottom: '28px' }}>
        {QUICK_ACTIONS.map(a => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className="glass-card quick-action-btn hover-glow"
              onClick={() => setCurrentPage(a.page)}
            >
              <div className="qa-icon" style={{ color: a.color, background: `${a.color}20` }}>
                <Icon size={22} />
              </div>
              <span className="qa-label">{a.label}</span>
              <ArrowRight size={14} style={{ color: a.color, marginLeft: 'auto' }} />
            </button>
          );
        })}
      </div>

      <div className="grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
        {/* Active Subject Progress */}
        <div className="glass-card">
          <div className="section-header-row">
            <h2 className="section-title-main">
              <BookOpen size={18} style={{ color: '#6366f1' }} />
              Active Subjects
            </h2>
            <button className="text-link-btn" onClick={() => setCurrentPage('subjects')}>
              View All <ArrowRight size={13} />
            </button>
          </div>
          <div className="subjects-progress-list">
            {mockSubjectsList.map(subj => (
              <div key={subj.id} className="subj-progress-row">
                <div className="sprow-left">
                  <div className="subj-dot" style={{ background: subj.progress >= 90 ? '#10b981' : subj.progress >= 70 ? '#6366f1' : '#f59e0b' }} />
                  <div>
                    <div className="sprow-name">{subj.name.split(' ').slice(0, 3).join(' ')}</div>
                    <div className="sprow-meta">{subj.code} • {subj.instructor.split(' ')[0]} {subj.instructor.split(' ')[1]}</div>
                  </div>
                </div>
                <div className="sprow-right">
                  <div className="sprow-pct">{subj.progress}%</div>
                  <div className="progress-bar-bg sprow-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${subj.progress}%`,
                        background: subj.progress >= 90 ? 'var(--gradient-emerald)' : subj.progress >= 70 ? 'var(--gradient-primary)' : 'var(--gradient-amber)'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Study Activity Mini-Chart */}
        <div className="glass-card">
          <div className="section-header-row">
            <h2 className="section-title-main">
              <Zap size={18} style={{ color: '#f59e0b' }} />
              Weekly Activity
            </h2>
            <button className="text-link-btn" onClick={() => setCurrentPage('progress-tracker')}>
              Full Analytics <ArrowRight size={13} />
            </button>
          </div>
          <div className="mini-bar-chart">
            {weekData.map((d, i) => (
              <div key={d.day} className={`mini-bar-col ${i === new Date().getDay() - 1 ? 'today' : ''}`}>
                <div className="mini-bar-wrap">
                  <div
                    className="mini-bar"
                    style={{ height: `${(d.hours / maxHours) * 100}px` }}
                  />
                </div>
                <span className="mini-bar-label">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="chart-summary">
            <div className="cs-item">
              <Clock size={14} style={{ color: '#06b6d4' }} />
              <span>Total: <strong style={{ color: 'var(--text-main)' }}>26h this week</strong></span>
            </div>
            <div className="cs-item">
              <TrendingUp size={14} style={{ color: '#10b981' }} />
              <span><strong style={{ color: '#10b981' }}>+4h</strong> vs last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="glass-card">
        <div className="section-header-row">
          <h2 className="section-title-main">
            <Target size={18} style={{ color: '#f43f5e' }} />
            Upcoming Tasks
          </h2>
          <button className="text-link-btn" onClick={() => setCurrentPage('study-planner')}>
            Study Planner <ArrowRight size={13} />
          </button>
        </div>
        <div className="upcoming-tasks-list">
          {pendingTasks.map(task => (
            <div key={task.id} className="upcoming-task-item">
              <CheckCircle2 size={18} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
              <div className="ut-body">
                <div className="ut-title">{task.title}</div>
                <div className="ut-meta">
                  <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>{task.subject.split(' ')[0]}</span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                    <Clock size={11} /> {task.dueDate}
                  </span>
                </div>
              </div>
              <span className={`badge ${task.priority === 'High' ? 'badge-rose' : task.priority === 'Medium' ? 'badge-amber' : 'badge-emerald'}`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .welcome-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1));
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: var(--radius-lg);
          padding: 28px 32px;
          margin-bottom: 28px;
          position: relative;
          overflow: hidden;
        }

        .welcome-banner::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%);
          pointer-events: none;
        }

        .welcome-greet { font-size: 1rem; color: var(--text-muted); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .wave { font-size: 1.2rem; }
        .welcome-name { font-size: 2.2rem; font-weight: 800; font-family: var(--font-heading); margin-bottom: 10px; line-height: 1; }
        .welcome-sub { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.6; }
        .welcome-actions { display: flex; gap: 12px; }

        .welcome-right { display: flex; gap: 20px; align-items: center; }

        .streak-display, .level-display {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-md); padding: 16px 20px;
          min-width: 80px;
        }

        .streak-num, .level-num { font-size: 1.8rem; font-weight: 800; font-family: var(--font-heading); color: var(--text-main); }
        .streak-label, .level-label { font-size: 0.72rem; color: var(--text-muted); }

        /* Stat Cards */
        .stat-card { display: flex; flex-direction: column; gap: 6px; }
        .stat-icon-wrap { width: 44px; height: 44px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; margin-bottom: 6px; }
        .stat-value { font-size: 2rem; font-weight: 800; font-family: var(--font-heading); line-height: 1; }
        .stat-label { font-size: 0.82rem; color: var(--text-muted); }
        .stat-change { display: flex; align-items: center; gap: 4px; font-size: 0.72rem; color: var(--text-dim); margin-top: 4px; }

        /* Quick Actions */
        .quick-actions-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .quick-action-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 16px; cursor: pointer; border: none; text-align: left;
          background: rgba(255,255,255,0.03);
          transition: all 0.25s;
        }
        .qa-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .qa-label { font-size: 0.88rem; font-weight: 700; color: var(--text-main); flex: 1; }

        /* Section headers */
        .section-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .section-title-main { display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 700; }
        .text-link-btn { display: flex; align-items: center; gap: 4px; background: none; border: none; color: #818cf8; font-size: 0.82rem; cursor: pointer; font-weight: 600; }
        .text-link-btn:hover { color: white; }

        /* Subject Progress */
        .subjects-progress-list { display: flex; flex-direction: column; gap: 14px; }
        .subj-progress-row { display: flex; align-items: center; gap: 14px; }
        .sprow-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .subj-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .sprow-name { font-size: 0.88rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sprow-meta { font-size: 0.72rem; color: var(--text-muted); }
        .sprow-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; min-width: 120px; }
        .sprow-pct { font-size: 0.82rem; font-weight: 700; color: var(--text-main); }
        .sprow-bar { width: 100px; height: 6px !important; }

        /* Mini Bar Chart */
        .mini-bar-chart {
          display: flex; gap: 8px; height: 110px; align-items: flex-end; padding-bottom: 4px; margin-bottom: 12px;
        }

        .mini-bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .mini-bar-wrap { flex: 1; display: flex; align-items: flex-end; width: 100%; }
        .mini-bar {
          width: 100%; background: rgba(99,102,241,0.35); border-radius: 4px 4px 0 0;
          min-height: 4px; transition: height 0.4s;
        }
        .mini-bar-col.today .mini-bar { background: var(--gradient-primary); }
        .mini-bar-label { font-size: 0.65rem; color: var(--text-dim); }

        .chart-summary { display: flex; gap: 16px; border-top: 1px solid var(--border-color); padding-top: 12px; }
        .cs-item { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--text-muted); }

        /* Upcoming Tasks */
        .upcoming-tasks-list { display: flex; flex-direction: column; gap: 10px; }
        .upcoming-task-item { display: flex; align-items: center; gap: 14px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .upcoming-task-item:last-child { border-bottom: none; }
        .ut-body { flex: 1; }
        .ut-title { font-size: 0.9rem; font-weight: 600; margin-bottom: 4px; }
        .ut-meta { display: flex; align-items: center; gap: 8px; }

        @media (max-width: 1100px) {
          .quick-actions-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .welcome-banner { flex-direction: column; gap: 20px; }
          .welcome-right { flex-direction: row; justify-content: center; }
          .quick-actions-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
