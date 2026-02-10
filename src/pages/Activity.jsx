import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DOMAINS, getActivityById } from '../data/curriculum';
import { calculateStars } from '../utils/adaptive';
import MultipleChoice from '../activities/MultipleChoice';
import Flashcard from '../activities/Flashcard';
import Counting from '../activities/Counting';
import Tracing from '../activities/Tracing';
import DragDrop from '../activities/DragDrop';

const COMPONENTS = {
  multipleChoice: MultipleChoice,
  flashcard: Flashcard,
  counting: Counting,
  tracing: Tracing,
  dragDrop: DragDrop,
};

export default function Activity({ completeActivity }) {
  const { domainId, activityId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const activity = getActivityById(domainId, activityId);
  const domain = DOMAINS[domainId];

  if (!activity || !domain) {
    return <p>Activity not found.</p>;
  }

  const handleComplete = (correct, total) => {
    const stars = calculateStars(correct, total);
    completeActivity(domainId, activityId, stars, correct, total);
    setResult({ stars, correct, total });
  };

  const Component = COMPONENTS[activity.type];

  if (result) {
    return (
      <div className="celebration">
        <div className="celebration-emoji">
          {result.stars === 3 ? '🌟' : result.stars === 2 ? '⭐' : '👍'}
        </div>
        <h2>
          {result.stars === 3 ? 'Amazing!' : result.stars === 2 ? 'Great Job!' : 'Good Try!'}
        </h2>
        <div className="stars">
          {'★'.repeat(result.stars)}{'☆'.repeat(3 - result.stars)}
        </div>
        {result.total > 0 && activity.type !== 'flashcard' && activity.type !== 'tracing' && (
          <p>{result.correct} out of {result.total} correct</p>
        )}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
          <button className="btn btn-secondary" onClick={() => navigate(`/domain/${domainId}`)}>
            Back to {domain.title}
          </button>
          <button className="btn btn-primary" onClick={() => { setResult(null); }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button className="back-btn" onClick={() => navigate(`/domain/${domainId}`)}>
        ← Back to {domain.title}
      </button>
      <h2 className="page-title">{activity.title}</h2>
      <p className="page-subtitle">{activity.instruction}</p>
      {Component && <Component activity={activity} onComplete={handleComplete} />}
    </>
  );
}
