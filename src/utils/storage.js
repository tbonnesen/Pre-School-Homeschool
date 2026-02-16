const STORAGE_KEY = 'preschool-homeschool';
const PROFILES_KEY = 'preschool-profiles';

const DEFAULT_PROFILE = {
  childName: '',
  childAge: 4,
  avatar: '🧒',
  completed: {},
  streak: 0,
  lastPlayDate: null,
  activityLog: [],
  scores: {},
};

const DEFAULT_APP = {
  pin: '1234',
  activeProfileId: null,
  profiles: {},
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// --- Multi-profile storage ---

export function loadAppData() {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (raw) return { ...DEFAULT_APP, ...JSON.parse(raw) };
  } catch { /* ignore */ }

  // Migrate from old single-profile format
  try {
    const old = localStorage.getItem(STORAGE_KEY);
    if (old) {
      const oldData = JSON.parse(old);
      const id = generateId();
      const profile = {
        ...DEFAULT_PROFILE,
        childName: oldData.childName || '',
        childAge: oldData.childAge || 4,
        completed: oldData.completed || {},
        streak: oldData.streak || 0,
        lastPlayDate: oldData.lastPlayDate || null,
        activityLog: oldData.activityLog || [],
        scores: oldData.scores || {},
      };
      const appData = {
        pin: oldData.pin || '1234',
        activeProfileId: id,
        profiles: { [id]: profile },
      };
      localStorage.setItem(PROFILES_KEY, JSON.stringify(appData));
      localStorage.removeItem(STORAGE_KEY);
      return appData;
    }
  } catch { /* ignore */ }

  return { ...DEFAULT_APP };
}

export function saveAppData(appData) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(appData));
}

export function createProfile(appData, name, age, avatar) {
  const id = generateId();
  const profile = { ...DEFAULT_PROFILE, childName: name, childAge: age, avatar: avatar || '🧒' };
  const updated = {
    ...appData,
    profiles: { ...appData.profiles, [id]: profile },
    activeProfileId: appData.activeProfileId || id,
  };
  saveAppData(updated);
  return { appData: updated, profileId: id };
}

export function deleteProfile(appData, profileId) {
  const profiles = { ...appData.profiles };
  delete profiles[profileId];
  const ids = Object.keys(profiles);
  const updated = {
    ...appData,
    profiles,
    activeProfileId: appData.activeProfileId === profileId ? (ids[0] || null) : appData.activeProfileId,
  };
  saveAppData(updated);
  return updated;
}

export function switchProfile(appData, profileId) {
  const updated = { ...appData, activeProfileId: profileId };
  saveAppData(updated);
  return updated;
}

export function getActiveProfile(appData) {
  if (!appData.activeProfileId || !appData.profiles[appData.activeProfileId]) {
    return { ...DEFAULT_PROFILE };
  }
  return { ...DEFAULT_PROFILE, ...appData.profiles[appData.activeProfileId] };
}

export function saveActiveProfile(appData, profileData) {
  if (!appData.activeProfileId) return appData;
  const updated = {
    ...appData,
    profiles: { ...appData.profiles, [appData.activeProfileId]: profileData },
  };
  saveAppData(updated);
  return updated;
}

export function resetProfile(appData, profileId) {
  const id = profileId || appData.activeProfileId;
  if (!id || !appData.profiles[id]) return appData;
  const profile = appData.profiles[id];
  const updated = {
    ...appData,
    profiles: {
      ...appData.profiles,
      [id]: { ...DEFAULT_PROFILE, childName: profile.childName, childAge: profile.childAge, avatar: profile.avatar },
    },
  };
  saveAppData(updated);
  return updated;
}

export function updateStreak(data) {
  const today = new Date().toDateString();
  const lastPlay = data.lastPlayDate;

  if (lastPlay === today) return data;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastPlay === yesterday.toDateString()) {
    return { ...data, streak: data.streak + 1, lastPlayDate: today };
  }

  return { ...data, streak: 1, lastPlayDate: today };
}
