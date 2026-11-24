import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, RefreshCw, Zap, BookOpen, Brain, HelpCircle, Lightbulb } from 'lucide-react';

const MODES = [
  { id: 'socratic', label: 'Socratic Tutor', icon: Brain, color: '#6366f1', desc: 'Learn through guided questions' },
  { id: 'concept', label: 'Concept Explainer', icon: BookOpen, color: '#10b981', desc: 'Clear, structured explanations' },
  { id: 'problem', label: 'Problem Solver', icon: Zap, color: '#f59e0b', desc: 'Step-by-step solutions' },
  { id: 'quiz', label: 'Quick Quiz', icon: HelpCircle, color: '#06b6d4', desc: 'Test your knowledge instantly' },
];

const PROMPTS = [
  'Explain Decision Trees with an example',
  'What is the difference between Mutex and Semaphore?',
  'How does Gradient Descent work?',
  'Explain BFS vs DFS traversal',
  'What are the 4 Deadlock conditions?',
  'Give me a quiz on Data Structures',
  'Simplify Big-O notation for me',
  'What is Bayes Theorem?',
];

const AI_RESPONSES = {
  default: (q, mode) => {
    if (mode === 'quiz') return generateQuizResponse(q);
    if (mode === 'socratic') return generateSocraticResponse(q);
    return generateExplanationResponse(q);
  },
};

function generateQuizResponse(q) {
  return `🎯 **Quick Quiz: ${q}**\n\n**Q1.** Which data structure uses FIFO order?\n- A) Stack\n- B) Queue ✅\n- C) Tree\n- D) Heap\n\n**Q2.** What is the time complexity of Binary Search?\n- A) O(n)\n- B) O(n log n)\n- C) O(log n) ✅\n- D) O(1)\n\n**Q3.** Which algorithm is used for deadlock avoidance?\n- A) Round Robin\n- B) Banker's Algorithm ✅\n- C) LRU\n- D) FCFS\n\n---\n✅ *Score yourself and type your answers! I'll give you detailed feedback.*`;
}

function generateSocraticResponse(q) {
  return `🤔 **Socratic Method: Let's Think Together**\n\nGreat question about **"${q}"**!\n\nBefore I explain, let me ask you:\n\n1. 🔍 What do you already know about this topic?\n2. 💡 Can you think of a real-world analogy?\n3. 🎯 Where do you think this concept is used?\n\n---\n*Take a moment to think, then share your thoughts. I'll build on your reasoning to help you arrive at the complete understanding yourself!*\n\n**Hint to get started:** Think about everyday decision-making — like how a GPS finds the shortest route 🗺️`;
}

function generateExplanationResponse(q) {
  const topic = q.toLowerCase();
  
  if (topic.includes('decision tree') || topic.includes('decision trees')) {
    return `## 🌳 Decision Trees — Complete Breakdown\n\n**Core Idea:** A Decision Tree is a flowchart-like model that splits data step by step based on feature conditions to make predictions.\n\n---\n\n### 🔑 Key Concepts:\n| Term | Definition |\n|------|------------|\n| **Root Node** | The starting feature (best split) |\n| **Splitting** | Dividing data based on a condition |\n| **Leaf Node** | Final prediction/class label |\n| **Entropy** | Measure of disorder in data |\n| **Information Gain** | Reduction in entropy after split |\n\n### 📐 Entropy Formula:\n\`\`\`\nH(S) = -Σ pᵢ × log₂(pᵢ)\n\`\`\`\n- Low entropy = mostly one class = good split!\n\n### 💻 Python Example:\n\`\`\`python\nfrom sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier(max_depth=3, criterion='entropy')\nmodel.fit(X_train, y_train)\nprint(model.score(X_test, y_test))\n\`\`\`\n\n> 💡 **Smart Tip:** Use Random Forest (ensemble of trees) to prevent overfitting!`;
  }

  if (topic.includes('mutex') || topic.includes('semaphore')) {
    return `## 🔒 Mutex vs Semaphore — Complete Guide\n\n| Feature | Mutex | Semaphore |\n|---------|-------|----------|\n| **Type** | Locking mechanism | Signaling mechanism |\n| **Ownership** | Only locker can unlock | Any thread can signal |\n| **Value** | Binary (0 or 1) | Counting (0 to N) |\n| **Use Case** | Mutual exclusion | Resource pool control |\n| **Analogy** | 🚻 Single-key washroom | 🅿️ Parking lot with N spots |\n\n### When to use what?\n- **Mutex** → When exactly 1 thread needs a resource at a time\n- **Semaphore** → When N threads can access N identical resources\n\n> ⚠️ **Common Interview Trap:** A Mutex has ownership; Semaphore does NOT. Deadlock can occur with mutex if not careful!`;
  }

  if (topic.includes('gradient') || topic.includes('gradient descent')) {
    return `## 📉 Gradient Descent — How ML Models Learn\n\n**Analogy:** Imagine standing on a foggy mountain 🏔️ — you take small steps downhill until you reach the lowest valley (minimum loss).\n\n### 🧮 Update Rule:\n\`\`\`\nθ_new = θ_old - α × ∇L(θ)\n\`\`\`\n- **θ** = model parameters (weights)\n- **α** = learning rate (step size)\n- **∇L(θ)** = gradient (direction of steepest ascent)\n\n### Types:\n| Type | Dataset Used | Speed | Stability |\n|------|-------------|-------|----------|\n| Batch GD | Full dataset | Slow | Stable |\n| Stochastic GD | 1 sample | Fast | Noisy |\n| Mini-batch GD | Small batch | Balanced | Balanced |\n\n### 🎯 Learning Rate Matters!\n- Too high → Overshoots minimum\n- Too low → Very slow convergence\n\n> 💡 Use **Adam optimizer** for adaptive learning rates in deep learning!`;
  }

  if (topic.includes('bfs') || topic.includes('dfs')) {
    return `## 🗺️ BFS vs DFS — Graph Traversal Comparison\n\n| Feature | BFS | DFS |\n|---------|-----|-----|\n| **Full Name** | Breadth-First Search | Depth-First Search |\n| **Data Structure** | Queue (FIFO) | Stack / Recursion |\n| **Traversal** | Level by level | Deep path first |\n| **Shortest Path** | ✅ Yes (unweighted) | ❌ No guarantee |\n| **Memory** | O(V) — more | O(h) — less |\n| **Best For** | Shortest path, social networks | Topological sort, maze solving |\n\n### BFS Algorithm:\n\`\`\`python\nfrom collections import deque\ndef bfs(graph, start):\n    visited, queue = set(), deque([start])\n    while queue:\n        node = queue.popleft()\n        if node not in visited:\n            visited.add(node)\n            queue.extend(graph[node])\n\`\`\`\n\n> 🧠 **Remember:** BFS = Queue (FIFO), DFS = Stack (LIFO)`;
  }

  if (topic.includes('deadlock')) {
    return `## 💀 Deadlock — The 4 Coffman Conditions\n\nA **deadlock** occurs when processes are stuck waiting for each other forever!\n\n### 4 Necessary Conditions (ALL must hold):\n\n| # | Condition | Meaning |\n|---|-----------|--------|\n| 1 | **Mutual Exclusion** | Resource held by only 1 process |\n| 2 | **Hold and Wait** | Process holds resource while waiting for more |\n| 3 | **No Preemption** | Resources can't be forcibly taken away |\n| 4 | **Circular Wait** | P1 waits for P2, P2 waits for P1... |\n\n### Prevention Strategies:\n- **Break Mutual Exclusion** → Make resources sharable (not always possible)\n- **Break Hold & Wait** → Request all resources upfront\n- **Allow Preemption** → OS can forcibly reclaim resources\n- **Break Circular Wait** → Impose resource ordering\n\n> 🏦 **Banker's Algorithm** avoids deadlock by checking if resource allocation leaves system in a "safe state"!`;
  }

  if (topic.includes('big-o') || topic.includes('big o')) {
    return `## ⚡ Big-O Notation — Algorithm Complexity Guide\n\n**Big-O** measures how runtime/space grows as input size N increases.\n\n### Common Complexities (Best to Worst):\n| Big-O | Name | Example |\n|-------|------|--------|\n| O(1) | Constant | Array index access |\n| O(log n) | Logarithmic | Binary Search |\n| O(n) | Linear | Linear Search |\n| O(n log n) | Log-linear | Merge Sort |\n| O(n²) | Quadratic | Bubble Sort |\n| O(2ⁿ) | Exponential | Brute force subsets |\n| O(n!) | Factorial | Traveling Salesman (brute) |\n\n### Quick Rules:\n- Drop constants: O(2n) → O(n)\n- Drop lower terms: O(n² + n) → O(n²)\n- Nested loops = multiply: O(n) × O(n) = O(n²)\n\n> 🎯 In interviews, always state the time AND space complexity!`;
  }

  return `## 🤖 SmartLearn AI Response\n\n**Topic:** "${q}"\n\nGreat question! Here's a structured breakdown:\n\n### 📚 Core Concept:\nThis topic is fundamental to computer science and engineering. Understanding it well requires both theoretical knowledge and practical application.\n\n### 🔑 Key Points to Remember:\n1. Start with the **basic definition** and intuition\n2. Understand the **mathematical foundation**\n3. Practice with **code examples**\n4. Connect it to **real-world applications**\n\n### 💡 Study Tip:\nUse the Feynman Technique — explain this concept as if teaching a 10-year-old. If you can't, you haven't understood it deeply enough yet!\n\n---\n*Want me to dive deeper into any specific aspect? Type a follow-up question or try a specific topic!*`;
}

export default function AIAssistantPage({ setCurrentPage, student }) {
  const [mode, setMode] = useState('concept');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `## 👋 Hi ${student?.name || 'Student'}! I'm SmartLearn AI\n\nI'm your personal AI learning assistant powered by adaptive intelligence.\n\n**What I can do:**\n- 🌳 Explain complex concepts with examples\n- 🤔 Use Socratic method to deepen understanding\n- ⚡ Solve problems step-by-step\n- 🎯 Quiz you to test retention\n\nSelect a **learning mode** above, then ask me anything!`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', content: text, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiContent = generateExplanationResponse(text);
      const aiMsg = { id: Date.now() + 1, role: 'assistant', content: aiContent, time: 'Just now' };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      role: 'assistant',
      content: `## 👋 Chat cleared! Ready for a fresh session.\n\nAsk me anything about your courses, or pick a prompt below!`,
      time: 'Just now'
    }]);
  };

  const currentMode = MODES.find(m => m.id === mode);

  return (
    <div className="page-wrapper ai-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Bot size={28} style={{ color: '#a78bfa' }} />
            AI Learning Assistant
          </h1>
          <p className="page-subtitle">
            Your personalized AI tutor — powered by adaptive learning intelligence.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={clearChat}>
          <RefreshCw size={14} /> New Session
        </button>
      </div>

      {/* Mode Selector */}
      <div className="mode-selector">
        {MODES.map(m => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              className={`mode-btn ${mode === m.id ? 'active' : ''}`}
              onClick={() => setMode(m.id)}
              style={{ '--mode-color': m.color }}
            >
              <Icon size={16} />
              <div className="mode-btn-text">
                <span className="mode-label">{m.label}</span>
                <span className="mode-desc">{m.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat + Prompts Layout */}
      <div className="ai-layout">
        {/* Chat Window */}
        <div className="glass-card chat-window">
          {/* Active Mode Banner */}
          <div className="mode-banner-active">
            <Sparkles size={14} style={{ color: currentMode.color }} />
            <span style={{ color: currentMode.color }}>Mode: <strong>{currentMode.label}</strong></span>
            <span className="mode-banner-desc">— {currentMode.desc}</span>
          </div>

          {/* Messages */}
          <div className="messages-list">
            {messages.map(msg => (
              <div key={msg.id} className={`message-row ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="ai-avatar">
                    <Bot size={16} />
                  </div>
                )}
                <div className="message-bubble">
                  <div
                    className="message-content"
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/^## (.*)/gm, '<h3 class="msg-h2">$1</h3>')
                        .replace(/^### (.*)/gm, '<h4 class="msg-h3">$1</h4>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
                        .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>')
                        .replace(/\|(.+)\|/g, (match) => {
                          const cells = match.split('|').filter(c => c.trim() !== '');
                          return '<div class="table-row">' + cells.map(c => `<span class="table-cell">${c.trim()}</span>`).join('') + '</div>';
                        })
                        .replace(/^> (.*)/gm, '<blockquote class="ai-quote">$1</blockquote>')
                        .replace(/^(\d+\.) (.*)/gm, '<div class="list-item"><strong>$1</strong> $2</div>')
                        .replace(/^- (.*)/gm, '<div class="list-item">• $1</div>')
                        .replace(/\n\n/g, '<br/><br/>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />
                  <div className="msg-time">{msg.time}</div>
                </div>
                {msg.role === 'user' && (
                  <div className="user-avatar-msg">
                    {student?.name?.[0] || 'S'}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="message-row assistant">
                <div className="ai-avatar"><Bot size={16} /></div>
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="chat-input-bar">
            <textarea
              className="chat-input"
              placeholder={`Ask your ${currentMode.label} a question...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Prompt Suggestions Sidebar */}
        <div className="prompts-sidebar">
          <div className="glass-card">
            <h3 className="sidebar-section-title">
              <Lightbulb size={16} style={{ color: '#fbbf24' }} />
              Quick Prompts
            </h3>
            <div className="prompts-list">
              {PROMPTS.map((p, i) => (
                <button
                  key={i}
                  className="prompt-chip"
                  onClick={() => sendMessage(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* AI Stats */}
            <div className="ai-stats-box">
              <h4 className="sidebar-section-title" style={{ marginTop: '20px', marginBottom: '12px' }}>
                <Bot size={16} style={{ color: '#a78bfa' }} />
                Session Stats
              </h4>
              <div className="ai-stat-row">
                <span className="stat-label">Questions Asked</span>
                <span className="stat-val">{messages.filter(m => m.role === 'user').length}</span>
              </div>
              <div className="ai-stat-row">
                <span className="stat-label">AI Responses</span>
                <span className="stat-val">{messages.filter(m => m.role === 'assistant').length}</span>
              </div>
              <div className="ai-stat-row">
                <span className="stat-label">Active Mode</span>
                <span className="stat-val" style={{ color: currentMode.color }}>{currentMode.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-page { max-width: 1300px; }

        .mode-selector {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .mode-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: rgba(255,255,255,0.03);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.25s;
          text-align: left;
        }

        .mode-btn:hover {
          border-color: var(--mode-color);
          background: rgba(255,255,255,0.06);
          color: var(--text-main);
        }

        .mode-btn.active {
          border-color: var(--mode-color);
          background: color-mix(in srgb, var(--mode-color) 15%, transparent);
          color: var(--text-main);
          box-shadow: 0 0 20px color-mix(in srgb, var(--mode-color) 25%, transparent);
        }

        .mode-btn-text { display: flex; flex-direction: column; }
        .mode-label { font-size: 0.88rem; font-weight: 700; line-height: 1.2; }
        .mode-desc { font-size: 0.72rem; color: var(--text-dim); margin-top: 2px; }

        .ai-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          min-height: 60vh;
        }

        .chat-window {
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
          min-height: 560px;
        }

        .mode-banner-active {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.82rem;
        }

        .mode-banner-desc { color: var(--text-muted); }

        .messages-list {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 400px;
          max-height: 500px;
        }

        .message-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .message-row.user { flex-direction: row-reverse; }

        .ai-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(99,102,241,0.4);
        }

        .user-avatar-msg {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .message-bubble {
          max-width: 75%;
          min-width: 100px;
        }

        .message-row.user .message-bubble {
          background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25));
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 18px 4px 18px 18px;
          padding: 12px 16px;
        }

        .message-row.assistant .message-bubble {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-color);
          border-radius: 4px 18px 18px 18px;
          padding: 14px 18px;
        }

        .message-content {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text-main);
        }

        .message-content .msg-h2 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 10px;
          font-family: var(--font-heading);
        }

        .message-content .msg-h3 {
          font-size: 0.92rem;
          font-weight: 700;
          color: #a5b4fc;
          margin: 10px 0 6px;
        }

        .message-content .inline-code {
          background: rgba(99,102,241,0.2);
          color: #c084fc;
          padding: 1px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85em;
        }

        .message-content .code-block {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: monospace;
          font-size: 0.84rem;
          overflow-x: auto;
          margin: 8px 0;
          color: #a5f3fc;
        }

        .message-content .ai-quote {
          border-left: 3px solid #6366f1;
          padding: 8px 14px;
          margin: 8px 0;
          background: rgba(99,102,241,0.1);
          border-radius: 0 8px 8px 0;
          font-size: 0.88rem;
          color: #c7d2fe;
        }

        .message-content .list-item {
          padding: 2px 0;
          font-size: 0.88rem;
        }

        .message-content .table-row {
          display: flex;
          gap: 8px;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.83rem;
        }

        .message-content .table-cell {
          flex: 1;
          color: var(--text-muted);
        }

        .msg-time {
          font-size: 0.68rem;
          color: var(--text-dim);
          margin-top: 6px;
        }

        .typing-indicator {
          display: flex;
          gap: 5px;
          align-items: center;
          padding: 4px 0;
        }

        .typing-indicator span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #6366f1;
          animation: bounce 1.2s infinite;
        }

        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.1); opacity: 1; }
        }

        .chat-input-bar {
          display: flex;
          gap: 10px;
          padding: 16px 20px;
          border-top: 1px solid var(--border-color);
          background: rgba(255,255,255,0.02);
          align-items: flex-end;
        }

        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-main);
          font-size: 0.9rem;
          padding: 10px 16px;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
          font-family: var(--font-body);
          line-height: 1.5;
          max-height: 120px;
        }

        .chat-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(99,102,241,0.15);
        }

        .send-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--gradient-primary);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 4px 15px rgba(99,102,241,0.4);
        }

        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .prompts-sidebar .glass-card { padding: 16px; }

        .sidebar-section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .prompts-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .prompt-chip {
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-size: 0.78rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1.4;
        }

        .prompt-chip:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
          color: var(--text-main);
        }

        .ai-stats-box { border-top: 1px solid var(--border-color); padding-top: 12px; }

        .ai-stat-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 0.82rem;
        }

        .stat-label { color: var(--text-muted); }
        .stat-val { font-weight: 700; color: var(--text-main); }

        @media (max-width: 900px) {
          .mode-selector { grid-template-columns: repeat(2, 1fr); }
          .ai-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
