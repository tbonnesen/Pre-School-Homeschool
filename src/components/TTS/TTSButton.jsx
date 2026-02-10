import { useTTS } from '../../hooks/useTTS';

export default function TTSButton({ text }) {
  const { speak } = useTTS();
  return (
    <button className="tts-btn" onClick={() => speak(text)} title="Read aloud">
      🔊
    </button>
  );
}
