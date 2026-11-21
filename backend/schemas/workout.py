from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class UserPreferences(BaseModel):
    model_config = ConfigDict(extra="ignore")

    fitness_goal: str
    fitness_level: str
    time_per_day: str
    equipment: List[str]
    preferred_days: Optional[str] = None
    focus_areas: Optional[str] = None
    limitations: Optional[str] = None


class Exercise(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str
    sets: Optional[int] = None
    reps_duration: str
    rest: str
    instructions: str


class DayPlan(BaseModel):
    model_config = ConfigDict(extra="ignore")

    day: str
    is_rest_day: bool
    total_duration: str = ""
    warmup: List[str] = []
    exercises: List[Exercise] = []
    cooldown: List[str] = []
    notes: Optional[str] = None


class WeeklyPlan(BaseModel):
    model_config = ConfigDict(extra="ignore")

    goal: str
    level: str
    weekly_summary: str
    motivational_message: str
    days: List[DayPlan]


class GeneratePlanRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")

    preferences: UserPreferences


class GeneratePlanResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")

    success: bool
    plan: Optional[WeeklyPlan] = None
    error: Optional[str] = None
