import React, { useState } from 'react';
import { Bot, Send, Sparkles, Lightbulb, RefreshCw, User } from 'lucide-react';
import { mockAiPrompts, mockAiResponses } from '../data/mockData';

export default function AITutorPage({ student }) {
  const currentStudentName = student?.name || "Student";
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `👋 Hello ${currentStudentName}! I am your SmartLearn AI Tutor.\n\nI can explain complex concepts step-by-step, run Socratic guided questions, or walk you through math proofs and code snippets for Dijkstra, Semaphores, Decision Trees, and Neural Networks.\n\nSelect a quick topic prompt below or type any question!`,
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [teachingMode, setTeachingMode] = useState('Socratic');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = mockAiResponses[query];
      if (!aiText) {
        aiText = `### 💡 Smart AI Answer: ${query}\n\nGreat question ${currentStudentName}! In **${teachingMode} Mode**:\n\n1. **Core Concept Insight**: This topic is vital for your CSE (AIML) curriculum.\n2. **Step-by-Step Breakdown**: Let's decompose the theory into clear modules.\n3. **Practical Application**: You can test this using interactive code blocks.\n\n\`\`\`python\n# SmartLearn AI Concept Verifier\ndef analyze_topic(concept):\n    return f"Mastery verified for {concept}"\n\`\`\`\n\nWould you like me to generate a 3-question quiz on this topic?`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Socratic AI Tutor</span>
            <span className="badge badge-indigo">
              <Sparkles size={12} /> GPT-4o Edu Trained
            </span>
          </h1>
          <p className="page-subtitle">Interactive step-by-step AI academic assistant with code execution and concept check validation.</p>
        </div>
      </div>

      <div className="ai-chat-layout">
        <div className="glass-card chat-card">
          <div className="chat-topbar">
            <div className="mode-selector">
              <span className="mode-label">Teaching Mode:</span>
              {['Socratic', 'Quick Summary', 'Deep Code'].map(mode => (
                <button 
                  key={mode} 
                  className={`mode-btn ${teachingMode === mode ? 'active' : ''}`}
                  onClick={() => setTeachingMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => setMessages([messages[0]])}>
              <RefreshCw size={14} />
              <span>Clear Chat</span>
            </button>
          </div>

          <div className="messages-container">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender}`}>
                <div className="avatar-box">
                  {msg.sender === 'ai' ? <Bot size={18} className="text-primary" /> : <User size={18} />}
                </div>
                <div className="bubble-content">
                  <div className="bubble-sender-name">
                    {msg.sender === 'ai' ? 'SmartLearn AI Assistant' : currentStudentName} • <span className="bubble-time">{msg.time}</span>
                  </div>
                  <div className="bubble-text">
                    <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-wrapper ai">
                <div className="avatar-box"><Bot size={18} className="text-primary" /></div>
                <div className="typing-indicator">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
          </div>

          <div className="prompts-row">
            <span className="prompts-label">Suggested Topics:</span>
            <div className="prompts-scroll">
              {mockAiPrompts.map((prompt, idx) => (
                <button key={idx} className="prompt-chip" onClick={() => handleSend(prompt)}>
                  <Lightbulb size={12} />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          <form className="chat-input-box" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input 
              type="text" 
              placeholder={`Ask anything in ${teachingMode} Mode (e.g. "Explain Bellman-Ford", "Decision Trees entropy")...`}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
            />
            <button type="submit" className="btn btn-primary send-btn">
              <Send size={16} />
              <span>Ask AI</span>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .ai-chat-layout { height: calc(100vh - 180px); display: flex; flex-direction: column; }
        .chat-card { flex: 1; display: flex; flex-direction: column; padding: 0; overflow: hidden; }
        .chat-topbar { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-bottom: 1px solid var(--border-color); background: rgba(255, 255, 255, 0.02); }
        .mode-selector { display: flex; align-items: center; gap: 8px; }
        .mode-label { font-size: 0.8rem; color: var(--text-dim); font-weight: 600; }
        .mode-btn { background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); color: var(--text-muted); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .mode-btn.active { background: var(--gradient-primary); color: white; border-color: transparent; }
        .messages-container { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
        .chat-bubble-wrapper { display: flex; gap: 12px; max-width: 85%; }
        .chat-bubble-wrapper.user { margin-left: auto; flex-direction: row-reverse; }
        .avatar-box { width: 36px; height: 36px; border-radius: 50%; background: rgba(255, 255, 255, 0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bubble-content { display: flex; flex-direction: column; gap: 4px; }
        .bubble-sender-name { font-size: 0.72rem; color: var(--text-dim); font-weight: 600; }
        .bubble-time { font-weight: 400; }
        .bubble-text { padding: 14px 18px; border-radius: var(--radius-md); font-size: 0.9rem; line-height: 1.5; }
        .chat-bubble-wrapper.ai .bubble-text { background: rgba(26, 37, 60, 0.9); border: 1px solid var(--border-color); color: var(--text-main); }
        .chat-bubble-wrapper.user .bubble-text { background: var(--gradient-primary); color: white; }
        .typing-indicator { display: flex; align-items: center; gap: 4px; padding: 12px 18px; background: rgba(26, 37, 60, 0.9); border-radius: var(--radius-md); }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); animation: bounce 1.2s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        .prompts-row { display: flex; align-items: center; gap: 10px; padding: 10px 20px; border-top: 1px solid var(--border-color); background: rgba(255, 255, 255, 0.01); }
        .prompts-label { font-size: 0.75rem; color: var(--text-dim); font-weight: 700; white-space: nowrap; }
        .prompts-scroll { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
        .prompt-chip { display: flex; align-items: center; gap: 6px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); color: #a5b4fc; padding: 5px 10px; border-radius: var(--radius-full); font-size: 0.75rem; white-space: nowrap; cursor: pointer; transition: all 0.2s; }
        .prompt-chip:hover { background: rgba(99, 102, 241, 0.25); color: white; }
        .chat-input-box { display: flex; gap: 12px; padding: 14px 20px; border-top: 1px solid var(--border-color); background: rgba(13, 19, 32, 0.9); }
        .chat-input-box input { flex: 1; padding: 12px 18px; border-radius: var(--radius-full); background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); color: var(--text-main); font-size: 0.9rem; outline: none; }
        .chat-input-box input:focus { border-color: var(--primary); }
      `}</style>
    </div>
  );
}
