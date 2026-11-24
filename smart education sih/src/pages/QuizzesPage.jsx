import React, { useState } from 'react';
import { HelpCircle, Clock, CheckCircle2, XCircle, Award, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import { mockQuizzes } from '../data/mockData';

export default function QuizzesPage({ setCurrentPage }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null); // null means quiz selection view
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQIndex(0);
    setUserAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (optionIndex) => {
    if (userAnswers[currentQIndex] !== undefined) return; // Answered
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: optionIndex }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQIndex < selectedQuiz.questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Adaptive Quiz Engine</span>
            <span className="badge badge-emerald">Real-Time Evaluation</span>
          </h1>
          <p className="page-subtitle">Test your retention with instant explanation feedback and dynamic AI scoring.</p>
        </div>
      </div>

      {/* View 1: Quiz Selection Gallery */}
      {!selectedQuiz && (
        <div className="quizzes-gallery grid-2">
          {mockQuizzes.map(quiz => (
            <div key={quiz.id} className="glass-card quiz-select-card hover-glow">
              <div className="quiz-select-header">
                <span className="badge badge-indigo">{quiz.subject}</span>
                <span className="est-time">
                  <Clock size={14} />
                  <span>{quiz.duration}</span>
                </span>
              </div>

              <h3 className="quiz-select-title">{quiz.title}</h3>
              <p className="quiz-select-sub">{quiz.totalQuestions} Multiple-Choice Conceptual Questions</p>

              <div className="quiz-select-footer">
                <span className="badge badge-cyan">Adaptive AI Difficulty</span>
                <button className="btn btn-primary" onClick={() => startQuiz(quiz)}>
                  <span>Start Quiz</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Active Quiz Runner */}
      {selectedQuiz && !quizFinished && (
        <div className="quiz-runner glass-card">
          {/* Quiz Header Bar */}
          <div className="quiz-bar">
            <div>
              <span className="quiz-subj-badge">{selectedQuiz.subject}</span>
              <h3 className="quiz-runner-title">{selectedQuiz.title}</h3>
            </div>
            <div className="quiz-timer-pill">
              <Clock size={16} className="text-amber" />
              <span>Time Left: 08:45</span>
            </div>
          </div>

          {/* Question Counter */}
          <div className="q-progress-bar-box">
            <span className="q-count-text">Question {currentQIndex + 1} of {selectedQuiz.questions.length}</span>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill"
                style={{ width: `${((currentQIndex + 1) / selectedQuiz.questions.length) * 100}%`, background: 'var(--gradient-primary)' }}
              />
            </div>
          </div>

          {/* Current Question */}
          {(() => {
            const q = selectedQuiz.questions[currentQIndex];
            const selectedOpt = userAnswers[currentQIndex];

            return (
              <div className="question-content">
                <h4 className="q-text">{q.id}. {q.question}</h4>

                {/* Options List */}
                <div className="options-list">
                  {q.options.map((opt, optIdx) => {
                    let optStyle = 'default';
                    if (selectedOpt !== undefined) {
                      if (optIdx === q.correctAnswer) optStyle = 'correct';
                      else if (selectedOpt === optIdx) optStyle = 'wrong';
                      else optStyle = 'disabled';
                    }

                    return (
                      <button
                        key={optIdx}
                        className={`option-btn ${optStyle}`}
                        onClick={() => handleAnswerSelect(optIdx)}
                      >
                        <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                        <span className="opt-text">{opt}</span>
                        {optStyle === 'correct' && <CheckCircle2 size={18} className="opt-icon text-emerald" />}
                        {optStyle === 'wrong' && <XCircle size={18} className="opt-icon text-rose" />}
                      </button>
                    );
                  })}
                </div>

                {/* Immediate Explanation Banner */}
                {showExplanation && (
                  <div className={`explanation-box ${selectedOpt === q.correctAnswer ? 'success' : 'alert'}`}>
                    <div className="exp-title">
                      {selectedOpt === q.correctAnswer ? (
                        <>
                          <CheckCircle2 size={18} className="text-emerald" />
                          <span>Correct Answer!</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={18} className="text-rose" />
                          <span>Incorrect Answer</span>
                        </>
                      )}
                    </div>
                    <p className="exp-text">{q.explanation}</p>
                  </div>
                )}

                {/* Footer Next Button */}
                {selectedOpt !== undefined && (
                  <div className="q-footer mt-20">
                    <button className="btn btn-primary btn-lg" onClick={handleNextQuestion}>
                      <span>{currentQIndex < selectedQuiz.questions.length - 1 ? 'Next Question' : 'Complete & View Results'}</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* View 3: Quiz Score Results Card */}
      {quizFinished && selectedQuiz && (
        <div className="quiz-result-card glass-card">
          <div className="result-header">
            <Award size={48} className="result-trophy" />
            <h2>Quiz Completed!</h2>
            <p className="result-sub">SmartLearn AI Score Analysis</p>
          </div>

          <div className="score-circle-display">
            <span className="score-big">{calculateScore()} / {selectedQuiz.questions.length}</span>
            <span className="score-pct">{Math.round((calculateScore() / selectedQuiz.questions.length) * 100)}% Mastery Score</span>
          </div>

          <div className="result-actions">
            <button className="btn btn-secondary" onClick={() => setSelectedQuiz(null)}>
              <RotateCcw size={16} />
              <span>Back to Quiz List</span>
            </button>
            <button className="btn btn-primary" onClick={() => setCurrentPage('ai-tutor')}>
              <Sparkles size={16} />
              <span>Ask AI Tutor to Explain Weak Points</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .mb-20 { margin-bottom: 20px; }
        .mt-20 { margin-top: 20px; }
        .text-emerald { color: #34d399; }
        .text-rose { color: #f43f5e; }
        .text-amber { color: #f59e0b; }

        .quiz-select-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .quiz-select-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .quiz-select-title {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .quiz-select-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .quiz-select-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        .quiz-runner {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .quiz-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .quiz-subj-badge {
          font-size: 0.75rem;
          color: #818cf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .quiz-runner-title {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .quiz-timer-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          color: #fbbf24;
        }

        .q-progress-bar-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .q-count-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .q-text {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .option-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          font-size: 0.92rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        .option-btn:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: var(--border-glow);
        }

        .opt-letter {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.82rem;
          flex-shrink: 0;
        }

        .opt-text { flex: 1; }

        .option-btn.correct {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.5);
        }

        .option-btn.wrong {
          background: rgba(244, 63, 94, 0.15);
          border-color: rgba(244, 63, 94, 0.5);
        }

        .explanation-box {
          margin-top: 18px;
          padding: 16px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .explanation-box.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .explanation-box.alert {
          background: rgba(244, 63, 94, 0.1);
          border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .exp-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .exp-text {
          font-size: 0.88rem;
          color: var(--text-main);
          line-height: 1.5;
        }

        .quiz-result-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
          gap: 24px;
          max-width: 600px;
          margin: 0 auto;
        }

        .result-trophy {
          color: #fbbf24;
        }

        .result-header h2 {
          font-size: 1.8rem;
          font-weight: 800;
        }

        .score-circle-display {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: rgba(99, 102, 241, 0.15);
          border: 2px solid var(--primary);
          padding: 24px 40px;
          border-radius: var(--radius-lg);
        }

        .score-big {
          font-size: 2.5rem;
          font-weight: 900;
          color: white;
          font-family: var(--font-heading);
        }

        .score-pct {
          font-size: 0.9rem;
          color: #a5b4fc;
          font-weight: 700;
        }

        .result-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
