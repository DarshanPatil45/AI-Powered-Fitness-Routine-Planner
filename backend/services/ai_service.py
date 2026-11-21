from __future__ import annotations

import json
import os

import google.generativeai as genai

from schemas.workout import UserPreferences, WeeklyPlan


class AIService:
    def __init__(self) -> None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.0-flash")

    def generate_workout_plan(self, preferences: UserPreferences) -> WeeklyPlan:
        equipment_str = ", ".join(preferences.equipment) if preferences.equipment else "No equipment (bodyweight only)"

        prompt = f"""You are a certified personal trainer and fitness coach. Create a personalized 7-day workout plan.

USER PROFILE:
- Fitness Goal: {preferences.fitness_goal}
- Fitness Level: {preferences.fitness_level}
- Available Time Per Day: {preferences.time_per_day}
- Available Equipment: {equipment_str}
- Preferred Workout Days: {preferences.preferred_days or "No preference"}
- Focus Areas: {preferences.focus_areas or "Full body"}
- Physical Limitations: {preferences.limitations or "None"}

IMPORTANT RULES:
1. Never recommend exercises that conflict with stated limitations
2. Keep workouts within the specified time limit
3. Include 1-2 rest/recovery days per week
4. Adjust intensity for the fitness level
5. All exercises must be doable with the specified equipment only
6. Include warm-up (5 min) and cool-down (5 min) for active days
7. Beginner: low intensity, more rest; Advanced: higher intensity, supersets ok

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{{
  "goal": "...",
  "level": "...",
  "weekly_summary": "Brief overview of the week's plan...",
  "motivational_message": "An inspiring message...",
  "days": [
    {{
      "day": "Monday",
      "is_rest_day": false,
      "total_duration": "30 minutes",
      "warmup": ["Jumping jacks - 60 sec", "Arm circles - 30 sec"],
      "exercises": [
        {{
          "name": "Push-ups",
          "sets": 3,
          "reps_duration": "10 reps",
          "rest": "60 sec",
          "instructions": "Keep your back straight, lower chest to floor"
        }}
      ],
      "cooldown": ["Child's pose - 60 sec", "Standing quad stretch - 30 sec each leg"],
      "notes": "Any special notes for this day"
    }}
  ]
}}"""

        try:
            response = self.model.generate_content(prompt)
            raw_text = response.text
        except Exception as exc:
            raise ValueError(f"Gemini API call failed: {exc}") from exc

        # Clean up markdown code fences if present
        cleaned = raw_text.strip()
        if cleaned.startswith("```"):
            # Remove opening fence (```json or ```)
            cleaned = cleaned[cleaned.index("\n") + 1:]
        if cleaned.endswith("```"):
            cleaned = cleaned[: cleaned.rfind("```")].strip()

        try:
            data = json.loads(cleaned)
        except json.JSONDecodeError as exc:
            raise ValueError(
                f"Failed to parse JSON from AI response: {exc}\nRaw response:\n{raw_text[:500]}"
            ) from exc

        try:
            weekly_plan = WeeklyPlan.model_validate(data)
        except Exception as exc:
            raise ValueError(f"AI response did not match expected schema: {exc}") from exc

        return weekly_plan
