import React, { useState } from 'react';
import { Sparkles, User, ShieldCheck, ArrowRight, CheckCircle2, Lock, KeyRound, UserCheck } from 'lucide-react';

export default function LoginPage({ setCurrentPage, setRole, setCurrentStudentId, sampleStudents }) {
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'teacher'
  const [username, setUsername] = useState('STU001');
  const [password, setPassword] = useState('student123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStudentLogin = (e) => {
    e.preventDefault();
    const cleanId = username.trim().toUpperCase();
    const studentMatch = sampleStudents.find(s => s.id === cleanId || s.name.toLowerCase() === username.trim().toLowerCase());
    
    if (studentMatch) {
      setCurrentStudentId(studentMatch.id);
      setRole('student');
      setCurrentPage('student-dashboard');
    } else if (cleanId.startsWith('STU')) {
      // Default to STU001 if unknown student ID entered during hackathon demo
      setCurrentStudentId('STU001');
      setRole('student');
      setCurrentPage('student-dashboard');
    } else {
      setErrorMsg('Invalid Student ID. Use STU001, STU002, STU003 or select from Demo list.');
    }
  };

  const handleTeacherLogin = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'hod' && password === 'hod123') {
      setRole('teacher');
      setCurrentPage('teacher-dashboard');
    } else {
      // Allow demo bypass for hackathon presentation ease
      setRole('teacher');
      setCurrentPage('teacher-dashboard');
    }
  };

  const fillDemoStudent1 = () => {
    setActiveTab('student');
    setUsername('STU001');
    setPassword('student123');
    setCurrentStudentId('STU001');
    setErrorMsg('');
  };

  const fillDemoStudent2 = () => {
    setActiveTab('student');
    setUsername('STU002');
    setPassword('student123');
    setCurrentStudentId('STU002');
    setErrorMsg('');
  };

  const fillDemoStudent3 = () => {
    setActiveTab('student');
    setUsername('STU003');
    setPassword('student123');
    setCurrentStudentId('STU003');
    setErrorMsg('');
  };

  const fillDemoTeacher = () => {
    setActiveTab('teacher');
    setUsername('hod');
    setPassword('hod123');
    setErrorMsg('');
  };

  const selectCustomStudent = (e) => {
    const studentId = e.target.value;
    if (studentId) {
      setActiveTab('student');
      setUsername(studentId);
      setPassword('student123');
      setCurrentStudentId(studentId);
      setErrorMsg('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side: Brand Showcase */}
        <div className="login-hero glass-card">
          <div className="hero-content">
            <div className="sih-tag-pill">
              <Sparkles size={14} />
              <span>AICTE Smart India Hackathon 2026 • Problem Statement</span>
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">SmartLearn</span> AI Portal
            </h1>
            <p className="hero-subtitle">AI Powered Smart Education Portal</p>

            <p className="hero-description">
              Adaptive AI Learning Roadmaps, Socratic Mentoring, Real-Time Student Mastery Analytics, and Early At-Risk Intervention Engine for Higher Education Institutions.
            </p>

            {/* Feature Checklist */}
            <div className="hero-features">
              <div className="feature-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Personalized AI Learning Recommendations per Student</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Attendance Monitoring & At-Risk Identification</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Interactive Quiz Analytics & Concept Mastery Tracking</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>HOD & Teacher Analytics Dashboard (CSE AIML Dept)</span>
              </div>
            </div>

            {/* Quick Demo Credentials Box */}
            <div className="demo-credentials-box">
              <span className="demo-title">⚡ Quick Click Demo Credentials for Evaluation:</span>
              <div className="demo-btns">
                <button className="demo-chip" onClick={fillDemoStudent1}>
                  STU001 (Nikhitha)
                </button>
                <button className="demo-chip" onClick={fillDemoStudent2}>
                  STU002 (Student Two)
                </button>
                <button className="demo-chip" onClick={fillDemoStudent3}>
                  STU003 (Student Three)
                </button>
                <button className="demo-chip teacher-chip" onClick={fillDemoTeacher}>
                  Teacher / HOD (hod)
                </button>
              </div>

              {/* Student Dropdown for all 10 students */}
              <div className="student-select-box mt-10">
                <label className="demo-select-label">Or Pick from 10 Sample Students:</label>
                <select className="demo-select" onChange={selectCustomStudent} value={activeTab === 'student' ? username : ''}>
                  <option value="">-- Choose Sample Student Account --</option>
                  {sampleStudents.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.id} - {s.name} ({s.performanceCategory})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="auth-card glass-card">
          {/* Role Tabs */}
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('student');
                fillDemoStudent1();
              }}
            >
              <User size={16} />
              <span>Student Login</span>
            </button>
            <button 
              className={`auth-tab ${activeTab === 'teacher' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('teacher');
                fillDemoTeacher();
              }}
            >
              <ShieldCheck size={16} />
              <span>Teacher / HOD Login</span>
            </button>
          </div>

          <form onSubmit={activeTab === 'student' ? handleStudentLogin : handleTeacherLogin} className="auth-form">
            <div className="form-header">
              <h2>{activeTab === 'student' ? 'Student Sign In' : 'Teacher / HOD Sign In'}</h2>
              <p className="form-sub">
                {activeTab === 'student' 
                  ? 'Access your personalized learning dashboard' 
                  : 'Access HOD analytics & student monitoring'}
              </p>
            </div>

            {errorMsg && (
              <div className="error-box">
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="input-group">
              <label>{activeTab === 'student' ? 'Student ID / Roll No' : 'Username'}</label>
              <div className="input-with-icon">
                <UserCheck size={18} className="input-icon" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder={activeTab === 'student' ? 'e.g. STU001' : 'e.g. hod'}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-with-icon">
                <KeyRound size={18} className="input-icon" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Quick Demo Hint */}
            <div className="credentials-hint">
              {activeTab === 'student' ? (
                <span>Demo Student ID: <strong>STU001</strong> | Password: <strong>student123</strong></span>
              ) : (
                <span>Demo HOD Username: <strong>hod</strong> | Password: <strong>hod123</strong></span>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-lg auth-submit-btn">
              <span>{activeTab === 'student' ? 'Login to Student Dashboard' : 'Login to HOD Dashboard'}</span>
              <ArrowRight size={18} />
            </button>

            <div className="auth-footer-note">
              <Lock size={12} />
              <span>SmartLearn AI • AICTE SIH 2026 Portal</span>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: calc(100vh - 40px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-wrapper {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 32px;
          max-width: 1120px;
          width: 100%;
        }

        @media (max-width: 900px) {
          .login-wrapper {
            grid-template-columns: 1fr;
          }
        }

        .login-hero {
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(135deg, rgba(18, 26, 43, 0.95) 0%, rgba(30, 41, 67, 0.9) 100%);
          border: 1px solid var(--border-glow);
          position: relative;
        }

        .sih-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
          border: 1px solid rgba(99, 102, 241, 0.3);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .hero-title {
          font-size: 2.3rem;
          line-height: 1.1;
          font-weight: 800;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: #a5b4fc;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .gradient-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 22px;
          line-height: 1.5;
        }

        .hero-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-main);
        }

        .text-emerald {
          color: #34d399;
        }

        .demo-credentials-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px dashed var(--border-color);
          padding: 14px;
          border-radius: var(--radius-sm);
        }

        .demo-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          display: block;
          margin-bottom: 8px;
        }

        .demo-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .demo-chip {
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid rgba(99, 102, 241, 0.4);
          color: #a5b4fc;
          padding: 5px 10px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .demo-chip:hover {
          background: var(--primary);
          color: white;
        }

        .teacher-chip {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.4);
          color: #6ee7b7;
        }

        .teacher-chip:hover {
          background: #10b981;
          color: white;
        }

        .mt-10 { margin-top: 10px; }

        .demo-select-label {
          font-size: 0.74rem;
          color: var(--text-dim);
          display: block;
          margin-bottom: 4px;
        }

        .demo-select {
          width: 100%;
          padding: 7px 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          outline: none;
        }

        .auth-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .auth-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px;
          border-radius: var(--radius-sm);
          margin-bottom: 20px;
        }

        .auth-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.86rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .auth-tab.active {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-header h2 {
          font-size: 1.35rem;
          font-weight: 700;
        }

        .form-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .error-box {
          background: rgba(244, 63, 94, 0.15);
          border: 1px solid rgba(244, 63, 94, 0.3);
          color: #fca5a5;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-dim);
        }

        .input-with-icon input {
          width: 100%;
          padding: 11px 14px 11px 38px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-with-icon input:focus {
          border-color: var(--primary);
        }

        .credentials-hint {
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.74rem;
          color: #c7d2fe;
          text-align: center;
        }

        .auth-submit-btn {
          margin-top: 6px;
          width: 100%;
        }

        .auth-footer-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--text-dim);
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}
