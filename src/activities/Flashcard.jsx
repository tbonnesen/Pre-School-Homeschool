import { useState, useEffect } from 'react';
import TTSButton from '../components/TTS/TTSButton';

export default function Flashcard({ activity, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewed, setViewed] = useState(new Set());

  const cards = activity.data;
  const current = cards[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setFlipped(false);
    setViewed(new Set());
  }, [activity.id]);

  const handleFlip = () => {
    if (!flipped) {
      setViewed((prev) => new Set([...prev, currentIndex]));
    }
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((i) => i + 1);
      setFlipped(false);
    } else {
      onComplete(cards.length, cards.length);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setFlipped(false);
    }
  };

  return (
    <div className="activity-player">
      <div className="activity-progress-bar">
        <div
          className="activity-progress-fill"
          style={{ width: `${((viewed.size) / cards.length) * 100}%` }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
        <TTSButton text={flipped ? current.back : current.front} />
        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
          {currentIndex + 1} / {cards.length}
        </span>
      </div>
      <p style={{ color: 'var(--text-light)', marginBottom: 12 }}>Tap the card to flip it!</p>

      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">{current.front}</div>
          <div className="flashcard-back">{current.back}</div>
        </div>
      </div>

      <div className="flashcard-nav">
        <button className="btn btn-secondary" onClick={handlePrev} disabled={currentIndex === 0}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          {currentIndex + 1 < cards.length ? 'Next →' : 'Done!'}
        </button>
      </div>
    </div>
  );
}
