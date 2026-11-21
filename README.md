# 🏋️ AI-Powered Fitness Routine Planner

> A college mini-project that uses **Google Gemini AI** to generate personalized 7-day home workout plans — no gym required, no ML training involved.

---

## 📸 Features

- **Landing Page** — Modern hero section with feature highlights
- **Preferences Form** — Goal, fitness level, time per day, equipment (multi-select), optional focus areas & limitations
- **AI-Generated 7-Day Plan** — Exercises, sets, reps/duration, rest periods, warm-up & cool-down
- **Day-by-Day Dashboard** — Click any day to view its full workout card
- **Rest Day Cards** — Recovery tips for rest days
- **Exercise Checklist** — Mark exercises done (frontend state only)
- **Weekly Overview Table** — All 7 days at a glance with day-completion checkboxes
- **Regenerate** — Re-send same preferences for a fresh plan
- **Print / Download PDF** — Browser's print-to-PDF with `.no-print` class hiding UI chrome

---

## 🗂️ Project Structure

```
AI-Powered_Fitness_Routine_Planner/
├── backend/
│   ├── main.py                  # FastAPI app (GET /, POST /generate-plan)
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variable template
│   ├── schemas/
│   │   └── workout.py           # Pydantic models for request/response
│   └── services/
│       └── ai_service.py        # Gemini API integration
└── frontend/
    ├── index.html               # Vite entry point (print styles included)
    ├── tailwind.config.js
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx              # Page router + API call handler
        ├── main.jsx
        ├── index.css            # Tailwind directives + Inter font
        ├── services/
        │   └── api.js           # Axios client (baseURL: localhost:8000)
        ├── components/
        │   ├── LoadingSpinner.jsx
        │   └── ErrorToast.jsx
        └── pages/
            ├── LandingPage.jsx
            ├── PreferencesPage.jsx
            └── WorkoutPlanPage.jsx
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| HTTP client | Axios |
| Backend | Python + FastAPI |
| AI | Google Gemini 2.0 Flash |
| Validation | Pydantic v2 |

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** v18+ and **npm**
- **Python** 3.9+
- A **Gemini API key** — get one free at [Google AI Studio](https://aistudio.google.com/app/apikey)

---

### Step 1 — Clone / open the project

```bash
cd AI-Powered_Fitness_Routine_Planner
```

---

### Step 2 — Backend setup

```bash
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Create your .env file
cp .env.example .env
```

Open `.env` and paste your Gemini API key:

```
GEMINI_API_KEY=AIza...your_key_here
```

Start the backend server:

```bash
python main.py
# Server runs at http://localhost:8000
```

Verify it's working:

```
GET http://localhost:8000/
→ {"status": "ok", "message": "Fitness Planner API running"}
```

---

### Step 3 — Frontend setup

Open a **new terminal tab**:

```bash
cd frontend
npm install          # already done if you see node_modules/
npm run dev
# Frontend runs at http://localhost:5173
```

---

### Step 4 — Use the app

1. Open **http://localhost:5173** in your browser
2. Click **Get Started – It's Free**
3. Fill in your preferences (goal, level, time, equipment)
4. Click **✨ Generate My Workout Plan**
5. Wait ~15–30 seconds for Gemini to respond
6. Browse your personalized 7-day plan!

---

## 🔌 API Reference

### `GET /`
Health check.

**Response:**
```json
{ "status": "ok", "message": "Fitness Planner API running" }
```

---

### `POST /generate-plan`
Generate a personalized workout plan.

**Request body:**
```json
{
  "preferences": {
    "fitness_goal": "Weight Loss",
    "fitness_level": "Beginner",
    "time_per_day": "30 minutes",
    "equipment": ["No Equipment", "Yoga Mat"],
    "preferred_days": "Mon, Wed, Fri",
    "focus_areas": "core, legs",
    "limitations": "bad knees – no jumping"
  }
}
```

**Success response:**
```json
{
  "success": true,
  "plan": {
    "goal": "Weight Loss",
    "level": "Beginner",
    "weekly_summary": "...",
    "motivational_message": "...",
    "days": [
      {
        "day": "Monday",
        "is_rest_day": false,
        "total_duration": "30 minutes",
        "warmup": ["Marching in place - 60 sec", "..."],
        "exercises": [
          {
            "name": "Bodyweight Squats",
            "sets": 3,
            "reps_duration": "12 reps",
            "rest": "60 sec",
            "instructions": "Stand feet shoulder-width apart, squat until thighs parallel to floor."
          }
        ],
        "cooldown": ["Child's pose - 60 sec", "..."],
        "notes": "Focus on form over speed today."
      }
    ]
  }
}
```

**Error response:**
```json
{ "success": false, "error": "GEMINI_API_KEY environment variable is not set" }
```

---

## 🛡️ Safety Notes

- Warm-up and cool-down are always included for active days
- 1–2 rest/recovery days are built into every plan
- Physical limitations stated by the user are passed to the AI prompt
- The app reminds users to consult a healthcare professional
- No extreme workouts are recommended by the AI prompt rules

---

## 🧪 Troubleshooting

| Problem | Fix |
|---|---|
| `CORS error` in browser | Make sure the backend is running on port 8000 |
| `GEMINI_API_KEY not set` | Check your `backend/.env` file has the key |
| `Failed to parse JSON` | Gemini response was malformed — click Regenerate |
| `npm run dev` fails | Run `npm install` first inside `frontend/` |
| Tailwind not applying | Check `tailwind.config.js` content paths include `./src/**/*.{js,jsx}` |
| Timeout error | Gemini may be slow — the timeout is set to 90 seconds |

---

## 📋 How the AI Integration Works

```
User fills form → PreferencesPage.jsx
     ↓
handleGenerate() in App.jsx calls api.js
     ↓
POST /generate-plan → FastAPI backend (main.py)
     ↓
AIService.generate_workout_plan() builds a detailed prompt
     ↓
Gemini 2.0 Flash generates a JSON workout plan
     ↓
ai_service.py strips markdown fences, parses JSON
     ↓
Pydantic validates against WeeklyPlan schema
     ↓
JSON response sent back to frontend
     ↓
WorkoutPlanPage.jsx renders the 7-day dashboard
```

---

## 🎓 For Your College Presentation

Key points to highlight:

1. **No ML training** — Uses Google's pre-trained Gemini LLM via API
2. **Prompt engineering** — The AI prompt includes user preferences, safety rules, and an exact JSON schema
3. **Full-stack separation** — React frontend talks to FastAPI backend; API key is never exposed to the browser
4. **Pydantic validation** — Ensures the AI response always matches the expected structure
5. **Responsive design** — Works on mobile and desktop

---

## 📄 License

This project is for educational purposes as a college mini-project.
