import { useState, useCallback } from 'react';
import { loadData, saveData, resetData, updateStreak } from '../utils/storage';

export function useProgress() {
  const [data, setData] = useState(() => loadData());

  const completeActivity = useCallback((domainId, activityId, stars, correct, total) => {
    setData((prev) => {
      const updated = { ...prev };

      // Mark completed
      if (!updated.completed[domainId]) updated.completed[domainId] = {};
      const existing = updated.completed[domainId][activityId];
      updated.completed[domainId][activityId] = {
        stars: Math.max(stars, existing?.stars || 0),
        attempts: (existing?.attempts || 0) + 1,
        lastPlayed: new Date().toISOString(),
      };

      // Track scores for adaptive difficulty
      if (!updated.scores[domainId]) updated.scores[domainId] = {};
      const prevScore = updated.scores[domainId][activityId] || { correct: 0, total: 0 };
      updated.scores[domainId][activityId] = {
        correct: prevScore.correct + correct,
        total: prevScore.total + total,
      };

      // Activity log
      updated.activityLog = [
        { activityId, domainId, stars, timestamp: new Date().toISOString() },
        ...(updated.activityLog || []),
      ].slice(0, 100);

      // Update streak
      const withStreak = updateStreak(updated);
      saveData(withStreak);
      return withStreak;
    });
  }, []);

  const updateSettings = useCallback((settings) => {
    setData((prev) => {
      const updated = { ...prev, ...settings };
      saveData(updated);
      return updated;
    });
  }, []);

  const reset = useCallback(() => {
    const fresh = resetData();
    setData(fresh);
  }, []);

  const getCompletionPercent = useCallback((domainId, activities) => {
    const done = Object.keys(data.completed?.[domainId] || {}).length;
    return activities.length > 0 ? Math.round((done / activities.length) * 100) : 0;
  }, [data]);

  return { data, completeActivity, updateSettings, reset, getCompletionPercent };
}
