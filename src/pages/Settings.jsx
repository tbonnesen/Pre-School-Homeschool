import { useState, useRef } from 'react';
import { exportData, importData, loadAppData } from '../utils/storage';

const AVATAR_OPTIONS = ['🧒', '👧', '👦', '🧒🏻', '👧🏻', '👦🏻', '🧒🏽', '👧🏽', '👦🏽', '🧒🏿', '👧🏿', '👦🏿', '🦸', '🧚', '🦄', '🐻'];

export default function Settings({ progress, updateSettings, reset, onBack, profiles, activeProfileId, addProfile, removeProfile, setActiveProfile }) {
  const [name, setName] = useState(progress.childName || '');
  const [age, setAge] = useState(progress.childAge || 4);
  const [pin, setPin] = useState(progress.pin || '1234');
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [backupStatus, setBackupStatus] = useState(null); // { type: 'success'|'error', msg }
  const [confirmImport, setConfirmImport] = useState(false);
  const fileInputRef = useRef(null);

  // Add profile form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(4);
  const [newAvatar, setNewAvatar] = useState('🧒');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const profileEntries = Object.entries(profiles || {});

  const handleSave = () => {
    updateSettings({ childName: name, childAge: Number(age), pin });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirmReset) {
      reset();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 5000);
    }
  };

  const handleAddProfile = () => {
    if (!newName.trim()) return;
    addProfile(newName.trim(), Number(newAge), newAvatar);
    setNewName('');
    setNewAge(4);
    setNewAvatar('🧒');
    setShowAddForm(false);
  };

  const handleDeleteProfile = (id) => {
    if (confirmDeleteId === id) {
      removeProfile(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 5000);
    }
  };

  const handleExport = () => {
    try {
      const appData = loadAppData();
      const json = exportData(appData);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const date = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `homeschool-backup-${date}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBackupStatus({ type: 'success', msg: 'Backup downloaded!' });
      setTimeout(() => setBackupStatus(null), 3000);
    } catch (e) {
      setBackupStatus({ type: 'error', msg: 'Export failed. Try again.' });
    }
  };

  const handleImportClick = () => {
    setConfirmImport(true);
  };

  const handleImportConfirm = () => {
    setConfirmImport(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        importData(ev.target.result);
        setBackupStatus({ type: 'success', msg: 'Progress restored! Reloading…' });
        setTimeout(() => window.location.reload(), 1200);
      } catch (err) {
        setBackupStatus({ type: 'error', msg: err.message || 'Import failed. Invalid file.' });
        setTimeout(() => setBackupStatus(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset so same file can be re-selected
  };

  // Sync local state when active profile changes
  const activeProfile = profiles?.[activeProfileId];

  return (
    <>
      <button className="back-btn" onClick={onBack}>
        &larr; Back to Dashboard
      </button>
      <h1 className="page-title">Settings</h1>

      {/* Profile Management */}
      <div className="settings-section">
        <h3>Profiles</h3>
        <div className="profile-list">
          {profileEntries.map(([id, p]) => (
            <div
              key={id}
              className={`profile-card${id === activeProfileId ? ' active' : ''}`}
              onClick={() => {
                setActiveProfile(id);
                setName(p.childName || '');
                setAge(p.childAge || 4);
              }}
            >
              <div className="profile-card-avatar">{p.avatar || '🧒'}</div>
              <div className="profile-card-info">
                <div className="profile-card-name">
                  {p.childName || 'Unnamed'}
                  {id === activeProfileId && <span className="active-badge">Active</span>}
                </div>
                <div className="profile-card-age">Age {p.childAge || 4}</div>
              </div>
              {profileEntries.length > 1 && (
                <button
                  className="profile-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProfile(id);
                  }}
                >
                  {confirmDeleteId === id ? 'Confirm?' : '🗑️'}
                </button>
              )}
            </div>
          ))}
        </div>

        {!showAddForm ? (
          <button className="btn btn-secondary" style={{ marginTop: 12 }} onClick={() => setShowAddForm(true)}>
            + Add Child
          </button>
        ) : (
          <div className="add-profile-form">
            <div className="form-group">
              <label htmlFor="newName">Name</label>
              <input
                id="newName"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Child's name"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="newAge">Age</label>
              <select id="newAge" value={newAge} onChange={(e) => setNewAge(e.target.value)}>
                <option value={3}>3 years old</option>
                <option value={4}>4 years old</option>
                <option value={5}>5 years old</option>
              </select>
            </div>
            <div className="form-group">
              <label>Avatar</label>
              <div className="avatar-picker">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    className={`avatar-option${newAvatar === emoji ? ' selected' : ''}`}
                    onClick={() => setNewAvatar(emoji)}
                    type="button"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={handleAddProfile}>Add</button>
              <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Active Profile Settings */}
      <div className="settings-section">
        <h3>Edit Active Profile</h3>
        <div className="form-group">
          <label htmlFor="childName">Child&apos;s Name</label>
          <input
            id="childName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="childAge">Age</label>
          <select id="childAge" value={age} onChange={(e) => setAge(e.target.value)}>
            <option value={3}>3 years old</option>
            <option value={4}>4 years old</option>
            <option value={5}>5 years old</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Parent PIN</h3>
        <div className="form-group">
          <label htmlFor="pin">PIN (to access parent dashboard)</label>
          <input
            id="pin"
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="4-digit PIN"
            className="pin-input"
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? '✓ Saved!' : 'Save Settings'}
        </button>
        <button className="btn btn-danger" onClick={handleReset}>
          {confirmReset ? 'Tap Again to Confirm Reset' : 'Reset Active Profile Progress'}
        </button>
      </div>

      {/* Data Backup */}
      <div className="settings-section">
        <h3>💾 Data Backup</h3>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: 16 }}>
          Export all profiles and progress to a file, or restore from a previous backup.
          Progress is stored locally — export before switching devices.
        </p>

        {backupStatus && (
          <div className={`backup-status ${backupStatus.type}`}>
            {backupStatus.type === 'success' ? '✅' : '❌'} {backupStatus.msg}
          </div>
        )}

        {confirmImport && (
          <div className="backup-confirm">
            <p>⚠️ This will replace <strong>all current progress</strong> with the backup file. Continue?</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button className="btn btn-danger" onClick={handleImportConfirm}>Yes, restore backup</button>
              <button className="btn btn-secondary" onClick={() => setConfirmImport(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={handleExport}>
            ⬇️ Export Backup
          </button>
          <button className="btn btn-secondary" onClick={handleImportClick}>
            ⬆️ Import Backup
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}
