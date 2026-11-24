import React from 'react';
import { FileText, Download, Printer, Sparkles, CheckCircle, BarChart3, Users, Award } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function ReportsPage({ setCurrentPage, teacherData, sampleStudents }) {
  const reportsList = [
    { id: "rep-1", title: "AICTE SIH 2026 Smart Education Compliance Report", date: "Sep 2026", format: "PDF", size: "2.4 MB", desc: "Comprehensive departmental analytics on AI intervention rates, student progress, and attendance benchmarks." },
    { id: "rep-2", title: "CSE (AIML) Department Mid-Semester Performance Audit", date: "Sep 2026", format: "PDF", size: "3.1 MB", desc: "Breakdown of internal marks, quiz accuracy rates, and weak-topic identification matrices." },
    { id: "rep-3", title: "At-Risk Early Intervention & Remedial Outcome Summary", date: "Aug 2026", format: "XLSX", size: "1.2 MB", desc: "Detailed tracking of 8 struggling students who completed Socratic AI remedial pathways." },
    { id: "rep-4", title: "NAAC Accreditation Learning Outcomes & Mastery Matrix", date: "Jul 2026", format: "PDF", size: "5.8 MB", desc: "Outcome-Based Education (OBE) course outcome attainment report auto-calculated by SmartLearn AI." }
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Departmental Reports & Analytics</span>
            <span className="badge badge-indigo">HOD & Accreditation</span>
          </h1>
          <p className="page-subtitle">Generate and export official performance reports for AICTE, NAAC, and HOD reviews.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => alert('Generating new Departmental Report PDF...')}>
            <Printer size={16} />
            <span>Generate New Report</span>
          </button>
        </div>
      </div>

      <div className="grid-3 mb-24">
        <StatCard 
          title="Total Reports Generated"
          value="24 Reports"
          subtext="2026 Academic Year"
          icon={FileText}
          trend="Automated"
          color="indigo"
        />
        <StatCard 
          title="Course Outcome Attainment"
          value="88.4%"
          subtext="OBE Compliance Target: 75%"
          icon={Award}
          trend="+4.2%"
          color="emerald"
        />
        <StatCard 
          title="AI Governance Audit"
          value="100% Verified"
          subtext="Data privacy & security safe"
          icon={CheckCircle}
          trend="Certified"
          color="cyan"
        />
      </div>

      <div className="reports-grid">
        {reportsList.map((rep) => (
          <div key={rep.id} className="glass-card report-card hover-glow mb-16">
            <div className="rep-header">
              <div className="rep-icon-bg">
                <FileText size={20} className="text-indigo" />
              </div>
              <div>
                <span className="badge badge-indigo mb-4">{rep.date} • {rep.format}</span>
                <h4 className="rep-title">{rep.title}</h4>
              </div>
            </div>

            <p className="rep-desc">{rep.desc}</p>

            <div className="rep-footer">
              <span className="rep-meta">File Size: {rep.size}</span>
              <button className="btn btn-secondary btn-sm" onClick={() => alert(`Downloading ${rep.title}...`)}>
                <Download size={14} />
                <span>Export File</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .mb-24 { margin-bottom: 24px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-4 { margin-bottom: 4px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr; } }
        .reports-grid { display: flex; flex-direction: column; gap: 16px; }
        .report-card { display: flex; flex-direction: column; gap: 12px; }
        .rep-header { display: flex; gap: 12px; align-items: flex-start; }
        .rep-icon-bg {
          width: 42px; height: 42px; border-radius: 12px;
          background: rgba(99, 102, 241, 0.15);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .rep-title { font-size: 1rem; font-weight: 700; color: var(--text-main); }
        .rep-desc { font-size: 0.84rem; color: var(--text-muted); line-height: 1.4; }
        .rep-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-color); }
        .rep-meta { font-size: 0.74rem; color: var(--text-dim); }
      `}</style>
    </div>
  );
}
