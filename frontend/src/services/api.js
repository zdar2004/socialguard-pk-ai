const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function analyzeMessage(message) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
  } catch (error) {
    throw new Error(
      "Unable to reach the analysis server. Please check your connection and try again."
    );
  }

  if (!response.ok) {
    let detail = "Failed to analyze the message. Please try again.";
    try {
      const errorData = await response.json();
      if (errorData?.detail) {
        detail = errorData.detail;
      }
    } catch (parseError) {
      // Ignore JSON parse failures and use the default message.
    }
    throw new Error(detail);
  }

  return response.json();
}