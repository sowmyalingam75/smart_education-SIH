import React, { useState } from 'react';
import { AlertTriangle, Send, CheckCircle2, ShieldAlert, Sparkles, Filter, Search, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function AtRiskStudentsPage({ setCurrentPage, sampleStudents }) {
  const [sentRemedials, setSentRemedials] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const atRiskStudents = sampleStudents?.filter(s => s.performanceCategory === 'At Risk' || s.riskStatus === 'High Risk' || s.attendance < 75) || [];

  const handleDispatch = (id) => {
    setSentRemedials(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>At-Risk Student Intervention Engine</span>
            <span className="badge badge-rose">HOD Action Portal</span>
          </h1>
          <p className="page-subtitle">Identify struggling students early and dispatch automated AI adaptive remedial plans.</p>
        </div>
      </div>

      <div className="grid-3 mb-24">
        <StatCard 
          title="Students Flagged At Risk"
          value={`${atRiskStudents.length} Students`}
          subtext="Requires HOD Intervention"
          icon={AlertTriangle}
          trend="Immediate Action"
          color="rose"
        />
        <StatCard 
          title="Attendance Below 75%"
          value={`${sampleStudents?.filter(s => s.attendance < 75).length || 2} Students`}
          subtext="Exam Eligibility Warning"
          icon={ShieldAlert}
          trend="Critical"
          color="amber"
        />
        <StatCard 
          title="AI Remedial Resolution Rate"
          value="82%"
          subtext="Students recovering within 2 weeks"
          icon={Sparkles}
          trend="+12% Success"
          color="emerald"
        />
      </div>

      {/* At Risk List Table */}
      <div className="glass-card">
        <div className="roster-header mb-16">
          <div>
            <h3>Flagged Student Roster</h3>
            <p className="card-subtext">Students with low attendance or weak concept retention scores</p>
          </div>

          <div className="search-mini">
            <Search size={14} className="search-mini-icon" />
            <input 
              type="text" 
              placeholder="Search name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="roster-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Attendance</th>
                <th>Quiz Score</th>
                <th>Primary Weakness</th>
                <th>Recommended AI Remedial</th>
                <th>Intervention Action</th>
              </tr>
            </thead>
            <tbody>
              {atRiskStudents
                .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(s => (
                  <tr key={s.id}>
                    <td className="font-mono text-muted">{s.id}</td>
                    <td>
                      <div className="student-cell">
                        <img src={s.avatar} alt={s.name} className="mini-avatar" />
                        <span className="font-semibold">{s.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${s.attendance < 75 ? 'badge-rose' : 'badge-emerald'}`}>
                        {s.attendance}%
                      </span>
                    </td>
                    <td>{s.quizScore}%</td>
                    <td className="text-amber">{s.weakSubjects?.[0] || 'Graph Algorithms'}</td>
                    <td className="text-muted">Adaptive Socratic Lesson + Practice Quiz</td>
                    <td>
                      <button 
                        className={`btn btn-sm ${sentRemedials[s.id] ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => handleDispatch(s.id)}
                      >
                        {sentRemedials[s.id] ? (
                          <>
                            <CheckCircle2 size={14} className="text-emerald" />
                            <span>Remedial Dispatched</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Send AI Remedial</span>
                          </>
                        )}
                      </button>
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
        .font-mono { font-family: monospace; }
        .font-semibold { font-weight: 600; color: var(--text-main); }
        .text-amber { color: #f59e0b; font-weight: 600; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr; } }
        .student-cell { display: flex; align-items: center; gap: 8px; }
        .mini-avatar { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; }
      `}</style>
    </div>
  );
}
