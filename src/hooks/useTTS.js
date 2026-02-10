import { useCallback, useRef } from 'react';

export function useTTS() {
  const utteranceRef = useRef(null);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to pick a friendly voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Female')
    );
    if (preferred) utterance.voice = preferred;

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
  }, []);

  return { speak, stop };
}
