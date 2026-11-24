import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  Award,
  Zap,
  BookOpen,
  X,
  AlertCircle,
  Eye,
  Check,
  Calendar,
  FileText
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { BarChartComponent } from '../components/ChartComponents';
import { studentInterventionData } from '../data/mockData';

export default function TeacherDashboard({ setCurrentPage, teacherData, sampleStudents }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All'); // 'All', 'Good Performance', 'Average Performance', 'At Risk'
  const [sentAlerts, setSentAlerts] = useState({});

  // Intervention Card States
  const [toastMessage, setToastMessage] = useState(null);
  const [interventionActionsState, setInterventionActionsState] = useState({});
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizTopic, setQuizTopic] = useState('Probability Basics');

  const teacher = teacherData?.profile || {
    name: "Dr. Sunita Verma",
    designation: "HOD - CSE (AIML) Department",
    department: "CSE (AIML) Department",
    college: "Institute of Technology & Engineering",
    totalStudents: sampleStudents?.length || 10,
    avgClassMastery: 78.4,
    avgAttendance: 84.3,
    avgInternalMarks: 75.9,
    avgQuizScore: 74.6,
    atRiskCount: 3,
    aiInterventionRate: "24% Auto Assisted"
  };

  const studentsList = sampleStudents || [];

  // Filter students by search term and selected category
  const filteredStudents = studentsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || s.performanceCategory === filterCategory || (filterCategory === 'At Risk' && s.performanceCategory === 'At Risk');
    return matchesSearch && matchesCategory;
  });

  const handleSendAssistance = (id) => {
    setSentAlerts(prev => ({ ...prev, [id]: true }));
  };

  // Toast Handler
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => current === msg ? null : current);
    }, 4500);
  };

  // Intervention Action Handlers
  const handleAssignProbability = () => {
    setInterventionActionsState(prev => ({ ...prev, assign: true }));
    triggerToast("Probability basics assigned to Student 103.");
  };

  const handleScheduleMentoring = () => {
    setInterventionActionsState(prev => ({ ...prev, schedule: true }));
    triggerToast("Mentoring session scheduled for Student 103.");
  };

  const handleCreateQuizClick = () => {
    setQuizTopic("Probability Basics");
    setShowQuizModal(true);
  };

  const handleDispatchQuiz = () => {
    setInterventionActionsState(prev => ({ ...prev, quiz: true }));
    setShowQuizModal(false);
    triggerToast("Probability Basics quiz created & dispatched to Student 103.");
  };

  const handleViewAttendanceClick = () => {
    setInterventionActionsState(prev => ({ ...prev, attendance: true }));
    triggerToast("Opening Student 103 attendance & progress view...");
    if (setCurrentPage) {
      setCurrentPage('teacher-attendance');
    }
  };

  return (
    <div className="page-wrapper">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="toast-floating-wrapper">
          <div className="toast-glass-banner shadow-lg">
            <div className="toast-icon-circle">
              <CheckCircle2 size={18} className="text-emerald" />
            </div>
            <div className="toast-text-content">
              <span className="toast-action-title">Teacher Action Notification</span>
              <span className="toast-action-msg">{toastMessage}</span>
            </div>
            <button className="toast-dismiss-btn" onClick={() => setToastMessage(null)}>
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <div className="hod-header-pill mb-8">
            <span className="badge badge-indigo">Head of Department</span>
            <span className="dept-badge">CSE (AIML) Department</span>
            <span className="college-badge">{teacher.college}</span>
          </div>
          <h1 className="page-title">
            <span>{teacher.name}</span>
            <span className="title-sub-tag">HOD Dashboard</span>
          </h1>
          <p className="page-subtitle">Real-time cohort performance monitoring and AI auto-intervention engine.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-emerald" onClick={() => triggerToast("New AI Adaptive Quiz dispatched to all enrolled students!")}>
            <Plus size={16} />
            <span>Dispatch AI Quiz</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid-4 mb-24">
        <StatCard 
          title="Total Enrolled Students"
          value={`${studentsList.length} Students`}
          subtext="CSE (AIML) Cohort"
          icon={Users}
          trend="100% Active"
          color="indigo"
        />
        <StatCard 
          title="Average Attendance"
          value={`${teacher.avgAttendance}%`}
          subtext="Department Threshold: 75%"
          icon={Clock}
          trend="+2.1% this month"
          color="emerald"
        />
        <StatCard 
          title="Average Marks"
          value={`${teacher.avgInternalMarks}/100`}
          subtext="Mid-Sem Assessments"
          icon={Award}
          trend="Stable"
          color="cyan"
        />
        <StatCard 
          title="Students At Risk"
          value={`${studentsList.filter(s => s.performanceCategory === 'At Risk').length} Students`}
          subtext="Requires Immediate Action"
          icon={AlertTriangle}
          trend="High Priority"
          color="rose"
        />
      </div>

      {/* SECTION: Students Needing Attention */}
      <div className="section-block mb-24">
        <div className="section-block-header mb-16">
          <div className="flex-align-center gap-10">
            <AlertTriangle className="text-rose icon-pulse" size={22} />
            <div>
              <h2 className="section-block-title">Students Needing Attention</h2>
              <p className="section-block-sub">Immediate AI risk alerts and targeted teacher intervention actions</p>
            </div>
          </div>
        </div>

        {/* Feature 1: Prominent At-Risk Student Teacher Intervention Card */}
        <div className="glass-card student-intervention-main-card mb-20 hover-glow">
          {/* Card Top Header */}
          <div className="intervention-card-header-bar">
            <div className="flex-align-center gap-10">
              <Sparkles className="text-amber" size={20} />
              <h3 className="intervention-card-title-text">Student Intervention</h3>
            </div>
            <div className="risk-tag-box">
              <span className="badge badge-rose font-bold text-xs uppercase flex-align-center gap-6">
                <span className="red-pulse-indicator"></span>
                HIGH 🔴
              </span>
            </div>
          </div>

          {/* Student Banner Row */}
          <div 
            className="student-profile-strip"
            onClick={() => setShowStudentDetailModal(true)}
            title="Click to open Student 103 detail drawer"
          >
            <div className="student-strip-left">
              <div className="student-avatar-ring">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250" 
                  alt="Student 103" 
                  className="student-avatar-lg" 
                />
                <span className="high-risk-badge-dot">!</span>
              </div>
              <div>
                <h4 className="student-name-heading flex-align-center gap-8">
                  <span>Student 103</span>
                  <span className="badge badge-indigo">ID: 103</span>
                </h4>
                <p className="student-meta-desc">CSE (AIML) Cohort • High Risk Status • Click for details</p>
              </div>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowStudentDetailModal(true);
              }}
            >
              <Eye size={14} />
              <span>Student Detail</span>
            </button>
          </div>

          {/* Intervention Card Grid: Risk Reasons & Suggested Interventions */}
          <div className="intervention-details-container">
            {/* Left Column: Risk Reasons */}
            <div className="intervention-column risk-reasons-column">
              <h4 className="column-heading text-rose flex-align-center gap-6">
                <AlertCircle size={16} />
                <span>Risk Reasons</span>
              </h4>
              <ul className="reasons-bullet-list">
                <li>
                  <span className="bullet-symbol rose">•</span>
                  <span className="reason-text">Low attendance</span>
                </li>
                <li>
                  <span className="bullet-symbol rose">•</span>
                  <span className="reason-text">Low quiz score</span>
                </li>
                <li>
                  <span className="bullet-symbol rose">•</span>
                  <span className="reason-text">Low assignment score</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Suggested Intervention */}
            <div className="intervention-column suggested-actions-column">
              <h4 className="column-heading text-indigo flex-align-center gap-6">
                <Zap size={16} />
                <span>Suggested Intervention</span>
              </h4>
              <div className="intervention-actions-list">
                {/* Action 1: Assign Probability basics */}
                <div className="action-item-card">
                  <span className="action-label-text">• Assign Probability basics</span>
                  <button 
                    className={`btn btn-sm ${interventionActionsState['assign'] ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={handleAssignProbability}
                  >
                    {interventionActionsState['assign'] ? (
                      <>
                        <CheckCircle2 size={13} className="text-emerald" />
                        <span>Assigned</span>
                      </>
                    ) : (
                      <>
                        <Plus size={13} />
                        <span>Assign</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Action 2: Schedule mentoring */}
                <div className="action-item-card">
                  <span className="action-label-text">• Schedule mentoring</span>
                  <button 
                    className={`btn btn-sm ${interventionActionsState['schedule'] ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={handleScheduleMentoring}
                  >
                    {interventionActionsState['schedule'] ? (
                      <>
                        <CheckCircle2 size={13} className="text-emerald" />
                        <span>Scheduled</span>
                      </>
                    ) : (
                      <>
                        <Clock size={13} />
                        <span>Schedule</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Action 3: Give additional quiz */}
                <div className="action-item-card">
                  <span className="action-label-text">• Give additional quiz</span>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={handleCreateQuizClick}
                  >
                    <Sparkles size={13} />
                    <span>Create Quiz</span>
                  </button>
                </div>

                {/* Action 4: Monitor attendance */}
                <div className="action-item-card">
                  <span className="action-label-text">• Monitor attendance</span>
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={handleViewAttendanceClick}
                  >
                    <ArrowUpRight size={13} />
                    <span>View Attendance</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Early Intervention AI Alerts Grid */}
        <div className="glass-card alert-banner">
          <div className="alert-header">
            <div className="alert-title-box">
              <AlertTriangle className="text-rose" size={20} />
              <div>
                <h3>AI Early Intervention Alerts ({teacherData?.strugglingAlerts?.length || 3})</h3>
                <p className="alert-sub">Students flagged by AI with high risk of attendance or score failure</p>
              </div>
            </div>
          </div>

          <div className="alerts-grid">
            {teacherData?.strugglingAlerts?.map(alertItem => (
              <div key={alertItem.id} className="alert-card-item">
                <div className="alert-card-top">
                  <span className="alert-student">{alertItem.student} ({alertItem.studentId})</span>
                  <span className="badge badge-rose">{alertItem.subject}</span>
                </div>
                <p className="alert-issue">{alertItem.issue}</p>
                <div className="alert-card-action">
                  <span className="rec-action-label">Recommendation: {alertItem.recommendedAction}</span>
                  <button 
                    className={`btn btn-sm ${sentAlerts[alertItem.id] ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => handleSendAssistance(alertItem.id)}
                  >
                    {sentAlerts[alertItem.id] ? (
                      <>
                        <CheckCircle2 size={14} className="text-emerald" />
                        <span>Plan Sent</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Dispatch AI Remedial</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Student Table + Class Performance Breakdown */}
      <div className="teacher-grid">
        {/* Student Roster Table */}
        <div className="glass-card roster-card">
          <div className="roster-header">
            <div>
              <h3>CSE (AIML) Student Performance Table</h3>
              <p className="card-subtext">Displaying {filteredStudents.length} of {studentsList.length} students</p>
            </div>
            
            <div className="table-controls">
              {/* Search Box */}
              <div className="search-mini">
                <Search size={14} className="search-mini-icon" />
                <input 
                  type="text" 
                  placeholder="Search name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Performance Category Filters */}
              <div className="category-filter-btns">
                <button 
                  className={`filter-btn ${filterCategory === 'All' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('All')}
                >
                  All ({studentsList.length})
                </button>
                <button 
                  className={`filter-btn good ${filterCategory === 'Good Performance' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('Good Performance')}
                >
                  Good ({studentsList.filter(s => s.performanceCategory === 'Good Performance').length})
                </button>
                <button 
                  className={`filter-btn avg ${filterCategory === 'Average Performance' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('Average Performance')}
                >
                  Average ({studentsList.filter(s => s.performanceCategory === 'Average Performance').length})
                </button>
                <button 
                  className={`filter-btn risk ${filterCategory === 'At Risk' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('At Risk')}
                >
                  At Risk ({studentsList.filter(s => s.performanceCategory === 'At Risk').length})
                </button>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="roster-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                  <th>Internal Marks</th>
                  <th>Quiz Score</th>
                  <th>Performance</th>
                  <th>Risk Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} className={student.id === '103' ? 'highlight-row' : ''}>
                    <td className="text-muted font-mono">{student.id}</td>
                    <td>
                      <div 
                        className="student-cell cursor-pointer"
                        onClick={() => {
                          if (student.id === '103') setShowStudentDetailModal(true);
                        }}
                      >
                        <img src={student.avatar} alt={student.name} className="mini-avatar" />
                        <span className="student-name-text">{student.name}</span>
                        {student.id === '103' && <span className="badge badge-rose text-xs">Target</span>}
                      </div>
                    </td>
                    <td>
                      <span className={`attendance-pill ${student.attendance >= 75 ? 'safe' : 'warn'}`}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td>
                      <span className="score-text">{student.internalMarks}/100</span>
                    </td>
                    <td>
                      <span className="score-text">{student.quizScore}%</span>
                    </td>
                    <td>
                      <span className={`badge ${
                        student.performanceCategory === 'Good Performance' ? 'badge-emerald' :
                        student.performanceCategory === 'Average Performance' ? 'badge-indigo' : 'badge-amber'
                      }`}>
                        {student.performanceCategory}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        student.riskStatus === 'High Risk' ? 'badge-rose' :
                        student.riskStatus === 'Medium Risk' ? 'badge-amber' : 'badge-emerald'
                      }`}>
                        {student.riskStatus}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => {
                          if (student.id === '103') {
                            setShowStudentDetailModal(true);
                          } else {
                            setCurrentPage('teacher-performance');
                          }
                        }}
                      >
                        <span>{student.id === '103' ? 'Intervene' : 'Analytics'}</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Class Performance Chart & Subject Breakdown */}
        <div className="teacher-right-col">
          {/* Class Performance Bar Chart */}
          <div className="glass-card mb-20">
            <h3>Class Performance Overview</h3>
            <p className="card-subtext mb-16">Subject-wise average mastery score</p>
            <BarChartComponent />
          </div>

          {/* Subject Average Breakdown */}
          <div className="glass-card subject-analytics-card">
            <h3>Subject Cohort Average</h3>
            <p className="card-subtext mb-16">Aggregated performance across core modules</p>

            <div className="subjects-breakdown-list">
              {teacherData?.subjectAverages?.map((sub, i) => (
                <div key={i} className="subject-stat-item">
                  <div className="sub-stat-top">
                    <span className="sub-stat-name">{sub.subject}</span>
                    <div className="sub-stat-num">
                      <strong>{sub.avgScore}%</strong>
                      <span className={`trend-pill ${sub.trend.startsWith('+') ? 'up' : 'down'}`}>{sub.trend}</span>
                    </div>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill"
                      style={{ 
                        width: `${sub.avgScore}%`,
                        background: sub.avgScore > 80 ? 'var(--gradient-emerald)' : 'var(--gradient-primary)'
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Student 103 Detail Drawer / Modal */}
      {showStudentDetailModal && (
        <div className="custom-modal-backdrop" onClick={() => setShowStudentDetailModal(false)}>
          <div className="custom-modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div className="flex-align-center gap-12">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250" 
                  alt="Student 103" 
                  className="mini-avatar-lg" 
                />
                <div>
                  <h3 className="modal-title-main flex-align-center gap-8">
                    <span>Student ID: 103</span>
                    <span className="badge badge-rose font-bold">Risk: HIGH</span>
                  </h3>
                  <p className="modal-title-sub">Full Student Risk Evaluation & Action Panel</p>
                </div>
              </div>
              <button className="modal-close-icon-btn" onClick={() => setShowStudentDetailModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="custom-modal-body">
              {/* Profile Overview Pill */}
              <div className="profile-metrics-strip mb-20">
                <div className="metric-pill-item">
                  <span className="metric-pill-label">Student ID</span>
                  <span className="metric-pill-val font-mono">103</span>
                </div>
                <div className="metric-pill-item">
                  <span className="metric-pill-label">Risk Level</span>
                  <span className="metric-pill-val text-rose font-bold">HIGH</span>
                </div>
                <div className="metric-pill-item">
                  <span className="metric-pill-label">Attendance</span>
                  <span className="metric-pill-val text-rose font-bold">58%</span>
                </div>
                <div className="metric-pill-item">
                  <span className="metric-pill-label">Quiz Score</span>
                  <span className="metric-pill-val text-amber font-bold">42%</span>
                </div>
              </div>

              {/* Reasons Section */}
              <div className="modal-info-block mb-20">
                <h4 className="modal-block-label text-rose flex-align-center gap-6 mb-8">
                  <AlertCircle size={16} />
                  <span>Reasons:</span>
                </h4>
                <ul className="modal-bullet-list">
                  <li><span className="bullet-dot rose">•</span> Low attendance</li>
                  <li><span className="bullet-dot rose">•</span> Low quiz score</li>
                  <li><span className="bullet-dot rose">•</span> Low assignment score</li>
                </ul>
              </div>

              {/* Recommended Actions Section */}
              <div className="modal-info-block mb-16">
                <h4 className="modal-block-label text-indigo flex-align-center gap-6 mb-12">
                  <Zap size={16} />
                  <span>Recommended Actions:</span>
                </h4>
                <div className="recommended-actions-grid">
                  {/* 1. Probability basics */}
                  <div className="rec-action-card">
                    <div className="rec-card-info">
                      <span className="rec-action-name">• Probability basics</span>
                      <span className="rec-action-desc">Assign foundational statistics & probability module</span>
                    </div>
                    <button 
                      className={`btn btn-sm ${interventionActionsState['assign'] ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={handleAssignProbability}
                    >
                      {interventionActionsState['assign'] ? 'Assigned ✓' : 'Assign'}
                    </button>
                  </div>

                  {/* 2. Mentoring */}
                  <div className="rec-action-card">
                    <div className="rec-card-info">
                      <span className="rec-action-name">• Mentoring</span>
                      <span className="rec-action-desc">Schedule 1-on-1 HOD mentoring session</span>
                    </div>
                    <button 
                      className={`btn btn-sm ${interventionActionsState['schedule'] ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={handleScheduleMentoring}
                    >
                      {interventionActionsState['schedule'] ? 'Scheduled ✓' : 'Schedule'}
                    </button>
                  </div>

                  {/* 3. Additional quiz */}
                  <div className="rec-action-card">
                    <div className="rec-card-info">
                      <span className="rec-action-name">• Additional quiz</span>
                      <span className="rec-action-desc">Create AI adaptive remedial quiz</span>
                    </div>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={handleCreateQuizClick}
                    >
                      Create Quiz
                    </button>
                  </div>

                  {/* 4. Attendance monitoring */}
                  <div className="rec-action-card">
                    <div className="rec-card-info">
                      <span className="rec-action-name">• Attendance monitoring</span>
                      <span className="rec-action-desc">Open detailed student attendance log</span>
                    </div>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={handleViewAttendanceClick}
                    >
                      View Attendance
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="custom-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowStudentDetailModal(false)}>
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Create Quiz Modal for Student 103 */}
      {showQuizModal && (
        <div className="custom-modal-backdrop" onClick={() => setShowQuizModal(false)}>
          <div className="custom-modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div className="flex-align-center gap-10">
                <Sparkles size={20} className="text-amber" />
                <div>
                  <h3 className="modal-title-main">Create Quiz for Student 103</h3>
                  <p className="modal-title-sub">Pre-filled topic suggestion for high-risk intervention</p>
                </div>
              </div>
              <button className="modal-close-icon-btn" onClick={() => setShowQuizModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="custom-modal-body">
              <div className="modal-form-group mb-16">
                <label className="modal-form-label">Suggested Topic</label>
                <input 
                  type="text" 
                  className="modal-form-input" 
                  value={quizTopic} 
                  onChange={(e) => setQuizTopic(e.target.value)}
                />
              </div>

              <div className="modal-form-group mb-16">
                <label className="modal-form-label">Recipient Student</label>
                <div className="p-10 rounded bg-dark border flex-align-center gap-10">
                  <span className="font-semibold text-sm">Student 103 (ID: 103)</span>
                  <span className="badge badge-rose text-xs">Risk Level: HIGH</span>
                </div>
              </div>

              <div className="modal-form-group mb-16">
                <label className="modal-form-label">Quiz Parameters</label>
                <div className="flex-align-center gap-8 flex-wrap">
                  <span className="badge badge-indigo">5 Questions</span>
                  <span className="badge badge-cyan">Adaptive AI Difficulty</span>
                  <span className="badge badge-amber">Instant Feedback</span>
                </div>
              </div>
            </div>

            <div className="custom-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowQuizModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleDispatchQuiz}>
                <Send size={14} />
                <span>Dispatch Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic CSS Styles */}
      <style>{`
        .mb-24 { margin-bottom: 24px; }
        .mb-20 { margin-bottom: 20px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-12 { margin-bottom: 12px; }
        .mb-8 { margin-bottom: 8px; }
        .p-10 { padding: 10px; }
        .text-rose { color: #f43f5e; }
        .text-amber { color: #f59e0b; }
        .text-indigo { color: #818cf8; }
        .text-emerald { color: #10b981; }
        .font-mono { font-family: monospace; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .flex-align-center { display: flex; align-items: center; }
        .gap-4 { gap: 4px; }
        .gap-6 { gap: 6px; }
        .gap-8 { gap: 8px; }
        .gap-10 { gap: 10px; }
        .gap-12 { gap: 12px; }
        .flex-wrap { flex-wrap: wrap; }
        .cursor-pointer { cursor: pointer; }

        /* Toast Floating Notification */
        .toast-floating-wrapper {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 9999;
          animation: slideInToast 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideInToast {
          from { transform: translateY(-30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .toast-glass-banner {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: var(--radius-md);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          min-width: 320px;
          max-width: 440px;
        }

        .toast-icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast-text-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .toast-action-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #34d399;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .toast-action-msg {
          font-size: 0.86rem;
          color: var(--text-main);
          font-weight: 500;
        }

        .toast-dismiss-btn {
          background: transparent;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }

        .toast-dismiss-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Section Block Header */
        .section-block-title {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.3px;
        }

        .section-block-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        /* Red Pulse Indicator */
        .red-pulse-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          animation: pulseRed 1.8s infinite;
        }

        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* Main Student Intervention Card */
        .student-intervention-main-card {
          border: 1px solid rgba(244, 63, 94, 0.35);
          background: linear-gradient(135deg, rgba(244, 63, 94, 0.07) 0%, rgba(15, 23, 42, 0.92) 100%);
          padding: 20px;
          border-radius: var(--radius-lg);
        }

        .intervention-card-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 16px;
        }

        .intervention-card-title-text {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.2px;
        }

        .student-profile-strip {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .student-profile-strip:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(99, 102, 241, 0.4);
        }

        .student-strip-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .student-avatar-ring {
          position: relative;
        }

        .student-avatar-lg {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ef4444;
        }

        .high-risk-badge-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-dark);
        }

        .student-name-heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .student-meta-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Intervention Grid Layout */
        .intervention-details-container {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 20px;
        }

        @media (max-width: 868px) {
          .intervention-details-container {
            grid-template-columns: 1fr;
          }
        }

        .intervention-column {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .column-heading {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .reasons-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .reasons-bullet-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: var(--text-main);
        }

        .bullet-symbol {
          font-size: 1.2rem;
          font-weight: 900;
          line-height: 1;
        }

        .bullet-symbol.rose {
          color: #ef4444;
        }

        .reason-text {
          font-weight: 600;
          color: #fca5a5;
        }

        .intervention-actions-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-item-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.04);
          transition: background 0.2s;
        }

        .action-item-card:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .action-label-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        /* Roster Row Highlight */
        .highlight-row {
          background: rgba(239, 68, 68, 0.06) !important;
        }

        /* Modals Overlay */
        .custom-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .custom-modal-box {
          width: 100%;
          max-width: 580px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          overflow: hidden;
          background: var(--bg-card);
        }

        .custom-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
        }

        .mini-avatar-lg {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ef4444;
        }

        .modal-title-main {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .modal-title-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .modal-close-icon-btn {
          background: transparent;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }

        .modal-close-icon-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .custom-modal-body {
          padding: 20px;
          overflow-y: auto;
        }

        .profile-metrics-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          background: rgba(255, 255, 255, 0.03);
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        @media (max-width: 600px) {
          .profile-metrics-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .metric-pill-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .metric-pill-label {
          font-size: 0.7rem;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .metric-pill-val {
          font-size: 1.05rem;
          margin-top: 2px;
        }

        .modal-block-label {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .modal-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .modal-bullet-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #fca5a5;
        }

        .recommended-actions-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .rec-action-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
        }

        .rec-card-info {
          display: flex;
          flex-direction: column;
        }

        .rec-action-name {
          font-weight: 700;
          font-size: 0.86rem;
          color: var(--text-main);
        }

        .rec-action-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .custom-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 14px 20px;
          border-top: 1px solid var(--border-color);
        }

        .modal-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .modal-form-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .modal-form-input {
          padding: 9px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-main);
          font-size: 0.88rem;
          outline: none;
        }

        .modal-form-input:focus {
          border-color: var(--primary);
        }

        .hod-header-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .dept-badge {
          font-size: 0.76rem;
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(99, 102, 241, 0.3);
          font-weight: 600;
        }

        .college-badge {
          font-size: 0.76rem;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-muted);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .title-sub-tag {
          font-size: 1rem;
          color: #818cf8;
          margin-left: 10px;
          font-weight: 600;
        }

        .alert-banner {
          border: 1px solid rgba(244, 63, 94, 0.3);
          background: linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(18, 26, 43, 0.9) 100%);
        }

        .alert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .alert-title-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .alert-title-box h3 {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .alert-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .alerts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 1024px) {
          .alerts-grid { grid-template-columns: 1fr; }
        }

        .alert-card-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .alert-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .alert-student {
          font-weight: 700;
          font-size: 0.88rem;
        }

        .alert-issue {
          font-size: 0.8rem;
          color: #fca5a5;
        }

        .alert-card-action {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }

        .rec-action-label {
          font-size: 0.72rem;
          color: var(--text-dim);
        }

        .teacher-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .teacher-grid { grid-template-columns: 1fr; }
        }

        .roster-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .table-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .search-mini {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-mini-icon {
          position: absolute;
          left: 10px;
          color: var(--text-dim);
        }

        .search-mini input {
          padding: 7px 12px 7px 30px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-main);
          font-size: 0.8rem;
          outline: none;
        }

        .category-filter-btns {
          display: flex;
          gap: 4px;
          background: rgba(255, 255, 255, 0.04);
          padding: 3px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .filter-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn.active {
          background: var(--gradient-primary);
          color: white;
        }

        .filter-btn.good.active {
          background: #10b981;
          color: white;
        }

        .filter-btn.avg.active {
          background: #6366f1;
          color: white;
        }

        .filter-btn.risk.active {
          background: #ef4444;
          color: white;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .roster-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
        }

        .roster-table th {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-dim);
          font-weight: 600;
        }

        .roster-table td {
          padding: 12px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .student-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mini-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
        }

        .student-name-text {
          font-weight: 600;
          color: var(--text-main);
        }

        .attendance-pill {
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.78rem;
        }

        .attendance-pill.safe {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
        }

        .attendance-pill.warn {
          background: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
        }

        .score-text {
          font-weight: 600;
          color: var(--text-main);
        }

        .card-subtext {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .subjects-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sub-stat-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 0.85rem;
        }

        .sub-stat-name {
          font-weight: 600;
        }

        .sub-stat-num {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .trend-pill {
          font-size: 0.7rem;
          padding: 1px 5px;
          border-radius: 4px;
          font-weight: 700;
        }

        .trend-pill.up { background: rgba(16, 185, 129, 0.2); color: #34d399; }
        .trend-pill.down { background: rgba(244, 63, 94, 0.2); color: #f43f5e; }
      `}</style>
    </div>
  );
}
