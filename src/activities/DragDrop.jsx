import { useState, useEffect } from 'react';
import TTSButton from '../components/TTS/TTSButton';
import { playDrop } from '../utils/sound';

export default function DragDrop({ activity, onComplete }) {
  const isSequence = !!activity.data.sequence;
  const pairs = activity.data.pairs || [];
  const sequence = activity.data.sequence || [];

  const [matched, setMatched] = useState({});
  const [dragging, setDragging] = useState(null);
  const [shuffled, setShuffled] = useState([]);
  const [placed, setPlaced] = useState([]);

  useEffect(() => {
    setMatched({});
    setDragging(null);
    if (isSequence) {
      setShuffled([...sequence].sort(() => Math.random() - 0.5));
      setPlaced(new Array(sequence.length).fill(null));
    } else {
      setShuffled([...pairs.map((p) => p.right)].sort(() => Math.random() - 0.5));
    }
  }, [activity.id]);

  // Matching mode
  const handleDragStart = (item) => {
    setDragging(item);
  };

  const handleDrop = (target) => {
    if (!dragging) return;

    if (isSequence) {
      const slotIndex = target;
      if (dragging === sequence[slotIndex]) {
        playDrop();
        const newPlaced = [...placed];
        newPlaced[slotIndex] = dragging;
        setPlaced(newPlaced);
        setShuffled((prev) => prev.filter((s) => s !== dragging));

        const filledCount = newPlaced.filter(Boolean).length;
        if (filledCount === sequence.length) {
          setTimeout(() => onComplete(sequence.length, sequence.length), 800);
        }
      }
    } else {
      const pair = pairs.find((p) => p.left === target && p.right === dragging);
      if (pair) {
        playDrop();
        setMatched((prev) => ({ ...prev, [target]: dragging }));
        setShuffled((prev) => prev.filter((s) => s !== dragging));

        if (Object.keys(matched).length + 1 === pairs.length) {
          setTimeout(() => onComplete(pairs.length, pairs.length), 800);
        }
      }
    }
    setDragging(null);
  };

  // Touch-friendly: tap to select, tap to place
  const handleTapItem = (item) => {
    setDragging(item);
  };

  const handleTapTarget = (target) => {
    if (!dragging) return;
    handleDrop(target);
  };

  if (isSequence) {
    return (
      <div className="activity-player">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <TTSButton text={activity.data.label || activity.instruction} />
        </div>
        <div className="activity-question">{activity.data.label}</div>

        {/* Drop zones */}
        <div className="drag-drop-container">
          <div className="drag-drop-row" style={{ flexWrap: 'wrap' }}>
            {sequence.map((item, i) => (
              <div
                key={i}
                className={`drop-zone ${placed[i] ? 'filled' : ''} ${dragging && !placed[i] ? 'hover' : ''}`}
                onClick={() => handleTapTarget(i)}
              >
                {placed[i] || (i + 1)}
              </div>
            ))}
          </div>

          {/* Draggable items */}
          <div className="drag-drop-row" style={{ flexWrap: 'wrap', marginTop: 20 }}>
            {shuffled.map((item) => (
              <div
                key={item}
                className={`drag-item ${dragging === item ? 'matched' : ''}`}
                onClick={() => handleTapItem(item)}
                draggable
                onDragStart={() => handleDragStart(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Matching mode
  return (
    <div className="activity-player">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
        <TTSButton text={activity.instruction} />
      </div>
      <p style={{ color: 'var(--text-light)', marginBottom: 16 }}>
        Tap an answer, then tap where it goes!
      </p>

      <div className="drag-drop-container">
        {pairs.map((pair) => (
          <div key={pair.left} className="drag-drop-row">
            <div className="drag-item" style={{ cursor: 'default' }}>
              {pair.left}
            </div>
            <span style={{ fontSize: '1.5rem' }}>→</span>
            <div
              className={`drop-zone ${matched[pair.left] ? 'filled' : ''} ${dragging && !matched[pair.left] ? 'hover' : ''}`}
              onClick={() => handleTapTarget(pair.left)}
            >
              {matched[pair.left] || '?'}
            </div>
          </div>
        ))}

        <div className="drag-drop-row" style={{ flexWrap: 'wrap', marginTop: 16 }}>
          {shuffled.map((item) => (
            <div
              key={item}
              className={`drag-item ${dragging === item ? 'matched' : ''}`}
              onClick={() => handleTapItem(item)}
              draggable
              onDragStart={() => handleDragStart(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
