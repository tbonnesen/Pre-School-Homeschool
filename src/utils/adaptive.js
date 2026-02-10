export function getRecommendedDifficulty(childAge, scores, domainId) {
  const baseLevel = childAge <= 3 ? 1 : childAge <= 4 ? 2 : 3;
  const domainScores = scores?.[domainId];
  if (!domainScores) return baseLevel;

  let totalCorrect = 0;
  let totalAttempts = 0;
  for (const s of Object.values(domainScores)) {
    totalCorrect += s.correct || 0;
    totalAttempts += s.total || 0;
  }

  if (totalAttempts < 5) return baseLevel;

  const accuracy = totalCorrect / totalAttempts;
  if (accuracy > 0.8 && baseLevel < 3) return baseLevel + 1;
  if (accuracy < 0.4 && baseLevel > 1) return baseLevel - 1;
  return baseLevel;
}

export function calculateStars(correct, total) {
  if (total === 0) return 1;
  const pct = correct / total;
  if (pct >= 0.9) return 3;
  if (pct >= 0.6) return 2;
  return 1;
}

export function getDailySuggestion(completed, activities) {
  // Find domains with least progress
  const domainProgress = {};
  for (const [domainId, acts] of Object.entries(activities)) {
    const done = Object.keys(completed?.[domainId] || {}).length;
    const total = acts.length;
    domainProgress[domainId] = { done, total, pct: total > 0 ? done / total : 1 };
  }

  // Sort by least progress
  const sorted = Object.entries(domainProgress).sort((a, b) => a[1].pct - b[1].pct);
  const leastDomain = sorted[0]?.[0];
  if (!leastDomain) return null;

  // Find first incomplete activity in that domain
  const domainActivities = activities[leastDomain] || [];
  const completedIds = completed?.[leastDomain] || {};
  const next = domainActivities.find((a) => !completedIds[a.id]);
  if (!next) return null;

  return { domainId: leastDomain, activity: next };
}
