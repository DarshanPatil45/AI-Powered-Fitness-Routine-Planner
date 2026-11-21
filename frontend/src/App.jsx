import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PreferencesPage from './pages/PreferencesPage';
import WorkoutPlanPage from './pages/WorkoutPlanPage';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorToast from './components/ErrorToast';
import { generateWorkoutPlan } from './services/api';

export default function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'preferences' | 'plan'
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (prefs) => {
    setPreferences(prefs);
    setLoading(true);
    setError(null);
    try {
      const response = await generateWorkoutPlan(prefs);
      if (response.success) {
        setWorkoutPlan(response.plan);
        setPage('plan');
      } else {
        setError(response.error || 'Failed to generate plan');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => handleGenerate(preferences);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <LoadingSpinner message="Your AI fitness coach is building your personalized plan..." />}
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}

      {page === 'landing' && <LandingPage onGetStarted={() => setPage('preferences')} />}
      {page === 'preferences' && (
        <PreferencesPage onBack={() => setPage('landing')} onGenerate={handleGenerate} />
      )}
      {page === 'plan' && workoutPlan && (
        <WorkoutPlanPage
          plan={workoutPlan}
          onBack={() => setPage('preferences')}
          onRegenerate={handleRegenerate}
        />
      )}
    </div>
  );
}
