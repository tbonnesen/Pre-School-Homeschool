import { useState, useEffect } from 'react';
import TTSButton from '../components/TTS/TTSButton';

export default function MultipleChoice({ activity, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = activity.data;
  const current = questions[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setSelected(null);
    setCorrect(0);
    setShowResult(false);
  }, [activity.id]);

  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === current.answer;
    if (isCorrect) setCorrect((c) => c + 1);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        const finalCorrect = isCorrect ? correct + 1 : correct;
        onComplete(finalCorrect, questions.length);
      }
    }, 1000);
  };

  if (showResult) return null;

  return (
    <div className="activity-player">
      <div className="activity-progress-bar">
        <div
          className="activity-progress-fill"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>
      <div className="activity-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <TTSButton text={current.question} />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>
      <div className="activity-question">{current.question}</div>
      <div className="options-grid">
        {current.options.map((option) => (
          <button
            key={option}
            className={`option-btn ${
              selected === option
                ? option === current.answer ? 'correct' : 'incorrect'
                : selected && option === current.answer ? 'correct' : ''
            }`}
            onClick={() => handleSelect(option)}
            disabled={!!selected}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
