"""Gemini AI service for analyzing suspicious messages for scam indicators."""

import json
import os

import google.generativeai as genai

from app.prompts.system_prompt import SCAM_ANALYST_SYSTEM_PROMPT

GEMINI_MODEL_NAME = "gemini-3.5-flash"

REQUIRED_KEYS = {
    "risk_level",
    "risk_score",
    "scam_type",
    "red_flags",
    "recommended_action",
    "safety_tip",
}


class GeminiServiceError(Exception):
    """Raised when the Gemini service fails to produce a valid analysis."""


def _get_model():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise GeminiServiceError(
            "GEMINI_API_KEY environment variable is not set."
        )

    genai.configure(api_key=api_key)
    return genai.GenerativeModel(
        model_name=GEMINI_MODEL_NAME,
        system_instruction=SCAM_ANALYST_SYSTEM_PROMPT,
        generation_config={"response_mime_type": "application/json"},
    )


def _parse_response(raw_text: str) -> dict:
    try:
        data = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise GeminiServiceError("Gemini returned invalid JSON.") from exc

    if not isinstance(data, dict) or not REQUIRED_KEYS.issubset(data.keys()):
        raise GeminiServiceError(
            "Gemini response is missing required analysis fields."
        )

    return data


def analyze_message(message_text: str) -> dict:
    """
    Send a suspicious message to Gemini and return a structured scam
    analysis.

    Args:
        message_text: The raw suspicious message/conversation text.

    Returns:
        A dict matching the SocialGuard PK AI analysis schema.

    Raises:
        GeminiServiceError: If the input is invalid or the Gemini call
            fails to produce a usable structured result.
    """
    if not message_text or not message_text.strip():
        raise GeminiServiceError("message_text must not be empty.")

    try:
        model = _get_model()
        response = model.generate_content(message_text.strip())
    except GeminiServiceError:
        raise
    except Exception as exc:
        raise GeminiServiceError(f"Gemini request failed: {exc}") from exc

    raw_text = getattr(response, "text", None)
    if not raw_text:
        raise GeminiServiceError("Gemini returned an empty response.")

    return _parse_response(raw_text)