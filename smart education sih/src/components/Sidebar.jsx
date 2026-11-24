import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BarChart3, 
  Compass, 
  Bot, 
  HelpCircle, 
  TrendingUp, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ShieldAlert,
  BookOpen,
  CalendarCheck,
  FolderOpen,
  Users,
  FileText,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ 
  currentPage, 
  setCurrentPage, 
  role, 
  setRole, 
  isCollapsed, 
  setIsCollapsed,
  currentStudent,
  handleLogout 
}) {
  
  const studentNavItems = [
    { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'ai-assistant', label: 'AI Learning Assistant', icon: Bot, badge: 'AI' },
    { id: 'study-planner', label: 'Study Planner', icon: CalendarCheck },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'progress-tracker', label: 'Progress Tracker', icon: BarChart3 },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  const teacherNavItems = [
    { id: 'teacher-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'teacher-attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'teacher-performance', label: 'Performance', icon: BarChart3 },
    { id: 'at-risk-students', label: 'At-Risk Students', icon: ShieldAlert, badge: 'Alert' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'teacher-profile', label: 'Profile', icon: UserCheck },
  ];

  const currentNavItems = role === 'student' ? studentNavItems : teacherNavItems;

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Sparkles className="logo-icon" />
        </div>
        {!isCollapsed && (
          <div className="brand-text">
            <span className="brand-name">SmartLearn<span className="ai-tag">AI</span></span>
            <span className="sih-badge">SIH 2026 • Edu</span>
          </div>
        )}
      </div>

      {/* Role Indicator Banner */}
      {!isCollapsed && (
        <div className="role-banner">
          <div className="role-info">
            <span className="role-title">{role === 'student' ? 'Student Workspace' : 'Educator / HOD'}</span>
            <span className="role-sub">
              {role === 'student' ? `${currentStudent.name} (${currentStudent.id})` : 'Dr. Sunita Verma (HOD)'}
            </span>
          </div>
          <button 
            className="role-switch-btn"
            title="Switch Active View"
            onClick={() => {
              const newRole = role === 'student' ? 'teacher' : 'student';
              setRole(newRole);
              setCurrentPage(newRole === 'student' ? 'student-dashboard' : 'teacher-dashboard');
            }}
          >
            {role === 'student' ? 'Switch to Teacher View' : 'Switch to Student View'}
          </button>
        </div>
      )}

      {/* Main Navigation Menu */}
      <div className="nav-section">
        <div className="nav-label">{!isCollapsed && 'MAIN NAVIGATION'}</div>
        <nav className="nav-list">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="nav-icon" />
                {!isCollapsed && <span className="nav-label-text">{item.label}</span>}
                {!isCollapsed && item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div className="sidebar-footer">
        <button 
          className="nav-item auth-item logout-btn"
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="nav-icon text-rose" />
          {!isCollapsed && <span className="text-rose font-semibold">Logout</span>}
        </button>

        {/* Collapse Toggle */}
        <button 
          className="collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--sidebar-width);
          background: var(--bg-sidebar);
          backdrop-filter: blur(20px);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 20px 14px;
        }

        .sidebar.collapsed {
          width: var(--sidebar-collapsed-width);
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 6px 18px 6px;
          border-bottom: 1px solid var(--border-color);
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
          flex-shrink: 0;
        }

        .logo-icon {
          color: white;
          width: 22px;
          height: 22px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--text-main);
          line-height: 1.1;
        }

        .ai-tag {
          color: #818cf8;
          margin-left: 2px;
        }

        .sih-badge {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .role-banner {
          margin: 14px 0;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.25);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .role-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #a5b4fc;
        }

        .role-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .role-switch-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text-main);
          font-size: 0.7rem;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          text-align: center;
        }

        .role-switch-btn:hover {
          background: rgba(99, 102, 241, 0.35);
          border-color: var(--primary);
        }

        .nav-section {
          flex: 1;
          margin-top: 8px;
          overflow-y: auto;
        }

        .nav-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-dim);
          letter-spacing: 0.08em;
          margin: 6px 10px;
        }

        .nav-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          background: transparent;
          border: 1px solid transparent;
          font-size: 0.86rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          color: white;
          background: var(--gradient-primary);
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
          font-weight: 600;
        }

        .nav-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .text-rose {
          color: #f43f5e;
        }

        .font-semibold {
          font-weight: 600;
        }

        .nav-badge {
          margin-left: auto;
          font-size: 0.65rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 2px 6px;
          border-radius: 99px;
          font-weight: 700;
        }

        .sidebar-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .logout-btn:hover {
          background: rgba(244, 63, 94, 0.15) !important;
        }

        .collapse-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          padding: 8px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .collapse-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </aside>
  );
}
