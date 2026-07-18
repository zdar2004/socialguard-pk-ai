import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import MessageInput from "../components/MessageInput.jsx";
import ResultCard from "../components/ResultCard.jsx";

function Home() {
  const showResult = false;

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
            <h2 className="text-center text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
              AI Scam Analyzer
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-neutral-400 sm:text-base">
              Paste a suspicious WhatsApp message, SMS, email, or call
              conversation for AI analysis.
            </p>

            <div className="mt-10">
              <MessageInput />
            </div>

            {showResult && (
              <div className="mt-10">
                <ResultCard />
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