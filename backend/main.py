from __future__ import annotations

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from schemas.workout import GeneratePlanRequest, GeneratePlanResponse  # noqa: E402
from services.ai_service import AIService  # noqa: E402

app = FastAPI(title="AI-Powered Fitness Routine Planner API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "ok", "message": "Fitness Planner API running"}


@app.post("/generate-plan", response_model=GeneratePlanResponse)
async def generate_plan(request: GeneratePlanRequest) -> GeneratePlanResponse:
    try:
        ai_service = AIService()
        weekly_plan = ai_service.generate_workout_plan(request.preferences)
        return GeneratePlanResponse(success=True, plan=weekly_plan)
    except Exception as exc:
        return GeneratePlanResponse(success=False, error=str(exc))


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
