import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { isMuted, setMuted, isMusicOn, setMusicOn, startMusic, stopMusic } from '../../utils/sound';

export default function Layout({ children, onParentMode, darkMode, onToggleDark }) {
  const [muted, setMutedState] = useState(() => isMuted());
  const [musicOn, setMusicOnState] = useState(() => isMusicOn());

  const handleToggleSound = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
  };

  const handleToggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    setMusicOnState(next);
    if (next) startMusic();
    else stopMusic();
  };

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand">
          🏠 Pre-School Homeschool
        </NavLink>
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Learn
          </NavLink>
          <NavLink to="/paths" className={({ isActive }) => isActive ? 'active' : ''}>
            Paths
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => isActive ? 'active' : ''}>
            Resources
          </NavLink>
          <button onClick={onParentMode}>
            Parent
          </button>
          <button className="theme-toggle" onClick={handleToggleSound} title={muted ? 'Unmute sounds' : 'Mute sounds'}>
            {muted ? '🔇' : '🔊'}
          </button>
          <button className="theme-toggle" onClick={handleToggleMusic} title={musicOn ? 'Stop music' : 'Play background music'}>
            {musicOn ? '🎵' : '🎶'}
          </button>
          <button className="theme-toggle" onClick={onToggleDark} title="Toggle dark mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
      <main className="page">
        {children}
      </main>
    </>
  );
}
