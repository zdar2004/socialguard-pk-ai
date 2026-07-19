import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import MessageInput from "../components/MessageInput.jsx";
import ResultCard from "../components/ResultCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import HistoryPanel from "../components/HistoryPanel.jsx";
import { analyzeMessage } from "../services/api.js";

const HISTORY_STORAGE_KEY = "socialguard_pk_ai_history";
const MAX_HISTORY_ITEMS = 5;

function loadHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    // Ignore storage failures (e.g. private browsing, storage full).
  }
}

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const showResult = result !== null;

  const handleAnalyze = async (message) => {
    if (!message || !message.trim()) {
      setError("Please enter a message before analyzing.");
      return;
    }

    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const analysis = await analyzeMessage(message.trim());
      setResult(analysis);

      const historyItem = {
        message: message.trim(),
        result: {
          risk_level: analysis.risk_level,
          risk_score: analysis.risk_score,
          scam_type: analysis.scam_type,
        },
        timestamp: new Date().toISOString(),
      };

      setHistory((previousHistory) => {
        const updatedHistory = [historyItem, ...previousHistory].slice(
          0,
          MAX_HISTORY_ITEMS
        );
        saveHistory(updatedHistory);
        return updatedHistory;
      });
    } catch (err) {
      setError(
        err?.message ||
          "Something went wrong while analyzing the message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0F0D] text-neutral-100">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden px-6 py-24 text-center sm:py-32"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(52,211,153,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-800/40 bg-emerald-950/20 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                SocialGuard PK AI
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-50 sm:text-5xl md:text-6xl">
              Protect Pakistan from{" "}
              <span className="text-emerald-400">Digital Scams</span>{" "}
              With AI-Powered Analysis
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base font-medium text-neutral-300 sm:text-lg">
              AI-powered protection against WhatsApp, SMS and online scams.
            </p>

            <div className="motion-safe:animate-pulse mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              Detect phishing attempts, OTP scams, fake messages and social
              engineering attacks before they harm you. Paste a suspicious
              conversation below and get an instant, AI-generated risk
              breakdown.
            </p>

            <div className="mt-10">
              <a
                href="#analyzer"
                className="inline-block rounded-md bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#0A0F0D] shadow-[0_0_25px_-5px_rgba(52,211,153,0.6)] transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                Analyze Scam
              </a>
            </div>
          </div>
        </section>

        {/* Trust / Capability cards */}
        <section className="border-t border-emerald-900/30 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "AI Scam Detection",
                  description:
                    "Advanced language analysis flags social engineering patterns as they happen.",
                  icon: (
                    <path
                      d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6l7-3z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  ),
                },
                {
                  title: "OTP Fraud Protection",
                  description:
                    "Recognizes verification-code requests disguised as banks or delivery services.",
                  icon: (
                    <>
                      <circle
                        cx="9"
                        cy="9"
                        r="4.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                      />
                      <path
                        d="M12.2 12.2L20 20M15.5 16.5l2-2M18 19l2-2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </>
                  ),
                },
                {
                  title: "Phishing Analysis",
                  description:
                    "Spots suspicious links and lookalike domains used to steal credentials.",
                  icon: (
                    <path
                      d="M9 15l6-6M10 6l1.5-1.5a3 3 0 114.2 4.2L14 10M14 18l-1.5 1.5a3 3 0 11-4.2-4.2L10 14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  ),
                },
                {
                  title: "Real-time Risk Assessment",
                  description:
                    "Every message gets an instant risk score with clear, actionable guidance.",
                  icon: (
                    <>
                      <path
                        d="M4 15a8 8 0 1116 0"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M12 15l4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
                    </>
                  ),
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-lg border border-emerald-900/30 bg-[#0D1310] p-5 transition hover:border-emerald-700/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-emerald-800/40 bg-emerald-950/20 text-emerald-400">
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      {card.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-neutral-100">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analyzer section */}
        <section id="analyzer" className="border-t border-emerald-900/30 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <MessageInput onAnalyze={handleAnalyze} isLoading={isLoading} />

            {error && (
              <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-red-400">
                {error}
              </p>
            )}

            {isLoading && (
              <div className="mt-10">
                <LoadingSpinner />
              </div>
            )}

            {!isLoading && showResult && (
              <div className="mt-10">
                <ResultCard {...result} />
              </div>
            )}

            <div className="mt-14">
              <HistoryPanel history={history} onClear={handleClearHistory} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;