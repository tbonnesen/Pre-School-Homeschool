const STORAGE_KEY = 'preschool-homeschool';

const DEFAULT_DATA = {
  childName: '',
  childAge: 4,
  pin: '1234',
  completed: {},    // { domainId: { activityId: { stars, attempts, lastPlayed } } }
  streak: 0,
  lastPlayDate: null,
  activityLog: [],  // [{ activityId, domainId, stars, timestamp }]
  scores: {},       // { domainId: { activityId: { correct, total } } }
};

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DATA };
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_DATA };
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...DEFAULT_DATA };
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
