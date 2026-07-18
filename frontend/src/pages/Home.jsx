import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import MessageInput from "../components/MessageInput.jsx";
import ResultCard from "../components/ResultCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { analyzeMessage } from "../services/api.js";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
    } catch (err) {
      setError(
        err?.message ||
          "Something went wrong while analyzing the message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0F0D] text-neutral-100">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden px-6 py-28 text-center"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(52,211,153,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-emerald-500/80">
              AI-Powered Threat Detection
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl">
              Protect Yourself from{" "}
              <span className="text-emerald-400">Social Engineering</span>{" "}
              Scams
            </h1>

            <div className="motion-safe:animate-pulse mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

            <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-400 sm:text-lg">
              Analyze suspicious WhatsApp messages, OTP requests, and scam
              conversations using AI.
            </p>

            <div className="mt-10">
              <button
                type="button"
                className="rounded-md bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#0A0F0D] shadow-[0_0_25px_-5px_rgba(52,211,153,0.6)] transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                Analyze Scam
              </button>
            </div>
          </div>
        </section>

        {/* Analyzer section */}
        <section className="border-t border-emerald-900/30 px-6 py-20">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;