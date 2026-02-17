import { useEffect, useRef } from 'react';
import { useTTS } from '../../hooks/useTTS';
import { playBadgeUnlock } from '../../utils/sound';

// Generate deterministic-ish confetti pieces
const CONFETTI_COUNT = 24;
const CONFETTI_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#DDA0DD', '#87CEEB', '#FFA500'];

const confettiPieces = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${(i / CONFETTI_COUNT) * 100 + (i % 3) * 2}%`,
  delay: `${(i * 0.08).toFixed(2)}s`,
  duration: `${1.2 + (i % 4) * 0.3}s`,
  size: i % 3 === 0 ? 10 : i % 3 === 1 ? 7 : 12,
  shape: i % 3 === 0 ? 'circle' : 'rect',
}));

export default function BadgeModal({ badge, onClose }) {
  const { speak } = useTTS();
  const closedRef = useRef(false);

  useEffect(() => {
    if (!badge) return;
    playBadgeUnlock();
    speak(`You earned the ${badge.title} badge! ${badge.description}`);
    return () => { closedRef.current = true; };
  }, [badge]);

  if (!badge) return null;

  return (
    <div className="badge-modal-overlay" onClick={onClose}>
      {/* Confetti */}
      <div className="confetti-container" aria-hidden="true">
        {confettiPieces.map((p) => (
          <span
            key={p.id}
            className={`confetti-piece confetti-${p.shape}`}
            style={{
              left: p.left,
              background: p.color,
              width: p.size,
              height: p.shape === 'circle' ? p.size : p.size * 0.6,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Modal card */}
      <div className="badge-modal" onClick={(e) => e.stopPropagation()}>
        <div className="badge-modal-icon">{badge.icon}</div>
        <div className="badge-modal-label">🏅 New Badge Unlocked!</div>
        <h2 className="badge-modal-title">{badge.title}</h2>
        <p className="badge-modal-desc">{badge.description}</p>
        <button className="btn btn-primary badge-modal-btn" onClick={onClose}>
          Awesome! 🎉
        </button>
      </div>
    </div>
  );
}
