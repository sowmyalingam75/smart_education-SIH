import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, trend, color = 'indigo' }) {
  const colorMap = {
    indigo: { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)', text: '#818cf8' },
    emerald: { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)', text: '#34d399' },
    amber: { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', text: '#fbbf24' },
    cyan: { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)', text: '#22d3ee' },
    rose: { bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.3)', text: '#f43f5e' }
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="glass-card stat-card hover-glow">
      <div className="stat-top">
        <div className="stat-icon-box" style={{ background: scheme.bg, border: `1px solid ${scheme.border}`, color: scheme.text }}>
          {Icon && <Icon size={22} />}
        </div>
        {trend && (
          <span className={`trend-tag ${trend.startsWith('+') ? 'up' : 'down'}`}>
            {trend}
          </span>
        )}
      </div>

      <div className="stat-body">
        <span className="stat-title">{title}</span>
        <h3 className="stat-value">{value}</h3>
        {subtext && <span className="stat-subtext">{subtext}</span>}
      </div>

      <style>{`
        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stat-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trend-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-full);
        }

        .trend-tag.up {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .trend-tag.down {
          background: rgba(244, 63, 94, 0.15);
          color: #f43f5e;
          border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .stat-body {
          display: flex;
          flex-direction: column;
        }

        .stat-title {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-main);
          font-family: var(--font-heading);
          margin-top: 2px;
          line-height: 1.1;
        }

        .stat-subtext {
          font-size: 0.75rem;
          color: var(--text-dim);
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}
