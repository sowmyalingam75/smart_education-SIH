import React from 'react';
import { User, ShieldCheck, Award, Flame, Zap, BookOpen, Clock, CheckCircle2, RefreshCw } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function ProfilePage({ 
  setCurrentPage, 
  student, 
  role, 
  teacherData, 
  setCurrentStudentId, 
  sampleStudents 
}) {
  const isStudent = role === 'student';
  const currentStudent = student || sampleStudents?.[0];
  const teacher = teacherData?.profile || {};

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>User Profile & Account Info</span>
            <span className="badge badge-indigo">{isStudent ? 'Student Profile' : 'Educator / HOD Profile'}</span>
          </h1>
          <p className="page-subtitle">View account credentials, academic department details, and performance badges.</p>
        </div>
      </div>

      <div className="glass-card profile-hero-card mb-24">
        <div className="profile-hero-top">
          <img 
            src={isStudent ? currentStudent.avatar : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'} 
            alt="Avatar" 
            className="profile-large-avatar"
          />
          <div className="profile-main-meta">
            <h2 className="profile-name-text">{isStudent ? currentStudent.name : teacher.name}</h2>
            <div className="profile-role-tag mb-8">
              <span className="badge badge-emerald">
                {isStudent ? `Student ID: ${currentStudent.id}` : teacher.designation}
              </span>
              <span className="badge badge-indigo">
                {isStudent ? currentStudent.department : teacher.department}
              </span>
            </div>
            <p className="profile-institution">
              {isStudent ? currentStudent.college : teacher.college} • {isStudent ? currentStudent.semester : 'Computer Science Division'}
            </p>
          </div>
        </div>

        {/* Quick Student Switcher in Profile for demo */}
        {isStudent && (
          <div className="student-switcher-box mt-16">
            <span className="switch-label">Switch Active Student Profile for Hackathon Demo:</span>
            <div className="student-pills-list">
              {sampleStudents?.map(s => (
                <button 
                  key={s.id}
                  className={`student-pill-btn ${s.id === currentStudent.id ? 'active' : ''}`}
                  onClick={() => setCurrentStudentId(s.id)}
                >
                  {s.id}: {s.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid-3 mb-24">
        <StatCard 
          title={isStudent ? "Overall Performance" : "Cohort Total Students"}
          value={isStudent ? `${currentStudent.overallPerformance}%` : `${sampleStudents?.length || 10} Students`}
          subtext={isStudent ? currentStudent.performanceCategory : "Active CSE AIML Cohort"}
          icon={Award}
          color="emerald"
        />
        <StatCard 
          title={isStudent ? "Attendance Record" : "Class Average Attendance"}
          value={`${isStudent ? currentStudent.attendance : teacher.avgAttendance}%`}
          subtext={isStudent && currentStudent.attendance >= 75 ? "Compliant (>75%)" : "Department Standard"}
          icon={Clock}
          color={isStudent && currentStudent.attendance < 75 ? "rose" : "indigo"}
        />
        <StatCard 
          title={isStudent ? "Quiz Score Average" : "At-Risk Flagged Students"}
          value={isStudent ? `${currentStudent.quizScore}%` : `${teacher.atRiskCount} Students`}
          subtext={isStudent ? "Adaptive Quizzes" : "AI Early Intervention"}
          icon={Zap}
          color="cyan"
        />
      </div>

      <style>{`
        .mb-24 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 8px; }
        .mt-16 { margin-top: 16px; }
        .profile-hero-card { display: flex; flex-direction: column; gap: 16px; }
        .profile-hero-top { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .profile-large-avatar { width: 84px; height: 84px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary); }
        .profile-main-meta { display: flex; flex-direction: column; }
        .profile-name-text { font-size: 1.6rem; font-weight: 800; color: var(--text-main); }
        .profile-role-tag { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .profile-institution { font-size: 0.88rem; color: var(--text-muted); }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr; } }
        .student-switcher-box { padding-top: 14px; border-top: 1px solid var(--border-color); }
        .switch-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 8px; }
        .student-pills-list { display: flex; gap: 6px; flex-wrap: wrap; }
        .student-pill-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .student-pill-btn.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
