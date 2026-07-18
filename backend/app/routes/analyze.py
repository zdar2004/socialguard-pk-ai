"""Route for analyzing suspicious messages for scam indicators."""

from fastapi import APIRouter, HTTPException

from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.gemini import GeminiServiceError, analyze_message

router = APIRouter()


@router.post("/api/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="message must not be empty.")

    try:
        result = analyze_message(request.message)
    except GeminiServiceError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unexpected server error.") from exc

    return result