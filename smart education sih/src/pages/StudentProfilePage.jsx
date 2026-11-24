import React, { useState } from 'react';
import { User, GraduationCap, Mail, Phone, BookOpen, Award, Star, Edit3, Check, X, Bell, ShieldCheck, Globe } from 'lucide-react';
import { mockAchievements } from '../data/mockData';

export default function StudentProfilePage({ setCurrentPage, student }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: student?.name || 'Nikhitha',
    rollNo: student?.id || 'STU001',
    major: student?.department || 'CSE (AIML)',
    semester: student?.semester || 'Semester 5',
    college: student?.college || 'Institute of Technology & Engineering',
    email: `${(student?.name || 'nikhitha').toLowerCase().replace(' ', '.')}@college.edu`,
    phone: '+91 98765 43210',
    targetGpa: '9.0',
    goal: 'Become a Machine Learning Engineer at a top product company.',
    studyStyle: 'Visual',
    studyHoursPerDay: '4-5 hours',
    notifications: { quizReminders: true, aiRecommendations: true, weeklyReport: true },
  });
  const [draft, setDraft] = useState(profile);

  const saveProfile = () => {
    setProfile(draft);
    setEditing(false);
  };

  const currentGPA = 8.8;
  const unlockedBadges = mockAchievements.filter(a => a.unlocked);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <User size={28} style={{ color: '#a78bfa' }} />
            My Profile
          </h1>
          <p className="page-subtitle">Manage your academic profile, learning goals, and notification preferences.</p>
        </div>
        {!editing
          ? <button className="btn btn-secondary" onClick={() => { setDraft(profile); setEditing(true); }}><Edit3 size={14} /> Edit Profile</button>
          : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}><X size={14} /> Cancel</button>
              <button className="btn btn-primary" onClick={saveProfile}><Check size={14} /> Save Changes</button>
            </div>
          )
        }
      </div>

      <div className="profile-layout">
        {/* Left Column */}
        <div className="profile-left-col">
          {/* Avatar Card */}
          <div className="glass-card profile-avatar-card">
            <div className="avatar-container">
              <img src={student?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'} alt="Avatar" className="profile-avatar" />
              <div className="avatar-ring" />
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-role">Student • {profile.major}</p>
            <div className="profile-badges-row">
              <span className="badge badge-indigo">
                <ShieldCheck size={12} /> {profile.rollNo}
              </span>
              <span className="badge badge-emerald">
                <Star size={12} /> GPA {currentGPA}
              </span>
            </div>
            <div className="profile-quick-stats">
              {[
                { label: 'Attendance', value: `${student?.attendance || 94}%` },
                { label: 'Quiz Avg', value: `${student?.quizScore || 92}%` },
                { label: 'Progress', value: `${student?.learningProgress || 86}%` },
              ].map(s => (
                <div key={s.label} className="pqs-item">
                  <div className="pqs-val">{s.value}</div>
                  <div className="pqs-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Earned Badges */}
          <div className="glass-card">
            <h3 className="section-label"><Award size={16} style={{ color: '#fbbf24' }} /> Earned Badges</h3>
            <div className="profile-badges-list">
              {unlockedBadges.map(ach => (
                <div key={ach.id} className="profile-ach-item">
                  <span className="profile-ach-icon">{ach.icon}</span>
                  <div>
                    <div className="profile-ach-title">{ach.title}</div>
                    <div className="profile-ach-date">{ach.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right-col">
          {/* Academic Info */}
          <div className="glass-card">
            <h3 className="section-label"><GraduationCap size={16} style={{ color: '#6366f1' }} /> Academic Information</h3>
            <div className="info-grid">
              {[
                { label: 'Full Name', field: 'name', icon: User, val: editing ? draft.name : profile.name },
                { label: 'Roll No.', field: 'rollNo', icon: ShieldCheck, val: profile.rollNo, readonly: true },
                { label: 'Department / Major', field: 'major', icon: BookOpen, val: editing ? draft.major : profile.major },
                { label: 'Semester', field: 'semester', icon: Star, val: editing ? draft.semester : profile.semester },
                { label: 'College / Institution', field: 'college', icon: Globe, val: editing ? draft.college : profile.college },
                { label: 'Email', field: 'email', icon: Mail, val: editing ? draft.email : profile.email },
                { label: 'Phone', field: 'phone', icon: Phone, val: editing ? draft.phone : profile.phone },
              ].map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="info-item">
                    <div className="info-icon-wrap"><Icon size={15} /></div>
                    <div className="info-content">
                      <div className="info-label">{f.label}</div>
                      {editing && !f.readonly ? (
                        <input
                          className="info-edit-input"
                          value={f.val}
                          onChange={e => setDraft(p => ({ ...p, [f.field]: e.target.value }))}
                        />
                      ) : (
                        <div className="info-value">{f.val}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="glass-card">
            <h3 className="section-label"><Star size={16} style={{ color: '#fbbf24' }} /> Learning Goals & Preferences</h3>
            <div className="goals-grid">
              <div className="goal-item">
                <label className="form-label">Target GPA</label>
                {editing ? (
                  <input className="info-edit-input" value={draft.targetGpa} onChange={e => setDraft(p => ({ ...p, targetGpa: e.target.value }))} />
                ) : (
                  <div className="goal-val">{profile.targetGpa} / 10</div>
                )}
              </div>
              <div className="goal-item">
                <label className="form-label">Study Style</label>
                {editing ? (
                  <select className="info-edit-input" value={draft.studyStyle} onChange={e => setDraft(p => ({ ...p, studyStyle: e.target.value }))}>
                    <option>Visual</option>
                    <option>Reading/Writing</option>
                    <option>Kinesthetic</option>
                    <option>Auditory</option>
                  </select>
                ) : (
                  <div className="goal-val">{profile.studyStyle}</div>
                )}
              </div>
              <div className="goal-item">
                <label className="form-label">Daily Study Hours Target</label>
                {editing ? (
                  <select className="info-edit-input" value={draft.studyHoursPerDay} onChange={e => setDraft(p => ({ ...p, studyHoursPerDay: e.target.value }))}>
                    <option>1-2 hours</option>
                    <option>2-3 hours</option>
                    <option>4-5 hours</option>
                    <option>6+ hours</option>
                  </select>
                ) : (
                  <div className="goal-val">{profile.studyHoursPerDay}</div>
                )}
              </div>
              <div className="goal-item" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Career Goal</label>
                {editing ? (
                  <textarea className="info-edit-input" rows={2} value={draft.goal} onChange={e => setDraft(p => ({ ...p, goal: e.target.value }))} />
                ) : (
                  <div className="goal-val">{profile.goal}</div>
                )}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card">
            <h3 className="section-label"><Bell size={16} style={{ color: '#06b6d4' }} /> Notification Preferences</h3>
            <div className="notif-prefs">
              {[
                { key: 'quizReminders', label: 'Quiz & Study Reminders', desc: 'Get notified before upcoming quizzes' },
                { key: 'aiRecommendations', label: 'AI Learning Recommendations', desc: 'Personalized topic suggestions from AI' },
                { key: 'weeklyReport', label: 'Weekly Progress Report', desc: 'Summary of your weekly study activity' },
              ].map(pref => (
                <div key={pref.key} className="notif-pref-item">
                  <div className="notif-pref-info">
                    <div className="notif-pref-label">{pref.label}</div>
                    <div className="notif-pref-desc">{pref.desc}</div>
                  </div>
                  <button
                    className={`toggle-btn ${profile.notifications[pref.key] ? 'on' : 'off'}`}
                    onClick={() => setProfile(p => ({ ...p, notifications: { ...p.notifications, [pref.key]: !p.notifications[pref.key] } }))}
                  >
                    <div className="toggle-thumb" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 20px;
          align-items: start;
        }

        .profile-left-col { display: flex; flex-direction: column; gap: 16px; }
        .profile-right-col { display: flex; flex-direction: column; gap: 16px; }

        .profile-avatar-card { text-align: center; }

        .avatar-container { position: relative; width: 96px; height: 96px; margin: 0 auto 14px; }

        .profile-avatar {
          width: 96px; height: 96px; border-radius: 50%; object-fit: cover;
          border: 3px solid transparent;
          background: var(--gradient-primary);
        }

        .avatar-ring {
          position: absolute; top: -3px; left: -3px; right: -3px; bottom: -3px;
          border-radius: 50%; border: 3px solid transparent;
          background: var(--gradient-primary);
          -webkit-mask: linear-gradient(white, white) content-box, linear-gradient(white, white);
          mask: linear-gradient(white, white) content-box, linear-gradient(white, white);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
        }

        .profile-name { font-size: 1.25rem; font-weight: 800; margin-bottom: 4px; }
        .profile-role { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px; }

        .profile-badges-row { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }

        .profile-quick-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--border-color); padding-top: 14px; gap: 8px;
        }

        .pqs-item { text-align: center; }
        .pqs-val { font-size: 1.1rem; font-weight: 800; font-family: var(--font-heading); color: var(--text-main); }
        .pqs-label { font-size: 0.68rem; color: var(--text-dim); margin-top: 2px; }

        .section-label {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.88rem; font-weight: 700; color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 16px;
        }

        .profile-badges-list { display: flex; flex-direction: column; gap: 10px; }
        .profile-ach-item { display: flex; align-items: center; gap: 10px; }
        .profile-ach-icon { font-size: 1.6rem; }
        .profile-ach-title { font-size: 0.88rem; font-weight: 700; }
        .profile-ach-date { font-size: 0.72rem; color: var(--text-dim); }

        .info-grid { display: flex; flex-direction: column; gap: 12px; }
        .info-item { display: flex; align-items: flex-start; gap: 12px; }
        .info-icon-wrap { width: 32px; height: 32px; border-radius: var(--radius-sm); background: rgba(99,102,241,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #818cf8; }
        .info-content { flex: 1; }
        .info-label { font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 2px; }
        .info-value { font-size: 0.9rem; color: var(--text-main); font-weight: 500; }
        .info-edit-input { background: rgba(255,255,255,0.06); border: 1px solid var(--primary); border-radius: 6px; color: var(--text-main); font-size: 0.88rem; padding: 6px 10px; outline: none; width: 100%; font-family: var(--font-body); }

        .goals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .goal-item { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 0.78rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; }
        .goal-val { font-size: 0.92rem; font-weight: 600; color: var(--text-main); }

        .notif-prefs { display: flex; flex-direction: column; gap: 14px; }
        .notif-pref-item { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .notif-pref-info { flex: 1; }
        .notif-pref-label { font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; }
        .notif-pref-desc { font-size: 0.78rem; color: var(--text-muted); }

        .toggle-btn {
          width: 44px; height: 24px; border-radius: 12px; border: none; cursor: pointer;
          position: relative; transition: all 0.3s; flex-shrink: 0;
        }

        .toggle-btn.on { background: var(--gradient-primary); }
        .toggle-btn.off { background: rgba(255,255,255,0.1); }

        .toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 18px; height: 18px; border-radius: 50%;
          background: white; transition: transform 0.3s;
        }

        .toggle-btn.on .toggle-thumb { transform: translateX(20px); }

        @media (max-width: 900px) {
          .profile-layout { grid-template-columns: 1fr; }
          .goals-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
