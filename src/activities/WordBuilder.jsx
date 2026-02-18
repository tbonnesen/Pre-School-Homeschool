import { useState, useEffect } from 'react';
import { useTTS } from '../hooks/useTTS';
import { playCorrect, playWrong, playDrop } from '../utils/sound';
import TTSButton from '../components/TTS/TTSButton';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WordBuilder({ activity, onComplete }) {
  const words = activity.data; // Array of { word, hint?, emoji? }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placed, setPlaced] = useState([]);      // letters placed in slots (strings or null)
  const [available, setAvailable] = useState([]); // shuffled tiles still in bank
  const [selected, setSelected] = useState(null); // index in available that's "picked up"
  const [shake, setShake] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { speak } = useTTS();

  const current = words[currentIndex];

  // Initialise puzzle when word changes
  useEffect(() => {
    if (!current) return;
    const letters = current.word.toUpperCase().split('');
    setPlaced(new Array(letters.length).fill(null));
    setAvailable(shuffle(letters.map((l, i) => ({ id: i, letter: l }))));
    setSelected(null);
    setShake(false);
    setShowSuccess(false);
  }, [currentIndex, activity.id]);

  // Check completion every time placed changes
  useEffect(() => {
    if (!current) return;
    const target = current.word.toUpperCase().split('');
    const full = placed.every((l) => l !== null);
    if (!full) return;

    const isCorrect = placed.every((l, i) => l === target[i]);
    if (isCorrect) {
      playCorrect();
      speak(current.word);
      setShowSuccess(true);
      setCorrect((c) => c + 1);
      setTimeout(() => {
        if (currentIndex + 1 < words.length) {
          setCurrentIndex((i) => i + 1);
        } else {
          onComplete(correct + 1, words.length);
        }
      }, 1400);
    } else {
      // Wrong — shake and clear slots
      playWrong();
      setShake(true);
      setTimeout(() => {
        // Return placed letters back to bank
        const returned = placed
          .map((l, i) => (l ? { id: Date.now() + i, letter: l } : null))
          .filter(Boolean);
        setAvailable((prev) => shuffle([...prev, ...returned]));
        setPlaced(new Array(current.word.length).fill(null));
        setSelected(null);
        setShake(false);
      }, 600);
    }
  }, [placed]);

  const handleTileClick = (idx) => {
    if (showSuccess) return;
    setSelected((prev) => (prev === idx ? null : idx));
  };

  const handleSlotClick = (slotIdx) => {
    if (showSuccess) return;

    if (placed[slotIdx] !== null) {
      // Return tile to bank
      const letter = placed[slotIdx];
      const newPlaced = [...placed];
      newPlaced[slotIdx] = null;
      setPlaced(newPlaced);
      setAvailable((prev) => [...prev, { id: Date.now(), letter }]);
      return;
    }

    if (selected === null) return;

    // Place selected tile into slot
    playDrop();
    const tile = available[selected];
    const newPlaced = [...placed];
    newPlaced[slotIdx] = tile.letter;
    setPlaced(newPlaced);
    setAvailable((prev) => prev.filter((_, i) => i !== selected));
    setSelected(null);
  };

  if (!current) return null;

  const targetLetters = current.word.toUpperCase().split('');
  const progress = ((currentIndex) / words.length) * 100;

  return (
    <div className="activity-player">
      <div className="activity-progress-bar">
        <div className="activity-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
        <TTSButton text={current.hint || `Spell the word: ${current.word}`} />
        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* Prompt */}
      <div className="wb-prompt">
        {current.emoji && <span className="wb-emoji">{current.emoji}</span>}
        <p className="wb-hint">{current.hint || `Spell the word!`}</p>
      </div>

      {/* Word slots */}
      <div className={`wb-slots${shake ? ' shake' : ''}`}>
        {targetLetters.map((_, i) => (
          <button
            key={i}
            className={`wb-slot${placed[i] ? ' filled' : ''}${showSuccess ? ' success' : ''}`}
            onClick={() => handleSlotClick(i)}
            aria-label={placed[i] ? `Slot ${i + 1}: ${placed[i]}, tap to remove` : `Empty slot ${i + 1}`}
          >
            {placed[i] || ''}
          </button>
        ))}
      </div>

      {showSuccess && (
        <div className="wb-success">✅ {current.word.toUpperCase()}!</div>
      )}

      {/* Letter bank */}
      <div className="wb-bank">
        {available.map((tile, idx) => (
          <button
            key={tile.id}
            className={`wb-tile${selected === idx ? ' selected' : ''}`}
            onClick={() => handleTileClick(idx)}
            aria-label={`Letter ${tile.letter}`}
            aria-pressed={selected === idx}
          >
            {tile.letter}
          </button>
        ))}
      </div>

      <p className="wb-instructions">
        Tap a letter, then tap a slot to place it. Tap a filled slot to take it back.
      </p>
    </div>
  );
}
