import { useNavigate } from 'react-router-dom';
import { DOMAINS, ACTIVITIES } from '../data/curriculum';
import { getDailySuggestion } from '../utils/adaptive';

export default function Home({ progress, getCompletionPercent }) {
  const navigate = useNavigate();
  const suggestion = getDailySuggestion(progress.completed, ACTIVITIES);
  const name = progress.childName || 'Friend';

  const totalActivities = Object.values(ACTIVITIES).reduce((s, a) => s + a.length, 0);
  const totalCompleted = Object.values(progress.completed || {}).reduce(
    (s, d) => s + Object.keys(d).length, 0
  );

  return (
    <>
      <div className="welcome-section">
        <h1>Hi, {name}!</h1>
        <p className="greeting">Ready to learn something fun today?</p>
        <div className="progress-ring-container">
          <span style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
            {totalCompleted} / {totalActivities} activities completed
          </span>
          {progress.streak > 0 && (
            <span style={{ fontSize: '0.95rem' }}>
              🔥 {progress.streak} day streak!
            </span>
          )}
        </div>
      </div>

      {suggestion && (
        <div
          className="daily-suggestion"
          onClick={() => navigate(`/domain/${suggestion.domainId}/activity/${suggestion.activity.id}`)}
        >
          <h3>Today&apos;s Adventure!</h3>
          <p>{DOMAINS[suggestion.domainId].icon} {suggestion.activity.title}</p>
        </div>
      )}

      <div className="domain-grid">
        {Object.values(DOMAINS).map((domain) => {
          const activities = ACTIVITIES[domain.id] || [];
          const pct = getCompletionPercent(domain.id, activities);
          return (
            <div
              key={domain.id}
              className="domain-card"
              style={{ borderColor: domain.color }}
              onClick={() => navigate(`/domain/${domain.id}`)}
            >
              <div className="domain-card-icon">{domain.icon}</div>
              <div className="domain-card-title">{domain.title}</div>
              <div className="domain-card-desc">{domain.description}</div>
              <div className="domain-card-progress">
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${pct}%`, background: domain.color }}
                  />
                </div>
                <div className="progress-label">{pct}% complete</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
