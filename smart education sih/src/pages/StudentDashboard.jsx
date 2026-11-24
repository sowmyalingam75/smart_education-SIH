import React from 'react';
import { 
  Sparkles, 
  Clock, 
  Award, 
  Flame, 
  Zap, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Play,
  HelpCircle,
  TrendingUp,
  Brain,
  Binary,
  Globe,
  Cpu,
  FileText,
  Video,
  Download,
  Bell
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { AreaChartComponent, BarChartComponent } from '../components/ChartComponents';

export default function StudentDashboard({ setCurrentPage, student }) {
  // Fallback if student prop is missing
  const currentStudent = student || {
    id: "STU001",
    name: "Nikhitha",
    department: "CSE (AIML)",
    attendance: 94,
    internalMarks: 88,
    quizScore: 92,
    overallPerformance: 91,
    learningProgress: 86,
    weakSubjects: ["Machine Learning – Decision Trees"],
    recommendedTopics: ["Decision Trees & Information Gain", "Random Forests"],
    aiRecommendation: "Based on your recent quiz performance, we recommend revising Machine Learning – Decision Trees.",
    studyMaterials: [],
    upcomingQuizzes: [],
    notifications: [],
    subjectPerformance: []
  };

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'Binary': return Binary;
      case 'Brain': return Brain;
      case 'Globe': return Globe;
      case 'Cpu': return Cpu;
      default: return BookOpen;
    }
  };

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="student-profile-header-pill mb-8">
            <span className="badge badge-emerald"><span className="pulse-dot" /> AI Student Portal</span>
            <span className="dept-badge">CSE (AIML) Department</span>
            <span className="id-badge">ID: {currentStudent.id}</span>
          </div>
          <h1 className="page-title">
            <span>Welcome, {currentStudent.name}!</span>
          </h1>
          <p className="page-subtitle">Here is your AI-Powered Smart Education dashboard and performance overview.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setCurrentPage('ai-tutor')}>
            <Sparkles size={16} />
            <span>Launch AI Tutor</span>
          </button>
        </div>
      </div>

      {/* Main Requirement Stat Cards Grid */}
      <div className="grid-4 mb-24">
        <StatCard 
          title="Attendance Percentage"
          value={`${currentStudent.attendance}%`}
          subtext={currentStudent.attendance >= 75 ? "Safe (Above 75% Threshold)" : "At Risk (<75% Warning)"}
          icon={Clock}
          trend={currentStudent.attendance >= 75 ? "Regular" : "Low"}
          color={currentStudent.attendance >= 75 ? "emerald" : "rose"}
        />
        <StatCard 
          title="Internal Marks"
          value={`${currentStudent.internalMarks}/100`}
          subtext="Mid-Semester Assessments"
          icon={Award}
          trend="+4.5%"
          color="indigo"
        />
        <StatCard 
          title="Quiz Performance"
          value={`${currentStudent.quizScore}%`}
          subtext="Adaptive Practice Tests"
          icon={Zap}
          trend="Top Tier"
          color="cyan"
        />
        <StatCard 
          title="Overall Performance"
          value={`${currentStudent.overallPerformance}%`}
          subtext={`Status: ${currentStudent.performanceCategory}`}
          icon={Flame}
          trend={`${currentStudent.learningProgress}% Progress`}
          color="amber"
        />
      </div>

      {/* AI Learning Recommendation Banner */}
      <div className="glass-card ai-recommendation-hero mb-24">
        <div className="ai-rec-header">
          <div className="ai-sparkle-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="ai-tag-label">AI Personalized Learning Recommendation</div>
            <h3 className="ai-rec-text">"{currentStudent.aiRecommendation}"</h3>
          </div>
        </div>

        <div className="ai-rec-actions">
          <div className="rec-topics-chips">
            <span className="topics-label">Recommended Topics:</span>
            {currentStudent.recommendedTopics?.map((topic, i) => (
              <span key={i} className="topic-chip">{topic}</span>
            ))}
          </div>
          <button 
            className="btn btn-emerald btn-sm"
            onClick={() => setCurrentPage('learning-recommendations')}
          >
            <span>Start Revision Plan</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Grid: Performance Chart + Weak Subjects & Progress */}
      <div className="dashboard-grid mb-24">
        {/* Left Column: Progress Chart & Subject Performance */}
        <div className="dashboard-left">
          {/* Progress Chart Widget */}
          <div className="glass-card mb-20">
            <div className="section-header">
              <h3>Overall Learning Progress Trend</h3>
              <span className="badge badge-indigo">Real-Time Sync</span>
            </div>
            <p className="card-subtext mb-16">Weekly mastery curve vs CSE (AIML) class average</p>
            <div className="chart-container">
              <AreaChartComponent />
            </div>
          </div>

          {/* Enrolled Courses / Subject Performance */}
          <div className="section-header">
            <h3>Subject Performance Breakdown</h3>
            <button className="view-all-btn" onClick={() => setCurrentPage('performance')}>
              View Full Analytics <ArrowRight size={14} />
            </button>
          </div>

          <div className="courses-list">
            {currentStudent.subjectPerformance?.map((course) => {
              const IconComponent = getSubjectIcon(course.icon);
              return (
                <div key={course.id} className="glass-card course-card hover-glow">
                  <div className="course-header">
                    <div className="course-icon-title">
                      <div className="course-icon-bg" style={{ background: `${course.statusColor}20`, color: course.statusColor }}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="course-title">{course.name}</h4>
                        <span className="course-code">{course.code} • {course.completedModules}/{course.totalModules} Modules</span>
                      </div>
                    </div>
                    <span className="badge" style={{ background: `${course.statusColor}20`, color: course.statusColor, border: `1px solid ${course.statusColor}40` }}>
                      {course.status}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="course-progress">
                    <div className="progress-label">
                      <span>Mastery Score</span>
                      <span className="progress-num" style={{ color: course.statusColor }}>{course.mastery}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${course.mastery}%`, background: course.statusColor }} 
                      />
                    </div>
                  </div>

                  {/* Details pill */}
                  <div className="course-footer">
                    <span className="weak-topic-pill">
                      Weak Topic: <strong>{course.weakTopic}</strong>
                    </span>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setCurrentPage('learning-recommendations')}
                    >
                      <Play size={12} />
                      <span>Revise Topic</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Weak Subjects, Study Materials, Upcoming Quizzes & Notifications */}
        <div className="dashboard-right">
          {/* Weak Subjects Card */}
          <div className="glass-card weak-subjects-card mb-20">
            <div className="card-header-icon">
              <AlertCircle size={18} className="text-amber" />
              <h4>Identified Weak Subjects</h4>
            </div>
            <div className="weak-list">
              {currentStudent.weakSubjects?.map((sub, idx) => (
                <div key={idx} className="weak-item">
                  <div className="weak-bullet" />
                  <span>{sub}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary btn-sm mt-12 w-full" onClick={() => setCurrentPage('ai-tutor')}>
              <Sparkles size={14} />
              <span>Ask AI Tutor to Explain</span>
            </button>
          </div>

          {/* Study Materials Card */}
          <div className="glass-card study-materials-widget mb-20">
            <div className="section-header mb-12">
              <h4>Study Materials & Notes</h4>
              <button className="view-all-btn" onClick={() => setCurrentPage('study-materials')}>
                View All
              </button>
            </div>
            <div className="materials-mini-list">
              {currentStudent.studyMaterials?.slice(0, 3).map((mat) => (
                <div key={mat.id} className="mat-mini-item">
                  <div className="mat-icon">
                    <BookOpen size={16} className="text-indigo" />
                  </div>
                  <div className="mat-info">
                    <span className="mat-title">{mat.title}</span>
                    <span className="mat-type">{mat.type} • {mat.size}</span>
                  </div>
                  <button className="mat-download" title="Download">
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Quizzes Card */}
          <div className="glass-card quizzes-widget mb-20">
            <div className="section-header mb-12">
              <h4>Upcoming Quizzes</h4>
              <button className="view-all-btn" onClick={() => setCurrentPage('quizzes')}>
                Go to Quizzes
              </button>
            </div>
            <div className="quizzes-mini-list">
              {currentStudent.upcomingQuizzes?.map((q) => (
                <div key={q.id} className="quiz-mini-item">
                  <div className="quiz-mini-info">
                    <span className="quiz-mini-title">{q.title}</span>
                    <span className="quiz-mini-date">{q.date} • {q.duration}</span>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage('quizzes')}>
                    Take
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications Widget */}
          <div className="glass-card notifications-widget">
            <div className="card-header-icon mb-12">
              <Bell size={18} className="text-indigo" />
              <h4>Recent Notifications</h4>
            </div>
            <div className="notif-mini-list">
              {currentStudent.notifications?.map((n) => (
                <div key={n.id} className="notif-mini-item">
                  <span className="notif-mini-title">{n.title}</span>
                  <span className="notif-mini-desc">{n.desc}</span>
                  <span className="notif-mini-time">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mb-24 { margin-bottom: 24px; }
        .mb-20 { margin-bottom: 20px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-12 { margin-bottom: 12px; }
        .mb-8 { margin-bottom: 8px; }
        .mt-12 { margin-top: 12px; }
        .w-full { width: 100%; }

        .student-profile-header-pill {
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

        .id-badge {
          font-size: 0.76rem;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-muted);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          font-weight: 600;
        }

        .ai-recommendation-hero {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.12) 100%);
          border: 1px solid rgba(99, 102, 241, 0.4);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
        }

        .ai-rec-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .ai-sparkle-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
          flex-shrink: 0;
        }

        .ai-tag-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #a5b4fc;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ai-rec-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          margin-top: 2px;
          line-height: 1.3;
        }

        .ai-rec-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 12px;
        }

        .rec-topics-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .topics-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .topic-chip {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text-main);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-header h3, .section-header h4 {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .card-subtext {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #818cf8;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .view-all-btn:hover {
          color: white;
        }

        .courses-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .course-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .course-icon-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .course-icon-bg {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .course-title {
          font-size: 0.96rem;
          font-weight: 700;
        }

        .course-code {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .course-progress {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .progress-num {
          font-weight: 700;
        }

        .course-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
          border-top: 1px solid var(--border-color);
        }

        .weak-topic-pill {
          font-size: 0.75rem;
          color: var(--text-muted);
          max-width: 70%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-header-icon {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-header-icon h4 {
          font-size: 0.96rem;
          font-weight: 700;
        }

        .weak-subjects-card {
          border: 1px solid rgba(245, 158, 11, 0.3);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(18, 26, 43, 0.9) 100%);
        }

        .weak-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }

        .weak-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: var(--text-main);
        }

        .weak-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f59e0b;
        }

        .materials-mini-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mat-mini-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
        }

        .mat-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .mat-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .mat-type {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .mat-download {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }

        .mat-download:hover {
          color: var(--primary);
        }

        .quizzes-mini-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quiz-mini-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
        }

        .quiz-mini-info {
          display: flex;
          flex-direction: column;
        }

        .quiz-mini-title {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .quiz-mini-date {
          font-size: 0.7rem;
          color: var(--text-dim);
        }

        .notif-mini-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notif-mini-item {
          display: flex;
          flex-direction: column;
          padding: 8px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
        }

        .notif-mini-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .notif-mini-desc {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .notif-mini-time {
          font-size: 0.65rem;
          color: var(--text-dim);
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
