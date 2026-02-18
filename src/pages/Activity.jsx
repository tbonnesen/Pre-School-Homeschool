import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DOMAINS, getActivityById } from '../data/curriculum';
import { calculateStars } from '../utils/adaptive';
import { playCelebration } from '../utils/sound';
import MultipleChoice from '../activities/MultipleChoice';
import Flashcard from '../activities/Flashcard';
import Counting from '../activities/Counting';
import Tracing from '../activities/Tracing';
import DragDrop from '../activities/DragDrop';
import WordBuilder from '../activities/WordBuilder';
import SightWords from '../activities/SightWords';
import HelpPanel from '../components/HelpPanel/HelpPanel';
import BadgeModal from '../components/BadgeModal/BadgeModal';

const COMPONENTS = {
  multipleChoice: MultipleChoice,
  flashcard: Flashcard,
  counting: Counting,
  tracing: Tracing,
  dragDrop: DragDrop,
  wordBuilder: WordBuilder,
  sightWords: SightWords,
};

export default function Activity({ completeActivity, newBadges, clearNewBadges }) {
  const { domainId, activityId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [shownBadgeIndex, setShownBadgeIndex] = useState(0);

  // Show badges queued up after celebration
  const pendingBadge = result && newBadges?.length > 0 ? newBadges[shownBadgeIndex] : null;

  const handleBadgeClose = () => {
    if (shownBadgeIndex < (newBadges?.length || 0) - 1) {
      setShownBadgeIndex((i) => i + 1);
    } else {
      clearNewBadges?.();
      setShownBadgeIndex(0);
    }
  };

  const activity = getActivityById(domainId, activityId);
  const domain = DOMAINS[domainId];

  if (!activity || !domain) {
    return <p>Activity not found.</p>;
  }

  const handleComplete = (correct, total) => {
    const stars = calculateStars(correct, total);
    completeActivity(domainId, activityId, stars, correct, total);
    playCelebration();
    setResult({ stars, correct, total });
  };

  const Component = COMPONENTS[activity.type];

  if (result) {
    return (
      <>
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
          {result.total > 0 && !['flashcard', 'tracing', 'sightWords'].includes(activity.type) && (
            <p>{result.correct} out of {result.total} correct</p>
          )}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
            <button className="btn btn-secondary" onClick={() => navigate(`/domain/${domainId}`)}>
              Back to {domain.title}
            </button>
            <button className="btn btn-primary" onClick={() => { setResult(null); clearNewBadges?.(); setShownBadgeIndex(0); }}>
              Try Again
            </button>
          </div>
        </div>
        {pendingBadge && <BadgeModal badge={pendingBadge} onClose={handleBadgeClose} />}
      </>
    );
  }

  return (
    <>
      <div className="activity-top-bar">
        <button className="back-btn" onClick={() => navigate(`/domain/${domainId}`)}>
          ← Back to {domain.title}
        </button>
        <button className="help-btn" onClick={() => setShowHelp(true)} title="Need help? Click for a hint!">
          💡 Help
        </button>
      </div>
      <h2 className="page-title">{activity.title}</h2>
      <p className="page-subtitle">{activity.instruction}</p>
      {Component && <Component activity={activity} onComplete={handleComplete} />}
      {showHelp && (
        <HelpPanel
          activity={activity}
          domainId={domainId}
          onClose={() => setShowHelp(false)}
        />
      )}
    </>
  );
}
