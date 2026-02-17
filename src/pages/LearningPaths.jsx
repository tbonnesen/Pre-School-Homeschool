import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEARNING_PATHS, getWeekProgress, getPathProgress, getCurrentWeek } from '../data/learningPaths';

const DOMAIN_ICONS = {
  letters: '📖',
  math: '🔢',
  science: '🔬',
  social: '🤝',
  motor: '✏️',
  arts: '🎨',
};

const DOMAIN_COLORS = {
  letters: '#FF6B6B',
  math: '#4ECDC4',
  science: '#45B7D1',
  social: '#96CEB4',
  motor: '#FFEAA7',
  arts: '#DDA0DD',
};

const AGE_EMOJI = { age3: '🌱', age4: '🌿', age5: '🌳' };

export default function LearningPaths({ progress }) {
  const navigate = useNavigate();
  const completed = progress?.completed || {};

  // Determine default age track from child's age setting
  const childAge = progress?.childAge;
  const defaultTrack = childAge >= 5 ? 'age5' : childAge >= 4 ? 'age4' : 'age3';

  const [activeTrack, setActiveTrack] = useState(defaultTrack);
  const [expandedWeek, setExpandedWeek] = useState(null);

  const path = LEARNING_PATHS[activeTrack];
  const pathProgress = getPathProgress(path, completed);
  const currentWeekIdx = getCurrentWeek(path, completed);

  // Auto-expand current week on first render / track change
  const displayExpanded = expandedWeek ?? currentWeekIdx;

  const handleTrackChange = (track) => {
    setActiveTrack(track);
    setExpandedWeek(null);
  };

  const handleActivityClick = (domain, actId) => {
    navigate(`/domain/${domain}/activity/${actId}`);
  };

  return (
    <div className="paths-page">
      {/* Header */}
      <div className="paths-header">
        <h1>📅 Learning Paths</h1>
        <p className="paths-subtitle">26 weeks of guided activities covering all subjects</p>
        <div className="paths-overall-progress">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${pathProgress.percent}%`, background: 'var(--green)' }}
            />
          </div>
          <span className="paths-progress-label">
            {pathProgress.done} / {pathProgress.total} activities complete ({pathProgress.percent}%)
          </span>
        </div>
      </div>

      {/* Age track selector */}
      <div className="paths-track-selector">
        {Object.entries(LEARNING_PATHS).map(([key, p]) => {
          const pp = getPathProgress(p, completed);
          return (
            <button
              key={key}
              className={`paths-track-btn${activeTrack === key ? ' active' : ''}`}
              onClick={() => handleTrackChange(key)}
            >
              <span className="paths-track-emoji">{AGE_EMOJI[key]}</span>
              <span className="paths-track-label">{p.label}</span>
              <span className="paths-track-pct">{pp.percent}%</span>
            </button>
          );
        })}
      </div>

      {/* Week list */}
      <div className="paths-week-list">
        {path.weeks.map((week, idx) => {
          const wp = getWeekProgress(path, idx, completed);
          const isComplete = wp.done === wp.total && wp.total > 0;
          const isCurrent = idx === currentWeekIdx && !isComplete;
          const isExpanded = displayExpanded === idx;
          const pct = wp.total > 0 ? Math.round(wp.done / wp.total * 100) : 0;

          return (
            <div
              key={idx}
              className={`paths-week${isExpanded ? ' expanded' : ''}${isCurrent ? ' current' : ''}${isComplete ? ' complete' : ''}`}
            >
              <button
                className="paths-week-header"
                onClick={() => setExpandedWeek(isExpanded ? null : idx)}
                aria-expanded={isExpanded}
              >
                <span className="paths-week-num">
                  {isComplete ? '✅' : isCurrent ? '▶️' : `W${week.week}`}
                </span>
                <div className="paths-week-info">
                  <span className="paths-week-title">
                    Week {week.week}: {week.theme}
                  </span>
                  <div className="paths-week-bar">
                    <div className="progress-bar" style={{ height: 6 }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: isComplete ? 'var(--green)' : isCurrent ? 'var(--blue)' : 'var(--text-light)',
                        }}
                      />
                    </div>
                    <span className="paths-week-pct">{wp.done}/{wp.total}</span>
                  </div>
                </div>
                <span className="paths-week-chevron">{isExpanded ? '▲' : '▼'}</span>
              </button>

              {isExpanded && (
                <div className="paths-week-body">
                  {Object.entries(week.activities).map(([domain, acts]) => (
                    acts.length > 0 && (
                      <div key={domain} className="paths-domain-group">
                        <div className="paths-domain-label" style={{ color: DOMAIN_COLORS[domain] }}>
                          {DOMAIN_ICONS[domain]} {domain.charAt(0).toUpperCase() + domain.slice(1)}
                        </div>
                        <div className="paths-activity-list">
                          {acts.map((act) => {
                            const done = !!completed[domain]?.[act.id];
                            return (
                              <button
                                key={act.id}
                                className={`paths-activity-item${done ? ' done' : ''}`}
                                onClick={() => handleActivityClick(domain, act.id)}
                              >
                                <span className="paths-activity-check">{done ? '✅' : '⬜'}</span>
                                <span className="paths-activity-title">{act.title}</span>
                                <span className="paths-activity-type">{act.type}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
