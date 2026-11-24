import React from 'react';
import { Calendar, CheckCircle, AlertCircle, Clock, ShieldCheck, UserCheck, ArrowUpRight } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function AttendancePage({ setCurrentPage, student, role, sampleStudents }) {
  const currentStudent = student || sampleStudents?.[0];

  const attendanceLog = [
    { date: "Sep 09, 2026", subject: "Data Structures & Algorithms", status: "Present", teacher: "Prof. Rajesh Kumar" },
    { date: "Sep 09, 2026", subject: "Artificial Intelligence & ML", status: "Present", teacher: "Dr. Sunita Verma" },
    { date: "Sep 08, 2026", subject: "Full Stack Web Architectures", status: "Present", teacher: "Prof. Anita Sharma" },
    { date: "Sep 08, 2026", subject: "Operating Systems", status: currentStudent.attendance < 75 ? "Absent" : "Present", teacher: "Dr. Sunita Verma" },
    { date: "Sep 07, 2026", subject: "AI & ML Lab", status: "Present", teacher: "Prof. Rajesh Kumar" },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Attendance Monitoring</span>
            <span className="badge badge-indigo">{role === 'student' ? currentStudent.name : 'HOD Cohort View'}</span>
          </h1>
          <p className="page-subtitle">Track course attendance logs, AI compliance threshold warnings, and monthly trends.</p>
        </div>
      </div>

      <div className="grid-3 mb-24">
        <StatCard 
          title="Overall Attendance Percentage"
          value={`${role === 'student' ? currentStudent.attendance : 84.3}%`}
          subtext="Minimum Required: 75%"
          icon={Clock}
          trend={role === 'student' && currentStudent.attendance < 75 ? "Warning (<75%)" : "Compliant"}
          color={role === 'student' && currentStudent.attendance < 75 ? "rose" : "emerald"}
        />
        <StatCard 
          title="Total Lectures Attended"
          value="142 / 160"
          subtext="CSE (AIML) 5th Semester"
          icon={UserCheck}
          trend="88.7%"
          color="indigo"
        />
        <StatCard 
          title="AI Attendance Forecast"
          value="On Track"
          subtext="No exam blockage risk predicted"
          icon={ShieldCheck}
          trend="Safe Zone"
          color="cyan"
        />
      </div>

      <div className="glass-card mb-24">
        <h3>Recent Daily Attendance Log</h3>
        <p className="card-subtext mb-16">Verified biometric & LMS attendance sync</p>

        <div className="table-responsive">
          <table className="roster-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject Course</th>
                <th>Instructor</th>
                <th>Biometric Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLog.map((log, index) => (
                <tr key={index}>
                  <td>{log.date}</td>
                  <td className="font-semibold">{log.subject}</td>
                  <td className="text-muted">{log.teacher}</td>
                  <td>
                    <span className={`badge ${log.status === 'Present' ? 'badge-emerald' : 'badge-rose'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .mb-24 { margin-bottom: 24px; }
        .mb-16 { margin-bottom: 16px; }
        .card-subtext { font-size: 0.8rem; color: var(--text-muted); }
        .font-semibold { font-weight: 600; color: var(--text-main); }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
