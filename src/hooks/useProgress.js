import { useState, useCallback } from 'react';
import {
  loadAppData, saveAppData, getActiveProfile, saveActiveProfile,
  createProfile, deleteProfile, switchProfile, resetProfile, updateStreak,
} from '../utils/storage';
import { getEarnedBadges } from '../data/achievements';

export function useProgress() {
  const [appData, setAppData] = useState(() => loadAppData());
  const [newBadges, setNewBadges] = useState([]);

  const profile = getActiveProfile(appData);
  const data = { ...profile, pin: appData.pin };

  const completeActivity = useCallback((domainId, activityId, stars, correct, total) => {
    setAppData((prev) => {
      const p = getActiveProfile(prev);
      const badgesBefore = new Set(getEarnedBadges(p).map((b) => b.id));

      const updated = { ...p };

      if (!updated.completed[domainId]) updated.completed[domainId] = {};
      const existing = updated.completed[domainId][activityId];
      updated.completed[domainId][activityId] = {
        stars: Math.max(stars, existing?.stars || 0),
        attempts: (existing?.attempts || 0) + 1,
        lastPlayed: new Date().toISOString(),
      };

      if (!updated.scores[domainId]) updated.scores[domainId] = {};
      const prevScore = updated.scores[domainId][activityId] || { correct: 0, total: 0 };
      updated.scores[domainId][activityId] = {
        correct: prevScore.correct + correct,
        total: prevScore.total + total,
      };

      updated.activityLog = [
        { activityId, domainId, stars, timestamp: new Date().toISOString() },
        ...(updated.activityLog || []),
      ].slice(0, 100);

      const withStreak = updateStreak(updated);

      // Detect newly earned badges
      const badgesAfter = getEarnedBadges(withStreak);
      const justEarned = badgesAfter.filter((b) => !badgesBefore.has(b.id));
      if (justEarned.length > 0) {
        // Schedule outside the setState to avoid batching issues
        setTimeout(() => setNewBadges((prev) => [...prev, ...justEarned]), 0);
      }

      return saveActiveProfile(prev, withStreak);
    });
  }, []);

  const updateSettings = useCallback((settings) => {
    setAppData((prev) => {
      const { pin, ...profileSettings } = settings;
      const p = getActiveProfile(prev);
      const updatedProfile = { ...p, ...profileSettings };
      let updatedApp = saveActiveProfile(prev, updatedProfile);
      if (pin !== undefined) {
        updatedApp = { ...updatedApp, pin };
        saveAppData(updatedApp);
      }
      return updatedApp;
    });
  }, []);

  const clearNewBadges = useCallback(() => setNewBadges([]), []);

  const reset = useCallback(() => {
    setAppData((prev) => resetProfile(prev));
  }, []);

  const getCompletionPercent = useCallback((domainId, activities) => {
    const done = Object.keys(data.completed?.[domainId] || {}).length;
    return activities.length > 0 ? Math.round((done / activities.length) * 100) : 0;
  }, [data]);

  const addProfile = useCallback((name, age, avatar) => {
    setAppData((prev) => {
      const result = createProfile(prev, name, age, avatar);
      return result.appData;
    });
  }, []);

  const removeProfile = useCallback((profileId) => {
    setAppData((prev) => deleteProfile(prev, profileId));
  }, []);

  const setActiveProfile = useCallback((profileId) => {
    setAppData((prev) => switchProfile(prev, profileId));
  }, []);

  return {
    data,
    completeActivity,
    updateSettings,
    reset,
    getCompletionPercent,
    profiles: appData.profiles,
    activeProfileId: appData.activeProfileId,
    addProfile,
    removeProfile,
    setActiveProfile,
    newBadges,
    clearNewBadges,
  };
}
