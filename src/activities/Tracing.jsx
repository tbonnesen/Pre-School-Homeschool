import { useState, useRef, useEffect, useCallback } from 'react';
import TTSButton from '../components/TTS/TTSButton';

export default function Tracing({ activity, onComplete }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);

  const items = activity.data.letters || activity.data.shapes || [''];
  const isFreeform = activity.data.freeform;
  const current = items[currentIndex] || '';
  const label = activity.data.label || `Trace: ${current}`;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#2C3E50';
    setHasDrawn(false);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [currentIndex, activity.id, initCanvas]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    initCanvas();
  };

  const handleNext = () => {
    if (isFreeform || currentIndex + 1 >= items.length) {
      onComplete(items.length, items.length);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <div className="activity-player">
      {!isFreeform && (
        <div className="activity-progress-bar">
          <div
            className="activity-progress-fill"
            style={{ width: `${(currentIndex / items.length) * 100}%` }}
          />
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
        <TTSButton text={isFreeform ? label : `Trace the ${current}`} />
        {!isFreeform && (
          <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
            {currentIndex + 1} / {items.length}
          </span>
        )}
      </div>

      <div className="tracing-canvas-container" style={{ width: 350, height: 350 }}>
        {!isFreeform && <div className="tracing-guide">{current}</div>}
        {isFreeform && <div className="tracing-guide" style={{ fontSize: '1.5rem' }}>{label}</div>}
        <canvas
          ref={canvasRef}
          className="tracing-canvas"
          style={{ width: 350, height: 350 }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>

      <div className="flashcard-nav" style={{ marginTop: 20 }}>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear
        </button>
        <button className="btn btn-primary" onClick={handleNext} disabled={!hasDrawn}>
          {isFreeform || currentIndex + 1 >= items.length ? 'Done!' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
