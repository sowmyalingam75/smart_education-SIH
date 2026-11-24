import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SubjectsPage from './pages/SubjectsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import StudyPlannerPage from './pages/StudyPlannerPage';
import QuizPage from './pages/QuizPage';
import ProgressTrackerPage from './pages/ProgressTrackerPage';
import NotesPage from './pages/NotesPage';
import StudentProfilePage from './pages/StudentProfilePage';

// Teacher/legacy pages kept for completeness
import TeacherDashboard from './pages/TeacherDashboard';
import PerformancePage from './pages/PerformancePage';
import AttendancePage from './pages/AttendancePage';
import AtRiskStudentsPage from './pages/AtRiskStudentsPage';
import ReportsPage from './pages/ReportsPage';

import { sampleStudents, mockTeacherData } from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [role, setRole] = useState('student');
  const [currentStudentId, setCurrentStudentId] = useState('STU001');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentStudent = sampleStudents.find(s => s.id === currentStudentId) || sampleStudents[1];

  const handleLogout = () => setCurrentPage('login');

  const renderPage = () => {
    switch (currentPage) {
      // ── Core Student Pages ──
      case 'student-dashboard':
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} student={currentStudent} />;

      case 'subjects':
        return <SubjectsPage setCurrentPage={setCurrentPage} student={currentStudent} />;

      case 'ai-assistant':
        return <AIAssistantPage setCurrentPage={setCurrentPage} student={currentStudent} />;

      case 'study-planner':
        return <StudyPlannerPage setCurrentPage={setCurrentPage} student={currentStudent} />;

      case 'quiz':
        return <QuizPage setCurrentPage={setCurrentPage} student={currentStudent} />;

      case 'progress-tracker':
        return <ProgressTrackerPage setCurrentPage={setCurrentPage} student={currentStudent} />;

      case 'notes':
        return <NotesPage setCurrentPage={setCurrentPage} student={currentStudent} />;

      case 'profile':
        return <StudentProfilePage setCurrentPage={setCurrentPage} student={currentStudent} />;

      // ── Teacher/Legacy Pages ──
      case 'teacher-dashboard':
        return <TeacherDashboard setCurrentPage={setCurrentPage} teacherData={mockTeacherData} sampleStudents={sampleStudents} />;

      case 'performance':
      case 'teacher-performance':
        return <PerformancePage setCurrentPage={setCurrentPage} student={currentStudent} role={role} sampleStudents={sampleStudents} />;

      case 'attendance':
      case 'teacher-attendance':
        return <AttendancePage setCurrentPage={setCurrentPage} student={currentStudent} role={role} sampleStudents={sampleStudents} />;

      case 'students':
      case 'at-risk-students':
        return <AtRiskStudentsPage setCurrentPage={setCurrentPage} sampleStudents={sampleStudents} />;

      case 'reports':
        return <ReportsPage setCurrentPage={setCurrentPage} teacherData={mockTeacherData} sampleStudents={sampleStudents} />;

      case 'teacher-profile':
        return <StudentProfilePage setCurrentPage={setCurrentPage} student={currentStudent} />;

      // Login
      case 'login':
        return (
          <LoginPage
            setCurrentPage={setCurrentPage}
            setRole={setRole}
            setCurrentStudentId={setCurrentStudentId}
            sampleStudents={sampleStudents}
          />
        );

      default:
        return role === 'student'
          ? <DashboardPage setCurrentPage={setCurrentPage} student={currentStudent} />
          : <TeacherDashboard setCurrentPage={setCurrentPage} teacherData={mockTeacherData} sampleStudents={sampleStudents} />;
    }
  };

  // Full-screen login
  if (currentPage === 'login') {
    return (
      <div className="login-root">
        <LoginPage
          setCurrentPage={setCurrentPage}
          setRole={setRole}
          setCurrentStudentId={setCurrentStudentId}
          sampleStudents={sampleStudents}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        role={role}
        setRole={setRole}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        currentStudent={currentStudent}
        handleLogout={handleLogout}
      />
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <TopHeader
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          role={role}
          setRole={setRole}
          currentStudent={currentStudent}
          handleLogout={handleLogout}
        />
        {renderPage()}
      </div>
    </div>
  );
}
