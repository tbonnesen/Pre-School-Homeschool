import { useState, useEffect, useRef } from 'react';
import { useTTS } from '../hooks/useTTS';
import { playFlip, playCorrect } from '../utils/sound';
import TTSButton from '../components/TTS/TTSButton';

// How long each phase shows (ms)
const WORD_DISPLAY_MS  = 2200;  // large word only
const REVEAL_PAUSE_MS  = 1000;  // pause between auto-advances

export default function SightWords({ activity, onComplete }) {
  const words = activity.data; // Array of { word, picture, sentence? }
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('word'); // 'word' | 'reveal'
  const [viewed, setViewed] = useState(0);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const timerRef = useRef(null);
  const { speak, stop } = useTTS();

  const current = words[index];

  // Auto-advance from word → reveal
  useEffect(() => {
    if (!autoPlaying || phase !== 'word') return;
    timerRef.current = setTimeout(() => {
      setPhase('reveal');
      playFlip();
      speak(current.word);
    }, WORD_DISPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, phase, autoPlaying]);

  const goNext = () => {
    clearTimeout(timerRef.current);
    stop();
    if (index + 1 < words.length) {
      setViewed((v) => v + 1);
      setIndex((i) => i + 1);
      setPhase('word');
    } else {
      playCorrect();
      onComplete(words.length, words.length);
    }
  };

  const handleManualReveal = () => {
    if (phase === 'word') {
      clearTimeout(timerRef.current);
      setPhase('reveal');
      playFlip();
      speak(current.word);
    }
  };

  const handlePause = () => {
    setAutoPlaying((p) => !p);
    if (autoPlaying) clearTimeout(timerRef.current);
  };

  if (!current) return null;

  const progress = (index / words.length) * 100;
  const isLast = index === words.length - 1;

  return (
    <div className="activity-player">
      <div className="activity-progress-bar">
        <div className="activity-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
        <TTSButton text={current.word} />
        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
          {index + 1} / {words.length}
        </span>
        <button
          className="sw-pause-btn"
          onClick={handlePause}
          title={autoPlaying ? 'Pause auto-advance' : 'Resume auto-advance'}
        >
          {autoPlaying ? '⏸' : '▶️'}
        </button>
      </div>

      {/* Main card */}
      <div
        className={`sw-card${phase === 'reveal' ? ' revealed' : ''}`}
        onClick={phase === 'word' ? handleManualReveal : undefined}
        role={phase === 'word' ? 'button' : undefined}
        tabIndex={phase === 'word' ? 0 : undefined}
        onKeyDown={phase === 'word' ? (e) => e.key === 'Enter' && handleManualReveal() : undefined}
        aria-label={phase === 'word' ? `Sight word: ${current.word}. Tap to reveal.` : undefined}
      >
        {phase === 'word' ? (
          <div className="sw-word">{current.word}</div>
        ) : (
          <div className="sw-reveal">
            <div className="sw-picture">{current.picture}</div>
            <div className="sw-word-small">{current.word}</div>
            {current.sentence && (
              <div className="sw-sentence">{current.sentence}</div>
            )}
          </div>
        )}
      </div>

      {phase === 'word' && (
        <p className="sw-hint">Tap the card to reveal!</p>
      )}

      {/* Navigation */}
      <div className="sw-nav">
        {phase === 'reveal' && (
          <button className="btn btn-primary" onClick={goNext}>
            {isLast ? 'Finish! 🎉' : 'Next Word →'}
          </button>
        )}
      </div>
    </div>
  );
}
