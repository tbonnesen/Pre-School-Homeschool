import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useProgress } from './hooks/useProgress';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Domain from './pages/Domain';
import Activity from './pages/Activity';
import Resources from './pages/Resources';
import ParentDashboard from './pages/ParentDashboard';
import Settings from './pages/Settings';

function PinModal({ pin, onSuccess, onClose }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === (pin || '1234')) {
      onSuccess();
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Parent Area</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: 16 }}>
          Enter your PIN to continue
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            maxLength={4}
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
            className="pin-input"
            style={{ display: 'block', marginBottom: 16 }}
            autoFocus
            placeholder="····"
          />
          {error && (
            <p style={{ color: 'var(--red)', marginBottom: 12 }}>Wrong PIN. Try again.</p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AppInner() {
  const { data, completeActivity, updateSettings, reset, getCompletionPercent } = useProgress();
  const [showPin, setShowPin] = useState(false);
  const [parentMode, setParentMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleParentMode = () => {
    if (parentMode) {
      setParentMode(false);
      navigate('/');
    } else {
      setShowPin(true);
    }
  };

  const handlePinSuccess = () => {
    setShowPin(false);
    setParentMode(true);
    navigate('/parent');
  };

  if (parentMode && showSettings) {
    return (
      <Layout onParentMode={handleParentMode}>
        <Settings
          progress={data}
          updateSettings={updateSettings}
          reset={reset}
          onBack={() => setShowSettings(false)}
        />
      </Layout>
    );
  }

  return (
    <Layout onParentMode={handleParentMode}>
      {showPin && (
        <PinModal
          pin={data.pin}
          onSuccess={handlePinSuccess}
          onClose={() => setShowPin(false)}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              progress={data}
              getCompletionPercent={getCompletionPercent}
            />
          }
        />
        <Route
          path="/domain/:domainId"
          element={<Domain progress={data} />}
        />
        <Route
          path="/domain/:domainId/activity/:activityId"
          element={<Activity completeActivity={completeActivity} />}
        />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/parent"
          element={
            parentMode ? (
              <ParentDashboard
                progress={data}
                getCompletionPercent={getCompletionPercent}
                onNavigate={(page) => {
                  if (page === 'settings') setShowSettings(true);
                }}
              />
            ) : (
              <Home progress={data} getCompletionPercent={getCompletionPercent} />
            )
          }
        />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
