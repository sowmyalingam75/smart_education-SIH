import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Sparkles, Play } from 'lucide-react';
import { sampleStudents } from '../data/mockData';

export default function LearningPlanPage({ setCurrentPage, student }) {
  const currentStudent = student || sampleStudents[0];

  const defaultPlans = [
    {
      id: "plan-1",
      title: `Master ${currentStudent.weakSubjects?.[0] || 'Operating Systems Concurrency'}`,
      subject: "Operating Systems",
      status: "in-progress",
      priority: "High",
      estTime: "2.5 Hours",
      adaptiveNote: `AI detected score area needing focus in recent quiz: ${currentStudent.weakSubjects?.[0] || 'Semaphores'}.`,
      modules: [
        { id: "m1", name: "Understanding Critical Section Problem", done: true },
        { id: "m2", name: "Peterson's Algorithm & Hardware Locks", done: true },
        { id: "m3", name: "Mutex Locks vs Counting Semaphores", done: false },
        { id: "m4", name: "Classical Synchronization Problems (Dining Philosophers)", done: false }
      ]
    },
    {
      id: "plan-2",
      title: "Neural Networks & Backpropagation Math",
      subject: "AI & ML",
      status: "in-progress",
      priority: "Medium",
      estTime: "4.0 Hours",
      adaptiveNote: "Prerequisite for upcoming Mid-Sem Hackathon Challenge.",
      modules: [
        { id: "m21", name: "Forward Propagation Vector Math", done: true },
        { id: "m22", name: "Activation Functions (ReLU, Sigmoid, Softmax)", done: true },
        { id: "m23", name: "Chain Rule Derivatives for Weight Updates", done: false },
        { id: "m24", name: "Loss Functions & Stochastic Gradient Descent", done: false }
      ]
    },
    {
      id: "plan-3",
      title: "Advanced Graph Algorithms & Shortest Path",
      subject: "Data Structures",
      status: "completed",
      priority: "Low",
      estTime: "3.0 Hours",
      adaptiveNote: "Completed with 96% retention score.",
      modules: [
        { id: "m31", name: "Dijkstra's Single Source Shortest Path", done: true },
        { id: "m32", name: "Bellman-Ford Algorithm for Negative Edges", done: true },
        { id: "m33", name: "Floyd-Warshall All-Pairs Shortest Path", done: true }
      ]
    }
  ];

  const [plans, setPlans] = useState(defaultPlans);
  const [activeSubjectFilter, setActiveSubjectFilter] = useState('All');

  const toggleModuleCheck = (planId, moduleId) => {
    setPlans(prev => prev.map(plan => {
      if (plan.id !== planId) return plan;
      const updatedModules = plan.modules.map(mod => 
        mod.id === moduleId ? { ...mod, done: !mod.done } : mod
      );
      const allDone = updatedModules.every(m => m.done);
      return {
        ...plan,
        modules: updatedModules,
        status: allDone ? 'completed' : 'in-progress'
      };
    }));
  };

  const filteredPlans = activeSubjectFilter === 'All' 
    ? plans 
    : plans.filter(p => p.subject === activeSubjectFilter);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Adaptive Learning Plan</span>
            <span className="badge badge-cyan">
              <Sparkles size={12} /> {currentStudent.name} ({currentStudent.id})
            </span>
          </h1>
          <p className="page-subtitle">Custom generated learning pathway dynamically tailored to your quiz results & retention metrics.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setCurrentPage('ai-tutor')}>
            <Sparkles size={16} />
            <span>Generate New Pathway</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs-bar mb-20">
        {['All', 'Operating Systems', 'AI & ML', 'Data Structures'].map(tab => (
          <button 
            key={tab} 
            className={`filter-tab ${activeSubjectFilter === tab ? 'active' : ''}`}
            onClick={() => setActiveSubjectFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Learning Plans List */}
      <div className="plans-list">
        {filteredPlans.map(plan => (
          <div key={plan.id} className={`glass-card plan-card ${plan.status === 'completed' ? 'completed-card' : ''}`}>
            <div className="plan-header">
              <div className="plan-title-group">
                <span className="badge badge-indigo">{plan.subject}</span>
                <h3 className="plan-title">{plan.title}</h3>
              </div>
              <div className="plan-meta">
                <span className="est-time">
                  <Clock size={14} />
                  <span>Est: {plan.estTime}</span>
                </span>
                <span className={`badge ${plan.priority === 'High' ? 'badge-rose' : 'badge-amber'}`}>
                  {plan.priority} Priority
                </span>
              </div>
            </div>

            {/* AI Adaptive Context Note */}
            <div className="ai-note-box">
              <Sparkles size={16} className="text-primary" />
              <span><strong>AI Pathway Context:</strong> {plan.adaptiveNote}</span>
            </div>

            {/* Sub-modules list */}
            <div className="modules-checklist">
              {plan.modules.map(mod => (
                <div 
                  key={mod.id} 
                  className={`module-item ${mod.done ? 'done' : ''}`}
                  onClick={() => toggleModuleCheck(plan.id, mod.id)}
                >
                  <button className="check-btn">
                    {mod.done ? <CheckCircle2 size={18} className="text-emerald" /> : <Circle size={18} className="text-dim" />}
                  </button>
                  <span className="mod-name">{mod.name}</span>
                  {mod.done && <span className="completed-tag">Completed</span>}
                </div>
              ))}
            </div>

            {/* Card Footer */}
            <div className="plan-footer">
              <span className="progress-count">
                {plan.modules.filter(m => m.done).length} / {plan.modules.length} Modules Finished
              </span>
              <button className="btn btn-secondary btn-sm" onClick={() => setCurrentPage('ai-tutor')}>
                <Play size={12} />
                <span>Start Practice Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .mb-20 { margin-bottom: 20px; }
        .text-dim { color: var(--text-dim); }
        .text-emerald { color: #34d399; }
        .filter-tabs-bar { display: flex; gap: 10px; }
        .filter-tab {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-tab.active { background: var(--gradient-primary); color: white; border-color: transparent; }
        .plans-list { display: flex; flex-direction: column; gap: 20px; }
        .plan-card { display: flex; flex-direction: column; gap: 16px; }
        .plan-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; }
        .plan-title-group { display: flex; flex-direction: column; gap: 6px; }
        .plan-title { font-size: 1.15rem; font-weight: 700; }
        .plan-meta { display: flex; align-items: center; gap: 12px; }
        .est-time { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--text-muted); }
        .ai-note-box { background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.82rem; display: flex; align-items: center; gap: 10px; }
        .modules-checklist { display: flex; flex-direction: column; gap: 8px; }
        .module-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: var(--radius-sm); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); cursor: pointer; transition: all 0.2s; }
        .module-item:hover { background: rgba(255, 255, 255, 0.07); }
        .module-item.done { background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2); }
        .check-btn { background: none; border: none; display: flex; align-items: center; cursor: pointer; }
        .mod-name { font-size: 0.88rem; color: var(--text-main); flex: 1; }
        .module-item.done .mod-name { text-decoration: line-through; color: var(--text-muted); }
        .completed-tag { font-size: 0.7rem; color: #34d399; font-weight: 700; }
        .plan-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-color); }
        .progress-count { font-size: 0.8rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
