import { useState } from 'react';
import {
  ArrowLeft, Flame, Dumbbell, Heart, Zap, Activity,
  CheckCircle2, Circle, Package, Layers, Timer, ChevronRight
} from 'lucide-react';

const fitnessGoals = [
  {
    id: 'weight_loss',
    label: 'Weight Loss',
    icon: Flame,
    description: 'Burn calories and shed body fat with cardio-focused sessions.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    id: 'muscle_building',
    label: 'Muscle Building',
    icon: Dumbbell,
    description: 'Build strength and muscle mass with progressive resistance training.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    id: 'general_fitness',
    label: 'General Fitness',
    icon: Heart,
    description: 'Improve overall health and fitness with balanced, varied workouts.',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    id: 'improve_stamina',
    label: 'Improve Stamina',
    icon: Zap,
    description: 'Boost cardiovascular endurance and energy levels over time.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    id: 'flexibility',
    label: 'Flexibility',
    icon: Activity,
    description: 'Increase range of motion and body mobility with stretching routines.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

const fitnessLevels = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'New to working out or returning after a long break.',
    border: 'border-green-400',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'Exercise regularly and comfortable with most movements.',
    border: 'border-yellow-400',
    bg: 'bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'Train intensively and looking for a challenging routine.',
    border: 'border-red-400',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
  },
];

const timeOptions = [
  { id: '15', label: '15 min', description: 'Quick sessions' },
  { id: '20', label: '20 min', description: 'Short & effective' },
  { id: '30', label: '30 min', description: 'Most popular' },
  { id: '45', label: '45 min', description: 'Thorough workout' },
  { id: '60', label: '60 min', description: 'Full session' },
];

const equipmentOptions = [
  { id: 'no_equipment', label: 'No Equipment', description: 'Bodyweight only', icon: '🧍' },
  { id: 'dumbbells', label: 'Dumbbells', description: 'Free weights', icon: '🏋️' },
  { id: 'resistance_bands', label: 'Resistance Bands', description: 'Elastic bands', icon: '🎗️' },
  { id: 'yoga_mat', label: 'Yoga Mat', description: 'Floor exercises', icon: '🧘' },
  { id: 'full_home_gym', label: 'Full Home Gym', description: 'All equipment', icon: '🏠' },
];

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-bold text-gray-800">{children}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function PreferencesPage({ onBack, onGenerate }) {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [timePerDay, setTimePerDay] = useState('');
  const [equipment, setEquipment] = useState([]);
  const [preferredDays, setPreferredDays] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [limitations, setLimitations] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const toggleEquipment = (id) => {
    setEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!goal) { setValidationError('Please select a fitness goal.'); return; }
    if (!level) { setValidationError('Please select your fitness level.'); return; }
    if (!timePerDay) { setValidationError('Please select time per day.'); return; }
    if (equipment.length === 0) { setValidationError('Please select at least one equipment option.'); return; }
    setValidationError('');

    const selectedGoalLabel = fitnessGoals.find(g => g.id === goal)?.label || goal;
    const selectedLevelLabel = fitnessLevels.find(l => l.id === level)?.label || level;
    const selectedEquipmentLabels = equipmentOptions.filter(e => equipment.includes(e.id)).map(e => e.label);

    onGenerate({
      fitness_goal: selectedGoalLabel,
      fitness_level: selectedLevelLabel,
      time_per_day: `${timePerDay} minutes`,
      equipment: selectedEquipmentLabels,
      preferred_days: preferredDays || undefined,
      focus_areas: focusAreas || undefined,
      limitations: limitations || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800">Build Your Workout Plan</h1>
            <p className="text-xs text-gray-400">Tell us about yourself</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">

        {/* Fitness Goal */}
        <section>
          <SectionTitle subtitle="What are you training for?">Fitness Goal</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fitnessGoals.map((g) => {
              const selected = goal === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${
                    selected
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 ${g.bg} rounded-xl flex items-center justify-center`}>
                      <g.icon className={`w-5 h-5 ${g.color}`} />
                    </div>
                    {selected && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{g.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{g.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Fitness Level */}
        <section>
          <SectionTitle subtitle="Be honest — it helps create a safer, more effective plan.">Fitness Level</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {fitnessLevels.map((l) => {
              const selected = level === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${
                    selected
                      ? `${l.border} ${l.bg} ring-2 ring-green-200`
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selected ? l.badge : 'bg-gray-100 text-gray-500'}`}>
                      {l.label}
                    </span>
                    {selected ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-200" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{l.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Time Per Day */}
        <section>
          <SectionTitle subtitle="How long can you work out each day?">Time Per Day</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {timeOptions.map((t) => {
              const selected = timePerDay === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTimePerDay(t.id)}
                  className={`flex flex-col items-center px-5 py-3 rounded-xl border-2 transition-all min-w-[90px] ${
                    selected
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <span className={`text-lg font-bold ${selected ? 'text-green-700' : 'text-gray-800'}`}>{t.label}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{t.description}</span>
                  {selected && <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Equipment */}
        <section>
          <SectionTitle subtitle="Select all that apply — you can pick multiple.">Equipment Available</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {equipmentOptions.map((e) => {
              const selected = equipment.includes(e.id);
              return (
                <button
                  key={e.id}
                  onClick={() => toggleEquipment(e.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${
                    selected
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-2xl block mb-2">{e.icon}</span>
                      <p className="font-semibold text-gray-800 text-sm">{e.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{e.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selected ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {selected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Additional Preferences */}
        <section>
          <SectionTitle subtitle="Optional — provide more details for a more precise plan.">Additional Preferences</SectionTitle>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Preferred workout days
              </label>
              <input
                type="text"
                value={preferredDays}
                onChange={(e) => setPreferredDays(e.target.value)}
                placeholder="e.g., Mon, Wed, Fri or Weekdays only"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Areas to focus on
              </label>
              <input
                type="text"
                value={focusAreas}
                onChange={(e) => setFocusAreas(e.target.value)}
                placeholder="e.g., core, upper body, glutes, legs"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Physical limitations or exercises to avoid
              </label>
              <textarea
                value={limitations}
                onChange={(e) => setLimitations(e.target.value)}
                rows={3}
                placeholder="e.g., bad knees – no high-impact running, shoulder injury – avoid overhead press"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition resize-none"
              />
            </div>
          </div>
        </section>

        {/* Validation Error */}
        {validationError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            ⚠️ {validationError}
          </div>
        )}

        {/* Submit */}
        <div className="pb-10">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-white font-bold text-lg transition-all ${
              loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                ✨ Generate My Workout Plan
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            🛡️ Always consult a healthcare professional before starting any new exercise program.
          </p>
        </div>
      </div>
    </div>
  );
}
