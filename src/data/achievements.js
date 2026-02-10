export const BADGES = {
  letters: [
    { id: 'letter-starter', title: 'Letter Learner', icon: '🅰️', requirement: 3, description: 'Complete 3 letter activities' },
    { id: 'letter-explorer', title: 'Letter Explorer', icon: '📖', requirement: 6, description: 'Complete 6 letter activities' },
    { id: 'letter-master', title: 'Reading Rockstar', icon: '🌟', requirement: 10, description: 'Complete all letter activities' },
  ],
  math: [
    { id: 'math-starter', title: 'Number Newbie', icon: '1️⃣', requirement: 3, description: 'Complete 3 math activities' },
    { id: 'math-explorer', title: 'Math Explorer', icon: '🔢', requirement: 6, description: 'Complete 6 math activities' },
    { id: 'math-master', title: 'Number Ninja', icon: '🥷', requirement: 11, description: 'Complete all math activities' },
  ],
  science: [
    { id: 'science-starter', title: 'Curious Kid', icon: '🔍', requirement: 3, description: 'Complete 3 science activities' },
    { id: 'science-explorer', title: 'Science Scout', icon: '🔬', requirement: 6, description: 'Complete 6 science activities' },
    { id: 'science-master', title: 'Super Scientist', icon: '🧪', requirement: 9, description: 'Complete all science activities' },
  ],
  social: [
    { id: 'social-starter', title: 'Friendly Face', icon: '😊', requirement: 2, description: 'Complete 2 social activities' },
    { id: 'social-explorer', title: 'Kind Heart', icon: '❤️', requirement: 4, description: 'Complete 4 social activities' },
    { id: 'social-master', title: 'Super Friend', icon: '🤝', requirement: 7, description: 'Complete all social activities' },
  ],
  motor: [
    { id: 'motor-starter', title: 'Steady Hand', icon: '✋', requirement: 2, description: 'Complete 2 motor activities' },
    { id: 'motor-explorer', title: 'Trace Pro', icon: '✏️', requirement: 4, description: 'Complete 4 motor activities' },
    { id: 'motor-master', title: 'Writing Wizard', icon: '🧙', requirement: 7, description: 'Complete all motor activities' },
  ],
  arts: [
    { id: 'arts-starter', title: 'Little Artist', icon: '🖍️', requirement: 2, description: 'Complete 2 art activities' },
    { id: 'arts-explorer', title: 'Creative Kid', icon: '🎨', requirement: 5, description: 'Complete 5 art activities' },
    { id: 'arts-master', title: 'Art Star', icon: '💫', requirement: 8, description: 'Complete all art activities' },
  ],
  general: [
    { id: 'first-activity', title: 'First Steps', icon: '👶', requirement: 1, description: 'Complete your first activity!' },
    { id: 'ten-activities', title: 'Explorer', icon: '🗺️', requirement: 10, description: 'Complete 10 activities' },
    { id: 'twenty-five', title: 'Superstar', icon: '⭐', requirement: 25, description: 'Complete 25 activities' },
    { id: 'fifty', title: 'Champion', icon: '🏆', requirement: 50, description: 'Complete 50 activities' },
    { id: 'streak-3', title: '3-Day Streak', icon: '🔥', requirement: 3, description: 'Practice 3 days in a row!' },
    { id: 'streak-7', title: 'Weekly Warrior', icon: '💪', requirement: 7, description: 'Practice 7 days in a row!' },
  ],
};

export function getEarnedBadges(progress) {
  const earned = [];
  const totalCompleted = Object.values(progress.completed || {}).reduce(
    (sum, domain) => sum + Object.keys(domain).length, 0
  );

  // Domain-specific badges
  for (const [domainId, badges] of Object.entries(BADGES)) {
    if (domainId === 'general') continue;
    const domainCompleted = Object.keys(progress.completed?.[domainId] || {}).length;
    for (const badge of badges) {
      if (domainCompleted >= badge.requirement) {
        earned.push(badge);
      }
    }
  }

  // General badges (activity count)
  const generalCountBadges = BADGES.general.filter(b => !b.id.startsWith('streak'));
  for (const badge of generalCountBadges) {
    if (totalCompleted >= badge.requirement) {
      earned.push(badge);
    }
  }

  // Streak badges
  const streak = progress.streak || 0;
  const streakBadges = BADGES.general.filter(b => b.id.startsWith('streak'));
  for (const badge of streakBadges) {
    if (streak >= badge.requirement) {
      earned.push(badge);
    }
  }

  return earned;
}
