import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOMAINS, ACTIVITIES } from '../data/curriculum';
import { getDailySuggestion } from '../utils/adaptive';

const AGE_LABELS = { 0: 'All Ages', 3: 'Age 3 (Easy)', 4: 'Age 4 (Medium)', 5: 'Age 5 (Hard)' };
const AGE_DIFFICULTY = { 3: 1, 4: 2, 5: 3 };

export default function Home({ progress, getCompletionPercent }) {
  const navigate = useNavigate();
  const [ageFilter, setAgeFilter] = useState(0);
  const name = progress.childName || 'Friend';

  // Filter activities by age/difficulty
  const filteredActivities = {};
  for (const [domainId, acts] of Object.entries(ACTIVITIES)) {
    filteredActivities[domainId] = ageFilter === 0
      ? acts
      : acts.filter((a) => a.difficulty === AGE_DIFFICULTY[ageFilter]);
  }

  const suggestion = getDailySuggestion(progress.completed, filteredActivities);

  const totalActivities = Object.values(filteredActivities).reduce((s, a) => s + a.length, 0);
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

      {/* Age Filter */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        {Object.entries(AGE_LABELS).map(([age, label]) => (
          <button
            key={age}
            className={`btn ${ageFilter === Number(age) ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 18px', fontSize: '0.95rem' }}
            onClick={() => setAgeFilter(Number(age))}
          >
            {label}
          </button>
        ))}
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
          const activities = filteredActivities[domain.id] || [];
          if (activities.length === 0) return null;
          const pct = getCompletionPercent(domain.id, activities);
          return (
            <div
              key={domain.id}
              className="domain-card"
              style={{ borderColor: domain.color }}
              onClick={() => navigate(`/domain/${domain.id}${ageFilter ? `?age=${ageFilter}` : ''}`)}
            >
              <div className="domain-card-icon">{domain.icon}</div>
              <div className="domain-card-title">{domain.title}</div>
              <div className="domain-card-desc">{domain.description}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                {activities.length} activities
              </div>
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
