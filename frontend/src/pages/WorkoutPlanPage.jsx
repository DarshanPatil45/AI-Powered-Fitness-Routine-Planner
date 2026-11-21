import { useState } from 'react';
import {
  ArrowLeft, RefreshCw, Printer, Download, Moon, Sun,
  ChevronDown, ChevronUp, CheckCircle2, Square, CheckSquare,
  Sparkles, Clock, Dumbbell
} from 'lucide-react';

const DAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WorkoutPlanPage({ plan, onBack, onRegenerate }) {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedExercises, setExpandedExercises] = useState({});
  const [completedExercises, setCompletedExercises] = useState({});
  const [completedDays, setCompletedDays] = useState({});

  // Map days array to Mon-Sun order
  const orderedDays = DAY_FULL.map((dayName) => {
    const found = plan.days.find(
      (d) => d.day.toLowerCase().startsWith(dayName.substring(0, 3).toLowerCase())
    );
    return found || null;
  });

  const currentDay = orderedDays[activeDay];

  const toggleExercise = (dayIdx, exIdx) => {
    const key = `${dayIdx}-${exIdx}`;
    setExpandedExercises((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCompleted = (dayIdx, exIdx) => {
    const key = `${dayIdx}-${exIdx}`;
    setCompletedExercises((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDayCompleted = (dayIdx) => {
    setCompletedDays((prev) => ({ ...prev, [dayIdx]: !prev[dayIdx] }));
  };

  const handlePrint = () => window.print();

  const handleDownloadPDF = () => {
    const style = document.createElement('style');
    style.id = 'pdf-print-style';
    style.innerHTML = `
      @media print {
        .no-print { display: none !important; }
        body { background: white !important; font-family: Arial, sans-serif; }
        .pdf-page-break { page-break-before: always; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => {
      const el = document.getElementById('pdf-print-style');
      if (el) el.remove();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - no-print */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 no-print">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4 flex-wrap">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit Preferences
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-800 truncate">
              {plan.goal} · {plan.level} Plan
            </h1>
            <p className="text-xs text-gray-400 truncate">{plan.weekly_summary}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRegenerate}
              className="no-print flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors px-3 py-2 rounded-xl hover:bg-green-50"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
            <button
              onClick={handlePrint}
              className="no-print flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="no-print flex items-center gap-1.5 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Motivational Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-5 text-white flex items-start gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm text-green-100 mb-0.5">Your AI Coach says:</p>
            <p className="text-white leading-relaxed">{plan.motivational_message}</p>
          </div>
        </div>

        {/* Day Navigation */}
        <div className="no-print overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-1 min-w-max">
            {orderedDays.map((day, idx) => {
              const isActive = activeDay === idx;
              const isRest = day?.is_rest_day;
              const isDone = completedDays[idx];
              return (
                <button
                  key={idx}
                  onClick={() => setActiveDay(idx)}
                  className={`flex flex-col items-center px-4 py-3 rounded-2xl border-2 transition-all min-w-[72px] ${
                    isActive
                      ? 'border-green-500 bg-green-500 text-white shadow-md shadow-green-200'
                      : isDone
                      ? 'border-green-200 bg-green-50 text-green-600'
                      : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <span className="text-xs font-semibold">{DAY_ABBR[idx]}</span>
                  {isRest ? (
                    <Moon className={`w-4 h-4 mt-1 ${isActive ? 'text-white/80' : 'text-gray-400'}`} />
                  ) : (
                    <Dumbbell className={`w-4 h-4 mt-1 ${isActive ? 'text-white/80' : 'text-green-400'}`} />
                  )}
                  {isDone && !isActive && (
                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Day Card */}
        {currentDay ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Day Header */}
            <div className={`px-6 py-5 border-b border-gray-100 ${currentDay.is_rest_day ? 'bg-blue-50' : 'bg-green-50'}`}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{currentDay.day}</h2>
                  <p className={`text-sm font-medium mt-0.5 ${currentDay.is_rest_day ? 'text-blue-500' : 'text-green-600'}`}>
                    {currentDay.is_rest_day ? '🌙 Recovery Day' : `⏱ ${currentDay.total_duration}`}
                  </p>
                </div>
                {!currentDay.is_rest_day && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      {currentDay.total_duration}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {currentDay.is_rest_day ? (
              /* Rest Day */
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Moon className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Recovery Day</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">
                  Rest is a critical part of your training. Your muscles grow and repair during rest days.
                </p>
                {currentDay.notes && (
                  <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700 max-w-md mx-auto text-left">
                    <p className="font-semibold mb-1">Coach's Notes:</p>
                    <p>{currentDay.notes}</p>
                  </div>
                )}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto text-left">
                  {[
                    { emoji: '💧', tip: 'Stay hydrated throughout the day' },
                    { emoji: '😴', tip: 'Get 7–9 hours of quality sleep' },
                    { emoji: '🥗', tip: 'Eat protein-rich foods for muscle repair' },
                  ].map((item) => (
                    <div key={item.tip} className="bg-gray-50 rounded-xl p-3 flex items-start gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <p className="text-xs text-gray-600">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Workout Day */
              <div className="p-6 space-y-6">
                {/* Warmup */}
                {currentDay.warmup && currentDay.warmup.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs">🔥</span>
                      Warm-up
                    </h3>
                    <div className="bg-green-50 rounded-xl p-4 space-y-2">
                      {currentDay.warmup.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-green-800">
                          <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 mt-1.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exercises */}
                {currentDay.exercises && currentDay.exercises.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">💪</span>
                      Exercises
                    </h3>
                    <div className="space-y-2">
                      {currentDay.exercises.map((ex, exIdx) => {
                        const isExpanded = expandedExercises[`${activeDay}-${exIdx}`];
                        const isDone = completedExercises[`${activeDay}-${exIdx}`];
                        return (
                          <div
                            key={exIdx}
                            className={`border rounded-xl overflow-hidden transition-all ${
                              isDone ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3 px-4 py-3">
                              <button
                                onClick={() => toggleCompleted(activeDay, exIdx)}
                                className="flex-shrink-0 text-gray-300 hover:text-green-500 transition-colors"
                              >
                                {isDone
                                  ? <CheckSquare className="w-5 h-5 text-green-500" />
                                  : <Square className="w-5 h-5" />}
                              </button>
                              <div className="flex-1 min-w-0">
                                <p className={`font-semibold text-sm ${isDone ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                                  {ex.name}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {ex.sets && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                                      {ex.sets} sets
                                    </span>
                                  )}
                                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                                    {ex.reps_duration}
                                  </span>
                                  <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                                    Rest: {ex.rest}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => toggleExercise(activeDay, exIdx)}
                                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
                              >
                                {isExpanded
                                  ? <ChevronUp className="w-4 h-4" />
                                  : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </div>
                            {isExpanded && ex.instructions && (
                              <div className="px-4 pb-3 border-t border-gray-50">
                                <p className="text-xs text-gray-500 leading-relaxed pt-2">
                                  📌 <span className="font-medium text-gray-600">How to:</span> {ex.instructions}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cooldown */}
                {currentDay.cooldown && currentDay.cooldown.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">❄️</span>
                      Cool-down
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                      {currentDay.cooldown.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-blue-800">
                          <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Day Notes */}
                {currentDay.notes && (
                  <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                    <p className="text-sm font-semibold text-yellow-800 mb-1">📝 Coach's Notes</p>
                    <p className="text-sm text-yellow-700">{currentDay.notes}</p>
                  </div>
                )}

                {/* Mark day as complete */}
                <button
                  onClick={() => toggleDayCompleted(activeDay)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                    completedDays[activeDay]
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'border-2 border-green-500 text-green-600 hover:bg-green-50'
                  }`}
                >
                  {completedDays[activeDay] ? '✅ Day Completed!' : 'Mark Day as Complete'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
            No data for this day
          </div>
        )}

        {/* Weekly Overview Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Weekly Overview</h2>
            <p className="text-sm text-gray-400 mt-0.5">{plan.weekly_summary}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 w-24">Day</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Duration</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Exercises</th>
                  <th className="text-center px-5 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderedDays.map((day, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors ${
                      activeDay === idx ? 'bg-green-50/60' : ''
                    }`}
                    onClick={() => setActiveDay(idx)}
                  >
                    <td className="px-5 py-3 font-semibold text-gray-800">{DAY_ABBR[idx]}</td>
                    <td className="px-5 py-3">
                      {day ? (
                        day.is_rest_day ? (
                          <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
                            <Moon className="w-3.5 h-3.5" /> Rest
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <Dumbbell className="w-3.5 h-3.5" /> Workout
                          </span>
                        )
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {day && !day.is_rest_day ? day.total_duration : '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {day && !day.is_rest_day
                        ? `${day.exercises?.length || 0} exercises`
                        : '—'}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleDayCompleted(idx); }}
                        className="inline-flex items-center justify-center transition-colors"
                      >
                        {completedDays[idx] ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-200 hover:text-gray-400" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print flex flex-wrap gap-3 pb-10">
          <button
            onClick={onRegenerate}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            🔄 Regenerate Plan
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm"
          >
            <Printer className="w-4 h-4" />
            🖨️ Print Plan
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            📥 Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
