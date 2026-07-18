"""Pydantic schemas for the scam analysis API."""

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    message: str = Field(..., min_length=1)


class AnalyzeResponse(BaseModel):
    risk_level: str
    risk_score: int
    scam_type: str
    red_flags: list
    recommended_action: str
    safety_tip: str