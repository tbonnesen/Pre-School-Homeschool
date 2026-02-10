import { useState } from 'react';

export default function Settings({ progress, updateSettings, reset, onBack }) {
  const [name, setName] = useState(progress.childName || '');
  const [age, setAge] = useState(progress.childAge || 4);
  const [pin, setPin] = useState(progress.pin || '1234');
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

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

  return (
    <>
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>
      <h1 className="page-title">Settings</h1>

      <div className="settings-section">
        <h3>Child Profile</h3>
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
          {confirmReset ? 'Tap Again to Confirm Reset' : 'Reset All Progress'}
        </button>
      </div>
    </>
  );
}
