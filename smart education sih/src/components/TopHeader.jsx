import React, { useState } from 'react';
import { Search, Bell, Sparkles, User, ShieldCheck, LogOut } from 'lucide-react';
import { mockTeacherData } from '../data/mockData';

export default function TopHeader({ 
  currentPage, 
  setCurrentPage, 
  role, 
  setRole, 
  currentStudent, 
  handleLogout 
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(role === 'student' ? currentStudent.notifications?.length || 3 : 3);

  const studentNotifications = currentStudent?.notifications || [
    { id: 1, title: 'AI Recommendation Updated', desc: 'New learning module generated for Decision Trees', time: '10m ago' },
    { id: 2, title: 'Quiz Score Verified', desc: 'You scored 92% in Data Structures Quiz', time: '2h ago' },
    { id: 3, title: 'Class Announcement', desc: 'Dr. Sunita uploaded Mid-Sem AI Syllabus', time: '1d ago' },
  ];

  const teacherNotifications = [
    { id: 1, title: 'At-Risk Alert Flagged', desc: 'Student Three attendance dropped to 68%', time: '15m ago' },
    { id: 2, title: 'Quiz Submissions Ready', desc: '64 students submitted Dynamic Programming Quiz', time: '1h ago' },
    { id: 3, title: 'AI Intervention Report', desc: 'Automatic remedial plan dispatched to 3 students', time: '3h ago' },
  ];

  const notifications = role === 'student' ? studentNotifications : teacherNotifications;

  return (
    <header className="top-header">
      {/* Search Bar */}
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Search subjects, AI notes, quiz topics, algorithms..."
          className="search-input"
        />
        <span className="search-shortcut">⌘K</span>
      </div>

      {/* Action Items */}
      <div className="header-right">
        {/* Role Toggle Switcher Pill */}
        <div className="role-pill-container">
          <button 
            className={`role-pill-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => {
              setRole('student');
              if (currentPage.startsWith('teacher') || currentPage === 'students' || currentPage === 'at-risk-students' || currentPage === 'reports') {
                setCurrentPage('student-dashboard');
              }
            }}
          >
            <User size={14} />
            <span>Student Portal</span>
          </button>
          <button 
            className={`role-pill-btn ${role === 'teacher' ? 'active' : ''}`}
            onClick={() => {
              setRole('teacher');
              if (currentPage === 'student-dashboard' || currentPage === 'learning-recommendations') {
                setCurrentPage('teacher-dashboard');
              }
            }}
          >
            <ShieldCheck size={14} />
            <span>Teacher / HOD</span>
          </button>
        </div>

        {/* AI Tutor Quick Shortcut */}
        <button 
          className="ai-quick-btn"
          onClick={() => setCurrentPage('ai-assistant')}
          title="Open Smart AI Assistant"
        >
          <Sparkles size={16} />
          <span className="ai-btn-text">Ask AI</span>
        </button>

        {/* Notifications Dropdown Trigger */}
        <div className="notification-wrapper">
          <button 
            className="header-icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setUnreadCount(0);
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown glass-card">
              <div className="notif-header">
                <h4>Notifications</h4>
                <span className="badge badge-indigo">SIH Live</span>
              </div>
              <div className="notif-list">
                {notifications.map(n => (
                  <div key={n.id} className="notif-item">
                    <div className="notif-icon-box">
                      <Sparkles size={14} className="text-primary" />
                    </div>
                    <div className="notif-content">
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-desc">{n.desc}</div>
                      <div className="notif-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div 
          className="user-profile-widget" 
          onClick={() => setCurrentPage(role === 'student' ? 'profile' : 'teacher-profile')}
          title="View Profile"
        >
          <img 
            src={role === 'student' ? currentStudent.avatar : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'} 
            alt="User Avatar"
            className="user-avatar" 
          />
          <div className="user-meta">
            <span className="user-name">
              {role === 'student' ? currentStudent.name : mockTeacherData.profile.name}
            </span>
            <span className="user-role">
              {role === 'student' ? `${currentStudent.id} • CSE (AIML)` : 'HOD CSE (AIML)'}
            </span>
          </div>
        </div>

        {/* Logout Quick Icon */}
        <button className="header-icon-btn logout-icon-btn" onClick={handleLogout} title="Sign Out">
          <LogOut size={18} className="text-rose" />
        </button>
      </div>

      <style>{`
        .top-header {
          height: var(--topbar-height);
          background: rgba(13, 19, 32, 0.75);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 360px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-dim);
        }

        .search-input {
          width: 100%;
          padding: 9px 40px 9px 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          color: var(--text-main);
          font-size: 0.88rem;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }

        .search-shortcut {
          position: absolute;
          right: 14px;
          font-size: 0.7rem;
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .role-pill-container {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          padding: 3px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .role-pill-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .role-pill-btn.active {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 2px 10px rgba(99, 102, 241, 0.35);
        }

        .ai-quick-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: #c084fc;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ai-quick-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
          color: white;
        }

        .header-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
        }

        .header-icon-btn:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.1);
        }

        .logout-icon-btn:hover {
          background: rgba(244, 63, 94, 0.2);
        }

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: var(--gradient-rose);
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-dark);
        }

        .notification-wrapper {
          position: relative;
        }

        .notifications-dropdown {
          position: absolute;
          right: 0;
          top: 48px;
          width: 310px;
          padding: 14px;
          z-index: 100;
          box-shadow: var(--shadow-lg);
        }

        .notif-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .notif-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .notif-item {
          display: flex;
          gap: 10px;
          padding: 8px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          transition: background 0.2s;
        }

        .notif-item:hover {
          background: rgba(255, 255, 255, 0.07);
        }

        .notif-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(99, 102, 241, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notif-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .notif-desc {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .notif-time {
          font-size: 0.65rem;
          color: var(--text-dim);
          margin-top: 4px;
        }

        .user-profile-widget {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          transition: background 0.2s;
        }

        .user-profile-widget:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--primary);
        }

        .user-meta {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.1;
        }

        .user-role {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .text-rose {
          color: #f43f5e;
        }
      `}</style>
    </header>
  );
}
