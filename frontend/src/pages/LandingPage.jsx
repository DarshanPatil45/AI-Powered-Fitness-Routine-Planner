import { Brain, Target, Shield, ChevronRight, Dumbbell, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Plans',
    description: 'Gemini AI crafts a fully personalized 7-day workout plan tailored specifically to your goals, fitness level, and available equipment.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: Target,
    title: 'Personalized For You',
    description: 'Every plan accounts for your preferred workout days, focus areas, physical limitations, and available time — no cookie-cutter routines.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Shield,
    title: 'Safe & Beginner-Friendly',
    description: 'Built-in safety rules ensure exercises match your fitness level, with proper warm-ups, cool-downs, and rest days included every week.',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
  },
];

const stats = [
  { label: '7-Day Plans', icon: '📅' },
  { label: '5 Fitness Goals', icon: '🎯' },
  { label: 'Any Equipment', icon: '🏋️' },
];

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-700/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-700/50 border border-green-500/40 rounded-full px-4 py-1.5 text-sm text-green-200 mb-8 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-green-400" />
            Powered by Google Gemini AI
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Your Personal
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
              AI Fitness Coach
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-green-100/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Answer a few quick questions and get a fully customized 7-day workout plan — 
            tailored to your goals, fitness level, schedule, and equipment in seconds.
          </p>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold text-lg py-4 px-10 rounded-2xl transition-all duration-200 shadow-2xl shadow-green-900/50 hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started – It's Free
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Disclaimer */}
          <p className="mt-6 text-green-200/50 text-xs max-w-md mx-auto">
            Always consult a healthcare professional before starting any new exercise program.
          </p>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-green-700/50 bg-green-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-center gap-10 sm:gap-16 flex-wrap">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 text-green-200">
                  <span className="text-xl">{stat.icon}</span>
                  <span className="text-sm font-semibold tracking-wide">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex-1 bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Everything you need to get fit
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              No gym memberships, no personal trainer fees. Just intelligent, personalized workouts built for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-5`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mt-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-10">How it works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Tell us about yourself', desc: 'Share your fitness goal, level, available time, and equipment.', emoji: '📋' },
                { step: '2', title: 'AI builds your plan', desc: 'Gemini AI generates a full 7-day workout plan in seconds.', emoji: '🤖' },
                { step: '3', title: 'Start working out', desc: 'Follow your plan day by day and track your progress.', emoji: '💪' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg shadow-green-200">
                    {item.step}
                  </div>
                  <span className="text-3xl mb-3">{item.emoji}</span>
                  <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-14">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 px-10 rounded-2xl transition-colors shadow-lg shadow-green-200"
            >
              <Dumbbell className="w-5 h-5" />
              Build My Workout Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
