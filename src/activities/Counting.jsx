import { useState, useEffect } from 'react';
import TTSButton from '../components/TTS/TTSButton';
import { useTTS } from '../hooks/useTTS';

export default function Counting({ activity, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counted, setCounted] = useState(0);
  const [tapped, setTapped] = useState(new Set());
  const [correct, setCorrect] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const { speak } = useTTS();

  const items = activity.data;
  const current = items[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setCounted(0);
    setTapped(new Set());
    setCorrect(0);
    setShowCheck(false);
    setShowNudge(false);
  }, [activity.id]);

  // Show nudge hint after 8 seconds of inactivity on a question
  useEffect(() => {
    setShowNudge(false);
    const timer = setTimeout(() => {
      if (!showCheck) {
        setShowNudge(true);
        speak('Tap each one to count them! Touch every item you see.');
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentIndex, tapped.size, showCheck]);

  const handleTap = (index) => {
    if (tapped.has(index) || showCheck) return;
    setShowNudge(false);
    const newTapped = new Set([...tapped, index]);
    setTapped(newTapped);
    setCounted(newTapped.size);

    if (newTapped.size === current.count) {
      setShowCheck(true);
      setCorrect((c) => c + 1);
      setTimeout(() => {
        if (currentIndex + 1 < items.length) {
          setCurrentIndex((i) => i + 1);
          setCounted(0);
          setTapped(new Set());
          setShowCheck(false);
        } else {
          onComplete(correct + 1, items.length);
        }
      }, 1200);
    }
  };

  return (
    <div className="activity-player">
      <div className="activity-progress-bar">
        <div
          className="activity-progress-fill"
          style={{ width: `${(currentIndex / items.length) * 100}%` }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
        <TTSButton text={`Count the ${current.label}. There are ${current.count}.`} />
        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
          {currentIndex + 1} / {items.length}
        </span>
      </div>
      <div className="activity-question">
        Count the {current.label}! Tap each one.
      </div>

      <div className="counting-area">
        {Array.from({ length: current.count }, (_, i) => (
          <span
            key={i}
            className={`counting-item ${tapped.has(i) ? 'counted' : ''}`}
            onClick={() => handleTap(i)}
          >
            {current.emoji}
          </span>
        ))}
      </div>

      <div className="counting-display">
        {counted} / {current.count}
      </div>

      {showCheck && (
        <div style={{ fontSize: '2rem', color: 'var(--green)' }}>
          Great job! ✓
        </div>
      )}

      {showNudge && !showCheck && (
        <div className="hint-bubble">
          <span className="hint-icon">💡</span>
          <span className="hint-text">Tap each {current.emoji} to count them! Touch every one you see.</span>
        </div>
      )}
    </div>
  );
}
