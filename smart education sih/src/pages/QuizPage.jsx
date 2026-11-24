import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronRight, CheckCircle2, XCircle, RotateCcw, Trophy, Clock, Zap, BookOpen, BarChart3 } from 'lucide-react';
import { mockQuizzes } from '../data/mockData';

const QUIZ_SUBJECTS = [
  { id: 'q-prob-1', label: 'Probability & Statistics', icon: '📊', color: '#6366f1', desc: '3 questions • 10 mins' },
  { id: 'q-dsa-1', label: 'Data Structures & Algorithms', icon: '🌳', color: '#10b981', desc: '4 questions • 10 mins' },
  { id: 'q-os-1', label: 'Operating Systems', icon: '⚙️', color: '#f59e0b', desc: '3 questions • 8 mins' },
];

const recentHistory = [
  { subject: 'Data Structures', score: 95, total: 4, date: '3h ago', grade: 'A+' },
  { subject: 'Operating Systems', score: 67, total: 3, date: 'Yesterday', grade: 'C+' },
  { subject: 'AI & ML Basics', score: 100, total: 5, date: 'Sep 07', grade: 'A+' },
];

export default function QuizPage({ setCurrentPage, student }) {
  const [phase, setPhase] = useState('select'); // select | playing | result
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplain, setShowExplain] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [timerActive, setTimerActive] = useState(false);

  const quiz = mockQuizzes.find(q => q.id === selectedQuizId);
  const question = quiz?.questions?.[currentQ];

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft <= 0) {
      finishQuiz();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startQuiz = (id) => {
    setSelectedQuizId(id);
    setPhase('playing');
    setCurrentQ(0);
    setSelected(null);
    setShowExplain(false);
    setAnswers([]);
    setTimerActive(true);
    const q = mockQuizzes.find(x => x.id === id);
    setTimeLeft(parseInt(q?.duration) * 60 || 600);
  };

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplain(true);
  };

  const nextQuestion = () => {
    const isCorrect = selected === question.correctAnswer;
    setAnswers(prev => [...prev, { questionId: question.id, selected, isCorrect }]);
    if (currentQ + 1 < quiz.questions.length) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowExplain(false);
    } else {
      finishQuiz(selected === question.correctAnswer);
    }
  };

  const finishQuiz = (lastCorrect = false) => {
    const baseCorrect = answers.filter(a => a.isCorrect).length;
    const total = baseCorrect + (lastCorrect ? 1 : 0);
    setTimerActive(false);
    setPhase('result');
    setAnswers(prev => [...prev]);
  };

  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalQ = quiz?.questions?.length || 0;
  const scorePercent = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;

  const getGrade = (pct) => {
    if (pct >= 90) return { label: 'A+', color: '#10b981' };
    if (pct >= 75) return { label: 'B', color: '#6366f1' };
    if (pct >= 60) return { label: 'C', color: '#f59e0b' };
    return { label: 'F', color: '#f43f5e' };
  };

  const grade = getGrade(scorePercent);
  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  // ── SELECT PHASE ──
  if (phase === 'select') return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <HelpCircle size={28} style={{ color: '#06b6d4' }} />
            Quiz Practice
          </h1>
          <p className="page-subtitle">
            Test your knowledge with interactive subject quizzes and get instant AI feedback.
          </p>
        </div>
      </div>

      <div className="quiz-select-layout">
        <div>
          <h3 className="section-heading">Choose a Subject to Practice</h3>
          <div className="quiz-subjects-grid">
            {QUIZ_SUBJECTS.map(subj => (
              <div key={subj.id} className="glass-card hover-glow quiz-subject-card" onClick={() => startQuiz(subj.id)}>
                <div className="quiz-subj-icon">{subj.icon}</div>
                <div className="quiz-subj-info">
                  <h3 className="quiz-subj-name">{subj.label}</h3>
                  <p className="quiz-subj-meta">{subj.desc}</p>
                </div>
                <div className="quiz-start-arrow">
                  <ChevronRight size={20} style={{ color: subj.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent History */}
        <div>
          <h3 className="section-heading">Recent Quiz Results</h3>
          <div className="glass-card">
            <table className="quiz-history-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentHistory.map((h, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BookOpen size={14} style={{ color: 'var(--text-dim)' }} />
                        {h.subject}
                      </div>
                    </td>
                    <td>
                      <div className="score-display">
                        <div className="score-bar-bg">
                          <div className="score-bar-fill" style={{ width: `${h.score}%` }} />
                        </div>
                        <span>{h.score}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${h.score >= 90 ? 'badge-emerald' : h.score >= 60 ? 'badge-amber' : 'badge-rose'}`}>
                        {h.grade}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{h.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .quiz-select-layout { display: flex; flex-direction: column; gap: 28px; }
        .section-heading { font-size: 1.05rem; font-weight: 700; color: var(--text-muted); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.06em; }
        .quiz-subjects-grid { display: flex; flex-direction: column; gap: 12px; }
        .quiz-subject-card { display: flex; align-items: center; gap: 16px; cursor: pointer; padding: 20px; }
        .quiz-subj-icon { font-size: 2rem; width: 56px; text-align: center; flex-shrink: 0; }
        .quiz-subj-info { flex: 1; }
        .quiz-subj-name { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
        .quiz-subj-meta { font-size: 0.82rem; color: var(--text-muted); }
        .quiz-start-arrow { flex-shrink: 0; }
        .quiz-history-table { width: 100%; border-collapse: collapse; }
        .quiz-history-table th { font-size: 0.76rem; color: var(--text-dim); padding: 8px 12px; text-align: left; text-transform: uppercase; border-bottom: 1px solid var(--border-color); }
        .quiz-history-table td { padding: 12px; font-size: 0.88rem; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .score-display { display: flex; align-items: center; gap: 10px; }
        .score-bar-bg { width: 80px; height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden; }
        .score-bar-fill { height: 100%; background: var(--gradient-primary); border-radius: 99px; }
      `}</style>
    </div>
  );

  // ── PLAYING PHASE ──
  if (phase === 'playing' && question) return (
    <div className="page-wrapper quiz-player-wrap">
      {/* Top Bar */}
      <div className="quiz-top-bar glass-card">
        <div className="quiz-progress-info">
          <span className="q-count">Question {currentQ + 1} of {quiz.questions.length}</span>
          <div className="quiz-progress-bar-bg">
            <div className="quiz-progress-bar-fill" style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }} />
          </div>
        </div>
        <div className="quiz-timer">
          <Clock size={16} style={{ color: timeLeft < 60 ? '#f43f5e' : '#06b6d4' }} />
          <span style={{ color: timeLeft < 60 ? '#f43f5e' : 'var(--text-main)' }}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card question-card">
        <div className="q-subject-tag">
          <Zap size={14} style={{ color: '#fbbf24' }} /> {quiz.subject}
        </div>
        <h2 className="question-text">{question.question}</h2>

        <div className="options-grid">
          {question.options.map((opt, idx) => {
            let cls = 'option-btn';
            if (selected !== null) {
              if (idx === question.correctAnswer) cls += ' correct';
              else if (idx === selected && idx !== question.correctAnswer) cls += ' wrong';
            } else {
              cls += ' hoverable';
            }
            return (
              <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{opt}</span>
                {selected !== null && idx === question.correctAnswer && <CheckCircle2 size={18} color="#10b981" />}
                {selected !== null && idx === selected && idx !== question.correctAnswer && <XCircle size={18} color="#f43f5e" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplain && (
          <div className={`explanation-box ${selected === question.correctAnswer ? 'correct-exp' : 'wrong-exp'}`}>
            <div className="exp-header">
              {selected === question.correctAnswer
                ? <><CheckCircle2 size={16} color="#10b981" /> <strong>Correct!</strong></>
                : <><XCircle size={16} color="#f43f5e" /> <strong>Not quite!</strong></>
              }
            </div>
            <p className="exp-text">{question.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={nextQuestion}>
              {currentQ + 1 < quiz.questions.length ? 'Next Question →' : 'See Results 🏆'}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .quiz-player-wrap { max-width: 680px; }
        .quiz-top-bar { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 14px 20px; margin-bottom: 20px; }
        .quiz-progress-info { flex: 1; }
        .q-count { font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px; }
        .quiz-progress-bar-bg { height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden; }
        .quiz-progress-bar-fill { height: 100%; background: var(--gradient-primary); border-radius: 99px; transition: width 0.4s; }
        .quiz-timer { display: flex; align-items: center; gap: 6px; font-size: 1.1rem; font-weight: 700; font-family: var(--font-heading); }
        .question-card { padding: 28px; }
        .q-subject-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
        .question-text { font-size: 1.25rem; font-weight: 700; line-height: 1.45; margin-bottom: 24px; }
        .options-grid { display: flex; flex-direction: column; gap: 10px; }
        .option-btn {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px; border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: rgba(255,255,255,0.03);
          cursor: pointer; transition: all 0.2s; text-align: left;
          color: var(--text-main);
        }
        .option-btn.hoverable:hover { background: rgba(99,102,241,0.1); border-color: rgba(99,102,241,0.4); }
        .option-btn.correct { background: rgba(16,185,129,0.12); border-color: #10b981; }
        .option-btn.wrong { background: rgba(244,63,94,0.12); border-color: #f43f5e; }
        .option-letter {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.82rem; font-weight: 700; flex-shrink: 0;
        }
        .option-text { flex: 1; font-size: 0.92rem; }
        .explanation-box { margin-top: 20px; padding: 16px; border-radius: var(--radius-sm); }
        .explanation-box.correct-exp { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); }
        .explanation-box.wrong-exp { background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.3); }
        .exp-header { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; margin-bottom: 6px; }
        .exp-text { font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; }
      `}</style>
    </div>
  );

  // ── RESULT PHASE ──
  if (phase === 'result') return (
    <div className="page-wrapper result-wrap">
      <div className="glass-card result-card">
        {/* Trophy */}
        <div className="result-trophy">
          <Trophy size={64} style={{ color: grade.color }} />
        </div>
        <h1 className="result-title">{scorePercent >= 75 ? '🎉 Great Job!' : scorePercent >= 50 ? '💪 Keep Going!' : '📚 Study More!'}</h1>
        <p className="result-subtitle">{quiz?.title}</p>

        {/* Score Circle */}
        <div className="result-score-circle" style={{ borderColor: grade.color }}>
          <span className="result-pct" style={{ color: grade.color }}>{scorePercent}%</span>
          <span className="result-grade-label">Grade: <strong style={{ color: grade.color }}>{grade.label}</strong></span>
        </div>

        {/* Stats Row */}
        <div className="result-stats">
          <div className="res-stat">
            <CheckCircle2 size={20} color="#10b981" />
            <span className="rs-val">{correctCount}</span>
            <span className="rs-label">Correct</span>
          </div>
          <div className="res-stat">
            <XCircle size={20} color="#f43f5e" />
            <span className="rs-val">{totalQ - correctCount}</span>
            <span className="rs-label">Wrong</span>
          </div>
          <div className="res-stat">
            <BarChart3 size={20} color="#6366f1" />
            <span className="rs-val">{totalQ}</span>
            <span className="rs-label">Total</span>
          </div>
        </div>

        {/* AI Feedback */}
        <div className="result-ai-tip">
          <Zap size={14} style={{ color: '#a78bfa' }} />
          <span>
            {scorePercent >= 90 ? 'Outstanding! You have mastered this topic. Try an advanced quiz next!'
              : scorePercent >= 75 ? 'Good performance! Review the questions you missed to reach 90%+.'
              : 'Review the concepts and try again. Use AI Learning Assistant for guided help!'}
          </span>
        </div>

        {/* Actions */}
        <div className="result-actions">
          <button className="btn btn-secondary" onClick={() => setPhase('select')}>
            <RotateCcw size={16} /> Choose Another Quiz
          </button>
          <button className="btn btn-primary" onClick={() => startQuiz(selectedQuizId)}>
            <HelpCircle size={16} /> Retry This Quiz
          </button>
          <button className="btn btn-emerald" onClick={() => setCurrentPage('ai-assistant')}>
            Ask AI for Help
          </button>
        </div>
      </div>

      <style>{`
        .result-wrap { max-width: 500px; }
        .result-card { text-align: center; padding: 40px 32px; }
        .result-trophy { margin-bottom: 16px; animation: pop 0.5s ease; }
        @keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }
        .result-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 4px; }
        .result-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 28px; }
        .result-score-circle {
          width: 130px; height: 130px; border-radius: 50%;
          border: 4px solid; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          margin: 0 auto 28px; background: rgba(255,255,255,0.03);
        }
        .result-pct { font-size: 2rem; font-weight: 800; font-family: var(--font-heading); line-height: 1; }
        .result-grade-label { font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }
        .result-stats { display: flex; justify-content: center; gap: 40px; margin-bottom: 24px; }
        .res-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .rs-val { font-size: 1.6rem; font-weight: 800; font-family: var(--font-heading); }
        .rs-label { font-size: 0.76rem; color: var(--text-muted); }
        .result-ai-tip {
          display: flex; align-items: flex-start; gap: 10px;
          background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25);
          border-radius: var(--radius-sm); padding: 12px 16px; font-size: 0.85rem;
          color: var(--text-muted); margin-bottom: 24px; text-align: left;
        }
        .result-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
      `}</style>
    </div>
  );

  return null;
}
