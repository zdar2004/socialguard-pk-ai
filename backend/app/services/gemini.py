"""Gemini AI service for analyzing suspicious messages for scam indicators."""

import json
import os
import re

import google.generativeai as genai

from app.prompts.system_prompt import SCAM_ANALYST_SYSTEM_PROMPT

GEMINI_MODEL_NAME = "gemini-3.5-flash"

REQUIRED_KEYS = {
    "risk_level",
    "risk_score",
    "scam_type",
    "confidence",
    "language_detected",
    "analysis_summary",
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


_CODE_FENCE_PATTERN = re.compile(
    r"```(?:json)?\s*(?P<body>{.*?})\s*```", re.DOTALL | re.IGNORECASE
)


def _extract_json_candidate(raw_text: str) -> str:
    """
    Extract the most likely JSON object substring from raw_text, handling:
    - plain JSON
    - JSON wrapped inside ```json ... ``` or ``` ... ``` code fences
    - JSON surrounded by extra leading/trailing text
    """
    text = raw_text.strip()

    fence_match = _CODE_FENCE_PATTERN.search(text)
    if fence_match:
        return fence_match.group("body").strip()

    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        return text[start : end + 1].strip()

    return text


def _parse_response(raw_text: str) -> dict:
    candidate = _extract_json_candidate(raw_text)

    try:
        data = json.loads(candidate)
    except json.JSONDecodeError as exc:
        raise GeminiServiceError("Gemini returned invalid JSON.") from exc

    if not isinstance(data, dict) or not REQUIRED_KEYS.issubset(data.keys()):
        raise GeminiServiceError(
            "Gemini response is missing required analysis fields."
        )

    return data


MIN_CHARACTER_LENGTH = 15
MIN_MEANINGFUL_WORDS = 3

_WORD_PATTERN = re.compile(r"[^\s]+")

INSUFFICIENT_CONTEXT_RESPONSE = {
    "risk_level": "Insufficient Context",
    "risk_score": 0,
    "scam_type": "Unknown",
    "confidence": 100,
    "language_detected": "Unknown",
    "analysis_summary": (
        "The provided text is too short to determine whether it is a "
        "legitimate message or a scam. Please paste the complete message "
        "or conversation."
    ),
    "red_flags": [],
    "recommended_action": "Provide the complete message or conversation for analysis.",
    "safety_tip": "Scam detection works best with complete conversations rather than isolated words.",
}


def _has_sufficient_context(message_text: str) -> bool:
    """
    Decide whether message_text carries enough context to be worth
    sending to Gemini for scam classification.

    Rejects (returns False for) input that is too short in either
    character length or meaningful word count, since isolated keywords
    (e.g. "OTP", "Bank", "Link") are not reliable scam evidence on
    their own.
    """
    stripped = message_text.strip()

    if len(stripped) < MIN_CHARACTER_LENGTH:
        return False

    meaningful_words = _WORD_PATTERN.findall(stripped)
    if len(meaningful_words) < MIN_MEANINGFUL_WORDS:
        return False

    return True


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

    if not _has_sufficient_context(message_text):
        return dict(INSUFFICIENT_CONTEXT_RESPONSE)

    try:
        model = _get_model()
        response = model.generate_content(message_text.strip())
    except GeminiServiceError:
        raise
    except Exception as exc:
        raise GeminiServiceError(f"Gemini request failed: {exc}") from exc
    print("\n========== RAW GEMINI RESPONSE ==========")
    print(raw_text)
    print("=========================================\n")
    raw_text = getattr(response, "text", None)
    if not raw_text:
        raise GeminiServiceError("Gemini returned an empty response.")

    return _parse_response(raw_text)