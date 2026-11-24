import React from 'react';

// 1. Radar Chart Component for Subject Mastery
export function RadarChart({ data }) {
  const chartData = data || [
    { subject: 'DSA', score: 88 },
    { subject: 'AIML', score: 74 },
    { subject: 'Web', score: 95 },
    { subject: 'OS', score: 64 }
  ];

  const size = 280;
  const center = size / 2;
  const radius = 90;
  const total = chartData.length;

  const points = chartData.map((d, index) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (d.score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, label: d.subject, score: d.score };
  });

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="radar-chart-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {[0.25, 0.5, 0.75, 1].map((level, i) => {
          const webPoints = chartData.map((_, index) => {
            const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
            const r = level * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon 
              key={i} 
              points={webPoints} 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.08)" 
              strokeWidth="1" 
            />
          );
        })}

        {points.map((p, index) => {
          const outerX = center + radius * Math.cos(p.angle);
          const outerY = center + radius * Math.sin(p.angle);
          return (
            <line 
              key={index} 
              x1={center} 
              y1={center} 
              x2={outerX} 
              y2={outerY} 
              stroke="rgba(255, 255, 255, 0.1)" 
              strokeWidth="1" 
            />
          );
        })}

        <polygon 
          points={polygonPoints} 
          fill="rgba(99, 102, 241, 0.35)" 
          stroke="#6366f1" 
          strokeWidth="2.5" 
        />

        {points.map((p, index) => (
          <circle 
            key={index} 
            cx={p.x} 
            cy={p.y} 
            r="4.5" 
            fill="#818cf8" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
          />
        ))}

        {points.map((p, index) => {
          const labelX = center + (radius + 26) * Math.cos(p.angle);
          const labelY = center + (radius + 18) * Math.sin(p.angle);
          return (
            <text 
              key={index} 
              x={labelX} 
              y={labelY} 
              fill="#cbd5e1" 
              fontSize="10" 
              fontWeight="600"
              textAnchor="middle" 
              dominantBaseline="middle"
            >
              {p.label} ({p.score}%)
            </text>
          );
        })}
      </svg>
      <style>{`
        .radar-chart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6px;
        }
      `}</style>
    </div>
  );
}

// 2. Bar Chart for Weekly Study Hours
export function WeeklyStudyBarChart() {
  const days = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.8 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 3.0 },
    { day: 'Fri', hours: 4.8 },
    { day: 'Sat', hours: 5.5 },
    { day: 'Sun', hours: 3.2 }
  ];

  const maxHours = 6;

  return (
    <div className="bar-chart-wrapper">
      <div className="bars-container">
        {days.map((item, i) => {
          const heightPercent = (item.hours / maxHours) * 100;
          return (
            <div key={i} className="bar-column">
              <span className="bar-val">{item.hours}h</span>
              <div className="bar-track">
                <div 
                  className="bar-fill" 
                  style={{ 
                    height: `${heightPercent}%`,
                    background: i === 4 || i === 5 ? 'var(--gradient-emerald)' : 'var(--gradient-primary)'
                  }} 
                />
              </div>
              <span className="bar-day">{item.day}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        .bar-chart-wrapper {
          width: 100%;
          padding-top: 10px;
        }
        .bars-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 160px;
          gap: 12px;
        }
        .bar-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          height: 100%;
        }
        .bar-val {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .bar-track {
          width: 100%;
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .bar-fill {
          width: 100%;
          border-radius: 8px;
          transition: height 0.6s ease;
        }
        .bar-day {
          font-size: 0.75rem;
          color: var(--text-dim);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

// 3. Activity Heatmap Calendar
export function ActivityHeatmap() {
  const weeks = [
    [2, 3, 4, 1, 4, 3, 2],
    [3, 4, 4, 4, 2, 4, 3],
    [1, 2, 3, 4, 4, 3, 4],
    [4, 4, 3, 2, 4, 4, 4]
  ];

  const getColor = (level) => {
    switch (level) {
      case 1: return 'rgba(99, 102, 241, 0.2)';
      case 2: return 'rgba(99, 102, 241, 0.45)';
      case 3: return 'rgba(99, 102, 241, 0.75)';
      case 4: return '#6366f1';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };

  return (
    <div className="heatmap-container">
      <div className="heatmap-grid">
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="heatmap-week">
            {week.map((level, dIndex) => (
              <div 
                key={dIndex} 
                className="heatmap-cell"
                style={{ background: getColor(level) }}
                title={`Day ${wIndex * 7 + dIndex + 1}: ${level * 1.2} hours logged`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-cells">
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} className="heatmap-cell" style={{ background: getColor(l) }} />
          ))}
        </div>
        <span>More</span>
      </div>
      <style>{`
        .heatmap-container { display: flex; flex-direction: column; gap: 12px; }
        .heatmap-grid { display: flex; gap: 8px; }
        .heatmap-week { display: flex; flex-direction: column; gap: 8px; }
        .heatmap-cell { width: 22px; height: 22px; border-radius: 6px; transition: transform 0.2s; cursor: pointer; }
        .heatmap-cell:hover { transform: scale(1.2); box-shadow: 0 0 10px rgba(99, 102, 241, 0.6); }
        .heatmap-legend { display: flex; align-items: center; gap: 8px; font-size: 0.72rem; color: var(--text-dim); }
        .legend-cells { display: flex; gap: 4px; }
      `}</style>
    </div>
  );
}

// 4. Area Chart Component for Learning Progress
export function AreaChartComponent() {
  const points = [
    { label: 'Week 1', val: 65 },
    { label: 'Week 2', val: 72 },
    { label: 'Week 3', val: 78 },
    { label: 'Week 4', val: 84 },
    { label: 'Week 5', val: 91 }
  ];

  return (
    <div className="area-chart-box">
      <svg width="100%" height="160" viewBox="0 0 400 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.06)" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.06)" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.06)" />

        {/* Filled Area */}
        <polygon 
          points="0,140 0,96 100,82 200,68 300,52 400,34 400,140" 
          fill="url(#areaGradient)" 
        />

        {/* Trend Line */}
        <polyline 
          points="0,96 100,82 200,68 300,52 400,34" 
          fill="none" 
          stroke="#818cf8" 
          strokeWidth="3" 
        />

        {/* Data Circles */}
        <circle cx="0" cy="96" r="4" fill="#6366f1" />
        <circle cx="100" cy="82" r="4" fill="#6366f1" />
        <circle cx="200" cy="68" r="4" fill="#6366f1" />
        <circle cx="300" cy="52" r="4" fill="#6366f1" />
        <circle cx="400" cy="34" r="5" fill="#34d399" stroke="#ffffff" strokeWidth="2" />
      </svg>
      <div className="area-labels">
        {points.map((p, idx) => (
          <span key={idx}>{p.label} ({p.val}%)</span>
        ))}
      </div>
      <style>{`
        .area-chart-box { width: 100%; display: flex; flex-direction: column; gap: 8px; }
        .area-labels { display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-dim); }
      `}</style>
    </div>
  );
}

// 5. Bar Chart Component for Class Performance Overview
export function BarChartComponent() {
  const subjects = [
    { name: 'Data Structures', score: 82, color: '#10b981' },
    { name: 'AI & ML', score: 75, color: '#6366f1' },
    { name: 'Web Arch', score: 89, color: '#06b6d4' },
    { name: 'Operating Sys', score: 67, color: '#f59e0b' }
  ];

  return (
    <div className="class-bar-box">
      <div className="class-bars">
        {subjects.map((sub, idx) => (
          <div key={idx} className="class-bar-col">
            <span className="c-bar-score">{sub.score}%</span>
            <div className="c-bar-track">
              <div 
                className="c-bar-fill" 
                style={{ height: `${sub.score}%`, background: sub.color }} 
              />
            </div>
            <span className="c-bar-name">{sub.name}</span>
          </div>
        ))}
      </div>
      <style>{`
        .class-bar-box { width: 100%; padding-top: 10px; }
        .class-bars { display: flex; align-items: flex-end; justify-content: space-around; height: 160px; gap: 12px; }
        .class-bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; }
        .c-bar-score { font-size: 0.75rem; font-weight: 700; color: var(--text-main); }
        .c-bar-track { width: 100%; flex: 1; background: rgba(255, 255, 255, 0.05); border-radius: 6px; display: flex; align-items: flex-end; overflow: hidden; }
        .c-bar-fill { width: 100%; border-radius: 6px; transition: height 0.6s ease; }
        .c-bar-name { font-size: 0.72rem; color: var(--text-muted); text-align: center; }
      `}</style>
    </div>
  );
}
