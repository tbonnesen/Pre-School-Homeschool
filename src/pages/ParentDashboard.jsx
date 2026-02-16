import { DOMAINS, ACTIVITIES } from '../data/curriculum';
import { getEarnedBadges, BADGES } from '../data/achievements';
import { getRecommendedDifficulty } from '../utils/adaptive';

const DIFFICULTY_LABELS = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

export default function ParentDashboard({ progress, getCompletionPercent, onNavigate, profiles, activeProfileId, setActiveProfile }) {
  const profileEntries = Object.entries(profiles || {});
  const earned = getEarnedBadges(progress);
  const earnedIds = new Set(earned.map((b) => b.id));

  const totalActivities = Object.values(ACTIVITIES).reduce((s, a) => s + a.length, 0);
  const totalCompleted = Object.values(progress.completed || {}).reduce(
    (s, d) => s + Object.keys(d).length, 0
  );

  const recentLog = (progress.activityLog || []).slice(0, 10);

  // Find strengths and weaknesses
  const domainStats = Object.values(DOMAINS).map((d) => ({
    ...d,
    pct: getCompletionPercent(d.id, ACTIVITIES[d.id] || []),
    recommended: getRecommendedDifficulty(progress.childAge, progress.scores, d.id),
  }));
  const sorted = [...domainStats].sort((a, b) => b.pct - a.pct);
  const strengths = sorted.filter((d) => d.pct > 0).slice(0, 2);
  const focus = [...sorted].reverse().slice(0, 2);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 className="page-title">Parent Dashboard</h1>
        <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => onNavigate('settings')}>
          Settings
        </button>
      </div>

      {profileEntries.length > 1 && (
        <div className="profile-switcher" style={{ marginBottom: 20 }}>
          {profileEntries.map(([id, p]) => (
            <button
              key={id}
              className={`profile-avatar${id === activeProfileId ? ' active' : ''}`}
              onClick={() => setActiveProfile(id)}
            >
              <span className="profile-avatar-emoji">{p.avatar || '🧒'}</span>
              <span className="profile-name">{p.childName || 'Friend'}</span>
            </button>
          ))}
        </div>
      )}

      <div className="dashboard-grid">
        {/* Overview */}
        <div className="dashboard-card">
          <h3>Overview</h3>
          <div className="stat-number">{totalCompleted}</div>
          <div className="stat-label">of {totalActivities} activities completed</div>
          <div style={{ marginTop: 12 }}>
            <div className="stat-label">🔥 {progress.streak || 0} day streak</div>
          </div>
        </div>

        {/* Domain Progress */}
        <div className="dashboard-card">
          <h3>Progress by Subject</h3>
          {domainStats.map((d) => (
            <div key={d.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: 4 }}>
                <span>{d.icon} {d.title}</span>
                <span>{d.pct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${d.pct}%`, background: d.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths & Focus */}
        <div className="dashboard-card">
          <h3>Insights</h3>
          {strengths.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Strengths</div>
              {strengths.map((d) => (
                <div key={d.id} style={{ fontSize: '0.9rem', marginBottom: 4 }}>
                  {d.icon} {d.title} ({d.pct}%) - Level: {DIFFICULTY_LABELS[d.recommended]}
                </div>
              ))}
            </div>
          )}
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Areas to Focus</div>
            {focus.map((d) => (
              <div key={d.id} style={{ fontSize: '0.9rem', marginBottom: 4 }}>
                {d.icon} {d.title} ({d.pct}%)
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card">
          <h3>Recent Activity</h3>
          {recentLog.length === 0 && (
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>No activities completed yet.</p>
          )}
          <ul className="log-list">
            {recentLog.map((log, i) => {
              const domain = DOMAINS[log.domainId];
              return (
                <li key={i} className="log-item">
                  <span>{domain?.icon} {log.activityId.replace(/-/g, ' ')}</span>
                  <span>{'★'.repeat(log.stars)}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Badges */}
        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h3>Badges & Achievements</h3>
          <div className="badge-grid">
            {Object.values(BADGES).flat().map((badge) => (
              <div key={badge.id} className={`badge-item ${earnedIds.has(badge.id) ? '' : 'locked'}`}>
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-title">{badge.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
