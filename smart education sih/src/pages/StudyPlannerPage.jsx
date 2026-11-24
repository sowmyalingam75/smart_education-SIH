import React, { useState, useEffect, useRef } from 'react';
import { CalendarCheck, Plus, CheckCircle2, Clock, Trash2, Timer, Play, Pause, RotateCcw, Flag, X, Filter } from 'lucide-react';
import { mockStudyTasks } from '../data/mockData';

const PRIORITY_COLORS = {
  High: { badge: 'badge-rose', dot: '#f43f5e' },
  Medium: { badge: 'badge-amber', dot: '#f59e0b' },
  Low: { badge: 'badge-emerald', dot: '#10b981' },
};

const SUBJECTS = [
  'Artificial Intelligence & ML',
  'Data Structures & Algorithms',
  'Full Stack Web Architectures',
  'Operating Systems & Virtualization',
  'Applied Mathematics',
];

export default function StudyPlannerPage({ setCurrentPage, student }) {
  const [tasks, setTasks] = useState(mockStudyTasks);
  const [filter, setFilter] = useState('all');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', subject: SUBJECTS[0], dueDate: '', priority: 'Medium', duration: '30 mins' });

  // Pomodoro
  const [pomState, setPomState] = useState('idle'); // idle | work | break
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomSession, setPomSession] = useState(1);
  const [completedPomos, setCompletedPomos] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (pomState === 'work') {
              setCompletedPomos(c => c + 1);
              setPomState('break');
              return 5 * 60;
            } else {
              setPomState('work');
              setPomSession(s => s + 1);
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, pomState]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const startPom = () => { setPomState('work'); setIsRunning(true); setTimeLeft(25 * 60); };
  const togglePause = () => setIsRunning(p => !p);
  const resetPom = () => { setIsRunning(false); setPomState('idle'); setTimeLeft(25 * 60); clearInterval(intervalRef.current); };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    if (filter === 'high') return t.priority === 'High';
    return true;
  });

  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks(prev => [...prev, { ...newTask, id: `task-${Date.now()}`, completed: false }]);
    setNewTask({ title: '', subject: SUBJECTS[0], dueDate: '', priority: 'Medium', duration: '30 mins' });
    setShowAddTask(false);
  };

  const pomProgress = pomState === 'work'
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : pomState === 'break'
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : 0;

  const pendingCount = tasks.filter(t => !t.completed).length;
  const doneCount = tasks.filter(t => t.completed).length;

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <CalendarCheck size={28} style={{ color: '#34d399' }} />
            Study Planner
          </h1>
          <p className="page-subtitle">
            Manage study tasks, set priorities, and use the Pomodoro timer to stay focused.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddTask(true)}>
          <Plus size={16} /> Add Task
        </button>
      </div>

      <div className="planner-layout">
        {/* Tasks Column */}
        <div className="tasks-col">
          {/* Stats Row */}
          <div className="planner-stats">
            <div className="pstat-card">
              <span className="pstat-val">{tasks.length}</span>
              <span className="pstat-label">Total Tasks</span>
            </div>
            <div className="pstat-card urgent">
              <span className="pstat-val">{pendingCount}</span>
              <span className="pstat-label">Pending</span>
            </div>
            <div className="pstat-card done">
              <span className="pstat-val">{doneCount}</span>
              <span className="pstat-label">Completed</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            {['all', 'pending', 'completed', 'high'].map(f => (
              <button
                key={f}
                className={`filter-pill ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="tasks-list">
            {filteredTasks.length === 0 && (
              <div className="empty-state glass-card">
                <CheckCircle2 size={48} style={{ color: 'var(--text-dim)', margin: '0 auto 12px' }} />
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No tasks found. Add one to get started!</p>
              </div>
            )}
            {filteredTasks.map(task => (
              <div key={task.id} className={`glass-card task-item ${task.completed ? 'done' : ''}`}>
                <button
                  className="task-check-btn"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`check-circle ${task.completed ? 'checked' : ''}`}>
                    {task.completed && <CheckCircle2 size={20} color="white" />}
                  </div>
                </button>
                <div className="task-body">
                  <div className="task-title-row">
                    <span className={`task-title ${task.completed ? 'strikethrough' : ''}`}>{task.title}</span>
                    <span className={`badge ${PRIORITY_COLORS[task.priority]?.badge || 'badge-indigo'}`}>
                      <Flag size={10} /> {task.priority}
                    </span>
                  </div>
                  <div className="task-meta">
                    <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>{task.subject}</span>
                    <span className="meta-chip"><Clock size={11} /> {task.duration}</span>
                    <span className="meta-chip"><CalendarCheck size={11} /> {task.dueDate}</span>
                  </div>
                </div>
                <button className="task-del-btn" onClick={() => deleteTask(task.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pomodoro Column */}
        <div className="pomodoro-col">
          <div className="glass-card pomodoro-card">
            <h3 className="pom-title">
              <Timer size={18} style={{ color: '#f59e0b' }} />
              Pomodoro Focus Timer
            </h3>
            <p className="pom-subtitle">25-min focus sessions with 5-min breaks.</p>

            {/* Circle Progress */}
            <div className="pom-circle-wrap">
              <svg className="pom-svg" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="50"
                  fill="none"
                  stroke={pomState === 'break' ? '#10b981' : '#6366f1'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - pomProgress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
              </svg>
              <div className="pom-time-display">
                <span className="pom-time">{formatTime(timeLeft)}</span>
                <span className="pom-phase">
                  {pomState === 'idle' ? 'Ready' : pomState === 'work' ? '🔥 Focus' : '☕ Break'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="pom-controls">
              {pomState === 'idle' ? (
                <button className="btn btn-primary" onClick={startPom}>
                  <Play size={16} /> Start Session
                </button>
              ) : (
                <>
                  <button className="btn btn-secondary btn-sm" onClick={togglePause}>
                    {isRunning ? <Pause size={14} /> : <Play size={14} />}
                    {isRunning ? 'Pause' : 'Resume'}
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={resetPom}>
                    <RotateCcw size={14} /> Reset
                  </button>
                </>
              )}
            </div>

            {/* Session Info */}
            <div className="pom-info-row">
              <div className="pom-info-item">
                <span className="pom-info-val">{pomSession}</span>
                <span className="pom-info-label">Session</span>
              </div>
              <div className="pom-info-item">
                <span className="pom-info-val">{completedPomos}</span>
                <span className="pom-info-label">Completed</span>
              </div>
              <div className="pom-info-item">
                <span className="pom-info-val">{completedPomos * 25}</span>
                <span className="pom-info-label">Min Focused</span>
              </div>
            </div>

            {/* Session dots */}
            <div className="pom-dots">
              {[1,2,3,4].map(n => (
                <div key={n} className={`pom-dot ${n <= completedPomos ? 'filled' : ''}`} />
              ))}
            </div>
            <p className="pom-hint">4 sessions = 1 long break (15 min)</p>
          </div>

          {/* Weekly Schedule Preview */}
          <div className="glass-card" style={{ marginTop: '16px', padding: '16px' }}>
            <h3 className="pom-title">
              <CalendarCheck size={16} style={{ color: '#34d399' }} /> Weekly Schedule
            </h3>
            <div className="week-days">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const hours = [4, 2, 5, 3, 4, 6, 1][i];
                const isToday = i === 2;
                return (
                  <div key={day} className={`day-col ${isToday ? 'today' : ''}`}>
                    <div className="day-bar-wrap">
                      <div className="day-bar" style={{ height: `${hours * 10}px` }} />
                    </div>
                    <span className="day-label">{day}</span>
                    <span className="day-hours">{hours}h</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="modal-backdrop" onClick={() => setShowAddTask(false)}>
          <div className="glass-card modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-hd">
              <h3>Add New Study Task</h3>
              <button className="close-btn" onClick={() => setShowAddTask(false)}><X size={18} /></button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Task Title *</label>
                <input
                  className="form-input"
                  placeholder="e.g. Complete Chapter 5 exercises"
                  value={newTask.title}
                  onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-input" value={newTask.subject} onChange={e => setNewTask(p => ({ ...p, subject: e.target.value }))}>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-input" value={newTask.dueDate} onChange={e => setNewTask(p => ({ ...p, dueDate: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-input" value={newTask.priority} onChange={e => setNewTask(p => ({ ...p, priority: e.target.value }))}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Duration</label>
                <select className="form-input" value={newTask.duration} onChange={e => setNewTask(p => ({ ...p, duration: e.target.value }))}>
                  <option>15 mins</option>
                  <option>30 mins</option>
                  <option>45 mins</option>
                  <option>60 mins</option>
                  <option>90 mins</option>
                  <option>2 hours</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddTask(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addTask}>
                <Plus size={14} /> Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .planner-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 20px;
          align-items: start;
        }

        .planner-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .pstat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 14px;
          text-align: center;
        }

        .pstat-card.urgent { border-color: rgba(244,63,94,0.3); background: rgba(244,63,94,0.06); }
        .pstat-card.done { border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.06); }

        .pstat-val { display: block; font-size: 2rem; font-weight: 800; font-family: var(--font-heading); color: var(--text-main); }
        .pstat-label { font-size: 0.76rem; color: var(--text-muted); }

        .filter-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .filter-pill {
          padding: 5px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-muted);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-pill.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
        }

        .tasks-list { display: flex; flex-direction: column; gap: 10px; }

        .task-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          transition: all 0.2s;
        }

        .task-item.done { opacity: 0.55; }

        .task-check-btn {
          background: none;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .check-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .check-circle.checked {
          background: var(--gradient-primary);
          border-color: transparent;
        }

        .task-body { flex: 1; min-width: 0; }

        .task-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 6px;
        }

        .task-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .task-title.strikethrough {
          text-decoration: line-through;
          color: var(--text-dim);
        }

        .task-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .meta-chip {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .task-del-btn {
          background: none;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .task-del-btn:hover { color: #f43f5e; background: rgba(244,63,94,0.15); }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
        }

        /* Pomodoro */
        .pomodoro-card { text-align: center; }
        .pom-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .pom-subtitle { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 20px; }

        .pom-circle-wrap {
          position: relative;
          width: 180px;
          height: 180px;
          margin: 0 auto 20px;
        }

        .pom-svg { width: 100%; height: 100%; }

        .pom-time-display {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pom-time {
          font-size: 2.2rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--text-main);
          line-height: 1;
        }

        .pom-phase { font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }

        .pom-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .pom-info-row {
          display: flex;
          justify-content: space-around;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 12px 0;
          margin-bottom: 14px;
        }

        .pom-info-item { text-align: center; }
        .pom-info-val { display: block; font-size: 1.4rem; font-weight: 800; color: var(--text-main); }
        .pom-info-label { font-size: 0.72rem; color: var(--text-muted); }

        .pom-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .pom-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid var(--border-color);
          transition: all 0.3s;
        }

        .pom-dot.filled { background: #6366f1; border-color: #6366f1; box-shadow: 0 0 6px rgba(99,102,241,0.5); }
        .pom-hint { font-size: 0.72rem; color: var(--text-dim); }

        /* Weekly bars */
        .week-days {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 10px 0;
          gap: 6px;
        }

        .day-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
        }

        .day-bar-wrap {
          height: 70px;
          display: flex;
          align-items: flex-end;
        }

        .day-bar {
          width: 100%;
          background: rgba(99,102,241,0.3);
          border-radius: 4px 4px 0 0;
          min-height: 6px;
          transition: all 0.3s;
        }

        .day-col.today .day-bar { background: var(--gradient-primary); }
        .day-label { font-size: 0.7rem; color: var(--text-muted); }
        .day-hours { font-size: 0.68rem; color: var(--text-dim); }

        /* Add task modal */
        .modal-backdrop {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
          z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
        }

        .modal-sm {
          width: 100%;
          max-width: 480px;
        }

        .modal-hd {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .close-btn {
          background: none; border: none; color: var(--text-muted); cursor: pointer;
          padding: 4px; border-radius: 6px;
        }

        .close-btn:hover { color: white; background: rgba(255,255,255,0.1); }

        .modal-form { display: flex; flex-direction: column; gap: 14px; }

        .form-group { display: flex; flex-direction: column; gap: 6px; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .form-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); }

        .form-input {
          padding: 9px 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-main);
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s;
          font-family: var(--font-body);
        }

        .form-input:focus { border-color: var(--primary); }
        .form-input option { background: #1a2540; }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        @media (max-width: 900px) {
          .planner-layout { grid-template-columns: 1fr; }
          .pomodoro-col { order: -1; }
        }
      `}</style>
    </div>
  );
}
