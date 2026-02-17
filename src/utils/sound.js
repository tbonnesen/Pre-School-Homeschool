/**
 * Procedural sound engine using Web Audio API.
 * No audio files needed — all sounds are synthesized.
 */

let ctx = null;
let musicNodes = null; // refs to running music oscillators/gain

function getCtx() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  // Resume if suspended (browser autoplay policy)
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// ── Preferences ──────────────────────────────────────────────────────────────

export function isMuted() {
  return localStorage.getItem('sound-muted') === 'true';
}

export function setMuted(val) {
  localStorage.setItem('sound-muted', val ? 'true' : 'false');
  if (val) stopMusic();
}

export function isMusicOn() {
  return localStorage.getItem('music-on') === 'true';
}

export function setMusicOn(val) {
  localStorage.setItem('music-on', val ? 'true' : 'false');
  if (val) startMusic();
  else stopMusic();
}

// ── Core helpers ──────────────────────────────────────────────────────────────

/**
 * Play a single tone.
 * @param {number} freq - Hz
 * @param {number} start - AudioContext time offset (seconds)
 * @param {number} duration - seconds
 * @param {number} gain - 0–1
 * @param {'sine'|'square'|'triangle'|'sawtooth'} type
 */
function tone(freq, start, duration, gain = 0.25, type = 'sine') {
  const ac = getCtx();
  if (!ac) return;

  const osc = ac.createOscillator();
  const g = ac.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime + start);

  g.gain.setValueAtTime(0, ac.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ac.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + duration);

  osc.connect(g);
  g.connect(ac.destination);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + duration + 0.05);
}

// ── Sound effects ─────────────────────────────────────────────────────────────

export function playCorrect() {
  if (isMuted()) return;
  // Two-note ascending chime: C5 → E5
  tone(523.25, 0,    0.18, 0.28, 'sine');
  tone(659.25, 0.16, 0.22, 0.28, 'sine');
}

export function playWrong() {
  if (isMuted()) return;
  // Gentle descending buzz (not harsh/scary)
  tone(280, 0,    0.12, 0.18, 'triangle');
  tone(220, 0.10, 0.18, 0.14, 'triangle');
}

export function playCelebration() {
  if (isMuted()) return;
  // Happy 4-note fanfare: C5-E5-G5-C6
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => tone(freq, i * 0.14, 0.22, 0.28, 'sine'));
  // Add a sparkle on top
  tone(1318.5, 0.56, 0.3, 0.15, 'sine');
}

export function playBadgeUnlock() {
  if (isMuted()) return;
  // Rising arpeggio: C4-E4-G4-C5-E5-G5-C6-E6
  const notes = [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5, 1318.5];
  notes.forEach((freq, i) => tone(freq, i * 0.07, 0.18, 0.22, 'sine'));
}

export function playClick() {
  if (isMuted()) return;
  // Soft tick
  tone(800, 0, 0.04, 0.15, 'sine');
}

export function playFlip() {
  if (isMuted()) return;
  // Frequency sweep (whoosh)
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ac.currentTime + 0.12);
  g.gain.setValueAtTime(0.2, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.2);
}

export function playDrop() {
  if (isMuted()) return;
  // Soft pop for drag-drop success
  tone(440, 0,    0.08, 0.2,  'sine');
  tone(554, 0.07, 0.14, 0.18, 'sine');
}

// ── Background music ──────────────────────────────────────────────────────────

// Simple looping 4-chord progression: C-Am-F-G (each 2 seconds)
// Played as soft pads using multiple oscillators per chord

const CHORDS = [
  // C major: C3, E3, G3
  [130.81, 164.81, 196.00],
  // A minor: A2, C3, E3
  [110.00, 130.81, 164.81],
  // F major: F2, A2, C3
  [87.31,  110.00, 130.81],
  // G major: G2, B2, D3
  [98.00,  123.47, 146.83],
];

const CHORD_DURATION = 2.2; // seconds per chord
const FADE = 0.4;           // crossfade time

export function startMusic() {
  if (isMuted() || musicNodes) return;
  const ac = getCtx();
  if (!ac) return;

  const masterGain = ac.createGain();
  masterGain.gain.setValueAtTime(0.06, ac.currentTime);
  masterGain.connect(ac.destination);

  let chordIndex = 0;
  const scheduledOscs = [];

  function scheduleChord(startTime) {
    const chord = CHORDS[chordIndex % CHORDS.length];
    chordIndex++;

    chord.forEach((freq) => {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Fade in / sustain / fade out
      g.gain.setValueAtTime(0, startTime);
      g.gain.linearRampToValueAtTime(1, startTime + FADE);
      g.gain.setValueAtTime(1, startTime + CHORD_DURATION - FADE);
      g.gain.linearRampToValueAtTime(0, startTime + CHORD_DURATION);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + CHORD_DURATION + 0.1);
      scheduledOscs.push(osc);
    });
  }

  // Schedule ahead in a loop
  let nextStart = ac.currentTime;
  scheduleChord(nextStart);
  nextStart += CHORD_DURATION;

  const intervalId = setInterval(() => {
    if (!musicNodes) { clearInterval(intervalId); return; }
    scheduleChord(nextStart);
    nextStart += CHORD_DURATION;
  }, (CHORD_DURATION - 0.3) * 1000);

  musicNodes = { masterGain, intervalId, scheduledOscs };
}

export function stopMusic() {
  if (!musicNodes) return;
  const ac = getCtx();
  try {
    clearInterval(musicNodes.intervalId);
    musicNodes.masterGain.gain.setValueAtTime(
      musicNodes.masterGain.gain.value, ac?.currentTime ?? 0
    );
    musicNodes.masterGain.gain.linearRampToValueAtTime(
      0.001, (ac?.currentTime ?? 0) + 0.5
    );
    setTimeout(() => {
      try { musicNodes?.masterGain?.disconnect(); } catch { /* ignore */ }
    }, 600);
  } catch { /* ignore */ }
  musicNodes = null;
}
