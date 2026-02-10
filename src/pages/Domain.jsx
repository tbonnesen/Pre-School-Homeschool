import { useNavigate, useParams } from 'react-router-dom';
import { DOMAINS, ACTIVITIES } from '../data/curriculum';
import { getRecommendedDifficulty } from '../utils/adaptive';

const DIFFICULTY_LABELS = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
const DIFFICULTY_COLORS = { 1: '#82E0AA', 2: '#F7DC6F', 3: '#F1948A' };
const TYPE_LABELS = {
  multipleChoice: 'Quiz',
  flashcard: 'Flashcards',
  counting: 'Counting',
  tracing: 'Tracing',
  dragDrop: 'Match & Sort',
};

export default function Domain({ progress }) {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const domain = DOMAINS[domainId];
  const activities = ACTIVITIES[domainId] || [];
  const recommended = getRecommendedDifficulty(progress.childAge, progress.scores, domainId);

  if (!domain) {
    return <p>Domain not found.</p>;
  }

  const renderStars = (activityId) => {
    const data = progress.completed?.[domainId]?.[activityId];
    if (!data) return <span style={{ color: '#DDD' }}>☆☆☆</span>;
    return '★'.repeat(data.stars) + '☆'.repeat(3 - data.stars);
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <h1 className="page-title" style={{ color: domain.color }}>
        {domain.icon} {domain.title}
      </h1>
      <p className="page-subtitle">{domain.description}</p>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: 20 }}>
        Recommended level: <strong>{DIFFICULTY_LABELS[recommended]}</strong>
      </p>

      <div className="activity-list">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="activity-card"
            onClick={() => navigate(`/domain/${domainId}/activity/${activity.id}`)}
          >
            <div className="activity-card-left">
              <div className="activity-card-title">{activity.title}</div>
              <div className="activity-card-meta">
                <span
                  className="difficulty-dot"
                  style={{ background: DIFFICULTY_COLORS[activity.difficulty] }}
                />
                {DIFFICULTY_LABELS[activity.difficulty]} · {TYPE_LABELS[activity.type]}
              </div>
            </div>
            <div className="activity-card-stars">{renderStars(activity.id)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
