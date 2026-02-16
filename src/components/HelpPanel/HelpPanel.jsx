import { useEffect, useState } from 'react';
import { useTTS } from '../../hooks/useTTS';
import { getHelpForActivity } from '../../data/helpTopics';

const GENERIC_HELP = {
  letters: "Let's learn about letters and reading! Letters are the building blocks of words. Each letter has a name and a sound. Try sounding out each letter slowly.",
  math: "Let's learn about numbers and math! Numbers help us count things and understand how many there are. Take your time and count carefully.",
  science: "Let's explore science and nature! Science is all about discovering how the world works. Look carefully and think about what you see.",
  social: "Let's learn about feelings and being kind! Everyone has feelings, and it's important to understand them. Think about how you would feel.",
  motor: "Let's practice drawing and tracing! Take your time and follow the lines carefully. It's okay if it's not perfect - practice makes better!",
  arts: "Let's get creative with art! Art is about expressing yourself and having fun with colors and shapes. There's no wrong answer in art!",
};

export default function HelpPanel({ activity, domainId, onClose }) {
  const { speak, stop } = useTTS();
  const [hasSpoken, setHasSpoken] = useState(false);

  // Get topic-specific help if available
  const topicHelp = getHelpForActivity(activity, domainId);

  const helpText = topicHelp?.helpText || activity.help || GENERIC_HELP[domainId] || "Take your time and try your best! It's okay to make mistakes - that's how we learn!";
  const helpTitle = topicHelp?.title || 'Let Me Help!';
  const helpEmoji = topicHelp?.emoji || '💡';
  const videos = topicHelp?.youtubeVideos || [];

  useEffect(() => {
    if (!hasSpoken) {
      speak(helpText);
      setHasSpoken(true);
    }
    return () => stop();
  }, []);

  const handleSpeak = () => {
    stop();
    speak(helpText);
  };

  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="help-overlay" onClick={onClose}>
      <div className="help-panel" onClick={(e) => e.stopPropagation()}>
        <div className="help-icon">{helpEmoji}</div>
        <h3 className="help-title">{helpTitle}</h3>
        <p className="help-text">{helpText}</p>

        <button className="btn help-speak-btn" onClick={handleSpeak}>
          🔊 Read Aloud
        </button>

        {videos.length > 0 && (
          <div className="help-videos">
            <h4 className="help-videos-title">🎬 Watch & Learn</h4>
            {videos.map((video, idx) => (
              <button
                key={idx}
                className="help-video-card"
                onClick={() => openVideo(video.videoId)}
              >
                <span className="help-video-play">▶</span>
                <span className="help-video-info">
                  <span className="help-video-name">{video.title}</span>
                  <span className="help-video-channel">{video.channel}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        <button className="btn btn-primary help-got-it" onClick={onClose}>
          Got it! 👍
        </button>
      </div>
    </div>
  );
}
